<svelte:options immutable tag="v-list-box" />

<script lang="ts">
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// disabled to pass untyped object to cx library in template

import cx from 'classnames';
import { afterUpdate } from 'svelte';

import { dispatcher } from '../lib/dispatch';
import { addStyles } from '../lib/index';
import { htmlToBoolean } from '../lib/boolean';

export let disabled: string;
export let left = '';
export let right = '';
export let leftlabel = '';
export let rightlabel = '';
export let height = '200px';
export let suffix = '';

const dispatch = dispatcher();

type ListBoxSide = 'left' | 'right';

type ListBoxOption = {
  value: string;
  selected: boolean;
  suffix?: string;
};

type Options = {
  left: ListBoxOption[];
  right: ListBoxOption[];
};

const LEFT = 'left';
const RIGHT = 'right';

let isDisabled: boolean;
// needs to be calculated on initial render
let displaySuffix = htmlToBoolean(suffix, 'suffix');

$: isDisabled = htmlToBoolean(disabled, 'disabled');
$: displaySuffix = htmlToBoolean(suffix, 'suffix');

const generateOption = (initial: string): ListBoxOption => {
  if (displaySuffix) {
    const split = initial.split(' ');
    return { value: split[0] || '', suffix: split[1], selected: false };
  }

  return { value: initial, selected: false };
};

let options = {
  left: left ? left.split(',').map((val) => generateOption(val)) : [],
  right: right ? right.split(',').map((val) => generateOption(val)) : [],
};

// when new values are added, we want to update the state of options to include those values
const addNewData = () => {
  const allValues = new Set([
    ...options.left.map((opt) => opt.value),
    ...options.right.map((opt) => opt.value),
  ]);
  const newLeftOptions = left
    ? left
        .split(',')
        .map((val) => generateOption(val))
        .filter((opt) => !allValues.has(opt.value))
    : [];
  const newRightOptions = right
    ? right
        .split(',')
        .map((val) => generateOption(val))
        .filter((opt) => !allValues.has(opt.value))
    : [];

  const newOptions = {
    left: [...options.left, ...newLeftOptions],
    right: [...options.right, ...newRightOptions],
  };

  options = newOptions;
};

afterUpdate(addNewData);
addStyles();

const handleOptionClick = (option: ListBoxOption, side: ListBoxSide) => {
  if (isDisabled) return;

  option.selected = !option.selected;
  options = { ...options };

  dispatch('option-click', {
    target: { ...option, side },
  });
};

const handleMoveClick = (target: ListBoxSide) => {
  if (isDisabled) return;

  const source = target === LEFT ? RIGHT : LEFT;

  const newOptions: Options = {
    left: [],
    right: [],
  };

  for (const option of options[source]) {
    if (option.selected) {
      newOptions[target].push({ ...option, selected: false });
    } else {
      newOptions[source].push(option);
    }
  }

  options[source] = newOptions[source];
  options[target] = [...options[target], ...newOptions[target]];
  options = { ...options };

  // copy object to avoid any potential pass-by-reference issues
  dispatch('move', {
    options: JSON.parse(JSON.stringify(options)) as Options,
  });
};
</script>

<div
  class={cx('w-full grid grid-cols-[1fr_32px_1fr] gap-8 items-center p-2', {
    '!text-black/50': isDisabled,
  })}
>
  <div
    class="w-full flex flex-col gap-2 self-stretch"
    style={`height: ${height};`}
  >
    <span class="text-xs text-subtle-1">{leftlabel}</span>
    <div
      class="border border-medium grow p-2 bg-white flex flex-col overflow-auto"
    >
      {#if options.left.length > 0}
        {#each options.left as option}
          <button
            class={cx('flex items-center px-2 py text-sm', {
              'bg-focus/highlight': option.selected,
            })}
            on:click={() => handleOptionClick(option, LEFT)}
          >
            <input
              type="checkbox"
              checked={option.selected}
              disabled={isDisabled}
            />
            <span class="px-4">{option.value}</span>
            {#if displaySuffix && option.suffix}
              <span class="text-subtle-2">{option.suffix}</span>
            {/if}
          </button>
        {/each}
      {:else}
        <slot name="left-empty" />
      {/if}
    </div>
  </div>
  <div class="flex flex-col gap-4">
    <button
      class={cx(
        'rotate-90 border border-black h-8 w-8 flex items-center justify-center cursor-pointer hover:scale-105 bg-white',
        { 'border-black/50': isDisabled }
      )}
      data-testid="move-right"
      on:click={() => handleMoveClick(RIGHT)}
    >
      <i class="icon-arrow-up" />
    </button>
    <button
      class={cx(
        '-rotate-90 border border-black h-8 w-8 flex items-center justify-center cursor-pointer hover:scale-105 bg-white',
        { 'border-black/50': isDisabled }
      )}
      on:click={() => handleMoveClick(LEFT)}
      data-testid="move-left"
    >
      <i class="icon-arrow-up" />
    </button>
  </div>
  <div
    class="w-full flex flex-col gap-2 self-stretch"
    style={`height: ${height};`}
  >
    <span class="text-xs text-subtle-2">{rightlabel}</span>
    <div
      class="border border-medium grow p-2 bg-white flex flex-col overflow-auto"
    >
      {#if options.right.length > 0}
        {#each options.right as option}
          <button
            class={cx('flex items-center px-2 py text-sm', {
              'bg-focus/highlight': option.selected,
            })}
            on:click={() => handleOptionClick(option, RIGHT)}
          >
            <input
              type="checkbox"
              checked={option.selected}
              disabled={isDisabled}
            />
            <span class="px-4">{option.value}</span>
            {#if displaySuffix && option.suffix}
              <span class="text-subtle-2">{option.suffix}</span>
            {/if}
          </button>
        {/each}
      {:else}
        <slot name="right-empty" />
      {/if}
    </div>
  </div>
</div>
