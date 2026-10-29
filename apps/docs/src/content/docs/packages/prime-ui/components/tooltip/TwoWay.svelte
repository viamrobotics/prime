<script lang="ts">
  import { mdiContentCopy } from "@mdi/js";
  import { Icon, Tooltip } from "@viamrobotics/prime-ui";

  let open = $state(false);
</script>

<div class="not-content">
  <Tooltip bind:open>
    <Tooltip.Trigger class="inline-flex">
      <button type="button" class="icon-button" aria-label="Copy">
        <Icon icon={mdiContentCopy} />
      </button>
    </Tooltip.Trigger>
    <Tooltip.Content>Copy to clipboard</Tooltip.Content>
  </Tooltip>

  <p class="mt-3 text-sm text-subtle-2">open: <code>{open}</code></p>
</div>
