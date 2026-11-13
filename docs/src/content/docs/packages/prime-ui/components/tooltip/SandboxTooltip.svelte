<script lang="ts">
  import type { ComponentProps } from "svelte";

  import { mdiContentCopy } from "@mdi/js";
  import { Icon, Tooltip } from "@viamrobotics/prime-ui";

  type Placement = Pick<ComponentProps<typeof Tooltip.Content>, "placement">;

  interface Props extends Placement {
    openDelay?: number;
    interactive?: boolean;
    disabled?: boolean;
  }

  const { placement, openDelay, interactive, disabled }: Props = $props();
</script>

<Tooltip {openDelay} {interactive} {disabled}>
  <Tooltip.Trigger class="inline-flex">
    <button type="button" class="icon-button" aria-label="Copy">
      <Icon icon={mdiContentCopy} />
    </button>
  </Tooltip.Trigger>
  <Tooltip.Content {placement}>Copy to clipboard</Tooltip.Content>
</Tooltip>
