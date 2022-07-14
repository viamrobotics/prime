<svelte:options immutable={true} tag='v-select' />

<script lang='ts'>

import cx from 'classnames'
import { addStyles, dispatch } from '../../lib/index'

type LabelPosition = 'top' | 'left'

export let options = ''
export let selected = ''
export let open = false
export let placeholder = ''
export let label = ''
export let labelposition: LabelPosition = 'top'

let root: HTMLElement
let parsedOptions: string[]
let selectedOption: string

$: parsedOptions = options.split(',').map((str) => str.trim())
$: selectedOption = parsedOptions.find(opt => opt === selected) || placeholder

addStyles()

const handleClick = (value: string) => {
  selected = value
  open = !open
  dispatch(root, 'input', { value })
}

const handleToggle = (event: CustomEvent<{open: boolean}>) => {
  open = event.detail.open
}

</script>

<label bind:this={root}>
  {#if label}
    <p class={cx('text-xs pb-1', {
      'pb-1': labelposition === 'top',
      inline: labelposition === 'left',
    })}>
      {label}
    </p>
  {/if}

  <select class='py-1 px-2.5 text-xs border border-black'>
    {#each parsedOptions as option (option)}
      <option>{option}</option>
    {/each}
  </select>
</label>

<!-- <v-collapse bind:this={root} title={selectedOption} open={open} on:toggle={handleToggle}>
  <div class="flex flex-col gap-2 p-2">
    {#each parsedOptions as option (option)}
      <div
        class="cursor-pointer px-2 hover:bg-gray-100"
        on:click={() => handleClick(option)}
      >
        { option }
      </div>
    {/each}
  </div>
</v-collapse> -->
