<svelte:options immutable={true} tag='v-tooltip' />

<script lang='ts'>

import cx from 'classnames'
import { computePosition, flip, shift } from '@floating-ui/dom';

import { addStyles } from '../../lib/index'

type Locations = 'top' | 'bottom' | 'right' | 'left'

export let text = ''
export let location: Locations = 'top'
let target: HTMLElement
let tooltip: HTMLElement

$: {
    target && tooltip && computePosition(target, tooltip, {
      placement: location,
      middleware: [flip(), shift()]
    }).then(({x, y}) => {
      Object.assign(tooltip.style, {
        left: `${x}px`,
        top: `${y}px`,
      });
    });
}

addStyles()

</script>

<div class="relative">
  <div bind:this={target} aria-describedby="tooltip">
    <slot />
  </div>
  <span
    bind:this={tooltip}
    role="tooltip"
    class={`
      absolute
      top-0
      left-0
      bg-white
      text-black
      text-left
      p-3
      border
      z-10
    `}
    >
    {text}
  </span>
</div>
