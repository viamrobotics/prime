<script lang="ts">
	import { untrack } from 'svelte';

	import { ToggleButtons } from '../toggle-buttons.ts';

	interface Props {
		initial?: string;
		disabled?: boolean;
		composed?: boolean;
		label?: string;
	}

	let { initial = 'local', disabled, composed = false, label }: Props = $props();

	const items = [
		{ value: 'local', label: 'Local' },
		{ value: 'world', label: 'World' },
		{ value: 'view', label: 'View' }
	];

	let value = $state(untrack(() => initial));
	const name = $derived(label ? { label } : { 'aria-label': 'Space' });
</script>

{#if composed}
	<ToggleButtons bind:value {disabled} {...name}>
		{#each items as item (item.value)}
			<ToggleButtons.Item value={item.value}>{item.label}</ToggleButtons.Item>
		{/each}
	</ToggleButtons>
{:else}
	<ToggleButtons bind:value {items} {disabled} {...name} />
{/if}
<output data-testid="owner">{value}</output>
