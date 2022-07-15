<svelte:options immutable={true} tag='v-th' />

<script lang='ts'>
  import { addStyles } from '../../lib/index'
  addStyles()
</script>

<th class="p-2 text-left text-neutral-600 font-normal overflow-hidden">
  <slot></slot>
</th>

