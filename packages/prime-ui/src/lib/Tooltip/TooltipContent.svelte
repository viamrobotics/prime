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
		placement?: 'top' | 'right' | 'bottom' | 'left';

		/** Gap in pixels between the trigger and the label. @default 4 */
		sideOffset?: number;

		/** Where the label renders: `true` at the end of `<body>`, `false` in place, or inside an element or the first match of a CSS selector. @default true */
		portal?: PortalTarget;
	}

	const uid = $props.id();

	const {
		id = `tooltip-${uid}`,
		class: extraClasses,
		children,
		portal,
		placement = 'top',
		sideOffset = 4,
		...restProps
	}: Props = $props();
</script>

<Tooltip.Portal {...portalProps(portal)}>
	<Tooltip.Content
		side={placement}
		{sideOffset}
		class={['z-tooltip max-w-xs bg-gray-9 px-2 py-1 text-xs text-white', extraClasses]}
		{...restProps}
	>
		<!-- bits-ui puts `id` on the positioning wrapper and reads the inner element's id for the trigger's aria-describedby. -->
		{#snippet child({ props, wrapperProps })}
			<div {...wrapperProps}>
				<div {...props} {id} role="tooltip">
					{@render children?.()}
				</div>
			</div>
		{/snippet}
	</Tooltip.Content>
</Tooltip.Portal>
