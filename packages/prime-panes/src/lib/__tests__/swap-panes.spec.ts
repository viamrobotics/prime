import { describe, expect, it } from 'vitest';

import { swapPanes } from '../tree.ts';
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

function cameraLayout(
	camera: LayoutNode<PaneData>,
	timeSeries: LayoutNode<PaneData>,
	sensor: LayoutNode<PaneData>,
	camera2: LayoutNode<PaneData>
) {
	return split(
		ids.rootSplit,
		'column',
		0.3,
		camera,
		split(
			ids.innerSplit,
			'row',
			0.6,
			timeSeries,
			split(ids.lowerSplit, 'column', 0.5, sensor, camera2)
		)
	);
}

function stackLayout(
	stackA: LayoutNode<PaneData>,
	solo: LayoutNode<PaneData>,
	stackB: LayoutNode<PaneData>
) {
	return split(
		stackIds.rootSplit,
		'row',
		0.6,
		stackA,
		split(stackIds.sideSplit, 'column', 0.4, solo, stackB)
	);
}

const STACK_B = stack(stackIds.stackB, [TAB_B1, TAB_B2], stackIds.tabB1);

describe('swapPanes', () => {
	it('returns undefined for an undefined root', () => {
		const root = undefined;

		const result = swapPanes<PaneData>(root, ids.mycam, ids.mysensor);

		expect(result).toBeUndefined();
	});

	it.each([
		{
			name: 'the first id names no node',
			create: createLayout,
			first: 'missing',
			second: ids.mycam
		},
		{
			name: 'the second id names no node',
			create: createLayout,
			first: ids.mycam,
			second: 'missing'
		},
		{
			name: 'the first id names a split',
			create: createLayout,
			first: ids.innerSplit,
			second: ids.mycam
		},
		{
			name: 'the second id names a split',
			create: createLayout,
			first: ids.mycam,
			second: ids.rootSplit
		},
		{
			name: 'the first id names a stack',
			create: createStackLayout,
			first: stackIds.stackA,
			second: stackIds.solo
		},
		{
			name: 'the second id names a stack',
			create: createStackLayout,
			first: stackIds.solo,
			second: stackIds.stackB
		},
		{ name: 'the ids are equal', create: createLayout, first: ids.mycam, second: ids.mycam }
	])('returns the same root when $name', ({ create, first, second }) => {
		const root = create();

		const result = swapPanes(root, first, second);

		expect(result).toBe(root);
	});

	it('swaps two panes in different splits', () => {
		const root = createLayout();

		const result = swapPanes(root, ids.mycam, ids.mytimeseries);

		expect(result).toEqual(cameraLayout(TIME_SERIES, CAMERA, SENSOR, CAMERA_2));
	});

	it('exchanges two children of the same split and keeps its ratio', () => {
		const root = createLayout();

		const result = swapPanes(root, ids.mysensor, ids.mycam2);

		expect(result).toEqual(cameraLayout(CAMERA, TIME_SERIES, CAMERA_2, SENSOR));
	});

	it.each([
		{ first: ids.mycam, second: ids.mysensor },
		{ first: ids.mysensor, second: ids.mycam }
	])('gives the same result for ($first, $second) in either order', ({ first, second }) => {
		const root = createLayout();

		const result = swapPanes(root, first, second);

		expect(result).toEqual(cameraLayout(SENSOR, TIME_SERIES, CAMERA, CAMERA_2));
	});

	it('keeps the reference of every subtree off the changed paths', () => {
		const root = expectSplit(createLayout());
		const inner = expectSplit(root.second);

		const swapped = expectSplit(swapPanes(root, ids.mycam, ids.mytimeseries));
		const swappedInner = expectSplit(swapped.second);

		expect(swappedInner.second).toBe(inner.second);
		expect(swapped.first).toBe(inner.first);
		expect(swappedInner.first).toBe(root.first);
	});

	it('copies only the splits on the path to the swapped panes', () => {
		const root = expectSplit(createLayout());

		const swapped = expectSplit(swapPanes(root, ids.mysensor, ids.mycam2));

		expect(swapped.first).toBe(root.first);
		expect(swapped.second).not.toBe(root.second);
	});

	it('swaps two panes of the same stack and keeps activeId on its position', () => {
		const root = createStackLayout();

		const result = swapPanes(root, stackIds.tabA1, stackIds.tabA2);

		expect(result).toEqual(
			stackLayout(stack(stackIds.stackA, [TAB_A2, TAB_A1, TAB_A3], stackIds.tabA1), SOLO, STACK_B)
		);
	});

	it('keeps activeId when the swapped panes are not in the shown position', () => {
		const root = createStackLayout();

		const result = swapPanes(root, stackIds.tabA1, stackIds.tabA3);

		expect(result).toEqual(
			stackLayout(stack(stackIds.stackA, [TAB_A3, TAB_A2, TAB_A1], stackIds.tabA2), SOLO, STACK_B)
		);
	});

	it('swaps a plain pane into a stack active position and shows it', () => {
		const root = createStackLayout();

		const result = swapPanes(root, stackIds.solo, stackIds.tabA2);

		expect(result).toEqual(
			stackLayout(stack(stackIds.stackA, [TAB_A1, SOLO, TAB_A3], stackIds.solo), TAB_A2, STACK_B)
		);
	});

	it('swaps a plain pane into an inactive stack position without changing the shown pane', () => {
		const root = createStackLayout();

		const result = swapPanes(root, stackIds.solo, stackIds.tabA3);

		expect(result).toEqual(
			stackLayout(stack(stackIds.stackA, [TAB_A1, TAB_A2, SOLO], stackIds.tabA2), TAB_A3, STACK_B)
		);
	});

	it('swaps panes between two stacks', () => {
		const root = createStackLayout();

		const result = swapPanes(root, stackIds.tabA1, stackIds.tabB1);

		expect(result).toEqual(
			stackLayout(
				stack(stackIds.stackA, [TAB_B1, TAB_A2, TAB_A3], stackIds.tabA2),
				SOLO,
				stack(stackIds.stackB, [TAB_A1, TAB_B2], stackIds.tabA1)
			)
		);
	});

	it.each([
		{ name: 'a plain pane', create: createLayout, first: ids.mycam, second: ids.mycam2 },
		{
			name: 'a plain pane with a stacked pane',
			create: createStackLayout,
			first: stackIds.solo,
			second: stackIds.tabA2
		},
		{
			name: 'two panes of one stack',
			create: createStackLayout,
			first: stackIds.tabA1,
			second: stackIds.tabA2
		}
	])('leaves a deep-frozen input unchanged when swapping $name', ({ create, first, second }) => {
		const root = deepFreeze(create());
		const before = structuredClone(root);

		const result = swapPanes(root, first, second);

		expect(root).toEqual(before);
		expect(result).not.toBe(root);
	});
});
