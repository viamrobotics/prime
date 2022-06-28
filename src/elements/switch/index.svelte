<svelte:options
  immutable={true}
  tag='v-switch'
/>

<link rel='stylesheet' href='/prime.css' />

<script lang='ts'>

import cx from 'classnames'

export let label = ''
export let name = ''
export let value: 'on' | 'off' = 'off'

let input: HTMLInputElement

$: on = value === 'on'

const handleClick = () => {
  value = (!on) ? 'on' : 'off'
  input.checked = on
  input.dispatchEvent(new InputEvent('input', { composed: true, bubbles: true }))
}

</script>

<button
  on:click={handleClick}
  type='button'
  class={cx('relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-green/100 rounded-full cursor-pointer motion-safe:transition-colors ease-in-out duration-200 focus:outline-none', {
    'bg-green/80': on,
  })}
  role='switch'
  aria-label={label}
  aria-checked={on ? 'true' : 'false'}
>
  <span
    class='pointer-events-none relative inline-block border-2 border-green/100 h-4 w-4 mt-0.5 ml-0.5 rounded-full bg-white shadow transform ring-0 motion-safe:transition-transform ease-in-out duration-200'
    class:translate-x-0={!on}
    class:translate-x-5={on}
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
