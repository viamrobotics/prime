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
import Icon from '$lib/icon/icon.svelte';
import SelectMenu from './select-menu.svelte';
import type { SelectState } from './select.svelte';
import { type SortOptions, getSearchResults } from './search';
import { useUniqueId } from '$lib/unique-id';
import { clickOutside } from '$lib/click-outside';
import { selectControls } from './controls';
import { createSearchableSelectDispatcher } from './dispatcher';

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

$: isWarn = state === 'warn';
$: isError = state === 'error';
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

const handleInput = () => {
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
  <div class="flex w-full">
    <input
      bind:value
      role="combobox"
      aria-controls={menuId}
      aria-expanded={$isOpen}
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
      on:focus={() => handleFocus(disabled)}
      on:mousemove={() => ($isKeyboardControlling = false)}
    />

    <button
      class="absolute right-2 top-1.5"
      tabindex="-1"
      aria-label="Toggle menu"
      on:click={() => ($isOpen ? close() : handleFocus(disabled))}
      on:keydown={handleKeyDown}
    >
      <Icon
        name="chevron-down"
        cx={['text-gray-6  transition', { 'rotate-180': $isOpen }]}
      />
    </button>
  </div>
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
                'flex h-[30px] w-full items-center text-ellipsis whitespace-nowrap px-2 text-xs outline-none',
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
    </SelectMenu>{/if}
</div>
