import { describe, expect, it } from 'vitest';

import { moveStack } from '../tree.ts';
import {
	createStackLayout,
	deepFreeze,
	SOLO_PANE,
	split,
	stackIds,
	TAB_STACK_A,
	TAB_STACK_B
} from '../../../test/layouts.ts';

import type { LayoutNode, SplitDirection, SplitKey } from '../layout.ts';
import type { PaneData } from '../../../test/layouts.ts';

const NEW_SPLIT_ID = 'new-split';

describe('moveStack', () => {
	it('returns undefined for an undefined root', () => {
		const root = undefined;

		const result = moveStack<PaneData>(
			root,
			stackIds.stackA,
			stackIds.solo,
			'row',
			'first',
			NEW_SPLIT_ID
		);

		expect(result).toBeUndefined();
	});

	it.each([
		{ name: 'names no node', stackId: 'missing' },
		{ name: 'names a pane', stackId: stackIds.solo },
		{ name: 'names a split', stackId: stackIds.sideSplit }
	])('returns the same root when the stack id $name', ({ stackId }) => {
		const root = createStackLayout();

		const result = moveStack(root, stackId, stackIds.tabA1, 'row', 'first', NEW_SPLIT_ID);

		expect(result).toBe(root);
	});

	it.each([
		{ name: 'names no node', targetId: 'missing' },
		{ name: 'names a stack', targetId: stackIds.stackB },
		{ name: 'names a split', targetId: stackIds.sideSplit }
	])('returns the same root when the target id $name', ({ targetId }) => {
		const root = createStackLayout();

		const result = moveStack(root, stackIds.stackA, targetId, 'row', 'first', NEW_SPLIT_ID);

		expect(result).toBe(root);
	});

	it('returns the same root when the target is in the stack', () => {
		const root = createStackLayout();

		const result = moveStack(root, stackIds.stackA, stackIds.tabA3, 'row', 'first', NEW_SPLIT_ID);

		expect(result).toBe(root);
	});

	it.each<{ direction: SplitDirection; key: SplitKey; expected: LayoutNode<PaneData> }>([
		{
			direction: 'column',
			key: 'second',
			expected: split(
				stackIds.rootSplit,
				'row',
				0.6,
				TAB_STACK_A,
				split(NEW_SPLIT_ID, 'column', 0.5, SOLO_PANE, TAB_STACK_B)
			)
		},
		{
			direction: 'row',
			key: 'first',
			expected: split(
				stackIds.rootSplit,
				'row',
				0.6,
				TAB_STACK_A,
				split(NEW_SPLIT_ID, 'row', 0.5, TAB_STACK_B, SOLO_PANE)
			)
		}
	])(
		'moves a stack beside an unstacked pane as a $direction split with the stack in $key',
		({ direction, key, expected }) => {
			const root = createStackLayout();

			const result = moveStack(root, stackIds.stackB, stackIds.solo, direction, key, NEW_SPLIT_ID);

			expect(result).toEqual(expected);
		}
	);

	it('places the stack beside the target stack as a whole when the target is stacked', () => {
		const root = createStackLayout();

		const result = moveStack(root, stackIds.stackA, stackIds.tabB2, 'row', 'first', NEW_SPLIT_ID);

		expect(result).toEqual(
			split(
				stackIds.sideSplit,
				'column',
				0.4,
				SOLO_PANE,
				split(NEW_SPLIT_ID, 'row', 0.5, TAB_STACK_A, TAB_STACK_B)
			)
		);
	});

	it('leaves the input unchanged', () => {
		const root = deepFreeze(createStackLayout());
		const before = structuredClone(root);

		const result = moveStack(root, stackIds.stackB, stackIds.tabA1, 'row', 'first', NEW_SPLIT_ID);

		expect(root).toEqual(before);
		expect(result).not.toBe(root);
	});
});
