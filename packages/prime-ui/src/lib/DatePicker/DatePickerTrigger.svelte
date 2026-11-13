<!--
@component
The button that opens the calendar of a [`DatePicker`](./DatePicker.svelte). Place it inside
[`DatePicker.Field`](./DatePickerField.svelte), after the segments. It shows a calendar icon,
and `children` replace the icon.

```svelte
<DatePicker.Field>
	<DatePicker.Trigger aria-label="Pick a start date" />
</DatePicker.Field>
```
-->
<script lang="ts">
	import type { HTMLButtonAttributes } from 'svelte/elements';

	import { mdiCalendar } from '@mdi/js';
	import { DatePicker } from 'bits-ui';

	import Icon from '../Icon/Icon.svelte';
	import { useDatePicker } from './useDatePicker.svelte.ts';

	interface Props extends HTMLButtonAttributes {
		/** Element id. `null` is not accepted. */
		id?: string;

		/**
		 * Disable the button. Defaults to on when the enclosing date picker is `disabled` or
		 * `readonly`, so a read-only picker cannot open its calendar.
		 */
		disabled?: boolean;
	}

	const {
		class: extraClasses,
		children,
		disabled,
		'aria-label': label = 'Open calendar',
		...restProps
	}: Props = $props();

	const picker = useDatePicker();
</script>

<DatePicker.Trigger
	disabled={disabled ?? (picker?.disabled || picker?.readonly) ?? false}
	class={[
		'inline-flex size-6 shrink-0 cursor-pointer items-center justify-center rounded-sm text-subtle-2 focus-ring transition-colors hover:text-default disabled:cursor-not-allowed disabled:text-disabled-dark',
		extraClasses
	]}
	aria-label={label}
	{...restProps}
>
	{#if children}
		{@render children()}
	{:else}
		<Icon icon={mdiCalendar} size="base" />
	{/if}
</DatePicker.Trigger>
