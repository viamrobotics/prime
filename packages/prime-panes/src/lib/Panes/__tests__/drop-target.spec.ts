import { describe, expect, it } from 'vitest';

import type { LayoutNode, PaneNode, StackNode } from '../../layout.ts';
import { hasDestination, paneIdToSkip, resolveDropTarget } from '../drop-target.ts';

const pane = (id: string): PaneNode<unknown> => ({ type: 'pane', id, data: undefined });
const stack = (id: string, paneIds: string[], activeId = paneIds[0]): StackNode<unknown> => ({
	type: 'stack',
	id,
	panes: paneIds.map(pane),
	activeId
});
const split = (first: LayoutNode<unknown>, second: LayoutNode<unknown>): LayoutNode<unknown> => ({
	type: 'split',
	id: 'root',
	direction: 'row',
	ratio: 0.5,
	first,
	second
});

describe('resolveDropTarget', () => {
	const own = stack('s1', ['a', 'b', 'c']);
	const other = stack('s2', ['x', 'y']);

	it('ignores a stack dragged over its own stack', () => {
		expect(resolveDropTarget({ type: 'stack', id: 's1' }, pane('a'), own, 'left', undefined)).toBe(
			undefined
		);
	});

	it.each([
		['another stack', other, 'x'],
		['a lone pane', undefined, 'p']
	])('targets the node when a stack is dragged over %s', (_name, over, nodeId) => {
		expect(resolveDropTarget({ type: 'stack', id: 's1' }, pane(nodeId), over, 'top', 1)).toEqual({
			targetId: nodeId,
			region: 'top',
			index: 1
		});
	});

	it('ignores center of its own stack for a pane', () => {
		expect(resolveDropTarget({ type: 'pane', id: 'b' }, pane('a'), own, 'center', 0)).toBe(
			undefined
		);
	});

	it('reorders through the source pane on the stack region of its own stack', () => {
		expect(resolveDropTarget({ type: 'pane', id: 'b' }, pane('a'), own, 'stack', 2)).toEqual({
			targetId: 'b',
			region: 'stack',
			index: 2
		});
	});

	it('places an edge of its own stack through the first stack-mate', () => {
		expect(resolveDropTarget({ type: 'pane', id: 'a' }, pane('a'), own, 'right', 2)).toEqual({
			targetId: 'b',
			region: 'right'
		});
	});

	it('skips the source when picking a stack-mate', () => {
		expect(resolveDropTarget({ type: 'pane', id: 'b' }, pane('b'), own, 'left', undefined)).toEqual(
			{ targetId: 'a', region: 'left' }
		);
	});

	it('reads center for a pane over itself unstacked', () => {
		expect(resolveDropTarget({ type: 'pane', id: 'p' }, pane('p'), undefined, 'left', 3)).toEqual({
			targetId: 'p',
			region: 'center'
		});
	});

	it.each([
		['left', undefined],
		['center', undefined],
		['stack', 1]
	] as const)('passes %s and index %s through over another pane', (region, index) => {
		expect(
			resolveDropTarget({ type: 'pane', id: 'p' }, pane('q'), undefined, region, index)
		).toEqual({ targetId: 'q', region, index });
	});

	it('passes through over a different stack', () => {
		expect(resolveDropTarget({ type: 'pane', id: 'a' }, pane('x'), other, 'stack', 0)).toEqual({
			targetId: 'x',
			region: 'stack',
			index: 0
		});
	});
});

describe('hasDestination', () => {
	it('needs a second pane for a pane', () => {
		expect(hasDestination(pane('a'), { type: 'pane', id: 'a' })).toBe(false);
		expect(hasDestination(split(pane('a'), pane('b')), { type: 'pane', id: 'a' })).toBe(true);
	});

	it('counts stacked panes for a pane', () => {
		expect(hasDestination(stack('s', ['a', 'b']), { type: 'pane', id: 'a' })).toBe(true);
	});

	it('needs another slot for a stack', () => {
		expect(hasDestination(stack('s', ['a', 'b']), { type: 'stack', id: 's' })).toBe(false);
		expect(
			hasDestination(split(stack('s', ['a', 'b']), pane('c')), { type: 'stack', id: 's' })
		).toBe(true);
	});

	it('is false for an empty layout', () => {
		expect(hasDestination(undefined, { type: 'pane', id: 'a' })).toBe(false);
	});
});

describe('paneIdToSkip', () => {
	const root = split(stack('s', ['a', 'b'], 'b'), pane('c'));

	it.each([
		['no source', undefined, undefined],
		['an unstacked pane', { type: 'pane', id: 'c' }, 'c'],
		['a stacked pane', { type: 'pane', id: 'a' }, undefined],
		['a stack, its shown pane', { type: 'stack', id: 's' }, 'b'],
		['an unknown stack', { type: 'stack', id: 'nope' }, undefined]
	] as const)('skips for %s', (_name, source, expected) => {
		expect(paneIdToSkip(root, source)).toBe(expected);
	});
});
