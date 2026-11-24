import { describe, expect, it } from 'vitest';

import { reorderPane } from '../tree.ts';
import {
	createLayout,
	createStackLayout,
	deepFreeze,
	expectSplit,
	ids,
	pane,
	stackIds
} from '../../../test/layouts.ts';

import type { LayoutNode, PaneNode } from '../layout.ts';
import type { PaneData } from '../../../test/layouts.ts';

const SOLO = pane(stackIds.solo, stackIds.solo);
const TAB_A1 = pane(stackIds.tabA1, stackIds.tabA1);
const TAB_A2 = pane(stackIds.tabA2, stackIds.tabA2);
const TAB_A3 = pane(stackIds.tabA3, stackIds.tabA3);

const SIDE_SPLIT: LayoutNode<PaneData> = {
	type: 'split',
	id: stackIds.sideSplit,
	direction: 'column',
	ratio: 0.4,
	first: SOLO,
	second: {
		type: 'stack',
		id: stackIds.stackB,
		panes: [pane(stackIds.tabB1, stackIds.tabB1), pane(stackIds.tabB2, stackIds.tabB2)],
		activeId: stackIds.tabB1
	}
};

function withStackA(panes: PaneNode<PaneData>[]): LayoutNode<PaneData> {
	return {
		type: 'split',
		id: stackIds.rootSplit,
		direction: 'row',
		ratio: 0.6,
		first: { type: 'stack', id: stackIds.stackA, panes, activeId: stackIds.tabA2 },
		second: SIDE_SPLIT
	};
}

describe('reorderPane', () => {
	it('returns undefined for an undefined root', () => {
		const root = undefined;

		const result = reorderPane<PaneData>(root, stackIds.tabA1, 1);

		expect(result).toBeUndefined();
	});

	it.each([
		{ paneId: stackIds.tabA1, index: 1, expected: [TAB_A2, TAB_A1, TAB_A3] },
		{ paneId: stackIds.tabA1, index: 2, expected: [TAB_A2, TAB_A3, TAB_A1] },
		{ paneId: stackIds.tabA3, index: 0, expected: [TAB_A3, TAB_A1, TAB_A2] },
		{ paneId: stackIds.tabA3, index: 1, expected: [TAB_A1, TAB_A3, TAB_A2] },
		{ paneId: stackIds.tabA1, index: 99, expected: [TAB_A2, TAB_A3, TAB_A1] },
		{ paneId: stackIds.tabA3, index: -4, expected: [TAB_A3, TAB_A1, TAB_A2] },
		{ paneId: stackIds.tabA1, index: 1.9, expected: [TAB_A2, TAB_A1, TAB_A3] }
	])('moves $paneId to index $index', ({ paneId, index, expected }) => {
		const root = createStackLayout();

		const result = reorderPane(root, paneId, index);

		expect(result).toEqual(withStackA(expected));
	});

	it('keeps the active pane when it is the pane that moves', () => {
		const root = createStackLayout();

		const result = reorderPane(root, stackIds.tabA2, 0);

		expect(result).toEqual(withStackA([TAB_A2, TAB_A1, TAB_A3]));
	});

	it('keeps the reference of the other subtrees', () => {
		const root = expectSplit(createStackLayout());

		const result = expectSplit(reorderPane(root, stackIds.tabA1, 2));

		expect(result.second).toBe(root.second);
	});

	it.each([
		{ name: 'the pane is already at the index', paneId: stackIds.tabA2, index: 1 },
		{ name: 'a clamped index is the pane position', paneId: stackIds.tabA3, index: 99 },
		{ name: 'a negative index clamps to the pane position', paneId: stackIds.tabA1, index: -3 },
		{ name: 'the pane is unstacked', paneId: stackIds.solo, index: 0 },
		{ name: 'the id names no node', paneId: 'missing', index: 0 },
		{ name: 'the id names a stack', paneId: stackIds.stackA, index: 0 },
		{ name: 'the id names a split', paneId: stackIds.sideSplit, index: 0 }
	])('returns the same root when $name', ({ paneId, index }) => {
		const root = createStackLayout();

		const result = reorderPane(root, paneId, index);

		expect(result).toBe(root);
	});

	it('returns the same root when the pane is a child of a split only', () => {
		const root = createLayout();

		const result = reorderPane(root, ids.mycam, 1);

		expect(result).toBe(root);
	});

	it('leaves a deep-frozen input unchanged', () => {
		const root = deepFreeze(createStackLayout());
		const before = structuredClone(root);

		const result = reorderPane(root, stackIds.tabA1, 2);

		expect(root).toEqual(before);
		expect(result).not.toBe(root);
	});
});
