import { Router } from "express";
import prisma from "../db/prisma";
import { validateMessage } from "../utils/validators";
import { generateReply, type ChatMessage } from "../services/llm.service";

const router = Router();

router.post("/message", async (req, res) => {
  try {
    const { message, sessionId } = req.body;

    // 1. Validate input
    const error = validateMessage(message);
    if (error) {
      return res.status(400).json({ error });
    }

    const trimmedMessage = message.trim();

    // 2. Get or create conversation
    let conversation = null;

    if (sessionId) {
      conversation = await prisma.conversation.findUnique({
        where: { id: sessionId },
      });
    }

    if (!conversation) {
      conversation = await prisma.conversation.create({
        data: {},
      });
    }

    // 3. Save user message
    await prisma.message.create({
      data: {
        conversationId: conversation.id,
        sender: "user",
        text: trimmedMessage,
      },
    });

    // 4. Fetch recent conversation history (last 10 messages)
    const previousMessages = await prisma.message.findMany({
      where: {
        conversationId: conversation.id,
      },
      orderBy: {
        createdAt: "asc",
      },
      take: 10,
    });

    // 5. Convert DB messages to LLM-compatible format
    const history: ChatMessage[] = previousMessages.map((msg) => ({
      role: msg.sender === "user" ? "user" : "assistant",
      content: msg.text,
    }));

    // 6. Generate AI reply using LLM
    const aiReply = await generateReply(history, trimmedMessage);

    // 7. Save AI reply
    await prisma.message.create({
      data: {
        conversationId: conversation.id,
        sender: "ai",
        text: aiReply,
      },
    });

    // 8. Return response
    return res.json({
      reply: aiReply,
      sessionId: conversation.id,
    });
  } catch (error: any) {
      // if (error?.code === "insufficient_quota") {
      //   return "Our return policy allows returns within 30 days for a full refund.";
      // }

    console.error("LLM error:", error);
    return "Sorry, I'm having trouble responding right now. Please try again later.";
}});

export default router;
