<script lang="ts">
  import { onMount } from "svelte";
  import ChatWindow from "$lib/components/ChatWindow.svelte";
  import { sendMessage } from "$lib/api/chat";
  import type { ChatMessage } from "$lib/types";

  let messages: ChatMessage[] = [];
  let input = "";
  let isLoading = false;
  let inputEl: HTMLInputElement;

  let sessionId: string | null = null;

  onMount(() => {
    sessionId = localStorage.getItem("sessionId");
    inputEl?.focus();
  });

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
    } catch {
      messages = [
        ...messages,
        {
          role: "assistant",
          content: "Something went wrong. Please try again.",
        },
      ];
    } finally {
      isLoading = false;
      inputEl?.focus();
    }
  }

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === "Enter") {
      handleSend();
    }
  }
</script>

<div class="page">
  <div class="chat-container">
    <header class="header">
      💬 Spur Support Assistant
    </header>

    <ChatWindow {messages} {isLoading} />

    <div class="input-bar">
      <input
        bind:this={inputEl}
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
</div>

<style>
  .page {
    height: 100vh;
    display: flex;
    justify-content: center;
    background-color: #cccccc;
    padding: 1rem;
  }

  .chat-container {
    width: 100%;
    max-width: 720px;
    display: flex;
    flex-direction: column;
    background: white;
    border-left: 1px solid #e5e7eb;
    border-right: 1px solid #e5e7eb;
    border-radius: 8px;
  }

  .header {
    padding: 1rem;
    font-weight: 600;
    border-bottom: 1px solid #e5e7eb;
    background-color: #ffffff;
    border-radius: 10px 10px 0 0;
  }

  .input-bar {
    display: flex;
    padding: 0.75rem;
    border-top: 1px solid #e5e7eb;
    background-color: #ffffff;
    border-radius: 0 0 10px 10px;
  }

  input {
    flex: 1;
    padding: 0.6rem 0.75rem;
    font-size: 0.95rem;
    border: 1px solid #d1d5db;
    border-radius: 6px;
  }

  input:focus {
    outline: none;
    border-color: #2563eb;
  }

  button {
    margin-left: 0.5rem;
    padding: 0.6rem 1.25rem;
    background-color: #2563eb;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: 0.9rem;
  }

  button:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  @media (max-width: 640px) {
    .chat-container {
      max-width: 100%;
      border: none;
    }
  }
</style>
