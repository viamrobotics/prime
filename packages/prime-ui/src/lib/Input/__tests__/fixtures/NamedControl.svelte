<script lang="ts">
	import Field from '../../../Field/Field.svelte';
	import FileInput from '../../FileInput.svelte';
	import Input from '../../Input.svelte';
	import NumberInput from '../../NumberInput.svelte';
	import Textarea from '../../Textarea.svelte';

	interface Props {
		control: 'Input' | 'NumberInput' | 'Textarea' | 'FileInput';
		naming: 'none' | 'field' | 'aria-label' | 'label-for';
	}

	const { control, naming }: Props = $props();

	const CONTROL_ID = 'named-control';

	const attributes = $derived({
		id: naming === 'label-for' ? CONTROL_ID : undefined,
		'aria-label': naming === 'aria-label' ? 'Name' : undefined
	});
</script>

{#snippet rendered()}
	{#if control === 'Input'}
		<Input {...attributes} />
	{:else if control === 'NumberInput'}
		<NumberInput {...attributes} />
	{:else if control === 'Textarea'}
		<Textarea {...attributes} />
	{:else}
		<FileInput {...attributes} />
	{/if}
{/snippet}

{#if naming === 'field'}
	<Field label="Name">
		{@render rendered()}
	</Field>
{:else}
	{#if naming === 'label-for'}
		<label for={CONTROL_ID}>Name</label>
	{/if}
	{@render rendered()}
{/if}
