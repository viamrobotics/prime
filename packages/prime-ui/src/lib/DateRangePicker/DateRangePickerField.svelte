<!--
@component
The segmented field of a [`DateRangePicker`](./DateRangePicker.svelte): the start date's segments,
a dash, and the end date's segments in one frame. Each part of a date is its own editable segment:
type digits, or press the arrow keys to step it. Completing the start date moves focus on to the
end date. Place a [`DateRangePicker.Trigger`](./DateRangePickerTrigger.svelte) inside it to open
the calendar.

Inside a [`Field`](../Field/Field.svelte) it takes its `id` (the field's `controlId`), `state`,
`aria-describedby`, and name from there. An `error` state, or a typed date outside
the picker's `min` and `max`, sets `aria-invalid` on the frame and on each segment, and draws
the error border, and `warn` the warning border, through the same `input` class an
[`Input`](../Input/Input.svelte) wears. A `required` picker sets `aria-required` on each segment.
The border darkens while the calendar is open.

```svelte
<DateRangePicker.Field>
	<DateRangePicker.Trigger />
</DateRangePicker.Field>
```
-->
<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';

	import { DateRangePicker } from 'bits-ui';

	import { accessibleNameWarning } from '../accessible-name-warning.ts';
	import { FieldStates, type FieldState } from '../Field/state.ts';
	import { controlName, useField } from '../Field/useField.svelte.ts';
	import { useDateRangePicker, useDateRangePickerFrame } from './useDateRangePicker.svelte.ts';

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
	const name = $derived(controlName(field, { ariaLabel, ariaLabelledBy }));
	const picker = useDateRangePicker();
	const frame = useDateRangePickerFrame();
	const frameProps = $derived(frame?.() ?? {});
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

{#snippet dateSegments(type: 'start' | 'end')}
	<DateRangePicker.Input {type}>
		{#snippet child({ props, segments })}
			<span {...props} class="flex items-center">
				{#each segments as { part, value }, index (index)}
					<DateRangePicker.Segment {part} class="date-segment" {...segmentState(part)}>
						{value}
					</DateRangePicker.Segment>
				{/each}
			</span>
		{/snippet}
	</DateRangePicker.Input>
{/snippet}

<div
	{...restProps}
	{...frameProps}
	id={id ?? field?.controlId ?? (frameProps.id as string | undefined)}
	aria-label={name['aria-label']}
	aria-labelledby={name['aria-labelledby']}
	aria-describedby={describedBy ?? field?.describedBy}
	aria-invalid={currentState === FieldStates.Error ||
		frameProps['data-invalid'] !== undefined ||
		undefined}
	data-field-state={currentState === FieldStates.None ? undefined : currentState}
	aria-disabled={picker?.disabled || undefined}
	data-disabled={picker?.disabled ? '' : undefined}
	data-readonly={picker?.readonly ? '' : undefined}
	data-state={openState}
	class={['date-field input', extraClasses]}
	{@attach accessibleNameWarning('DateRangePicker.Field')}
>
	{@render dateSegments('start')}
	<span aria-hidden="true">–</span>
	{@render dateSegments('end')}
	{@render trailing?.()}
</div>
