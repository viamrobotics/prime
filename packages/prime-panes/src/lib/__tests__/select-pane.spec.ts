import { describe, expect, it } from 'vitest';

import { selectPane } from '../tree.ts';
import {
	createStackLayout,
	deepFreeze,
	expectSplit,
	expectStack,
	pane,
	stackIds
} from '../../../test/layouts.ts';

import type { LayoutNode } from '../layout.ts';
import type { PaneData } from '../../../test/layouts.ts';

describe('selectPane', () => {
	it('returns undefined for an undefined root', () => {
		expect(selectPane<PaneData>(undefined, stackIds.tabA1)).toBeUndefined();
	});

	it('makes a stacked pane its stack active pane', () => {
		const result = expectSplit(selectPane(createStackLayout(), stackIds.tabA3));
		expect(expectStack(result.first).activeId).toBe(stackIds.tabA3);
	});

	it('leaves the other stack and the subtrees off the path alone', () => {
		const root = expectSplit(createStackLayout());
		const result = expectSplit(selectPane(root, stackIds.tabA3));
		expect(result.second).toBe(root.second);
	});

	it('returns the same root when the pane is already active', () => {
		const root = createStackLayout();
		expect(selectPane(root, stackIds.tabA2)).toBe(root);
	});

	it.each(['missing', stackIds.solo, stackIds.stackA, stackIds.sideSplit])(
		'returns the same root for the id %s',
		(id) => {
			const root = createStackLayout();
			expect(selectPane(root, id)).toBe(root);
		}
	);

	it('makes a pane active when the stack active id names a pane that left', () => {
		const root: LayoutNode<PaneData> = {
			type: 'stack',
			id: 'tabs',
			panes: [pane('one', 'one'), pane('two', 'two')],
			activeId: 'gone'
		};

		expect(expectStack(selectPane(root, 'two')).activeId).toBe('two');
	});

	it('does not mutate a deep-frozen input', () => {
		const root = deepFreeze(createStackLayout());
		expect(() => selectPane(root, stackIds.tabA3)).not.toThrow();
	});
});
