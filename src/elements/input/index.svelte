<svelte:options
  immutable={true}
  tag='v-input'
/>

<link rel='stylesheet' href='/prime.css' />

<script lang='ts'>

type Types = 'text' | 'email' | 'number'

export let type: Types = 'text'
export let placeholder = ''

</script>

<input
  type={type}
  placeholder={placeholder}
  class='py-1 px-2 border text-xs border-black bg-white outline-none'
/>
