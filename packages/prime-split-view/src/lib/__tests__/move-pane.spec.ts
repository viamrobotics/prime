import { describe, expect, it } from 'vitest';

import { movePane } from '../tree.ts';
import { createLayout, deepFreeze, expectSplit, ids } from './layout-fixture.ts';

import type { LayoutNode } from '../layout.ts';
import type { PaneData } from './layout-fixture.ts';

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

	it('returns the same root when an id is not found', () => {
		const root = createLayout();
		expect(movePane(root, 'missing', ids.mycam, 'row', 'first', NEW_SPLIT_ID)).toBe(root);
		expect(movePane(root, ids.mycam, 'missing', 'row', 'first', NEW_SPLIT_ID)).toBe(root);
	});

	it('returns the same root when the ids are equal', () => {
		const root = createLayout();
		expect(movePane(root, ids.mycam, ids.mycam, 'row', 'first', NEW_SPLIT_ID)).toBe(root);
	});

	it('returns the same root when either id names a split', () => {
		const root = createLayout();
		expect(movePane(root, ids.innerSplit, ids.mycam, 'row', 'first', NEW_SPLIT_ID)).toBe(root);
		expect(movePane(root, ids.mycam, ids.innerSplit, 'row', 'first', NEW_SPLIT_ID)).toBe(root);
	});

	it('returns the same root when the moved pane is the root', () => {
		const root = pane('only');
		expect(movePane(root, 'only', ids.mycam, 'row', 'first', NEW_SPLIT_ID)).toBe(root);
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
