<svelte:options immutable={true} tag='v-tooltip' />

<script lang='ts'>

import { computePosition, flip, shift, offset } from '@floating-ui/dom'

import { addStyles } from '../lib/index'

type Locations = 'top' | 'bottom' | 'right' | 'left'

export let text = ''
export let location: Locations = 'top'
let container: HTMLElement
let tooltip: HTMLElement

let invisible = true

let x = 0
let y = 0

const recalculateStyle = async () => {
  const position = await computePosition(container, tooltip, {
    placement: location,
    middleware: [flip(), shift({ padding: 5 }), offset(10)],
  })

  x = position.x
  y = position.y
}

const handleMouseEnter = async () => {
  await recalculateStyle()
  invisible = false
}

const handleMouseLeave = () => {
  invisible = true
}

addStyles()

</script>

<div
  bind:this={container}
  class="relative"
  aria-describedby="tooltip"
  on:mouseenter={handleMouseEnter}
  on:mouseleave={handleMouseLeave}
>
  <slot />
  <div
    bind:this={tooltip}
    role="tooltip"
    class={`
      absolute
      top-0
      left-0
      bg-white
      text-black
      text-left
      text-xs
      p-3
      border
      z-10
    `}
    class:invisible={invisible}
    style='transform: translate({x}px, {y}px);'
    >
    {text}
  </div>
</div>
