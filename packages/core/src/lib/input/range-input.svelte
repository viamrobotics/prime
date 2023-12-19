<!--
@component
  
For tweakable numeric user inputs that have minimum and maximum values.

```svelte
<RangeInput max={1} step={0.01} />
```
-->
<svelte:options immutable />

<script
  lang="ts"
  context="module"
>
import cx from 'classnames';

const SLIDER_CLASSES =
  'slider-track-w-full slider-track-h-0.5 slider-thumb-light slider-thumb-w-5 slider-thumb-h-5 slider-thumb-border';

const indicatorClasses = cx(
  'invisible absolute bottom-9 -translate-x-1/2 -translate-y-1/2 select-none',
  'whitespace-nowrap bg-gray-9 px-1.5 py-1 text-center text-xs text-white',
  'transition duration-200 after:absolute after:bottom-[-2px]',
  'after:left-[calc(50%-2px)] after:h-0 after:w-0 after:border-x-[2px]',
  'after:border-b-[0] after:border-t-[2px] after:border-solid',
  'after:border-x-transparent after:border-b-transparent after:border-t-gray-9',
  'peer-focus:visible peer-focus:-translate-y-1.5'
);
</script>

<script lang="ts">
import { writable } from 'svelte/store';

import { preventHandler, preventKeyboardHandler } from '$lib/prevent-handler';
import { uniqueId } from '$lib/unique-id';

import NumericInput from './numeric-input.svelte';

/** The minimum allowed value. */
export let min = 0;

/** The maximum allowed value. */
export let max = 100;

/** The amount to add/subtract when moving the slider. */
export let step = 1;

/** The value of the input, defaults to the value of `min` */
export let value: number = min;

/** Whether or not the input should be rendered as readonly and be operable. */
export let readonly = false;

/** Whether or not the input should be rendered as readonly and be non-operable. */
export let disabled = false;

/**
 * Whether to render a datalist of values, defaults to true. The number of
 * options in the datalist is determined by the values of `min`, `max`, and
 * `step`.
 */
export let showPips = true;

/** An optional suffix to render after the value, e.g.: % */
export let suffix: string | undefined = undefined;

/** Additional CSS classes to pass to the input. */
let extraClasses: cx.Argument = '';
export { extraClasses as cx };

const indicatorPosition = writable(0);
const datalistId = uniqueId('range-input');
let datalist: HTMLDataListElement | undefined;

$: range = max - min;
$: steps = range / step;
$: hasExcessivePips = steps >= 100;
$: excessivePipsStep = steps / 20;

$: suffixValue = suffix ?? '';

$: pipStep = hasExcessivePips ? excessivePipsStep : step;
$: pipVal = (val: number): number => min + val * step * pipStep;

$: isInputReadOnly = disabled || readonly;
$: handleDisabled = preventHandler(isInputReadOnly);
$: handleDisabledKeydown = preventKeyboardHandler(isInputReadOnly);

$: inputClasses = cx(
  'peer h-7.5 w-full focus:outline-none',
  SLIDER_CLASSES,
  !isInputReadOnly &&
    'slider-track-gray-4 slider-track-cursor-pointer slider-thumb-cursor-pointer focus:slider-track-gray-5',
  isInputReadOnly &&
    'cursor-not-allowed slider-track-disabled-light slider-track-cursor-not-allowed slider-thumb-cursor-not-allowed'
);

let pipCount = 0;
$: {
  if (hasExcessivePips && range > excessivePipsStep) {
    pipCount = range / excessivePipsStep;
  } else if (hasExcessivePips && range < excessivePipsStep) {
    pipCount = range / (excessivePipsStep / 100);
  } else {
    pipCount = range / step;
  }
}

$: pips = Array.from({ length: pipCount + 1 }).map((_, i) => pipVal(i));
$: positionIndicator = (currentValue: number) => {
  if (!datalist) {
    return;
  }

  // Subtracting 20px to account for datalist padding
  const datalistWidth = datalist.clientWidth - 20;

  // Adding 10px to center on thumb (width of 20px)
  const left = ((currentValue - min) / (max - min)) * datalistWidth + 10;
  indicatorPosition.set(left);
};

$: positionIndicator(value);

$: if (value > max) {
  value = max;
} else if (value < min) {
  value = min;
}
</script>

<svelte:window on:resize={() => positionIndicator(value)} />

<div class={cx('grid w-full grid-cols-[3rem_1fr] gap-2', extraClasses)}>
  <NumericInput
    bind:value
    {min}
    {max}
    {step}
    {readonly}
    {disabled}
    on:input
    on:change
    on:keydown
    on:blur
  />
  <div class="relative w-full">
    <div class="flex w-full justify-between">
      <small class="whitespace-nowrap text-xs">
        {min}{suffixValue}
      </small>
      <small class="whitespace-nowrap text-xs">
        {max}{suffixValue}
      </small>
    </div>

    <input
      bind:value
      type="range"
      class={inputClasses}
      {min}
      {max}
      {step}
      readonly={isInputReadOnly ? true : undefined}
      aria-disabled={disabled ? true : undefined}
      list={datalistId}
      {...$$restProps}
      on:pointerdown={handleDisabled}
      on:input
      on:input|capture={handleDisabled}
      on:change
      on:change|capture={handleDisabled}
      on:keydown
      on:keydown|capture={handleDisabledKeydown}
      on:blur
    />

    {#if !isInputReadOnly}
      <span
        class={indicatorClasses}
        style="left: {$indicatorPosition}px"
      >
        {value}{suffixValue}
      </span>
    {/if}

    {#if showPips}
      <datalist
        bind:this={datalist}
        id={datalistId}
        class="relative bottom-[9px] flex w-full justify-between px-[9px]"
      >
        {#each pips as pip}
          <option
            class={cx('min-h-[4px] w-[1px] p-0', {
              'bg-gray-6': !disabled,
              'bg-disabled-light': disabled,
            })}
            value={pip}
          />
        {/each}
      </datalist>
    {/if}
  </div>
</div>

<style>
/* Range input style resets */
input[type='range'] {
  -webkit-appearance: none;
  appearance: none;
}

input[type='range']::-webkit-slider-thumb {
  -webkit-appearance: none;
}

input[type='range']::-ms-track {
  background: transparent;
  border-color: transparent;
  color: transparent;
}
</style>
