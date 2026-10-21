import type { LayoutNode, SplitKey, SplitNode } from './layout.ts';

interface PathStep<TData> {
	split: SplitNode<TData>;
	key: SplitKey;
}

interface FoundNode<TData> {
	node: LayoutNode<TData>;
	/** The splits from the root down to the parent of `node`, each with the slot the path takes. */
	path: PathStep<TData>[];
}

const SPLIT_KEYS: SplitKey[] = ['first', 'second'];

/** Finds the node with `id`, split or pane, depth first. */
function findNode<TData>(root: LayoutNode<TData>, id: string): FoundNode<TData> | undefined {
	if (root.id === id) {
		return { node: root, path: [] };
	}
	if (root.type === 'pane') {
		return undefined;
	}
	for (const key of SPLIT_KEYS) {
		const found = findNode(root[key], id);
		if (found) {
			return { node: found.node, path: [{ split: root, key }, ...found.path] };
		}
	}
	return undefined;
}

/** Copies a split, applying `changes` to the copy. */
function copySplit<TData>(
	split: SplitNode<TData>,
	changes: Partial<SplitNode<TData>>
): SplitNode<TData> {
	return { ...split, ...changes };
}

/**
 * Returns a new root with the node at `path` replaced by `replacement`. Only the splits on the
 * path are copied, so every subtree off the path keeps its reference.
 */
function replaceAtPath<TData>(
	path: PathStep<TData>[],
	replacement: LayoutNode<TData>
): LayoutNode<TData> {
	return path.reduceRight<LayoutNode<TData>>(
		(child, { split, key }) => copySplit(split, { [key]: child }),
		replacement
	);
}

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
	if (!root) {
		return undefined;
	}
	const found = findNode(root, splitId);
	if (!found || found.node.type !== 'split') {
		return root;
	}
	if (found.node.ratio === ratio) {
		return root;
	}
	return replaceAtPath(found.path, copySplit(found.node, { ratio }));
}
