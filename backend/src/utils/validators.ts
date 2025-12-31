export function validateMessage(message: unknown): string | null {
  if (typeof message !== "string") {
    return "Message must be a string";
  }

  const trimmed = message.trim();

  if (!trimmed) {
    return "Message cannot be empty";
  }

  if (trimmed.length > 2000) {
    return "Message is too long (max 2000 characters)";
  }

  return null;
}
