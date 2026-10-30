<script lang="ts">
  import { mdiContentCopy } from "@mdi/js";
  import { Icon, Tooltip } from "@viamrobotics/prime-ui";
</script>

<div class="not-content">
  <Tooltip>
    <Tooltip.Trigger class="inline-flex">
      <button type="button" class="icon-button" aria-label="Copy">
        <Icon icon={mdiContentCopy} />
      </button>
    </Tooltip.Trigger>
    <Tooltip.Content>Copy to clipboard</Tooltip.Content>
  </Tooltip>
</div>
