<svelte:options immutable={true} tag='v-tooltip' />

<script lang='ts'>

import cx from 'classnames'
import { addStyles } from '../../lib/index'

export let icon = ''
export let label = ''
export let text = ''

type Variants = 'top' | 'bottom' | 'right' | 'left'

export let variant: Variants = 'top'

addStyles()

</script>

<div>
  <div class='relative inline-block group'>
    <slot />
    <span 
      class={cx('invisible bg-white text-black text-left p-3 border absolute z-10 min-w-[200px] group-hover:visible after:absolute after:-ml-4 after:border-8 after:border-solid after:border-transparent', {
        'bottom-[125%] left-[-80%] after:border-t-black after:top-[100%] after:left-[13.5%]': variant === 'top',
        'top-[125%] left-[-80%] after:border-b-black after:bottom-[100%] after:left-[13.5%]': variant === 'bottom',
        'left-[170%] after:border-r-black after:bottom-[83%] after:left-[0%]': variant === 'right',
        'right-[165%] after:border-l-black after:bottom-[83%] after:right-[-8%]': variant === 'left',
      })}>
      {text}
    </span>
    <span class={icon}>{label}</span>
  </div>
</div>