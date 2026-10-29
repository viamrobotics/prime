<script lang="ts">
  import { Popover } from "@viamrobotics/prime-ui";
</script>

<div class="not-content pt-32">
  <Popover>
    <Popover.Trigger class="button">Open above</Popover.Trigger>
    <Popover.Content aria-label="Details" side="top" align="end" sideOffset={8}>
      <p class="text-sm">Opens above, aligned to the trigger's end edge.</p>
    </Popover.Content>
  </Popover>
</div>
