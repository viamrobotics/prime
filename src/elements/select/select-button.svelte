<svelte:options immutable tag="v-select-button" />

<script lang="ts">
import { addStyles } from '../../lib/index';

export let buttontext = 'ENTER';
export let buttonicon = '';

addStyles();
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
  class="flex cursor-pointer hover:bg-light items-center px-2 py-1 border-t-[1px] border-light"
>
  {#if buttonicon}
    <v-icon name={buttonicon} />
  {/if}
  <span class="text-sm pl-2">{buttontext}</span>
</div>
