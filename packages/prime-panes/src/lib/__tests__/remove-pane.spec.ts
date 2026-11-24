import { describe, expect, it } from 'vitest';

import { removePane } from '../tree.ts';
import {
	createLayout,
	createStackLayout,
	deepFreeze,
	expectSplit,
	ids,
	pane,
	stackIds
} from '../../../test/layouts.ts';

import type { LayoutNode, PaneNode, SplitDirection } from '../layout.ts';
import type { PaneData } from '../../../test/layouts.ts';

const CAMERA = pane(ids.mycam, 'Camera');
const TIME_SERIES = pane(ids.mytimeseries, 'Time series');
const SENSOR = pane(ids.mysensor, 'Sensor stat');
const CAMERA_2 = pane(ids.mycam2, 'Camera 2');

const SOLO = pane(stackIds.solo, stackIds.solo);
const TAB_A1 = pane(stackIds.tabA1, stackIds.tabA1);
const TAB_A2 = pane(stackIds.tabA2, stackIds.tabA2);
const TAB_A3 = pane(stackIds.tabA3, stackIds.tabA3);
const TAB_B1 = pane(stackIds.tabB1, stackIds.tabB1);
const TAB_B2 = pane(stackIds.tabB2, stackIds.tabB2);

function split(
	id: string,
	direction: SplitDirection,
	ratio: number,
	first: LayoutNode<PaneData>,
	second: LayoutNode<PaneData>
): LayoutNode<PaneData> {
	return { type: 'split', id, direction, ratio, first, second };
}

function stack(id: string, panes: PaneNode<PaneData>[], activeId: string): LayoutNode<PaneData> {
	return { type: 'stack', id, panes, activeId };
}

const LOWER_SPLIT = split(ids.lowerSplit, 'column', 0.5, SENSOR, CAMERA_2);
const STACK_B = stack(stackIds.stackB, [TAB_B1, TAB_B2], stackIds.tabB1);
const SIDE_SPLIT = split(stackIds.sideSplit, 'column', 0.4, SOLO, STACK_B);

function stackLayout(first: LayoutNode<PaneData>, second: LayoutNode<PaneData>) {
	return split(stackIds.rootSplit, 'row', 0.6, first, second);
}

describe('removePane', () => {
	it('returns undefined for an undefined root', () => {
		const root = undefined;

		const result = removePane<PaneData>(root, ids.mycam);

		expect(result).toBeUndefined();
	});

	it.each([
		{ name: 'the id names no node', create: createLayout, paneId: 'missing' },
		{ name: 'the id names a split', create: createLayout, paneId: ids.innerSplit },
		{ name: 'the id names a stack', create: createStackLayout, paneId: stackIds.stackA }
	])('returns the same root when $name', ({ create, paneId }) => {
		const root = create();

		const result = removePane(root, paneId);

		expect(result).toBe(root);
	});

	it('returns undefined when the only pane is removed', () => {
		const root = pane('only', 'only');

		const result = removePane(root, 'only');

		expect(result).toBeUndefined();
	});

	it('removes a pane deep in the tree and promotes its sibling', () => {
		const root = createLayout();

		const result = removePane(root, ids.mytimeseries);

		expect(result).toEqual(split(ids.rootSplit, 'column', 0.3, CAMERA, LOWER_SPLIT));
	});

	it('makes the sibling the root when a child of the root is removed', () => {
		const root = createLayout();

		const result = removePane(root, ids.mycam);

		expect(result).toEqual(split(ids.innerSplit, 'row', 0.6, TIME_SERIES, LOWER_SPLIT));
	});

	it('keeps the reference of every subtree off the path', () => {
		const root = expectSplit(createLayout());
		const inner = expectSplit(root.second);

		const result = expectSplit(removePane(root, ids.mytimeseries));

		expect(result.first).toBe(root.first);
		expect(result.second).toBe(inner.second);
	});

	it('removes a stacked pane from its stack and keeps the active pane', () => {
		const root = createStackLayout();

		const result = removePane(root, stackIds.tabA1);

		expect(result).toEqual(
			stackLayout(stack(stackIds.stackA, [TAB_A2, TAB_A3], stackIds.tabA2), SIDE_SPLIT)
		);
	});

	it('makes the next pane active when the active pane leaves', () => {
		const root = createStackLayout();

		const result = removePane(root, stackIds.tabA2);

		expect(result).toEqual(
			stackLayout(stack(stackIds.stackA, [TAB_A1, TAB_A3], stackIds.tabA3), SIDE_SPLIT)
		);
	});

	it('makes the previous pane active when the last active pane leaves', () => {
		const root = stack('tabs', [TAB_A1, TAB_A2, TAB_A3], stackIds.tabA3);

		const result = removePane(root, stackIds.tabA3);

		expect(result).toEqual(stack('tabs', [TAB_A1, TAB_A2], stackIds.tabA2));
	});

	it('collapses a stack left with one pane to that pane', () => {
		const root = createStackLayout();

		const result = removePane(root, stackIds.tabB1);

		expect(result).toEqual(
			stackLayout(
				stack(stackIds.stackA, [TAB_A1, TAB_A2, TAB_A3], stackIds.tabA2),
				split(stackIds.sideSplit, 'column', 0.4, SOLO, TAB_B2)
			)
		);
	});

	it('collapses a root stack left with one pane to the pane as the root', () => {
		const root = stack('tabs', [TAB_A1, TAB_A2], stackIds.tabA1);

		const result = removePane(root, stackIds.tabA2);

		expect(result).toEqual(TAB_A1);
	});

	it('removes the pane of a float entry and drops the entry', () => {
		const entryA = { id: 'entry-a', rect: { x: 0, y: 0, width: 100, height: 80 }, content: TAB_A1 };
		const entryB = { id: 'entry-b', rect: { x: 5, y: 5, width: 50, height: 40 }, content: TAB_A2 };
		const root: LayoutNode<PaneData> = {
			type: 'float',
			id: 'float',
			base: SOLO,
			floats: [entryA, entryB]
		};

		const result = removePane(root, stackIds.tabA1);

		expect(result).toEqual({ type: 'float', id: 'float', base: SOLO, floats: [entryB] });
	});

	it.each([
		{ name: 'a plain pane', create: createLayout, paneId: ids.mysensor },
		{ name: 'an active stacked pane', create: createStackLayout, paneId: stackIds.tabA2 },
		{ name: 'a pane whose stack collapses', create: createStackLayout, paneId: stackIds.tabB1 }
	])('leaves a deep-frozen input unchanged removing $name', ({ create, paneId }) => {
		const root = deepFreeze(create());
		const before = structuredClone(root);

		const result = removePane(root, paneId);

		expect(root).toEqual(before);
		expect(result).not.toBe(root);
	});
});
