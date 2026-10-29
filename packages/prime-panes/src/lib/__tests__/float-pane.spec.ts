import { describe, expect, it } from 'vitest';

import { floatPane, floatStack, moveStack, movePane, stackPanes, swapPanes } from '../tree.ts';
import {
	createFloatLayout,
	createLayout,
	createStackLayout,
	deepFreeze,
	expectFloat,
	expectSplit,
	expectStack,
	FLOAT_RECT,
	floatIds,
	ids,
	pane,
	stackIds
} from '../../../test/layouts.ts';

import type { LayoutNode } from '../layout.ts';
import type { PaneData } from '../../../test/layouts.ts';

const ENTRY_ID = 'new-entry';
const FLOAT_ID = 'new-float';

describe.each([
	{
		name: 'floatPane',
		run: (root: LayoutNode<PaneData> | undefined, id: string, hostId?: string) =>
			floatPane(root, id, FLOAT_RECT, ENTRY_ID, FLOAT_ID, hostId)
	},
	{
		name: 'floatStack',
		run: (root: LayoutNode<PaneData> | undefined, id: string, hostId?: string) =>
			floatStack(root, id, FLOAT_RECT, ENTRY_ID, FLOAT_ID, hostId)
	}
])('$name shared rules', ({ name, run }) => {
	const sourceId = name === 'floatPane' ? stackIds.solo : stackIds.stackA;

	it('returns undefined for an undefined root', () => {
		expect(run(undefined, sourceId)).toBeUndefined();
	});

	it('returns the same root when the source id names no node', () => {
		const root = deepFreeze(createStackLayout());
		expect(run(root, 'missing')).toBe(root);
	});

	it('returns the same root when the host names no node', () => {
		const root = deepFreeze(createStackLayout());
		expect(run(root, sourceId, 'missing')).toBe(root);
	});

	it('returns the same root when the host is the source', () => {
		const root = deepFreeze(createStackLayout());
		expect(run(root, sourceId, sourceId)).toBe(root);
	});

	it('wraps a host that is not a float node in a new float node with the entry', () => {
		const root = deepFreeze(createStackLayout());
		const result = run(root, sourceId, stackIds.stackB)!;
		expect(findInSplits(result, FLOAT_ID)).toMatchObject({
			type: 'float',
			id: FLOAT_ID,
			base: { id: stackIds.stackB },
			floats: [{ id: ENTRY_ID, rect: FLOAT_RECT }]
		});
	});
});

function findInSplits(node: LayoutNode<PaneData>, id: string): LayoutNode<PaneData> | undefined {
	if (node.id === id) return node;
	if (node.type === 'split') return findInSplits(node.first, id) ?? findInSplits(node.second, id);
	if (node.type === 'float') {
		return (node.base && findInSplits(node.base, id)) || undefined;
	}
	return undefined;
}

describe('floatPane', () => {
	it.each([ids.rootSplit, stackIds.stackA])('returns the same root when the source is %s', (id) => {
		const root = deepFreeze(createStackLayout());
		expect(floatPane(root, id, FLOAT_RECT, ENTRY_ID, FLOAT_ID)).toBe(root);
	});

	it('wraps the root by default and the root collapses around the removed pane', () => {
		const root = deepFreeze(createLayout());
		const result = expectFloat(floatPane(root, ids.mycam, FLOAT_RECT, ENTRY_ID, FLOAT_ID));
		expect(result.id).toBe(FLOAT_ID);
		expect(result.base).toBe(expectSplit(root).second);
		expect(result.floats).toEqual([
			{ id: ENTRY_ID, rect: FLOAT_RECT, content: expectSplit(root).first }
		]);
	});

	it('stores the rect as given, never clamped', () => {
		const wild = { x: -50, y: 99999, width: 0, height: -3 };
		const result = expectFloat(floatPane(createLayout(), ids.mycam, wild, ENTRY_ID, FLOAT_ID));
		expect(result.floats[0]!.rect).toEqual(wild);
	});

	it('returns the same root when the host is inside the source', () => {
		const root = deepFreeze(createStackLayout());
		expect(floatPane(root, stackIds.tabA1, FLOAT_RECT, ENTRY_ID, FLOAT_ID, stackIds.tabA1)).toBe(
			root
		);
	});

	it('wraps a non-ancestor host and collapses the source parent', () => {
		const root = deepFreeze(createLayout());
		const result = expectSplit(
			floatPane(root, ids.mycam, FLOAT_RECT, ENTRY_ID, FLOAT_ID, ids.mysensor)
		);
		expect(result.id).toBe(ids.innerSplit);
		const lower = expectSplit(result.second);
		expect(lower.first).toMatchObject({
			type: 'float',
			id: FLOAT_ID,
			base: { id: ids.mysensor },
			floats: [{ id: ENTRY_ID, content: { id: ids.mycam } }]
		});
		expect(lower.second).toBe(expectSplit(expectSplit(expectSplit(root).second).second).second);
	});

	it('removes a stacked pane from its stack and collapses a stack left with one pane', () => {
		const root = deepFreeze(createStackLayout());
		const result = expectSplit(
			floatPane(root, stackIds.tabB1, FLOAT_RECT, ENTRY_ID, FLOAT_ID, stackIds.solo)
		);
		const side = expectSplit(result.second);
		expect(side.first).toMatchObject({ type: 'float', base: { id: stackIds.solo } });
		expect(side.second).toMatchObject({ type: 'pane', id: stackIds.tabB2 });
	});

	it('keeps the stack and its active pane when it keeps two or more panes', () => {
		const root = deepFreeze(createStackLayout());
		const result = expectSplit(
			floatPane(root, stackIds.tabA3, FLOAT_RECT, ENTRY_ID, FLOAT_ID, stackIds.solo)
		);
		const stack = expectStack(result.first);
		expect(stack.panes.map((tab) => tab.id)).toEqual([stackIds.tabA1, stackIds.tabA2]);
		expect(stack.activeId).toBe(stackIds.tabA2);
	});

	it('takes a pane out of a stack that is the host, and what remains is the host', () => {
		const root = deepFreeze(createStackLayout());
		const result = expectSplit(
			floatPane(root, stackIds.tabA1, FLOAT_RECT, ENTRY_ID, FLOAT_ID, stackIds.stackA)
		);
		const float = expectFloat(result.first);
		expect(float.id).toBe(FLOAT_ID);
		expect(expectStack(float.base).panes.map((tab) => tab.id)).toEqual([
			stackIds.tabA2,
			stackIds.tabA3
		]);
		expect(float.floats[0]!.content).toMatchObject({ id: stackIds.tabA1 });
	});

	it('collapses a host stack left with one pane to that pane', () => {
		const root = deepFreeze(createStackLayout());
		const result = expectSplit(
			floatPane(root, stackIds.tabB1, FLOAT_RECT, ENTRY_ID, FLOAT_ID, stackIds.stackB)
		);
		const float = expectFloat(expectSplit(result.second).second);
		expect(float.base).toMatchObject({ type: 'pane', id: stackIds.tabB2 });
	});

	it('adds an entry at the end of a float node host and keeps its id', () => {
		const root = deepFreeze(createFloatLayout());
		const result = expectFloat(
			floatPane(root, floatIds.baseLeft, FLOAT_RECT, ENTRY_ID, FLOAT_ID, floatIds.float)
		);
		expect(result.id).toBe(floatIds.float);
		expect(result.base).toMatchObject({ id: floatIds.baseRight });
		expect(result.floats.map((entry) => entry.id)).toEqual([
			floatIds.entryA,
			floatIds.entryB,
			ENTRY_ID
		]);
	});

	it('uses a float node root as the default host', () => {
		const root = deepFreeze(createFloatLayout());
		const result = expectFloat(floatPane(root, floatIds.baseRight, FLOAT_RECT, ENTRY_ID, FLOAT_ID));
		expect(result.id).toBe(floatIds.float);
		expect(result.floats.at(-1)).toMatchObject({ id: ENTRY_ID });
	});

	it('returns the same root when the pane is already the whole content of an entry of the host', () => {
		const root = deepFreeze(createFloatLayout());
		expect(floatPane(root, floatIds.paneA, FLOAT_RECT, ENTRY_ID, FLOAT_ID)).toBe(root);
		expect(floatPane(root, floatIds.paneA, FLOAT_RECT, ENTRY_ID, FLOAT_ID, floatIds.float)).toBe(
			root
		);
	});

	it('moves an entry pane to another host and drops the emptied entry', () => {
		const root = deepFreeze(createFloatLayout());
		const result = expectFloat(
			floatPane(root, floatIds.paneA, FLOAT_RECT, ENTRY_ID, FLOAT_ID, floatIds.baseRight)
		);
		expect(result.floats.map((entry) => entry.id)).toEqual([floatIds.entryB]);
		const base = expectSplit(result.base);
		expect(base.second).toMatchObject({
			type: 'float',
			id: FLOAT_ID,
			base: { id: floatIds.baseRight },
			floats: [{ id: ENTRY_ID, content: { id: floatIds.paneA } }]
		});
	});

	it('wraps an entry content in a float node nested in the entry', () => {
		const root = deepFreeze(createFloatLayout());
		const result = expectFloat(
			floatPane(root, floatIds.baseLeft, FLOAT_RECT, ENTRY_ID, FLOAT_ID, floatIds.paneA)
		);
		expect(result.floats[0]).toMatchObject({
			id: floatIds.entryA,
			content: {
				type: 'float',
				id: FLOAT_ID,
				base: { id: floatIds.paneA },
				floats: [{ id: ENTRY_ID, content: { id: floatIds.baseLeft } }]
			}
		});
		expect(result.base).toMatchObject({ id: floatIds.baseRight });
	});

	it('adds an entry to a nested float node found by id', () => {
		const root = deepFreeze(createFloatLayout());
		const nested = floatPane(
			root,
			floatIds.baseLeft,
			FLOAT_RECT,
			ENTRY_ID,
			FLOAT_ID,
			floatIds.paneA
		);
		const result = expectFloat(
			floatPane(nested, floatIds.baseRight, FLOAT_RECT, 'second-entry', 'unused-float', FLOAT_ID)
		);
		const inner = expectFloat(result.floats[0]!.content);
		expect(inner.id).toBe(FLOAT_ID);
		expect(inner.floats.map((entry) => entry.id)).toEqual([ENTRY_ID, 'second-entry']);
	});

	it('leaves a base-less float node when the base pane floats out of a float node with entries', () => {
		const root = deepFreeze<LayoutNode<PaneData>>({
			type: 'float',
			id: 'f',
			base: pane('only-base', 'Base'),
			floats: [{ id: 'e', rect: FLOAT_RECT, content: pane('p', 'P') }]
		});
		const result = expectFloat(floatPane(root, 'only-base', FLOAT_RECT, ENTRY_ID, FLOAT_ID));
		expect(result.id).toBe('f');
		expect(result.base).toBeUndefined();
		expect(result.floats.map((entry) => entry.id)).toEqual(['e', ENTRY_ID]);
	});
});

describe('floatStack', () => {
	it.each([stackIds.solo, stackIds.tabA1])('returns the same root when the source is %s', (id) => {
		const root = deepFreeze(createStackLayout());
		expect(floatStack(root, id, FLOAT_RECT, ENTRY_ID, FLOAT_ID)).toBe(root);
	});

	it('returns the same root when the host is a pane inside the stack', () => {
		const root = deepFreeze(createStackLayout());
		expect(floatStack(root, stackIds.stackA, FLOAT_RECT, ENTRY_ID, FLOAT_ID, stackIds.tabA3)).toBe(
			root
		);
	});

	it('floats the whole stack over the root by default', () => {
		const root = deepFreeze(createStackLayout());
		const result = expectFloat(floatStack(root, stackIds.stackA, FLOAT_RECT, ENTRY_ID, FLOAT_ID));
		expect(result.base).toBe(expectSplit(root).second);
		expect(result.floats[0]).toEqual({
			id: ENTRY_ID,
			rect: FLOAT_RECT,
			content: expectSplit(root).first
		});
	});

	it('returns the same root when the stack is already the whole content of an entry of the host', () => {
		const root = deepFreeze<LayoutNode<PaneData>>({
			type: 'float',
			id: 'f',
			base: pane('b', 'B'),
			floats: [
				{
					id: 'e',
					rect: FLOAT_RECT,
					content: {
						type: 'stack',
						id: 'stk',
						panes: [pane('t1', 'T1'), pane('t2', 'T2')],
						activeId: 't1'
					}
				}
			]
		});
		expect(floatStack(root, 'stk', FLOAT_RECT, ENTRY_ID, FLOAT_ID)).toBe(root);
	});

	it('adds the stack as an entry of a float node host', () => {
		const root = deepFreeze<LayoutNode<PaneData>>({
			type: 'split',
			id: 'outer',
			direction: 'row',
			ratio: 0.5,
			first: {
				type: 'stack',
				id: 'stk',
				panes: [pane('t1', 'T1'), pane('t2', 'T2')],
				activeId: 't1'
			},
			second: {
				type: 'float',
				id: 'f',
				base: pane('b', 'B'),
				floats: [{ id: 'e', rect: FLOAT_RECT, content: pane('p', 'P') }]
			}
		});
		const result = expectFloat(floatStack(root, 'stk', FLOAT_RECT, ENTRY_ID, FLOAT_ID, 'f'));
		expect(result.id).toBe('f');
		expect(result.floats.map((entry) => entry.id)).toEqual(['e', ENTRY_ID]);
		expect(result.floats[1]!.content).toMatchObject({ type: 'stack', id: 'stk' });
	});
});

describe('docking out of an entry', () => {
	it('movePane docks an entry pane beside a base pane and drops the emptied entry', () => {
		const root = deepFreeze(createFloatLayout());
		const result = expectFloat(
			movePane(root, floatIds.paneA, floatIds.baseRight, 'column', 'first', 's')
		);
		expect(result.floats.map((entry) => entry.id)).toEqual([floatIds.entryB]);
		const base = expectSplit(result.base);
		expect(expectSplit(base.second)).toMatchObject({
			first: { id: floatIds.paneA },
			second: { id: floatIds.baseRight }
		});
	});

	it('movePane collapses the float node when the last entry docks', () => {
		const root = deepFreeze<LayoutNode<PaneData>>({
			type: 'float',
			id: 'f',
			base: pane('b', 'B'),
			floats: [{ id: 'e', rect: FLOAT_RECT, content: pane('p', 'P') }]
		});
		expect(movePane(root, 'p', 'b', 'row', 'second', 's')).toMatchObject({
			type: 'split',
			id: 's',
			first: { id: 'b' },
			second: { id: 'p' }
		});
	});

	it('stackPanes docks an entry pane into a stack with a base pane and drops the entry', () => {
		const root = deepFreeze(createFloatLayout());
		const result = expectFloat(stackPanes(root, floatIds.baseLeft, floatIds.paneB, 'new-stack'));
		expect(result.floats.map((entry) => entry.id)).toEqual([floatIds.entryA]);
		const stack = expectStack(expectSplit(result.base).first);
		expect(stack.panes.map((tab) => tab.id)).toEqual([floatIds.baseLeft, floatIds.paneB]);
	});

	it('swapPanes exchanges an entry pane with a base pane and keeps the entry', () => {
		const root = deepFreeze(createFloatLayout());
		const result = expectFloat(swapPanes(root, floatIds.paneA, floatIds.baseLeft));
		expect(result.floats[0]).toMatchObject({
			id: floatIds.entryA,
			content: { id: floatIds.baseLeft }
		});
		expect(expectSplit(result.base).first).toMatchObject({ id: floatIds.paneA });
	});

	it('moveStack docks an entry stack beside a base pane and drops the emptied entry', () => {
		const root = deepFreeze<LayoutNode<PaneData>>({
			type: 'float',
			id: 'f',
			base: pane('b', 'B'),
			floats: [
				{
					id: 'e',
					rect: FLOAT_RECT,
					content: {
						type: 'stack',
						id: 'stk',
						panes: [pane('t1', 'T1'), pane('t2', 'T2')],
						activeId: 't1'
					}
				}
			]
		});
		const result = expectSplit(moveStack(root, 'stk', 'b', 'row', 'first', 's'));
		expect(result.first).toMatchObject({ type: 'stack', id: 'stk' });
		expect(result.second).toMatchObject({ id: 'b' });
	});
});
