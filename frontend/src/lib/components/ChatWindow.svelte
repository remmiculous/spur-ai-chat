<script lang="ts">
  import MessageBubble from "./MessageBubble.svelte";
  import type { ChatMessage } from "../types";

  export let messages: ChatMessage[] = [];
  export let isLoading = false;

  let container: HTMLDivElement;

  // Auto-scroll when messages update
  $: if (container) {
    container.scrollTop = container.scrollHeight;
  }
</script>

<div class="chat-window" bind:this={container}>
  {#if messages.length === 0}
    <div class="empty-state">
      👋 Hi! Ask me anything about shipping, returns, or refunds.
    </div>
  {/if}

  {#each messages as msg}
    <MessageBubble role={msg.role} content={msg.content} />
  {/each}

  {#if isLoading}
    <div class="typing">
      Agent is typing<span class="dots">...</span>
    </div>
  {/if}
</div>

<style>
  .chat-window {
    flex: 1;
    overflow-y: auto;
    padding: 1.25rem;
    display: flex;
    flex-direction: column;
  }

  .empty-state {
    text-align: center;
    color: #6b7280;
    margin-top: 2rem;
    font-size: 0.95rem;
  }

  .typing {
    font-size: 0.85rem;
    color: #6b7280;
    margin-top: 0.5rem;
  }

  .dots {
    animation: blink 1.4s infinite both;
  }

  @keyframes blink {
    0% { opacity: 0.2; }
    20% { opacity: 1; }
    100% { opacity: 0.2; }
  }
</style>
