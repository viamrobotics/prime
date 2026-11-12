<script lang="ts">
  import { Notify, provideNotify } from "@viamrobotics/prime-ui";

  const notify = provideNotify();
</script>

{#snippet actions()}
  <a class="link" href="#deployed">View deployment</a>
{/snippet}

<div class="not-content">
  <button
    type="button"
    class="button"
    onclick={() => notify.success("Deployed", "Version 1.4.0 is live.", { actions })}
  >
    Deploy
  </button>
  <Notify />
</div>
