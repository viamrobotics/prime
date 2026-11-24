<!--
@component
A native number input with the Viam border and padding. On its own it renders a frame that holds a
real `<input type="number">` and a [`NumberInput.Stepper`](./NumberInputStepper.svelte) in place
of the browser's spin buttons. `class` lands on the frame, so the consumer owns its width, and every
other attribute lands on the input. Inside a [`Field`](../Field/Field.svelte) it takes its `id`
(the field's `controlId`), `disabled`, `required`, `state`, `aria-describedby`, and its name from
there.

Inside an [`Input.Group`](./InputGroup.svelte) it renders the bare input, which goes borderless,
and `class` lands on that input. The group renders the stepper as its last child, after a suffix,
in place of the browser's spin buttons.

```svelte
<NumberInput aria-label="Quantity" min={0} max={10} bind:value />
```
-->
<script lang="ts">
	import type { ClassValue, HTMLInputAttributes } from 'svelte/elements';

	import type { FieldState } from '../Field/state.ts';

	import { accessibleNameWarning } from '../accessible-name-warning.ts';
	import InputGroup from './InputGroup.svelte';
	import NumberInputStepper from './NumberInputStepper.svelte';
	import { useInputControl } from './useInputControl.svelte.ts';
	import { useInputGroup } from './useInputGroup.ts';

	interface Props extends Omit<
		HTMLInputAttributes,
		'value' | 'min' | 'max' | 'step' | 'type' | 'children' | 'class'
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

		/**
		 * Classes for the root element: the frame on its own, or the input inside an `Input.Group`.
		 */
		class?: ClassValue;
	}

	let {
		id,
		value = $bindable(),
		state,
		disabled,
		required,
		readonly,
		'aria-describedby': describedBy,
		'aria-label': ariaLabel,
		'aria-labelledby': ariaLabelledBy,
		class: extraClasses,
		...restProps
	}: Props = $props();

	const control = useInputControl({
		id: () => id,
		disabled: () => disabled,
		required: () => required,
		state: () => state,
		describedBy: () => describedBy,
		ariaLabel: () => ariaLabel,
		ariaLabelledBy: () => ariaLabelledBy
	});

	const group = useInputGroup();
	const isGrouped = group !== undefined;
	const removeNumberInput = group?.addNumberInput();

	$effect(() => removeNumberInput);

	// The browser's spin buttons give way to the stepper the group renders.
	const SPIN_BUTTON_CLASSES = [
		'group-has-[>[data-number-stepper]]/input:[appearance:textfield]',
		'group-has-[>[data-number-stepper]]/input:[&::-webkit-inner-spin-button]:appearance-none',
		'group-has-[>[data-number-stepper]]/input:[&::-webkit-outer-spin-button]:appearance-none'
	];
</script>

{#snippet field()}
	<input
		{...restProps}
		{...control.attributes}
		type="number"
		bind:value={() => value ?? null, (next) => (value = next ?? undefined)}
		{readonly}
		class={['input', SPIN_BUTTON_CLASSES, isGrouped && extraClasses]}
		{@attach accessibleNameWarning('NumberInput')}
	/>
{/snippet}

{#if isGrouped}
	{@render field()}
{:else}
	<InputGroup class={extraClasses}>
		{@render field()}
		<NumberInputStepper />
	</InputGroup>
{/if}
