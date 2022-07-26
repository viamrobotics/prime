<svelte:options immutable={true} tag='v-table' />

<script lang='ts'>

import { addStyles } from '../../lib/index'

addStyles()

</script>

<table class="bg-white table-fixed text-xs w-full">
  <slot />
</table>
