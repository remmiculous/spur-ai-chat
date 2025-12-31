<script lang="ts">
  export let role: "user" | "assistant";
  export let content: string;
</script>

<div class="bubble {role}">
  {content}
</div>

<style>
  .bubble {
    max-width: 75%;
    padding: 0.75rem 1rem;
    border-radius: 14px;
    margin-bottom: 0.75rem;
    line-height: 1.45;
    font-size: 0.95rem;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
    word-wrap: break-word;
  }

  .user {
    background: linear-gradient(135deg, #2563eb, #1d4ed8);
    color: white;
    align-self: flex-end;
    border-bottom-right-radius: 4px;
  }

  .assistant {
    background-color: #f3f4f6;
    color: #111827;
    align-self: flex-start;
    border-bottom-left-radius: 4px;
  }
</style>
