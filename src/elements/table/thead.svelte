<svelte:options immutable tag="v-thead" />

<script lang="ts">
import { addStyles } from '../../lib/index';

export let style = '';

addStyles();
</script>

<thead {style} class="border-b border-black">
  <slot />
</thead>

<style>
:host {
  display: contents !important;
}
</style>
