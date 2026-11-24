import { describe, expect, it } from 'vitest';

import type { FloatNode, LayoutNode, PaneNode, StackNode } from '../../layout.ts';
import { hasDestination, isInWindow, paneIdToSkip, resolveDropTarget } from '../drop-target.ts';

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

const floatOver = (
	base: LayoutNode<unknown> | undefined,
	content: LayoutNode<unknown>
): FloatNode<unknown> => ({
	type: 'float',
	id: 'float',
	base,
	floats: [{ id: 'window', rect: { x: 0, y: 0, width: 100, height: 100 }, content }]
});

describe('resolveDropTarget', () => {
	const own = stack('s1', ['a', 'b', 'c']);
	const other = stack('s2', ['x', 'y']);

	it('has no target for a float dragged over a pane', () => {
		expect(resolveDropTarget({ type: 'float', id: 'w' }, pane('a'), undefined, 'left', 0)).toBe(
			undefined
		);
	});

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
	it('is false for a pane alone in the layout', () => {
		expect(
			hasDestination(pane('a'), { type: 'pane', id: 'a' }),
			'a lone pane has nowhere to go'
		).toBe(false);
	});

	it('is true for a pane beside another pane', () => {
		expect(
			hasDestination(split(pane('a'), pane('b')), { type: 'pane', id: 'a' }),
			'a second pane is a destination'
		).toBe(true);
	});

	it('counts stacked panes for a pane', () => {
		expect(
			hasDestination(stack('s', ['a', 'b']), { type: 'pane', id: 'a' }),
			'a stack-mate is a destination'
		).toBe(true);
	});

	it('is false for a stack that is the only slot', () => {
		expect(
			hasDestination(stack('s', ['a', 'b']), { type: 'stack', id: 's' }),
			'its own slot is no destination'
		).toBe(false);
	});

	it('is true for a stack beside another slot', () => {
		expect(
			hasDestination(split(stack('s', ['a', 'b']), pane('c')), { type: 'stack', id: 's' }),
			'another slot is a destination'
		).toBe(true);
	});

	it('is false for an empty layout', () => {
		expect(hasDestination(undefined, { type: 'pane', id: 'a' }), 'no layout, no destination').toBe(
			false
		);
	});

	it('is false for a float even with other panes', () => {
		expect(
			hasDestination(split(pane('a'), pane('b')), { type: 'float', id: 'w' }),
			'a float moves by rect, not by drop'
		).toBe(false);
	});
});

describe('paneIdToSkip', () => {
	const root = split(stack('s', ['a', 'b'], 'b'), pane('c'));

	it.each([
		['no source', undefined, undefined],
		['a float', { type: 'float', id: 'w' }, undefined],
		['an unstacked pane', { type: 'pane', id: 'c' }, 'c'],
		['a stacked pane', { type: 'pane', id: 'a' }, undefined],
		['a stack, its shown pane', { type: 'stack', id: 's' }, 'b'],
		['an unknown stack', { type: 'stack', id: 'nope' }, undefined]
	] as const)('skips for %s', (_name, source, expected) => {
		expect(paneIdToSkip(root, source)).toBe(expected);
	});
});

describe('isInWindow', () => {
	it('is false for an empty layout', () => {
		expect(isInWindow(undefined, 'a'), 'no layout holds nothing').toBe(false);
	});

	it('is false for a node outside every float', () => {
		expect(isInWindow(split(pane('a'), pane('b')), 'a'), 'a docked pane is no window').toBe(false);
	});

	it('is true for a pane inside a float entry', () => {
		expect(isInWindow(floatOver(pane('a'), pane('w')), 'w'), 'w sits in the window').toBe(true);
	});

	it('is true for a stack nested in a split inside a float entry', () => {
		const root = floatOver(pane('a'), split(pane('x'), stack('s', ['p', 'q'])));

		expect(isInWindow(root, 's'), 'the stack sits in the window').toBe(true);
	});

	it('is false for the base of a float', () => {
		expect(isInWindow(floatOver(pane('a'), pane('w')), 'a'), 'the base is docked').toBe(false);
	});

	it('is true for a window inside the first branch of a split', () => {
		const root = split(floatOver(pane('a'), pane('w')), pane('b'));

		expect(isInWindow(root, 'w'), 'w sits in a window under the split').toBe(true);
	});

	it('is true for a window inside the second branch of a split', () => {
		const root = split(pane('b'), floatOver(pane('a'), pane('w')));

		expect(isInWindow(root, 'w'), 'w sits in a window under the split').toBe(true);
	});
});
