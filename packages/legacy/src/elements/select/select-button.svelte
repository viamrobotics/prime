<svelte:options immutable />

<script lang="ts">
export let buttontext = 'ENTER';
export let buttonicon = '';
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
  class="flex cursor-pointer items-center border-t-[1px] border-light px-2 py-1 hover:bg-light"
>
  {#if buttonicon}
    <v-icon
      class="-mt-0.5"
      name={buttonicon}
    />
  {/if}
  <span class="pl-1.5 text-sm">{buttontext}</span>
</div>
