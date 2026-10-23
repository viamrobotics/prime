<script lang="ts" generics="TData">
	import * as splitter from '@zag-js/splitter';
	import { normalizeProps, useMachine } from '@zag-js/svelte';

	import type { SplitDirection, SplitKey, SplitNode } from '../layout.ts';
	import { setSplitRatio } from '../tree.ts';

	import SplitViewNode from './SplitViewNode.svelte';
	import { useSplitView } from './useSplitView.svelte.ts';

	interface Props {
		node: SplitNode<TData>;
	}

	type Orientation = 'horizontal' | 'vertical';

	const PANEL_MIN_SIZE = '2.5rem';
	const RESIZE_HANDLE_LABEL = 'Resize panes';
	const FIRST = 'first' satisfies SplitKey;
	const SECOND = 'second' satisfies SplitKey;
	const RESIZE_TRIGGER_ID = `${FIRST}:${SECOND}` as const;
	const MIN_RATIO_CHANGE = 0.0001;

	const ORIENTATION_BY_DIRECTION: Record<SplitDirection, Orientation> = {
		row: 'horizontal',
		column: 'vertical'
	};

	const TRIGGER_CLASSES_BY_ORIENTATION: Record<Orientation, string> = {
		horizontal: '-mx-1 w-2 after:inset-y-0 after:left-1/2 after:w-0.5 after:-translate-x-1/2',
		vertical: '-my-1 h-2 after:inset-x-0 after:top-1/2 after:h-0.5 after:-translate-y-1/2'
	};

	const { node }: Props = $props();

	const context = useSplitView();

	const orientation = $derived(ORIENTATION_BY_DIRECTION[node.direction]);
	const sizes = $derived([node.ratio * 100, (1 - node.ratio) * 100]);

	const service = useMachine(splitter.machine, () => ({
		id: `${context.idPrefix}-${node.id}`,
		orientation,
		panels: [
			{ id: FIRST, minSize: PANEL_MIN_SIZE },
			{ id: SECOND, minSize: PANEL_MIN_SIZE }
		],
		// A controlled `size` would stop the panels following the pointer mid-drag, and `defaultSize` still re-syncs them when it changes.
		defaultSize: sizes,
		onResizeEnd() {
			// The details zag passes can hold sizes from an earlier resize, such as after a layout change from outside.
			const [firstSize] = api.getSizes();
			const next = firstSize / 100;
			if (Math.abs(next - node.ratio) < MIN_RATIO_CHANGE) {
				return;
			}
			const accepted = context.update((root) => setSplitRatio(root, node.id, next));
			if (!accepted) {
				api.setSizes(sizes);
			}
		}
	}));
	const api = $derived(splitter.connect(service, normalizeProps));

	// The trigger separates the panes, so its own orientation runs across the split's.
	const separatorOrientation = $derived(orientation === 'horizontal' ? 'vertical' : 'horizontal');
</script>

<div {...api.getRootProps()}>
	<div {...api.getPanelProps({ id: FIRST })}>
		<SplitViewNode node={node.first} />
	</div>
	<div
		{...api.getResizeTriggerProps({ id: RESIZE_TRIGGER_ID })}
		aria-label={RESIZE_HANDLE_LABEL}
		aria-orientation={separatorOrientation}
		inert={context.movingId !== undefined}
		class={[
			'relative z-10 outline-info-dark after:absolute after:bg-gray-6 after:opacity-0 hover:after:opacity-100 focus-visible:outline-2 focus-visible:outline-solid data-dragging:after:opacity-100',
			TRIGGER_CLASSES_BY_ORIENTATION[orientation]
		]}
	></div>
	<div {...api.getPanelProps({ id: SECOND })}>
		<SplitViewNode node={node.second} />
	</div>
</div>
