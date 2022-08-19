<svelte:options immutable={true} tag='v-tooltip' />

<script lang='ts'>

import { onMount } from 'svelte'
import { computePosition, flip, shift, offset, arrow } from '@floating-ui/dom';
import { addStyles } from '../lib/index';

type Locations = 'top' | 'bottom' | 'right' | 'left'

export let text = '';
export let location: Locations = 'top';

let container: HTMLElement;
let tooltip: HTMLElement;
let arrowElement: HTMLElement;

let invisible = true;

let x = 0;
let y = 0;

const recalculateStyle = async () => {
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
  }[position.placement.split('-')[0]!];

  const arrowX = position.middlewareData.arrow?.x ?? 0
  const arrowY = position.middlewareData.arrow?.y ?? 0

  if (staticSide === 'right' || staticSide === 'left') {
    arrowElement.style.cssText = `
      top: ${arrowY}px;
      ${staticSide}: ${arrowX}px;
      margin-${staticSide}: -10px;
      transform: ${staticSide === 'right' ? 'rotate(90deg)' : 'rotate(270deg)'};
    `;
  } else {
    arrowElement.style.cssText = `
      left: ${arrowX}px;
      ${staticSide}: ${arrowY}px;
      margin-${staticSide}: -6px;
      transform: ${staticSide === 'bottom' ? 'rotate(180deg)' : ''};
    `;
  }

  x = position.x;
  y = position.y;
};

const handleMouseEnter = async () => {
  await recalculateStyle();
  invisible = false;
};

const handleMouseLeave = () => {
  invisible = true;
};

addStyles();

onMount(recalculateStyle)

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
    class:invisible={invisible}
    role="tooltip"
    class={`
      absolute
      top-0
      left-0
      bg-white
      text-black
      text-left
      text-xs
      p-3
      border
      border-black
      z-10
    `}
    
    style='transform: translate({x}px, {y}px);'
    >
    <div
      bind:this={arrowElement}
      class='absolute triangle w-0 h-0'
    />
    {text}
  </div>
</div>

<style>
  .triangle {
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-bottom: 6px solid black;
  }
</style>