import type { DropRegion } from '../drop-region.ts';
import type { LayoutNode, PaneNode, StackNode } from '../layout.ts';
import { findNode } from '../tree.ts';

import { listPanes, listSlots, listStacks } from './list-panes.ts';
import { shownPaneId } from './shown-pane.ts';
import type { DragSource, DropTarget } from './usePanes.svelte.ts';

const MIN_PANES_TO_MOVE = 2;

// A pane dragged over a slot it is alone in reads as center. Over its own stack it places beside the rest of the stack, through a stack-mate.
export function resolveDropTarget(
	source: DragSource,
	node: PaneNode<unknown>,
	stack: StackNode<unknown> | undefined,
	region: DropRegion,
	index: number | undefined
): DropTarget | undefined {
	switch (source.type) {
		case 'stack':
			return stack?.id === source.id ? undefined : { targetId: node.id, region, index };
		case 'pane':
			return resolvePaneDrop(source, node, stack, region, index);
		case 'float':
			return undefined;
		default:
			return source satisfies never;
	}
}

function resolvePaneDrop(
	source: DragSource,
	node: PaneNode<unknown>,
	stack: StackNode<unknown> | undefined,
	region: DropRegion,
	index: number | undefined
): DropTarget | undefined {
	const isSourcePane = (pane: PaneNode<unknown>) => pane.id === source.id;
	if (stack?.panes.some(isSourcePane)) {
		if (region === 'center') return undefined;
		if (region === 'stack') return { targetId: source.id, region, index };

		const stackMate = stack.panes.find((pane) => !isSourcePane(pane))!;
		return { targetId: stackMate.id, region };
	}

	if (node.id === source.id) return { targetId: node.id, region: 'center' };
	return { targetId: node.id, region, index };
}

export function hasDestination<TData>(
	root: LayoutNode<TData> | undefined,
	source: DragSource
): boolean {
	switch (source.type) {
		case 'pane':
			return listPanes(root).length >= MIN_PANES_TO_MOVE;
		case 'stack':
			return listSlots(root).some((slot) => slot.id !== source.id);
		case 'float':
			return false;
		default:
			return source satisfies never;
	}
}

export function paneIdToSkip<TData>(
	root: LayoutNode<TData> | undefined,
	source: DragSource | undefined
): string | undefined {
	if (source === undefined) return undefined;

	const stacks = listStacks(root);
	switch (source.type) {
		case 'stack': {
			const movingStack = stacks.find((stack) => stack.id === source.id);
			return movingStack && shownPaneId(movingStack);
		}
		case 'pane': {
			const isStacked = stacks.some((stack) => stack.panes.some((pane) => pane.id === source.id));
			// The own slot of a stacked moving pane is a destination, so arrows may land on it.
			return isStacked ? undefined : source.id;
		}
		case 'float':
			return undefined;
		default:
			return source satisfies never;
	}
}

/** Whether the pane or stack `nodeId` sits inside a float entry, at any depth. */
export function isInWindow<TData>(root: LayoutNode<TData> | undefined, nodeId: string): boolean {
	if (!root) return false;

	switch (root.type) {
		case 'pane':
		case 'stack':
			return false;
		case 'split':
			return isInWindow(root.first, nodeId) || isInWindow(root.second, nodeId);
		case 'float':
			return (
				isInWindow(root.base, nodeId) ||
				root.floats.some((entry) => findNode(entry.content, nodeId) !== undefined)
			);
		default:
			return root satisfies never;
	}
}
