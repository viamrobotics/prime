import type { LayoutNode, PaneNode } from '../layout.ts';

export function listPanes<TData>(root: LayoutNode<TData> | undefined): PaneNode<TData>[] {
	if (!root) return [];
	if (root.type === 'pane') return [root];
	return [...listPanes(root.first), ...listPanes(root.second)];
}

export function findPane<TData>(
	root: LayoutNode<TData> | undefined,
	paneId: string
): PaneNode<TData> | undefined {
	return listPanes(root).find((pane) => pane.id === paneId);
}
