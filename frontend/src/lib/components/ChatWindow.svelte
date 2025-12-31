<script lang="ts">
  import MessageBubble from "./MessageBubble.svelte";
  import type { ChatMessage } from "../types";

  export let messages: ChatMessage[] = [];
  export let isLoading = false;

  let container: HTMLDivElement;

  // Auto-scroll on new messages
  $: if (container) {
    container.scrollTop = container.scrollHeight;
  }
</script>

<div class="chat-window" bind:this={container}>
  {#each messages as msg}
    <MessageBubble role={msg.role} content={msg.content} />
  {/each}

  {#if isLoading}
    <div class="typing">Agent is typing…</div>
  {/if}
</div>

<style>
  .chat-window {
    flex: 1;
    overflow-y: auto;
    padding: 1rem;
    display: flex;
    flex-direction: column;
  }

  .typing {
    font-size: 0.85rem;
    color: #6b7280;
    margin-top: 0.5rem;
  }
</style>
