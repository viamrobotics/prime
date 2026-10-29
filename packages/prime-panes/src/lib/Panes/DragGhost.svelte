<script lang="ts" generics="TData">
	import type { Snippet } from 'svelte';

	import type { DragPreview } from './drag-preview.ts';
	import type { DragPoint } from './usePanes.svelte.ts';

	interface Props {
		point: DragPoint;
		preview: DragPreview<TData>;
		dragPreview?: Snippet<[DragPreview<TData>]>;
	}

	const GHOST_OFFSET_PX = 12;

	const showInTopLayer = (node: HTMLElement) => {
		node.showPopover();
	};

	const { point, preview, dragPreview }: Props = $props();
</script>

<!-- The UA popover styles (centering margin, inset, border, padding, CanvasText color) are reset so only the translate positions it. -->
<div
	{@attach showInTopLayer}
	popover="manual"
	data-drag-ghost
	data-form={preview.form}
	aria-hidden="true"
	inert
	class="pointer-events-none fixed inset-auto top-0 left-0 m-0 h-auto w-auto overflow-visible border-0 bg-transparent p-0 text-inherit"
	style:translate="{point.clientX + GHOST_OFFSET_PX}px {point.clientY + GHOST_OFFSET_PX}px"
>
	{#if dragPreview}
		{@render dragPreview(preview)}
	{:else if preview.form === 'tab'}
		<div
			class="w-max rounded border border-medium bg-white px-2 py-1 text-xs text-default shadow-sm"
		>
			{preview.label}
		</div>
	{:else}
		<div
			class="flex h-28 w-48 flex-col overflow-hidden rounded border border-medium bg-white text-xs text-default shadow-sm"
		>
			<div class="truncate border-b border-medium bg-light px-2 py-1">{preview.label}</div>
		</div>
	{/if}
</div>
