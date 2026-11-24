import { describe, expect, it, vi } from 'vitest';

import { raiseFloat, removeFloat, setFloatRect } from '../FloatPanes/float-tree.ts';
import {
	createFloatLayout,
	deepFreeze,
	expectFloat,
	floatIds,
	pane
} from '../../../test/layouts.ts';

import type { FloatRect, LayoutNode } from '../layout.ts';
import type { PaneData } from '../../../test/layouts.ts';

const RECT = { x: 1, y: 2, width: 3, height: 4 };

const NOT_ENTRY_IDS = ['missing', floatIds.float, floatIds.paneA];

function nestedLayout(): LayoutNode<PaneData> {
	return {
		type: 'float',
		id: 'outer',
		base: pane('outer-base', 'Outer base'),
		floats: [
			{
				id: 'outer-entry',
				rect: RECT,
				content: {
					type: 'float',
					id: 'inner',
					base: pane('inner-base', 'Inner base'),
					floats: [
						{ id: 'inner-a', rect: RECT, content: pane('inner-a-pane', 'A') },
						{ id: 'inner-b', rect: RECT, content: pane('inner-b-pane', 'B') }
					]
				}
			}
		]
	};
}

function threeEntryLayout(): LayoutNode<PaneData> {
	return {
		type: 'float',
		id: 'three',
		base: pane('base', 'Base'),
		floats: [
			{ id: 'one', rect: RECT, content: pane('p1', 'P1') },
			{ id: 'two', rect: RECT, content: pane('p2', 'P2') },
			{ id: 'three', rect: RECT, content: pane('p3', 'P3') }
		]
	};
}

describe('setFloatRect', () => {
	it('returns undefined for an undefined root', () => {
		const root = undefined;

		const result = setFloatRect<PaneData>(root, floatIds.entryA, RECT);

		expect(result).toBeUndefined();
	});

	it.each(NOT_ENTRY_IDS)(
		'returns the same root when the id is %s, since only entry ids match',
		(entryId) => {
			const root = createFloatLayout();

			const result = setFloatRect(root, entryId, RECT);

			expect(result).toBe(root);
		}
	);

	it('returns the same root when the rect is equal field by field', () => {
		const root = createFloatLayout();

		const result = setFloatRect(root, floatIds.entryA, { x: 0, y: 0, width: 100, height: 80 });

		expect(result).toBe(root);
	});

	it.each([
		{ field: 'x', rect: { x: 1, y: 0, width: 100, height: 80 } },
		{ field: 'y', rect: { x: 0, y: 1, width: 100, height: 80 } },
		{ field: 'width', rect: { x: 0, y: 0, width: 101, height: 80 } },
		{ field: 'height', rect: { x: 0, y: 0, width: 100, height: 81 } }
	])('stores the rect when only the $field differs', ({ rect }) => {
		const root = createFloatLayout();

		const result = expectFloat(setFloatRect(root, floatIds.entryA, rect));

		expect(result.floats[0]!.rect).toEqual(rect);
	});

	it('replaces only the named entry rect', () => {
		const root = deepFreeze(createFloatLayout());

		const result = expectFloat(setFloatRect(root, floatIds.entryA, RECT));

		expect(result.floats).toEqual([
			{ id: floatIds.entryA, rect: RECT, content: pane(floatIds.paneA, floatIds.paneA) },
			{
				id: floatIds.entryB,
				rect: { x: 50, y: 50, width: 120, height: 90 },
				content: pane(floatIds.paneB, floatIds.paneB)
			}
		]);
		expect(result.floats[1]).toBe(expectFloat(root).floats[1]);
		expect(result.base).toBe(expectFloat(root).base);
	});

	it('stores a rect outside any box as given', () => {
		const outOfBoundsRect = { x: -500, y: 9000, width: 0, height: -1 };

		const result = expectFloat(setFloatRect(createFloatLayout(), floatIds.entryB, outOfBoundsRect));

		expect(result.floats[1]!.rect).toEqual(outOfBoundsRect);
	});

	describe('with an updater', () => {
		it('stores the rect the updater returns for the entry current rect', () => {
			const root = deepFreeze(createFloatLayout());

			const result = expectFloat(
				setFloatRect(root, floatIds.entryA, (rect) => ({
					...rect,
					x: rect.x + 10,
					width: rect.width + 5
				}))
			);

			expect(result.floats[0]!.rect).toEqual({ x: 10, y: 0, width: 105, height: 80 });
			expect(result.floats[1]).toBe(expectFloat(root).floats[1]);
		});

		it('returns the same root when the updater returns an equal rect', () => {
			const root = createFloatLayout();

			const result = setFloatRect(root, floatIds.entryA, (rect) => ({ ...rect }));

			expect(result).toBe(root);
		});

		it('does not call the updater when the id names no entry', () => {
			const root = createFloatLayout();
			const updater = vi.fn((rect: FloatRect) => rect);

			const result = setFloatRect(root, floatIds.float, updater);

			expect(result).toBe(root);
			expect(updater).not.toHaveBeenCalled();
		});

		it('hands the updater the rect of an entry in a nested float node', () => {
			const root = deepFreeze(nestedLayout());

			const outer = expectFloat(
				setFloatRect(root, 'inner-b', (rect) => ({ ...rect, y: rect.y + 7 }))
			);

			expect(expectFloat(outer.floats[0]!.content).floats[1]!.rect).toEqual({
				x: 1,
				y: 9,
				width: 3,
				height: 4
			});
		});
	});

	it('finds an entry of a float node nested in an entry', () => {
		const root = deepFreeze(nestedLayout());

		const outer = expectFloat(setFloatRect(root, 'inner-b', { ...RECT, x: 99 }));

		const inner = expectFloat(outer.floats[0]!.content);
		expect(inner.floats[1]!.rect).toEqual({ x: 99, y: 2, width: 3, height: 4 });
		expect(inner.floats[0]).toBe(expectFloat(expectFloat(root).floats[0]!.content).floats[0]);
	});
});

describe('raiseFloat', () => {
	it('returns undefined for an undefined root', () => {
		const root = undefined;

		const result = raiseFloat<PaneData>(root, floatIds.entryA);

		expect(result).toBeUndefined();
	});

	it.each(NOT_ENTRY_IDS)(
		'returns the same root when the id is %s, since only entry ids match',
		(entryId) => {
			const root = createFloatLayout();

			const result = raiseFloat(root, entryId);

			expect(result).toBe(root);
		}
	);

	it('returns the same root when the entry is already on top', () => {
		const root = createFloatLayout();

		const result = raiseFloat(root, floatIds.entryB);

		expect(result).toBe(root);
	});

	it('moves the entry to the end of floats without mutating the input', () => {
		const root = deepFreeze(createFloatLayout());

		const result = expectFloat(raiseFloat(root, floatIds.entryA));

		expect(result.floats.map((entry) => entry.id)).toEqual([floatIds.entryB, floatIds.entryA]);
		expect(result.floats[1]).toBe(expectFloat(root).floats[0]);
		expect(result.base).toBe(expectFloat(root).base);
	});

	it('keeps the order of the other entries when a middle entry is raised', () => {
		const root = deepFreeze(threeEntryLayout());

		const result = expectFloat(raiseFloat(root, 'two'));

		expect(result.floats.map((entry) => entry.id)).toEqual(['one', 'three', 'two']);
	});

	it('raises an entry of a nested float node within its own float node', () => {
		const root = deepFreeze(nestedLayout());

		const outer = expectFloat(raiseFloat(root, 'inner-a'));

		const inner = expectFloat(outer.floats[0]!.content);
		expect(inner.floats.map((entry) => entry.id)).toEqual(['inner-b', 'inner-a']);
		expect(outer.floats.map((entry) => entry.id)).toEqual(['outer-entry']);
	});
});

describe('removeFloat', () => {
	it('returns undefined for an undefined root', () => {
		const root = undefined;

		const result = removeFloat<PaneData>(root, floatIds.entryA);

		expect(result).toBeUndefined();
	});

	it.each(NOT_ENTRY_IDS)(
		'returns the same root when the id is %s, since only entry ids match',
		(entryId) => {
			const root = createFloatLayout();

			const result = removeFloat(root, entryId);

			expect(result).toBe(root);
		}
	);

	it('removes the entry with its content and keeps the base', () => {
		const root = deepFreeze(createFloatLayout());

		const result = expectFloat(removeFloat(root, floatIds.entryA));

		expect(result.floats.map((entry) => entry.id)).toEqual([floatIds.entryB]);
		expect(result.base).toBe(expectFloat(root).base);
	});

	it('removes a middle entry and keeps the others in order', () => {
		const root = deepFreeze(threeEntryLayout());

		const result = expectFloat(removeFloat(root, 'two'));

		expect(result.floats.map((entry) => entry.id)).toEqual(['one', 'three']);
	});

	it('collapses a float node left with no entries to its base', () => {
		const base = pane('base', 'Base');
		const root = deepFreeze<LayoutNode<PaneData>>({
			type: 'float',
			id: 'f',
			base,
			floats: [{ id: 'only', rect: RECT, content: pane('p', 'P') }]
		});

		const result = removeFloat(root, 'only');

		expect(result).toBe(base);
	});

	it('collapses a base-less float node with one entry to nothing at the root', () => {
		const root = deepFreeze<LayoutNode<PaneData>>({
			type: 'float',
			id: 'solo-float',
			floats: [{ id: 'only', rect: RECT, content: pane('p', 'P') }]
		});

		const result = removeFloat(root, 'only');

		expect(result).toBeUndefined();
	});

	it('removes an emptied base-less float node from its parent split and collapses the split', () => {
		const sibling = pane('sibling', 'Sibling');
		const root = deepFreeze<LayoutNode<PaneData>>({
			type: 'split',
			id: 'split',
			direction: 'row',
			ratio: 0.5,
			first: {
				type: 'float',
				id: 'solo-float',
				floats: [{ id: 'only', rect: RECT, content: pane('p', 'P') }]
			},
			second: sibling
		});

		const result = removeFloat(root, 'only');

		expect(result).toBe(sibling);
	});

	it('removes an emptied base-less float node that is the content of another entry along with that entry', () => {
		const root = deepFreeze<LayoutNode<PaneData>>({
			type: 'float',
			id: 'outer',
			base: pane('outer-base', 'Outer base'),
			floats: [
				{
					id: 'holder',
					rect: RECT,
					content: {
						type: 'float',
						id: 'inner',
						floats: [{ id: 'only', rect: RECT, content: pane('p', 'P') }]
					}
				},
				{ id: 'kept', rect: RECT, content: pane('kept-pane', 'Kept') }
			]
		});

		const result = expectFloat(removeFloat(root, 'only'));

		expect(result.floats.map((entry) => entry.id)).toEqual(['kept']);
		expect(result.base).toBe(expectFloat(root).base);
	});

	it('keeps a base-less float node that still has entries', () => {
		const root = deepFreeze<LayoutNode<PaneData>>({
			type: 'float',
			id: 'f',
			floats: [
				{ id: 'one', rect: RECT, content: pane('p1', 'P1') },
				{ id: 'two', rect: RECT, content: pane('p2', 'P2') }
			]
		});

		const result = expectFloat(removeFloat(root, 'one'));

		expect(result.floats.map((entry) => entry.id)).toEqual(['two']);
		expect(result.base).toBeUndefined();
	});

	it('removes an entry of a nested float node and collapses the nested one to its base', () => {
		const root = deepFreeze<LayoutNode<PaneData>>({
			type: 'float',
			id: 'outer',
			base: pane('outer-base', 'Outer base'),
			floats: [
				{
					id: 'outer-entry',
					rect: RECT,
					content: {
						type: 'float',
						id: 'inner',
						base: pane('inner-base', 'Inner base'),
						floats: [{ id: 'inner-a', rect: RECT, content: pane('inner-a-pane', 'A') }]
					}
				}
			]
		});

		const result = expectFloat(removeFloat(root, 'inner-a'));

		expect(result.floats[0]!.content).toEqual(pane('inner-base', 'Inner base'));
	});

	it('removes a whole entry holding a nested float node and collapses to the base', () => {
		const root = deepFreeze(nestedLayout());

		const result = removeFloat(root, 'outer-entry');

		expect(result).toEqual(pane('outer-base', 'Outer base'));
	});
});
