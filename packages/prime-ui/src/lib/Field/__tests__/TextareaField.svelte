<script lang="ts">
	import type { FieldState } from '../state.ts';

	import Hint from '../../Hint/Hint.svelte';
	import Textarea from '../../Input/Textarea.svelte';
	import Label from '../../Label/Label.svelte';
	import Field from '../Field.svelte';

	const {
		controlId,
		id,
		disabled,
		required,
		state,
		inputId,
		textareaDisabled,
		hintCount = 1
	}: {
		controlId?: string;
		id?: string;
		disabled?: boolean;
		required?: boolean;
		state?: FieldState;
		inputId?: string;
		textareaDisabled?: boolean;
		hintCount?: number;
	} = $props();
</script>

<Field {controlId} {id} {disabled} {required} {state}>
	<Label>Email</Label>
	<Textarea id={inputId} disabled={textareaDisabled} />
	{#each { length: hintCount }, index (index)}
		<Hint>Hint {index + 1}</Hint>
	{/each}
</Field>
