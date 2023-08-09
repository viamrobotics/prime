<svelte:options immutable />

<script lang="ts">
export let buttontext = 'ENTER';
export let buttonicon = '';
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
  class="flex cursor-pointer hover:bg-light items-center px-2 py-1 border-t-[1px] border-light"
>
  {#if buttonicon}
    <v-icon class="-mt-0.5" name={buttonicon} />
  {/if}
  <span class="text-sm pl-1.5">{buttontext}</span>
</div>
