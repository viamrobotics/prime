<script lang="ts">
import ToggleButtons from '$lib/toggle-buttons.svelte';

export let options: string[];
export let selected: string | undefined = undefined;
export let disabled = false;
</script>

<ToggleButtons
  {options}
  {selected}
  {disabled}
  on:input
>
  <svelte:fragment slot="legend">Test toggle buttons</svelte:fragment>
</ToggleButtons>
