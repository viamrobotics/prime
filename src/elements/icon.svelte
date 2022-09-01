<svelte:options immutable={true} tag='v-icon' />

<script lang='ts'>

import { addStyles } from '../lib/index';

type Size = 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl'| '3xl'| '4xl'

export let name = '';
export let size: Size = 'base';

addStyles();

</script>

<i
  aria-hidden
  class='icon-{name} text-{size}'
/>
