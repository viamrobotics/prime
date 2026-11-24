import type { FloatEntry, FloatNode, FloatRect, LayoutNode } from '../layout.ts';
import { childrenOf, isContainer, removeChild } from '../node-kind.ts';
import { findNode, removeFound, replaceAtPath, type FoundNode, type PathStep } from '../tree.ts';
import { floatChildIndex } from './float-adapter.ts';

interface FoundEntry<TData> {
	float: FloatNode<TData>;
	floatPath: PathStep<TData>[];
	entry: FloatEntry<TData>;
	entryIndex: number;
}

function findEntryInFloat<TData>(
	node: LayoutNode<TData>,
	entryId: string,
	path: PathStep<TData>[]
): FoundEntry<TData> | undefined {
	switch (node.type) {
		case 'float': {
			const entryIndex = node.floats.findIndex((candidate) => candidate.id === entryId);
			if (entryIndex === -1) return undefined;
			return { float: node, floatPath: path, entry: node.floats[entryIndex]!, entryIndex };
		}
		case 'pane':
		case 'split':
		case 'stack':
			return undefined;
		default:
			return node satisfies never;
	}
}

// Entries are not nodes, so `findNode` never returns one.
function findEntry<TData>(
	node: LayoutNode<TData>,
	entryId: string,
	path: PathStep<TData>[] = []
): FoundEntry<TData> | undefined {
	const own = findEntryInFloat(node, entryId, path);
	if (own) return own;

	if (!isContainer(node)) return undefined;
	for (const [index, child] of childrenOf(node).entries()) {
		const found = findEntry(child, entryId, [...path, { parent: node, index }]);
		if (found) return found;
	}
	return undefined;
}

function isWholeEntryContentOf<TData>(source: FoundNode<TData>, hostId: string): boolean {
	const parentStep = source.path.at(-1);
	return (
		parentStep?.parent.type === 'float' &&
		parentStep.parent.id === hostId &&
		parentStep.index >= floatChildIndex(parentStep.parent, 0)
	);
}

interface RemainingHost<TData> {
	node: LayoutNode<TData> | undefined;
	path: PathStep<TData>[];
}

// `node` is `undefined` when the source was all of the host.
function hostWithout<TData>(
	host: FoundNode<TData>,
	source: FoundNode<TData>
): RemainingHost<TData> {
	if (findNode(host.node, source.node.id)) {
		const pathInHost = source.path.slice(host.path.length);
		return { node: removeFound({ node: source.node, path: pathInHost }), path: host.path };
	}
	return findNode(removeFound(source)!, host.node.id)!;
}

function withEntry<TData>(
	host: LayoutNode<TData> | undefined,
	entry: FloatEntry<TData>,
	newFloatId: string
): FloatNode<TData> {
	if (!host) return { type: 'float', id: newFloatId, base: undefined, floats: [entry] };

	switch (host.type) {
		case 'float':
			return { ...host, floats: [...host.floats, entry] };
		case 'pane':
		case 'split':
		case 'stack':
			return { type: 'float', id: newFloatId, base: host, floats: [entry] };
		default:
			return host satisfies never;
	}
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
	if (isWholeEntryContentOf(source, host.node.id)) return root;

	const entry: FloatEntry<TData> = { id: newEntryId, rect, content: source.node };
	const remainingHost = hostWithout(host, source);
	return replaceAtPath(remainingHost.path, withEntry(remainingHost.node, entry, newFloatId));
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

	const replacement = removeChild(found.float, floatChildIndex(found.float, found.entryIndex));
	if (replacement) return replaceAtPath(found.floatPath, replacement);
	return removeFound({ node: found.float, path: found.floatPath });
}
