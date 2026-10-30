<script lang="ts">
  import { Popover } from "@viamrobotics/prime-ui";

  let open = $state(false);
  let isLocked = $state(true);
</script>

<div class="not-content flex flex-col items-start gap-3">
  <label class="flex items-center gap-2 text-sm">
    <input type="checkbox" bind:checked={isLocked} />
    Keep closed
  </label>

  <Popover
    bind:open={
      () => open,
      (next) => {
        if (!isLocked) open = next;
      }
    }
  >
    <Popover.Trigger class="button">Details</Popover.Trigger>
    <Popover.Content aria-label="Details">
      <p class="text-sm">The setter declines every change while the box is checked.</p>
    </Popover.Content>
  </Popover>
</div>
