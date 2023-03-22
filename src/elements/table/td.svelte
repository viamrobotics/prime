<svelte:options immutable tag="v-td" />

<script lang="ts">
import { addStyles } from '../../lib/index';

export let style = '';

addStyles();
</script>

<style>
:host {
  display: contents !important;
}
</style>

<td {style} part="table-cell" class="p-2 overflow-hidden">
  <slot />
</td>
