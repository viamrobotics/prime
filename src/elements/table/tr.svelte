<svelte:options immutable={true} tag='v-tr' />

<script lang='ts'>

import { addStyles } from '../../lib/index'

addStyles()

</script>

<tr class="border-b">
  <slot />
</tr>
