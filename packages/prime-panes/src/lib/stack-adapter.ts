import type { LayoutNode, PaneNode, StackNode } from './layout.ts';
import type { ContainerAdapter } from './node-kind.ts';

function isPaneNode<TData>(node: LayoutNode<TData>): node is PaneNode<TData> {
	return node.type === 'pane';
}

export const stackAdapter: ContainerAdapter<'stack'> = {
	children: (stack) => stack.panes,
	// `activeId` stays with its position, so a pane exchanged into the shown position becomes shown.
	withChildren<TData>(stack: StackNode<TData>, children: readonly LayoutNode<TData>[]) {
		if (children.every((child, index) => child === stack.panes[index])) return stack;
		if (!children.every(isPaneNode)) throw new Error('A stack holds only panes.');

		const activeIndex = stack.panes.findIndex((pane) => pane.id === stack.activeId);
		const activeId = children[activeIndex]?.id ?? stack.activeId;
		return { ...stack, panes: [...children], activeId };
	},
	// The pane after a leaving active pane becomes active, or the one before it when it was last.
	removeChild(stack, index) {
		const remaining = stack.panes.toSpliced(index, 1);
		const [onlyPane] = remaining;
		if (remaining.length === 1 && onlyPane) return onlyPane;

		const leaving = stack.panes[index]!;
		if (stack.activeId !== leaving.id) return { ...stack, panes: remaining };
		const neighbor = stack.panes[index + 1] ?? stack.panes[index - 1];
		return { ...stack, panes: remaining, activeId: neighbor!.id };
	}
};
