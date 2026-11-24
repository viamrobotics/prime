<!--
@component
An on/off switch. Inside a [`Field`](../Field/Field.svelte) it takes its `id` (the field's
`controlId`), `disabled`, `required`, `state`, `aria-describedby`, and name from there. An `error`
state sets `aria-invalid`. Name it with a `Label`, or give its `Field` a `label`. A `switch-info`, `switch-success`,
`switch-warning`, or `switch-danger` class sets the track color while it is on.

Built on [bits-ui `Switch`](https://bits-ui.com/docs/components/switch).

```svelte
<Field label="Notifications" class="flex items-center gap-2">
	<Switch bind:checked />
	<Label />
</Field>
```
-->
<script lang="ts">
	import type { HTMLButtonAttributes } from 'svelte/elements';

	import { Switch } from 'bits-ui';

	import { warnIfUnnamed } from '../accessible-name-warning.ts';
	import { fieldState, FieldStates, type FieldState } from '../Field/state.ts';
	import { controlName, useField } from '../Field/useField.svelte.ts';

	interface Props extends Omit<HTMLButtonAttributes, 'children' | 'value'> {
		/** Checked (on) state. Two-way bindable. @default false */
		checked?: boolean;
		/** Value submitted when on and a `name` is given. */
		value?: string;
		/** Name for form submission. bits-ui accepts a string only, so `null` is dropped. */
		name?: string;
		/** Mark the switch required. With a `name`, the form does not submit until it is on. Defaults to the enclosing field's `required`. */
		required?: boolean;
		/** Contextual state. Defaults to the enclosing field's `state`. */
		state?: FieldState;
	}

	let {
		id,
		checked = $bindable(),
		disabled,
		required,
		state: stateProp,
		'aria-describedby': describedBy,
		'aria-label': ariaLabel,
		'aria-labelledby': ariaLabelledBy,
		class: extraClasses,
		...restProps
	}: Props = $props();

	const field = useField();
	const uid = $props.id();
	let element = $state<HTMLButtonElement | null>(null);

	const name = $derived(controlName(field, { ariaLabel, ariaLabelledBy }));

	$effect(() => {
		if (element) warnIfUnnamed(element, 'Switch');
	});

	const isDisabled = $derived(disabled ?? field?.disabled ?? false);
	const isRequired = $derived(required ?? field?.required ?? false);
	const currentState = $derived(stateProp ?? field?.state ?? FieldStates.None);
	const isError = $derived(fieldState.isError(currentState));
</script>

<Switch.Root
	bind:ref={element}
	bind:checked={() => checked ?? false, (next) => (checked = next)}
	id={id ?? field?.controlId ?? uid}
	class={[
		'inline-flex h-5 w-9 shrink-0 items-center rounded-full p-0.5 focus-ring',
		isDisabled
			? 'cursor-not-allowed bg-disabled-light data-[state=checked]:bg-disabled-dark'
			: 'cursor-pointer bg-gray-6 aria-invalid:bg-danger-light data-[state=checked]:bg-[var(--switch-on,var(--color-gray-9))] aria-invalid:data-[state=checked]:bg-danger-dark',
		extraClasses
	]}
	disabled={isDisabled}
	required={isRequired}
	aria-invalid={isError || undefined}
	aria-describedby={describedBy ?? field?.describedBy}
	aria-label={name['aria-label']}
	aria-labelledby={name['aria-labelledby']}
	{...restProps}
>
	<Switch.Thumb
		class="pointer-events-none size-4 rounded-full bg-white transition-transform data-[state=checked]:translate-x-4 motion-reduce:transition-none"
	/>
</Switch.Root>
