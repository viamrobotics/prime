import { describe, expect, it } from 'vitest';

import { childrenOf, removeChild, replaceChild, withChildren } from '../node-kind.ts';
import { CAM_A, CAM_B, CAM_C, CAMERAS, SOLO, expectStack } from '../../../test/layouts.ts';

import type { SplitNode } from '../layout.ts';
import type { PaneData } from '../../../test/layouts.ts';

const SPLIT: SplitNode<PaneData> = {
	type: 'split',
	id: 'split',
	direction: 'row',
	ratio: 0.5,
	first: CAM_A,
	second: CAM_B
};

describe('node-kind registry', () => {
	it('lists no children for a pane', () => {
		expect(childrenOf(SOLO)).toEqual([]);
	});

	it.each([
		['split', SPLIT, [CAM_A, CAM_B]],
		['stack', CAMERAS, [CAM_A, CAM_B, CAM_C]]
	])('lists the children of a %s in order', (_kind, node, expected) => {
		expect(childrenOf(node)).toEqual(expected);
	});

	it.each([
		['split', SPLIT, [CAM_A, CAM_B]],
		['stack', CAMERAS, [CAM_A, CAM_B, CAM_C]]
	])('returns the same %s when every child is the same reference', (_kind, node, children) => {
		expect(withChildren(node, children)).toBe(node);
	});

	it.each([
		['split', SPLIT, 0, CAM_A],
		['stack', CAMERAS, 2, CAM_C]
	])(
		'replaceChild returns the same %s for the child already there',
		(_kind, node, index, child) => {
			expect(replaceChild(node, index, child)).toBe(node);
		}
	);

	it('keeps the shown position active when the panes of a stack are exchanged', () => {
		const exchanged = expectStack(withChildren(CAMERAS, [CAM_B, CAM_A, CAM_C]));

		expect(exchanged.activeId).toBe('cam-b');
	});

	it('throws when a stack is given a node that is not a pane', () => {
		expect(() => withChildren(CAMERAS, [CAM_A, SPLIT, CAM_C])).toThrow('A stack holds only panes.');
	});

	it.each([
		[0, 'cam-b'],
		[1, 'cam-a']
	])('collapses a split without child %i to its sibling', (index, siblingId) => {
		expect(removeChild(SPLIT, index)?.id).toBe(siblingId);
	});
});
