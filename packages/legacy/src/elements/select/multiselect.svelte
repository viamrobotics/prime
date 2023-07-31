<svelte:options immutable />

<script lang="ts">
type LabelPosition = 'top' | 'left';

import cx from 'classnames';
import { searchSort } from '../../lib/sort';
import { htmlToBoolean } from '../../lib/boolean';
import { dispatcher } from '../../lib/dispatch';
import * as utils from './utils';

export let options = '';
export let value = '';
export let placeholder = '';
export let label = '';
export let labelposition: LabelPosition = 'top';
export let disabled = 'false';
export let readonly = 'false';
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
export let message = '';

const dispatch = dispatcher();

let root: HTMLElement;
let input: HTMLInputElement;
let optionsContainer: HTMLElement;
let isDisabled: boolean;
let isReadonly: boolean;
let hasPrefix: boolean;
let showsPill: boolean;
let canClearAll: boolean;
let hasButton: boolean;
let isReduceSort: boolean;
let doesSearch: boolean;
let parsedOptions: string[];
let parsedSelected: string[];
let sortedOptions: string[];
let searchedOptions: { option: string; search?: string[] | undefined }[];

$: isDisabled = htmlToBoolean(disabled, 'disabled');
$: isReadonly = htmlToBoolean(readonly, 'readonly');
$: hasPrefix = htmlToBoolean(prefix, 'prefix');
$: showsPill = htmlToBoolean(showpill, 'showpill');
$: canClearAll = htmlToBoolean(clearable, 'clearable');
$: hasButton = htmlToBoolean(withbutton, 'withbutton');
$: isReduceSort = sortoption === 'reduce';
$: doesSearch = sortoption !== 'off';
$: parsedOptions = options.split(',').map((str) => str.trim());
$: parsedSelected = value
  .split(',')
  .filter(Boolean)
  .map((str) => str.trim());
$: sortedOptions = doesSearch
  ? applySearchSort(searchterm, parsedOptions)
  : reduceEmptyOptions(parsedOptions);
$: searchedOptions = doesSearch
  ? utils.applySearchHighlight(sortedOptions, searchterm)
  : utils.applySearchHighlight(sortedOptions, '');

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
  if (reduceEmptyOptions(options).length === 0) {
    return [];
  }

  return term ? searchSort(options, term, isReduceSort) : options;
};

const handleInput = (event: Event) => {
  navigationIndex = -1;
  optionsContainer.scrollTop = 0;
  event.stopImmediatePropagation();

  searchterm = input.value.trim();
  dispatch(event, 'search', { term: searchterm });
};

const handleKeyUp = (event: KeyboardEvent) => {
  setKeyboardControl(true);

  switch (event.key.toLowerCase()) {
    case 'enter':
      return handleEnter(event);
    case 'arrowup':
      return handleNavigate(-1);
    case 'arrowdown':
      return handleNavigate(+1);
    case 'escape':
      return handleEscape();
  }
};

const handleEnter = (event: Event) => {
  if (navigationIndex === -1) {
    // if user hits enter when focused on the search input
    const match = sortedOptions.find(
      (opt) => opt.toLowerCase() === searchterm.toLowerCase()
    );
    if (match) {
      handleChange(match, event);
    } else {
      dispatch(event, 'enter-press', { options: sortedOptions });
    }
  } else {
    // if the user has used arrow keys to navigate options, enter should add/remove item
    const option = sortedOptions[navigationIndex]!;
    handleChange(option, event);
  }
};

const handleChange = (changedOption: string, event: Event) => {
  if (parsedSelected.includes(changedOption)) {
    const newValue = parsedSelected.filter((item) => item !== changedOption);
    value = newValue.toString();
    dispatch(event, 'input', {
      value,
      values: newValue,
      removed: changedOption,
    });
  } else {
    const newValue = [...parsedSelected, changedOption];
    value = newValue.toString();
    dispatch(event, 'input', { value, values: newValue, added: changedOption });
  }
  input.focus();
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

const handleFocus = (event: Event) => {
  if (open || isDisabled || isReadonly) {
    return;
  }

  open = true;
  input.focus();
  navigationIndex = 0;
  dispatch(event, 'open');
};

const handleFocusOut = (event: FocusEvent) => {
  if (!root.contains(event.relatedTarget as Node)) {
    open = false;
    navigationIndex = -1;
    dispatch(event, 'closed');
  }
};

const handlePillClick = (target: string) => {
  return (event: Event) => {
    if (!isReadonly) {
      const newValue = parsedSelected.filter((item: string) => item !== target);
      value = newValue.toString();
      dispatch(event, 'input', { value, values: newValue, removed: target });
    }
  };
};

const handleOptionMouseEnter = (index: number) => {
  if (keyboardControlling) {
    return;
  }

  navigationIndex = index;
};

const handleOptionSelect = (target: string, event: Event) => {
  const targetElement = event.target as HTMLInputElement;
  const { checked } = targetElement;
  // cannot suppress checkbox check
  if (targetElement.checked) {
    targetElement.checked = !checked;
  }
  const newValue = checked
    ? [...parsedSelected, target]
    : parsedSelected.filter((item: string) => item !== target);

  value = newValue.toString();

  input.focus();
  if (checked) {
    dispatch(event, 'input', { value, values: newValue, added: target });
  } else {
    dispatch(event, 'input', { value, values: newValue, removed: target });
  }
};

const handleClearAll = (event: Event) => {
  optionsContainer.scrollTop = 0;
  value = '';
  dispatch(event, 'input', { value: '', values: [] });
  dispatch(event, 'clear-all-click');
};

const handleButtonClick = (event: Event) => {
  dispatch(event, 'button-click');
};

const splitOptionOnWord = (option: string) => {
  return option.split(' ');
};

let icon = '';

$: {
  switch (state) {
    case 'warn':
    case 'error': {
      icon = 'alert-circle-outline';
      break;
    }
    case 'info': {
      icon = 'information-outline';
      break;
    }
  }
}
</script>

<!-- svelte-ignore a11y-label-has-associated-control -->
<div class="relative">
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
            'text-subtle-1': !isDisabled && !isReadonly,
            'text-black/50': isDisabled || isReadonly,
            'inline whitespace-nowrap': labelposition === 'left',
          })}
        >
          {label}
        </p>
      {/if}

      {#if tooltip}
        <v-tooltip text={tooltip}>
          <div
            class={cx('text-subtle-2', {
              'text-warning-bright': state === 'warn',
              'text-danger-dark': state === 'error',
              'text-black/50': isDisabled || isReadonly,
            })}
          >
            <v-icon name={icon} />
          </div>
        </v-tooltip>
      {/if}
    </div>

    <v-dropdown match open={open ? '' : undefined} class="relative">
      <div slot="target" class="w-full">
        <div class="flex">
          <input
            bind:this={input}
            {placeholder}
            value={searchterm}
            readonly={isDisabled || isReadonly ? true : undefined}
            aria-disabled={isDisabled ? true : undefined}
            type="text"
            class={cx(
              'py-1.5 pl-2 pr-1 grow text-xs outline-none appearance-none w-full border bg-white',
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
                'pointer-events-none !bg-disabled-light text-disabled-dark border-disabled-light':
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

        <div
          slot="content"
          class={cx(
            'absolute mt-1 left-0 w-full border border-black bg-white drop-shadow-md',
            {
              hidden: !open,
            }
          )}
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
                  <span class="flex text-xs text-default pl-1.5 py-1 flex-wrap">
                    {heading}
                  </span>
                {/if}
                {#each searchedOptions as { search, option }, index (option)}
                  <label
                    class={cx(
                      'flex w-full gap-2 text-ellipsis whitespace-nowrap px-2 py-1 text-xs',
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
                      class={cx('bg-black outline-none')}
                      checked={utils.shouldBeChecked(
                        value,
                        Array.isArray(option) ? option.join('') : option
                      )}
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
                          class={optionPartIndex === 0
                            ? 'text-gray-800 w-5'
                            : ''}
                        >
                          {optionPart}
                        </span>
                      {/each}
                    {:else}
                      {option}
                    {/if}
                  </label>
                {/each}
                {#if canClearAll}
                  <button
                    class="w-full px-2 py-1 hover:bg-light text-xs text-left"
                    on:mouseenter={clearNavigationIndex}
                    on:click={handleClearAll}
                  >
                    Clear all
                  </button>
                {/if}
              </div>
            {:else}
              <div class="flex py-1 px-2.5 justify-center text-xs">
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
      </div>
    </v-dropdown>
  </label>
  {#if parsedSelected.length > 0 && showsPill}
    <div
      class={cx('flex flex-wrap gap-2 pt-2', {
        'cursor-not-allowed pointer-events-none': isDisabled || isReadonly,
        'text-black/50': isDisabled || isReadonly,
      })}
    >
      {#each parsedSelected as option (option)}
        <v-pill
          on:remove={handlePillClick(option)}
          value={option}
          {readonly}
          {disabled}
        />
      {/each}
    </div>
  {/if}

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
</div>

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
