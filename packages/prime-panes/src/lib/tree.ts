import type {
	FloatEntry,
	FloatNode,
	FloatRect,
	LayoutNode,
	PaneNode,
	SplitDirection,
	SplitKey,
	StackNode
} from './layout.ts';
import {
	childrenOf,
	isContainer,
	isSlot,
	removeChild,
	replaceChild,
	withChildren,
	type ContainerNode
} from './node-kind.ts';

interface PathStep<TData> {
	parent: ContainerNode<TData>;
	index: number;
}

interface FoundNode<TData> {
	node: LayoutNode<TData>;
	path: PathStep<TData>[];
}

const NEW_SPLIT_RATIO = 0.5;

export function findNode<TData>(root: LayoutNode<TData>, id: string): FoundNode<TData> | undefined {
	if (root.id === id) return { node: root, path: [] };
	if (!isContainer(root)) return undefined;

	for (const [index, child] of childrenOf(root).entries()) {
		const found = findNode(child, id);
		if (found) return { node: found.node, path: [{ parent: root, index }, ...found.path] };
	}

	return undefined;
}

function clampIndex(index: number, max: number) {
	return Math.min(Math.max(Math.trunc(index), 0), max);
}

function stackOf<TData>(found: FoundNode<TData>): StackNode<TData> | undefined {
	const parent = found.path.at(-1)?.parent;
	return parent?.type === 'stack' ? parent : undefined;
}

function slotOf<TData>(found: FoundNode<TData>): LayoutNode<TData> {
	return stackOf(found) ?? found.node;
}

function slotPath<TData>(found: FoundNode<TData>): PathStep<TData>[] {
	return stackOf(found) ? found.path.slice(0, -1) : found.path;
}

export function replaceAtPath<TData>(
	path: PathStep<TData>[],
	replacement: LayoutNode<TData>
): LayoutNode<TData> {
	return path.reduceRight<LayoutNode<TData>>(
		(child, { parent, index }) => replaceChild(parent, index, child),
		replacement
	);
}

// `undefined` when the removed node was the root.
function removeFound<TData>(found: FoundNode<TData>): LayoutNode<TData> | undefined {
	const step = found.path.at(-1);
	if (!step) return undefined;

	const parentPath = found.path.slice(0, -1);
	const replacement = removeChild(step.parent, step.index);
	if (replacement) return replaceAtPath(parentPath, replacement);
	return removeFound({ node: step.parent, path: parentPath });
}

function insertBeside<TData>(
	root: LayoutNode<TData>,
	targetPaneId: string,
	node: LayoutNode<TData>,
	direction: SplitDirection,
	key: SplitKey,
	newSplitId: string
): LayoutNode<TData> {
	const found = findNode(root, targetPaneId);
	if (!found) return root;

	const slot = slotOf(found);
	const [first, second] = key === 'first' ? [node, slot] : [slot, node];
	return replaceAtPath(slotPath(found), {
		type: 'split',
		id: newSplitId,
		direction,
		ratio: NEW_SPLIT_RATIO,
		first,
		second
	});
}

// Pane nodes also match inside stacks, and a stack's `activeId` then follows its position.
function exchangeNodes<TData>(
	node: LayoutNode<TData>,
	first: LayoutNode<TData>,
	second: LayoutNode<TData>
): LayoutNode<TData> {
	if (node.id === first.id) return second;
	if (node.id === second.id) return first;
	if (!isContainer(node)) return node;

	const children = childrenOf(node);
	const exchanged = children.map((child) => exchangeNodes(child, first, second));
	return withChildren(node, exchanged);
}

/**
 * Exchanges the positions of two panes, wherever each sits, in a split or a stack. Never mutates
 * `root`. Each split keeps its `ratio`, so sizes stay with the positions rather than following the
 * panes. `activeId` also stays with the position, so a pane swapped into a stack's shown position
 * becomes its active pane.
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

	return exchangeNodes(root, first, second);
}

/**
 * Moves a pane beside another pane's slot, which is the target's stack when the target is stacked
 * and the target itself otherwise. Never mutates `root`. The moved pane first leaves its place the
 * way `removePane` removes it. The slot is then replaced by a new `direction` split with id
 * `newSplitId` and `ratio` 0.5, which holds the moved pane in `key` and the slot in the other.
 * Moving a stacked pane beside one of its own stack's panes takes it out of that stack.
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

	const remaining = removeFound(findNode(root, paneId)!)!;

	return insertBeside(remaining, targetId, moved, direction, key, newSplitId);
}

function upperRightStep<TData>(node: LayoutNode<TData>): PathStep<TData> | undefined {
	switch (node.type) {
		case 'split':
			return { parent: node, index: node.direction === 'column' ? 0 : 1 };
		case 'float':
			return node.base ? { parent: node, index: 0 } : undefined;
		case 'pane':
		case 'stack':
			return undefined;
		default:
			return node satisfies never;
	}
}

/**
 * Adds a pane beside the upper-right slot. Never mutates `root`. The walk from the root follows
 * `first` through a `column` split and `second` through a `row` split, and stops at a pane or a
 * stack, or at a float node with no `base`, which takes the new pane as its `base`. Otherwise the
 * new pane goes above the found slot when its parent is a `row` split, and to its right otherwise,
 * in a new split with id `newSplitId` and `ratio` 0.5.
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
	for (let step = upperRightStep(target); step; step = upperRightStep(target)) {
		path.push(step);
		target = childrenOf(step.parent)[step.index]!;
	}

	if (target.type === 'float') return replaceAtPath(path, { ...target, base: pane });

	const parent = path.at(-1)?.parent;
	const isParentRow = parent?.type === 'split' && parent.direction === 'row';
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
 * Removes a pane. Never mutates `root`. A pane in a split leaves it, and its sibling takes the
 * split's place. A stacked pane leaves its stack. When it was active, the next pane becomes active,
 * or the previous one when it was last. A stack left with one pane is replaced by that pane.
 *
 * @returns A new root. `undefined` when the pane was the root, since nothing remains. The same
 * `root` reference when `paneId` names no pane.
 */
export function removePane<TData>(
	root: LayoutNode<TData> | undefined,
	paneId: string
): LayoutNode<TData> | undefined {
	if (!root) return undefined;
	const found = findNode(root, paneId);
	if (found?.node.type !== 'pane') return root;
	return removeFound(found);
}

/**
 * Replaces a pane's `data`, wherever it sits. Never mutates `root`. Compares by reference, so a
 * consumer that wants a deep comparison does it before calling.
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
	const updated: PaneNode<TData> = { ...found.node, data };
	return replaceAtPath(found.path, updated);
}

/**
 * Shows a stacked pane by making it its stack's `activeId`. Never mutates `root`.
 *
 * @returns A new root. The same `root` reference when `paneId` names no stacked pane or the pane is
 * already active. `undefined` when `root` is.
 */
export function selectPane<TData>(
	root: LayoutNode<TData> | undefined,
	paneId: string
): LayoutNode<TData> | undefined {
	if (!root) return undefined;

	const found = findNode(root, paneId);
	const stack = found && stackOf(found);
	if (!found || !stack || stack.activeId === paneId) return root;
	return replaceAtPath(slotPath(found), { ...stack, activeId: paneId });
}

function stackingOf<TData>(
	node: LayoutNode<TData>
): { panes: readonly PaneNode<TData>[]; activeId: string } | undefined {
	switch (node.type) {
		case 'pane':
			return { panes: [node], activeId: node.id };
		case 'stack':
			return { panes: node.panes, activeId: node.activeId };
		case 'split':
		case 'float':
			return undefined;
		default:
			return node satisfies never;
	}
}

/**
 * Stacks a pane, or every pane of a stack, with a target pane. Never mutates `root`. The source
 * first leaves its place the way `removePane` or `moveStack` removes it. A stacked target's stack
 * then gains the source's panes at `index` in its tab order. An unstacked target is replaced by a
 * new stack with id `newStackId` that holds the target, with the source's panes at `index`. The
 * stack shows the source pane, or the source stack's active pane.
 *
 * @param sourceId Names a pane or a stack.
 * @param index Where the source's panes go in the target's tab order, clamped to it. Defaults to
 * the end.
 * @returns A new root. The same `root` reference when `sourceId` names neither a pane nor a stack,
 * `targetPaneId` names no pane, or the target already shares a stack with the source or is the
 * source. `undefined` when `root` is.
 */
export function stackPanes<TData>(
	root: LayoutNode<TData> | undefined,
	targetPaneId: string,
	sourceId: string,
	newStackId: string,
	index?: number
): LayoutNode<TData> | undefined {
	if (!root || targetPaneId === sourceId) return root;

	const target = findNode(root, targetPaneId);
	const source = findNode(root, sourceId);
	if (target?.node.type !== 'pane' || !source) return root;

	const stacking = stackingOf(source.node);
	if (!stacking) return root;
	const sourceStackId = stackOf(source)?.id ?? source.node.id;
	if (stackOf(target)?.id === sourceStackId) return root;

	const remaining = removeFound(source)!;

	const targetInRemaining = findNode(remaining, targetPaneId)!;
	const targetStack = stackOf(targetInRemaining);
	const stackedPanes = targetStack?.panes ?? [target.node];
	const insertAt = clampIndex(index ?? stackedPanes.length, stackedPanes.length);
	const stack: StackNode<TData> = {
		type: 'stack',
		id: targetStack?.id ?? newStackId,
		panes: stackedPanes.toSpliced(insertAt, 0, ...stacking.panes),
		activeId: stacking.activeId
	};
	return replaceAtPath(slotPath(targetInRemaining), stack);
}

/**
 * Moves a stacked pane to `index` in its stack's tab order. Never mutates `root`. The stack's
 * `activeId` is unchanged.
 *
 * @param index The pane's position once moved, clamped to the stack.
 * @returns A new root. The same `root` reference when `paneId` names no stacked pane or the pane is
 * already at `index`. `undefined` when `root` is.
 */
export function reorderPane<TData>(
	root: LayoutNode<TData> | undefined,
	paneId: string,
	index: number
): LayoutNode<TData> | undefined {
	if (!root) return undefined;

	const found = findNode(root, paneId);
	const stack = found && stackOf(found);
	if (found?.node.type !== 'pane' || !stack) return root;

	const { panes } = stack;
	const from = panes.findIndex((pane) => pane.id === paneId);
	const to = clampIndex(index, panes.length - 1);
	if (from === to) return root;

	const reordered = panes.toSpliced(from, 1).toSpliced(to, 0, found.node);
	return replaceAtPath(slotPath(found), { ...stack, panes: reordered });
}

/**
 * Moves a whole stack beside a pane's slot, which is the pane's stack when it is stacked and the
 * pane itself otherwise. Never mutates `root`. The stack leaves its parent split, and its old
 * sibling takes the split's place. The slot is then replaced by a new `direction` split with id
 * `newSplitId` and `ratio` 0.5, which holds the stack in `key` and the slot in the other.
 *
 * @returns A new root. The same `root` reference when `stackId` names no stack, `targetPaneId`
 * names no pane, the target is in the stack, or the stack is the root. `undefined` when `root` is.
 */
export function moveStack<TData>(
	root: LayoutNode<TData> | undefined,
	stackId: string,
	targetPaneId: string,
	direction: SplitDirection,
	key: SplitKey,
	newSplitId: string
): LayoutNode<TData> | undefined {
	if (!root) return undefined;

	const source = findNode(root, stackId);
	const target = findNode(root, targetPaneId);
	if (source?.node.type !== 'stack' || target?.node.type !== 'pane') return root;
	if (stackOf(target)?.id === stackId) return root;

	const remaining = removeFound(source)!;

	return insertBeside(remaining, targetPaneId, source.node, direction, key, newSplitId);
}

/**
 * Exchanges two slots. Each id names a pane or a stack, and a stacked pane stands for its whole
 * stack, so a pane in a stack never trades places alone. Never mutates `root`. Each split keeps its
 * `ratio`, so sizes stay with the positions.
 *
 * @returns A new root. The same `root` reference when either id names neither a pane nor a stack,
 * or both name the same slot. `undefined` when `root` is.
 */
export function swapSlots<TData>(
	root: LayoutNode<TData> | undefined,
	firstId: string,
	secondId: string
): LayoutNode<TData> | undefined {
	if (!root) return undefined;

	const first = findNode(root, firstId);
	const second = findNode(root, secondId);
	if (!first || !second) return root;

	const firstSlot = slotOf(first);
	const secondSlot = slotOf(second);
	if (!isSlot(firstSlot) || !isSlot(secondSlot)) return root;
	if (firstSlot.id === secondSlot.id) return root;

	return exchangeNodes(root, firstSlot, secondSlot);
}

interface FoundEntry<TData> {
	float: FloatNode<TData>;
	floatPath: PathStep<TData>[];
	entry: FloatEntry<TData>;
	entryIndex: number;
}

// Entries are not nodes, so `findNode` never returns one.
function findEntry<TData>(
	node: LayoutNode<TData>,
	entryId: string,
	path: PathStep<TData>[] = []
): FoundEntry<TData> | undefined {
	if (node.type === 'float') {
		const entryIndex = node.floats.findIndex((candidate) => candidate.id === entryId);
		if (entryIndex !== -1) {
			return { float: node, floatPath: path, entry: node.floats[entryIndex]!, entryIndex };
		}
	}

	if (!isContainer(node)) return undefined;
	for (const [index, child] of childrenOf(node).entries()) {
		const found = findEntry(child, entryId, [...path, { parent: node, index }]);
		if (found) return found;
	}
	return undefined;
}

function floatSource<TData>(
	root: LayoutNode<TData> | undefined,
	sourceId: string,
	sourceType: 'pane' | 'stack',
	rect: FloatRect,
	newEntryId: string,
	newFloatId: string,
	hostId: string | undefined
): LayoutNode<TData> | undefined {
	if (!root) return undefined;

	const source = findNode(root, sourceId);
	if (source?.node.type !== sourceType) return root;

	const host = findNode(root, hostId ?? root.id);
	if (!host || findNode(source.node, host.node.id)) return root;

	const parentStep = source.path.at(-1);
	const isWholeEntryContent =
		parentStep?.parent.type === 'float' &&
		parentStep.parent.id === host.node.id &&
		parentStep.index >= (parentStep.parent.base ? 1 : 0);
	if (isWholeEntryContent) return root;

	const entry: FloatEntry<TData> = { id: newEntryId, rect, content: source.node };

	let hostPath = host.path;
	let hostNode: LayoutNode<TData> | undefined;
	if (findNode(host.node, sourceId)) {
		hostNode = removeFound({ node: source.node, path: source.path.slice(host.path.length) });
	} else {
		const remainingHost = findNode(removeFound(source)!, host.node.id)!;
		hostPath = remainingHost.path;
		hostNode = remainingHost.node;
	}

	const floated: FloatNode<TData> =
		hostNode?.type === 'float'
			? { ...hostNode, floats: [...hostNode.floats, entry] }
			: { type: 'float', id: newFloatId, base: hostNode, floats: [entry] };
	return replaceAtPath(hostPath, floated);
}

/**
 * Moves a pane out of its slot into a new entry of a float node. Never mutates `root`. A stacked
 * pane leaves its stack as `removePane` does. The rect is stored as given, never clamped.
 *
 * @param newEntryId The new entry's id.
 * @param newFloatId The id of the float node that wraps the host, when the host is not one already.
 * @param hostId The node whose box the entry floats over. Defaults to the root. When it is an
 * ancestor of the pane, the pane leaves it with the usual collapse rules and what remains is the
 * host. The wrapping float node has no `base` when nothing of the host remains.
 * @returns A new root. The same `root` reference when `paneId` names no pane, `hostId` names no
 * node, the host is the pane or inside it, or the pane is already the whole content of an entry of
 * the host. `undefined` when `root` is.
 */
export function floatPane<TData>(
	root: LayoutNode<TData> | undefined,
	paneId: string,
	rect: FloatRect,
	newEntryId: string,
	newFloatId: string,
	hostId?: string
): LayoutNode<TData> | undefined {
	return floatSource(root, paneId, 'pane', rect, newEntryId, newFloatId, hostId);
}

/**
 * Moves a whole stack out of its slot into a new entry of a float node, as `floatPane` moves a
 * pane. Never mutates `root`. A pane inside the stack counts as inside the source.
 *
 * @returns A new root. The same `root` reference when nothing changes. `undefined` when `root` is.
 */
export function floatStack<TData>(
	root: LayoutNode<TData> | undefined,
	stackId: string,
	rect: FloatRect,
	newEntryId: string,
	newFloatId: string,
	hostId?: string
): LayoutNode<TData> | undefined {
	return floatSource(root, stackId, 'stack', rect, newEntryId, newFloatId, hostId);
}

/**
 * Replaces a float entry's rect. Never mutates `root`.
 *
 * @param rect The new rect, or an updater that receives the entry's current rect and returns the
 * new one. An updater lets a resize button grow a window without keeping its own copy of the rect.
 * It is not called when `entryId` names no entry.
 * @returns A new root. The same `root` reference when `entryId` names no entry or the rect is
 * equal field by field. `undefined` when `root` is.
 */
export function setFloatRect<TData>(
	root: LayoutNode<TData> | undefined,
	entryId: string,
	rect: FloatRect | ((rect: FloatRect) => FloatRect)
): LayoutNode<TData> | undefined {
	if (!root) return undefined;

	const found = findEntry(root, entryId);
	if (!found) return root;
	const { entry } = found;
	const nextRect = typeof rect === 'function' ? rect(entry.rect) : rect;
	const isUnchanged =
		entry.rect.x === nextRect.x &&
		entry.rect.y === nextRect.y &&
		entry.rect.width === nextRect.width &&
		entry.rect.height === nextRect.height;
	if (isUnchanged) return root;

	const floats = found.float.floats.with(found.entryIndex, { ...entry, rect: nextRect });
	return replaceAtPath(found.floatPath, { ...found.float, floats });
}

/**
 * Moves a float entry to the top of its float node's stacking order. Never mutates `root`.
 *
 * @returns A new root. The same `root` reference when `entryId` names no entry or the entry is
 * already on top. `undefined` when `root` is.
 */
export function raiseFloat<TData>(
	root: LayoutNode<TData> | undefined,
	entryId: string
): LayoutNode<TData> | undefined {
	if (!root) return undefined;

	const found = findEntry(root, entryId);
	if (!found || found.entryIndex === found.float.floats.length - 1) return root;

	const floats = [...found.float.floats.toSpliced(found.entryIndex, 1), found.entry];
	return replaceAtPath(found.floatPath, { ...found.float, floats });
}

/**
 * Removes a float entry and everything in it. Never mutates `root`. A float node left with no
 * entries is replaced by its `base`, and one with no `base` either is removed like any child.
 *
 * @returns A new root. The same `root` reference when `entryId` names no entry. `undefined` when
 * nothing remains.
 */
export function removeFloat<TData>(
	root: LayoutNode<TData> | undefined,
	entryId: string
): LayoutNode<TData> | undefined {
	if (!root) return undefined;

	const found = findEntry(root, entryId);
	if (!found) return root;

	const childIndex = (found.float.base ? 1 : 0) + found.entryIndex;
	const replacement = removeChild(found.float, childIndex);
	if (replacement) return replaceAtPath(found.floatPath, replacement);
	return removeFound({ node: found.float, path: found.floatPath });
}
