<svelte:options immutable={true} tag='v-radio' />

<script lang='ts'>

import cx from 'classnames'
import { addStyles, dispatch } from '../../lib/index'

export let options = ''
export let selected = ''

addStyles()

let button: HTMLButtonElement
let parsedOptions: string[]

$: parsedOptions = options.split(',').map((str) => str.trim())

const handleClick = (value: string) => {
  selected = value
  dispatch(button, 'input', { value })
}

</script>

{#each parsedOptions as option}
  <button
    bind:this={button}
    class={cx('border-y border-l last:border-r border-black px-2 py-1 text-sm', {
      'bg-white': option !== selected,
      'bg-black text-white': option === selected,
    })}
    on:click={() => handleClick(option)}
  >
    {option}
  </button>
{/each}
