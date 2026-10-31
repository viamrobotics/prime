<script lang="ts">
  import { Toast, provideToast } from "@viamrobotics/prime-ui";

  const toast = provideToast();
</script>

<div class="not-content">
  <button type="button" class="button" onclick={() => toast.info("Copied to clipboard")}>
    Copy
  </button>
  <Toast>
    {#snippet item(state)}
      <div class="flex w-72 items-center gap-3 rounded-sm border border-medium bg-medium px-3 py-2">
        <span class="text-sm text-default">{state.title}</span>
        <button type="button" class="ml-auto text-sm text-link" onclick={state.dismiss}>
          Close
        </button>
      </div>
    {/snippet}
  </Toast>
</div>
