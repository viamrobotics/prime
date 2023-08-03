<svelte:options immutable />

<script lang="ts">
type LabelPosition = 'top' | 'left';

// This entire component is pretty hacked together and should be refactored. Maybe split multi / single select.
import cx from 'classnames';
import { searchSort } from '../../lib/sort';
import { htmlToBoolean } from '../../lib/boolean';
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
let searchedOptions: { option: string; search?: string[] | undefined }[];

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
  : reduceEmptyOptions(parsedOptions);
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

const reduceEmptyOptions = (options: string[]) => {
  if (options[0] === '' && options.length === 1) {
    return [];
  }
  return options;
};

const applySearchSort = (term: string, options: string[]) => {
  if (root) {
    dispatch({ target: root }, 'search', { term });
  }

  if (reduceEmptyOptions(options).length === 0) {
    return [];
  }

  return term ? searchSort(options, term, isReduceSort) : options;
};

const handleInput = () => {
  navigationIndex = -1;
  optionsContainer.scrollTop = 0;
  value = input.value.trim();
  if (root) {
    dispatch({ target: root }, 'input', { value });
  }
};

const handleKeyUp = (event: KeyboardEvent) => {
  setKeyboardControl(true);
  switch (event.key.toLowerCase()) {
    case 'enter': {
      return handleEnter();
    }
    case 'arrowup': {
      return handleNavigate(-1);
    }
    case 'arrowdown': {
      return handleNavigate(+1);
    }
    case 'escape': {
      return handleEscape();
    }
  }
};

const handleEnter = () => {
  if (navigationIndex > -1) {
    value = sortedOptions[navigationIndex]!;
    if (root) {
      dispatch({ target: root }, 'change', { value });
    }
  } else {
    const result = sortedOptions.find((item) => item.toLowerCase() === value);

    if (result) {
      value = result;
      if (root) {
        dispatch({ target: root }, 'change', { value });
      }
    }
  }
  if (open) {
    input.blur();
  }

  if (root) {
    dispatch({ target: root }, 'input', { value });
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

  if (!utils.isElementInScrollView(element)) {
    element.scrollIntoView();
  }
};

const handleOptionSelect = (target: string, event: Event) => {
  const { checked } = event.target as HTMLInputElement;
  if (value === target) {
    if (root) {
      dispatch({ target: root }, 'change', { value });
    }
    event.preventDefault();
    open = false;
    return;
  }

  value = checked ? target : '';

  open = false;
  if (root) {
    dispatch({ target: root }, 'change', { value });
    dispatch({ target: root }, 'input', { value });
  }
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

const handleOptionMouseEnter = (index: number) => {
  if (keyboardControlling) {
    return;
  }

  navigationIndex = index;
};

const handleButtonClick = () => {
  if (root) {
    dispatch({ target: root }, 'button-click');
  }
};

const splitOptionOnWord = (option: string) => {
  return option.split(' ');
};

let icon = '';

$: {
  if (!open && isExact && !parsedOptions.includes(value)) {
    value = '';
  }

  switch (state) {
    case 'warn': {
      icon = 'alert-circle-outline';
      break;
    }
    case 'info': {
      icon = 'information-outline';
      break;
    }
    case 'error': {
      icon = 'alert-circle-outline';
      break;
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
  tabindex="-1"
  on:focusin={handleFocus}
  on:focusout={handleFocusOut}
  on:mousemove={() => setKeyboardControl(false)}
>
  <div class="flex items-center gap-1.5">
    {#if label}
      <p
        class={cx('text-xs', {
          'text-xsbtle-1': !isDisabled && !isReadonly,
          'text-disabled-dark': isDisabled || isReadonly,
          'inline whitespace-nowrap': labelposition === 'left',
        })}
      >
        {label}
      </p>
    {/if}

    {#if tooltip}
      <v-tooltip text={tooltip}>
        <v-icon
          class={cx('gextext-xs', {
            'text-warning-bright': state === 'warn',
            'text-danger-dark': state === 'error',
            'text-gray-6': state !== 'warn' && state !== 'error',
          })}
          name={icon}
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
            'pl-2 py-1.5 pr-1 grow text-xs outline-none appearance-none w-full border bg-white',
            {
              'border-light hover:border-medium focus:border-gray-9':
                !isDisabled &&
                !isReadonly &&
                state !== 'error' &&
                state !== 'warn',
              'border-danger-dark -outline-offset-1 outline-[2px] outline-danger-dark':
                state === 'error',
              'border-warning-bright -outline-offset-1 outline-[2px] outline-warning-bright':
                state === 'warn',
              'border-disabled-light !bg-disabled-light text-disabled-dark':
                isDisabled || isReadonly,
            }
          )}
          on:input|preventDefault={handleInput}
          on:keyup|preventDefault={handleKeyUp}
        />
        <button
          tabindex="-1"
          aria-label="Open dropdown"
          class={cx(
            'absolute top-0 right-1 h-[29px]',
            'py-1.5 px-1 grid place-content-center transition-transform duration-200',
            {
              'rotate-180': open,
              'text-disabled-dark': isDisabled || isReadonly,
            }
          )}
        >
          <v-icon
            class={cx({
              'text-gray-6': !isDisabled && !isReadonly,
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
              <span class="flex text-xs text-default pl-2 py-1 flex-wrap">
                {heading}
              </span>
            {/if}
            {#each searchedOptions as { search, option }, index (option)}
              <label
                class={cx(
                  'flex w-full gap-2 text-ellipsis whitespace-nowrap px-2 py-1.5 text-xs',
                  {
                    'bg-light': navigationIndex === index,
                    'text-default': hasPrefix,
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
                  on:input|stopPropagation
                  on:change={handleOptionSelect.bind(
                    null,
                    Array.isArray(option) ? option.join('') : option
                  )}
                  on:focus|preventDefault
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
          <div class="flex py-1 px-2 justify-center text-xs">
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
