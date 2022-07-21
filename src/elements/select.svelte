<svelte:options immutable={true} tag='v-select' />

<script lang='ts'>

import cx from 'classnames'
import { addStyles, dispatch } from '../lib/index'

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

const widthClasses = 'max-w-[14rem] w-full'

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

<label bind:this={root} class={cx(widthClasses, 'relative')}>
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
    class={cx(widthClasses, 'py-1 px-2.5 text-xs border border-black appearance-none rounded-none')}
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

<style>

label {
  --select-chevron-color: black;
  --select-chevron-size: 15px;
}

label::after {
  content: '';
  position: absolute;
  background-color: var(--select-chevron-color);
  clip-path: polygon(25% 25%, 17.5% 32.5%, 40% 55%, 50% 65%, 60% 55%, 82.5% 32.5%, 75% 25%, 50% 50%);
  width: var(--select-chevron-size);
  height: var(--select-chevron-size);
  right: 2px;
  bottom: 2px;
}

</style>
  