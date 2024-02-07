<!--
@component

Select an option from a list, with search

```svelte
<SearchableSelect
  options={["Option 1", "Option 2", "Option 3"]}
  bind:value
/>
```
-->
<script lang="ts">
import cx from 'classnames';
import { Floating, matchWidth } from '$lib/floating';
import { Icon } from '$lib/icon';
import { InputStates, type InputState } from '$lib/input';
import { createHandleKey } from '$lib/keyboard';
import { uniqueId } from '$lib/unique-id';

import { SortOptions, getSearchResults, type SortOption } from './search';
import SelectInput from './select-input.svelte';

/** The options the user should be allowed to search and select from. */
export let options: string[];

/** The value of the search input or the currently selected option, if any. */
export let value = '';

/** The placeholder of the input. */
export let placeholder = '';

/**
 * Whether value must be constrained to `options` on change.
 * - `false` (Default) - any value may be selected
 * - `true` - value must be in `options`
 * - `Function` - value must be in `options` or pass the test function
 */
export let exclusive: boolean | ((value: string) => boolean) = false;

/** Input is disabled. */
export let disabled = false;

/** The state of the select (info, warn, error, success), if any. */
export let state: InputState = InputStates.NONE;

/** Option sorting behavior. */
export let sort: SortOption = SortOptions.DEFAULT;

/** Prefix to display with the arbitrary text option, if non-exclusive. */
export let otherOptionPrefix = '';

/** Error message ID, if any. */
export let errorID = '';

/** Notify the parent of a value change, after Enter key or blur. */
export let onChange: ((value: string) => unknown) | undefined = undefined;

/** Notify the parent of focus. */
export let onFocus: ((event: FocusEvent) => unknown) | undefined = undefined;

/** Notify the parent of blur. */
export let onBlur: ((event: FocusEvent) => unknown) | undefined = undefined;

/** Additional CSS classes to pass to the input container. */
let inputCx: cx.Argument = '';
export { inputCx as cx };

const LIST_ID = uniqueId('combobox-list');
const SELECTED_ID = uniqueId('combobox-list-selected-item');
const CLOSED = 'closed';
const FOCUS_SEARCH = 'focus-search';
const FOCUS_ITEM = 'focus-item';

type MenuState = typeof CLOSED | typeof FOCUS_SEARCH | typeof FOCUS_ITEM;

const optionElements: Record<string, HTMLElement> = {};
let inputElement: HTMLInputElement | undefined;
let autoSelectIndex = -1;
let menuState: MenuState | undefined;
let previousValue: string | undefined = undefined;

$: searchResults = getSearchResults(options, value, sort);
$: valueInSearch = searchResults.some(({ option }) => option === value);
$: getOtherIsAllowed =
  typeof exclusive === 'function' ? exclusive : () => !exclusive;
$: otherOption =
  value !== '' && !valueInSearch && getOtherIsAllowed(value)
    ? { option: value, priority: -1, highlight: undefined }
    : undefined;

$: allOptions = otherOption ? [...searchResults, otherOption] : searchResults;
$: menuState = !menuState || allOptions.length === 0 ? CLOSED : menuState;

$: if (menuState === undefined || menuState === FOCUS_SEARCH) {
  autoSelectIndex = allOptions.findIndex(({ priority }) => priority !== -1);
} else if (menuState === CLOSED) {
  autoSelectIndex = -1;
}

$: autoSelectOption = allOptions[autoSelectIndex] ?? otherOption;
$: isExpanded = menuState === FOCUS_SEARCH || menuState === FOCUS_ITEM;
$: activeOption = isExpanded ? autoSelectOption : undefined;
$: activeID = activeOption ? SELECTED_ID : undefined;
$: activeElement = activeOption
  ? optionElements[activeOption.option]
  : undefined;

$: if (typeof activeElement?.scrollIntoView === 'function') {
  activeElement.scrollIntoView({ block: 'nearest' });
}

const setMenuState = (nextMenuState: MenuState) => {
  menuState = disabled ? CLOSED : nextMenuState;
};

const handleInput = () => {
  setMenuState(FOCUS_SEARCH);
};

const handleFocus = (event: FocusEvent) => {
  setMenuState(FOCUS_SEARCH);
  onFocus?.(event);
};

const handleBlur = (event: FocusEvent) => {
  handleSelect(autoSelectOption?.option);
  onBlur?.(event);
};

const handleSelect = (selectedValue: string | undefined) => {
  const fallback = exclusive && !valueInSearch ? '' : value;
  const nextValue = selectedValue ?? fallback;

  setMenuState(CLOSED);

  if (nextValue !== previousValue) {
    value = nextValue;
    previousValue = nextValue;
    onChange?.(nextValue);
  }
};

const handleButtonClick = () => {
  setMenuState(isExpanded ? CLOSED : FOCUS_SEARCH);
  inputElement?.focus();
};

const handleKeydown = createHandleKey({
  Enter: () => {
    handleSelect(autoSelectOption?.option);
  },
  Escape: () => {
    if (menuState === CLOSED) {
      value = '';
    }
    setMenuState(CLOSED);
  },
  ArrowDown: (event) => {
    if (event.altKey) {
      setMenuState(menuState === CLOSED ? FOCUS_SEARCH : FOCUS_ITEM);
    } else {
      setMenuState(FOCUS_ITEM);
      autoSelectIndex =
        autoSelectIndex < allOptions.length - 1 ? autoSelectIndex + 1 : 0;
    }
  },
  ArrowUp: () => {
    setMenuState(FOCUS_ITEM);
    autoSelectIndex =
      autoSelectIndex > 0 ? autoSelectIndex - 1 : allOptions.length - 1;
  },
  ArrowRight: {
    handler: () => setMenuState(FOCUS_SEARCH),
    preventDefault: false,
  },
  ArrowLeft: {
    handler: () => setMenuState(FOCUS_SEARCH),
    preventDefault: false,
  },
  Home: () => {
    setMenuState(FOCUS_SEARCH);
    inputElement?.setSelectionRange(0, 0);
  },
  End: () => {
    setMenuState(FOCUS_SEARCH);
    inputElement?.setSelectionRange(value.length, value.length);
  },
});
</script>

<SelectInput
  {state}
  {disabled}
  {placeholder}
  menuId={LIST_ID}
  isOpen={isExpanded}
  isFocused={menuState === FOCUS_ITEM ? false : undefined}
  cx={[{ 'caret-transparent': menuState === FOCUS_ITEM }, inputCx]}
  aria-autocomplete="list"
  aria-activedescendant={activeID}
  aria-errormessage={errorID}
  on:focus={handleFocus}
  on:blur={handleBlur}
  on:keydown={handleKeydown}
  on:input={handleInput}
  on:click={handleButtonClick}
  bind:inputElement
  bind:value
/>
<Floating
  offset={4}
  referenceElement={inputElement}
  size={matchWidth}
  auto
>
  <ul
    id={LIST_ID}
    role="listbox"
    class="max-h-36 flex-col overflow-y-auto border border-gray-9 bg-white py-1 shadow-sm"
  >
    {#each allOptions as { option, highlight } (option)}
      {@const isSelected = activeOption?.option === option}
      {@const isOther = otherOption?.option === option}

      {#if isOther && allOptions.length > 1}
        <li
          role="none"
          class="mb-0.5 mt-[3px] border-b border-light"
        />
      {/if}
      <!--
        Focus stays on combobox per WAI; key handlers on options not needed.
        svelte-ignore a11y-click-events-have-key-events
      -->
      <li
        role="option"
        id={isSelected ? activeID : undefined}
        aria-selected={isSelected}
        aria-label={isOther
          ? [otherOptionPrefix, option].filter(Boolean).join(' ')
          : option}
        class={cx(
          'flex h-7.5 w-full cursor-pointer items-center justify-start px-2.5 text-xs',
          isSelected ? 'bg-light' : 'hover:bg-light'
        )}
        on:pointerdown|preventDefault
        on:mousedown|preventDefault
        on:click={() => handleSelect(option)}
        bind:this={optionElements[option]}
      >
        {#if isOther}
          <Icon
            cx="mr-1 shrink-0 text-gray-6"
            name="plus"
          />
        {/if}
        <p class="truncate">
          {#if highlight !== undefined}
            <span class="whitespace-pre">{highlight[0]}</span>
            <span class="whitespace-pre bg-yellow-100">{highlight[1]}</span>
            <span class="whitespace-pre">{highlight[2]}</span>
          {:else if isOther && otherOptionPrefix}
            {otherOptionPrefix} {option}
          {:else}
            {option}
          {/if}
        </p>
      </li>
    {/each}
    <slot />
  </ul>
</Floating>
