<!--
@component
  
For numeric user inputs that require easy adjustment.

```svelte
<SliderInput min={0} max={1} step={0.1}  on:input={onInput} />
```
-->
<svelte:options immutable />

<script lang="ts">
import { createEventDispatcher, tick } from 'svelte';
import Tooltip from '$lib/tooltip.svelte';
import NumericInput from './numeric-input.svelte';
import {
  getDecimals,
  parseNumericInputValue,
  type NumericInputTypes,
} from './utils';

/** The input type */
export let type: NumericInputTypes | undefined = 'number';

/** The value of the input, if any. */
export let value: number | undefined = undefined;

/** The amount to increment/decrement when sliding. */
export let step = 1;

/** The minimum allowed value, if any. */
export let min = Number.NEGATIVE_INFINITY;

/** The maximum allowed value, if any. */
export let max = Number.POSITIVE_INFINITY;

/** The HTML input element. */
export let input: HTMLInputElement | undefined = undefined;

type Events = {
  input: number;
  slide: number;
  keydown: number;
}

const dispatch = createEventDispatcher<Events>();

let numberDragTooltip: Tooltip;
let numberDragCord: HTMLDivElement;
let numberDragHead: HTMLDivElement;
let isDragging = false;
let startX = 0;
let startValue = 0;

let stepDecimalDigits = 0;
$: {
  const [, decimal = ''] = String(step).split('.')
  stepDecimalDigits = decimal.length;
}

$: isNumber = type === 'number';

const handlePointerMove = (event: PointerEvent) => {
  const x = event.clientX;
  const deltaString = ((-(startX - x) * step) / 10).toFixed(
    isNumber ? stepDecimalDigits : 0
  );

  const inputValue = input!.value;
  const delta = parseNumericInputValue(deltaString, type);
  const next = parseNumericInputValue(
    (startValue + delta * step).toFixed(getDecimals(inputValue)),
    type
  );

  if (next > max) {
    value = max;
    return;
  }

  if (next < min) {
    value = min;
    return;
  }

  if (next >= startValue) {
    const dx = x - startX;
    numberDragHead.style.transform = `translate(${dx}px, 0px)`;
    numberDragCord.style.cssText = `width: ${dx}px;`;
  } else if (next < startValue) {
    const dx = startX - x;
    numberDragHead.style.transform = `translate(-${dx}px, 0px)`;
    numberDragCord.style.cssText = `
      width: ${dx}px;
      transform: translate(-${dx}px, 0);
    `;
  }

  if (value !== next) {
    value = next;
    dispatch('input', value);
    dispatch('slide', value);
  }

  /**
   * TODO: Determine why this is being interpreted as an `any` type by the
   * linter when it is of `() => Promise<void>`.
   */
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  numberDragTooltip.recalculateStyle();
};

const handlePointerUp = () => {
  isDragging = false;
};

const handlePointerDown = async (event: PointerEvent) => {
  startX = event.clientX;
  value ||= 0;
  startValue = value;
  isDragging = true;

  input!.focus();

  await tick();

  numberDragHead.style.transform = 'translate(0px, 0px)';

  /**
   * TODO: Determine why this is being interpreted as an `any` type by the
   * linter when it is of `() => Promise<void>`.
   */
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  numberDragTooltip.recalculateStyle();
};
</script>

<svelte:document
  on:pointermove={isDragging ? handlePointerMove : undefined}
  on:pointerup={isDragging ? handlePointerUp : undefined}
/>

<div class="relative w-full">
  <NumericInput
    {type}
    {step}
    {...$$restProps}
    style="padding-left: 0.75rem;"
    bind:value
    bind:input
    on:input
    on:keydown
    on:blur
  />
  <div
    class="absolute bottom-[3px] left-[0.2rem] z-50 h-[24px] w-1 cursor-ew-resize bg-gray-400 hover:bg-gray-700 z-max"
    on:pointerdown|preventDefault|stopPropagation={handlePointerDown}
  >
    {#if isDragging}
      <div
        bind:this={numberDragCord}
        class="z-100 pointer-events-none mt-[calc(13px)] h-px bg-gray-400"
      />
      <div
        bind:this={numberDragHead}
        class="pointer-events-none -ml-[2px] -mt-[5px]"
      >
        <div class="h-2 w-2">
          <Tooltip
            bind:this={numberDragTooltip}
            state="visible"
          >
            <div class="h-2 w-2 rounded-full bg-gray-800" />
            <span slot="text">{value}</span>
          </Tooltip>
        </div>
      </div>
    {/if}
  </div>
</div>
