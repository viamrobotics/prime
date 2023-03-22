<svelte:options immutable tag="v-tbody" />

<script lang="ts">
import { addStyles } from '../../lib/index';

export let style = '';

addStyles();
</script>

<tbody {style}>
  <slot />
</tbody>

<style>
:host {
  display: contents !important;
}
</style>
