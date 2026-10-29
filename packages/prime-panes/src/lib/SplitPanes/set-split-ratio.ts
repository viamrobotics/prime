import type { LayoutNode } from '../layout.ts';
import { findNode, replaceAtPath } from '../tree.ts';

/**
 * Sets the `ratio` of the split whose id is `splitId`. Never mutates `root`.
 *
 * @returns A new root that differs only along the path to the split. The same `root` reference
 * when `splitId` names no split or the value is already `ratio`. `undefined` when `root` is.
 */
export function setSplitRatio<TData>(
	root: LayoutNode<TData> | undefined,
	splitId: string,
	ratio: number
): LayoutNode<TData> | undefined {
	if (!root) return undefined;

	const found = findNode(root, splitId);
	if (!found || found.node.type !== 'split') return root;
	if (found.node.ratio === ratio) return root;
	return replaceAtPath(found.path, { ...found.node, ratio });
}
