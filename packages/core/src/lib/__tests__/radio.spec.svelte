<script lang="ts">
import Radio from '$lib/radio.svelte';

export let options: string[];
export let name: string;
export let selected: string | undefined = undefined;
export let disabled = false;
export let required = false;
export let direction: 'col' | 'row' = 'col';
</script>

<Radio
  {options}
  {name}
  {selected}
  {disabled}
  {required}
  {direction}
  on:input
>
  <svelte:fragment slot="legend">Test radio options</svelte:fragment>
</Radio>
