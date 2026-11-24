<!--
@component
The label of a [`Tooltip`](./Tooltip.svelte). It renders in a portal, positioned beside the
trigger, and flips to the opposite side when there is no room.
-->
<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';

	import { Tooltip } from 'bits-ui';

	import { portalProps, type PortalTarget } from '../portal.ts';

	interface Props extends HTMLAttributes<HTMLDivElement> {
		/** Element id. `null` is not accepted. */
		id?: string;

		/** Text direction of the label. `auto` is not accepted, because positioning needs a concrete direction. */
		dir?: 'ltr' | 'rtl';

		/** Which side of the trigger the label appears on. @default 'top' */
		side?: 'top' | 'right' | 'bottom' | 'left';

		/** Gap in pixels between the trigger and the label. @default 4 */
		sideOffset?: number;

		/** Where the label renders: `true` at the end of `<body>`, `false` in place, or inside an element or the first match of a CSS selector. @default true */
		portal?: PortalTarget;
	}

	const uid = $props.id();

	// `side` and `sideOffset` are bits-ui's anchor-placement names, shared with Floating UI. No native name exists to prefer.
	const {
		id = `tooltip-${uid}`,
		class: extraClasses,
		children,
		portal,
		side = 'top',
		sideOffset = 4,
		...restProps
	}: Props = $props();
</script>

<Tooltip.Portal {...portalProps(portal)}>
	<Tooltip.Content
		{id}
		role="tooltip"
		{side}
		{sideOffset}
		class={['z-tooltip max-w-xs bg-gray-9 px-2 py-1 text-xs text-white', extraClasses]}
		{...restProps}
	>
		{@render children?.()}
	</Tooltip.Content>
</Tooltip.Portal>
