import { describe, expect, it } from 'vitest';

import { updatePaneData } from '../tree.ts';
import {
	createLayout,
	createStackLayout,
	deepFreeze,
	expectSplit,
	expectStack,
	ids,
	stackIds,
	tabIds
} from '../../../test/layouts.ts';

import type { PaneNode, SplitNode } from '../layout.ts';
import type { PaneData } from '../../../test/layouts.ts';

describe('updatePaneData', () => {
	it('returns undefined for an undefined root', () => {
		expect(updatePaneData<PaneData>(undefined, ids.mycam, { label: 'x' })).toBeUndefined();
	});

	it('puts the new data on the pane in the result', () => {
		const data = { label: 'Renamed' };

		const result = expectSplit(updatePaneData(createLayout(), ids.mysensor, data));
		const lower = expectSplit(expectSplit(result.second).second);

		expect(lower.first).toEqual({ type: 'pane', id: ids.mysensor, data: { label: 'Renamed' } });
		expect(lower.first).toMatchObject({ data });
	});

	it('keeps the reference of every subtree off the path', () => {
		const root = expectSplit(createLayout());
		const inner = expectSplit(root.second);

		const result = expectSplit(updatePaneData(root, ids.mytimeseries, { label: 'Renamed' }));
		const resultInner = expectSplit(result.second);

		expect(result).not.toBe(root);
		expect(result.first).toBe(root.first);
		expect(resultInner.second).toBe(inner.second);
	});

	it('returns the same root when the id is not found', () => {
		const root = createLayout();

		expect(updatePaneData(root, 'missing', { label: 'x' })).toBe(root);
	});

	it('returns the same root when the id names a split', () => {
		const root = createLayout();

		expect(updatePaneData(root, ids.innerSplit, { label: 'x' })).toBe(root);
	});

	it.each([
		{
			name: 'an unstacked pane',
			create: createLayout,
			id: ids.mycam,
			dataOf: (root: SplitNode<PaneData>) => (root.first as PaneNode<PaneData>).data
		},
		{
			name: 'a stacked pane',
			create: createStackLayout,
			id: stackIds.tabA1,
			dataOf: (root: SplitNode<PaneData>) => expectStack(root.first).panes[0]!.data
		}
	])(
		'returns the same root when $name already has the data by reference',
		({ create, id, dataOf }) => {
			const root = expectSplit(create());

			expect(updatePaneData(root, id, dataOf(root))).toBe(root);
		}
	);

	it('replaces data that is equal by value but a different reference', () => {
		const root = createLayout();

		expect(updatePaneData(root, ids.mycam, { label: 'Camera' })).not.toBe(root);
	});

	it('does not mutate a deep-frozen input', () => {
		const root = deepFreeze(createLayout());
		const before = structuredClone(root);

		expect(() => updatePaneData(root, ids.mycam, { label: 'x' })).not.toThrow();
		expect(root).toEqual(before);
	});
});

describe('updatePaneData with stacks', () => {
	it('replaces the data of a stacked pane and keeps the stack shape', () => {
		const data = { label: 'Renamed' };
		const result = expectSplit(updatePaneData(createStackLayout(), stackIds.tabA3, data));
		const stack = expectStack(result.first);

		expect(tabIds(stack)).toEqual([stackIds.tabA1, stackIds.tabA2, stackIds.tabA3]);
		expect(stack.activeId).toBe(stackIds.tabA2);
		expect(stack.panes[2]?.data).toBe(data);
	});

	it('keeps the reference of the other stacked panes and the other subtree', () => {
		const root = expectSplit(createStackLayout());
		const before = expectStack(root.first);
		const result = expectSplit(updatePaneData(root, stackIds.tabA3, { label: 'Renamed' }));
		const after = expectStack(result.first);

		expect(result.second).toBe(root.second);
		expect(after.panes[0]).toBe(before.panes[0]);
		expect(after.panes[1]).toBe(before.panes[1]);
	});

	it('returns the same root when the id names a stack', () => {
		const root = createStackLayout();
		expect(updatePaneData(root, stackIds.stackA, { label: 'x' })).toBe(root);
	});

	it('does not mutate a deep-frozen input', () => {
		const root = deepFreeze(createStackLayout());
		expect(() => updatePaneData(root, stackIds.tabB2, { label: 'x' })).not.toThrow();
	});
});
