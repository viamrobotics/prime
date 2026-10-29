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

	// bits-ui puts the content id on its wrapper, but typeahead compares keydowns against the panel's id, so the panel takes the id and the wrapper gives it up.
	const contentId = $derived(id ?? `menu-${uid}`);
</script>

<DropdownMenu.Portal>
	<DropdownMenu.Content
		id={contentId}
		{side}
		{align}
		{sideOffset}
		{alignOffset}
		class={['z-menu min-w-40 rounded-sm border border-light bg-white p-1 shadow-sm', extraClasses]}
		{...restProps}
	>
		{#snippet child({ props, wrapperProps })}
			<div {...wrapperProps} id={undefined}>
				<div {...props} id={contentId}>
					{@render children?.()}
				</div>
			</div>
		{/snippet}
	</DropdownMenu.Content>
</DropdownMenu.Portal>
