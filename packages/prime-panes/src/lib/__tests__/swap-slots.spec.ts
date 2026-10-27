import { describe, expect, it } from 'vitest';

import { swapSlots } from '../tree.ts';
import {
	createStackLayout,
	deepFreeze,
	expectSplit,
	expectStack,
	stackIds
} from '../../../test/layouts.ts';

import type { LayoutNode } from '../layout.ts';
import type { PaneData } from '../../../test/layouts.ts';

function createPlainLayout(): LayoutNode<PaneData> {
	return {
		type: 'split',
		id: 'plain-root',
		direction: 'row',
		ratio: 0.25,
		first: { type: 'pane', id: 'p1', data: { label: 'p1' } },
		second: { type: 'pane', id: 'p2', data: { label: 'p2' } }
	};
}

describe('swapSlots', () => {
	it('returns undefined for an undefined root', () => {
		expect(swapSlots<PaneData>(undefined, stackIds.stackA, stackIds.solo)).toBeUndefined();
	});

	it('returns the same root when the first id names nothing', () => {
		const root = createStackLayout();
		expect(swapSlots(root, 'missing', stackIds.solo)).toBe(root);
	});

	it('returns the same root when the second id names nothing', () => {
		const root = createStackLayout();
		expect(swapSlots(root, stackIds.stackA, 'missing')).toBe(root);
	});

	it.each([
		{ name: 'one stack named twice', first: stackIds.stackA, second: stackIds.stackA },
		{ name: 'two panes of one stack', first: stackIds.tabA1, second: stackIds.tabA3 },
		{ name: 'a pane and its own stack', first: stackIds.tabA2, second: stackIds.stackA },
		{ name: 'a stack and its own pane', first: stackIds.stackA, second: stackIds.tabA2 },
		{ name: 'an unstacked pane named twice', first: stackIds.solo, second: stackIds.solo }
	])('returns the same root for $name', ({ first, second }) => {
		const root = createStackLayout();
		expect(swapSlots(root, first, second)).toBe(root);
	});

	it.each([
		{ name: 'a split first id', first: stackIds.sideSplit, second: stackIds.solo },
		{ name: 'a split second id', first: stackIds.solo, second: stackIds.rootSplit }
	])('returns the same root for $name', ({ first, second }) => {
		const root = createStackLayout();
		expect(swapSlots(root, first, second)).toBe(root);
	});

	it('trades the places of two unstacked panes', () => {
		const result = expectSplit(swapSlots(createPlainLayout(), 'p1', 'p2'));

		expect(result.first.id).toBe('p2');
		expect(result.second.id).toBe('p1');
	});

	it.each([
		{ first: stackIds.stackA, second: stackIds.solo },
		{ first: stackIds.solo, second: stackIds.stackA }
	])('trades an unstacked pane with a stack for ($first, $second)', ({ first, second }) => {
		const result = expectSplit(swapSlots(createStackLayout(), first, second));
		const side = expectSplit(result.second);

		expect(result.first.id).toBe(stackIds.solo);
		expect(side.first.id).toBe(stackIds.stackA);
		expect(expectStack(side.first).activeId).toBe(stackIds.tabA2);
		expect(side.second.id).toBe(stackIds.stackB);
	});

	it('moves the whole stack when a stacked pane trades with an unstacked pane', () => {
		const result = expectSplit(swapSlots(createStackLayout(), stackIds.tabA1, stackIds.solo));
		const side = expectSplit(result.second);

		expect(result.first.id).toBe(stackIds.solo);
		expect(expectStack(side.first).id).toBe(stackIds.stackA);
		expect(expectStack(side.first).panes).toHaveLength(3);
	});

	it('swaps two stacks when two stacked panes come from different stacks', () => {
		const result = expectSplit(swapSlots(createStackLayout(), stackIds.tabA1, stackIds.tabB2));
		const side = expectSplit(result.second);

		expect(expectStack(result.first).id).toBe(stackIds.stackB);
		expect(expectStack(result.first).panes).toHaveLength(2);
		expect(side.first.id).toBe(stackIds.solo);
		expect(expectStack(side.second).id).toBe(stackIds.stackA);
		expect(expectStack(side.second).panes).toHaveLength(3);
	});

	it('swaps a stack with the whole stack of a stacked pane', () => {
		const result = expectSplit(swapSlots(createStackLayout(), stackIds.stackA, stackIds.tabB2));
		const side = expectSplit(result.second);

		expect(expectStack(result.first).id).toBe(stackIds.stackB);
		expect(expectStack(side.second).id).toBe(stackIds.stackA);
	});

	it('keeps each split ratio', () => {
		const result = expectSplit(swapSlots(createStackLayout(), stackIds.tabA1, stackIds.tabB2));

		expect(result.ratio).toBe(0.6);
		expect(expectSplit(result.second).ratio).toBe(0.4);
	});

	it('does not throw on a deep-frozen input', () => {
		const root = deepFreeze(createStackLayout());
		expect(() => swapSlots(root, stackIds.stackA, stackIds.tabB1)).not.toThrow();
	});
});
