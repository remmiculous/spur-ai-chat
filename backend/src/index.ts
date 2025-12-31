import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import prisma from "./db/prisma";


dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});

async function testDb() {
  const convo = await prisma.conversation.create({ data: {} });
  console.log("Conversation created:", convo.id);
}

testDb();
