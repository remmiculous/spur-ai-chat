<script lang="ts">
  export let role: "user" | "assistant";
  export let content: string;
</script>

<div class="bubble {role}">
  {content}
</div>

<style>
  .bubble {
    max-width: 70%;
    padding: 0.75rem 1rem;
    border-radius: 12px;
    margin-bottom: 0.5rem;
    line-height: 1.4;
  }

  .user {
    background-color: #2563eb;
    color: white;
    align-self: flex-end;
  }

  .assistant {
    background-color: #e5e7eb;
    color: #111827;
    align-self: flex-start;
  }
</style>
