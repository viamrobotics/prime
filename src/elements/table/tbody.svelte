<svelte:options immutable tag='v-tbody' />

<script lang='ts'>

import { addStyles } from '../../lib/index';

export let style = '';

addStyles();

</script>

<style>
:host { display: contents !important; }
</style>

<tbody {style}>
  <slot />
</tbody>
