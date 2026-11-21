<script lang="ts">
	import type { FieldState } from '../state.ts';

	import Hint from '../../Hint/Hint.svelte';
	import FileInput from '../../Input/FileInput.svelte';
	import Label from '../../Label/Label.svelte';
	import Field from '../Field.svelte';

	const {
		controlId,
		disabled,
		required,
		state: fieldState,
		inputDisabled,
		hintCount = 1
	}: {
		controlId?: string;
		disabled?: boolean;
		required?: boolean;
		state?: FieldState;
		inputDisabled?: boolean;
		hintCount?: number;
	} = $props();
</script>

<Field {controlId} {disabled} {required} state={fieldState}>
	<Label>Audio file</Label>
	<FileInput disabled={inputDisabled} />
	{#each { length: hintCount }, index (index)}
		<Hint>Hint {index + 1}</Hint>
	{/each}
</Field>
