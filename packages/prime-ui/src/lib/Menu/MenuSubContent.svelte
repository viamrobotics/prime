<!--
@component
The floating panel of a [`Menu.Sub`](./MenuSub.svelte). It opens beside its [`Menu.SubTrigger`](./MenuSubTrigger.svelte), closes on ArrowLeft, and returns focus to the trigger.
-->
<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';

	import { DropdownMenu } from 'bits-ui';

	interface Props extends HTMLAttributes<HTMLDivElement> {
		/** Element id. `null` is not accepted. */
		id?: string;

		/** Text direction of the panel. `auto` is not accepted, because positioning needs a concrete direction. */
		dir?: 'ltr' | 'rtl';

		/** Gap in pixels between the trigger and the panel. @default 4 */
		sideOffset?: number;

		/** Shift in pixels along the trigger's edge, so the first item lines up with the trigger. @default -4 */
		alignOffset?: number;
	}

	const uid = $props.id();

	const {
		id,
		class: extraClasses,
		children,
		sideOffset = 4,
		alignOffset = -4,
		...restProps
	}: Props = $props();

	const contentId = $derived(id ?? `menu-sub-${uid}`);
</script>

<DropdownMenu.SubContent
	id={contentId}
	{sideOffset}
	{alignOffset}
	class={['z-menu min-w-40 rounded-sm border border-light bg-white p-1 shadow-sm', extraClasses]}
	{...restProps}
>
	{@render children?.()}
</DropdownMenu.SubContent>
