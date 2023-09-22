<!--
  @component

  The text of a tooltip.

  Used alongside <TooltipContainer> and <TooltipTarget> to create
  customized tooltips when the regular <Tooltip> can't be used.

  See <TooltipContainer> for details.
-->
<svelte:options immutable />

<script lang="ts">
import {
  useTooltipStyles,
  type TooltipLocation,
  type TooltipVisibility,
} from './tooltip-styles';

export let location: TooltipLocation = 'top';
export let visibility: TooltipVisibility = 'invisible';

const styles = useTooltipStyles();
const { id, setTooltip } = styles;
let tooltip: HTMLElement | undefined;
let arrow: HTMLElement | undefined;

$: setTooltip(location, visibility, tooltip, arrow);
</script>

<div
  bind:this={tooltip}
  {id}
  role="tooltip"
  class="invisible absolute left-0 top-0 z-max w-max max-w-[250px] border border-gray-9"
  style:visibility={$styles.tooltip.visibility}
  style:top={$styles.tooltip.top}
  style:left={$styles.tooltip.left}
>
  <div
    bind:this={arrow}
    class="absolute h-[8.5px] w-[8.5px] rotate-45 bg-gray-9"
    style:top={$styles.arrow.top}
    style:left={$styles.arrow.left}
    style:right={$styles.arrow.right}
    style:bottom={$styles.arrow.bottom}
  />

  <div
    class="flex items-center gap-1 bg-gray-9 px-2 py-1 text-left text-xs text-white"
  >
    <slot />
  </div>
</div>
