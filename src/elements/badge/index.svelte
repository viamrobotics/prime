<svelte:options
  immutable={true}
  tag='v-badge'
/>

<link rel='stylesheet' href='/prime.css' />

<script lang='ts'>

import cx from 'classnames'

export let label = ''

type Variants = 'green' | 'orange' | 'red'

export let variant: Variants = 'green'

</script>

<!-- Add padding and font-size per MP -->
<div class={cx('inline-flex gap-3 rounded-full px-3 py-0.5 text-sm', {
  'text-green-900 bg-green-200': variant === 'green',
  'text-orange-900 bg-orange-200': variant === 'orange',
  'text-red-900 bg-red-200': variant === 'red'
})}>
  <small>{ label }</small>
</div>

