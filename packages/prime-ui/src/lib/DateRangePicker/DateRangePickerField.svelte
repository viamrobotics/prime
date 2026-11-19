<!--
@component
The segmented field of a [`DateRangePicker`](./DateRangePicker.svelte): the start date's segments,
a dash, and the end date's segments in one frame. Each part of a date is its own editable segment:
type digits, or press the arrow keys to step it. Completing the start date moves focus on to the
end date. Place a [`DateRangePicker.Trigger`](./DateRangePickerTrigger.svelte) inside it to open
the calendar.

Inside a [`Field`](../Field/Field.svelte) it takes its `id` (the field's `controlId`), `state`,
`aria-labelledby`, and `aria-describedby` from there. An `error` state, or a typed date outside
the picker's `min` and `max`, sets `aria-invalid` and the error border, and `warn` the warning
border, through the same `input` class an [`Input`](../Input/Input.svelte) wears. The border
darkens while the calendar is open.

```svelte
<DateRangePicker.Field>
	<DateRangePicker.Trigger />
</DateRangePicker.Field>
```
-->
<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';

	import { DateRangePicker } from 'bits-ui';

	import { FieldStates, type FieldState } from '../Field/state.ts';
	import { useField } from '../Field/useField.svelte.ts';
	import { useDateRangePicker, useDateRangePickerFrame } from './useDateRangePicker.svelte.ts';

	interface Props extends HTMLAttributes<HTMLDivElement> {
		/** Element id. `null` is not accepted. */
		id?: string;

		/** Contextual state. Defaults to the enclosing field's `state`. */
		state?: FieldState;
	}

	const {
		id,
		'aria-labelledby': labelledBy,
		'aria-describedby': describedBy,
		state,
		class: extraClasses,
		children: trailing,
		...restProps
	}: Props = $props();

	const field = useField();
	const picker = useDateRangePicker();
	const frame = useDateRangePickerFrame();
	const frameProps = $derived(frame?.() ?? {});
	const currentState = $derived(state ?? field?.state ?? FieldStates.None);
	const openState = $derived.by(() => {
		if (!picker) return undefined;
		return picker.open ? 'open' : 'closed';
	});
</script>

{#snippet dateSegments(type: 'start' | 'end')}
	<DateRangePicker.Input {type}>
		{#snippet child({ props, segments })}
			<span {...props} class="flex items-center">
				{#each segments as { part, value }, index (index)}
					<DateRangePicker.Segment
						{part}
						class={[
							'rounded-sm tabular-nums outline-none aria-[valuetext=Empty]:text-subtle-2',
							part !== 'literal' && 'px-0.5 focus:bg-medium'
						]}
					>
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
	aria-labelledby={labelledBy ?? field?.labelledBy}
	aria-describedby={describedBy ?? field?.describedBy}
	aria-invalid={currentState === FieldStates.Error ||
		frameProps['data-invalid'] !== undefined ||
		undefined}
	data-field-state={currentState === FieldStates.None ? undefined : currentState}
	aria-disabled={picker?.disabled || undefined}
	data-disabled={picker?.disabled ? '' : undefined}
	data-readonly={picker?.readonly ? '' : undefined}
	data-state={openState}
	class={[
		'inline-flex input items-center gap-1 focus-ring-within data-[state=open]:border-gray-9',
		extraClasses
	]}
>
	{@render dateSegments('start')}
	<span aria-hidden="true">–</span>
	{@render dateSegments('end')}
	{@render trailing?.()}
</div>
