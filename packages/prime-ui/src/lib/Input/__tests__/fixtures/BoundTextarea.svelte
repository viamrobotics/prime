<script lang="ts">
	import type { FieldState } from '../../../Field/state.ts';

	import Textarea from '../../Textarea.svelte';

	interface Props {
		disabled?: boolean;
		readonly?: boolean;
		required?: boolean;
		state?: FieldState;
	}

	const { state: fieldState, ...restProps }: Props = $props();

	let value = $state('');
</script>

<Textarea aria-label="Notes" {...restProps} state={fieldState} bind:value />
<span data-testid="owner">{value}</span>
