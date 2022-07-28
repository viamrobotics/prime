<svelte:options immutable={true} tag='v-input-internal' />

<script lang='ts'>

import cx from 'classnames'
import { addStyles, dispatch } from '../../lib/index'
import { get_current_component } from 'svelte/internal'

const component = get_current_component()

type LabelPosition = 'top' | 'left'
type Types = 'text' | 'email' | 'number'

export let type: Types = 'text'
export let placeholder = ''
export let readonly: undefined | '' | 'readonly' | 'false' = 'false'
export let label = ''
export let value = ''
export let step = '1'
export let name = ''
export let labelposition: LabelPosition = 'top'

let root: HTMLElement
let input: HTMLInputElement
let isReadonly: boolean
let stepNumber: number

$: isReadonly = readonly === 'readonly' || readonly === ''
$: stepNumber = Number.parseFloat(step)

addStyles()

const handleInput = (event: Event) => {
  event.preventDefault()
  event.stopImmediatePropagation()

  value = input.value

  component.internals.setFormValue(value)
  dispatch(root, 'input', { value })
}

const increment = (direction: 1 | -1) => {
  const numberValue = Number.parseFloat(value || '0')

  value = input.value = String(numberValue + stepNumber * direction)

  component.internals.setFormValue(value)
  dispatch(root, 'input', { value })
}

</script>

<label
  bind:this={root}
  class={cx('relative flex gap-1 max-w-[14rem]', {
    'flex-col': labelposition === 'top',
    'items-center': labelposition === 'left',
  })}
>
  {#if label}
    <p class={cx('text-xs', {
      'inline whitespace-nowrap': labelposition === 'left',
    })}>
      {label}
    </p>
  {/if}

  <input
    {type}
    {placeholder}
    {name}
    {value}
    readonly={isReadonly}
    bind:this={input}
    class='w-full py-1.5 px-2.5 border text-xs border-black bg-white outline-none appearance-none'
    on:input={handleInput}
  />

  {#if type === 'number'}
    <div class='absolute right-0.5 bottom-0 cursor-pointer select-none flex flex-col'>
      <button
        on:click={() => increment(+1)}
        aria-label='Increment up by {stepNumber}'
        class='icon-chevron-down rotate-180 text-[15px]'
      />
      <button
        on:click={() => increment(-1)}
        aria-label='Increment down by {stepNumber}'
        class='icon-chevron-down text-[15px]'
      />
    </div>
  {/if}
</label>

<style>

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type=number] {
  -moz-appearance:textfield;
}

</style>