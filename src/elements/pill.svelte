<svelte:options immutable tag='v-pill' />

<script lang='ts'>

import { dispatcher } from '../lib/dispatch';
import { addStyles } from '../lib/index';
import { htmlToBoolean } from '../lib/boolean';

export let value = ''; 
export let removable = 'true';
let isRemovable: boolean;
$: isRemovable = htmlToBoolean(removable, 'removable');


const dispatch = dispatcher();
addStyles();

const handleRemove = () => {
  dispatch('remove', { value });
};

</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class='flex cursor-pointer items-center max-w-fit gap-1 rounded-xl bg-[#C4C4C4] py-0.5 px-2 text-[10px] hover:bg-gray-300'>
  <span>
    {value}
  </span>
  {#if isRemovable}
  <v-icon 
    name='x'
    on:click={handleRemove}
  />
  {/if}
</div>