<script lang="ts" generics="TData">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';
	import type { LayoutNode, PaneNode } from '../layout.ts';

	import SplitViewNode from './SplitViewNode.svelte';
	import { provideSplitView } from './useSplitView.svelte.ts';

	interface Props extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
		/** The layout tree. Bind it to receive resizes. `undefined` renders `empty`. */
		layout?: LayoutNode<TData> | undefined;
		/** Renders one pane's content. */
		pane: Snippet<[PaneNode<TData>]>;
		/** Renders when `layout` is `undefined`. */
		empty?: Snippet;
	}

	let { layout = $bindable(), pane, empty, class: className, ...rest }: Props = $props();

	const idPrefix = $props.id();

	provideSplitView<TData>({
		idPrefix,
		get pane() {
			return pane;
		},
		update(transform) {
			const before = layout;
			if (!before) {
				return false;
			}
			const after = transform(before);
			if (after === before) {
				return true;
			}
			layout = after;
			// A deep $state parent stores a proxy of `after`, so only a change from `before` shows acceptance.
			return layout !== before;
		}
	});
</script>

<div {...rest} class={['size-full', className]}>
	{#if layout}
		<SplitViewNode node={layout} />
	{:else}
		{@render empty?.()}
	{/if}
</div>
