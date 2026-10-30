<script lang="ts">
  import { Popover } from "@viamrobotics/prime-ui";

  let open = $state(false);
</script>

<div class="not-content">
  <Popover bind:open>
    <Popover.Trigger class="button">Details</Popover.Trigger>
    <Popover.Content aria-label="Details">
      <p class="text-sm">Two-way bound to <code>open</code>.</p>
    </Popover.Content>
  </Popover>

  <p class="mt-3 text-sm text-subtle-2">open: <code>{open}</code></p>
</div>
