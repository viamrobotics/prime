<svelte:options immutable={true} tag='v-select' />

<script lang='ts'>

import cx from 'classnames'
import { addStyles, dispatch } from '../../lib/index'

type LabelPosition = 'top' | 'left'

export let options = ''
export let value = ''
export let placeholder = ''
export let label = ''
export let labelposition: LabelPosition = 'top'

let root: HTMLElement
let input: HTMLSelectElement
let parsedOptions: string[]
let selectedOption: string

$: parsedOptions = options.split(',').map((str) => str.trim())
$: selectedOption = parsedOptions.find(opt => opt === value) ?? ''

addStyles()

const handleInput = (event: Event) => {
  event.preventDefault()
  event.stopImmediatePropagation()
  value = input.value.trim()
  dispatch(root, 'input', { value })
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

  <select
    bind:this={input}
    class='py-1 px-2.5 text-xs border border-black'
    on:input={handleInput}
  >
    <option value=''>
      {placeholder || 'Please select'}
    </option>
    {#each parsedOptions as option (option)}
      <option selected={selectedOption === option}>
        {option}
      </option>
    {/each}
  </select>
</label>
