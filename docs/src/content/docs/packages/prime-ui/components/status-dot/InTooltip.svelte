<script lang="ts">
  import { StatusDot, Tooltip } from "@viamrobotics/prime-ui";
</script>

<div class="not-content">
  <Tooltip>
    <Tooltip.Trigger class="inline-flex">
      <StatusDot state="success" label="Online" tabindex={0} class="focus-ring" />
    </Tooltip.Trigger>
    <Tooltip.Content placement="right">Connected 2 minutes ago</Tooltip.Content>
  </Tooltip>
</div>
