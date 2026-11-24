<!--
@component
The segmented date field of a [`DatePicker`](./DatePicker.svelte). Each part of the date is its own
editable segment: type digits, or press the arrow keys to step it. Place a
[`DatePicker.Trigger`](./DatePickerTrigger.svelte) inside it to open the calendar.

Inside a [`Field`](../Field/Field.svelte) it takes its `id` (the field's `controlId`), `state`,
`aria-describedby`, and name from there. An `error` state, or a typed date outside
the picker's `min` and `max`, sets `aria-invalid` on the frame and on each segment, and draws
the error border, and `warn` the warning border, through the same `input` class an
[`Input`](../Input/Input.svelte) wears. A `required` picker sets `aria-required` on each segment.
The border darkens while the calendar is open, as a
[`Select.Trigger`](../Select/SelectTrigger.svelte) does while its list is open.

When the picker has a `name`, the field renders the form input after its frame.

```svelte
<DatePicker.Field>
	<DatePicker.Trigger />
</DatePicker.Field>
```
-->
<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';

	import { DatePicker } from 'bits-ui';

	import { accessibleNameWarning } from '../accessible-name-warning.ts';
	import { FieldStates, type FieldState } from '../Field/state.ts';
	import { controlName, useField } from '../Field/useField.svelte.ts';
	import { useDatePicker } from './useDatePicker.svelte.ts';

	interface Props extends HTMLAttributes<HTMLDivElement> {
		/** Element id. `null` is not accepted. */
		id?: string;

		/** Contextual state. Defaults to the enclosing field's `state`. */
		state?: FieldState;
	}

	const {
		id,
		'aria-label': ariaLabel,
		'aria-labelledby': ariaLabelledBy,
		'aria-describedby': describedBy,
		state,
		class: extraClasses,
		children: trailing,
		...restProps
	}: Props = $props();

	const field = useField();
	const accessibleName = $derived(controlName(field, { ariaLabel, ariaLabelledBy }));
	const picker = useDatePicker();
	const currentState = $derived(state ?? field?.state ?? FieldStates.None);
	const openState = $derived.by(() => {
		if (!picker) return undefined;
		return picker.open ? 'open' : 'closed';
	});

	// bits-ui marks a segment invalid only for a date outside the bounds, and never required.
	const segmentState = (part: string) => {
		if (part === 'literal') return {};
		return {
			'aria-invalid': currentState === FieldStates.Error || undefined,
			'aria-required': picker?.required || undefined
		};
	};
</script>

<DatePicker.Input
	{...restProps}
	id={id ?? field?.controlId}
	name={picker?.formName}
	aria-label={accessibleName['aria-label']}
	aria-labelledby={accessibleName['aria-labelledby']}
	aria-describedby={describedBy ?? field?.describedBy}
	data-field-state={currentState === FieldStates.None ? undefined : currentState}
	data-readonly={picker?.readonly ? '' : undefined}
	data-state={openState}
	class={['date-field input', extraClasses]}
>
	{#snippet child({ props, segments })}
		<div
			{...props}
			{@attach accessibleNameWarning('DatePicker.Field')}
			aria-invalid={currentState === FieldStates.Error ||
				props['data-invalid'] !== undefined ||
				undefined}
		>
			<span class="flex items-center">
				{#each segments as { part, value }, index (index)}
					<DatePicker.Segment {part} class="date-segment" {...segmentState(part)}>
						{value}
					</DatePicker.Segment>
				{/each}
			</span>
			{@render trailing?.()}
		</div>
	{/snippet}
</DatePicker.Input>
