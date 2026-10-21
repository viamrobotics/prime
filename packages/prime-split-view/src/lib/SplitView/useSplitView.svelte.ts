import { getContext, setContext } from 'svelte';

import type { Snippet } from 'svelte';
import type { LayoutNode, PaneNode } from '../layout.ts';

export interface SplitViewContext<TData> {
	/** Prefixes every DOM id, so two views over the same data never share one. */
	idPrefix: string;
	/** Renders one pane's content. */
	pane: Snippet<[PaneNode<TData>]>;
	/**
	 * Applies `transform` to the current root and assigns the result to the bound layout.
	 *
	 * @returns `false` when the binding did not take the new value, such as a function binding
	 * whose setter rejects it, or when there is no layout. `true` when the layout changed or the
	 * transform returned the root as it was.
	 */
	update: (transform: (root: LayoutNode<TData>) => LayoutNode<TData> | undefined) => boolean;
}

const CONTEXT_KEY = Symbol('split-view');

export function provideSplitView<TData>(context: SplitViewContext<TData>): SplitViewContext<TData> {
	return setContext(CONTEXT_KEY, context);
}

/** Pane data is type-erased here: `SplitView` is the only provider and renders only its own `TData`. */
export function useSplitView(): SplitViewContext<unknown> {
	return getContext<SplitViewContext<unknown>>(CONTEXT_KEY);
}
