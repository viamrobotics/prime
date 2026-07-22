<script lang="ts">
	import type { InputState } from '../../Input/state.ts';

	import Hint from '../../Hint/Hint.svelte';
	import Input from '../../Input/Input.svelte';
	import Label from '../../Label/Label.svelte';
	import Field from '../Field.svelte';

	const {
		id,
		disabled,
		required,
		state,
		inputId,
		hintCount = 1
	}: {
		id?: string;
		disabled?: boolean;
		required?: boolean;
		state?: InputState;
		inputId?: string;
		hintCount?: number;
	} = $props();
</script>

<Field {id} {disabled} {required} {state}>
	<Label>Email</Label>
	<Input id={inputId} type="email" />
	{#each { length: hintCount }, index (index)}
		<Hint>Hint {index + 1}</Hint>
	{/each}
</Field>
