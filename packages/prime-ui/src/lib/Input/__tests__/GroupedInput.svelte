<script lang="ts">
	import type { FieldState } from '../../Field/state.ts';

	import Input from '../Input.svelte';
	import InputGroup from '../InputGroup.svelte';

	interface Props {
		disabled?: boolean;
		readonly?: boolean;
		state?: FieldState;
		groupClass?: string;
		actionDisabled?: boolean;
		onpointerdown?: (event: PointerEvent) => void;
	}

	const { disabled, readonly, state, groupClass, actionDisabled, onpointerdown }: Props = $props();
</script>

<InputGroup data-testid="group" class={groupClass} {onpointerdown}>
	<Input {disabled} {readonly} {state} />
	<span data-testid="suffix">kg</span>
	<button type="button" data-testid="action" disabled={actionDisabled}>Clear</button>
</InputGroup>
