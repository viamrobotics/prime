<svelte:options immutable tag="v-select" />

<script lang="ts">
type LabelPosition = 'top' | 'left';

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
export let label: string;
export let labelposition: LabelPosition = 'top';
export let disabled: string;
export let readonly: string;
export let exact = 'false';
export let prefix = 'false';
export let tooltip = '';
export let state: 'info' | 'warn' | 'error' | '' = 'info';
export let withbutton = 'false';
export let buttontext = 'ENTER';
export let buttonicon = '';
export let sortoption: utils.SortOptions = 'default';
export let message = '';
export let heading = '';

const dispatch = dispatcher();

addStyles();

let root: HTMLElement;
let input: HTMLInputElement;
let optionsContainer: HTMLElement;
let isDisabled: boolean;
let isReadonly: boolean;
let isExact: boolean;
let hasPrefix: boolean;
let hasButton: boolean;
let isReduceSort: boolean;
let doesSearch: boolean;
let parsedOptions: string[];
let sortedOptions: string[];
let searchedOptions: { option: string; search?: string[] }[];

$: isDisabled = htmlToBoolean(disabled, 'disabled');
$: isReadonly = htmlToBoolean(readonly, 'readonly');
$: isExact = htmlToBoolean(exact, 'exact');
$: hasPrefix = htmlToBoolean(prefix, 'prefix');
$: hasButton = htmlToBoolean(withbutton, 'withbutton');
$: isReduceSort = sortoption === 'reduce';
$: doesSearch = sortoption !== 'off';
$: parsedOptions = options.split(',').map((str) => str.trim());
$: sortedOptions = doesSearch
  ? applySearchSort(value, parsedOptions)
  : parsedOptions;
$: searchedOptions = utils.applySearchHighlight(
  sortedOptions,
  doesSearch ? value : ''
);

let open = false;
let navigationIndex = -1;
let keyboardControlling = false;

const setKeyboardControl = (toggle: boolean) => {
  keyboardControlling = toggle;
};

const applySearchSort = (term: string, options: string[]) => {
  dispatch('search', { term });
  return term ? searchSort(options, term, isReduceSort) : options;
};

const handleInput = (event: Event) => {
  navigationIndex = -1;
  optionsContainer.scrollTop = 0;
  event.stopImmediatePropagation();
  value = input.value.trim();
  dispatch('input', { value });
};

const handleKeyUp = (event: KeyboardEvent) => {
  setKeyboardControl(true);
  switch (event.key.toLowerCase()) {
    case 'enter':
      return handleEnter();
    case 'arrowup':
      return handleNavigate(-1);
    case 'arrowdown':
      return handleNavigate(+1);
    case 'escape':
      return handleEscape();
  }
};

const handleEnter = () => {
  if (navigationIndex > -1) {
    value = sortedOptions[navigationIndex]!;
  } else {
    const result = sortedOptions.find((item) => item.toLowerCase() === value);

    if (result) {
      value = result;
      dispatch('change', { value });
    } else {
      value = '';
    }
  }
  if (open) {
    input.blur();
  }

  dispatch('input', { value });
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

const handleOptionSelect = (target: string, event: Event) => {
  const { checked } = event.target as HTMLInputElement;
  if (value === target) {
    event.preventDefault();
    open = false;
    return;
  }

  value = checked ? target : '';

  open = false;
  dispatch('input', { value });
  dispatch('change', { value });
};

const clearNavigationIndex = () => {
  navigationIndex = -1;
};

const handleEscape = () => {
  input.blur();
};

const handleFocus = () => {
  if (open || isDisabled || isReadonly) {
    return;
  }

  open = true;
  input.focus();
  navigationIndex = 0;
};

const handleFocusOut = (event: FocusEvent) => {
  if (!root.contains(event.relatedTarget as Node)) {
    open = false;
    navigationIndex = -1;
  }
};

const handleIconClick = () => {
  if (open) {
    open = false;
  } else {
    input.focus();
  }
};

const handleOptionMouseEnter = (index: number) => {
  if (keyboardControlling) {
    return;
  }

  navigationIndex = index;
};

const handleButtonClick = () => {
  dispatch('button-click');
};

const splitOptionOnWord = (option: string) => {
  return option.split(' ');
};

$: {
  if (!open && isExact && parsedOptions.includes(value) === false) {
    value = '';
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
  tabindex="-1"
  on:focusin={handleFocus}
  on:focusout={handleFocusOut}
  on:mousemove={() => setKeyboardControl(false)}
>
  <div class="flex items-center gap-1.5">
    {#if label}
      <p
        class={cx('text-xs', {
          'text-text-subtle-1': !isDisabled && !isReadonly,
          'text-disabled-fg': isDisabled || isReadonly,
          'inline whitespace-nowrap': labelposition === 'left',
        })}
      >
        {label}
      </p>
    {/if}

    {#if tooltip}
      <v-tooltip text={tooltip}>
        <div
          class={cx({
            'icon-info-outline': state === 'info',
            'icon-error-outline text-warning-bright': state === 'warn',
            'icon-error-outline text-danger-fg': state === 'error',
          })}
        />
      </v-tooltip>
    {/if}
  </div>

  <v-dropdown match open={open ? '' : undefined}>
    <div slot="target" class="w-full">
      <div class="flex">
        <input
          bind:this={input}
          {placeholder}
          {value}
          aria-disabled={isDisabled ? true : undefined}
          readonly={isDisabled || isReadonly ? true : undefined}
          type="text"
          class={cx(
            'py-1.5 pl-2.5 pr-1 grow text-xs outline-none appearance-none w-full border bg-white',
            {
              'border-border-1 hover:border-border-2 focus:border-gray-9':
                !isDisabled &&
                !isReadonly &&
                state !== 'error' &&
                state !== 'warn',
              'border-danger-fg -outline-offset-1 outline-[2px] outline-danger-fg':
                state === 'error',
              'border-warning-bright -outline-offset-1 outline-[2px] outline-warning-bright':
                state === 'warn',
              'border-disabled-bg !bg-disabled-bg text-disabled-fg':
                isDisabled || isReadonly,
            }
          )}
          on:input|preventDefault={handleInput}
          on:keyup|stopPropagation|preventDefault={handleKeyUp}
        />
        <button
          tabindex="-1"
          aria-label="Open dropdown"
          class={cx(
            'absolute top-0 right-1 h-[29px]',
            'py-1.5 px-1 grid place-content-center transition-transform duration-200',
            {
              'rotate-180': open,
              'text-disabled-fg': isDisabled || isReadonly,
            }
          )}
          on:click={handleIconClick}
          on:focusin|stopPropagation
        >
          <v-icon
            class={cx('flex', {
              'text-disabled-fg': isDisabled,
              'text-gray-6': !isDisabled,
            })}
            name="chevron-down"
          />
        </button>
      </div>
    </div>

    <div
      slot="content"
      class="mt-1 border border-gray-9 bg-white drop-shadow-md"
    >
      <div
        bind:this={optionsContainer}
        class="options-container overflow-y-auto"
      >
        {#if sortedOptions.length > 0}
          <div
            class="flex max-h-36 flex-col"
            on:mouseleave={clearNavigationIndex}
          >
            {#if heading}
              <span class="flex text-xs text-gray-500 pl-2 py-2 flex-wrap">
                {heading}
              </span>
            {/if}
            {#each searchedOptions as { search, option }, index (option)}
              <label
                class={cx(
                  'flex w-full gap-2 text-ellipsis whitespace-nowrap px-2 py-1.5 text-xs',
                  {
                    'bg-slate-200': navigationIndex === index,
                    'text-gray-500': hasPrefix,
                  }
                )}
                on:mouseenter={() => handleOptionMouseEnter(index)}
              >
                <input
                  tabindex="-1"
                  type="checkbox"
                  class="bg-black outline-none hidden"
                  checked={utils.shouldBeChecked(
                    value,
                    Array.isArray(option) ? option.join('') : option
                  )}
                  on:change={handleOptionSelect.bind(
                    null,
                    Array.isArray(option) ? option.join('') : option
                  )}
                  on:input|stopPropagation
                  on:focus|preventDefault|stopPropagation
                />

                {#if search}
                  <span
                    class="flex w-full gap-2 text-ellipsis whitespace-nowrap"
                  >
                    {#each splitOptionOnWord(option) as word, wordIndex}
                      <span
                        class={cx('inline-block', {
                          'w-5 text-gray-800': hasPrefix && wordIndex === 0,
                        })}
                      >
                        {#each [...word] as token}
                          <span
                            class={cx({
                              'bg-yellow-100':
                                token !== ' ' &&
                                typeof search[1] === 'string' &&
                                search[1].includes(token),
                            })}>{token}</span
                          >
                        {/each}
                      </span>
                    {/each}
                  </span>
                {:else if hasPrefix}
                  {#each splitOptionOnWord(option) as optionPart, optionPartIndex (optionPart)}
                    <span
                      class={optionPartIndex === 0 ? 'text-gray-800 w-5' : ''}
                    >
                      {optionPart}
                    </span>
                  {/each}
                {:else}
                  {option}
                {/if}
              </label>
            {/each}
          </div>
        {:else}
          <div class="flex py-1.5 px-2.5 justify-center text-xs">
            No matching results
          </div>
        {/if}
      </div>
      {#if hasButton}
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <v-select-button
          {buttontext}
          {buttonicon}
          on:click={handleButtonClick}
        />
      {/if}
    </div>
  </v-dropdown>

  {#if message}
    <span
      class={cx('text-xs', {
        'text-red-600': state === 'error',
        'text-warning-bright': state === 'warn',
      })}
    >
      {message}
    </span>
  {/if}
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
