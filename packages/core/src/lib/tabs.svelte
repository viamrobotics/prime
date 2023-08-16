<!--
@component
  
A clickable element that allows the user to navigate to another page or area.

```svelte
<Tabs
  tabs={['Tab 1', 'Tab 2', 'Tab 3']}
  selected="Tab 1"
/>
```
-->
<svelte:options immutable />

<script lang="ts">
import cx from 'classnames';
import { createEventDispatcher } from 'svelte';

/**
 * The set of tabs that is available for selection.
 */
export let tabs: string[] = [];
/**
 * The selected tab.
 */
export let selected = '';

const dispatch = createEventDispatcher<{
  /** When an specific tab is selected. */
  input: { value: string };
}>();

$: selectedIndex = tabs.indexOf(selected);

const handleClick = (option: string) => {
  selected = option;
  dispatch('input', { value: selected });
};
</script>

<div class="w-full flex bg-medium border-b border-b-border-2">
  {#each tabs as tab, index (tab)}
    <button
      class={cx('px-4 py-1 text-sm first:ml-6', {
        'bg-white border border-x-border-2 border-t-border-2 border-b-white font-semibold -mb-px text-default':
          tab === selected,
        'text-subtle-1': tab !== selected,
        'border-l border-l-gray-300': selectedIndex > index,
        'border-r border-r-gray-300': selectedIndex < index,
      })}
      on:click={() => handleClick(tab)}
    >
      <div
        class={cx({
          '-mb-px': tab !== selected,
        })}
      >
        {tab}
      </div>
    </button>
  {/each}
</div>
