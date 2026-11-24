import { describe, expect, it } from 'vitest';

import {
	CAM_A,
	CAM_B,
	CAM_C,
	CAMERA_ROW,
	CAMERAS,
	SOLO,
	STACK_B,
	TWO_STACKS
} from '../../../../test/layouts.ts';
import {
	findPane,
	findStack,
	findStackHolding,
	listPanes,
	listSlots,
	listStacks
} from '../list-panes.ts';

describe('listPanes', () => {
	it('returns no panes for an undefined root', () => {
		expect(listPanes(undefined)).toEqual([]);
	});

	it('returns a lone pane', () => {
		expect(listPanes(SOLO)).toEqual([SOLO]);
	});

	it('returns a stack panes in tab order', () => {
		expect(listPanes(CAMERAS)).toEqual([CAM_A, CAM_B, CAM_C]);
	});

	it('returns the first child panes before the second', () => {
		expect(listPanes(CAMERA_ROW).map((pane) => pane.id)).toEqual([
			'cam-a',
			'cam-b',
			'cam-c',
			'solo'
		]);
	});

	it('flattens stacks on both sides of a split', () => {
		expect(listPanes(TWO_STACKS).map((pane) => pane.id)).toEqual(['a1', 'a2', 'b1', 'b2', 'b3']);
	});
});

describe('listSlots', () => {
	it('returns no slots for an undefined root', () => {
		expect(listSlots(undefined)).toEqual([]);
	});

	it('keeps a stack whole as one slot, in position order', () => {
		expect(listSlots(CAMERA_ROW)).toEqual([CAMERAS, SOLO]);
	});
});

describe('listStacks', () => {
	it('returns only the stacks, in position order', () => {
		expect(listStacks(TWO_STACKS).map((stack) => stack.id)).toEqual(['stack-a', 'stack-b']);
	});

	it('returns no stacks for a layout of plain panes', () => {
		expect(listStacks(SOLO)).toEqual([]);
	});
});

describe('findPane', () => {
	it('finds a pane by id', () => {
		expect(findPane(CAMERA_ROW, 'solo')).toBe(SOLO);
	});

	it('finds a stacked pane by id', () => {
		expect(findPane(CAMERA_ROW, 'cam-b')).toBe(CAM_B);
	});

	it('returns undefined for an id that names no pane', () => {
		expect(findPane(CAMERA_ROW, 'missing')).toBeUndefined();
	});

	it('returns undefined for a stack id', () => {
		expect(findPane(CAMERA_ROW, 'cameras')).toBeUndefined();
	});

	it('returns undefined for an undefined root', () => {
		expect(findPane(undefined, 'solo')).toBeUndefined();
	});
});

describe('findStack', () => {
	it('finds a stack by id', () => {
		expect(findStack(TWO_STACKS, 'stack-b')).toBe(STACK_B);
	});

	it('returns undefined for a pane id', () => {
		expect(findStack(TWO_STACKS, 'b1')).toBeUndefined();
	});

	it('returns undefined for an undefined root', () => {
		expect(findStack(undefined, 'stack-b')).toBeUndefined();
	});
});

describe('findStackHolding', () => {
	it('finds the stack that holds a pane', () => {
		expect(findStackHolding(TWO_STACKS, 'b3')).toBe(STACK_B);
	});

	it('returns undefined for a pane outside any stack', () => {
		expect(findStackHolding(CAMERA_ROW, 'solo')).toBeUndefined();
	});

	it('returns undefined for a stack id', () => {
		expect(findStackHolding(TWO_STACKS, 'stack-b')).toBeUndefined();
	});
});
