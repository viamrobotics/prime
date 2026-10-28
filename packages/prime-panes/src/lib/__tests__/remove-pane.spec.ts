import { describe, expect, it } from 'vitest';

import { removePane } from '../tree.ts';
import {
	createLayout,
	createStackLayout,
	deepFreeze,
	expectSplit,
	expectStack,
	ids,
	pane,
	stackIds,
	tabIds
} from '../../../test/layouts.ts';

import type { LayoutNode } from '../layout.ts';
import type { PaneData } from '../../../test/layouts.ts';

describe('removePane', () => {
	it('returns undefined for an undefined root', () => {
		expect(removePane<PaneData>(undefined, ids.mycam)).toBeUndefined();
	});

	it('returns the same root when the id is not found', () => {
		const root = createLayout();

		expect(removePane(root, 'missing')).toBe(root);
	});

	it('returns the same root when the id names a split', () => {
		const root = createLayout();

		expect(removePane(root, ids.innerSplit)).toBe(root);
	});

	it('returns undefined when the only pane is removed', () => {
		const root: LayoutNode<PaneData> = { type: 'pane', id: 'only', data: { label: 'only' } };

		expect(removePane(root, 'only')).toBeUndefined();
	});

	it('removes a pane deep in the tree and promotes its sibling', () => {
		const result = expectSplit(removePane(createLayout(), ids.mytimeseries));
		const lower = expectSplit(result.second);

		expect(result.id).toBe(ids.rootSplit);
		expect(lower.id).toBe(ids.lowerSplit);
		expect(lower.first.id).toBe(ids.mysensor);
	});

	it('removes a child of the root so the sibling becomes the root', () => {
		const result = expectSplit(removePane(createLayout(), ids.mycam));

		expect(result.id).toBe(ids.innerSplit);
		expect(result.first.id).toBe(ids.mytimeseries);
	});

	it('keeps the reference of every subtree off the path', () => {
		const root = expectSplit(createLayout());
		const inner = expectSplit(root.second);

		const result = expectSplit(removePane(root, ids.mytimeseries));

		expect(result.first).toBe(root.first);
		expect(result.second).toBe(inner.second);
	});

	it('does not mutate a deep-frozen input', () => {
		const root = deepFreeze(createLayout());
		const before = structuredClone(root);

		expect(() => removePane(root, ids.mysensor)).not.toThrow();
		expect(root).toEqual(before);
	});
});

describe('removePane with stacks', () => {
	it('removes a stacked pane from its stack and keeps the active pane', () => {
		const result = expectSplit(removePane(createStackLayout(), stackIds.tabA1));
		const stack = expectStack(result.first);

		expect(tabIds(stack)).toEqual([stackIds.tabA2, stackIds.tabA3]);
		expect(stack.activeId).toBe(stackIds.tabA2);
	});

	it('makes the next pane active when the active pane leaves', () => {
		const result = expectSplit(removePane(createStackLayout(), stackIds.tabA2));
		const stack = expectStack(result.first);

		expect(tabIds(stack)).toEqual([stackIds.tabA1, stackIds.tabA3]);
		expect(stack.activeId).toBe(stackIds.tabA3);
	});

	it('makes the previous pane active when the last active pane leaves', () => {
		const root: LayoutNode<PaneData> = {
			type: 'stack',
			id: 'tabs',
			panes: [pane('one', 'one'), pane('two', 'two'), pane('three', 'three')],
			activeId: 'three'
		};
		const stack = expectStack(removePane(root, 'three'));

		expect(tabIds(stack)).toEqual(['one', 'two']);
		expect(stack.activeId).toBe('two');
	});

	it('collapses a stack left with one pane to that pane', () => {
		const result = expectSplit(removePane(createStackLayout(), stackIds.tabB1));
		const side = expectSplit(result.second);

		expect(side.second.type).toBe('pane');
		expect(side.second.id).toBe(stackIds.tabB2);
	});

	it('collapses a root stack left with one pane to the pane as the root', () => {
		const root: LayoutNode<PaneData> = {
			type: 'stack',
			id: 'tabs',
			panes: [pane('one', 'one'), pane('two', 'two')],
			activeId: 'one'
		};

		expect(removePane(root, 'two')).toEqual({ type: 'pane', id: 'one', data: { label: 'one' } });
	});

	it('returns the same root when the id names a stack', () => {
		const root = createStackLayout();
		expect(removePane(root, stackIds.stackA)).toBe(root);
	});

	it.each([stackIds.tabA2, stackIds.tabB1])(
		'does not mutate a deep-frozen input removing %s',
		(id) => {
			const root = deepFreeze(createStackLayout());
			const before = structuredClone(root);

			expect(() => removePane(root, id)).not.toThrow();
			expect(root).toEqual(before);
		}
	);
});
