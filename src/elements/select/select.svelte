<svelte:options immutable tag='v-select' />

<script lang='ts'>

type LabelPosition = 'top' | 'left'

// This entire component is pretty hacked together and should be refactored. Maybe split multi / single select.
import cx from 'classnames';
import { searchSort } from '../../lib/sort';
import { htmlToBoolean } from '../../lib/boolean';
import { addStyles } from '../../lib/index';
import { dispatcher } from '../../lib/dispatch';
import * as utils from './utils';

export let options = '';
export let value = '';
export let placeholder = '';
export let label = '';
export let variant: 'single' | 'multiple' = 'single';
export let labelposition: LabelPosition = 'top';
export let disabled = 'false';
export let exact = 'false';
export let prefix = 'false';
export let tooltip = '';
export let state: 'info' | 'warn' | 'error' | '' = 'info';
export let showpill = 'false';
export let clearable = 'true';

const dispatch = dispatcher();

addStyles();

let root: HTMLElement;
let input: HTMLInputElement;
let optionsContainer: HTMLElement;

let isDisabled: boolean;
let isExact: boolean;
let isMultiple: boolean;
let hasPrefix: boolean;
let showsPill: boolean;
let canClearAll: boolean;
let parsedOptions: string[];
let parsedSelected: string[];
let sortedOptions: string[];
let searchedOptions: { option: string; search?: string[] }[];

let searchTerm = '';

$: isDisabled = htmlToBoolean(disabled, 'disabled');
$: isExact = htmlToBoolean(exact, 'exact');
$: isMultiple = variant === 'multiple';
$: hasPrefix = htmlToBoolean(prefix, 'prefix');
$: showsPill = htmlToBoolean(showpill, 'showpill');
$: canClearAll = htmlToBoolean(clearable, 'clearable');
$: parsedOptions = options.split(',').map((str) => str.trim());
$: parsedSelected = isMultiple
  ? value.split(',').filter(Boolean).map((str) => str.trim())
  : [];
$: sortedOptions = isMultiple
  ? applySearchSort(searchTerm, parsedOptions)
  : applySearchSort(value, parsedOptions);
$: searchedOptions = isMultiple 
  ? utils.applySearchHighlight(sortedOptions, searchTerm)
  : utils.applySearchHighlight(sortedOptions, value); 

let open = false;
let navigationIndex = -1;
let keyboardControlling = false;

let optionMatch = false;
let optionMatchText = '';

const setKeyboardControl = (toggle: boolean) => {
  keyboardControlling = toggle;
};

const applySearchSort = (term: string, options: string[]) => {
  return term ? searchSort(options, term) : options;
};

const handleInput = (event: Event) => {
  navigationIndex = -1;
  optionsContainer.scrollTop = 0;
  event.stopImmediatePropagation();
  if (isMultiple) {
    searchTerm = input.value.trim();
    optionMatch = false;
    for (const value of sortedOptions) {
      if (searchTerm.toLowerCase() === value.toLowerCase()) {
        optionMatch = true;
        optionMatchText = value;
      } 
    }
  } else {
    value = input.value.trim();
    dispatch('input', { value });
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
    input.focus();

    if (optionMatch) {
      if (value.includes(optionMatchText)) {
        value = value.replace(`${optionMatchText},`, '');
      } else {
        value += `${optionMatchText},`;
      }
      searchTerm = '';
      optionMatch = false;
    }

    dispatch('input', { value, values: value.split(',') });
  } else {
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
    }

    dispatch('input', { value });
  }
  
};

const handleNavigate = (direction: number) => {
  navigationIndex += direction;

  if (navigationIndex < 0) {
    navigationIndex = sortedOptions.length - 1;
  } else if (navigationIndex >= sortedOptions.length) {
    navigationIndex = 0;
  }

  const element = optionsContainer.children[navigationIndex]!;

  if (utils.isElementInScrollView(element) === false) {
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
  if (open || isDisabled) {
    return;
  }

  open = true;
  input.focus();
};

const handleFocusOut = (event: FocusEvent) => {
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
  dispatch('input', { value, values: value.split(',') });
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

  if (isMultiple) {
    input.focus();
    dispatch('input', { value, values: value.split(',') });
  } else {
    open = false;
    dispatch('input', { value });
  }
};

const handleClearAll = () => {
  value = '';
  optionsContainer.scrollTop = 0;
  if (isMultiple) {
    dispatch('input', { value, values: value.split(',') });
  } else {
    dispatch('input', { value });
  }
};

const splitOptionOnWord = (option: string) => {
  return option.split(' ');
};

$: {
  if (!open) {
    if (isMultiple) {
      searchTerm = '';
    }

    if (isExact && parsedOptions.includes(value) === false) {
      value = '';
    }
  }
}

</script>

<!-- svelte-ignore a11y-label-has-associated-control -->
<label
  bind:this={root}
  class={cx('relative min-w-[6rem] w-full flex gap-1', {
    'z-[100]': open,
    'flex-col': labelposition === 'top',
    'items-center': labelposition === 'left',
  })}
  tabindex='-1'
  on:focusin={handleFocus}
  on:focusout={handleFocusOut}
  on:mousemove={() => setKeyboardControl(false)}
>
  <div class='flex items-center gap-1.5'>
    {#if label}
      <p class={cx('text-xs capitalize', {
        'opacity-50 pointer-events-none': isDisabled,
        'inline whitespace-nowrap': labelposition === 'left',
      })}>
        {label}
      </p>
    {/if}

    {#if tooltip}
      <v-tooltip text={tooltip}>
        <div class={cx({
          'icon-info-outline': state === 'info',
          'icon-error-outline text-orange-400': state === 'warn',
          'icon-error-outline text-red-600': state === 'error',
        })} />
      </v-tooltip>
    {/if}
  </div>

  <v-dropdown
    match
    open={open ? '' : undefined}
  >
    <div
      slot='target'
      class={cx('w-full border border-black', {
        'opacity-50 pointer-events-none bg-gray-200': isDisabled,
      })}
    >
      <div class='flex'>
        <input
          bind:this={input}
          {placeholder}
          value={isMultiple ? searchTerm : value}
          aria-disabled={isDisabled}
          readonly={isDisabled}
          type='text'
          class='py-1.5 pl-2.5 pr-1 grow text-xs border-0 bg-white outline-none appearance-none'
          on:input|preventDefault={handleInput}
          on:keyup|stopPropagation|preventDefault={handleKeyUp}
        >
        <button
          tabindex='-1'
          aria-label='Open dropdown'
          class={cx('py-1.5 px-1 grid place-content-center transition-transform duration-200', { 'rotate-180': open })}
          on:click={handleIconClick}
          on:focusin|stopPropagation
        >
          <v-icon class='flex' name='chevron-down' />
        </button>
      </div>

      {#if parsedSelected.length > 0 && showsPill}
        <div class='flex flex-wrap gap-2 p-1'>
          {#each parsedSelected as option (option)}
            <v-pill
              on:remove={() => handlePillClick(option)}
              value={option}
            />
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
          {#each searchedOptions as { search, option }, index (option)}
            <label
              class={cx('flex w-full gap-2 text-ellipsis whitespace-nowrap px-2 py-1.5 text-xs', {
                'bg-slate-200': navigationIndex === index,
                'text-gray-500': hasPrefix,
              })}
              on:mouseenter={() => handleOptionMouseEnter(index)}
            >
              <input
                tabindex="-1"
                type='checkbox'
                class={cx('bg-black outline-none', isMultiple ? '' : 'hidden')}
                checked={utils.shouldBeChecked(value, Array.isArray(option) ? option.join('') : option)}
                on:change={handleOptionSelect.bind(null, Array.isArray(option) ? option.join('') : option)}
                on:input|stopPropagation
                on:focus|preventDefault|stopPropagation
              >

              {#if search}

                <span class='flex w-full gap-2 text-ellipsis whitespace-nowrap'>
                  {#each splitOptionOnWord(option) as word, wordIndex}
                    <span class={cx('inline-block', {
                      'w-5 text-gray-800': hasPrefix && wordIndex === 0,
                    })}>
                      {#each [...word] as token}
                        <span class={cx({
                          'bg-yellow-100': token !== ' ' && typeof search[1] === 'string' && search[1].includes(token),
                        })}>{token}</span>
                      {/each}
                    </span>
                  {/each}
                </span>

              {:else if hasPrefix}

                {#each splitOptionOnWord(option) as optionPart, optionPartIndex (optionPart)}
                  <span
                    class={optionPartIndex === 0 ? 'text-gray-800 w-5' : ''}
                  >
                    { optionPart }
                  </span>
                {/each}

              {:else}
                { option }
              {/if}
            </label>
          {/each}

          {#if isMultiple && canClearAll}
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