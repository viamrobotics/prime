<!--
@component
The floating panel of a [`DatePicker`](./DatePicker.svelte), portaled to the body unless
`portal` says otherwise. Render a [`DatePicker.Calendar`](./DatePickerCalendar.svelte) inside it.

The panel takes its accessible name from the calendar's `aria-label`, "Choose a date" by default.
Its own `aria-label` or `aria-labelledby` replaces that.
-->
<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';

	import { DatePicker, Portal } from 'bits-ui';

	import { portalProps, type PortalTarget } from '../portal.ts';
	import { focusDayWithoutScrolling } from './focus-day-without-scrolling.ts';
	import { useDatePicker } from './useDatePicker.svelte.ts';

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

		/** Where the panel renders: `true` at the end of `<body>`, `false` in place, or inside an element or the first match of a CSS selector. @default true */
		portal?: PortalTarget;
	}

	// `side`, `align`, `sideOffset`, and `alignOffset` keep bits-ui's names, the anchor-placement vocabulary it shares with Floating UI, since no native name exists for anchor placement.
	const {
		class: extraClasses,
		children,
		portal,
		side = 'bottom',
		align = 'end',
		sideOffset = 4,
		alignOffset = 0,
		'aria-label': label,
		'aria-labelledby': labelledBy,
		...restProps
	}: Props = $props();

	const picker = useDatePicker();

	const accessibleName = $derived(label ?? (labelledBy ? undefined : picker?.calendarName));
</script>

<Portal {...portalProps(portal)}>
	<DatePicker.Content
		{side}
		{align}
		{sideOffset}
		{alignOffset}
		role="dialog"
		onOpenAutoFocus={focusDayWithoutScrolling}
		aria-label={accessibleName}
		aria-labelledby={labelledBy}
		class={['z-popover popover-panel p-3', extraClasses]}
		{...restProps}
	>
		{@render children?.()}
	</DatePicker.Content>
</Portal>
