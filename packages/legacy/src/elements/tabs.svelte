<svelte:options immutable />

<script lang="ts">
import cx from 'classnames';
import { dispatcher } from '../lib/dispatch';

export let tabs = '';
export let selected = '';

const dispatch = dispatcher();

$: parsedTabs = tabs.split(',').map((str) => str.trim());
$: selectedIndex = parsedTabs.indexOf(selected);

const handleClick = (option: string, event: Event) => {
  selected = option;
  dispatch(event, 'input', { value: selected });
};
</script>

<div class="w-full flex bg-medium border-b border-b-border-2">
  {#each parsedTabs as tab, index (tab)}
    <button
      class={cx('px-4 py-1 text-sm first:ml-6', {
        'bg-white border border-x-border-2 border-t-border-2 border-b-white font-semibold -mb-px text-default':
          tab === selected,
        'text-subtle-1': tab !== selected,
        'border-l border-l-gray-300': selectedIndex > index,
        'border-r border-r-gray-300': selectedIndex < index,
      })}
      on:click={(event) => handleClick(tab, event)}
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
