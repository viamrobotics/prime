<!--
@component
The segmented date field of a [`DatePicker`](./DatePicker.svelte). Each part of the date is its own
editable segment: type digits, or press the arrow keys to step it. Place a
[`DatePicker.Trigger`](./DatePickerTrigger.svelte) inside it to open the calendar.

Inside a [`Field`](../Field/Field.svelte) it takes its `id` (the field's `controlId`), `state`,
`aria-labelledby`, and `aria-describedby` from there. An `error` state sets `aria-invalid` and the
error border, and `warn` the warning border, through the same `input` class an
[`Input`](../Input/Input.svelte) wears.

```svelte
<DatePicker.Field>
	<DatePicker.Trigger />
</DatePicker.Field>
```
-->
<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';

	import { DatePicker } from 'bits-ui';

	import { FieldStates, type FieldState } from '../Field/state.ts';
	import { useField } from '../Field/useField.svelte.ts';
	import { useDatePicker } from './useDatePicker.svelte.ts';

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
	const picker = useDatePicker();
	const currentState = $derived(state ?? field?.state ?? FieldStates.None);
</script>

<DatePicker.Input
	id={id ?? field?.controlId}
	aria-labelledby={labelledBy ?? field?.labelledBy}
	aria-describedby={describedBy ?? field?.describedBy}
	aria-invalid={currentState === FieldStates.Error || undefined}
	data-field-state={currentState === FieldStates.None ? undefined : currentState}
	data-readonly={picker?.readonly ? '' : undefined}
	class={['inline-flex input items-center gap-1 focus-ring-within', extraClasses]}
	{...restProps}
>
	{#snippet children({ segments })}
		<span class="flex items-center">
			{#each segments as { part, value }, index (index)}
				<DatePicker.Segment
					{part}
					class={[
						'rounded-sm tabular-nums outline-none aria-[valuetext=Empty]:text-subtle-2',
						part !== 'literal' && 'px-0.5 focus:bg-medium'
					]}
				>
					{value}
				</DatePicker.Segment>
			{/each}
		</span>
		{@render trailing?.()}
	{/snippet}
</DatePicker.Input>
