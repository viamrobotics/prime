<!--
@component
The floating panel of a [`Select`](./Select.svelte).

Render it inside a [`Select.Portal`](./SelectPortal.svelte), with a
[`Select.Viewport`](./SelectViewport.svelte) inside it.
-->
<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';

	import { Select } from 'bits-ui';

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

	// `side`, `align`, `sideOffset`, and `alignOffset` keep Floating UI's placement terms.
	const {
		class: extraClasses,
		children,
		side = 'bottom',
		align = 'start',
		sideOffset = 4,
		alignOffset = 0,
		...restProps
	}: Props = $props();
</script>

<Select.Content
	{side}
	{align}
	{sideOffset}
	{alignOffset}
	class={[
		'z-50 max-h-(--bits-select-content-available-height) w-(--bits-select-anchor-width) min-w-(--bits-select-anchor-width) overflow-hidden rounded-sm border border-light bg-white shadow-md',
		extraClasses
	]}
	{...restProps}
>
	{@render children?.()}
</Select.Content>
