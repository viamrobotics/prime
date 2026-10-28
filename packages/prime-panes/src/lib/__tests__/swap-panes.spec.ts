import { describe, expect, it } from 'vitest';

import { swapPanes } from '../tree.ts';
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

import type { PaneData } from '../../../test/layouts.ts';

describe('swapPanes', () => {
	it('returns undefined for an undefined root', () => {
		expect(swapPanes<PaneData>(undefined, ids.mycam, ids.mysensor)).toBeUndefined();
	});

	it.each([
		{ name: 'a missing first id', create: createLayout, first: 'missing', second: ids.mycam },
		{ name: 'a missing second id', create: createLayout, first: ids.mycam, second: 'missing' },
		{ name: 'a split first id', create: createLayout, first: ids.innerSplit, second: ids.mycam },
		{ name: 'a split second id', create: createLayout, first: ids.mycam, second: ids.rootSplit },
		{
			name: 'a stack first id',
			create: createStackLayout,
			first: stackIds.stackA,
			second: stackIds.solo
		},
		{
			name: 'a stack second id',
			create: createStackLayout,
			first: stackIds.solo,
			second: stackIds.stackB
		}
	])('returns the same root for $name', ({ create, first, second }) => {
		const root = create();
		expect(swapPanes(root, first, second)).toBe(root);
	});

	it('returns the same root when the ids are equal', () => {
		const root = createLayout();
		expect(swapPanes(root, ids.mycam, ids.mycam)).toBe(root);
	});

	it('swaps two panes in different splits', () => {
		const root = createLayout();
		const swapped = expectSplit(swapPanes(root, ids.mycam, ids.mytimeseries));
		const inner = expectSplit(swapped.second);

		expect(swapped.first.id).toBe(ids.mytimeseries);
		expect(inner.first.id).toBe(ids.mycam);
	});

	it('keeps each split ratio and direction in place', () => {
		const root = createLayout();
		const swapped = expectSplit(swapPanes(root, ids.mycam, ids.mytimeseries));
		const inner = expectSplit(swapped.second);

		expect(swapped.ratio).toBe(0.3);
		expect(swapped.direction).toBe('column');
		expect(inner.ratio).toBe(0.6);
		expect(inner.direction).toBe('row');
	});

	it('exchanges two children of the same split and keeps its ratio', () => {
		const root = createLayout();
		const swapped = expectSplit(swapPanes(root, ids.mysensor, ids.mycam2));
		const lower = expectSplit(expectSplit(swapped.second).second);

		expect(lower.id).toBe(ids.lowerSplit);
		expect(lower.first.id).toBe(ids.mycam2);
		expect(lower.second.id).toBe(ids.mysensor);
		expect(lower.ratio).toBe(0.5);
	});

	it.each([
		{ first: ids.mycam, second: ids.mysensor },
		{ first: ids.mysensor, second: ids.mycam }
	])('puts the panes in the same places for ($first, $second)', ({ first, second }) => {
		const result = expectSplit(swapPanes(createLayout(), first, second));
		const inner = expectSplit(result.second);
		const lower = expectSplit(inner.second);

		expect(result.first.id).toBe('mysensor');
		expect(inner.first.id).toBe('mytimeseries');
		expect(lower.first.id).toBe('mycam');
		expect(lower.second.id).toBe('mycam2');
	});

	it('keeps the reference of every subtree off the changed paths', () => {
		const root = expectSplit(createLayout());
		const inner = expectSplit(root.second);
		const swapped = expectSplit(swapPanes(root, ids.mycam, ids.mytimeseries));
		const swappedInner = expectSplit(swapped.second);

		expect(swapped).not.toBe(root);
		expect(swappedInner.second).toBe(inner.second);
		expect(swapped.first).toBe(inner.first);
		expect(swappedInner.first).toBe(root.first);
	});

	it('copies only the splits on the path to the swapped panes', () => {
		const root = expectSplit(createLayout());
		const swapped = expectSplit(swapPanes(root, ids.mysensor, ids.mycam2));

		expect(swapped.first).toBe(root.first);
		expect(swapped.second).not.toBe(root.second);
	});

	it('does not mutate a deep-frozen input', () => {
		const root = deepFreeze(createLayout());
		const before = structuredClone(root);

		expect(() => swapPanes(root, ids.mycam, ids.mycam2)).not.toThrow();
		expect(root).toEqual(before);
	});
});

describe('swapPanes with stacks', () => {
	it('swaps two panes of the same stack and keeps activeId on its position', () => {
		const result = expectSplit(swapPanes(createStackLayout(), stackIds.tabA1, stackIds.tabA2));
		const stack = expectStack(result.first);

		expect(tabIds(stack)).toEqual([stackIds.tabA2, stackIds.tabA1, stackIds.tabA3]);
		expect(stack.activeId).toBe(stackIds.tabA1);
	});

	it('keeps activeId when the swapped panes are not in the shown position', () => {
		const result = expectSplit(swapPanes(createStackLayout(), stackIds.tabA1, stackIds.tabA3));
		const stack = expectStack(result.first);

		expect(tabIds(stack)).toEqual([stackIds.tabA3, stackIds.tabA2, stackIds.tabA1]);
		expect(stack.activeId).toBe(stackIds.tabA2);
	});

	it('swaps a plain pane into a stack active position and shows it', () => {
		const result = expectSplit(swapPanes(createStackLayout(), stackIds.solo, stackIds.tabA2));
		const stack = expectStack(result.first);
		const side = expectSplit(result.second);

		expect(tabIds(stack)).toEqual([stackIds.tabA1, stackIds.solo, stackIds.tabA3]);
		expect(stack.activeId).toBe(stackIds.solo);
		expect(side.first.id).toBe(stackIds.tabA2);
		expect(result.ratio).toBe(0.6);
		expect(side.ratio).toBe(0.4);
	});

	it('swaps a plain pane into an inactive stack position without changing the shown pane', () => {
		const result = expectSplit(swapPanes(createStackLayout(), stackIds.solo, stackIds.tabA3));
		const stack = expectStack(result.first);

		expect(tabIds(stack)).toEqual([stackIds.tabA1, stackIds.tabA2, stackIds.solo]);
		expect(stack.activeId).toBe(stackIds.tabA2);
	});

	it('swaps panes between two stacks', () => {
		const result = expectSplit(swapPanes(createStackLayout(), stackIds.tabA1, stackIds.tabB1));
		const stackA = expectStack(result.first);
		const stackB = expectStack(expectSplit(result.second).second);

		expect(tabIds(stackA)).toEqual([stackIds.tabB1, stackIds.tabA2, stackIds.tabA3]);
		expect(stackA.activeId).toBe(stackIds.tabA2);
		expect(tabIds(stackB)).toEqual([stackIds.tabA1, stackIds.tabB2]);
		expect(stackB.activeId).toBe(stackIds.tabA1);
	});

	it.each([
		{ name: 'a plain pane with a stacked pane', first: stackIds.solo, second: stackIds.tabA2 },
		{ name: 'two panes of one stack', first: stackIds.tabA1, second: stackIds.tabA2 }
	])('does not mutate a deep-frozen input when swapping $name', ({ first, second }) => {
		const root = deepFreeze(createStackLayout());
		expect(() => swapPanes(root, first, second)).not.toThrow();
	});
});
