<svelte:options immutable={true} tag='v-tbody' />

<script lang='ts'>
import { addStyles } from '../../lib/index'

addStyles()
</script>

<tbody>
  <slot />
</tbody>
