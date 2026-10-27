<script lang="ts" generics="TData">
	import type { Component } from 'svelte';

	import type { LayoutNode } from '../layout.ts';

	import PaneFrame from './PaneFrame.svelte';
	import SplitPanes from '../SplitPanes/SplitPanes.svelte';
	import PaneStack from './PaneStack.svelte';

	interface Props {
		node: LayoutNode<TData>;
	}

	type NodeRenderer = Component<{ node: LayoutNode<TData> }>;

	const { node }: Props = $props();

	const Renderer = $derived.by((): NodeRenderer => {
		// Svelte cannot correlate each component with its narrowed node, so the cast widens the prop.
		switch (node.type) {
			case 'split':
				return SplitPanes as NodeRenderer;
			case 'stack':
				return PaneStack as NodeRenderer;
			case 'pane':
				return PaneFrame as NodeRenderer;
			default:
				return node satisfies never;
		}
	});
</script>

{#key node.id}<Renderer {node} />{/key}
