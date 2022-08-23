<svelte:options immutable tag='v-thead' />

<script lang='ts'>

import { addStyles } from '../../lib/index';

export let style = ''

addStyles();

</script>

<style>
:host { display: contents !important; }
</style>

<thead
  {style}
  class="border-b border-black"
>
  <slot />
</thead>
