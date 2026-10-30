<!--
@component
A native multi-line text input with the Viam border and padding. Inside a
[`Field`](../Field/Field.svelte) it takes its `id` (the field's `controlId`), `disabled`,
`required`, `state`, and `aria-describedby` from there. It grows with its content where the
browser supports `field-sizing: content`, and shows `rows` lines elsewhere.

```svelte
<Field class="flex flex-col gap-1">
	<Label>Notes</Label>
	<Textarea class="w-64" bind:value />
</Field>
```
-->
<script lang="ts">
	import type { HTMLTextareaAttributes } from 'svelte/elements';

	import type { FieldState } from '../Field/state.ts';

	import { useInputControl } from './useInputControl.svelte.ts';

	interface Props extends Omit<HTMLTextareaAttributes, 'value' | 'children'> {
		/** The text in the textarea. */
		value?: string;

		/** Visible lines where the browser cannot size the box to its content. @default 3 */
		rows?: number;

		/** Contextual state. Defaults to the enclosing field's `state`. */
		state?: FieldState;
	}

	let {
		id,
		value = $bindable(),
		rows = 3,
		state,
		disabled,
		required,
		readonly,
		'aria-describedby': describedBy,
		class: extraClasses,
		...restProps
	}: Props = $props();

	const control = useInputControl({
		id: () => id,
		disabled: () => disabled,
		required: () => required,
		state: () => state,
		describedBy: () => describedBy
	});
</script>

<textarea
	{...restProps}
	bind:value
	id={control.id}
	{rows}
	class={['field-sizing-content input', extraClasses]}
	disabled={control.disabled}
	required={control.required}
	{readonly}
	aria-describedby={control.describedBy}
	aria-invalid={control.invalid}
	data-field-state={control.fieldState}
></textarea>
