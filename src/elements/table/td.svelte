<svelte:options immutable tag="v-td" />

<script lang="ts">
import { addStyles } from '../../lib/index';

export let style = '';

addStyles();
</script>

<td {style} part="table-cell" class="p-2 overflow-hidden">
  <slot />
</td>

<style>
:host {
  display: contents !important;
}
</style>
