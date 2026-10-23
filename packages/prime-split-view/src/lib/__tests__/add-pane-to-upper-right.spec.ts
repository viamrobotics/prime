import { describe, expect, it } from 'vitest';

import { addPaneToUpperRight } from '../tree.ts';
import { createLayout, deepFreeze, expectSplit, ids } from './layout-fixture.ts';

import type { LayoutNode, PaneNode } from '../layout.ts';
import type { PaneData } from './layout-fixture.ts';

function pane(id: string): PaneNode<PaneData> {
	return { type: 'pane', id, data: { label: id } };
}

describe('addPaneToUpperRight', () => {
	it('returns the new pane when the root is undefined', () => {
		const added = pane('new');

		expect(addPaneToUpperRight<PaneData>(undefined, added, 'split-a')).toBe(added);
	});

	it('splits a single-pane root into a row with the new pane on the right', () => {
		const root = pane('zero');

		const result = expectSplit(addPaneToUpperRight(root, pane('one'), 'split-a'));

		expect(result.id).toBe('split-a');
		expect(result.direction).toBe('row');
		expect(result.ratio).toBe(0.5);
		expect(result.first).toBe(root);
		expect(result.second.id).toBe('one');
	});

	it('builds the four-pane layout the app builds from an empty workspace', () => {
		let root: LayoutNode<PaneData> | undefined;
		for (const [index, name] of ['p0', 'p1', 'p2', 'p3'].entries()) {
			root = addPaneToUpperRight(root, pane(name), `split-${index}`);
		}

		const rootSplit = expectSplit(root);
		const right = expectSplit(rootSplit.second);
		const upperRight = expectSplit(right.first);

		expect(rootSplit.first.id).toBe('p0');
		expect(right.second.id).toBe('p1');
		expect(upperRight.first.id).toBe('p2');
		expect(upperRight.second.id).toBe('p3');
	});

	it('splits mycam in the nested fixture, placing the new pane to its right', () => {
		const root = createLayout();

		const result = expectSplit(addPaneToUpperRight(root, pane('new'), 'split-a'));
		const created = expectSplit(result.first);

		expect(result.id).toBe(ids.rootSplit);
		expect(created.id).toBe('split-a');
		expect(created.direction).toBe('row');
		expect(created.first.id).toBe(ids.mycam);
		expect(created.second.id).toBe('new');
	});

	it('puts the new pane above when the found pane sits in a row split', () => {
		const root: LayoutNode<PaneData> = {
			type: 'split',
			id: 'pair',
			direction: 'row',
			ratio: 0.4,
			first: pane('a'),
			second: pane('b')
		};

		const result = expectSplit(addPaneToUpperRight(root, pane('new'), 'split-a'));
		const created = expectSplit(result.second);

		expect(created.direction).toBe('column');
		expect(created.first.id).toBe('new');
		expect(created.second.id).toBe('b');
	});

	it('keeps the reference of every subtree off the path', () => {
		const root = expectSplit(createLayout());

		const result = expectSplit(addPaneToUpperRight(root, pane('new'), 'split-a'));

		expect(result).not.toBe(root);
		expect(result.second).toBe(root.second);
	});

	it('does not mutate a deep-frozen input', () => {
		const root = deepFreeze(createLayout());
		const before = structuredClone(root);

		expect(() => addPaneToUpperRight(root, pane('new'), 'split-a')).not.toThrow();
		expect(root).toEqual(before);
	});
});
