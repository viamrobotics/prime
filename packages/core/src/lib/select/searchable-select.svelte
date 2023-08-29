<svelte:options immutable />

<script lang="ts">
import { createEventDispatcher } from 'svelte';
import cx from 'classnames';
import Icon from '$lib/icon/icon.svelte';
import SelectMenu from './select-menu.svelte';
import type { SelectState } from './select.svelte';
import { isOptionInScrollView } from './scroll';
import {
  type SortOptions,
  getSearchResults,
  type SearchResult,
} from './search';
import { useUniqueId } from '$lib/unique-id';
import { clickOutside } from '$lib/click-outside';

export let options: string[] = [];
export let value: string | undefined = undefined;
export let disabled = false;
export let state: SelectState = 'none';
export let sort: SortOptions = 'default';
export let button: { text: string; icon: string } | undefined = undefined;
export let heading = '';

const dispatch = createEventDispatcher<{
  input: string | undefined;
  change: string | undefined;
  search: string;
  buttonclick: undefined;
}>();

const menuId = useUniqueId('searchable-select');
let menu: HTMLUListElement;

let open = false;
let navigationIndex = -1;
let keyboardControlling = false;
let searchedOptions: SearchResult[] = [];

$: isWarn = state === 'warn';
$: isError = state === 'error';

const setKeyboardControl = (toggle: boolean) => {
  keyboardControlling = toggle;
};

const closeMenu = () => {
  open = false;
  navigationIndex = -1;
};

const handleInput = () => {
  navigationIndex = -1;
  menu.scrollTop = 0;
  dispatch('input', value);
};

const handleKeyDown = (event: KeyboardEvent) => {
  setKeyboardControl(true);
  switch (event.key.toLowerCase()) {
    case 'enter': {
      return handleEnter();
    }
    case 'arrowup': {
      event.preventDefault();
      return handleNavigate(-1);
    }
    case 'arrowdown': {
      event.preventDefault();
      return handleNavigate(+1);
    }
    case 'escape':
    case 'tab': {
      return closeMenu();
    }
  }
};

const handleEnter = () => {
  if (navigationIndex > -1) {
    value = searchedOptions[navigationIndex]!.option;
    dispatch('change', value);
  } else {
    const result = searchedOptions.find(
      ({ option }) => option.toLowerCase() === value
    );

    if (result) {
      value = result.option;
      dispatch('change', value);
    }
  }

  if (open) {
    closeMenu();
  }

  dispatch('input', value);
};

const handleNavigate = (direction: number) => {
  navigationIndex += direction;

  if (navigationIndex < 0) {
    navigationIndex = searchedOptions.length - 1;
  } else if (navigationIndex >= searchedOptions.length) {
    navigationIndex = 0;
  }

  const element = menu.children[navigationIndex]!;

  if (!isOptionInScrollView(element)) {
    element.scrollIntoView({ block: 'nearest' });
  }

  (element.children[0] as HTMLButtonElement).focus();
};

const handleSelect = (option: string) => {
  open = false;

  if (value === option) {
    return;
  }

  value = option;

  dispatch('change', value);
  dispatch('input', value);
};

const handleFocus = () => {
  if (open || disabled) {
    return;
  }

  open = true;
};

const handleOptionFocus = (index: number) => {
  if (!keyboardControlling) {
    navigationIndex = index;
  }
};

const handleMouseLeave = () => (navigationIndex = -1);
const handleButtonClick = () => dispatch('buttonclick');

$: {
  searchedOptions = getSearchResults(options, value, sort);
  if (options.length > 0 && value) {
    dispatch('search', value);
  }
}

$: {
  if (!open && value && !options.includes(value)) {
    value = undefined;
    dispatch('change', value);
    dispatch('input', value);
  }
}
</script>

<div
  class="relative flex w-full"
  use:clickOutside={closeMenu}
>
  <div class="flex w-full">
    <input
      bind:value
      role="combobox"
      aria-controls={menuId}
      aria-expanded={open}
      readonly={disabled ? true : undefined}
      aria-disabled={disabled ? true : undefined}
      type="text"
      class={cx(
        'h-[30px] w-full grow appearance-none border py-1.5 pl-2 pr-1 text-xs leading-tight outline-none',
        {
          'border-light hover:border-gray-6 focus:border-gray-9 bg-white':
            !disabled && !isError && !isWarn,
          'border-disabled-light focus:border-disabled-dark bg-disabled-light text-disabled-dark cursor-not-allowed':
            disabled,
          'border-warning-bright hover:outline-warning-bright focus:outline-warning-bright hover:outline-[1.5px] hover:-outline-offset-1 focus:outline-[1.5px] focus:-outline-offset-1':
            isWarn,
          'border-danger-dark hover:outline-danger-dark focus:outline-danger-dark hover:outline-[1.5px hover:-outline-offset-1 focus:outline-[1.5px] focus:-outline-offset-1':
            isError,
        }
      )}
      {...$$restProps}
      on:input|preventDefault={handleInput}
      on:keydown={handleKeyDown}
      on:focus={handleFocus}
      on:mousemove={() => setKeyboardControl(false)}
    />

    <Icon
      name="chevron-down"
      cx={[
        'text-gray-6 absolute top-1.5 right-2 transition',
        { 'rotate-180': open },
      ]}
    />
  </div>
  <SelectMenu
    {open}
    id={menuId}
    bind:element={menu}
    bind:heading
    bind:button
    on:buttonclick={handleButtonClick}
    on:mouseleave={handleMouseLeave}
  >
    {#if searchedOptions.length > 0}
      {#each searchedOptions as { highlight, option }, index (option)}
        <li role="presentation">
          <button
            role="menuitem"
            tabindex="-1"
            class={cx(
              'flex h-[30px] w-full items-center text-ellipsis whitespace-nowrap px-2 text-xs outline-none',
              {
                'bg-light': navigationIndex === index,
              }
            )}
            on:mouseenter={() => handleOptionFocus(index)}
            on:focus={() => handleOptionFocus(index)}
            on:keydown={handleKeyDown}
            on:click|preventDefault={() => handleSelect(option)}
          >
            {#if highlight !== undefined}
              <span class="flex w-full text-ellipsis whitespace-nowrap">
                <span class="whitespace-pre">{highlight[0]}</span>
                <span class="whitespace-pre bg-yellow-100">{highlight[1]}</span>
                <span class="whitespace-pre">{highlight[2]}</span>
              </span>
            {:else}
              {option}
            {/if}
          </button>
        </li>
      {/each}
    {:else}
      <li class="flex justify-center px-2 py-1 text-xs">No matching results</li>
    {/if}
  </SelectMenu>
</div>
