<script lang="ts">
  import { mdiInformationOutline } from "@mdi/js";
  import { Icon, Tooltip } from "@viamrobotics/prime-ui";
</script>

<div class="not-content">
  <Tooltip>
    <Tooltip.Trigger class="inline-flex text-subtle-2">
      <Icon
        icon={mdiInformationOutline}
        size="lg"
        aria-label="About retries"
        tabindex={0}
        class="focus-ring"
      />
    </Tooltip.Trigger>
    <Tooltip.Content placement="right">Failed requests retry up to three times</Tooltip.Content>
  </Tooltip>
</div>
