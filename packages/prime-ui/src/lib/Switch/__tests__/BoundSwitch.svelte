<script lang="ts">
	import type { FieldState } from '../../Field/state.ts';

	import Switch from '../Switch.svelte';

	interface Props {
		disabled?: boolean;
		required?: boolean;
		name?: string;
		value?: string;
		state?: FieldState;
	}

	const { disabled, required, name, value, state: fieldState }: Props = $props();

	let checked = $state(false);
</script>

<Switch bind:checked {disabled} {required} {name} {value} state={fieldState} />
<span data-testid="owner">{checked}</span>
