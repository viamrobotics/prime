<!--
  @component

  The tooltip is used to provide contextual information to users
  for specific elements.

  ```svelte
  <Tooltip location="left" let:tooltipID>
    <p aria-describedby={tooltipID}>
      This element needs some additional context.
      <Icon slot="icon" name="information-outline" />
    </p>
    <p slot="description">This is the tooltip text!</p>
  </Tooltip>
  ```
-->
<svelte:options
  immutable
  accessors
/>

<script lang="ts">
import { useUniqueId } from '$lib/unique-id';
import {
  tooltipStyles,
  type TooltipLocation,
  type TooltipState,
} from './tooltip-styles';

/**
 * The desired location for the tooltip, may be computed to a different
 * location  depending on layout.
 */
export let location: TooltipLocation = 'top';

/**
 * If `visible`, the tooltip will always render. When `invisible` the tooltip
 * will only render on mouse enter and focus
 */
export let state: TooltipState = 'invisible';

const tooltipID = useUniqueId('tooltip');
let target: HTMLElement | undefined = undefined;
let tooltip: HTMLElement | undefined;
let arrow: HTMLElement | undefined;
let isHovered = false;

const styles = tooltipStyles();
const show = () => (isHovered = true);
const hide = () => (isHovered = false);

export const recalculateStyle = () => {
  styles.recalculate(target, tooltip, arrow, location);
};

$: isVisible = state === 'visible' || isHovered;

$: if (isVisible) {
  styles.recalculate(target, tooltip, arrow, location);
}
</script>

<span
  role="presentation"
  bind:this={target}
  on:mouseenter={show}
  on:mouseleave={hide}
  on:focusin={show}
  on:focusout={hide}
>
  <slot {tooltipID} />
</span>

<div
  class="relative"
  class:sr-only={!isVisible}
>
  <div
    bind:this={tooltip}
    id={tooltipID}
    role="tooltip"
    class:invisible={!isVisible}
    class="absolute left-0 top-0 z-max flex w-max max-w-[250px] items-center gap-1 border border-gray-9 bg-gray-9 px-2 py-1 text-left text-xs text-white"
    style:top={$styles.tooltip.top}
    style:left={$styles.tooltip.left}
  >
    <div
      bind:this={arrow}
      class="absolute h-0 w-0 border-b-[6px] border-l-[6px] border-r-[6px] border-b-gray-9 border-l-transparent border-r-transparent"
      style:top={$styles.arrow.top}
      style:left={$styles.arrow.left}
      style:right={$styles.arrow.right}
      style:bottom={$styles.arrow.bottom}
      style:transform={$styles.arrow.transform}
    />

    <slot name="description" />
  </div>
</div>
