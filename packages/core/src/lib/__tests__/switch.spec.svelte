<script lang="ts">
import Switch from '$lib/switch.svelte';

export let on = false;
export let annotated = false;
export let disabled = false;
</script>

<Switch
  {on}
  {annotated}
  {disabled}
  on:toggle
>
  <svelte:fragment slot="on">Enabled</svelte:fragment>
  <svelte:fragment slot="off">Disabled</svelte:fragment>
</Switch>
