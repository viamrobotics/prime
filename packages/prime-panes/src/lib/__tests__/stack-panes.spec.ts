import { describe, expect, it } from 'vitest';

import { stackPanes } from '../tree.ts';
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

const NEW_STACK_ID = 'new-stack';

describe('stackPanes', () => {
	it('returns undefined for an undefined root', () => {
		expect(
			stackPanes<PaneData>(undefined, stackIds.solo, stackIds.tabA1, NEW_STACK_ID)
		).toBeUndefined();
	});

	it.each([
		{ kind: 'missing', target: 'missing' },
		{ kind: 'a stack', target: stackIds.stackA },
		{ kind: 'a split', target: stackIds.sideSplit }
	])('returns the same root when the target is $kind', ({ target }) => {
		const root = createStackLayout();
		expect(stackPanes(root, target, stackIds.solo, NEW_STACK_ID)).toBe(root);
	});

	it.each([
		{ kind: 'missing', source: 'missing' },
		{ kind: 'a split', source: stackIds.sideSplit }
	])('returns the same root when the source is $kind', ({ source }) => {
		const root = createStackLayout();
		expect(stackPanes(root, stackIds.solo, source, NEW_STACK_ID)).toBe(root);
	});

	it('returns the same root when the target is the source', () => {
		const root = createStackLayout();
		expect(stackPanes(root, stackIds.solo, stackIds.solo, NEW_STACK_ID)).toBe(root);
	});

	it('returns the same root when the target already shares a stack with a source pane', () => {
		const root = createStackLayout();
		expect(stackPanes(root, stackIds.tabA1, stackIds.tabA3, NEW_STACK_ID)).toBe(root);
	});

	it('returns the same root when the target is in the source stack', () => {
		const root = createStackLayout();
		expect(stackPanes(root, stackIds.tabA1, stackIds.stackA, NEW_STACK_ID)).toBe(root);
	});

	it('merges a plain pane into a plain pane as a new stack showing the source', () => {
		const root = createLayout();
		const result = expectSplit(stackPanes(root, ids.mycam, ids.mycam2, NEW_STACK_ID));
		const stack = expectStack(result.first);

		expect(stack.id).toBe(NEW_STACK_ID);
		expect(tabIds(stack)).toEqual([ids.mycam, ids.mycam2]);
		expect(stack.activeId).toBe(ids.mycam2);
		const inner = expectSplit(result.second);
		expect(inner.first.id).toBe(ids.mytimeseries);
		expect(inner.second.id).toBe(ids.mysensor);
	});

	it('appends a plain pane to a target stack and shows it', () => {
		const result = expectSplit(
			stackPanes(createStackLayout(), stackIds.tabA1, stackIds.solo, NEW_STACK_ID)
		);
		const stack = expectStack(result.first);

		expect(stack.id).toBe(stackIds.stackA);
		expect(tabIds(stack)).toEqual([stackIds.tabA1, stackIds.tabA2, stackIds.tabA3, stackIds.solo]);
		expect(stack.activeId).toBe(stackIds.solo);
		expect(expectStack(result.second).id).toBe(stackIds.stackB);
	});

	it('merges a stack into a plain pane, keeping the source order and active pane', () => {
		const result = expectSplit(
			stackPanes(createStackLayout(), stackIds.solo, stackIds.stackB, NEW_STACK_ID)
		);
		const stack = expectStack(result.second);

		expect(stack.id).toBe(NEW_STACK_ID);
		expect(tabIds(stack)).toEqual([stackIds.solo, stackIds.tabB1, stackIds.tabB2]);
		expect(stack.activeId).toBe(stackIds.tabB1);
	});

	it('merges a stack into a stack and shows the source active pane', () => {
		const result = expectSplit(
			stackPanes(createStackLayout(), stackIds.tabA1, stackIds.stackB, NEW_STACK_ID)
		);
		const stack = expectStack(result.first);

		expect(stack.id).toBe(stackIds.stackA);
		expect(tabIds(stack)).toEqual([
			stackIds.tabA1,
			stackIds.tabA2,
			stackIds.tabA3,
			stackIds.tabB1,
			stackIds.tabB2
		]);
		expect(stack.activeId).toBe(stackIds.tabB1);
		expect(result.second.id).toBe(stackIds.solo);
	});

	it('takes a stacked pane out of its stack and applies the active fallback', () => {
		const result = expectSplit(
			stackPanes(createStackLayout(), stackIds.solo, stackIds.tabA2, NEW_STACK_ID)
		);
		const sourceStack = expectStack(result.first);
		const merged = expectStack(expectSplit(result.second).first);

		expect(tabIds(sourceStack)).toEqual([stackIds.tabA1, stackIds.tabA3]);
		expect(sourceStack.activeId).toBe(stackIds.tabA3);
		expect(tabIds(merged)).toEqual([stackIds.solo, stackIds.tabA2]);
		expect(merged.activeId).toBe(stackIds.tabA2);
	});

	it('collapses a source stack left with one pane to that pane', () => {
		const result = expectSplit(
			stackPanes(createStackLayout(), stackIds.solo, stackIds.tabB2, NEW_STACK_ID)
		);
		const side = expectSplit(result.second);

		expect(side.second.type).toBe('pane');
		expect(side.second.id).toBe(stackIds.tabB1);
		expect(tabIds(expectStack(side.first))).toEqual([stackIds.solo, stackIds.tabB2]);
	});

	it.each([
		{
			name: 'a stack into a stack',
			target: stackIds.tabA1,
			source: stackIds.stackB,
			index: undefined
		},
		{
			name: 'a stacked pane into a plain pane',
			target: stackIds.solo,
			source: stackIds.tabA2,
			index: undefined
		},
		{
			name: 'a plain pane into a stack at an index',
			target: stackIds.tabA1,
			source: stackIds.solo,
			index: 1
		}
	])('does not mutate a deep-frozen input when stacking $name', ({ target, source, index }) => {
		const root = deepFreeze(createStackLayout());
		expect(() => stackPanes(root, target, source, NEW_STACK_ID, index)).not.toThrow();
	});
});

describe('stackPanes with an index', () => {
	function stackedTabs(index?: number): string[] {
		const result = expectSplit(
			stackPanes(createStackLayout(), stackIds.tabA1, stackIds.solo, NEW_STACK_ID, index)
		);
		return tabIds(expectStack(result.first));
	}

	it.each([
		{ index: 0, expected: ['solo', 'tab-a1', 'tab-a2', 'tab-a3'] },
		{ index: 2, expected: ['tab-a1', 'tab-a2', 'solo', 'tab-a3'] },
		{ index: 3, expected: ['tab-a1', 'tab-a2', 'tab-a3', 'solo'] },
		{ index: 99, expected: ['tab-a1', 'tab-a2', 'tab-a3', 'solo'] },
		{ index: -5, expected: ['solo', 'tab-a1', 'tab-a2', 'tab-a3'] },
		{ index: undefined, expected: ['tab-a1', 'tab-a2', 'tab-a3', 'solo'] }
	])('puts the source at index $index of a stacked target', ({ index, expected }) => {
		expect(stackedTabs(index)).toEqual(expected);
	});

	it.each([
		{ index: 0, expected: [ids.mycam2, ids.mycam] },
		{ index: 1, expected: [ids.mycam, ids.mycam2] }
	])('puts the source at index $index of an unstacked target', ({ index, expected }) => {
		const result = expectSplit(
			stackPanes(createLayout(), ids.mycam, ids.mycam2, NEW_STACK_ID, index)
		);
		const stack = expectStack(result.first);

		expect(tabIds(stack)).toEqual(expected);
		expect(stack.activeId).toBe(ids.mycam2);
	});

	it('inserts a whole source stack at an index in its own order', () => {
		const result = expectSplit(
			stackPanes(createStackLayout(), stackIds.tabA1, stackIds.stackB, NEW_STACK_ID, 1)
		);
		const stack = expectStack(result.first);

		expect(tabIds(stack)).toEqual(['tab-a1', 'tab-b1', 'tab-b2', 'tab-a2', 'tab-a3']);
		expect(stack.activeId).toBe(stackIds.tabB1);
	});

	it('inserts a whole source stack before an unstacked target at index 0', () => {
		const result = expectSplit(
			stackPanes(createStackLayout(), stackIds.solo, stackIds.stackB, NEW_STACK_ID, 0)
		);

		expect(tabIds(expectStack(result.second))).toEqual(['tab-b1', 'tab-b2', 'solo']);
	});
});
