<svelte:options immutable={true} tag='v-td' />

<script lang='ts'>
import { addStyles } from '../../lib/index';

addStyles();

</script>

<td class="p-2 overflow-hidden">
  <slot />
</td>
