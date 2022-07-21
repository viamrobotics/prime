<svelte:options immutable={true} tag='v-tabs' />

<script lang='ts'>

import cx from 'classnames'
import { addStyles, dispatch } from '../lib/index'

export let tabs = ''
export let selected = ''

let root: HTMLElement

addStyles()

$: parsedTabs = tabs.split(',').map((str) => str.trim())
$: selectedIndex = parsedTabs.indexOf(selected)

const handleClick = (option: string) => {
  selected = option
  dispatch(root, 'input', { value: selected })
}

</script>

<div bind:this={root} class='w-full flex bg-black/20'>
  {#each parsedTabs as tab, index (tab)}
    <button
      class={cx('px-4 py-1 uppercase text-sm first:ml-4', {
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

