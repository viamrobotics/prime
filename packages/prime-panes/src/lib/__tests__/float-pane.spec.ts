import { describe, expect, it } from 'vitest';

import { moveStack, movePane, stackPanes, swapPanes } from '../tree.ts';
import { floatPane, floatStack } from '../FloatPanes/float-tree.ts';
import {
	CAMERA,
	CAMERA_2,
	createFloatLayout,
	createLayout,
	createStackLayout,
	deepFreeze,
	expectFloat,
	expectSplit,
	floatIds,
	ids,
	pane,
	SENSOR,
	SOLO_PANE,
	split,
	stack,
	stackIds,
	TAB_A1,
	TAB_A2,
	TAB_A3,
	TAB_B1,
	TAB_B2,
	TAB_STACK_A,
	TAB_STACK_B,
	TIME_SERIES
} from '../../../test/layouts.ts';

import type { FloatEntry, LayoutNode, PaneNode } from '../layout.ts';
import type { PaneData } from '../../../test/layouts.ts';

const FLOAT_RECT = { x: 10, y: 20, width: 300, height: 200 };
const ENTRY_ID = 'new-entry';
const FLOAT_ID = 'new-float';

function labeled(id: string): PaneNode<PaneData> {
	return pane(id, id);
}

function newEntry(content: LayoutNode<PaneData>): FloatEntry<PaneData> {
	return { id: ENTRY_ID, rect: FLOAT_RECT, content };
}

const LOWER = split(ids.lowerSplit, 'column', 0.5, SENSOR, CAMERA_2);
const INNER = split(ids.innerSplit, 'row', 0.6, TIME_SERIES, LOWER);

const BASE_LEFT = labeled(floatIds.baseLeft);
const BASE_RIGHT = labeled(floatIds.baseRight);
const PANE_A = labeled(floatIds.paneA);
const PANE_B = labeled(floatIds.paneB);
const ENTRY_A: FloatEntry<PaneData> = {
	id: floatIds.entryA,
	rect: { x: 0, y: 0, width: 100, height: 80 },
	content: PANE_A
};
const ENTRY_B: FloatEntry<PaneData> = {
	id: floatIds.entryB,
	rect: { x: 50, y: 50, width: 120, height: 90 },
	content: PANE_B
};

const ENTRY_STACK = stack('stk', [labeled('t1'), labeled('t2')], 't1');

describe.each([
	{
		name: 'floatPane',
		run: (root: LayoutNode<PaneData> | undefined, id: string, hostId?: string) =>
			floatPane(root, id, FLOAT_RECT, ENTRY_ID, FLOAT_ID, hostId),
		sourceId: stackIds.solo,
		wrapped: split(stackIds.rootSplit, 'row', 0.6, TAB_STACK_A, {
			type: 'float',
			id: FLOAT_ID,
			base: TAB_STACK_B,
			floats: [newEntry(SOLO_PANE)]
		})
	},
	{
		name: 'floatStack',
		run: (root: LayoutNode<PaneData> | undefined, id: string, hostId?: string) =>
			floatStack(root, id, FLOAT_RECT, ENTRY_ID, FLOAT_ID, hostId),
		sourceId: stackIds.stackA,
		wrapped: split(stackIds.sideSplit, 'column', 0.4, SOLO_PANE, {
			type: 'float',
			id: FLOAT_ID,
			base: TAB_STACK_B,
			floats: [newEntry(TAB_STACK_A)]
		})
	}
])('$name shared rules', ({ run, sourceId, wrapped }) => {
	it('returns undefined for an undefined root', () => {
		const root = undefined;

		const result = run(root, sourceId);

		expect(result).toBeUndefined();
	});

	it('returns the same root when the source id names no node', () => {
		const root = deepFreeze(createStackLayout());

		const result = run(root, 'missing');

		expect(result).toBe(root);
	});

	it('returns the same root when the host names no node', () => {
		const root = deepFreeze(createStackLayout());

		const result = run(root, sourceId, 'missing');

		expect(result).toBe(root);
	});

	it('returns the same root when the host is the source', () => {
		const root = deepFreeze(createStackLayout());

		const result = run(root, sourceId, sourceId);

		expect(result).toBe(root);
	});

	it('wraps a host that is not a float node in a new float node with the entry', () => {
		const root = deepFreeze(createStackLayout());

		const result = run(root, sourceId, stackIds.stackB);

		expect(result).toEqual(wrapped);
	});
});

describe('floatPane', () => {
	it.each([
		{ name: 'a split', id: ids.rootSplit },
		{ name: 'a stack', id: stackIds.stackA }
	])('returns the same root when the source is $name', ({ id }) => {
		const root = deepFreeze(createStackLayout());

		const result = floatPane(root, id, FLOAT_RECT, ENTRY_ID, FLOAT_ID);

		expect(result).toBe(root);
	});

	it('wraps the root by default and the root collapses around the removed pane', () => {
		const root = deepFreeze(createLayout());

		const result = floatPane(root, ids.mycam, FLOAT_RECT, ENTRY_ID, FLOAT_ID);

		expect(result).toEqual({
			type: 'float',
			id: FLOAT_ID,
			base: INNER,
			floats: [newEntry(CAMERA)]
		});
	});

	it('stores the rect as given, never clamped', () => {
		const outOfBoundsRect = { x: -50, y: 99999, width: 0, height: -3 };

		const result = expectFloat(
			floatPane(createLayout(), ids.mycam, outOfBoundsRect, ENTRY_ID, FLOAT_ID)
		);

		expect(result.floats[0]!.rect).toEqual(outOfBoundsRect);
	});

	it('wraps a non-ancestor host and collapses the source parent', () => {
		const root = deepFreeze(createLayout());

		const result = floatPane(root, ids.mycam, FLOAT_RECT, ENTRY_ID, FLOAT_ID, ids.mysensor);

		expect(result).toEqual(
			split(
				ids.innerSplit,
				'row',
				0.6,
				TIME_SERIES,
				split(
					ids.lowerSplit,
					'column',
					0.5,
					{
						type: 'float',
						id: FLOAT_ID,
						base: SENSOR,
						floats: [newEntry(CAMERA)]
					},
					CAMERA_2
				)
			)
		);
	});

	it('removes a stacked pane from its stack and collapses a stack left with one pane', () => {
		const root = deepFreeze(createStackLayout());

		const result = floatPane(root, stackIds.tabB1, FLOAT_RECT, ENTRY_ID, FLOAT_ID, stackIds.solo);

		expect(result).toEqual(
			split(
				stackIds.rootSplit,
				'row',
				0.6,
				TAB_STACK_A,
				split(
					stackIds.sideSplit,
					'column',
					0.4,
					{ type: 'float', id: FLOAT_ID, base: SOLO_PANE, floats: [newEntry(TAB_B1)] },
					TAB_B2
				)
			)
		);
	});

	it('keeps the stack and its active pane when it keeps two or more panes', () => {
		const root = deepFreeze(createStackLayout());

		const result = expectSplit(
			floatPane(root, stackIds.tabA3, FLOAT_RECT, ENTRY_ID, FLOAT_ID, stackIds.solo)
		);

		expect(result.first).toEqual(stack(stackIds.stackA, [TAB_A1, TAB_A2], stackIds.tabA2));
	});

	it('takes a pane out of a stack that is the host, and what remains is the host', () => {
		const root = deepFreeze(createStackLayout());

		const result = expectSplit(
			floatPane(root, stackIds.tabA1, FLOAT_RECT, ENTRY_ID, FLOAT_ID, stackIds.stackA)
		);

		expect(result.first).toEqual({
			type: 'float',
			id: FLOAT_ID,
			base: stack(stackIds.stackA, [TAB_A2, TAB_A3], stackIds.tabA2),
			floats: [newEntry(TAB_A1)]
		});
	});

	it('collapses a host stack left with one pane to that pane', () => {
		const root = deepFreeze(createStackLayout());

		const result = expectSplit(
			floatPane(root, stackIds.tabB1, FLOAT_RECT, ENTRY_ID, FLOAT_ID, stackIds.stackB)
		);

		expect(expectSplit(result.second).second).toEqual({
			type: 'float',
			id: FLOAT_ID,
			base: TAB_B2,
			floats: [newEntry(TAB_B1)]
		});
	});

	it.each([
		{ name: 'named', hostId: floatIds.float },
		{ name: 'the default root', hostId: undefined }
	])(
		'adds an entry at the end of a float node host that is $name and keeps its id',
		({ hostId }) => {
			const root = deepFreeze(createFloatLayout());

			const result = floatPane(root, floatIds.baseLeft, FLOAT_RECT, ENTRY_ID, FLOAT_ID, hostId);

			expect(result).toEqual({
				type: 'float',
				id: floatIds.float,
				base: BASE_RIGHT,
				floats: [ENTRY_A, ENTRY_B, newEntry(BASE_LEFT)]
			});
		}
	);

	it.each([
		{ name: 'the default root', hostId: undefined },
		{ name: 'named', hostId: floatIds.float }
	])(
		'returns the same root when the pane is already the whole content of an entry of the host that is $name',
		({ hostId }) => {
			const root = deepFreeze(createFloatLayout());

			const result = floatPane(root, floatIds.paneA, FLOAT_RECT, ENTRY_ID, FLOAT_ID, hostId);

			expect(result).toBe(root);
		}
	);

	it('moves an entry pane to another host and drops the emptied entry', () => {
		const root = deepFreeze(createFloatLayout());

		const result = floatPane(
			root,
			floatIds.paneA,
			FLOAT_RECT,
			ENTRY_ID,
			FLOAT_ID,
			floatIds.baseRight
		);

		expect(result).toEqual({
			type: 'float',
			id: floatIds.float,
			base: split(floatIds.base, 'row', 0.5, BASE_LEFT, {
				type: 'float',
				id: FLOAT_ID,
				base: BASE_RIGHT,
				floats: [newEntry(PANE_A)]
			}),
			floats: [ENTRY_B]
		});
	});

	it('wraps an entry content in a float node nested in the entry', () => {
		const root = deepFreeze(createFloatLayout());

		const result = floatPane(
			root,
			floatIds.baseLeft,
			FLOAT_RECT,
			ENTRY_ID,
			FLOAT_ID,
			floatIds.paneA
		);

		expect(result).toEqual({
			type: 'float',
			id: floatIds.float,
			base: BASE_RIGHT,
			floats: [
				{
					...ENTRY_A,
					content: { type: 'float', id: FLOAT_ID, base: PANE_A, floats: [newEntry(BASE_LEFT)] }
				},
				ENTRY_B
			]
		});
	});

	it('adds an entry to a nested float node found by id', () => {
		const root = deepFreeze<LayoutNode<PaneData>>({
			type: 'float',
			id: floatIds.float,
			base: BASE_RIGHT,
			floats: [
				{
					...ENTRY_A,
					content: {
						type: 'float',
						id: FLOAT_ID,
						base: PANE_A,
						floats: [newEntry(BASE_LEFT)]
					}
				}
			]
		});

		const result = floatPane(
			root,
			floatIds.baseRight,
			FLOAT_RECT,
			'second-entry',
			'unused-float',
			FLOAT_ID
		);

		expect(result).toEqual({
			type: 'float',
			id: floatIds.float,
			floats: [
				{
					...ENTRY_A,
					content: {
						type: 'float',
						id: FLOAT_ID,
						base: PANE_A,
						floats: [
							newEntry(BASE_LEFT),
							{ id: 'second-entry', rect: FLOAT_RECT, content: BASE_RIGHT }
						]
					}
				}
			]
		});
	});

	it('leaves a base-less float node when the base pane floats out of a float node with entries', () => {
		const entry = { id: 'e', rect: FLOAT_RECT, content: labeled('p') };
		const root = deepFreeze<LayoutNode<PaneData>>({
			type: 'float',
			id: 'f',
			base: labeled('only-base'),
			floats: [entry]
		});

		const result = floatPane(root, 'only-base', FLOAT_RECT, ENTRY_ID, FLOAT_ID);

		expect(result).toEqual({
			type: 'float',
			id: 'f',
			floats: [entry, newEntry(labeled('only-base'))]
		});
	});

	it('floats a pane that is the whole content of an entry of an inner float node over the outer host', () => {
		const root = deepFreeze<LayoutNode<PaneData>>({
			type: 'float',
			id: 'outer',
			base: labeled('outer-base'),
			floats: [
				{
					id: 'holder',
					rect: FLOAT_RECT,
					content: {
						type: 'float',
						id: 'inner',
						base: labeled('inner-base'),
						floats: [{ id: 'inner-entry', rect: FLOAT_RECT, content: labeled('x') }]
					}
				}
			]
		});

		const result = floatPane(root, 'x', FLOAT_RECT, ENTRY_ID, FLOAT_ID);

		expect(result).toEqual({
			type: 'float',
			id: 'outer',
			base: labeled('outer-base'),
			floats: [
				{ id: 'holder', rect: FLOAT_RECT, content: labeled('inner-base') },
				newEntry(labeled('x'))
			]
		});
	});

	it('floats the pane into a new base-less float node holding the entry when nothing of the host remains', () => {
		const root = deepFreeze<LayoutNode<PaneData>>({
			type: 'float',
			id: 'host',
			floats: [
				{
					id: 'host-entry',
					rect: FLOAT_RECT,
					content: {
						type: 'float',
						id: 'inner',
						floats: [{ id: 'inner-entry', rect: FLOAT_RECT, content: labeled('x') }]
					}
				}
			]
		});

		const result = floatPane(root, 'x', FLOAT_RECT, ENTRY_ID, FLOAT_ID);

		expect(result).toEqual({
			type: 'float',
			id: FLOAT_ID,
			floats: [newEntry(labeled('x'))]
		});
	});
});

describe('floatStack', () => {
	it.each([
		{ name: 'a pane', id: stackIds.solo },
		{ name: 'a stacked pane', id: stackIds.tabA1 }
	])('returns the same root when the source is $name', ({ id }) => {
		const root = deepFreeze(createStackLayout());

		const result = floatStack(root, id, FLOAT_RECT, ENTRY_ID, FLOAT_ID);

		expect(result).toBe(root);
	});

	it('returns the same root when the host is a pane inside the stack', () => {
		const root = deepFreeze(createStackLayout());

		const result = floatStack(
			root,
			stackIds.stackA,
			FLOAT_RECT,
			ENTRY_ID,
			FLOAT_ID,
			stackIds.tabA3
		);

		expect(result).toBe(root);
	});

	it('floats the whole stack over the root by default', () => {
		const root = deepFreeze(createStackLayout());

		const result = floatStack(root, stackIds.stackA, FLOAT_RECT, ENTRY_ID, FLOAT_ID);

		expect(result).toEqual({
			type: 'float',
			id: FLOAT_ID,
			base: split(stackIds.sideSplit, 'column', 0.4, SOLO_PANE, TAB_STACK_B),
			floats: [newEntry(TAB_STACK_A)]
		});
	});

	it('returns the same root when the stack is already the whole content of an entry of the host', () => {
		const root = deepFreeze<LayoutNode<PaneData>>({
			type: 'float',
			id: 'f',
			base: labeled('b'),
			floats: [{ id: 'e', rect: FLOAT_RECT, content: ENTRY_STACK }]
		});

		const result = floatStack(root, 'stk', FLOAT_RECT, ENTRY_ID, FLOAT_ID);

		expect(result).toBe(root);
	});

	it('adds the stack as an entry of a float node host', () => {
		const entry = { id: 'e', rect: FLOAT_RECT, content: labeled('p') };
		const root = deepFreeze(
			split('outer', 'row', 0.5, ENTRY_STACK, {
				type: 'float',
				id: 'f',
				base: labeled('b'),
				floats: [entry]
			})
		);

		const result = floatStack(root, 'stk', FLOAT_RECT, ENTRY_ID, FLOAT_ID, 'f');

		expect(result).toEqual({
			type: 'float',
			id: 'f',
			base: labeled('b'),
			floats: [entry, newEntry(ENTRY_STACK)]
		});
	});
});

describe('docking out of an entry', () => {
	it('movePane docks an entry pane beside a base pane and drops the emptied entry', () => {
		const root = deepFreeze(createFloatLayout());

		const result = movePane(root, floatIds.paneA, floatIds.baseRight, 'column', 'first', 's');

		expect(result).toEqual({
			type: 'float',
			id: floatIds.float,
			base: split(
				floatIds.base,
				'row',
				0.5,
				BASE_LEFT,
				split('s', 'column', 0.5, PANE_A, BASE_RIGHT)
			),
			floats: [ENTRY_B]
		});
	});

	it('movePane collapses the float node when the last entry docks', () => {
		const root = deepFreeze<LayoutNode<PaneData>>({
			type: 'float',
			id: 'f',
			base: labeled('b'),
			floats: [{ id: 'e', rect: FLOAT_RECT, content: labeled('p') }]
		});

		const result = movePane(root, 'p', 'b', 'row', 'second', 's');

		expect(result).toEqual(split('s', 'row', 0.5, labeled('b'), labeled('p')));
	});

	it('stackPanes docks an entry pane into a stack with a base pane and drops the entry', () => {
		const root = deepFreeze(createFloatLayout());

		const result = stackPanes(root, floatIds.baseLeft, floatIds.paneB, 'new-stack');

		expect(result).toEqual({
			type: 'float',
			id: floatIds.float,
			base: split(
				floatIds.base,
				'row',
				0.5,
				stack('new-stack', [BASE_LEFT, PANE_B], floatIds.paneB),
				BASE_RIGHT
			),
			floats: [ENTRY_A]
		});
	});

	it('swapPanes exchanges an entry pane with a base pane and keeps the entry', () => {
		const root = deepFreeze(createFloatLayout());

		const result = swapPanes(root, floatIds.paneA, floatIds.baseLeft);

		expect(result).toEqual({
			type: 'float',
			id: floatIds.float,
			base: split(floatIds.base, 'row', 0.5, PANE_A, BASE_RIGHT),
			floats: [{ ...ENTRY_A, content: BASE_LEFT }, ENTRY_B]
		});
	});

	it('moveStack docks an entry stack beside a base pane and drops the emptied entry', () => {
		const root = deepFreeze<LayoutNode<PaneData>>({
			type: 'float',
			id: 'f',
			base: labeled('b'),
			floats: [{ id: 'e', rect: FLOAT_RECT, content: ENTRY_STACK }]
		});

		const result = moveStack(root, 'stk', 'b', 'row', 'first', 's');

		expect(result).toEqual(split('s', 'row', 0.5, ENTRY_STACK, labeled('b')));
	});
});
