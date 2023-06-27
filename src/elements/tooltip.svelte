<svelte:options immutable />

<script lang="ts">
type Locations = 'top' | 'bottom' | 'right' | 'left';

import { computePosition, flip, shift, offset, arrow } from '@floating-ui/dom';

export let text = '';
export let location: Locations = 'top';
export let state: 'visible' | 'invisible' = 'invisible';

let container: HTMLElement;
let tooltip: HTMLElement;
let arrowElement: HTMLElement;

let invisible = true;

$: {
  invisible = state === 'invisible';
  recalculateStyle().catch((error) => console.error(error));
}

let x = 0;
let y = 0;

export let recalculateStyle = async () => {
  if (!container) {
    return;
  }

  const position = await computePosition(container, tooltip, {
    placement: location,
    middleware: [
      offset(7),
      flip(),
      shift({ padding: 5 }),
      arrow({ element: arrowElement }),
    ],
  });

  const staticSide = {
    top: 'bottom',
    right: 'left',
    bottom: 'top',
    left: 'right',
  }[position.placement.split('-')[0]!]!;

  const arrowX = position.middlewareData.arrow?.x ?? 0;
  const arrowY = position.middlewareData.arrow?.y ?? 0;

  // eslint-disable-next-line require-atomic-updates
  arrowElement.style.cssText =
    staticSide === 'right' || staticSide === 'left'
      ? `
      top: ${arrowY}px;
      ${staticSide}: ${arrowX}px;
      margin-${staticSide}: -10px;
      transform: ${staticSide === 'right' ? 'rotate(90deg)' : 'rotate(270deg)'};
    `
      : `
      left: ${arrowX}px;
      ${staticSide}: ${arrowY}px;
      margin-${staticSide}: -6px;
      transform: ${staticSide === 'bottom' ? 'rotate(180deg)' : ''};
    `;

  x = position.x;
  y = position.y;
};

const handleMouseEnter = async () => {
  await recalculateStyle();
  invisible = false;
};

const handleMouseLeave = () => {
  if (state === 'visible') {
    return;
  }

  invisible = true;
};
</script>

<div
  bind:this={container}
  class="relative"
  aria-describedby="tooltip"
  on:mouseenter={handleMouseEnter}
  on:mouseleave={handleMouseLeave}
>
  <slot />
  <div
    bind:this={tooltip}
    class:invisible
    role="tooltip"
    class={`
      absolute
      top-0
      left-0
      bg-gray-9
      text-white
      text-left
      text-xs
      py-1 px-2
      border
      border-gray-9
      z-[1000]
      w-max
      max-w-[250px]
      flex items-center gap-1
    `}
    style="transform: translate({x}px, {y}px);"
  >
    <div
      bind:this={arrowElement}
      class="absolute triangle border-b-gray-9 w-0 h-0"
    />
    <slot name="icon" />
    {text}
    <slot name="text" />
  </div>
</div>

<style>
.triangle {
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-bottom-width: 6px;
}
</style>
