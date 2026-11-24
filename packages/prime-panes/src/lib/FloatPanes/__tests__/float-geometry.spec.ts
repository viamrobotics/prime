import { describe, expect, it } from 'vitest';

import { clampToBox, fitMinimumToBox } from '../float-geometry.ts';

const BOX = { width: 800, height: 600 };
const MINIMUM = { width: 120, height: 90 };
const START = { x: 200, y: 150, width: 300, height: 200 };

describe('fitMinimumToBox', () => {
	it('keeps a minimum the box fits', () => {
		expect(fitMinimumToBox(MINIMUM, BOX)).toEqual(MINIMUM);
	});

	it('shrinks each side of a minimum the box cannot fit to the box', () => {
		expect(fitMinimumToBox({ width: 1000, height: 50 }, BOX)).toEqual({ width: 800, height: 50 });
	});

	it('keeps the minimum while the box is unmeasured', () => {
		expect(fitMinimumToBox(MINIMUM, { width: 0, height: 0 })).toEqual(MINIMUM);
	});
});

describe('clampToBox', () => {
	it.each([
		{
			name: 'leaves a rect inside the box alone',
			rect: START,
			expected: START
		},
		{
			name: 'moves a rect past the far edges back inside',
			rect: { x: 700, y: 500, width: 300, height: 200 },
			expected: { x: 500, y: 400, width: 300, height: 200 }
		},
		{
			name: 'moves a rect past the near edges back to the corner',
			rect: { x: -40, y: -10, width: 300, height: 200 },
			expected: { x: 0, y: 0, width: 300, height: 200 }
		},
		{
			name: 'shrinks a rect larger than the box to the box',
			rect: { x: 100, y: 100, width: 1000, height: 700 },
			expected: { x: 0, y: 0, width: 800, height: 600 }
		},
		{
			name: 'grows a rect smaller than the minimum to the minimum',
			rect: { x: 100, y: 100, width: 100, height: 80 },
			expected: { x: 100, y: 100, width: 120, height: 90 }
		},
		{
			name: 'moves a rect grown to the minimum back inside the box',
			rect: { x: 750, y: 580, width: 40, height: 10 },
			expected: { x: 680, y: 510, width: 120, height: 90 }
		}
	])('$name', ({ rect, expected }) => {
		expect(clampToBox(rect, BOX, MINIMUM)).toEqual(expected);
	});

	it('still draws no smaller than the minimum while the box is unmeasured', () => {
		const rect = { x: 100, y: 100, width: 100, height: 80 };

		expect(clampToBox(rect, { width: 0, height: 0 }, MINIMUM)).toEqual({
			x: 100,
			y: 100,
			width: 120,
			height: 90
		});
	});
});
