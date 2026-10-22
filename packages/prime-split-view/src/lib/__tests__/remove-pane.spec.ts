import { describe, expect, it } from 'vitest';

import { removePane } from '../tree.ts';
import { createLayout, deepFreeze, expectSplit, ids } from './layout-fixture.ts';

import type { LayoutNode } from '../layout.ts';
import type { PaneData } from './layout-fixture.ts';

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
