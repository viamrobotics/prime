import { describe, expect, it } from 'vitest';

import { stepRegion } from '../arrow-regions.ts';
import type { DropRegion, EdgeRegion } from '../../drop-region.ts';

describe('stepRegion', () => {
	it.each([
		{ from: 'center', direction: 'left', to: 'left' },
		{ from: 'center', direction: 'right', to: 'right' },
		{ from: 'center', direction: 'top', to: 'top' },
		{ from: 'center', direction: 'bottom', to: 'bottom' },
		{ from: 'left', direction: 'right', to: 'center' },
		{ from: 'right', direction: 'left', to: 'center' },
		{ from: 'top', direction: 'bottom', to: 'center' },
		{ from: 'bottom', direction: 'top', to: 'center' }
	] as const)('steps from $from to $to with the $direction arrow', ({ from, direction, to }) => {
		expect(stepRegion(from, direction)).toBe(to);
	});

	it.each([
		{ from: 'top', direction: 'left', to: 'left' },
		{ from: 'top', direction: 'right', to: 'right' },
		{ from: 'bottom', direction: 'left', to: 'left' },
		{ from: 'bottom', direction: 'right', to: 'right' }
	] as const)(
		'counts $from as the horizontal center, so $direction steps to $to',
		({ from, direction, to }) => {
			expect(stepRegion(from, direction)).toBe(to);
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
			expect(stepRegion(from, direction)).toBe(to);
		}
	);

	it.each([
		{ from: 'left', direction: 'left' },
		{ from: 'right', direction: 'right' },
		{ from: 'top', direction: 'top' },
		{ from: 'bottom', direction: 'bottom' }
	] as const satisfies readonly { from: DropRegion; direction: EdgeRegion }[])(
		'leaves the pane when the $direction arrow follows $from',
		({ from, direction }) => {
			expect(stepRegion(from, direction)).toBeUndefined();
		}
	);
});
