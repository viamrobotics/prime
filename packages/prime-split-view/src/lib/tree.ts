import type { LayoutNode, PaneNode, SplitDirection, SplitKey, SplitNode } from './layout.ts';

interface PathStep<TData> {
	split: SplitNode<TData>;
	key: SplitKey;
}

interface FoundNode<TData> {
	node: LayoutNode<TData>;
	path: PathStep<TData>[];
}

const SPLIT_KEYS: SplitKey[] = ['first', 'second'];
const NEW_SPLIT_RATIO = 0.5;

function findNode<TData>(root: LayoutNode<TData>, id: string): FoundNode<TData> | undefined {
	if (root.id === id) return { node: root, path: [] };
	if (root.type === 'pane') return undefined;
	for (const key of SPLIT_KEYS) {
		const found = findNode(root[key], id);
		if (found) {
			return { node: found.node, path: [{ split: root, key }, ...found.path] };
		}
	}

	return undefined;
}

function copySplit<TData>(
	split: SplitNode<TData>,
	changes: Partial<SplitNode<TData>>
): SplitNode<TData> {
	return { ...split, ...changes };
}

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
	if (!root) return undefined;

	const found = findNode(root, splitId);
	if (!found || found.node.type !== 'split') return root;
	if (found.node.ratio === ratio) return root;
	return replaceAtPath(found.path, copySplit(found.node, { ratio }));
}

/**
 * Removes the node with `id`. The removed node's sibling takes its parent split's place.
 *
 * @returns The new root. The same `root` reference when `id` names no node. `undefined` when `id`
 * is the root, since nothing remains.
 */
function detach<TData>(root: LayoutNode<TData>, id: string): LayoutNode<TData> | undefined {
	const found = findNode(root, id);
	if (!found) return root;

	const parentStep = found.path.at(-1);
	if (!parentStep) return undefined;

	const siblingKey: SplitKey = parentStep.key === 'first' ? 'second' : 'first';
	return replaceAtPath(found.path.slice(0, -1), parentStep.split[siblingKey]);
}

/**
 * Replaces the node `targetId` with a new split holding `node` in slot `key` and the target in the
 * other slot.
 *
 * @returns The new root. The same `root` reference when `targetId` names no node.
 */
function insertBeside<TData>(
	root: LayoutNode<TData>,
	targetId: string,
	node: LayoutNode<TData>,
	direction: SplitDirection,
	key: SplitKey,
	newSplitId: string
): LayoutNode<TData> {
	const found = findNode(root, targetId);
	if (!found) return root;

	const [first, second] = key === 'first' ? [node, found.node] : [found.node, node];
	return replaceAtPath(found.path, {
		type: 'split',
		id: newSplitId,
		direction,
		ratio: NEW_SPLIT_RATIO,
		first,
		second
	});
}

/**
 * Exchanges the positions of two panes. Never mutates `root`. Each split keeps its `ratio`, so
 * sizes stay with the positions rather than following the panes.
 *
 * @returns A new root with the two pane nodes exchanged. The same `root` reference when the ids
 * are equal or either one names no pane. `undefined` when `root` is.
 */
export function swapPanes<TData>(
	root: LayoutNode<TData> | undefined,
	firstId: string,
	secondId: string
): LayoutNode<TData> | undefined {
	if (!root || firstId === secondId) return root;

	const first = findNode(root, firstId)?.node;
	const second = findNode(root, secondId)?.node;
	if (first?.type !== 'pane' || second?.type !== 'pane') return root;

	const exchange = (node: LayoutNode<TData>): LayoutNode<TData> => {
		if (node.type === 'pane') {
			if (node.id === firstId) return second;
			return node.id === secondId ? first : node;
		}

		const swappedFirst = exchange(node.first);
		const swappedSecond = exchange(node.second);
		if (swappedFirst === node.first && swappedSecond === node.second) {
			return node;
		}

		return copySplit(node, { first: swappedFirst, second: swappedSecond });
	};
	return exchange(root);
}

/**
 * Moves a pane beside another pane. Never mutates `root`. The moved pane leaves its parent split,
 * and its old sibling takes that split's place. The target is then replaced by a new `direction`
 * split with id `newSplitId` and `ratio` 0.5, which holds the moved pane in `key` and the target
 * in the other slot.
 *
 * @returns A new root. The same `root` reference when the ids are equal, either one names no pane,
 * or the moved pane is the root. `undefined` when `root` is.
 */
export function movePane<TData>(
	root: LayoutNode<TData> | undefined,
	paneId: string,
	targetId: string,
	direction: SplitDirection,
	key: SplitKey,
	newSplitId: string
): LayoutNode<TData> | undefined {
	if (!root || paneId === targetId) return root;

	const moved = findNode(root, paneId)?.node;
	const target = findNode(root, targetId)?.node;
	if (moved?.type !== 'pane' || target?.type !== 'pane') return root;

	const remaining = detach(root, paneId);
	if (!remaining) return root;

	return insertBeside(remaining, targetId, moved, direction, key, newSplitId);
}

/**
 * Adds a pane beside the upper-right pane. Never mutates `root`. The walk from the root follows
 * `first` through a `column` split and `second` through a `row` split. The new pane goes above
 * the found pane when its parent is a `row` split, and to its right otherwise, in a new split
 * with id `newSplitId` and `ratio` 0.5.
 *
 * @returns A new root. `pane` itself when `root` is `undefined`.
 */
export function addPaneToUpperRight<TData>(
	root: LayoutNode<TData> | undefined,
	pane: PaneNode<TData>,
	newSplitId: string
): LayoutNode<TData> {
	if (!root) return pane;

	const path: PathStep<TData>[] = [];
	let target = root;
	while (target.type === 'split') {
		const key: SplitKey = target.direction === 'column' ? 'first' : 'second';
		path.push({ split: target, key });
		target = target[key];
	}

	const isParentRow = path.at(-1)?.split.direction === 'row';
	const [direction, key]: [SplitDirection, SplitKey] = isParentRow
		? ['column', 'first']
		: ['row', 'second'];
	const [first, second] = key === 'first' ? [pane, target] : [target, pane];
	return replaceAtPath(path, {
		type: 'split',
		id: newSplitId,
		direction,
		ratio: NEW_SPLIT_RATIO,
		first,
		second
	});
}

/**
 * Removes a pane. Never mutates `root`. The pane's sibling takes its parent split's place.
 *
 * @returns A new root. `undefined` when the pane was the root, since nothing remains. The same
 * `root` reference when `paneId` names no pane.
 */
export function removePane<TData>(
	root: LayoutNode<TData> | undefined,
	paneId: string
): LayoutNode<TData> | undefined {
	if (!root) return undefined;
	if (findNode(root, paneId)?.node.type !== 'pane') return root;
	return detach(root, paneId);
}

/**
 * Replaces a pane's `data`. Never mutates `root`. Compares by reference, so a consumer that wants
 * a deep comparison does it before calling.
 *
 * @returns A new root. The same `root` reference when `paneId` names no pane or `data` is already
 * the pane's data.
 */
export function updatePaneData<TData>(
	root: LayoutNode<TData> | undefined,
	paneId: string,
	data: TData
): LayoutNode<TData> | undefined {
	if (!root) return undefined;

	const found = findNode(root, paneId);
	if (found?.node.type !== 'pane' || found.node.data === data) return root;
	return replaceAtPath(found.path, { ...found.node, data });
}
