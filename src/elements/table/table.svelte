<svelte:options immutable={true} tag='v-table' />

<script lang='ts'>
import cx from 'classnames'
import { addStyles } from '../../lib/index'

addStyles()

export let variant = ''
</script>

<table class={cx('bg-white text-xs w-full', { 'table-fixed': variant === 'fixed' })}>
  <slot />
</table>
