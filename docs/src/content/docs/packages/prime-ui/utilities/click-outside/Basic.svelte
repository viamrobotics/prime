<script lang="ts">
  import { clickOutside } from "@viamrobotics/prime-ui";

  let isOpen = $state(false);
</script>

<div class="not-content">
  <div class="flex items-start gap-3" {@attach clickOutside(() => (isOpen = false))}>
    <button
      type="button"
      class="button"
      aria-expanded={isOpen}
      onclick={() => (isOpen = !isOpen)}
    >
      Toggle panel
    </button>
    {#if isOpen}
      <div class="border-medium bg-medium rounded-sm border p-3 text-sm">
        Press anywhere outside this panel and its button to close it.
      </div>
    {/if}
  </div>
</div>
