<script lang="ts">
  import ChatWindow from "$lib/components/ChatWindow.svelte";
  import { sendMessage } from "$lib/api/chat";
  import type { ChatMessage } from "$lib/types";

  let messages: ChatMessage[] = [];
  let input = "";
  let isLoading = false;

  let sessionId: string | null =
    typeof localStorage !== "undefined"
      ? localStorage.getItem("sessionId")
      : null;

  async function handleSend() {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    input = "";

    messages = [...messages, { role: "user", content: userMessage }];
    isLoading = true;

    try {
      const res = await sendMessage(userMessage, sessionId ?? undefined);

      sessionId = res.sessionId;
      localStorage.setItem("sessionId", sessionId);

      messages = [
        ...messages,
        { role: "assistant", content: res.reply },
      ];
    } catch (err) {
      messages = [
        ...messages,
        {
          role: "assistant",
          content: "Something went wrong. Please try again.",
        },
      ];
    } finally {
      isLoading = false;
    }
  }

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === "Enter") {
      handleSend();
    }
  }
</script>

<div class="page">
  <ChatWindow {messages} {isLoading} />

  <div class="input-bar">
    <input
      type="text"
      bind:value={input}
      placeholder="Type your message..."
      on:keydown={handleKeydown}
      disabled={isLoading}
    />

    <button on:click={handleSend} disabled={isLoading || !input.trim()}>
      Send
    </button>
  </div>
</div>

<style>
  .page {
    height: 100vh;
    display: flex;
    flex-direction: column;
  }

  .input-bar {
    display: flex;
    padding: 0.75rem;
    border-top: 1px solid #e5e7eb;
  }

  input {
    flex: 1;
    padding: 0.5rem;
    font-size: 1rem;
  }

  button {
    margin-left: 0.5rem;
    padding: 0.5rem 1rem;
  }
</style>
