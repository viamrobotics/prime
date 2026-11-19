<!--
@component
The floating panel of a [`Combobox`](./Combobox.svelte), portaled to the body. Render a
[`Combobox.Viewport`](./ComboboxViewport.svelte) inside it. It lines up with the
[`Input.Group`](../Input/InputGroup.svelte) around the
[`Combobox.Input`](./ComboboxInput.svelte), or with the input itself when it stands alone.
-->
<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';

	import { Combobox } from 'bits-ui';

	import { portalProps, type PortalTarget } from '../portal.ts';
	import { useCombobox } from './useCombobox.svelte.ts';

	interface Props extends HTMLAttributes<HTMLDivElement> {
		/** Element id. `null` is not accepted. */
		id?: string;

		/** Text direction of the panel. `auto` is not accepted, because positioning needs a concrete direction. */
		dir?: 'ltr' | 'rtl';

		/** Which side of the input's frame the panel opens on. @default 'bottom' */
		side?: 'top' | 'right' | 'bottom' | 'left';

		/** Alignment of the panel along the frame's edge. @default 'start' */
		align?: 'start' | 'center' | 'end';

		/** Gap in pixels between the frame and the panel. @default 4 */
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
		align = 'start',
		sideOffset = 4,
		alignOffset = 0,
		...restProps
	}: Props = $props();

	const combobox = useCombobox();

	// Inside an `Input.Group` the visible frame is the group, so the panel lines up with it.
	const anchor = $derived.by(() => {
		const frame = combobox?.input?.parentElement;
		return frame?.classList.contains('input') ? frame : (combobox?.input ?? null);
	});
</script>

<Combobox.Portal {...portalProps(portal)}>
	<Combobox.Content
		{side}
		{align}
		{sideOffset}
		{alignOffset}
		customAnchor={anchor}
		class={[
			'z-popover max-h-(--bits-combobox-content-available-height) w-(--bits-combobox-anchor-width) min-w-(--bits-combobox-anchor-width) overflow-hidden popover-panel',
			extraClasses
		]}
		{...restProps}
	>
		{@render children?.()}
	</Combobox.Content>
</Combobox.Portal>
