<!--
@component
The floating panel of a [`Popover`](./Popover.svelte), portaled to the body. The panel is a dialog, so it requires a name: an `aria-label`, an `aria-labelledby`, or a `label` it applies as its `aria-label`. It closes on Escape and on a press
outside, and returns focus to the trigger. It never traps focus: Tab from its last control moves
to the control after the trigger, and Shift+Tab from its first control moves to the trigger.
-->
<script lang="ts">
	import type { HTMLAttributes, KeyboardEventHandler } from 'svelte/elements';

	import { Popover } from 'bits-ui';

	import type { AccessibleName } from '../accessible-name.ts';

	import { portalProps, type PortalTarget } from '../portal.ts';
	import { nextTabbableAfter, tabbablesIn } from './tab-order.ts';

	interface Props extends Omit<HTMLAttributes<HTMLDivElement>, 'aria-label' | 'aria-labelledby'> {
		/** Element id. `null` is not accepted. */
		id?: string;

		/** Text direction of the panel. `auto` is not accepted, because positioning needs a concrete direction. */
		dir?: 'ltr' | 'rtl';

		/** Which side of the trigger the panel opens on. @default 'bottom' */
		side?: 'top' | 'right' | 'bottom' | 'left';

		/** Alignment of the panel along the trigger's edge. @default 'center' */
		align?: 'start' | 'center' | 'end';

		/** Gap in pixels between the trigger and the panel. @default 4 */
		sideOffset?: number;

		/** Shift in pixels along the alignment axis. @default 0 */
		alignOffset?: number;

		/** Where the panel renders: `true` at the end of `<body>`, `false` in place, or inside an element or the first match of a CSS selector. @default true */
		portal?: PortalTarget;
	}

	// `side`, `align`, `sideOffset`, and `alignOffset` are bits-ui's anchor-placement names, shared with Floating UI. No native name exists to prefer.
	const {
		label,
		'aria-label': ariaLabel,
		class: extraClasses,
		children,
		portal,
		side = 'bottom',
		align = 'center',
		sideOffset = 4,
		alignOffset = 0,
		onkeydown,
		...restProps
	}: Props & AccessibleName = $props();

	const triggerOf = (panel: HTMLElement) =>
		panel.ownerDocument.querySelector<HTMLElement>(`[aria-controls="${CSS.escape(panel.id)}"]`);

	// The panel is portaled to the end of the body, so without this Tab would leave the page from it.
	const leavePanel: KeyboardEventHandler<HTMLDivElement> = (event) => {
		onkeydown?.(event);
		if (event.defaultPrevented || event.key !== 'Tab') return;

		const panel = event.currentTarget;
		const trigger = triggerOf(panel);
		if (!trigger) return;

		const tabbables = tabbablesIn(panel);
		const active = panel.ownerDocument.activeElement;
		const edge = (event.shiftKey ? tabbables[0] : tabbables.at(-1)) ?? panel;
		if (active !== edge && !(event.shiftKey && active === panel)) return;

		const destination = event.shiftKey ? trigger : nextTabbableAfter(trigger, panel);
		if (!destination) return;
		event.preventDefault();
		destination.focus();
	};
</script>

<Popover.Portal {...portalProps(portal)}>
	<Popover.Content
		{side}
		{align}
		{sideOffset}
		{alignOffset}
		trapFocus={false}
		role="dialog"
		aria-label={label ?? ariaLabel}
		class={['z-popover popover-panel p-4', extraClasses]}
		{...restProps}
		onkeydown={leavePanel}
	>
		{@render children?.()}
	</Popover.Content>
</Popover.Portal>
