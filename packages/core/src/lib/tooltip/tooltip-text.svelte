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
import type { FloatingPlacement } from '$lib/floating';
import { useTooltip, type TooltipVisibility } from './tooltip-styles';

export let location: FloatingPlacement = 'top';
export let state: TooltipVisibility | undefined = undefined;

/** Additional CSS classes to pass to the tooltip text element. */
let extraClasses: cx.Argument = '';
export { extraClasses as cx };

const { id, style, isVisible, setVisibility } = useTooltip();
let floatingElement: HTMLElement | undefined;
let arrowElement: HTMLElement | undefined;

$: setVisibility(state);
$: style.register({
  floatingElement,
  arrowElement,
  placement: location,
  auto: $isVisible,
});
</script>

<div
  bind:this={floatingElement}
  {id}
  role="tooltip"
  class:hidden={!$isVisible || !$style}
  style:top={$style?.top}
  style:left={$style?.left}
  class={cx(
    'absolute left-0 top-0 z-max w-max max-w-[250px] border border-gray-9',
    extraClasses
  )}
>
  <div
    bind:this={arrowElement}
    class="absolute h-[8.5px] w-[8.5px] rotate-45 bg-gray-9"
    style:top={$style?.arrow?.top}
    style:left={$style?.arrow?.left}
    style:right={$style?.arrow?.right}
    style:bottom={$style?.arrow?.bottom}
  />

  <div
    class="flex items-center gap-1 bg-gray-9 px-2 py-1 text-left text-xs text-white"
  >
    <slot />
  </div>
</div>
