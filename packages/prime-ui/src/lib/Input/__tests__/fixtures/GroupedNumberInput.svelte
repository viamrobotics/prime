<script lang="ts">
	import type { ClassValue } from 'svelte/elements';

	import { Input } from '../../input.ts';
	import { NumberInput } from '../../number-input.ts';

	interface Props {
		hasStepper?: boolean;
		groupClass?: ClassValue;
		value?: number;
	}

	let { hasStepper = true, groupClass, value = $bindable(1) }: Props = $props();
</script>

<Input.Group data-testid="group" class={groupClass}>
	<NumberInput aria-label="Length" bind:value />
	<span data-testid="suffix" class="shrink-0 text-subtle-2">mm</span>
	{#if hasStepper}
		<NumberInput.Stepper />
	{/if}
</Input.Group>
