import { describe, expect, it } from 'vitest';

import { swapPanes } from '../tree.ts';
import { createLayout, deepFreeze, expectSplit, ids } from './layout-fixture.ts';

import type { LayoutNode } from '../layout.ts';
import type { PaneData } from './layout-fixture.ts';

describe('swapPanes', () => {
	it('returns undefined for an undefined root', () => {
		expect(swapPanes<PaneData>(undefined, ids.mycam, ids.mysensor)).toBeUndefined();
	});

	it('returns the same root when an id is not found', () => {
		const root = createLayout();
		expect(swapPanes(root, 'missing', ids.mycam)).toBe(root);
		expect(swapPanes(root, ids.mycam, 'missing')).toBe(root);
		expect(swapPanes(root, 'missing', 'also-missing')).toBe(root);
	});

	it('returns the same root when the ids are equal', () => {
		const root = createLayout();
		expect(swapPanes(root, ids.mycam, ids.mycam)).toBe(root);
	});

	it('returns the same root when an id names a split', () => {
		const root = createLayout();
		expect(swapPanes(root, ids.innerSplit, ids.mycam)).toBe(root);
		expect(swapPanes(root, ids.mycam, ids.rootSplit)).toBe(root);
	});

	it('returns the same root when one id is the root of a single-pane tree', () => {
		const root: LayoutNode<PaneData> = { type: 'pane', id: 'only', data: { label: 'Only' } };
		expect(swapPanes(root, 'only', ids.mycam)).toBe(root);
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

	it('gives the same result whichever order the ids come in', () => {
		expect(swapPanes(createLayout(), ids.mycam, ids.mysensor)).toEqual(
			swapPanes(createLayout(), ids.mysensor, ids.mycam)
		);
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
