<script lang="ts">
  import { Popover } from "@viamrobotics/prime-ui";
</script>

<div class="not-content flex flex-col gap-6">
  <div class="flex flex-col gap-2">
    <h4 class="text-xs font-medium text-subtle-2 uppercase">Text trigger</h4>
    <Popover>
      <Popover.Trigger class="button">Open</Popover.Trigger>
      <Popover.Content aria-label="Text trigger details">
        <p class="text-sm">Panel content.</p>
      </Popover.Content>
    </Popover>
  </div>

  <div class="flex flex-col gap-2">
    <h4 class="text-xs font-medium text-subtle-2 uppercase">With a close button</h4>
    <Popover>
      <Popover.Trigger class="button">Open</Popover.Trigger>
      <Popover.Content aria-label="Close button details">
        <div class="flex items-start gap-4">
          <p class="text-sm">Panel content.</p>
          <Popover.Close />
        </div>
      </Popover.Content>
    </Popover>
  </div>
</div>
