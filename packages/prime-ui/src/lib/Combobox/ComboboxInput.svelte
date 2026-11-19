<!--
@component
The text input of a [`Combobox`](./Combobox.svelte). Typing filters the list and opens it, and
the input shows the selected option's label otherwise. Inside a
[`Field`](../Field/Field.svelte) it takes its `id` (the field's `controlId`), `state`, and
`aria-describedby` from there. An `error` state sets `aria-invalid` and the error border, and
`warn` the warning border, the same `input` class from `@viamrobotics/tailwind-config` an
[`Input`](../Input/Input.svelte) wears.

Put it in an [`Input.Group`](../Input/InputGroup.svelte) beside a
[`Combobox.Trigger`](./ComboboxTrigger.svelte), and the group takes over its frame:

```svelte
<Input.Group>
	<Combobox.Input placeholder="Search regions" />
	<Combobox.Trigger />
</Input.Group>
```
-->
<script lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements';

	import { Combobox } from 'bits-ui';

	import { FieldStates, type FieldState } from '../Field/state.ts';
	import { useField } from '../Field/useField.svelte.ts';
	import { useCombobox } from './useCombobox.svelte.ts';

	interface Props extends Omit<HTMLInputAttributes, 'value'> {
		/** Element id. `null` is not accepted. */
		id?: string;

		/** Contextual state. Defaults to the enclosing field's `state`. */
		state?: FieldState;
	}

	const {
		id,
		'aria-describedby': describedBy,
		state,
		class: extraClasses,
		oninput,
		...restProps
	}: Props = $props();

	const field = useField();
	const combobox = useCombobox();
	if (!combobox) {
		throw new Error('Combobox.Input must be rendered inside a Combobox.');
	}

	const currentState = $derived(state ?? field?.state ?? FieldStates.None);

	const handleInput = (event: Event & { currentTarget: EventTarget & HTMLInputElement }) => {
		oninput?.(event);
		combobox.query = event.currentTarget.value;
	};
</script>

<Combobox.Input
	id={id ?? field?.controlId}
	aria-describedby={describedBy ?? field?.describedBy}
	aria-invalid={currentState === FieldStates.Error || undefined}
	aria-required={combobox.required || undefined}
	data-field-state={currentState === FieldStates.None ? undefined : currentState}
	class={['input', extraClasses]}
	oninput={handleInput}
	{...restProps}
>
	{#snippet child({ props })}
		<input {...props} value={combobox.text} bind:this={combobox.input} />
	{/snippet}
</Combobox.Input>
