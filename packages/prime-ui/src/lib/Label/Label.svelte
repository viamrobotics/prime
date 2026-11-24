<!--
@component
A form label. Inside a [`Field`](../Field/Field.svelte) it points at the control, names it
through `aria-labelledby`, and takes the field's `required` and `disabled`. With no children it
renders the field's `label`.

```svelte
<Field label="Email" class="flex flex-col gap-1" required>
	<Label />
	<Input type="email" bind:value />
</Field>
```

On its own, associate it with `for`:

```svelte
<Label for="email" required>Email</Label>
<Input id="email" bind:value />
```
-->
<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLLabelAttributes } from 'svelte/elements';

	import { useField } from '../Field/useField.svelte.ts';

	interface Props extends HTMLLabelAttributes {
		/** Show a required asterisk. Defaults to the enclosing field's `required`. */
		required?: boolean;

		/** Dim the label and show a not-allowed cursor. Defaults to the enclosing field's `disabled`. */
		disabled?: boolean;

		/** Replaces the required asterisk. Rendered only when required. */
		indicator?: Snippet;

		/** The label text. Defaults to the enclosing field's `label`. */
		children?: Snippet;
	}

	const {
		id,
		for: htmlFor,
		required,
		disabled,
		class: extraClasses,
		indicator,
		children,
		...restProps
	}: Props = $props();

	const field = useField();
	const uid = $props.id();

	const labelId = $derived(id ?? uid);
	const isRequired = $derived(required ?? field?.required ?? false);
	const isDisabled = $derived(disabled ?? field?.disabled ?? false);

	$effect(() => field?.label(labelId));
</script>

<label
	{...restProps}
	id={labelId}
	for={htmlFor ?? field?.controlId}
	class={[
		'inline-flex items-center gap-1 text-sm text-default',
		isDisabled && 'cursor-not-allowed text-disabled-dark',
		extraClasses
	]}
>
	<span>
		{#if children}
			{@render children()}
		{:else}
			{field?.labelText}
		{/if}
	</span>
	{#if isRequired}
		{#if indicator}
			{@render indicator()}
		{:else}
			<span class="text-danger-dark" aria-hidden="true">*</span>
		{/if}
	{/if}
</label>
