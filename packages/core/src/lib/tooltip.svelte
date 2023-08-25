<!--
  @component
  
  The tooltip is used to provide contextual information to users
  for specific elements.

  ```svelte
  <Tooltip location="left">
    This element needs some additional context.
    <Icon slot="icon" name="information-outline" />
    <span slot="text">This is the tooltip text!</span>
  </Tooltip>
  ```
-->
<svelte:options
  immutable
  accessors
/>

<script
  lang="ts"
  context="module"
>
export type TooltipLocation = 'top' | 'bottom' | 'right' | 'left';
export type TooltipState = 'visible' | 'invisible';
</script>

<script lang="ts">
import { computePosition, flip, shift, offset, arrow } from '@floating-ui/dom';
import { useUniqueId } from './unique-id';

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

const tooltipId = useUniqueId('tooltip');

let container: HTMLElement | undefined;
let tooltip: HTMLElement | undefined;
let arrowElement: HTMLElement | undefined;

let invisible = true;

let x = 0;
let y = 0;
let arrowCss = '';

export const recalculateStyle = async () => {
  if (container === undefined || tooltip === undefined) {
    return;
  }

  const position = await computePosition(container, tooltip, {
    placement: location,
    middleware: [
      offset(7),
      flip(),
      shift({ padding: 5 }),
      arrowElement ? arrow({ element: arrowElement }) : undefined,
    ],
  });

  const placement = position.placement.split('-')[0]! as TooltipLocation;
  const staticSide = {
    top: 'bottom',
    right: 'left',
    bottom: 'top',
    left: 'right',
  }[placement];

  const arrowX = position.middlewareData.arrow?.x ?? 0;
  const arrowY = position.middlewareData.arrow?.y ?? 0;

  arrowCss =
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

const show = async () => {
  invisible = false;
  await recalculateStyle();
};

const hide = () => {
  if (state === 'visible') {
    return;
  }

  invisible = true;
};

$: {
  invisible = state === 'invisible';

  /* eslint-disable-next-line no-console */
  recalculateStyle().catch(console.error);
}

$: {
  if (arrowElement !== undefined) {
    arrowElement.style.cssText = arrowCss;
  }
}
</script>

<button
  bind:this={container}
  class="flex cursor-default items-center"
  aria-describedby={tooltipId}
  on:mouseenter={show}
  on:mouseleave={hide}
  on:focus={show}
  on:blur={hide}
>
  <slot />
</button>

<div
  bind:this={tooltip}
  id={tooltipId}
  role="tooltip"
  class:invisible
  class="border-gray-9 bg-gray-9 absolute left-0 top-0 z-[1000] flex w-max max-w-[250px] items-center gap-1 border px-2 py-1 text-left text-xs text-white"
  style="transform: translate({x}px, {y}px);"
>
  <div
    bind:this={arrowElement}
    class="border-b-gray-9 absolute h-0 w-0 border-b-[6px] border-l-[6px] border-r-[6px] border-l-transparent border-r-transparent"
  />

  {#if !invisible}
    <slot name="text" />
  {/if}
</div>
