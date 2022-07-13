<svelte:options immutable={true} tag='v-switch' />

<script lang='ts'>

import cx from 'classnames'
import { addStyles, dispatch } from '../../lib/index'

export let label = ''
export let name = ''
export let value: 'on' | 'off' = 'off'
export let variant: 'labeled' | 'default' = 'default'
export let disabled: 'true' | 'false' = 'false'

addStyles()

let button: HTMLButtonElement
let input: HTMLInputElement
let on: boolean
let isDisabled: boolean

$: on = value === 'on'
$: isDisabled = disabled === 'true'

const handleClick = () => {
  value = (!on) ? 'on' : 'off'
  input.checked = on
  dispatch(button, 'input', { value: input.checked })
}

</script>

<label class={cx('flex items-center gap-1.5', {
  'opacity-50 pointer-events-none': isDisabled,
})}>
  <button
    on:click={handleClick}
    type='button'
    class={cx('relative inline-flex flex-shrink-0 h-5 w-11 border border-black/70 bg-black/50 cursor-pointer motion-safe:transition-colors ease-in-out duration-200 focus:outline-none', {
      'bg-green/80': on,
    })}
    role='switch'
    aria-label={label}
    aria-checked={on ? 'true' : 'false'}
  >
    <span
      class='pointer-events-none relative inline-block border border-green/100 h-4 w-4 mt-px ml-px bg-white shadow transform ring-0 motion-safe:transition-transform ease-in-out duration-200'
      class:translate-x-0={!on}
      class:translate-x-6={on}
    />
    <input
      {name}
      {value}
      class='hidden'
      type='checkbox'
      checked={on}
      bind:this={input}
    />
  </button>

  {#if variant === 'labeled'}
    <p class="capitalize text-xs">{value}</p>
  {/if}
</label>
