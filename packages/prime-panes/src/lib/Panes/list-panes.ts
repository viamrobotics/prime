import type { LayoutNode, PaneNode, StackNode } from '../layout.ts';
import { childrenOf, isSlot, type Slot } from '../node-kind.ts';

export function listSlots<TData>(root: LayoutNode<TData> | undefined): Slot<TData>[] {
	if (!root) return [];
	if (isSlot(root)) return [root];
	return childrenOf(root).flatMap((child) => listSlots(child));
}

function isStackNode<TData>(slot: Slot<TData>): slot is StackNode<TData> {
	return slot.type === 'stack';
}

export function listStacks<TData>(root: LayoutNode<TData> | undefined): StackNode<TData>[] {
	return listSlots(root).filter(isStackNode);
}

export function listPanes<TData>(root: LayoutNode<TData> | undefined): PaneNode<TData>[] {
	if (!root) return [];
	if (root.type === 'pane') return [root];
	return childrenOf(root).flatMap((child) => listPanes(child));
}

export function findPane<TData>(
	root: LayoutNode<TData> | undefined,
	paneId: string
): PaneNode<TData> | undefined {
	return listPanes(root).find((pane) => pane.id === paneId);
}
