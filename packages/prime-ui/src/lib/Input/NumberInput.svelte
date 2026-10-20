<!--
@component
A native number input with the Viam border and padding. It renders one `<input type="number">`, so
`class` lands on it and the consumer owns its width. Inside a [`Field`](../Field/Field.svelte) it
takes its `id` (the field's `controlId`), `disabled`, `required`, `state`, and `aria-describedby` from there. Inside an
[`Input.Group`](./InputGroup.svelte) it goes borderless.

```svelte
<NumberInput id="qty" min={0} max={10} bind:value />
```
-->
<script lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements';

	import type { FieldState } from '../Field/state.ts';

	import { useInputControl } from './useInputControl.svelte.ts';

	interface Props extends Omit<
		HTMLInputAttributes,
		'value' | 'min' | 'max' | 'step' | 'type' | 'children'
	> {
		/** Current value. An empty field is `undefined`. */
		value?: number;

		/** The minimum allowed value. */
		min?: number;

		/** The maximum allowed value. */
		max?: number;

		/**
		 * Step for keyboard or spin-button increments, and the granularity constraint validation
		 * enforces. `'any'` accepts every decimal, which no number can express. @default 1
		 */
		step?: number | 'any';

		/** Contextual state. Defaults to the enclosing field's `state`. */
		state?: FieldState;
	}

	let {
		id,
		value = $bindable(),
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
		readonly: () => readonly,
		state: () => state,
		describedBy: () => describedBy,
		extraClasses: () => extraClasses
	});
</script>

<input
	{...restProps}
	type="number"
	bind:value={() => value ?? null, (next) => (value = next ?? undefined)}
	id={control.id}
	disabled={control.disabled}
	required={control.required}
	{readonly}
	aria-describedby={control.describedBy}
	aria-invalid={control.invalid}
	data-state={control.dataState}
	class={control.classes}
/>
