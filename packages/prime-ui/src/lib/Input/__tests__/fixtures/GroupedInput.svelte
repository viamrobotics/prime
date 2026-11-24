<script lang="ts">
	import type { ClassValue } from 'svelte/elements';

	import type { FieldState } from '../../../Field/state.ts';

	import Input from '../../Input.svelte';
	import InputGroup from '../../InputGroup.svelte';

	interface Props {
		disabled?: boolean;
		readonly?: boolean;
		state?: FieldState;
		groupClass?: ClassValue;
		actionDisabled?: boolean;
		onpointerdown?: (event: PointerEvent) => void;
	}

	const { disabled, readonly, state, groupClass, actionDisabled, onpointerdown }: Props = $props();
</script>

<InputGroup data-testid="group" class={groupClass} {onpointerdown}>
	<Input aria-label="Weight" {disabled} {readonly} {state} />
	<span data-testid="suffix">kg</span>
	<span data-testid="editable" role="textbox" aria-label="Note" contenteditable="true"></span>
	<span data-testid="role-button" role="button" aria-label="Unit"></span>
	<button type="button" data-testid="action" disabled={actionDisabled}>Clear</button>
</InputGroup>
