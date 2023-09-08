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

export let options: string[] = [];
export let value: string | undefined = undefined;
export let disabled = false;
export let state: SelectState = 'none';
export let sort: SortOptions = 'default';
export let button: { text: string; icon: string } | undefined = undefined;
export let heading = '';

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
  class="relative flex h-fit w-full"
  use:clickOutside={close}
>
  <SelectInput
    bind:value
    {menuId}
    {disabled}
    {state}
    isOpen={$isOpen}
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
                'h-7.5 flex w-full items-center text-ellipsis whitespace-nowrap px-2 text-xs outline-none',
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
