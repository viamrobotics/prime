<svelte:options immutable tag="v-context-menu" />

<script lang="ts">
import { addStyles } from '../../lib/index';

addStyles();
</script>

<div role="menu" class="py-1 border border-medium shadow-sm max-w-xs">
  <slot class="filter-none" />
</div>
