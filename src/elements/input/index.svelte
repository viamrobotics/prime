<svelte:options immutable={true} tag='v-input' />

<script lang='ts'>

import { addStyles, dispatch } from '../../lib/index'

type Types = 'text' | 'email' | 'number'

export let type: Types = 'text'
export let placeholder = ''

let input: HTMLInputElement

addStyles()

const handleInput = () => {
  dispatch(input, 'input', { value: input.value })
}

</script>

<input
  type={type}
  placeholder={placeholder}
  class='py-1 px-2 border text-xs border-black bg-white outline-none'
  on:input={handleInput}
/>
