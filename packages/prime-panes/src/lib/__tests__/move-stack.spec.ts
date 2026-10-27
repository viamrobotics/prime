import { describe, expect, it } from 'vitest';

import { moveStack } from '../tree.ts';
import {
	createStackLayout,
	deepFreeze,
	expectSplit,
	expectStack,
	stackIds
} from '../../../test/layouts.ts';

import type { PaneData } from '../../../test/layouts.ts';

const NEW_SPLIT_ID = 'new-split';

describe('moveStack', () => {
	it('returns undefined for an undefined root', () => {
		expect(
			moveStack<PaneData>(undefined, stackIds.stackA, stackIds.solo, 'row', 'first', NEW_SPLIT_ID)
		).toBeUndefined();
	});

	it.each(['missing', stackIds.solo, stackIds.sideSplit])(
		'returns the same root when the stack id is %s',
		(stackId) => {
			const root = createStackLayout();
			expect(moveStack(root, stackId, stackIds.tabA1, 'row', 'first', NEW_SPLIT_ID)).toBe(root);
		}
	);

	it.each(['missing', stackIds.stackB])(
		'returns the same root when the target id is %s',
		(targetId) => {
			const root = createStackLayout();
			expect(moveStack(root, stackIds.stackA, targetId, 'row', 'first', NEW_SPLIT_ID)).toBe(root);
		}
	);

	it('returns the same root when the target is in the stack', () => {
		const root = createStackLayout();
		expect(moveStack(root, stackIds.stackA, stackIds.tabA3, 'row', 'first', NEW_SPLIT_ID)).toBe(
			root
		);
	});

	it('moves a stack beside an unstacked pane and promotes its old sibling', () => {
		const result = expectSplit(
			moveStack(
				createStackLayout(),
				stackIds.stackB,
				stackIds.solo,
				'column',
				'second',
				NEW_SPLIT_ID
			)
		);
		const created = expectSplit(result.second);

		expect(result.id).toBe(stackIds.rootSplit);
		expect(result.first.id).toBe(stackIds.stackA);
		expect(created.id).toBe(NEW_SPLIT_ID);
		expect(created.direction).toBe('column');
		expect(created.ratio).toBe(0.5);
		expect(created.first.id).toBe(stackIds.solo);
		expect(created.second.id).toBe(stackIds.stackB);
		expect(expectStack(created.second).activeId).toBe(stackIds.tabB1);
	});

	it('places the stack beside the target stack as a whole when the target is stacked', () => {
		const result = expectSplit(
			moveStack(createStackLayout(), stackIds.stackA, stackIds.tabB2, 'row', 'first', NEW_SPLIT_ID)
		);
		const created = expectSplit(result.second);

		expect(result.id).toBe(stackIds.sideSplit);
		expect(result.first.id).toBe(stackIds.solo);
		expect(created.first.id).toBe(stackIds.stackA);
		expect(created.second.id).toBe(stackIds.stackB);
		expect(expectStack(created.second).panes).toHaveLength(2);
	});

	it('does not mutate a deep-frozen input', () => {
		const root = deepFreeze(createStackLayout());
		expect(() =>
			moveStack(root, stackIds.stackB, stackIds.tabA1, 'row', 'first', NEW_SPLIT_ID)
		).not.toThrow();
	});
});
