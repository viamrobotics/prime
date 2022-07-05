<svelte:options immutable={true} tag='v-input' />

<script lang='ts'>

import { addStyles } from '../../lib/index'

type Types = 'text' | 'email' | 'number'

export let type: Types = 'text'
export let placeholder = ''

addStyles()

</script>

<input
  type={type}
  placeholder={placeholder}
  class='py-1 px-2 border text-xs border-black bg-white outline-none'
/>
