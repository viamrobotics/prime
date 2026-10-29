<script lang="ts">
  import { Popover } from "@viamrobotics/prime-ui";
</script>

<div class="not-content">
  <Popover>
    <Popover.Trigger class="button">Rename</Popover.Trigger>
    <Popover.Content aria-label="Rename sensor">
      <div class="flex items-center gap-2">
        <input class="input" aria-label="Name" value="Arm" />
        <Popover.Close class="button">Done</Popover.Close>
        <Popover.Close />
      </div>
    </Popover.Content>
  </Popover>
</div>
