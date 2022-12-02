
<svelte:options immutable tag='v-select-button' />

<script lang='ts'>

import { addStyles } from '../../lib/index';
import { dispatcher } from '../../lib/dispatch';


export let buttontext = 'ENTER';
export let buttonicon = '';

const dispatch = dispatcher();

addStyles();

const handleButtonClick = () => {
  dispatch('button-click');
};

</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div 
  class='flex cursor-pointer hover:bg-gray-200 items-center p-2 border-t-[1px] border-t-gray-200 '
  on:click={handleButtonClick}
  >
  {#if buttonicon}
    <v-icon name={buttonicon}/>
  {/if}
  <span class='text-xs pl-2'>{buttontext}</span>
</div>