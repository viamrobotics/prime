import { describe, expect, it } from 'vitest';

import { updatePaneData } from '../tree.ts';
import { createLayout, deepFreeze, expectSplit, ids } from './layout-fixture.ts';

import type { PaneData } from './layout-fixture.ts';

describe('updatePaneData', () => {
	it('returns undefined for an undefined root', () => {
		expect(updatePaneData<PaneData>(undefined, ids.mycam, { label: 'x' })).toBeUndefined();
	});

	it('puts the new data on the pane in the result', () => {
		const data = { label: 'Renamed' };

		const result = expectSplit(updatePaneData(createLayout(), ids.mysensor, data));
		const lower = expectSplit(expectSplit(result.second).second);

		expect(lower.first).toEqual({ type: 'pane', id: ids.mysensor, data: { label: 'Renamed' } });
		expect(lower.first).toMatchObject({ data });
	});

	it('keeps the reference of every subtree off the path', () => {
		const root = expectSplit(createLayout());
		const inner = expectSplit(root.second);

		const result = expectSplit(updatePaneData(root, ids.mytimeseries, { label: 'Renamed' }));
		const resultInner = expectSplit(result.second);

		expect(result).not.toBe(root);
		expect(result.first).toBe(root.first);
		expect(resultInner.second).toBe(inner.second);
	});

	it('returns the same root when the id is not found', () => {
		const root = createLayout();

		expect(updatePaneData(root, 'missing', { label: 'x' })).toBe(root);
	});

	it('returns the same root when the id names a split', () => {
		const root = createLayout();

		expect(updatePaneData(root, ids.innerSplit, { label: 'x' })).toBe(root);
	});

	it('returns the same root when the data is the pane data by reference', () => {
		const root = expectSplit(createLayout());
		const data = root.first.type === 'pane' ? root.first.data : { label: '' };

		expect(updatePaneData(root, ids.mycam, data)).toBe(root);
	});

	it('replaces data that is equal by value but a different reference', () => {
		const root = createLayout();

		expect(updatePaneData(root, ids.mycam, { label: 'Camera' })).not.toBe(root);
	});

	it('does not mutate a deep-frozen input', () => {
		const root = deepFreeze(createLayout());
		const before = structuredClone(root);

		expect(() => updatePaneData(root, ids.mycam, { label: 'x' })).not.toThrow();
		expect(root).toEqual(before);
	});
});
