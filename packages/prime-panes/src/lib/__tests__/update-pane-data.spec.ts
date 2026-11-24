import { describe, expect, it } from 'vitest';

import { updatePaneData } from '../tree.ts';
import {
	CAMERA,
	CAMERA_2,
	createLayout,
	createStackLayout,
	deepFreeze,
	expectSplit,
	expectStack,
	ids,
	pane,
	SOLO_PANE,
	split,
	stackIds,
	TAB_A1,
	TAB_A2,
	TAB_B1,
	TAB_B2,
	TIME_SERIES
} from '../../../test/layouts.ts';

import type { LayoutNode, PaneNode } from '../layout.ts';
import type { PaneData } from '../../../test/layouts.ts';

const RENAMED = { label: 'Renamed' };

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
	panesA: PaneNode<PaneData>[],
	panesB: PaneNode<PaneData>[]
): LayoutNode<PaneData> {
	return split(
		stackIds.rootSplit,
		'row',
		0.6,
		{ type: 'stack', id: stackIds.stackA, panes: panesA, activeId: stackIds.tabA2 },
		split(stackIds.sideSplit, 'column', 0.4, SOLO_PANE, {
			type: 'stack',
			id: stackIds.stackB,
			panes: panesB,
			activeId: stackIds.tabB1
		})
	);
}

describe('updatePaneData', () => {
	it('returns undefined for an undefined root', () => {
		const root = undefined;

		const result = updatePaneData<PaneData>(root, ids.mycam, RENAMED);

		expect(result).toBeUndefined();
	});

	it('puts the new data on the pane in the result', () => {
		const root = createLayout();

		const result = updatePaneData(root, ids.mysensor, RENAMED);

		expect(result).toEqual(
			cameraLayout(CAMERA, TIME_SERIES, pane(ids.mysensor, 'Renamed'), CAMERA_2)
		);
	});

	it('keeps the new data by reference', () => {
		const root = createLayout();

		const result = expectSplit(updatePaneData(root, ids.mycam, RENAMED));

		expect((result.first as PaneNode<PaneData>).data).toBe(RENAMED);
	});

	it('keeps the reference of every subtree off the path', () => {
		const root = expectSplit(createLayout());
		const inner = expectSplit(root.second);

		const result = expectSplit(updatePaneData(root, ids.mytimeseries, RENAMED));
		const resultInner = expectSplit(result.second);

		expect(result).not.toBe(root);
		expect(result.first).toBe(root.first);
		expect(resultInner.second).toBe(inner.second);
	});

	it('replaces the data of a stacked pane and keeps the stack shape', () => {
		const root = createStackLayout();

		const result = updatePaneData(root, stackIds.tabA3, RENAMED);

		expect(result).toEqual(
			stackLayout([TAB_A1, TAB_A2, pane(stackIds.tabA3, 'Renamed')], [TAB_B1, TAB_B2])
		);
	});

	it('keeps the reference of the other stacked panes and the other subtree', () => {
		const root = expectSplit(createStackLayout());
		const before = expectStack(root.first);

		const result = expectSplit(updatePaneData(root, stackIds.tabA3, RENAMED));
		const after = expectStack(result.first);

		expect(result.second).toBe(root.second);
		expect(after.panes[0]).toBe(before.panes[0]);
		expect(after.panes[1]).toBe(before.panes[1]);
	});

	it('replaces the data of the pane in a float entry', () => {
		const entry = { id: 'entry', rect: { x: 1, y: 2, width: 30, height: 40 }, content: TAB_A1 };
		const root: LayoutNode<PaneData> = {
			type: 'float',
			id: 'float',
			base: SOLO_PANE,
			floats: [entry]
		};

		const result = updatePaneData(root, stackIds.tabA1, RENAMED);

		expect(result).toEqual({
			type: 'float',
			id: 'float',
			base: SOLO_PANE,
			floats: [{ ...entry, content: pane(stackIds.tabA1, 'Renamed') }]
		});
	});

	it('replaces data that is equal by value but a different reference', () => {
		const root = createLayout();

		const result = updatePaneData(root, ids.mycam, { label: 'Camera' });

		expect(result).not.toBe(root);
		expect(result).toEqual(root);
	});

	it.each([
		{ name: 'the id names no node', create: createLayout, paneId: 'missing' },
		{ name: 'the id names a split', create: createLayout, paneId: ids.innerSplit },
		{ name: 'the id names a stack', create: createStackLayout, paneId: stackIds.stackA }
	])('returns the same root when $name', ({ create, paneId }) => {
		const root = create();

		const result = updatePaneData(root, paneId, RENAMED);

		expect(result).toBe(root);
	});

	it.each([
		{
			name: 'an unstacked pane',
			create: createLayout,
			paneId: ids.mycam,
			dataOf: (root: LayoutNode<PaneData>) => (expectSplit(root).first as PaneNode<PaneData>).data
		},
		{
			name: 'a stacked pane',
			create: createStackLayout,
			paneId: stackIds.tabA1,
			dataOf: (root: LayoutNode<PaneData>) => expectStack(expectSplit(root).first).panes[0]!.data
		}
	])(
		'returns the same root when $name already has the data by reference',
		({ create, paneId, dataOf }) => {
			const root = create();

			const result = updatePaneData(root, paneId, dataOf(root));

			expect(result).toBe(root);
		}
	);

	it.each([
		{ name: 'an unstacked pane', create: createLayout, paneId: ids.mycam },
		{ name: 'a stacked pane', create: createStackLayout, paneId: stackIds.tabB2 }
	])('leaves a deep-frozen input unchanged updating $name', ({ create, paneId }) => {
		const root = deepFreeze(create());
		const before = structuredClone(root);

		const result = updatePaneData(root, paneId, { label: 'Renamed' });

		expect(root).toEqual(before);
		expect(result).not.toBe(root);
	});
});
