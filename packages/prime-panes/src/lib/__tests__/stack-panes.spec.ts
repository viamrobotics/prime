import { describe, expect, it } from 'vitest';

import { stackPanes } from '../tree.ts';
import {
	CAMERA,
	CAMERA_2,
	createLayout,
	createStackLayout,
	deepFreeze,
	ids,
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

import type { LayoutNode } from '../layout.ts';
import type { PaneData } from '../../../test/layouts.ts';

const NEW_STACK_ID = 'new-stack';

function stackLayout(first: LayoutNode<PaneData>, second: LayoutNode<PaneData>) {
	return split(stackIds.rootSplit, 'row', 0.6, first, second);
}

function cameraLayout(camera: LayoutNode<PaneData>, innerSplit: LayoutNode<PaneData>) {
	return split(ids.rootSplit, 'column', 0.3, camera, innerSplit);
}

describe('stackPanes', () => {
	it('returns undefined for an undefined root', () => {
		const root = undefined;

		const result = stackPanes<PaneData>(root, stackIds.solo, stackIds.tabA1, NEW_STACK_ID);

		expect(result).toBeUndefined();
	});

	it.each([
		{ name: 'the target names no node', target: 'missing', source: stackIds.solo },
		{ name: 'the target names a stack', target: stackIds.stackA, source: stackIds.solo },
		{ name: 'the target names a split', target: stackIds.sideSplit, source: stackIds.solo },
		{ name: 'the source names no node', target: stackIds.solo, source: 'missing' },
		{ name: 'the source names a split', target: stackIds.solo, source: stackIds.sideSplit },
		{ name: 'the target is the source', target: stackIds.solo, source: stackIds.solo },
		{
			name: 'the target shares a stack with the source pane',
			target: stackIds.tabA1,
			source: stackIds.tabA3
		},
		{
			name: 'the target is in the source stack',
			target: stackIds.tabA1,
			source: stackIds.stackA
		}
	])('returns the same root when $name', ({ target, source }) => {
		const root = createStackLayout();

		const result = stackPanes(root, target, source, NEW_STACK_ID);

		expect(result).toBe(root);
	});

	it('merges a plain pane into a plain pane as a new stack showing the source', () => {
		const root = createLayout();

		const result = stackPanes(root, ids.mycam, ids.mycam2, NEW_STACK_ID);

		expect(result).toEqual(
			cameraLayout(
				stack(NEW_STACK_ID, [CAMERA, CAMERA_2], ids.mycam2),
				split(ids.innerSplit, 'row', 0.6, TIME_SERIES, SENSOR)
			)
		);
	});

	it('appends a plain pane to a target stack and shows it', () => {
		const root = createStackLayout();

		const result = stackPanes(root, stackIds.tabA1, stackIds.solo, NEW_STACK_ID);

		expect(result).toEqual(
			stackLayout(
				stack(stackIds.stackA, [TAB_A1, TAB_A2, TAB_A3, SOLO_PANE], stackIds.solo),
				TAB_STACK_B
			)
		);
	});

	it('merges a stack into a plain pane, keeping the source order and active pane', () => {
		const root = createStackLayout();

		const result = stackPanes(root, stackIds.solo, stackIds.stackB, NEW_STACK_ID);

		expect(result).toEqual(
			stackLayout(TAB_STACK_A, stack(NEW_STACK_ID, [SOLO_PANE, TAB_B1, TAB_B2], stackIds.tabB1))
		);
	});

	it('merges a stack into a stack and shows the source active pane', () => {
		const root = createStackLayout();

		const result = stackPanes(root, stackIds.tabA1, stackIds.stackB, NEW_STACK_ID);

		expect(result).toEqual(
			stackLayout(
				stack(stackIds.stackA, [TAB_A1, TAB_A2, TAB_A3, TAB_B1, TAB_B2], stackIds.tabB1),
				SOLO_PANE
			)
		);
	});

	it('takes a stacked pane out of its stack and applies the active fallback', () => {
		const root = createStackLayout();

		const result = stackPanes(root, stackIds.solo, stackIds.tabA2, NEW_STACK_ID);

		expect(result).toEqual(
			stackLayout(
				stack(stackIds.stackA, [TAB_A1, TAB_A3], stackIds.tabA3),
				split(
					stackIds.sideSplit,
					'column',
					0.4,
					stack(NEW_STACK_ID, [SOLO_PANE, TAB_A2], stackIds.tabA2),
					TAB_STACK_B
				)
			)
		);
	});

	it('collapses a source stack left with one pane to that pane', () => {
		const root = createStackLayout();

		const result = stackPanes(root, stackIds.solo, stackIds.tabB2, NEW_STACK_ID);

		expect(result).toEqual(
			stackLayout(
				TAB_STACK_A,
				split(
					stackIds.sideSplit,
					'column',
					0.4,
					stack(NEW_STACK_ID, [SOLO_PANE, TAB_B2], stackIds.tabB2),
					TAB_B1
				)
			)
		);
	});

	it.each([
		{ name: 'a stack into a stack', target: stackIds.tabA1, source: stackIds.stackB },
		{ name: 'a stacked pane into a plain pane', target: stackIds.solo, source: stackIds.tabA2 },
		{ name: 'a plain pane into a stack', target: stackIds.tabA1, source: stackIds.solo }
	])('leaves a deep-frozen input unchanged when stacking $name', ({ target, source }) => {
		const root = deepFreeze(createStackLayout());
		const before = structuredClone(root);

		const result = stackPanes(root, target, source, NEW_STACK_ID);

		expect(root).toEqual(before);
		expect(result).not.toBe(root);
	});
});

describe('stackPanes with an index', () => {
	it.each([
		{ index: 0, expected: [SOLO_PANE, TAB_A1, TAB_A2, TAB_A3] },
		{ index: 2, expected: [TAB_A1, TAB_A2, SOLO_PANE, TAB_A3] },
		{ index: 3, expected: [TAB_A1, TAB_A2, TAB_A3, SOLO_PANE] },
		{ index: 99, expected: [TAB_A1, TAB_A2, TAB_A3, SOLO_PANE] },
		{ index: -1, expected: [SOLO_PANE, TAB_A1, TAB_A2, TAB_A3] },
		{ index: -5, expected: [SOLO_PANE, TAB_A1, TAB_A2, TAB_A3] },
		{ index: 1.9, expected: [TAB_A1, SOLO_PANE, TAB_A2, TAB_A3] },
		{ index: undefined, expected: [TAB_A1, TAB_A2, TAB_A3, SOLO_PANE] }
	])('puts the source at index $index of a stacked target', ({ index, expected }) => {
		const root = createStackLayout();

		const result = stackPanes(root, stackIds.tabA1, stackIds.solo, NEW_STACK_ID, index);

		expect(result).toEqual(
			stackLayout(stack(stackIds.stackA, expected, stackIds.solo), TAB_STACK_B)
		);
	});

	it.each([
		{ index: 0, expected: [CAMERA_2, CAMERA] },
		{ index: 1, expected: [CAMERA, CAMERA_2] }
	])('puts the source at index $index of an unstacked target', ({ index, expected }) => {
		const root = createLayout();

		const result = stackPanes(root, ids.mycam, ids.mycam2, NEW_STACK_ID, index);

		expect(result).toEqual(
			cameraLayout(
				stack(NEW_STACK_ID, expected, ids.mycam2),
				split(ids.innerSplit, 'row', 0.6, TIME_SERIES, SENSOR)
			)
		);
	});

	it('inserts a whole source stack at an index in its own order', () => {
		const root = createStackLayout();

		const result = stackPanes(root, stackIds.tabA1, stackIds.stackB, NEW_STACK_ID, 1);

		expect(result).toEqual(
			stackLayout(
				stack(stackIds.stackA, [TAB_A1, TAB_B1, TAB_B2, TAB_A2, TAB_A3], stackIds.tabB1),
				SOLO_PANE
			)
		);
	});

	it('inserts a whole source stack before an unstacked target at index 0', () => {
		const root = createStackLayout();

		const result = stackPanes(root, stackIds.solo, stackIds.stackB, NEW_STACK_ID, 0);

		expect(result).toEqual(
			stackLayout(TAB_STACK_A, stack(NEW_STACK_ID, [TAB_B1, TAB_B2, SOLO_PANE], stackIds.tabB1))
		);
	});
});
