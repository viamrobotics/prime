<svelte:options
  immutable={true}
  tag='v-tabs'
/>

<link rel='stylesheet' href='/prime.css' />

<script lang='ts'>

import cx from 'classnames'

export let tabs = ''
export let selected = ''

$: parsedTabs = tabs.split(',').map((str) => str.trim())
$: selectedIndex = parsedTabs.indexOf(selected)

const handleClick = (option: string) => {
  selected = option
}

</script>

<div class='w-full flex bg-black/20'>
  {#each parsedTabs as tab, index (tab)}
    <button
      class={cx('px-4 py-1 uppercase text-sm', {
        'bg-white border border-x-black border-t-black border-b-white font-bold': tab === selected,
        'text-black/70': tab !== selected,
        'border-l border-l-gray-300': selectedIndex > index,
        'border-r border-r-gray-300': selectedIndex < index,
      })}
      on:click={() => handleClick(tab)}
    >
      {tab}
    </button>
  {/each}
</div>

