<svelte:options immutable={true} tag='v-badge' />

<script lang='ts'>

import cx from 'classnames'
import { addStyles } from '../../lib/index'

export let label = ''

type Variants = 'green' | 'orange' | 'red'

export let variant: Variants = 'green'

addStyles()

</script>

<div class={cx('inline-flex gap-3 rounded-full px-3 py-0.5 text-sm', {
  'text-green-900 bg-green-200': variant === 'green',
  'text-orange-900 bg-orange-200': variant === 'orange',
  'text-red-900 bg-red-200': variant === 'red',
})}>
  <small>{ label }</small>
</div>
