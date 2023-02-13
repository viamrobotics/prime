<svelte:options immutable tag='v-list-box' />

<script lang='ts'>
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

const dispatch = dispatcher();

type ListBoxSide = 'left' | 'right';

type ListBoxOption = {
  value: string
  selected: boolean
}

type Options = {
  left: ListBoxOption[]
  right: ListBoxOption[]
}

const LEFT = 'left';
const RIGHT = 'right';

let isDisabled: boolean;
let options = {
  left: left.split(',').map((value) => ({ value, selected: false })),
  right: right.split(',').map((value) => ({ value, selected: false })),
};

$: isDisabled = htmlToBoolean(disabled, 'disabled');

// when new values are added, we want to update the state of options to include those values
const addNewData = () => {
  const allValues = new Set([
    ...options.left.map(opt => opt.value),
    ...options.right.map(opt => opt.value),
  ]);
  const newLeftOptions = left.split(',').filter((opt) => !allValues.has(opt));
  const newRightOptions = right.split(',').filter((opt) => !allValues.has(opt));

  const newOptions = {
    left: [...options.left, ...newLeftOptions.map((value) => ({ value, selected: false }))],
    right: [...options.right, ...newRightOptions.map((value) => ({ value, selected: false }))],
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
  class={cx('w-full grid grid-cols-[1fr_32px_1fr] gap-8 items-center p-2', { '!text-black/50': isDisabled })}
>
  <div class="w-full flex flex-col gap-2 self-stretch" style={`height: ${height};`}>
    <span class="text-xs">{ leftlabel }</span>
    <div class="border border-[#D7D7D] grow px-4 py-3 bg-white flex flex-col overflow-auto">
      {#each options.left as option}
        <button
          class={cx('flex items-start', { 'bg-[#E2F1FD]': option.selected })}
          on:click={() => handleOptionClick(option, LEFT)}
        >        
          <span class="text-sm px-2 py-0.5">{ option.value }</span>
        </button>
      {/each}
    </div>
  </div>
  <div class="flex flex-col gap-4">
    <button
      class={cx('rotate-90 border border-black h-8 w-8 flex items-center justify-center cursor-pointer hover:scale-105 bg-white',
        { 'border-black/50': isDisabled }
      )}
      data-testid="move-right"
      on:click={() => handleMoveClick(RIGHT)}
      >
      <i
        class="icon-arrow-up"
      />
    </button>
    <button
    class={cx('-rotate-90 border border-black h-8 w-8 flex items-center justify-center cursor-pointer hover:scale-105 bg-white',
        { 'border-black/50': isDisabled }
      )}
      on:click={() => handleMoveClick(LEFT)}
      data-testid="move-left"
    >
      <i
        class="icon-arrow-up"
      />
    </button>
  </div>
  <div class="w-full flex flex-col gap-2 self-stretch" style={`height: ${height};`}>
    <span class="text-xs">{ rightlabel }</span>
    <div class="border border-[#D7D7D] grow px-4 py-3 bg-white flex flex-col overflow-auto">  
      {#each options.right as option}
      <button
        class={cx('flex items-start', { 'bg-[#E2F1FD]': option.selected })}
        on:click={() => handleOptionClick(option, RIGHT)}
      >
        <span class="text-sm px-2 py-0.5">{ option.value }</span>
      </button>
      {/each}
    </div>
  </div>
</div>
