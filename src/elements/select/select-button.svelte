
<svelte:options immutable tag='v-select-button' />

<script lang='ts'>

import { addStyles } from '../../lib/index';

export let buttontext = 'ENTER';
export let buttonicon = '';

addStyles();

</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div 
  class='flex cursor-pointer hover:bg-gray-200 items-center p-2 border-t-[1px] border-t-gray-200 '
  >
  {#if buttonicon}
    <v-icon name={buttonicon}/>
  {/if}
  <span class='text-xs pl-2'>{buttontext}</span>
</div>