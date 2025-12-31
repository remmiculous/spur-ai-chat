import type { ChatMessage } from "../types";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

export async function sendMessage(
  message: string,
  sessionId?: string
): Promise<{ reply: string; sessionId: string }> {
  const res = await fetch(`${API_BASE}/chat/message`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message,
      sessionId,
    }),
  });

  if (!res.ok) {
    throw new Error("Failed to send message");
  }

  return res.json();
}
