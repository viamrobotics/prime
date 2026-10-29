import { describe, expect, it } from 'vitest';

import {
	ALL_REGIONS,
	EDGE_REGIONS,
	edgeOfArrow,
	stepInsertion,
	stepRegion
} from '../arrow-regions.ts';
import type { DropRegion, EdgeRegion } from '../../drop-region.ts';

describe('edgeOfArrow', () => {
	const UNMODIFIED = { altKey: false, ctrlKey: false, metaKey: false };

	it('maps an arrow key to its edge', () => {
		expect(edgeOfArrow({ ...UNMODIFIED, key: 'ArrowUp' })).toBe('top');
	});

	it.each([{ modifier: 'ctrlKey' }, { modifier: 'metaKey' }, { modifier: 'altKey' }] as const)(
		'ignores an arrow key with $modifier held',
		({ modifier }) => {
			expect(edgeOfArrow({ ...UNMODIFIED, key: 'ArrowUp', [modifier]: true })).toBeUndefined();
		}
	);
});

describe('stepRegion', () => {
	it.each([
		{ from: 'center', direction: 'left', to: 'left' },
		{ from: 'center', direction: 'right', to: 'right' },
		{ from: 'center', direction: 'top', to: 'top' },
		{ from: 'center', direction: 'bottom', to: 'bottom' },
		{ from: 'left', direction: 'right', to: 'center' },
		{ from: 'right', direction: 'left', to: 'center' },
		{ from: 'top', direction: 'bottom', to: 'center' },
		{ from: 'bottom', direction: 'top', to: 'center' },
		{ from: 'top', direction: 'top', to: 'stack' },
		{ from: 'stack', direction: 'bottom', to: 'top' }
	] as const)('steps from $from to $to with the $direction arrow', ({ from, direction, to }) => {
		expect(stepRegion(from, direction, ALL_REGIONS, 'top')).toBe(to);
	});

	it.each([
		{ from: 'top', direction: 'left', to: 'left' },
		{ from: 'top', direction: 'right', to: 'right' },
		{ from: 'bottom', direction: 'left', to: 'left' },
		{ from: 'bottom', direction: 'right', to: 'right' },
		{ from: 'stack', direction: 'left', to: 'left' },
		{ from: 'stack', direction: 'right', to: 'right' }
	] as const)(
		'counts $from as the horizontal center, so $direction steps to $to',
		({ from, direction, to }) => {
			expect(stepRegion(from, direction, ALL_REGIONS, 'top')).toBe(to);
		}
	);

	it.each([
		{ from: 'left', direction: 'top', to: 'top' },
		{ from: 'left', direction: 'bottom', to: 'bottom' },
		{ from: 'right', direction: 'top', to: 'top' },
		{ from: 'right', direction: 'bottom', to: 'bottom' }
	] as const)(
		'counts $from as the vertical center, so $direction steps to $to',
		({ from, direction, to }) => {
			expect(stepRegion(from, direction, ALL_REGIONS, 'top')).toBe(to);
		}
	);

	it.each([
		{ from: 'left', direction: 'left' },
		{ from: 'right', direction: 'right' },
		{ from: 'stack', direction: 'top' },
		{ from: 'bottom', direction: 'bottom' }
	] as const satisfies readonly { from: DropRegion; direction: EdgeRegion }[])(
		'leaves the pane when the $direction arrow follows $from',
		({ from, direction }) => {
			expect(stepRegion(from, direction, ALL_REGIONS, 'top')).toBeUndefined();
		}
	);

	it.each([
		{ from: 'left', direction: 'right', to: 'right' },
		{ from: 'right', direction: 'left', to: 'left' },
		{ from: 'top', direction: 'bottom', to: 'bottom' },
		{ from: 'bottom', direction: 'top', to: 'top' },
		{ from: 'left', direction: 'top', to: 'top' },
		{ from: 'top', direction: 'left', to: 'left' }
	] as const)(
		'steps from $from to $to with the $direction arrow when only the edges are offered',
		({ from, direction, to }) => {
			expect(stepRegion(from, direction, EDGE_REGIONS, 'top')).toBe(to);
		}
	);

	it.each([
		{ side: 'left', to: 'stack', from: 'left', direction: 'left' },
		{ side: 'right', to: 'stack', from: 'right', direction: 'right' },
		{ side: 'bottom', to: 'stack', from: 'bottom', direction: 'bottom' },
		{ side: 'left', to: 'left', from: 'stack', direction: 'right' },
		{ side: 'right', to: 'right', from: 'stack', direction: 'left' },
		{ side: 'bottom', to: 'bottom', from: 'stack', direction: 'top' },
		{ side: 'left', to: 'top', from: 'stack', direction: 'top' },
		{ side: 'left', to: 'bottom', from: 'stack', direction: 'bottom' },
		{ side: 'right', to: 'top', from: 'stack', direction: 'top' },
		{ side: 'right', to: 'bottom', from: 'stack', direction: 'bottom' },
		{ side: 'bottom', to: 'left', from: 'stack', direction: 'left' },
		{ side: 'bottom', to: 'right', from: 'stack', direction: 'right' }
	] as const)(
		'steps from $from to $to with the $direction arrow when the stack is on the $side',
		({ side, from, direction, to }) => {
			expect(stepRegion(from, direction, ALL_REGIONS, side)).toBe(to);
		}
	);

	it.each([{ side: 'left' }, { side: 'right' }, { side: 'bottom' }, { side: 'top' }] as const)(
		'steps over the stack and leaves the pane from the $side edge when it is not offered',
		({ side }) => {
			expect(stepRegion(side, side, EDGE_REGIONS, side)).toBeUndefined();
		}
	);

	it('leaves the pane from the top edge with the up arrow when the stack is on the left', () => {
		expect(stepRegion('top', 'top', ALL_REGIONS, 'left')).toBeUndefined();
	});

	it.each([
		{ side: 'left', from: 'left', direction: 'left' },
		{ side: 'right', from: 'right', direction: 'right' },
		{ side: 'bottom', from: 'bottom', direction: 'bottom' }
	] as const)(
		'leaves the pane when the $direction arrow follows the stack on the $side',
		({ side, direction }) => {
			expect(stepRegion('stack', direction, ALL_REGIONS, side)).toBeUndefined();
		}
	);
});

describe('stepInsertion', () => {
	it.each([
		{ index: 1, direction: 'right', lastIndex: 3, expected: 2 },
		{ index: 1, direction: 'left', lastIndex: 3, expected: 0 },
		{ index: 2, direction: 'right', lastIndex: 3, expected: 3 }
	] as const)(
		'moves from $index to $expected with $direction when the strip ends at $lastIndex',
		({ index, direction, lastIndex, expected }) => {
			expect(stepInsertion(index, direction, lastIndex)).toBe(expected);
		}
	);

	it.each([
		{ index: 0, direction: 'left', lastIndex: 3 },
		{ index: 3, direction: 'right', lastIndex: 3 }
	] as const)(
		'leaves the strip with $direction from $index when the strip ends at $lastIndex',
		({ index, direction, lastIndex }) => {
			expect(stepInsertion(index, direction, lastIndex)).toBeUndefined();
		}
	);

	it.each(['top', 'bottom'] as const)('ignores the vertical arrow %s', (direction) => {
		expect(stepInsertion(1, direction, 3)).toBeUndefined();
	});
});
