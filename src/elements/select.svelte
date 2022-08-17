<svelte:options immutable tag='v-select' />

<script lang='ts'>

import cx from 'classnames';
import { searchSort } from '../lib/sort';
import { htmlToBoolean } from '../lib/boolean';
import { addStyles, dispatch } from '../lib/index';

type LabelPosition = 'top' | 'left'

export let options = '';
export let value = '';
export let placeholder = '';
export let label = '';
export let variant: 'single' | 'multiple' = 'single';
export let labelposition: LabelPosition = 'top';
export let disabled = 'false';
export let exact = 'false';

let root: HTMLElement;
let input: HTMLInputElement;
let optionsContainer: HTMLElement;

let isDisabled: boolean;
let isExact: boolean;
let isMultiple: boolean;
let parsedOptions: string[];
let parsedSelected: string[];
let sortedOptions: string[];
let searchedOptions: (string | string[])[];

let searchTerm = '';

$: isDisabled = htmlToBoolean(disabled, 'disabled');
$: isExact = htmlToBoolean(exact, 'exact');
$: isMultiple = variant === 'multiple';
$: parsedOptions = options.split(',').map((str) => str.trim());
$: parsedSelected = isMultiple
  ? value.split(',').filter(Boolean).map((str) => str.trim())
  : [];
$: sortedOptions = isMultiple
  ? applySearchSort(searchTerm, parsedOptions)
  : applySearchSort(value, parsedOptions);
$: searchedOptions = isMultiple 
  ? sortedOptions.map((option) => applySearchHighlight(option, searchTerm))
  : sortedOptions.map((option) => applySearchHighlight(option, value)); 

let open = false;
let navigationIndex = -1;
let keyboardControlling = false;

addStyles();

const setKeyboardControl = (toggle: boolean) => {
  keyboardControlling = toggle;
};

const applySearchSort = (term: string, options: string[]) => {
  return term ? searchSort(options, term) : options;
};

const isElementInScrollView = (element: Element) => {
  const { top, bottom } = element.getBoundingClientRect();
  const parentRect = element.parentElement!.getBoundingClientRect();

  return (bottom < parentRect.bottom && top > parentRect.top);
};


const handleInput = (event: Event) => {
  navigationIndex = -1;
  optionsContainer.scrollTop = 0;
  event.stopImmediatePropagation();
  if (isMultiple) {
    searchTerm = input.value.trim();
  } else {
    value = input.value.trim();
    dispatch(root, 'input', { value });
  }
};

const handleKeyUp = (event: KeyboardEvent) => {
  setKeyboardControl(true);

  switch (event.key.toLowerCase()) {
    case 'enter': return handleEnter();
    case 'arrowup': return handleNavigate(-1);
    case 'arrowdown': return handleNavigate(+1);
    case 'escape': return handleEscape();
  }
};

const handleEnter = () => {
  if (isMultiple) {
    const option = sortedOptions[navigationIndex]!;
    value = value.includes(option)
      ? [...parsedSelected.filter(item => item !== option)].toString()
      : [...parsedSelected, option].toString();
    input.focus()
  } else {
    console.log(navigationIndex)
    if (navigationIndex > -1) {
      value = sortedOptions[navigationIndex]!;
    } else {
      const result = sortedOptions.find(item => item.toLowerCase() === value);

      if (result) {
        value = result;
      }
    }

    if (open) {
      input.blur();
      dispatch(root, 'input', { value });
    }
  }
};

const handleNavigate = (direction: number) => {
  navigationIndex += direction;

  console.log(navigationIndex)

  if (navigationIndex < 0) {
    navigationIndex = sortedOptions.length - 1;
  } else if (navigationIndex >= sortedOptions.length) {
    navigationIndex = 0;
  }

  const element = optionsContainer.children[navigationIndex]!;

  if (isElementInScrollView(element) === false) {
    element.scrollIntoView();
  }
};

const clearNavigationIndex = () => {
  navigationIndex = -1;
};

const handleEscape = () => {
  input.blur();
};

const handleFocus = () => {
  if (open) {
    return;
  }

  open = true;
  input.focus();
};

const handleUnfocus = (event: FocusEvent) => {
  if (!root.contains(event.relatedTarget as Node)) {
    open = false;
    navigationIndex = -1;
  }
};

const handleIconClick = () => {
  if (!open) {
    input.focus();
  } else {
    open = false;
  }
};

const handlePillClick = (target: string) => {
  value = [...parsedSelected.filter((item: string) => item !== target)].toString();
  dispatch(root, 'input', { value });
  input.focus();
};

const handleOptionMouseEnter = (index: number) => {
  if (keyboardControlling) {
    return;
  }

  navigationIndex = index;
};

const handleOptionSelect = (target: string, event: Event) => {
  const { checked } = (event.target as HTMLInputElement);

  if (isMultiple === false && value === target) {
    event.preventDefault();
    open = false;
    return;
  }

  value = checked
    ? [...parsedSelected, target].toString()
    : [...parsedSelected.filter((item: string) => item !== target)].toString();

  dispatch(root, 'input', { value });

  if (isMultiple) {
    input.focus();
  } else {
    open = false;
  }
};

const handleClearAll = () => {
  value = '';
  optionsContainer.scrollTop = 0;
  dispatch(root, 'input', { value: [] });
};

const applySearchHighlight = (target: string, newValue: string) => {
  const match = target.match(new RegExp(newValue, 'i'));

  if (match?.index !== undefined) {
    const begin = target.slice(0, match.index);
    const middle = target.slice(match.index, match.index + newValue.length);
    const end = target.slice(match.index + newValue.length);
    return [begin, middle, end];
  }

  return target;
};

const shouldBeChecked = (value: string, option: string) => {
  return value.includes(option);
};

</script>

<!-- svelte-ignore a11y-label-has-associated-control -->
<label
  bind:this={root}
  class={cx('relative max-w-[14rem] w-full flex gap-1', {
    'flex-col': labelposition === 'top',
    'items-center': labelposition === 'left',
    'opacity-50 pointer-events-none': isDisabled,
  })}
  tabindex='-1'
  on:focusin={handleFocus}
  on:focusout={handleUnfocus}
  on:keyup|stopPropagation|preventDefault={handleKeyUp}
  on:mousemove={() => setKeyboardControl(false)}
>
  {#if label}
    <p class={cx('text-xs', {
      'inline whitespace-nowrap': labelposition === 'left',
    })}>
      {label}
    </p>
  {/if}

  <v-dropdown
    match
    open={open ? '' : 'false'}
  >
    <div
      slot='target'
      class='w-full border border-black'
    >
      <div class='flex py-1.5 pl-2.5 pr-1'>
        <input
          bind:this={input}
          {placeholder}
          value={isMultiple ? searchTerm : value}
          readonly={isDisabled ? true : undefined}
          type='text'
          class='grow text-xs border-0 bg-transparent outline-none appearance-none'
          on:input|preventDefault={handleInput}
        >
        <button
          tabindex='-1'
          class={cx('grid place-content-center transition-transform duration-200', { 'rotate-180': open })}
          on:click={handleIconClick}
          on:focusin|stopPropagation
        >
          <v-icon name='chevron-down' />
        </button>
      </div>

      {#if parsedSelected.length > 0}
        <div class='flex flex-wrap gap-2 p-1'>
          {#each parsedSelected as option (option)}
            <div
              class='flex cursor-pointer items-center gap-1 rounded-xl bg-[#C4C4C4] py-0.5 px-2 text-[10px] hover:bg-gray-300'
              on:click={() => handlePillClick(option)}
            >
              <span>
                { option }
              </span>
              <v-icon name='x' />
            </div>
          {/each}
        </div>
      {/if}
    </div>

    <div 
      slot='content'
      class='mt-1 border border-black bg-white drop-shadow-md'
    >
      {#if sortedOptions.length > 0}
        <div
          bind:this={optionsContainer}
          class='options-container flex max-h-36 flex-col overflow-y-auto'
          on:mouseleave={clearNavigationIndex}
        >
          {#each searchedOptions as option, index (option)}
            <label
              class={cx('flex w-full gap-2 text-ellipsis whitespace-nowrap px-2 py-1.5 text-xs', {
                'bg-slate-200': navigationIndex === index,
              })}
              on:mouseenter={() => handleOptionMouseEnter(index)}
            >
              <input
                tabindex="-1"
                type='checkbox'
                class={cx('bg-black outline-none', isMultiple ? '' : 'hidden')}
                checked={shouldBeChecked(value, Array.isArray(option) ? option.join('') : option)}
                on:change={handleOptionSelect.bind(null, Array.isArray(option) ? option.join('') : option)}
                on:input|stopPropagation
                on:focus|preventDefault|stopPropagation
              >

              {#if Array.isArray(option)}
                <div>
                  {#each option as part, splitIndex (splitIndex)}
                    <span class={cx({
                      'bg-yellow-100': splitIndex === 1 && navigationIndex !== index,
                    })}>
                      { part }
                    </span>
                  {/each}
                </div>
              {:else}
                {option}
              {/if}
            </label>
          {/each}

          {#if isMultiple}
            <button
              class='w-full px-2 py-1 hover:bg-slate-200 text-xs text-left'
              on:mouseenter={clearNavigationIndex}
              on:click={handleClearAll}
            >
              Clear all
            </button>
          {/if}
        </div>
      {:else}
        <div class='flex py-1.5 px-2.5 justify-center text-xs'>
          No matching results
        </div>
      {/if}
    </div>
  </v-dropdown>
</label>

<style>
.options-container::-webkit-scrollbar {
  width: 6px;
}

.options-container::-webkit-scrollbar-track {
  background: transparent;
}

.options-container::-webkit-scrollbar-thumb {
  background-color: black;
  border-radius: 0;
  border: 0 solid transparent;
}

.options-container {
  scrollbar-width: thin;
  scrollbar-color: black transparent;
}
</style>