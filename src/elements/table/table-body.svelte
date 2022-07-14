<svelte:options immutable={true} tag='v-tbody' />

<script lang='ts'>
// import cx from 'classnames'
import { addStyles } from '../../lib/index'
addStyles()
</script>

<tbody class="">
  <slot></slot>
</tbody>

