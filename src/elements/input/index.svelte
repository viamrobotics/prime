<svelte:options immutable={true} tag='v-input' />

<script lang='ts'>

import cx from 'classnames'
import { addStyles, dispatch } from '../../lib/index'

type LabelPosition = 'top' | 'left'
type Types = 'text' | 'email' | 'number'

export let type: Types = 'text'
export let placeholder = ''
export let label = ''
export let value = ''
export let step = '1'
export let labelposition: LabelPosition = 'top'

let root: HTMLElement
let input: HTMLInputElement

let stepNumber: number

$: stepNumber = Number.parseFloat(step)

addStyles()

const handleInput = (event: Event) => {
  event.preventDefault()
  event.stopImmediatePropagation()
  value = input.value
  dispatch(root, 'input', { value })
}

const increment = (direction: 1 | -1) => {
  const numberValue = Number.parseFloat(value || '0')
  value = input.value = String(numberValue + stepNumber * direction)
  dispatch(root, 'input', { value })
}

</script>

<label
  bind:this={root}
  class='relative flex flex-col max-w-[14rem]'
>
  {#if label}
    <p class={cx('text-xs', {
      'pb-1': labelposition === 'top',
      inline: labelposition === 'left',
    })}>
      {label}
    </p>
  {/if}

  <input
    bind:this={input}
    class='py-1.5 px-2.5 border text-xs border-black bg-white outline-none'
    type={type}
    placeholder={placeholder}
    value={value}
    on:input={handleInput}
  />

  {#if type === 'number'}
    <div class='absolute right-0 bottom-0 cursor-pointer select-none'>
      <svg class='h-[15px] rotate-180' viewBox="0 0 20 20" on:click={() => increment(1)}>
        <path d="M9.29 13l0.71 0.71 5.66-5.66-1.41-1.41-4.24 4.24-4.24-4.24-1.41 1.41z" />
      </svg>
      <svg class='h-[15px]' viewBox="0 0 20 20" on:click={() => increment(-1)}>
        <path d="M9.29 13l0.71 0.71 5.66-5.66-1.41-1.41-4.24 4.24-4.24-4.24-1.41 1.41z" />
      </svg>
    </div>
  {/if}
</label>

<style>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    appearance: none;
  }
</style>