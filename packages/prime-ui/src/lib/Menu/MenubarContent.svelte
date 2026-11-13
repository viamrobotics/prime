<!--
@component
The floating panel of a [`Menubar`](./Menubar.svelte), portaled to the body. It holds [`Menubar.Item`](./MenuItem.svelte) parts and the other menu parts.
Escape closes it and returns focus to the trigger. A press outside closes it and leaves focus on the control it pressed.
-->
<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';

	import { Menubar } from 'bits-ui';

	interface Props extends HTMLAttributes<HTMLDivElement> {
		/** Element id. `null` is not accepted. */
		id?: string;

		/** Text direction of the panel. `auto` is not accepted, because positioning needs a concrete direction. */
		dir?: 'ltr' | 'rtl';

		/** Which side of the trigger the panel opens on. @default 'bottom' */
		side?: 'top' | 'right' | 'bottom' | 'left';

		/** Alignment of the panel along the trigger's edge. @default 'start' */
		align?: 'start' | 'center' | 'end';

		/** Gap in pixels between the trigger and the panel. @default 4 */
		sideOffset?: number;

		/** Shift in pixels along the alignment axis. @default 0 */
		alignOffset?: number;
	}

	const uid = $props.id();

	const {
		id,
		class: extraClasses,
		children,
		side = 'bottom',
		align = 'start',
		sideOffset = 4,
		alignOffset = 0,
		...restProps
	}: Props = $props();

	const contentId = $derived(id ?? `menubar-menu-${uid}`);

	let triggerId: string | null = null;
	let wasPressedOutside = false;
	let focusedOutside: HTMLElement | null = null;

	const captureTrigger = (node: HTMLElement) => {
		triggerId = node.getAttribute('aria-labelledby');
		wasPressedOutside = false;
		focusedOutside = null;
	};

	// The panel's focus trap pulls focus back from a control a press focuses, so the control is remembered for the close.
	const trackFocusOutside = (node: HTMLElement) => {
		const rememberFocusedOutside = (event: FocusEvent) => {
			if (event.target instanceof HTMLElement && !node.contains(event.target)) {
				focusedOutside = event.target;
			}
		};
		document.addEventListener('focusin', rememberFocusedOutside, true);
		return () => document.removeEventListener('focusin', rememberFocusedOutside, true);
	};

	const isSwitchingMenus = (trigger: HTMLElement) =>
		[
			...(trigger.closest('[role="menubar"]')?.querySelectorAll('[aria-expanded="true"]') ?? [])
		].some((other) => other !== trigger);

	// A trigger that is not the bar's tab stop is not refocused on close, so focus would fall to the body.
	// A press outside keeps focus on the control it pressed, and a switch to a neighboring menu leaves focus where it went.
	const closeFocusTarget = (): HTMLElement | null => {
		const trigger = triggerId ? document.getElementById(triggerId) : null;
		if (trigger && isSwitchingMenus(trigger)) return null;
		if (wasPressedOutside) return focusedOutside?.isConnected ? focusedOutside : null;
		if (!trigger || trigger.getAttribute('aria-expanded') === 'true') return null;
		return trigger;
	};

	const restoreFocus = (event: Event) => {
		if (event.defaultPrevented) return;
		const target = closeFocusTarget();
		if (!target) return;
		event.preventDefault();
		target.focus();
	};
</script>

<Menubar.Portal>
	<Menubar.Content
		id={contentId}
		{side}
		{align}
		{sideOffset}
		{alignOffset}
		onInteractOutside={() => (wasPressedOutside = true)}
		onCloseAutoFocus={restoreFocus}
		{@attach captureTrigger}
		{@attach trackFocusOutside}
		class={['z-menu min-w-40 rounded-sm border border-light bg-white p-1 shadow-sm', extraClasses]}
		{...restProps}
	>
		{@render children?.()}
	</Menubar.Content>
</Menubar.Portal>
