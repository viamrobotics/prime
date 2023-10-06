<!--
    @component
    Two lists of elements that can be moved between the two lists

    ```svelete
     <ListBox
        disabled = {false}
        left ='leftText1,leftText2,leftText3',
        right = 'rightText1,rightText2,rightText3'
        leftlabel = 'Left'
        rightlabel = 'Right'
        height = '200px'
        suffix= {false}
        />
    ```
    
-->
<svelte:options immutable />

<script lang="ts">
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// disabled to pass untyped object to cx library in template

import cx from 'classnames';
import { afterUpdate, createEventDispatcher } from 'svelte';
import { Icon } from '$lib';

const dispatch = createEventDispatcher();

// Toggle element on or off
export let disabled = false;
// Elements in the left list
export let left = '';
// Elements in the right list
export let right = '';
// Label for the left list
export let leftlabel = '';
// Label for the right list
export let rightlabel = '';
// Height of the two boxes
export let height = '200px';
// Enable suffix that can be put in front of elements in the box
export let suffix = false;

type ListBoxSide = 'left' | 'right';

interface ListBoxOption {
  value: string;
  selected: boolean;
  suffix?: string;
}

interface Options {
  left: ListBoxOption[];
  right: ListBoxOption[];
}

const LEFT = 'left';
const RIGHT = 'right';

const generateOption = (initial: string): ListBoxOption => {
  if (suffix) {
    const split = initial.split(' ');
    return { value: split[0] ?? '', suffix: split[1] ?? '', selected: false };
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

const handleOptionClick = (option: ListBoxOption, side: ListBoxSide) => {
  if (disabled) {
    return;
  }

  option.selected = !option.selected;
  options = { ...options };

  dispatch('option-click', {
    target: { ...option, side },
  });
};

const handleMoveClick = (target: ListBoxSide) => {
  if (disabled) {
    return;
  }

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
  class={cx('grid w-full grid-cols-[1fr_32px_1fr] items-center gap-8 p-2', {
    '!text-black/50': disabled,
  })}
>
  <div
    class="flex w-full flex-col gap-2 self-stretch"
    style={`height: ${height};`}
  >
    <span class="text-sm text-subtle-1">{leftlabel}</span>
    <div
      class="flex grow flex-col overflow-auto border border-medium bg-white p-2"
    >
      {#if options.left.length > 0}
        {#each options.left as option}
          <button
            class={cx('py flex items-center px-2 text-sm', {
              'bg-focus/highlight': option.selected,
            })}
            on:click={() => handleOptionClick(option, LEFT)}
          >
            <input
              type="checkbox"
              checked={option.selected}
              {disabled}
            />
            <span class="px-4">{option.value}</span>
            {#if suffix && option.suffix}
              <span class="text-subtle-2">{option.suffix}</span>
            {/if}
          </button>
        {/each}
      {:else}
        <div class="text-sm">
          <slot name="left-empty" />
        </div>
      {/if}
    </div>
  </div>
  <div class="flex flex-col gap-4">
    <button
      class={cx(
        'flex h-8 w-8 rotate-90 cursor-pointer items-center justify-center border border-black bg-white hover:scale-105',
        { 'border-black/50': disabled }
      )}
      data-testid="move-right"
      on:click={() => handleMoveClick(RIGHT)}
    >
      <Icon
        class="relative bottom-0.5"
        name="arrow-up"
      />
    </button>
    <button
      class={cx(
        'flex h-8 w-8 -rotate-90 cursor-pointer items-center justify-center border border-black bg-white hover:scale-105',
        { 'border-black/50': disabled }
      )}
      on:click={() => handleMoveClick(LEFT)}
      data-testid="move-left"
    >
      <Icon
        class="bottom-0.25 relative"
        name="arrow-up"
      />
    </button>
  </div>
  <div
    class="flex w-full flex-col gap-2 self-stretch"
    style={`height: ${height};`}
  >
    <span class="text-sm text-subtle-2">{rightlabel}</span>
    <div
      class="flex grow flex-col overflow-auto border border-medium bg-white p-2"
    >
      {#if options.right.length > 0}
        {#each options.right as option}
          <button
            class={cx('py flex items-center px-2 text-sm', {
              'bg-focus/highlight': option.selected,
            })}
            on:click={() => handleOptionClick(option, RIGHT)}
          >
            <input
              type="checkbox"
              checked={option.selected}
              {disabled}
            />
            <span class="px-4">{option.value}</span>
            {#if suffix && option.suffix}
              <span class="text-subtle-2">{option.suffix}</span>
            {/if}
          </button>
        {/each}
      {:else}
        <div class="text-sm">
          <slot name="right-empty" />
        </div>
      {/if}
    </div>
  </div>
</div>
