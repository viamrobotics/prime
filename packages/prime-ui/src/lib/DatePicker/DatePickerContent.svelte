<!--
@component
The floating panel of a [`DatePicker`](./DatePicker.svelte), portaled to the body. Render a
[`DatePicker.Calendar`](./DatePickerCalendar.svelte) inside it.
-->
<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';

	import { DatePicker } from 'bits-ui';

	interface Props extends HTMLAttributes<HTMLDivElement> {
		/** Element id. `null` is not accepted. */
		id?: string;

		/** Text direction of the panel. `auto` is not accepted, because positioning needs a concrete direction. */
		dir?: 'ltr' | 'rtl';

		/** Which side of the trigger the panel opens on. @default 'bottom' */
		side?: 'top' | 'right' | 'bottom' | 'left';

		/** Alignment of the panel along the trigger's edge. @default 'end' */
		align?: 'start' | 'center' | 'end';

		/** Gap in pixels between the trigger and the panel. @default 4 */
		sideOffset?: number;

		/** Shift in pixels along the alignment axis. @default 0 */
		alignOffset?: number;
	}

	// `side`, `align`, `sideOffset`, and `alignOffset` keep Floating UI's placement terms.
	const {
		class: extraClasses,
		children,
		side = 'bottom',
		align = 'end',
		sideOffset = 4,
		alignOffset = 0,
		'aria-label': label,
		'aria-labelledby': labelledBy,
		...restProps
	}: Props = $props();

	const accessibleName = $derived(label ?? (labelledBy ? undefined : 'Choose a date'));

	// bits-ui focuses the day with a bare `focus()` before the panel is positioned, which scrolls the page.
	const focusDayWithoutScrolling = (event: Event) => {
		const focusedDay = document.querySelector<HTMLElement>('[data-bits-day][data-focused]');
		if (!focusedDay) return;

		event.preventDefault();
		focusedDay.focus({ preventScroll: true });
	};
</script>

<DatePicker.Portal>
	<DatePicker.Content
		{side}
		{align}
		{sideOffset}
		{alignOffset}
		role="dialog"
		aria-label={accessibleName}
		aria-labelledby={labelledBy}
		onOpenAutoFocus={focusDayWithoutScrolling}
		class={['z-popover rounded-sm border border-light bg-white p-3 shadow-md', extraClasses]}
		{...restProps}
	>
		{@render children?.()}
	</DatePicker.Content>
</DatePicker.Portal>
