import { describe, expect, it } from 'vitest';

import { resizeFloatRect } from '../float-resize.ts';

const BOX = { width: 800, height: 600 };
const MINIMUM = { width: 120, height: 90 };
const START = { x: 200, y: 150, width: 300, height: 200 };

describe('resizeFloatRect', () => {
	it.each([
		{
			name: 'grows the far corner from se',
			axis: 'se',
			size: { width: 400, height: 250 },
			expected: { x: 200, y: 150, width: 400, height: 250 }
		},
		{
			name: 'keeps the right edge when w shrinks to the minimum',
			axis: 'w',
			size: { width: 120, height: 200 },
			expected: { x: 380, y: 150, width: 120, height: 200 }
		},
		{
			name: 'keeps the bottom edge when n shrinks to the minimum',
			axis: 'n',
			size: { width: 300, height: 90 },
			expected: { x: 200, y: 260, width: 300, height: 90 }
		},
		{
			name: 'keeps both far edges when nw shrinks to the minimum',
			axis: 'nw',
			size: { width: 120, height: 90 },
			expected: { x: 380, y: 260, width: 120, height: 90 }
		},
		{
			name: 'moves only the top and right edges from ne',
			axis: 'ne',
			size: { width: 350, height: 230 },
			expected: { x: 200, y: 120, width: 350, height: 230 }
		},
		{
			name: 'moves only the left and bottom edges from sw',
			axis: 'sw',
			size: { width: 350, height: 230 },
			expected: { x: 150, y: 150, width: 350, height: 230 }
		},
		{
			name: 'ignores the other dimension of an edge handle',
			axis: 'e',
			size: { width: 340, height: 999 },
			expected: { x: 200, y: 150, width: 340, height: 200 }
		}
	] as const)('$name', ({ axis, size, expected }) => {
		expect(resizeFloatRect(START, axis, size, BOX, MINIMUM)).toEqual(expected);
	});

	it.each([
		{
			name: 'stops the east edge at the right edge of the box',
			axis: 'e',
			size: { width: 900, height: 200 },
			expected: { x: 200, y: 150, width: 600, height: 200 }
		},
		{
			name: 'stops the west edge at the left edge of the box',
			axis: 'w',
			size: { width: 900, height: 200 },
			expected: { x: 0, y: 150, width: 500, height: 200 }
		},
		{
			name: 'stops the south edge at the bottom edge of the box',
			axis: 's',
			size: { width: 300, height: 900 },
			expected: { x: 200, y: 150, width: 300, height: 450 }
		},
		{
			name: 'stops the north edge at the top edge of the box',
			axis: 'n',
			size: { width: 300, height: 900 },
			expected: { x: 200, y: 0, width: 300, height: 350 }
		}
	] as const)('$name', ({ axis, size, expected }) => {
		expect(resizeFloatRect(START, axis, size, BOX, MINIMUM)).toEqual(expected);
	});

	it('rounds the size to whole pixels', () => {
		const resized = resizeFloatRect(START, 'nw', { width: 399.6, height: 249.4 }, BOX, MINIMUM);

		expect(resized).toEqual({ x: 100, y: 101, width: 400, height: 249 });
	});
});
