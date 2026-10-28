import type { StackNode } from '../layout.ts';

// Falls back to the first pane when `activeId` names none, so a stale layout still renders and selecting a tab repairs it.
export function shownPaneId<TData>(stack: StackNode<TData>): string | undefined {
	const isActiveIdValid = stack.panes.some((pane) => pane.id === stack.activeId);
	return isActiveIdValid ? stack.activeId : stack.panes[0]?.id;
}
