<!--
@component
The floating panel of a [`DateRangePicker`](./DateRangePicker.svelte), portaled to the body
unless `portal` says otherwise. Render a
[`DateRangePicker.Calendar`](./DateRangePickerCalendar.svelte) inside it.
-->
<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';

	import { DateRangePicker, Portal } from 'bits-ui';

	import { focusDayWithoutScrolling } from '../DatePicker/focus-day-without-scrolling.ts';
	import { portalProps, type PortalTarget } from '../portal.ts';

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

	// `side`, `align`, `sideOffset`, and `alignOffset` keep Floating UI's placement terms.
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

	const accessibleName = $derived(label ?? (labelledBy ? undefined : 'Choose a date range'));
</script>

<Portal {...portalProps(portal)}>
	<DateRangePicker.Content
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
	</DateRangePicker.Content>
</Portal>
