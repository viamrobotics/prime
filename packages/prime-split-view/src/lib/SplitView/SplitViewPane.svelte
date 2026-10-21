<script lang="ts" generics="TData">
	import type { PaneNode } from '../layout.ts';

	import { useSplitView } from './useSplitView.svelte.ts';

	interface Props {
		node: PaneNode<TData>;
	}

	const { node }: Props = $props();

	const context = useSplitView();
</script>

<div class="relative size-full min-h-0 min-w-0">
	{@render context.pane(node)}
</div>
