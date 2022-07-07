<svelte:options immutable={true} tag='v-collapse' />

<script lang='ts'>

import cx from 'classnames'
import { addStyles } from '../../lib/index'

export let title: string = ''
export let open: boolean = false

let rootElement: HTMLElement

addStyles()
const handleClick = () => {
  open = !open
  rootElement.dispatchEvent(new CustomEvent('toggle', {
    composed: true,
    bubbles: true,
    detail: {
      open,
    },
  }))
}

</script>

<div bind:this={rootElement} class="relative w-full overflow-hidden" >
  <div on:click={handleClick}>
    <div class="border text-black border-black bg-white h-12 w-full pl-5 pr-5 flex items-center">
      {title}
    </div>

    <div class="{cx('absolute top-3 right-3 transition-transform duration-500 rotate-0', {'rotate-180': open})}">
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
  </div>

  <div class="{cx('bg-white text-black overflow-hidden transition-all duration-500 max-h-0', {'max-h-fit': open})}">
    <slot />
  </div>
</div>  


