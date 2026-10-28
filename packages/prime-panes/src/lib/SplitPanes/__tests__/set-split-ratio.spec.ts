import { describe, expect, it } from 'vitest';

import { setSplitRatio } from '../set-split-ratio.ts';
import {
	createStackLayout,
	deepFreeze,
	expectSplit,
	ids,
	layoutRoot,
	stackIds
} from '../../../../test/layouts.ts';

import type { LayoutNode } from '../../layout.ts';
import type { PaneData } from '../../../../test/layouts.ts';

describe('setSplitRatio', () => {
	it('sets the ratio of the root split', () => {
		const modified = setSplitRatio(layoutRoot, ids.rootSplit, 0.7);
		expect(expectSplit(modified).ratio).toBe(0.7);
	});

	it('sets the ratio of a nested split', () => {
		const modified = setSplitRatio(layoutRoot, ids.lowerSplit, 0.9);
		const root = expectSplit(modified);
		const inner = expectSplit(root.second);
		const lower = expectSplit(inner.second);

		expect(lower.id).toBe(ids.lowerSplit);
		expect(lower.ratio).toBe(0.9);
		expect(root.ratio).toBe(0.3);
		expect(inner.ratio).toBe(0.6);
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
		const before = expectSplit(layoutRoot);
		const after = expectSplit(modified);
		expect(after).not.toBe(before);
		expect(after.first).toBe(before.first);

		const innerBefore = expectSplit(before.second);
		const innerAfter = expectSplit(after.second);
		expect(after.second).not.toBe(before.second);
		expect(innerAfter.first).toBe(innerBefore.first);

		const lowerBefore = expectSplit(innerBefore.second);
		const lowerAfter = expectSplit(innerAfter.second);
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

describe('setSplitRatio with stacks', () => {
	it('sets the ratio of a split below a stack sibling', () => {
		const result = expectSplit(setSplitRatio(createStackLayout(), stackIds.sideSplit, 0.9));
		expect(expectSplit(result.second).ratio).toBe(0.9);
	});

	it.each([stackIds.stackA, stackIds.tabA1])('returns the same root for the id %s', (id) => {
		const root = createStackLayout();
		expect(setSplitRatio(root, id, 0.5)).toBe(root);
	});
});
