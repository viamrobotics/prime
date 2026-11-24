import { describe, expect, it } from 'vitest';

import { movePane } from '../tree.ts';
import {
	CAMERA,
	CAMERA_2,
	createLayout,
	createStackLayout,
	deepFreeze,
	expectSplit,
	ids,
	pane,
	SENSOR,
	SOLO_PANE,
	split,
	stackIds,
	TAB_A1,
	TAB_A2,
	TAB_A3,
	TAB_B1,
	TAB_B2,
	TAB_STACK_B,
	TIME_SERIES
} from '../../../test/layouts.ts';

import type { LayoutNode, PaneNode, SplitDirection, SplitKey, StackNode } from '../layout.ts';
import type { PaneData } from '../../../test/layouts.ts';

const NEW_SPLIT_ID = 'new-split';

function stackA(panes: PaneNode<PaneData>[], activeId: string): StackNode<PaneData> {
	return { type: 'stack', id: stackIds.stackA, panes, activeId };
}

const LOWER = split(ids.lowerSplit, 'column', 0.5, SENSOR, CAMERA_2);

describe('movePane', () => {
	it('returns undefined for an undefined root', () => {
		const root = undefined;

		const result = movePane<PaneData>(root, ids.mycam, ids.mysensor, 'row', 'first', NEW_SPLIT_ID);

		expect(result).toBeUndefined();
	});

	it.each([
		{ name: 'the moved id names no node', paneId: 'missing', targetId: stackIds.solo },
		{ name: 'the target id names no node', paneId: stackIds.solo, targetId: 'missing' },
		{ name: 'the moved id names a split', paneId: stackIds.sideSplit, targetId: stackIds.solo },
		{ name: 'the target id names a split', paneId: stackIds.solo, targetId: stackIds.sideSplit },
		{ name: 'the moved id names a stack', paneId: stackIds.stackA, targetId: stackIds.solo },
		{ name: 'the target id names a stack', paneId: stackIds.solo, targetId: stackIds.stackA },
		{ name: 'the ids are equal', paneId: stackIds.solo, targetId: stackIds.solo }
	])('returns the same root when $name', ({ paneId, targetId }) => {
		const root = createStackLayout();

		const result = movePane(root, paneId, targetId, 'row', 'first', NEW_SPLIT_ID);

		expect(result).toBe(root);
	});

	it.each<{
		direction: SplitDirection;
		key: SplitKey;
		first: LayoutNode<PaneData>;
		second: LayoutNode<PaneData>;
	}>([
		{ direction: 'row', key: 'first', first: TIME_SERIES, second: CAMERA },
		{ direction: 'column', key: 'second', first: CAMERA, second: TIME_SERIES }
	])(
		'moves a pane into a new $direction split with the moved pane in $key',
		({ direction, key, first, second }) => {
			const root = createLayout();

			const result = movePane(root, ids.mytimeseries, ids.mycam, direction, key, NEW_SPLIT_ID);

			expect(result).toEqual(
				split(
					ids.rootSplit,
					'column',
					0.3,
					split(NEW_SPLIT_ID, direction, 0.5, first, second),
					LOWER
				)
			);
		}
	);

	it('collapses the root when the moved pane is a child of the root', () => {
		const root = createLayout();

		const result = movePane(root, ids.mycam, ids.mytimeseries, 'row', 'second', NEW_SPLIT_ID);

		expect(result).toEqual(
			split(ids.innerSplit, 'row', 0.6, split(NEW_SPLIT_ID, 'row', 0.5, TIME_SERIES, CAMERA), LOWER)
		);
	});

	it('moves onto the sibling after the parent split collapses', () => {
		const root = createLayout();

		const result = movePane(root, ids.mysensor, ids.mycam2, 'column', 'second', NEW_SPLIT_ID);

		expect(result).toEqual(
			split(
				ids.rootSplit,
				'column',
				0.3,
				CAMERA,
				split(
					ids.innerSplit,
					'row',
					0.6,
					TIME_SERIES,
					split(NEW_SPLIT_ID, 'column', 0.5, CAMERA_2, SENSOR)
				)
			)
		);
	});

	it('makes a two-pane tree a new split when a pane moves onto its sibling', () => {
		const root = split('pair', 'row', 0.2, pane('a', 'a'), pane('b', 'b'));

		const result = movePane(root, 'a', 'b', 'column', 'second', NEW_SPLIT_ID);

		expect(result).toEqual(split(NEW_SPLIT_ID, 'column', 0.5, pane('b', 'b'), pane('a', 'a')));
	});

	it('keeps the reference of every subtree off the changed paths', () => {
		const root = expectSplit(createLayout());

		const moved = expectSplit(
			movePane(root, ids.mytimeseries, ids.mycam, 'row', 'first', NEW_SPLIT_ID)
		);

		expect(moved).not.toBe(root);
		expect(moved.second).toBe(expectSplit(root.second).second);
		expect(expectSplit(moved.first).second).toBe(root.first);
	});

	it.each([
		{ name: 'a plain pane', create: createLayout, paneId: ids.mysensor, targetId: ids.mycam },
		{
			name: 'a stacked pane beside a stack-mate',
			create: createStackLayout,
			paneId: stackIds.tabA1,
			targetId: stackIds.tabA3
		},
		{
			name: 'a plain pane beside a stacked pane',
			create: createStackLayout,
			paneId: stackIds.solo,
			targetId: stackIds.tabB1
		}
	])('leaves a deep-frozen input unchanged moving $name', ({ create, paneId, targetId }) => {
		const root = deepFreeze(create());
		const before = structuredClone(root);

		const result = movePane(root, paneId, targetId, 'row', 'first', NEW_SPLIT_ID);

		expect(root).toEqual(before);
		expect(result).not.toBe(root);
	});
});

describe('movePane with stacks', () => {
	it('moves a plain pane beside the whole stack of a stacked target', () => {
		const root = createStackLayout();

		const result = movePane(root, stackIds.solo, stackIds.tabA3, 'column', 'first', NEW_SPLIT_ID);

		expect(result).toEqual(
			split(
				stackIds.rootSplit,
				'row',
				0.6,
				split(
					NEW_SPLIT_ID,
					'column',
					0.5,
					SOLO_PANE,
					stackA([TAB_A1, TAB_A2, TAB_A3], stackIds.tabA2)
				),
				TAB_STACK_B
			)
		);
	});

	it('moves the active stacked pane out and makes the next pane active', () => {
		const root = createStackLayout();

		const result = movePane(root, stackIds.tabA2, stackIds.solo, 'row', 'second', NEW_SPLIT_ID);

		expect(result).toEqual(
			split(
				stackIds.rootSplit,
				'row',
				0.6,
				stackA([TAB_A1, TAB_A3], stackIds.tabA3),
				split(
					stackIds.sideSplit,
					'column',
					0.4,
					split(NEW_SPLIT_ID, 'row', 0.5, SOLO_PANE, TAB_A2),
					TAB_STACK_B
				)
			)
		);
	});

	it('takes a stacked pane out of its stack when placed beside a stack-mate', () => {
		const root = createStackLayout();

		const result = movePane(root, stackIds.tabA1, stackIds.tabA3, 'row', 'first', NEW_SPLIT_ID);

		expect(result).toEqual(
			split(
				stackIds.rootSplit,
				'row',
				0.6,
				split(NEW_SPLIT_ID, 'row', 0.5, TAB_A1, stackA([TAB_A2, TAB_A3], stackIds.tabA2)),
				split(stackIds.sideSplit, 'column', 0.4, SOLO_PANE, TAB_STACK_B)
			)
		);
	});

	it('collapses a stack left with one pane when the other pane moves beside it', () => {
		const root = createStackLayout();

		const result = movePane(root, stackIds.tabB2, stackIds.tabB1, 'row', 'second', NEW_SPLIT_ID);

		expect(result).toEqual(
			split(
				stackIds.rootSplit,
				'row',
				0.6,
				stackA([TAB_A1, TAB_A2, TAB_A3], stackIds.tabA2),
				split(
					stackIds.sideSplit,
					'column',
					0.4,
					SOLO_PANE,
					split(NEW_SPLIT_ID, 'row', 0.5, TAB_B1, TAB_B2)
				)
			)
		);
	});
});
