<!--
@component
The button that opens the calendar of a [`DateRangePicker`](./DateRangePicker.svelte). Place it
inside [`DateRangePicker.Field`](./DateRangePickerField.svelte), after the segments. It shows a
calendar icon, and `children` replace the icon.

```svelte
<DateRangePicker.Field>
	<DateRangePicker.Trigger aria-label="Pick a reporting period" />
</DateRangePicker.Field>
```
-->
<script lang="ts">
	import type { HTMLButtonAttributes } from 'svelte/elements';

	import { mdiCalendar } from '@mdi/js';
	import { DateRangePicker } from 'bits-ui';

	import Icon from '../Icon/Icon.svelte';
	import { useDateRangePicker } from './useDateRangePicker.svelte.ts';

	interface Props extends HTMLButtonAttributes {
		/** Element id. `null` is not accepted. */
		id?: string;

		/**
		 * Disable the button. Defaults to on when the enclosing date range picker is `disabled`
		 * or `readonly`, so a read-only picker cannot open its calendar.
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

	const picker = useDateRangePicker();
</script>

<DateRangePicker.Trigger
	disabled={disabled ?? (picker?.disabled || picker?.readonly) ?? false}
	class={['input-button', extraClasses]}
	aria-label={label}
	{...restProps}
>
	{#if children}
		{@render children()}
	{:else}
		<Icon icon={mdiCalendar} size="base" />
	{/if}
</DateRangePicker.Trigger>
