<svelte:options immutable={true} tag='v-thead' />

<script lang='ts'>
// import cx from 'classnames'
import { addStyles } from '../../lib/index'
addStyles()
</script>

<thead class="border-b border-black">
  <slot></slot>
</thead>

