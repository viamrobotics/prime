import { describe, expect, it } from 'vitest';

import { movePane } from '../tree.ts';
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

import type { LayoutNode } from '../layout.ts';
import type { PaneData } from '../../../test/layouts.ts';

const NEW_SPLIT_ID = 'new-split';

function pane(id: string): LayoutNode<PaneData> {
	return { type: 'pane', id, data: { label: id } };
}

describe('movePane', () => {
	it('returns undefined for an undefined root', () => {
		expect(
			movePane<PaneData>(undefined, ids.mycam, ids.mysensor, 'row', 'first', NEW_SPLIT_ID)
		).toBeUndefined();
	});

	it.each([
		{ paneId: 'missing', targetId: stackIds.solo },
		{ paneId: stackIds.solo, targetId: 'missing' },
		{ paneId: stackIds.sideSplit, targetId: stackIds.solo },
		{ paneId: stackIds.solo, targetId: stackIds.sideSplit },
		{ paneId: stackIds.stackA, targetId: stackIds.solo },
		{ paneId: stackIds.solo, targetId: stackIds.stackA }
	])('returns the same root for the ids $paneId and $targetId', ({ paneId, targetId }) => {
		const root = createStackLayout();
		expect(movePane(root, paneId, targetId, 'row', 'first', NEW_SPLIT_ID)).toBe(root);
	});

	it('returns the same root when the ids are equal', () => {
		const root = createLayout();
		expect(movePane(root, ids.mycam, ids.mycam, 'row', 'first', NEW_SPLIT_ID)).toBe(root);
	});

	it('moves a pane into a new split beside the target', () => {
		const root = createLayout();
		const moved = expectSplit(
			movePane(root, ids.mytimeseries, ids.mycam, 'row', 'first', NEW_SPLIT_ID)
		);
		const created = expectSplit(moved.first);
		const collapsed = expectSplit(moved.second);

		expect(created.id).toBe(NEW_SPLIT_ID);
		expect(created.direction).toBe('row');
		expect(created.ratio).toBe(0.5);
		expect(created.first.id).toBe(ids.mytimeseries);
		expect(created.second.id).toBe(ids.mycam);
		expect(collapsed.id).toBe(ids.lowerSplit);
		expect(collapsed.first.id).toBe(ids.mysensor);
		expect(collapsed.second.id).toBe(ids.mycam2);
	});

	it('puts the moved pane in the second slot when key is second', () => {
		const moved = expectSplit(
			movePane(createLayout(), ids.mytimeseries, ids.mycam, 'column', 'second', NEW_SPLIT_ID)
		);
		const created = expectSplit(moved.first);

		expect(created.direction).toBe('column');
		expect(created.first.id).toBe(ids.mycam);
		expect(created.second.id).toBe(ids.mytimeseries);
	});

	it('collapses the root when the moved pane is a child of the root', () => {
		const root = createLayout();
		const moved = expectSplit(
			movePane(root, ids.mycam, ids.mytimeseries, 'row', 'second', NEW_SPLIT_ID)
		);
		const created = expectSplit(moved.first);

		expect(moved.id).toBe(ids.innerSplit);
		expect(created.id).toBe(NEW_SPLIT_ID);
		expect(created.first.id).toBe(ids.mytimeseries);
		expect(created.second.id).toBe(ids.mycam);
	});

	it('moves onto the sibling after the parent split collapses', () => {
		const moved = expectSplit(
			movePane(createLayout(), ids.mysensor, ids.mycam2, 'column', 'second', NEW_SPLIT_ID)
		);
		const inner = expectSplit(moved.second);
		const created = expectSplit(inner.second);

		expect(inner.id).toBe(ids.innerSplit);
		expect(created.id).toBe(NEW_SPLIT_ID);
		expect(created.first.id).toBe(ids.mycam2);
		expect(created.second.id).toBe(ids.mysensor);
		expect(JSON.stringify(moved)).not.toContain(ids.lowerSplit);
	});

	it('makes a two-pane tree a new split when a pane moves onto its sibling', () => {
		const root: LayoutNode<PaneData> = {
			type: 'split',
			id: 'pair',
			direction: 'row',
			ratio: 0.2,
			first: pane('a'),
			second: pane('b')
		};
		const moved = expectSplit(movePane(root, 'a', 'b', 'column', 'second', NEW_SPLIT_ID));

		expect(moved.id).toBe(NEW_SPLIT_ID);
		expect(moved.direction).toBe('column');
		expect(moved.ratio).toBe(0.5);
		expect(moved.first.id).toBe('b');
		expect(moved.second.id).toBe('a');
	});

	it('keeps the reference of every subtree off the changed paths', () => {
		const root = expectSplit(createLayout());
		const inner = expectSplit(root.second);
		const lower = inner.second;
		const moved = expectSplit(
			movePane(root, ids.mytimeseries, ids.mycam, 'row', 'first', NEW_SPLIT_ID)
		);

		expect(moved).not.toBe(root);
		expect(moved.second).toBe(lower);
		expect(expectSplit(moved.first).second).toBe(root.first);
	});

	it('does not mutate a deep-frozen input', () => {
		const root = deepFreeze(createLayout());
		const before = structuredClone(root);

		expect(() =>
			movePane(root, ids.mysensor, ids.mycam, 'row', 'first', NEW_SPLIT_ID)
		).not.toThrow();
		expect(root).toEqual(before);
	});
});

describe('movePane with stacks', () => {
	it('moves a plain pane beside the whole stack of a stacked target', () => {
		const result = expectSplit(
			movePane(createStackLayout(), stackIds.solo, stackIds.tabA3, 'column', 'first', NEW_SPLIT_ID)
		);
		const created = expectSplit(result.first);

		expect(result.id).toBe(stackIds.rootSplit);
		expect(result.second.id).toBe(stackIds.stackB);
		expect(created.id).toBe(NEW_SPLIT_ID);
		expect(created.first.id).toBe(stackIds.solo);
		expect(expectStack(created.second).id).toBe(stackIds.stackA);
		expect(expectStack(created.second).panes).toHaveLength(3);
	});

	it('moves a stacked pane out, applying the active fallback', () => {
		const result = expectSplit(
			movePane(createStackLayout(), stackIds.tabA2, stackIds.solo, 'row', 'second', NEW_SPLIT_ID)
		);
		const stack = expectStack(result.first);
		const created = expectSplit(expectSplit(result.second).first);

		expect(tabIds(stack)).toEqual([stackIds.tabA1, stackIds.tabA3]);
		expect(stack.activeId).toBe(stackIds.tabA3);
		expect(created.first.id).toBe(stackIds.solo);
		expect(created.second.id).toBe(stackIds.tabA2);
	});

	it('takes a stacked pane out of its stack when placed beside a stack-mate', () => {
		const result = expectSplit(
			movePane(createStackLayout(), stackIds.tabA1, stackIds.tabA3, 'row', 'first', NEW_SPLIT_ID)
		);
		const created = expectSplit(result.first);
		const stack = expectStack(created.second);

		expect(created.id).toBe(NEW_SPLIT_ID);
		expect(created.first.id).toBe(stackIds.tabA1);
		expect(stack.id).toBe(stackIds.stackA);
		expect(tabIds(stack)).toEqual([stackIds.tabA2, stackIds.tabA3]);
		expect(stack.activeId).toBe(stackIds.tabA2);
	});

	it('collapses a stack left with one pane when the other pane moves beside it', () => {
		const result = expectSplit(
			movePane(createStackLayout(), stackIds.tabB2, stackIds.tabB1, 'row', 'second', NEW_SPLIT_ID)
		);
		const created = expectSplit(expectSplit(result.second).second);

		expect(created.first.type).toBe('pane');
		expect(created.first.id).toBe(stackIds.tabB1);
		expect(created.second.id).toBe(stackIds.tabB2);
	});

	it.each([
		{ paneId: stackIds.tabA1, targetId: stackIds.tabA3 },
		{ paneId: stackIds.solo, targetId: stackIds.tabB1 }
	])(
		'does not mutate a deep-frozen input moving $paneId beside $targetId',
		({ paneId, targetId }) => {
			const root = deepFreeze(createStackLayout());
			const before = structuredClone(root);

			expect(() => movePane(root, paneId, targetId, 'row', 'first', NEW_SPLIT_ID)).not.toThrow();
			expect(root).toEqual(before);
		}
	);
});
