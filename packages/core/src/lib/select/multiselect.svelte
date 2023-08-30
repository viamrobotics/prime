<!--
@component
  
For selecting multiple options from a list.

```svelte
<Multiselect 
  options={["Option 1", "Option 2", "Option 3"]} 
  on:input={onSelect}
/>
```
-->
<svelte:options immutable />

<script lang="ts">
import cx from 'classnames';

import { clickOutside } from '$lib/click-outside';
import { useUniqueId } from '$lib/unique-id';

import SelectMenu from './select-menu.svelte';
import type { SelectState } from './select.svelte';
import { getSearchResults, type SortOptions } from './search';

import { selectControls } from './controls';
import Pill from '$lib/pill.svelte';
import { createSearchableSelectDispatcher } from './dispatcher';
import SelectInput from './select-input.svelte';

export let options: string[] = [];
export let selected: string[] = [];
export let value: string | undefined = undefined;
export let disabled = false;
export let state: SelectState = 'none';
export let sort: SortOptions = 'default';
export let showPills = true;
export let clearable = false;
export let button: { text: string; icon: string } | undefined = undefined;
export let heading = '';

const dispatch = createSearchableSelectDispatcher<{
  /**
   * When an option is (un)selected, emit the selected options and optionally
   * the added/removed option.
   */
  input: { selected: string[]; added?: string; removed?: string };

  /** When all selected options are cleared, emit this. */
  clear: null;
}>();

const menuId = useUniqueId('multiselect');

let menu: HTMLUListElement;

$: searchedOptions = getSearchResults(options, value, sort);
$: isChecked = (option: string) => selected.includes(option);

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

const handleKeyDown = (event: KeyboardEvent, clear = false) => {
  if (
    handleNavigation(
      event,
      menu,
      clearable ? searchedOptions.length + 1 : searchedOptions.length
    )
  ) {
    return;
  }

  if (clear) {
    return;
  }

  if (event.code.toLowerCase() === 'enter') {
    handleEnter(event);
  }
};

const handleEnter = (event: KeyboardEvent) => {
  const target = event.target as HTMLInputElement;
  const { checked } = target;

  target.checked = !checked;

  if ($navigationIndex === -1) {
    // if user hits enter when focused on the search input
    const match = searchedOptions.find(
      ({ option }) => option.toLowerCase() === value?.toLowerCase()
    );

    if (match) {
      handleOptionSelect(match.option);
    }
  } else {
    // if the user has used arrow keys to navigate options, enter should add/remove item
    const { option } = searchedOptions[$navigationIndex]!;
    handleOptionSelect(option);
  }
};

const handlePillClick = (target: string) => {
  return () => {
    if (!disabled) {
      selected = selected.filter((option) => option !== target);
      dispatch('input', { selected, removed: target });
    }
  };
};

const handleOptionSelect = (option: string) => {
  const checked = isChecked(option);
  selected = checked
    ? selected.filter((item) => option !== item)
    : [...selected, option];

  dispatch('input', {
    selected,
    ...(checked ? { added: option } : { removed: option }),
  });
};

const handleClearAll = () => {
  menu.scrollTop = 0;
  value = '';
  selected = [];

  dispatch('input', { selected });
  dispatch('clear');
};

const handleButtonClick = () => dispatch('buttonclick');
</script>

<div
  class="relative h-fit w-full"
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
    on:toggle={() => ($isOpen ? close() : handleFocus(disabled))}
  />

  {#if selected.length > 0 && showPills}
    <div
      class={cx('flex flex-wrap gap-2 pt-2', {
        'pointer-events-none cursor-not-allowed text-black/50': disabled,
      })}
    >
      {#each selected as option (option)}
        <Pill
          on:remove={handlePillClick(option)}
          value={option}
          readonly={disabled}
          {disabled}
        />
      {/each}
    </div>
  {/if}

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
            <label
              class={cx('flex h-[30px] w-full items-center px-2', {
                'bg-light': $navigationIndex === index,
              })}
              on:mouseenter={() => handleOptionFocus(index)}
            >
              <input
                tabindex="-1"
                type="checkbox"
                class="outline-none"
                role="menuitemcheckbox"
                aria-checked={isChecked(option)}
                checked={isChecked(option)}
                on:input|stopPropagation={() => handleOptionSelect(option)}
                on:keydown={handleKeyDown}
              />
              <span class="text-ellipsis whitespace-nowrap pl-1.5 text-xs">
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
              </span>
            </label>
          </li>
        {/each}
        {#if clearable}
          <li role="presentation">
            <button
              type="button"
              tabindex="-1"
              role="menuitem"
              class={cx(
                'flex h-[30px] w-full items-center px-2 text-xs outline-none',
                {
                  'bg-light': $navigationIndex === searchedOptions.length,
                }
              )}
              on:click={handleClearAll}
              on:mouseenter={() => handleOptionFocus(searchedOptions.length)}
              on:keydown={(event) => handleKeyDown(event, true)}
            >
              <slot name="clear-text">Clear all</slot>
            </button>
          </li>
        {/if}
      {:else}
        <li class="flex justify-center px-2 py-1 text-xs">
          No matching results
        </li>
      {/if}
    </SelectMenu>
  {/if}
</div>
