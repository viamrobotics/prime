<!--
@component

Select an option from a list, with search

Guided by https://www.w3.org/WAI/ARIA/apg/patterns/combobox/

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

import {
  SortOptions,
  getSearchResults,
  optionDisplayValue,
  optionsToDetailedOptions,
  type SortOption,
  type DetailedOption,
} from './search';
import SelectInput from './select-input.svelte';

/** The options the user should be allowed to search and select from. */
export let options: (string | DetailedOption)[];

/** The value of the search input or the currently selected option, if any. */
export let value = '';

/** All selected values, if `multiple` is `true`. */
export let values: string[] = [];

/** The placeholder of the input. */
export let placeholder = '';

/** Optional id used in parent label `for` attribute */
export let id: string | undefined = undefined;

/**
 * Whether value must be constrained to `options` on change.
 * - `false` (Default) - any value may be selected
 * - `true` - value must be in `options`
 * - `Function` - value must be in `options` or pass the test function
 */
export let exclusive: boolean | ((value: string) => boolean) = false;

/** Multiple selections allowed. */
export let multiple: boolean | undefined = undefined;

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

/**
 * Notify the parent of a value change, after Enter key or blur.
 *
 * Only used if `multiple` is `false` (default)
 */
export let onChange: ((value: string) => unknown) | undefined = undefined;

/** Notify the parent of a value change, if `multiple` is `true` */
export let onMultiChange: ((values: string[]) => unknown) | undefined =
  undefined;

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

$: detailedOptions = optionsToDetailedOptions(options);
$: detailedOptionsMap = Object.fromEntries(
  detailedOptions.map((opt) => [opt.value, opt])
);

const optionElements: Record<string, HTMLElement> = {};

let inputElement: HTMLInputElement | undefined;
let autoSelectIndex = -1;
let menuState: MenuState | undefined;

// searchValue is the value stored inside the search input field
// it is primarily updated reactively through a call to resetSearchValue when
// value changes (in handleSelect)
//
// It is also manually updated in edge cases like Escape or Blur
let searchValue = '';
const resetSearchValue = (
  valueParam: string,
  detailedOptionsMapParam: Record<string, DetailedOption>
) => {
  searchValue = optionDisplayValue(
    detailedOptionsMapParam[valueParam] ?? { value: valueParam }
  );
};
$: resetSearchValue(value, detailedOptionsMap);

// selectedSeachOption represents the value that was last selected (or the initial value)
$: selectedSearchOption = detailedOptionsMap[value];

$: searchResults = getSearchResults(detailedOptions, searchValue, sort);
$: valueInSearch = searchResults.some(
  ({ option }) => optionDisplayValue(option) === searchValue
);
$: getOtherIsAllowed =
  typeof exclusive === 'function' ? exclusive : () => !exclusive;

$: otherOption =
  searchValue !== '' && !valueInSearch && getOtherIsAllowed(searchValue)
    ? {
        option: { value: searchValue, icon: 'plus' } as DetailedOption,
        priority: -1,
        highlight: undefined,
      }
    : undefined;

$: allOptions = otherOption ? [...searchResults, otherOption] : searchResults;
$: menuState = !menuState || allOptions.length === 0 ? CLOSED : menuState;

$: if (menuState === undefined || menuState === FOCUS_SEARCH) {
  let nextAutoSelectIndex = allOptions.findIndex(
    ({ priority }) => priority !== -1
  );
  // if we don't find any options with a non negative priority,
  // we set the nextAutoSelectIndex to the option that matches
  // the current seach value. This is used so that when we blur
  // with a valid seachValue, we autoSelect the correct option
  if (nextAutoSelectIndex === -1) {
    nextAutoSelectIndex = allOptions.findIndex(
      ({ option }) => optionDisplayValue(option) === searchValue
    );
  }
  autoSelectIndex = nextAutoSelectIndex;
} else if (menuState === CLOSED) {
  autoSelectIndex = -1;
}

$: autoSelectOption = allOptions[autoSelectIndex] ?? otherOption;
$: isExpanded = menuState === FOCUS_SEARCH || menuState === FOCUS_ITEM;
$: activeOption = isExpanded ? autoSelectOption : undefined;
$: activeID = activeOption ? SELECTED_ID : undefined;
$: activeElement = activeOption
  ? optionElements[activeOption.option.value]
  : undefined;

$: if (typeof activeElement?.scrollIntoView === 'function') {
  activeElement.scrollIntoView({ block: 'nearest' });
}

const handleSingleSelect = (selectedOption: DetailedOption | undefined) => {
  // if we are exclusive && it is not in the search, we should fallback to an empty value option
  // otherwise, we should populate the value with whatever exists in the search field
  const fallback =
    exclusive && !valueInSearch ? { value: '' } : { value: searchValue };
  const nextOption = selectedOption ?? fallback;

  // we always set the menu state to closed even if the value is equal to the previous value
  // but we don't call onChange
  setMenuState(CLOSED);
  if (nextOption.value !== value) {
    value = nextOption.value;
    onChange?.(nextOption.value);
  }
};

// inputValue is the value of option that was selected (not the value in the search field)
const handleMultiSelect = (selectedOption: DetailedOption | undefined) => {
  if (!selectedOption) {
    return;
  }

  values = values.includes(selectedOption.value)
    ? values.filter((val) => val !== selectedOption.value)
    : [...values, selectedOption.value];

  value = '';
  searchValue = '';
  onMultiChange?.(values);
};

$: handleSelect = multiple ? handleMultiSelect : handleSingleSelect;

const setMenuState = (nextMenuState: MenuState) => {
  menuState = disabled ? CLOSED : nextMenuState;
};

const handleInput = (event: Event) => {
  // update the searchValue on inputs to the search field
  const element = event.target as HTMLInputElement;
  searchValue = element.value;
  setMenuState(FOCUS_SEARCH);
};

const handleFocus = (event: FocusEvent) => {
  setMenuState(FOCUS_SEARCH);
  onFocus?.(event);
};

const handleBlur = (event: FocusEvent) => {
  // blur can still be triggered if the input is diabled or the menu is closed,
  // but we shouldn't select anything if so
  if (!disabled && menuState !== CLOSED) {
    handleSelect(autoSelectOption?.option);
    setMenuState(CLOSED);
  }
  // we reset the search value here to the last selected option to ensure there is no mismatch
  // between what was actually selected vs what is in the search input
  resetSearchValue(value, detailedOptionsMap);
  onBlur?.(event);
};

const handleButtonClick = () => {
  setMenuState(isExpanded ? CLOSED : FOCUS_SEARCH);
  inputElement?.focus();
};

const handleKeydown = createHandleKey({
  Enter: () => {
    if (menuState !== CLOSED) {
      handleSelect(autoSelectOption?.option);
    }
  },
  ' ': {
    handler: (event) => {
      if (menuState === FOCUS_ITEM) {
        handleSelect(autoSelectOption?.option);
        event.preventDefault();
      }
    },
    preventDefault: false,
  },
  Escape: () => {
    // WAI: Dismisses the popup if it is visible. Optionally, if the popup is hidden before Escape is pressed, clears the combobox.
    if (menuState === CLOSED) {
      searchValue = '';
      handleSelect(undefined);
    } else {
      setMenuState(CLOSED);
    }
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
    inputElement?.setSelectionRange(searchValue.length, searchValue.length);
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
  {id}
  cx={[{ 'caret-transparent': menuState === FOCUS_ITEM }, inputCx]}
  icon={selectedSearchOption?.icon}
  aria-autocomplete="list"
  aria-multiselectable={multiple}
  aria-activedescendant={activeID}
  aria-errormessage={errorID}
  on:focus={handleFocus}
  on:blur={handleBlur}
  on:keydown={handleKeydown}
  on:input={handleInput}
  on:click={handleButtonClick}
  bind:inputElement
  value={searchValue}
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
    class:hidden={!isExpanded}
    class="max-h-36 flex-col overflow-y-auto border border-gray-9 bg-white py-1 shadow-sm"
  >
    {#each allOptions as { option, highlight } (option)}
      {@const isActive = activeOption?.option === option}
      {@const isSelected = multiple ? false : isActive}
      {@const isChecked = multiple ? values.includes(option.value) : undefined}
      {@const isOther = otherOption?.option === option}
      {@const descriptionID = uniqueId('combobox-list-item-description')}

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
        id={isActive ? activeID : undefined}
        aria-selected={isSelected}
        aria-checked={isChecked}
        aria-describedby={descriptionID}
        aria-label={isOther
          ? [otherOptionPrefix, optionDisplayValue(option)]
              .filter(Boolean)
              .join(' ')
          : optionDisplayValue(option)}
        class={cx(
          'flex cursor-pointer items-center justify-start px-2.5 py-1.5',
          multiple ? 'pl-2 pr-2.5' : 'px-2.5',
          isActive ? 'bg-light' : 'hover:bg-light'
        )}
        on:pointerdown|preventDefault
        on:mousedown|preventDefault
        on:click={() => handleSelect(option)}
        bind:this={optionElements[option.value]}
      >
        <div class="flex flex-row gap-2">
          <!-- In all real cases, only one of these icons should should be active at once-->
          <!-- (multi with icon is not a designed use case yet) -->
          {#if multiple}
            <Icon
              cx={['my-0.5 shrink-0', !isChecked && 'text-gray-6']}
              name={isChecked ? 'checkbox-marked' : 'checkbox-blank-outline'}
            />
          {/if}
          {#if option.icon}
            <Icon
              cx={['my-0.5 shrink-0 text-gray-6']}
              name={option.icon}
            />
          {/if}
          <div class="flex flex-col">
            <p class="text-wrap text-sm">
              {#if highlight !== undefined}
                {@const [prefix, match, suffix] = highlight}
                {prefix}<span class="bg-yellow-100">{match}</span>{suffix}
              {:else if isOther && otherOptionPrefix}
                {otherOptionPrefix} {optionDisplayValue(option)}
              {:else}
                {optionDisplayValue(option)}
              {/if}
            </p>
            {#if option.description}
              <p
                id={descriptionID}
                class="text-wrap text-xs text-subtle-2"
              >
                {option.description}
              </p>
            {/if}
          </div>
        </div>
      </li>
    {/each}
    <slot />
  </ul>
</Floating>
