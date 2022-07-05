<svelte:options immutable={true} tag='v-radio' />

<script lang='ts'>

import cx from 'classnames'
import { addStyles } from '../../lib/index'

export let options = ''
export let selected = ''

addStyles()

let parsedOptions: string[]

$: parsedOptions = options.split(',').map((str) => str.trim())

const handleClick = (option: string) => {
  selected = option
}

</script>

{#each parsedOptions as option}
  <button
    class={cx('border-y border-l last:border-r border-black px-2 py-1 text-sm', {
      'bg-black text-white': option === selected,
    })}
    on:click={() => handleClick(option)}
  >
    {option}
  </button>
{/each}