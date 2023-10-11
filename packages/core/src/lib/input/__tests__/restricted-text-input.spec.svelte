<script lang="ts">
import { RestrictedTextInput } from '$lib';
import { createEventDispatcher } from 'svelte';

export let value: string;
export let restrictInput: (value: string) => string;

const dispatch = createEventDispatcher();

$: dispatch('change', value);
</script>

<RestrictedTextInput
  bind:value
  {restrictInput}
  tooltipDescription=""
/>
