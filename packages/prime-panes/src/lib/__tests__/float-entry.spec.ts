import { describe, expect, it, vi } from 'vitest';

import { raiseFloat, removeFloat, setFloatRect } from '../tree.ts';
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

describe('setFloatRect', () => {
	it('returns undefined for an undefined root', () => {
		expect(setFloatRect<PaneData>(undefined, floatIds.entryA, RECT)).toBeUndefined();
	});

	it.each(['missing', floatIds.float, floatIds.paneA])(
		'returns the same root when the id is %s, since only entry ids match',
		(entryId) => {
			const root = createFloatLayout();
			expect(setFloatRect(root, entryId, RECT)).toBe(root);
		}
	);

	it('returns the same root when the rect is equal field by field', () => {
		const root = createFloatLayout();
		const entry = expectFloat(root).floats[0]!;
		expect(setFloatRect(root, entry.id, { ...entry.rect })).toBe(root);
	});

	it('replaces only the named entry rect without mutating the input', () => {
		const root = deepFreeze(createFloatLayout());
		const result = expectFloat(setFloatRect(root, floatIds.entryA, RECT));
		expect(result.floats[0]!.rect).toEqual(RECT);
		expect(result.floats[1]).toBe(expectFloat(root).floats[1]);
		expect(result.floats[0]!.content).toBe(expectFloat(root).floats[0]!.content);
		expect(result.base).toBe(expectFloat(root).base);
	});

	it('stores a rect outside any box as given', () => {
		const wild = { x: -500, y: 9000, width: 0, height: -1 };
		const result = expectFloat(setFloatRect(createFloatLayout(), floatIds.entryB, wild));
		expect(result.floats[1]!.rect).toEqual(wild);
	});

	describe('with an updater', () => {
		it('stores the rect the updater returns for the entry current rect', () => {
			const root = deepFreeze(createFloatLayout());
			const entry = expectFloat(root).floats[0]!;
			const received: FloatRect[] = [];

			const result = expectFloat(
				setFloatRect(root, entry.id, (rect) => {
					received.push(rect);
					return { ...rect, x: rect.x + 10, width: rect.width + 5 };
				})
			);

			expect(received).toEqual([entry.rect]);
			expect(result.floats[0]!.rect).toEqual({
				...entry.rect,
				x: entry.rect.x + 10,
				width: entry.rect.width + 5
			});
			expect(result.floats[1]).toBe(expectFloat(root).floats[1]);
		});

		it('returns the same root when the updater returns an equal rect', () => {
			const root = createFloatLayout();
			expect(setFloatRect(root, floatIds.entryA, (rect) => ({ ...rect }))).toBe(root);
		});

		it('does not call the updater when the id names no entry', () => {
			const root = createFloatLayout();
			const updater = vi.fn((rect: FloatRect) => rect);

			expect(setFloatRect(root, floatIds.float, updater)).toBe(root);
			expect(updater).not.toHaveBeenCalled();
		});

		it('hands the updater the rect of an entry in a nested float node', () => {
			const root = deepFreeze(nestedLayout());
			const outer = expectFloat(
				setFloatRect(root, 'inner-b', (rect) => ({ ...rect, y: rect.y + 7 }))
			);
			expect(expectFloat(outer.floats[0]!.content).floats[1]!.rect).toEqual({ ...RECT, y: 9 });
		});
	});

	it('finds an entry of a float node nested in an entry', () => {
		const root = deepFreeze(nestedLayout());
		const outer = expectFloat(setFloatRect(root, 'inner-b', { ...RECT, x: 99 }));
		const inner = expectFloat(outer.floats[0]!.content);
		expect(inner.floats[1]!.rect.x).toBe(99);
		expect(inner.floats[0]).toBe(expectFloat(expectFloat(root).floats[0]!.content).floats[0]);
	});
});

describe('raiseFloat', () => {
	it('returns undefined for an undefined root', () => {
		expect(raiseFloat<PaneData>(undefined, floatIds.entryA)).toBeUndefined();
	});

	it('returns the same root when the entry id names no entry', () => {
		const root = createFloatLayout();
		expect(raiseFloat(root, 'missing')).toBe(root);
		expect(raiseFloat(root, floatIds.paneA)).toBe(root);
	});

	it('returns the same root when the entry is already on top', () => {
		const root = createFloatLayout();
		expect(raiseFloat(root, floatIds.entryB)).toBe(root);
	});

	it('moves the entry to the end of floats without mutating the input', () => {
		const root = deepFreeze(createFloatLayout());
		const result = expectFloat(raiseFloat(root, floatIds.entryA));
		expect(result.floats.map((entry) => entry.id)).toEqual([floatIds.entryB, floatIds.entryA]);
		expect(result.floats[1]).toBe(expectFloat(root).floats[0]);
		expect(result.base).toBe(expectFloat(root).base);
	});

	it('raises an entry of a nested float node within its own float node', () => {
		const root = deepFreeze(nestedLayout());
		const outer = expectFloat(raiseFloat(root, 'inner-a'));
		const inner = expectFloat(outer.floats[0]!.content);
		expect(inner.floats.map((entry) => entry.id)).toEqual(['inner-b', 'inner-a']);
		expect(outer.floats).toHaveLength(1);
	});
});

describe('removeFloat', () => {
	it('returns undefined for an undefined root', () => {
		expect(removeFloat<PaneData>(undefined, floatIds.entryA)).toBeUndefined();
	});

	it.each(['missing', floatIds.float, floatIds.paneA])(
		'returns the same root when the id is %s, since only entry ids match',
		(entryId) => {
			const root = createFloatLayout();
			expect(removeFloat(root, entryId)).toBe(root);
		}
	);

	it('removes the entry with its content and keeps the rest', () => {
		const root = deepFreeze(createFloatLayout());
		const result = expectFloat(removeFloat(root, floatIds.entryA));
		expect(result.floats.map((entry) => entry.id)).toEqual([floatIds.entryB]);
		expect(result.base).toBe(expectFloat(root).base);
	});

	it('collapses a float node left with no entries to its base', () => {
		const root = deepFreeze(createFloatLayout());
		const once = removeFloat(root, floatIds.entryA);
		const result = removeFloat(once, floatIds.entryB);
		expect(result).toBe(expectFloat(root).base);
	});

	it('collapses a base-less float node with one entry to nothing at the root', () => {
		const root = deepFreeze<LayoutNode<PaneData>>({
			type: 'float',
			id: 'solo-float',
			floats: [{ id: 'only', rect: RECT, content: pane('p', 'P') }]
		});
		expect(removeFloat(root, 'only')).toBeUndefined();
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
		expect(removeFloat(root, 'only')).toBe(sibling);
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
		const root = deepFreeze(nestedLayout());
		const once = removeFloat(root, 'inner-a');
		const result = expectFloat(removeFloat(once, 'inner-b'));
		expect(result.floats[0]!.content).toMatchObject({ id: 'inner-base' });
	});

	it('removes a whole entry holding a nested float node', () => {
		const root = deepFreeze(nestedLayout());
		expect(removeFloat(root, 'outer-entry')).toMatchObject({ id: 'outer-base' });
	});
});
