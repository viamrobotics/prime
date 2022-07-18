<svelte:options immutable={true} tag='v-tooltip' />

<script lang='ts'>

import cx from 'classnames'
import { addStyles } from '../../lib/index'

type Locations = 'top' | 'bottom' | 'right' | 'left'

export let text = ''
export let location: Locations = 'top'

addStyles()

</script>

<div class='relative inline-block group'>
  <slot />
  <span 
    class={cx('invisible bg-white text-black text-left p-3 border absolute z-10 min-w-[200px] group-hover:visible after:absolute after:-ml-2 after:border-4 after:border-solid after:border-transparent', {
      'bottom-[125%] left-[-80%] after:border-t-black after:top-[100%] after:left-[13.5%]': location === 'top',
      'top-[125%] left-[-80%] after:border-b-black after:bottom-[100%] after:left-[13.5%]': location === 'bottom',
      'left-[170%] bottom-0 after:border-r-black after:bottom-[83%] after:left-[0%]': location === 'right',
      'right-[165%] after:border-l-black after:bottom-[83%] after:right-[-8%]': location === 'left',
    })}>
    {text}
  </span>
</div>
