import { describe, expect, it } from 'vitest';

import { swapSlots } from '../tree.ts';
import { createStackLayout, deepFreeze, pane, stackIds } from '../../../test/layouts.ts';

import type { LayoutNode, PaneNode, SplitDirection } from '../layout.ts';
import type { PaneData } from '../../../test/layouts.ts';

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

const STACK_A = stack(stackIds.stackA, [TAB_A1, TAB_A2, TAB_A3], stackIds.tabA2);
const STACK_B = stack(stackIds.stackB, [TAB_B1, TAB_B2], stackIds.tabB1);

describe('swapSlots', () => {
	it('returns undefined for an undefined root', () => {
		const root = undefined;

		const result = swapSlots<PaneData>(root, stackIds.stackA, stackIds.solo);

		expect(result).toBeUndefined();
	});

	it.each([
		{ name: 'the first id names nothing', first: 'missing', second: stackIds.solo },
		{ name: 'the second id names nothing', first: stackIds.stackA, second: 'missing' },
		{ name: 'the first id names a split', first: stackIds.sideSplit, second: stackIds.solo },
		{ name: 'the second id names a split', first: stackIds.solo, second: stackIds.rootSplit },
		{ name: 'one stack is named twice', first: stackIds.stackA, second: stackIds.stackA },
		{ name: 'two panes share a stack', first: stackIds.tabA1, second: stackIds.tabA3 },
		{ name: 'a pane and its own stack are named', first: stackIds.tabA2, second: stackIds.stackA },
		{ name: 'a stack and its own pane are named', first: stackIds.stackA, second: stackIds.tabA2 },
		{ name: 'an unstacked pane is named twice', first: stackIds.solo, second: stackIds.solo }
	])('returns the same root when $name', ({ first, second }) => {
		const root = createStackLayout();

		const result = swapSlots(root, first, second);

		expect(result).toBe(root);
	});

	it('trades the places of two unstacked panes', () => {
		const root = split('plain-root', 'row', 0.25, pane('p1', 'p1'), pane('p2', 'p2'));

		const result = swapSlots(root, 'p1', 'p2');

		expect(result).toEqual(split('plain-root', 'row', 0.25, pane('p2', 'p2'), pane('p1', 'p1')));
	});

	it.each([
		{ name: 'a stack and an unstacked pane', first: stackIds.stackA, second: stackIds.solo },
		{ name: 'an unstacked pane and a stack', first: stackIds.solo, second: stackIds.stackA },
		{ name: 'a stacked pane and an unstacked pane', first: stackIds.tabA1, second: stackIds.solo }
	])('moves the whole stack with its active pane when trading $name', ({ first, second }) => {
		const root = createStackLayout();

		const result = swapSlots(root, first, second);

		expect(result).toEqual(stackLayout(SOLO, STACK_A, STACK_B));
	});

	it.each([
		{
			name: 'two stacked panes of different stacks',
			first: stackIds.tabA1,
			second: stackIds.tabB2
		},
		{ name: 'a stack and a stacked pane', first: stackIds.stackA, second: stackIds.tabB2 },
		{ name: 'a stacked pane and a stack', first: stackIds.tabB2, second: stackIds.stackA }
	])('trades the two whole stacks for $name', ({ first, second }) => {
		const root = createStackLayout();

		const result = swapSlots(root, first, second);

		expect(result).toEqual(stackLayout(STACK_B, SOLO, STACK_A));
	});

	it.each([
		{ name: 'an unstacked pane and a stack', first: stackIds.solo, second: stackIds.stackA },
		{ name: 'two stacks', first: stackIds.tabA1, second: stackIds.tabB2 }
	])('leaves a deep-frozen input unchanged when trading $name', ({ first, second }) => {
		const root = deepFreeze(createStackLayout());
		const before = structuredClone(root);

		const result = swapSlots(root, first, second);

		expect(root).toEqual(before);
		expect(result).not.toBe(root);
	});
});
