<!--
@component
The floating panel of a [`Popover`](./Popover.svelte), portaled to the body. The panel is a dialog, so give it `aria-label` or `aria-labelledby`. It closes on Escape and on a press
outside, and returns focus to the trigger.
-->
<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';

	import { Popover } from 'bits-ui';

	interface Props extends HTMLAttributes<HTMLDivElement> {
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
	}

	const {
		class: extraClasses,
		children,
		side = 'bottom',
		align = 'center',
		sideOffset = 4,
		alignOffset = 0,
		...restProps
	}: Props = $props();
</script>

<Popover.Portal>
	<Popover.Content
		{side}
		{align}
		{sideOffset}
		{alignOffset}
		role="dialog"
		class={['z-popover rounded-sm border border-light bg-white p-4 shadow-sm', extraClasses]}
		{...restProps}
	>
		{@render children?.()}
	</Popover.Content>
</Popover.Portal>
