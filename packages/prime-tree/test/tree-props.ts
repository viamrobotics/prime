import { createRawSnippet } from 'svelte';

import type { TreeNodeState } from '../src/lib/Tree/tree-node-state.ts';

export const bareTreeProps = {
	nodes: [] as unknown[],
	node: createRawSnippet<[unknown, TreeNodeState]>(() => ({ render: () => '<span></span>' })),
	getValue: String,
	getLabel: String,
	getChildren: () => undefined
};
