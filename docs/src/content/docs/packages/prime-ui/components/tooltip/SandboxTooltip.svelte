<script lang="ts">
  import type { ComponentProps } from "svelte";

  import { mdiContentCopy } from "@mdi/js";
  import { Icon, Tooltip } from "@viamrobotics/prime-ui";

  type Side = Pick<ComponentProps<typeof Tooltip.Content>, "side">;

  interface Props extends Side {
    openDelay?: number;
    interactive?: boolean;
    disabled?: boolean;
  }

  const { side, openDelay, interactive, disabled }: Props = $props();
</script>

<Tooltip {openDelay} {interactive} {disabled}>
  <Tooltip.Trigger class="inline-flex">
    <button type="button" class="icon-button" aria-label="Copy">
      <Icon icon={mdiContentCopy} />
    </button>
  </Tooltip.Trigger>
  <Tooltip.Content {side}>Copy to clipboard</Tooltip.Content>
</Tooltip>
