<script lang="ts">
  import { Popover, clickOutside } from "@viamrobotics/prime-ui";

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
      <div class="border-medium bg-medium flex flex-col gap-2 rounded-sm border p-3 text-sm">
        <p>The popover renders in a portal, and pressing in it keeps the panel open.</p>
        <Popover>
          <Popover.Trigger class="button button-outline">Options</Popover.Trigger>
          <Popover.Content aria-label="Options">
            <p class="text-sm">Press here, then outside the panel.</p>
          </Popover.Content>
        </Popover>
      </div>
    {/if}
  </div>
</div>
