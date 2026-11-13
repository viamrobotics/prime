<!--
@component
The floating panel of a [`Menu`](./Menu.svelte), portaled to the body. It holds [`Menu.Item`](./MenuItem.svelte) parts and the other menu parts.
It closes on Escape and on a press outside, and returns focus to the trigger.
-->
<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';

	import { DropdownMenu } from 'bits-ui';

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

	const contentId = $derived(id ?? `menu-${uid}`);

	let pressedTrigger: HTMLElement | null = null;

	// The trigger names the panel in aria-controls only while the menu is open, so it is looked up at the press.
	const captureTrigger = () => {
		pressedTrigger = document.querySelector(`[aria-controls="${CSS.escape(contentId)}"]`);
	};

	// bits-ui skips the trigger after any outside press, and the modal layer swallows that press, so focus would stay on the body.
	const restoreFocus = (event: Event) => {
		const trigger = pressedTrigger;
		pressedTrigger = null;
		if (event.defaultPrevented || !trigger || document.activeElement !== document.body) return;
		event.preventDefault();
		trigger.focus();
	};
</script>

<DropdownMenu.Portal>
	<DropdownMenu.Content
		id={contentId}
		{side}
		{align}
		{sideOffset}
		{alignOffset}
		onInteractOutside={captureTrigger}
		onCloseAutoFocus={restoreFocus}
		class={['z-menu min-w-40 rounded-sm border border-light bg-white p-1 shadow-sm', extraClasses]}
		{...restProps}
	>
		{@render children?.()}
	</DropdownMenu.Content>
</DropdownMenu.Portal>
