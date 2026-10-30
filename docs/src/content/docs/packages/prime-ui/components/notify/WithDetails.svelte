<script lang="ts">
  import { Notify, provideNotify } from "@viamrobotics/prime-ui";

  const notify = provideNotify();
</script>

{#snippet details()}
  <span class="font-mono text-xs">exit status 1: missing config attribute "board"</span>
{/snippet}

<div class="not-content">
  <button
    type="button"
    class="button"
    onclick={() => notify.danger("Failed to start module", details)}
  >
    Start module
  </button>
  <Notify />
</div>
