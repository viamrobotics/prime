<!--
@component
  
For selecting from a list of options.

```svelte
<SearchableSelect 
  options={["Option 1", "Option 2", "Option 3"]} 
  on:input={onSelect}
/>
```
-->
<svelte:options immutable />

<script lang="ts">
import cx from 'classnames';
import { uniqueId } from '$lib/unique-id';
import { clickOutside } from '$lib/click-outside';
import type { IconName } from '$lib/icon/icons';

import { selectControls } from './controls';
import { createSearchableSelectDispatcher } from './dispatcher';
import { type SortOptions, getSearchResults } from './search';
import SelectInput from './select-input.svelte';
import SelectMenuButton from './select-menu-button.svelte';
import SelectMenu from './select-menu.svelte';
import type { SelectState } from './select.svelte';

/** The options the user should be allowed to search and select from. */
export let options: string[] = [];

/** The value of the search input or the currently selected option, if any. */
export let value: string | undefined = undefined;

/** Whether or not the select should be rendered as disabled and be non-operable. */
export let disabled = false;

/** The state of the select (info, warn, error, success), if any. */
export let state: SelectState = 'none';

/**
 * How to handle sorting for the select:
 * - `default` will sort results with a match at the beginning of a word first,
 * followed by any other results with match, followed by results with no match.
 * - 'reduce' will do the same as `default` but will filter our results with
 * no match.
 * - `off` will apply no sorting or filtering.
 */
export let sort: SortOptions = 'default';

/**
 * An optional call-to-action button to render at the bottom of the select menu
 * that will emit the `buttonclick` event when actioned.
 */
export let button: { text: string; icon: IconName } | undefined = undefined;

/** An optional heading to render at the top of the select menu. */
export let heading = '';

/** Additional CSS classes to pass to the input container. */
let extraClasses: cx.Argument = '';
export { extraClasses as cx };

const dispatch = createSearchableSelectDispatcher<{
  /** When an option is selected, emit the value. */
  input: string | undefined;
}>();

const menuId = uniqueId('searchable-select');
let menu: HTMLUListElement;

$: searchedOptions = getSearchResults(options, value, sort);

const {
  isOpen,
  isKeyboardControlling,
  navigationIndex,
  close,
  resetNavigationIndex,
  handleNavigation,
  handleFocus,
  handleOptionFocus,
} = selectControls();

const handleInput = (event: Event) => {
  event.preventDefault();
  resetNavigationIndex();
  menu.scrollTop = 0;
  dispatch('search', value ?? '');
};

const handleButtonClick = () => dispatch('buttonclick');

const handleKeyDown = (event: KeyboardEvent, isButton = false) => {
  if (
    handleNavigation(
      event,
      menu,
      button === undefined ? searchedOptions.length : searchedOptions.length + 1
    )
  ) {
    return;
  }

  if (isButton) {
    return;
  }

  if (event.code.toLowerCase() === 'enter') {
    handleEnter();
  }
};

const handleEnter = () => {
  if ($navigationIndex > -1) {
    value = searchedOptions[$navigationIndex]!.option;
  } else {
    const result = searchedOptions.find(
      ({ option }) => option.toLowerCase() === value
    );

    if (result) {
      value = result.option;
    }
  }

  if ($isOpen) {
    close();
  }

  dispatch('input', value);
};

const handleSelect = (option: string) => {
  close();

  if (value === option) {
    return;
  }

  value = option;
  dispatch('input', value);
};

$: {
  if (!$isOpen && value && !options.includes(value)) {
    value = undefined;
    dispatch('input', value);
  }
}
</script>

<div
  class={cx('relative flex h-fit w-full', extraClasses)}
  use:clickOutside={close}
>
  <SelectInput
    bind:value
    isOpen={$isOpen}
    {menuId}
    {disabled}
    {state}
    {...$$restProps}
    on:input={handleInput}
    on:keydown={handleKeyDown}
    on:focus={() => handleFocus(disabled)}
    on:mousemove={() => ($isKeyboardControlling = false)}
    on:click={() => ($isOpen ? close() : handleFocus(disabled))}
  />

  {#if !disabled}
    <SelectMenu
      open={$isOpen}
      id={menuId}
      bind:element={menu}
      on:mouseleave={resetNavigationIndex}
    >
      {#if heading}
        <li
          role="presentation"
          class="flex flex-wrap py-1 pl-2 text-xs text-default"
        >
          {heading}
        </li>
      {/if}

      {#if searchedOptions.length > 0}
        {#each searchedOptions as { highlight, option }, index (option)}
          <li role="presentation">
            <button
              role="menuitem"
              tabindex="-1"
              class={cx(
                'flex h-7.5 w-full items-center text-ellipsis whitespace-nowrap px-2 text-xs outline-none',
                {
                  'bg-light': $navigationIndex === index,
                }
              )}
              on:mouseenter={() => handleOptionFocus(index)}
              on:keydown={handleKeyDown}
              on:click|preventDefault={() => handleSelect(option)}
            >
              {#if highlight !== undefined}
                <span class="flex w-full text-ellipsis whitespace-nowrap">
                  <span class="whitespace-pre">{highlight[0]}</span>
                  <span class="whitespace-pre bg-yellow-100"
                    >{highlight[1]}</span
                  >
                  <span class="whitespace-pre">{highlight[2]}</span>
                </span>
              {:else}
                {option}
              {/if}
            </button>
          </li>
        {/each}
      {:else}
        <li class="flex justify-center px-2 py-1 text-xs">
          No matching results
        </li>
      {/if}

      {#if button !== undefined}
        <SelectMenuButton
          icon={button.icon}
          cx={[
            'border-t border-light',
            {
              'bg-light': $navigationIndex === searchedOptions.length,
            },
          ]}
          on:click={handleButtonClick}
          on:mouseenter={() => handleOptionFocus(searchedOptions.length)}
          on:keydown={(event) => handleKeyDown(event, true)}
        >
          {button.text}
        </SelectMenuButton>
      {/if}
    </SelectMenu>
  {/if}
</div>
