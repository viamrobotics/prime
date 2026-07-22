<!--
@component
A form label. Inside a [`Field`](../Field/Field.svelte) it points at the control and
mirrors the field's `required` and `disabled` on its own.

Built on [bits-ui `Label`](https://bits-ui.com/docs/components/label).

```svelte
<Field class="flex flex-col gap-1" required>
	<Label>Email</Label>
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
	import type { HTMLLabelAttributes } from 'svelte/elements';

	import { Label } from 'bits-ui';

	import { useField } from '../Field/useField.svelte.ts';

	interface Props extends HTMLLabelAttributes {
		/** Show a required asterisk. Defaults to the enclosing field's `required`. */
		required?: boolean;

		/** Dim the label and show a not-allowed cursor. Defaults to the enclosing field's `disabled`. */
		disabled?: boolean;
	}

	const {
		id,
		for: htmlFor,
		required,
		disabled,
		class: extraClasses,
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

<Label.Root
	{...restProps}
	id={labelId}
	for={htmlFor ?? field?.id}
	class={[
		'inline-flex items-center gap-1 text-sm text-default',
		isDisabled && 'cursor-not-allowed text-disabled-dark',
		extraClasses
	]}
>
	<span>{@render children?.()}</span>
	{#if isRequired}
		<span class="text-danger-dark" aria-hidden="true">*</span>
	{/if}
</Label.Root>
