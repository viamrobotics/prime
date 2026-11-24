import { describe, expect, it } from 'vitest';

import type { FloatRect } from '../../layout.ts';
import {
	isArrowKey,
	moveFloatRectByKey,
	resizeFloatRectByKey,
	type ArrowKey
} from '../float-keys.ts';

const BOX = { width: 800, height: 600 };
const MINIMUM = { width: 120, height: 90 };
const START = { x: 200, y: 150, width: 300, height: 200 };

describe('isArrowKey', () => {
	it.each(['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'])('accepts %s', (key) => {
		expect(isArrowKey(key), `${key} is an arrow key`).toBe(true);
	});

	it.each(['Enter', 'a', 'toString', 'PageDown'])('rejects %s', (key) => {
		expect(isArrowKey(key), `${key} is not an arrow key`).toBe(false);
	});
});

describe('moveFloatRectByKey', () => {
	it.each<{ key: ArrowKey; expected: { x: number; y: number } }>([
		{ key: 'ArrowLeft', expected: { x: 190, y: 150 } },
		{ key: 'ArrowRight', expected: { x: 210, y: 150 } },
		{ key: 'ArrowUp', expected: { x: 200, y: 140 } },
		{ key: 'ArrowDown', expected: { x: 200, y: 160 } }
	])('moves 10 pixels along $key and keeps the size', ({ key, expected }) => {
		expect(moveFloatRectByKey(START, key, 10, BOX, MINIMUM)).toEqual({
			...expected,
			width: 300,
			height: 200
		});
	});

	it.each<{ name: string; key: ArrowKey; distance: number; rect: FloatRect; expected: FloatRect }>([
		{
			name: 'stops at the left edge of the box',
			key: 'ArrowLeft',
			distance: 10,
			rect: { x: 5, y: 3, width: 300, height: 200 },
			expected: { x: 0, y: 3, width: 300, height: 200 }
		},
		{
			name: 'stops at the top edge of the box',
			key: 'ArrowUp',
			distance: 10,
			rect: { x: 5, y: 3, width: 300, height: 200 },
			expected: { x: 5, y: 0, width: 300, height: 200 }
		},
		{
			name: 'stops at the right edge of the box',
			key: 'ArrowRight',
			distance: 100,
			rect: { x: 495, y: 395, width: 300, height: 200 },
			expected: { x: 500, y: 395, width: 300, height: 200 }
		},
		{
			name: 'stops at the bottom edge of the box',
			key: 'ArrowDown',
			distance: 100,
			rect: { x: 495, y: 395, width: 300, height: 200 },
			expected: { x: 495, y: 400, width: 300, height: 200 }
		},
		{
			name: 'steps from where the window is drawn when the stored rect lies outside the box',
			key: 'ArrowLeft',
			distance: 10,
			rect: { x: 900, y: 150, width: 300, height: 200 },
			expected: { x: 490, y: 150, width: 300, height: 200 }
		}
	])('$name', ({ key, distance, rect, expected }) => {
		expect(moveFloatRectByKey(rect, key, distance, BOX, MINIMUM)).toEqual(expected);
	});
});

describe('resizeFloatRectByKey', () => {
	it.each<{ key: ArrowKey; expected: { width: number; height: number } }>([
		{ key: 'ArrowRight', expected: { width: 310, height: 200 } },
		{ key: 'ArrowLeft', expected: { width: 290, height: 200 } },
		{ key: 'ArrowDown', expected: { width: 300, height: 210 } },
		{ key: 'ArrowUp', expected: { width: 300, height: 190 } }
	])('resizes 10 pixels along $key and keeps the north west corner', ({ key, expected }) => {
		expect(resizeFloatRectByKey(START, key, 10, BOX, MINIMUM)).toEqual({
			x: 200,
			y: 150,
			...expected
		});
	});

	it.each<{ name: string; key: ArrowKey; distance: number; expected: FloatRect }>([
		{
			name: 'stops shrinking the width at the minimum',
			key: 'ArrowLeft',
			distance: 100,
			expected: { x: 200, y: 150, width: 120, height: 100 }
		},
		{
			name: 'stops shrinking the height at the minimum',
			key: 'ArrowUp',
			distance: 100,
			expected: { x: 200, y: 150, width: 130, height: 90 }
		}
	])('$name', ({ key, distance, expected }) => {
		const rect = { x: 200, y: 150, width: 130, height: 100 };

		expect(resizeFloatRectByKey(rect, key, distance, BOX, MINIMUM)).toEqual(expected);
	});

	it.each<{ name: string; key: ArrowKey; expected: FloatRect }>([
		{
			name: 'stops growing the width at the right edge of the box',
			key: 'ArrowRight',
			expected: { x: 200, y: 150, width: 600, height: 200 }
		},
		{
			name: 'stops growing the height at the bottom edge of the box',
			key: 'ArrowDown',
			expected: { x: 200, y: 150, width: 300, height: 450 }
		}
	])('$name', ({ key, expected }) => {
		expect(resizeFloatRectByKey(START, key, 1000, BOX, MINIMUM)).toEqual(expected);
	});
});
