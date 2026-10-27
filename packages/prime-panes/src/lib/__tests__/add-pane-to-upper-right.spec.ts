import { describe, expect, it } from 'vitest';

import { addPaneToUpperRight } from '../tree.ts';
import {
	createLayout,
	createStackLayout,
	deepFreeze,
	expectSplit,
	expectStack,
	ids,
	stackIds
} from '../../../test/layouts.ts';

import type { LayoutNode, PaneNode } from '../layout.ts';
import type { PaneData } from '../../../test/layouts.ts';

function pane(id: string): PaneNode<PaneData> {
	return { type: 'pane', id, data: { label: id } };
}

describe('addPaneToUpperRight', () => {
	it('returns the new pane when the root is undefined', () => {
		const added = pane('new');

		expect(addPaneToUpperRight<PaneData>(undefined, added, 'split-a')).toBe(added);
	});

	it.each([
		{ name: 'a single-pane root', create: () => pane('zero') },
		{ name: 'a stack root', create: () => expectStack(expectSplit(createStackLayout()).first) }
	])('splits $name into a row with the new pane on the right', ({ create }) => {
		const root = create();

		const result = expectSplit(addPaneToUpperRight(root, pane('one'), 'split-a'));

		expect(result.id).toBe('split-a');
		expect(result.direction).toBe('row');
		expect(result.ratio).toBe(0.5);
		expect(result.first).toBe(root);
		expect(result.second.id).toBe('one');
	});

	it('builds the four-pane layout the app builds from an empty workspace', () => {
		const threePanes: LayoutNode<PaneData> = {
			type: 'split',
			id: 'split-1',
			direction: 'row',
			ratio: 0.5,
			first: pane('p0'),
			second: {
				type: 'split',
				id: 'split-2',
				direction: 'column',
				ratio: 0.5,
				first: pane('p2'),
				second: pane('p1')
			}
		};

		const root = addPaneToUpperRight(threePanes, pane('p3'), 'split-3');

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

	it.each([
		{ name: 'a pane layout', create: createLayout },
		{ name: 'a stack layout', create: createStackLayout }
	])('does not mutate a deep-frozen input of $name', ({ create }) => {
		const root = deepFreeze(create());
		const before = structuredClone(root);

		expect(() => addPaneToUpperRight(root, pane('new'), 'split-a')).not.toThrow();
		expect(root).toEqual(before);
	});
});

describe('addPaneToUpperRight with stacks', () => {
	it('stops at a stack and places the new pane beside the whole stack', () => {
		const stackRoot = expectSplit(createStackLayout());
		const root = { ...stackRoot, direction: 'column' as const };
		const result = expectSplit(addPaneToUpperRight(root, pane('new'), 'split-a'));
		const created = expectSplit(result.first);

		expect(created.id).toBe('split-a');
		expect(created.direction).toBe('row');
		expect(created.first.id).toBe(stackIds.stackA);
		expect(created.second.id).toBe('new');
		expect(expectStack(created.first).panes).toHaveLength(3);
		expect(result.second).toBe(root.second);
	});

	it('places the new pane above a stack whose parent is a row split', () => {
		const stack = expectStack(expectSplit(createStackLayout()).first);
		const root = expectSplit({
			type: 'split',
			id: 'row-split',
			direction: 'row',
			ratio: 0.5,
			first: pane('left'),
			second: stack
		});
		const result = expectSplit(addPaneToUpperRight(root, pane('new'), 'split-a'));
		const created = expectSplit(result.second);

		expect(result.first).toBe(root.first);
		expect(created.direction).toBe('column');
		expect(created.first.id).toBe('new');
		expect(created.second).toBe(stack);
	});
});
