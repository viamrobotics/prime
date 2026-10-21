import { describe, expect, it } from 'vitest';

import { setSplitRatio } from '../tree.ts';
import { ids, layoutRoot } from './layout-fixture.ts';

import type { LayoutNode, SplitNode } from '../layout.ts';
import type { PaneData } from './layout-fixture.ts';

function deepFreeze<TValue>(value: TValue): TValue {
	if (typeof value === 'object' && value !== null && !Object.isFrozen(value)) {
		Object.freeze(value);
		Object.values(value).forEach(deepFreeze);
	}
	return value;
}

function getSplitNode(node: LayoutNode<PaneData> | undefined): SplitNode<PaneData> {
	if (node?.type !== 'split') {
		throw new Error('node is not a split');
	}
	return node;
}

function getSplit(root: LayoutNode<PaneData> | undefined, id: string) {
	const stack = root ? [root] : [];
	for (let node = stack.pop(); node; node = stack.pop()) {
		if (node.type !== 'split') continue;
		if (node.id === id) return node;
		stack.push(node.first, node.second);
	}
	return undefined;
}

describe('setSplitRatio', () => {
	it('sets the ratio of the root split', () => {
		const modified = setSplitRatio(layoutRoot, ids.rootSplit, 0.7);
		expect(getSplit(modified, ids.rootSplit)?.ratio).toBe(0.7);
	});

	it('sets the ratio of a nested split', () => {
		const modified = setSplitRatio(layoutRoot, ids.lowerSplit, 0.9);
		expect(getSplit(modified, ids.lowerSplit)?.ratio).toBe(0.9);
		expect(getSplit(modified, ids.rootSplit)?.ratio).toBe(0.3);
		expect(getSplit(modified, ids.innerSplit)?.ratio).toBe(0.6);
	});

	it('returns undefined for an undefined root', () => {
		expect(setSplitRatio(undefined, ids.rootSplit, 0.7)).toBeUndefined();
	});

	it('returns the same root for an unknown id', () => {
		expect(setSplitRatio(layoutRoot, 'missing', 0.7)).toBe(layoutRoot);
	});

	it('returns the same root for a pane id', () => {
		expect(setSplitRatio(layoutRoot, ids.mycam, 0.7)).toBe(layoutRoot);
	});

	it('returns the same root for an equal value', () => {
		expect(setSplitRatio(layoutRoot, ids.innerSplit, 0.6)).toBe(layoutRoot);
	});

	it('keeps the reference of every subtree off the path', () => {
		const modified = setSplitRatio(layoutRoot, ids.lowerSplit, 0.9);
		expect(modified).not.toBe(layoutRoot);
		const before = getSplitNode(layoutRoot);
		const after = getSplitNode(modified);
		expect(after).not.toBe(before);
		expect(after.first).toBe(before.first);

		const innerBefore = getSplitNode(before.second);
		const innerAfter = getSplitNode(after.second);
		expect(after.second).not.toBe(before.second);
		expect(innerAfter.first).toBe(innerBefore.first);

		const lowerBefore = getSplitNode(innerBefore.second);
		const lowerAfter = getSplitNode(innerAfter.second);
		expect(innerAfter.second).not.toBe(innerBefore.second);
		expect(lowerAfter.first).toBe(lowerBefore.first);
		expect(lowerAfter.second).toBe(lowerBefore.second);
	});

	it('does not mutate a deeply frozen input', () => {
		const input = deepFreeze(structuredClone(layoutRoot));
		const snapshot = structuredClone(layoutRoot);
		let modified: LayoutNode<PaneData> | undefined;
		expect(() => {
			modified = setSplitRatio(input, ids.lowerSplit, 0.9);
		}).not.toThrow();
		expect(modified).not.toBe(input);
		expect(input).toEqual(snapshot);
	});
});
