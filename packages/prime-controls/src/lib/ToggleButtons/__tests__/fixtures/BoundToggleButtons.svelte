<script lang="ts">
	import type { ClassValue } from 'svelte/elements';

	import { untrack } from 'svelte';

	import { ToggleButtons } from '../../toggle-buttons.ts';

	interface Props {
		initial?: string;
		disabled?: boolean;
		isComposed?: boolean;
		label?: string;
		hint?: string;
		isViewDisabled?: boolean;
		class?: ClassValue;
	}

	let {
		initial = 'local',
		disabled,
		isComposed = false,
		label,
		hint,
		isViewDisabled = false,
		class: extraClasses
	}: Props = $props();

	const items = $derived([
		{ value: 'local', label: 'Local' },
		{ value: 'world', label: 'World' },
		{ value: 'view', label: 'View', disabled: isViewDisabled }
	]);

	let value = $state(untrack(() => initial));
	const name = $derived(label ? { label, hint } : { 'aria-label': 'Space' });
</script>

{#if isComposed}
	<ToggleButtons bind:value {disabled} class={extraClasses} {...name}>
		{#each items as item (item.value)}
			<ToggleButtons.Item value={item.value}>{item.label}</ToggleButtons.Item>
		{/each}
	</ToggleButtons>
{:else}
	<ToggleButtons bind:value {items} {disabled} class={extraClasses} {...name} />
{/if}
<output data-testid="owner">{value}</output>
