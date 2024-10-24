<script lang="ts">
import ToggleButtons from '$lib/toggle-button.svelte';

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
  <svelte:fragment slot="label">Test toggle buttons</svelte:fragment>
</ToggleButtons>
