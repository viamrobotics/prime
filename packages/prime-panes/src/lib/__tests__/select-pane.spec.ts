import { describe, expect, it } from 'vitest';

import { selectPane } from '../tree.ts';
import {
	createLayout,
	createStackLayout,
	deepFreeze,
	expectSplit,
	ids,
	pane,
	stackIds
} from '../../../test/layouts.ts';

import type { LayoutNode } from '../layout.ts';
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

function withActive(activeId: string): LayoutNode<PaneData> {
	return {
		type: 'split',
		id: stackIds.rootSplit,
		direction: 'row',
		ratio: 0.6,
		first: {
			type: 'stack',
			id: stackIds.stackA,
			panes: [TAB_A1, TAB_A2, TAB_A3],
			activeId
		},
		second: SIDE_SPLIT
	};
}

describe('selectPane', () => {
	it('returns undefined for an undefined root', () => {
		const root = undefined;

		const result = selectPane<PaneData>(root, stackIds.tabA1);

		expect(result).toBeUndefined();
	});

	it.each([
		{ name: 'a later pane', paneId: stackIds.tabA3 },
		{ name: 'an earlier pane', paneId: stackIds.tabA1 }
	])('makes $name its stack active pane', ({ paneId }) => {
		const root = createStackLayout();

		const result = selectPane(root, paneId);

		expect(result).toEqual(withActive(paneId));
	});

	it('leaves the other stack and the subtrees off the path alone', () => {
		const root = expectSplit(createStackLayout());

		const result = expectSplit(selectPane(root, stackIds.tabA3));

		expect(result.second).toBe(root.second);
	});

	it('makes a pane active when the stack active id names a pane that left', () => {
		const root: LayoutNode<PaneData> = {
			type: 'stack',
			id: 'tabs',
			panes: [TAB_A1, TAB_A2],
			activeId: 'gone'
		};

		const result = selectPane(root, stackIds.tabA2);

		expect(result).toEqual({ ...root, activeId: stackIds.tabA2 });
	});

	it.each([
		{ name: 'the pane is already active', create: createStackLayout, paneId: stackIds.tabA2 },
		{ name: 'the id names no node', create: createStackLayout, paneId: 'missing' },
		{ name: 'the pane is unstacked', create: createStackLayout, paneId: stackIds.solo },
		{ name: 'the id names a stack', create: createStackLayout, paneId: stackIds.stackA },
		{ name: 'the id names a split', create: createStackLayout, paneId: stackIds.sideSplit },
		{ name: 'the tree has no stack', create: createLayout, paneId: ids.mycam }
	])('returns the same root when $name', ({ create, paneId }) => {
		const root = create();

		const result = selectPane(root, paneId);

		expect(result).toBe(root);
	});

	it('leaves a deep-frozen input unchanged', () => {
		const root = deepFreeze(createStackLayout());
		const before = structuredClone(root);

		const result = selectPane(root, stackIds.tabA3);

		expect(root).toEqual(before);
		expect(result).not.toBe(root);
	});
});
