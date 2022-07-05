<svelte:options immutable={true} tag='v-button' />

<script lang='ts'>

import cx from 'classnames'
import { addStyles } from '../../lib/index'

type Variants = 'primary' | 'danger' | 'outline-danger'

export let variant: Variants = 'primary'
export let label = ''

addStyles()

</script>

<button
  type='button'
  class={cx('py-1.5 px-2 text-xs border', {
    'border-black': variant === 'primary',
    'bg-red/90 text-white border-red/90': variant === 'danger',
    'border-red/90 text-red/90': variant === 'outline-danger',
  })}
>
  {label}
</button>
