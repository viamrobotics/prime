<svelte:options immutable tag='v-tabs' />

<script lang='ts'>

import cx from 'classnames';
import { addStyles } from '../lib/index';
import { dispatcher } from '../lib/dispatch';

export let tabs = '';
export let selected = '';

const dispatch = dispatcher();

addStyles();

$: parsedTabs = tabs.split(',').map((str) => str.trim());
$: selectedIndex = parsedTabs.indexOf(selected);

const handleClick = (option: string) => {
  selected = option;
  dispatch('input', { value: selected });
};

</script>

<div class='w-full flex bg-black/20 border-b border-b-black'>
  {#each parsedTabs as tab, index (tab)}
    <button
      class={cx('px-4 py-1 uppercase text-sm first:ml-4 ', {
        'bg-white border border-x-black border-t-black border-b-white font-bold -mb-px': tab === selected,
        'text-black/70': tab !== selected,
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
