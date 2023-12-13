<script lang="ts">
import { Tooltip, type FloatingPlacement, type TooltipVisibility } from '$lib';

export let location: FloatingPlacement = 'top';
export let state: TooltipVisibility | undefined = undefined;
export let hoverDelayMs: number | undefined = undefined;
</script>

<Tooltip
  {location}
  {state}
  {hoverDelayMs}
  let:tooltipID
>
  <button
    data-testid="target"
    aria-describedby={tooltipID}
  >
    This element has a tooltip.
  </button>
  <p slot="description">This is the tooltip text!</p>
</Tooltip>
