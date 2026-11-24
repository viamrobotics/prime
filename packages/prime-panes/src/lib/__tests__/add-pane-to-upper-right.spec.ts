import { describe, expect, it } from 'vitest';

import { addPaneToUpperRight } from '../tree.ts';
import {
	createLayout,
	createStackLayout,
	deepFreeze,
	expectSplit,
	expectStack,
	ids,
	pane
} from '../../../test/layouts.ts';

import type { FloatEntry, LayoutNode, SplitDirection } from '../layout.ts';
import type { PaneData } from '../../../test/layouts.ts';

const NEW = pane('new', 'new');

const ENTRY: FloatEntry<PaneData> = {
	id: 'e',
	rect: { x: 0, y: 0, width: 10, height: 10 },
	content: pane('p', 'p')
};

function split(
	id: string,
	direction: SplitDirection,
	ratio: number,
	first: LayoutNode<PaneData>,
	second: LayoutNode<PaneData>
): LayoutNode<PaneData> {
	return { type: 'split', id, direction, ratio, first, second };
}

describe('addPaneToUpperRight', () => {
	it('returns the new pane when the root is undefined', () => {
		const root = undefined;

		const result = addPaneToUpperRight<PaneData>(root, NEW, 'split-a');

		expect(result).toBe(NEW);
	});

	it('splits a single-pane root into a row with the new pane on the right', () => {
		const root = pane('zero', 'zero');

		const result = addPaneToUpperRight(root, NEW, 'split-a');

		expect(result).toEqual(split('split-a', 'row', 0.5, root, NEW));
	});

	it('splits a stack root into a row with the new pane beside the whole stack', () => {
		const root = expectStack(expectSplit(createStackLayout()).first);

		const result = addPaneToUpperRight(root, NEW, 'split-a');

		expect(result).toEqual(split('split-a', 'row', 0.5, root, NEW));
	});

	it('builds the four-pane layout the app builds from an empty workspace', () => {
		const root = split(
			'split-1',
			'row',
			0.5,
			pane('p0', 'p0'),
			split('split-2', 'column', 0.5, pane('p2', 'p2'), pane('p1', 'p1'))
		);

		const result = addPaneToUpperRight(root, pane('p3', 'p3'), 'split-3');

		expect(result).toEqual(
			split(
				'split-1',
				'row',
				0.5,
				pane('p0', 'p0'),
				split(
					'split-2',
					'column',
					0.5,
					split('split-3', 'row', 0.5, pane('p2', 'p2'), pane('p3', 'p3')),
					pane('p1', 'p1')
				)
			)
		);
	});

	it('splits mycam in the nested fixture, placing the new pane to its right', () => {
		const root = createLayout();

		const result = expectSplit(addPaneToUpperRight(root, NEW, 'split-a'));

		expect(result.id).toBe(ids.rootSplit);
		expect(result.first).toEqual(split('split-a', 'row', 0.5, pane(ids.mycam, 'Camera'), NEW));
	});

	it('puts the new pane above when the found pane sits in a row split', () => {
		const root = split('pair', 'row', 0.4, pane('a', 'a'), pane('b', 'b'));

		const result = addPaneToUpperRight(root, NEW, 'split-a');

		expect(result).toEqual(
			split(
				'pair',
				'row',
				0.4,
				pane('a', 'a'),
				split('split-a', 'column', 0.5, NEW, pane('b', 'b'))
			)
		);
	});

	it('keeps the reference of every subtree off the path', () => {
		const root = expectSplit(createLayout());

		const result = expectSplit(addPaneToUpperRight(root, NEW, 'split-a'));

		expect(result).not.toBe(root);
		expect(result.second).toBe(root.second);
	});

	it.each([
		{ name: 'a pane layout', create: createLayout },
		{ name: 'a stack layout', create: createStackLayout }
	])('leaves a deep-frozen input of $name unchanged', ({ create }) => {
		const root = deepFreeze(create());
		const before = structuredClone(root);

		const result = addPaneToUpperRight(root, NEW, 'split-a');

		expect(root).toEqual(before);
		expect(result).not.toBe(root);
	});
});

describe('addPaneToUpperRight with stacks', () => {
	it('stops at a stack and places the new pane beside the whole stack', () => {
		const stackRoot = expectSplit(createStackLayout());
		const root = { ...stackRoot, direction: 'column' as const };

		const result = expectSplit(addPaneToUpperRight(root, NEW, 'split-a'));

		expect(result.first).toEqual(split('split-a', 'row', 0.5, stackRoot.first, NEW));
		expect(result.second).toBe(root.second);
	});

	it('places the new pane above a stack whose parent is a row split', () => {
		const stack = expectStack(expectSplit(createStackLayout()).first);
		const left = pane('left', 'left');
		const root = split('row-split', 'row', 0.5, left, stack);

		const result = addPaneToUpperRight(root, NEW, 'split-a');

		expect(result).toEqual(
			split('row-split', 'row', 0.5, left, split('split-a', 'column', 0.5, NEW, stack))
		);
	});
});

describe('addPaneToUpperRight with float nodes', () => {
	it('makes the new pane the base of a float node root with no base', () => {
		const root = deepFreeze<LayoutNode<PaneData>>({ type: 'float', id: 'f', floats: [ENTRY] });

		const result = addPaneToUpperRight(root, NEW, 'new-split');

		expect(result).toEqual({ type: 'float', id: 'f', base: NEW, floats: [ENTRY] });
	});

	it('makes the new pane the base of a base-less float node reached through a split', () => {
		const left = pane('left', 'left');
		const root = deepFreeze(
			split('s', 'row', 0.5, left, { type: 'float', id: 'f', floats: [ENTRY] })
		);

		const result = addPaneToUpperRight(root, NEW, 'new-split');

		expect(result).toEqual(
			split('s', 'row', 0.5, left, { type: 'float', id: 'f', base: NEW, floats: [ENTRY] })
		);
	});

	it('adds beside the base pane of a float node with a base, to its right', () => {
		const base = pane('b', 'b');
		const root = deepFreeze<LayoutNode<PaneData>>({
			type: 'float',
			id: 'f',
			base,
			floats: [ENTRY]
		});

		const result = addPaneToUpperRight(root, NEW, 'new-split');

		expect(result).toEqual({
			type: 'float',
			id: 'f',
			base: split('new-split', 'row', 0.5, base, NEW),
			floats: [ENTRY]
		});
	});
});
