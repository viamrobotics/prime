<svelte:options immutable={true} tag='v-tr' />

<script lang='ts'>
// import cx from 'classnames'
import { addStyles } from '../../lib/index'
addStyles()
</script>

<tr class="border-b">
  <slot></slot>
</tr>