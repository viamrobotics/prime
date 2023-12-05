<svelte:options immutable />

<script lang="ts">
import { onMount } from 'svelte';
import { writable } from 'svelte/store';
import cx from 'classnames';

import { preventHandler, preventKeyboardHandler } from '$lib/prevent-handler';
import NumericInput from './numeric-input.svelte';
import { uniqueId } from '$lib/unique-id';

export let min = 0;
export let max = 100;
export let step = 1;
export let value: number = min;
export let disabled = false;
export let showPips = true;
export let suffix = '';

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

$: pipStep = hasExcessivePips ? excessivePipsStep : step;
$: pipVal = (val: number): number => min + val * step * pipStep;

$: handleDisabled = preventHandler(disabled);
$: handleDisabledKeydown = preventKeyboardHandler(disabled);

$: inputClasses = cx(
  'slider-track-w-full slider-thumb-w-5 slider-thumb-h-5 slider-thumb-light',
  'slider-thumb-border slider-track-h-0.5 peer h-7.5 w-full outline-offset-2',
  'focus:outline-none',
  !disabled &&
    'slider-track-gray-4 focus:slider-track-gray-5 slider-track-cursor-pointer slider-thumb-cursor-pointer',
  disabled &&
    'slider-track-disabled-light slider-track-cursor-not-allowed slider-thumb-cursor-not-allowed cursor-not-allowed'
);

$: indicatorClasses = cx(
  'invisible absolute bottom-9 -translate-x-1/2 -translate-y-1/2 select-none',
  'whitespace-nowrap bg-gray-9 px-1.5 py-1 text-center text-xs text-white',
  'transition duration-200 after:absolute after:-bottom-[2px]',
  'after:left-[calc(50%-2px)] after:h-0 after:w-0 after:border-x-[2px]',
  'after:border-b-[0] after:border-t-[2px] after:border-solid',
  'after:border-x-transparent after:border-b-transparent after:border-t-gray-9',
  'peer-focus:visible peer-focus:-translate-y-1.5'
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
$: positionIndicator = () => {
  if (!datalist) {
    return;
  }

  // Subtracting 20px to account for datalist padding
  const datalistWidth = datalist.clientWidth - 20;

  // Adding 10px to center on thumb (width of 20px)
  const left = ((value - min) / (max - min)) * datalistWidth + 10;
  indicatorPosition.set(left);
};

/*
 * TODO (DTCurrie): The below is valid syntax in svelte to invoke a function on a variable change, we should
 * update our linters to allow this in svelte files.
 */
// eslint-disable-next-line no-unused-expressions, @typescript-eslint/no-confusing-void-expression, no-sequences
$: value, positionIndicator();
onMount(() => positionIndicator());
</script>

<svelte:window on:resize={positionIndicator} />

<div class={cx('grid w-full grid-cols-[3rem_1fr] gap-2', extraClasses)}>
  <NumericInput
    bind:value
    {min}
    {max}
    {step}
    {disabled}
    on:input
    on:change
    on:keydown
    on:blur
  />
  <div class="relative w-full">
    <div class="flex w-full justify-between">
      <small class="whitespace-nowrap text-xs">
        {min}{suffix}
      </small>
      <small class="whitespace-nowrap text-xs">
        {max}{suffix}
      </small>
    </div>

    <input
      bind:value
      type="range"
      class={inputClasses}
      {min}
      {max}
      {step}
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

    {#if !disabled}
      <span
        class={indicatorClasses}
        style="left: {$indicatorPosition}px"
      >
        {value}{suffix}
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
