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
import SelectMenu from './select-menu.svelte';
import type { SelectState } from './select.svelte';
import { type SortOptions, getSearchResults } from './search';
import { useUniqueId } from '$lib/unique-id';
import { clickOutside } from '$lib/click-outside';
import { selectControls } from './controls';
import { createSearchableSelectDispatcher } from './dispatcher';
import SelectInput from './select-input.svelte';
import type { IconName } from '$lib/icon/icons';

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

const menuId = useUniqueId('searchable-select');

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

const handleKeyDown = (event: KeyboardEvent) => {
  if (handleNavigation(event, menu, searchedOptions.length)) {
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

const handleButtonClick = () => dispatch('buttonclick');

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
      bind:heading
      bind:button
      on:buttonclick={handleButtonClick}
      on:mouseleave={resetNavigationIndex}
    >
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
    </SelectMenu>
  {/if}
</div>
