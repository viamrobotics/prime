<script lang="ts">
import ToggleButton from '$lib/toggle-button.svelte';

export let options: string[];
export let selected: string | undefined = undefined;
export let disabled = false;
</script>

<ToggleButton
  {options}
  {selected}
  {disabled}
  on:input
>
  <svelte:fragment slot="label">Test toggle buttons</svelte:fragment>
</ToggleButton>
