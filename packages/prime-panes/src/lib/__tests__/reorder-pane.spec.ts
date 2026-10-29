import { describe, expect, it } from 'vitest';

import { reorderPane } from '../tree.ts';
import {
	createStackLayout,
	deepFreeze,
	expectSplit,
	expectStack,
	stackIds,
	tabIds
} from '../../../test/layouts.ts';

import type { PaneData } from '../../../test/layouts.ts';

function stackATabs(root: ReturnType<typeof createStackLayout>) {
	return tabIds(expectStack(expectSplit(root).first));
}

describe('reorderPane', () => {
	it('returns undefined for an undefined root', () => {
		expect(reorderPane<PaneData>(undefined, stackIds.tabA1, 1)).toBeUndefined();
	});

	it.each([
		{ paneId: 'tab-a1', index: 1, expected: ['tab-a2', 'tab-a1', 'tab-a3'] },
		{ paneId: 'tab-a1', index: 2, expected: ['tab-a2', 'tab-a3', 'tab-a1'] },
		{ paneId: 'tab-a3', index: 0, expected: ['tab-a3', 'tab-a1', 'tab-a2'] },
		{ paneId: 'tab-a3', index: 1, expected: ['tab-a1', 'tab-a3', 'tab-a2'] }
	])('moves $paneId to index $index', ({ paneId, index, expected }) => {
		const result = reorderPane(createStackLayout(), paneId, index);

		expect(stackATabs(result!)).toEqual(expected);
	});

	it('clamps an index past the end to the last position', () => {
		const result = reorderPane(createStackLayout(), stackIds.tabA1, 99);

		expect(stackATabs(result!)).toEqual(['tab-a2', 'tab-a3', 'tab-a1']);
	});

	it('clamps a negative index to the front', () => {
		const result = reorderPane(createStackLayout(), stackIds.tabA3, -4);

		expect(stackATabs(result!)).toEqual(['tab-a3', 'tab-a1', 'tab-a2']);
	});

	it('keeps the active pane', () => {
		const result = expectSplit(reorderPane(createStackLayout(), stackIds.tabA2, 0));

		expect(expectStack(result.first).activeId).toBe(stackIds.tabA2);
	});

	it('keeps every split ratio', () => {
		const result = expectSplit(reorderPane(createStackLayout(), stackIds.tabA1, 2));

		expect(result.ratio).toBe(0.6);
		expect(expectSplit(result.second).ratio).toBe(0.4);
	});

	it('keeps the reference of the other subtrees', () => {
		const root = expectSplit(createStackLayout());
		const result = expectSplit(reorderPane(root, stackIds.tabA1, 2));

		expect(result.second).toBe(root.second);
	});

	it('returns the same root when the pane is already at the index', () => {
		const root = createStackLayout();

		expect(reorderPane(root, stackIds.tabA2, 1)).toBe(root);
	});

	it('returns the same root when a clamped index is the pane position', () => {
		const root = createStackLayout();

		expect(reorderPane(root, stackIds.tabA3, 99)).toBe(root);
	});

	it('returns the same root for an unstacked pane', () => {
		const root = createStackLayout();

		expect(reorderPane(root, stackIds.solo, 0)).toBe(root);
	});

	it('returns the same root for an unknown id', () => {
		const root = createStackLayout();

		expect(reorderPane(root, 'missing', 0)).toBe(root);
	});

	it('returns the same root for a stack id', () => {
		const root = createStackLayout();

		expect(reorderPane(root, stackIds.stackA, 0)).toBe(root);
	});

	it('does not mutate a deep-frozen input', () => {
		const root = deepFreeze(createStackLayout());

		expect(() => reorderPane(root, stackIds.tabA1, 2)).not.toThrow();
	});
});
