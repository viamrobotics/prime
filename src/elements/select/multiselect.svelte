<svelte:options immutable tag='v-multiselect' />

<script lang='ts'>

type LabelPosition = 'top' | 'left'

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
export let labelposition: LabelPosition = 'top';
export let disabled = 'false';
export let prefix = 'false';
export let tooltip = '';
export let state: 'info' | 'warn' | 'error' | '' = 'info';
export let showpill = 'true';
export let clearable = 'true';
export let withbutton = 'false';
export let buttontext = 'ENTER';
export let buttonicon = '';
export let sortoption: utils.SortOptions = 'default';
export let heading = '';
export let searchterm = '';

const dispatch = dispatcher();

addStyles();

let root: HTMLElement;
let input: HTMLInputElement;
let optionsContainer: HTMLElement;
let isDisabled: boolean;
let hasPrefix: boolean;
let showsPill: boolean;
let canClearAll: boolean;
let hasButton: boolean;
let isReduceSort: boolean;
let doesSearch: boolean;
let parsedOptions: string[];
let parsedSelected: string[];
let sortedOptions: string[];
let searchedOptions: { option: string; search?: string[] }[];


$: isDisabled = htmlToBoolean(disabled, 'disabled');
$: hasPrefix = htmlToBoolean(prefix, 'prefix');
$: showsPill = htmlToBoolean(showpill, 'showpill');
$: canClearAll = htmlToBoolean(clearable, 'clearable');
$: hasButton = htmlToBoolean(withbutton, 'withbutton');
$: isReduceSort = sortoption === 'reduce';
$: doesSearch = sortoption !== 'off';
$: parsedOptions = options.split(',').map((str) => str.trim());
$: parsedSelected = value.split(',').filter(Boolean).map((str) => str.trim());
$: sortedOptions = doesSearch ? applySearchSort(searchterm, parsedOptions) : parsedOptions;
$: searchedOptions = doesSearch ? utils.applySearchHighlight(sortedOptions, searchterm) :
  utils.applySearchHighlight(sortedOptions, '');

let open = false;
let navigationIndex = -1;
let keyboardControlling = false;

const setKeyboardControl = (toggle: boolean) => {
  keyboardControlling = toggle;
};

const applySearchSort = (term: string, options: string[]) => {
  if (options[0] === '' && options.length === 1) {
    return [];
  }
  return term ? searchSort(options, term, isReduceSort) : options;
};

const handleInput = (event: Event) => {
  navigationIndex = -1;
  optionsContainer.scrollTop = 0;
  event.stopImmediatePropagation();

  const newTerm = input.value.trim();
  dispatch('search', { term: newTerm });
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
  if (navigationIndex === -1) {
    // if user hits enter when focused on the search input
    dispatch('enter-press');
  } else {
    // if the user has used arrow keys to navigate options, enter should add/remove item
    const option = sortedOptions[navigationIndex]!;
    if (value.includes(option)) {
      const newValue = [...parsedSelected.filter(item => item !== option)]
      dispatch('input', { value: newValue.toString(), values: newValue, removed: option });
    } else {
      const newValue = [...parsedSelected, option];
      dispatch('input', { value: newValue.toString(), values: newValue, added: option });
    }
    input.focus();
  }
};

const handleNavigate = (direction: number) => {
  navigationIndex += direction;

  if (navigationIndex < 0) {
    navigationIndex = sortedOptions.length - 1;
  } else if (navigationIndex >= sortedOptions.length) {
    navigationIndex = 0;
  }

  const element = optionsContainer.children[0]!.children[navigationIndex]!;

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
  const newValue = [...parsedSelected.filter((item: string) => item !== target)];
  dispatch('input', { value: newValue.toString(), values: newValue, removed: target });
  input.focus();
};

const handleOptionMouseEnter = (index: number) => {
  if (keyboardControlling) {
    return;
  }

  navigationIndex = index;
};

const handleOptionSelect = (target: string, event: Event) => {
  const targetElement= event.target as HTMLInputElement
  const { checked } = (targetElement);
  // cannot suppress checkbox check
  if (targetElement.checked) {
    targetElement.checked = !checked
  }
  const newValue = checked
    ? [...parsedSelected, target]
    : [...parsedSelected.filter((item: string) => item !== target)];

  input.focus();
  if (checked) {
    dispatch('input', { value: newValue.toString(), values: newValue, added: target });
  } else {
    dispatch('input', { value: newValue.toString(), values: newValue, removed: target });
  }
};

const handleClearAll = () => {
  optionsContainer.scrollTop = 0;
  dispatch('input', { value: '', values: [] });
  dispatch('clear-all-click');
};

const handleButtonClick = () => {
  dispatch('button-click');
};

const splitOptionOnWord = (option: string) => {
  return option.split(' ');
};

$: {
  if (open) {
    dispatch('open');
  } else {
    dispatch('close');
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
          value={searchterm}
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
      <div bind:this={optionsContainer} class="options-container overflow-y-auto">
      {#if sortedOptions.length > 0}
        <div
          class='flex max-h-36 flex-col'
          on:mouseleave={clearNavigationIndex}
        >
          {#if heading}
            <span
              class='flex text-xs text-gray-500 pl-2 pt-2 flex-wrap'
            >
              {heading}
            </span>
          {/if}
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
                class={cx('bg-black outline-none')}
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
          {#if canClearAll}
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
      {#if hasButton}
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <v-select-button
          buttontext={buttontext}
          buttonicon={buttonicon}
          on:click={handleButtonClick}
        />
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