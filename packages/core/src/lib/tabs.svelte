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

/** The set of tabs that is available for selection. */
export let tabs: string[] = [];

/** The selected tab. */
export let selected = '';

/** Additional CSS classes to pass to the tabs container. */
let extraClasses: cx.Argument = '';
export { extraClasses as cx };

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

<div
  class={cx('border-b-border-2 bg-medium flex w-full border-b', extraClasses)}
>
  {#each tabs as tab, index (tab)}
    <button
      class={cx('px-4 py-1 text-sm first:ml-6', {
        'border-x-border-2 border-t-border-2 text-default -mb-px border border-b-white bg-white font-semibold':
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
