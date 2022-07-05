<svelte:options immutable={true} tag='v-collapse' />

<script lang='ts'>

import { addStyles } from '../../lib/index'

export let title = ''
export let content = ''

addStyles()

</script>

<div class="relative w-full overflow-hidden">
  <input 
    type="checkbox"
    class="absolute w-full h-12 opacity-0 cursor-pointer peer">

  <div class="border text-black border-black bg-white h-12 w-full pl-5 pr-5 flex items-center">
    {title}
  </div>

  <div class="absolute top-3 right-3 transition-transform duration-500 rotate-0 peer-checked:rotate-180">
    <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    stroke="currentColor"
    stroke-linejoin="round"
    stroke-linecap="round"
    fill="none"
  >
    <polyline points="6 9 12 15 18 9" />
  </svg>
  </div>

  <div class="bg-white text-black overflow-hidden pl-5 pr-5 pt-2 transition-all duration-500 max-h-0 peer-checked:max-h-fit">
    {content}
  </div>
</div>  


