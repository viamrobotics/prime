<!--
  @component

  The text of a tooltip.

  Used alongside <TooltipContainer> and <TooltipTarget> to create
  customized tooltips when the regular <Tooltip> can't be used.

  See <TooltipContainer> for details.
-->
<svelte:options immutable />

<script lang="ts">
import cx from 'classnames';
import {
  useTooltip,
  type TooltipLocation,
  type TooltipVisibility,
} from './tooltip-styles';

export let location: TooltipLocation = 'top';
export let state: TooltipVisibility | undefined = undefined;

/** Additional CSS classes to pass to the tooltip text element. */
let extraClasses: cx.Argument = '';
export { extraClasses as cx };

const { id, styles, isVisible, setTooltip } = useTooltip();
let tooltip: HTMLElement | undefined;
let arrow: HTMLElement | undefined;

$: setTooltip({ tooltip, arrow, location, visibility: state });
</script>

<div
  bind:this={tooltip}
  {id}
  role="tooltip"
  class:invisible={!$isVisible || !$styles}
  style:top={$styles?.tooltip.top}
  style:left={$styles?.tooltip.left}
  class={cx(
    'absolute left-0 top-0 z-max w-max max-w-[250px] border border-gray-9',
    extraClasses
  )}
>
  <div
    bind:this={arrow}
    class="absolute h-[8.5px] w-[8.5px] rotate-45 bg-gray-9"
    style:top={$styles?.arrow.top}
    style:left={$styles?.arrow.left}
    style:right={$styles?.arrow.right}
    style:bottom={$styles?.arrow.bottom}
  />

  <div
    class="flex items-center gap-1 bg-gray-9 px-2 py-1 text-left text-xs text-white"
  >
    <slot />
  </div>
</div>
