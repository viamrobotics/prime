import { describe, expect, it } from 'vitest';

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
		expect(isArrowKey(key)).toBe(true);
	});

	it.each(['Enter', 'a', 'toString', 'PageDown'])('rejects %s', (key) => {
		expect(isArrowKey(key)).toBe(false);
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

	it('stops at the near edges of the box', () => {
		const rect = { x: 5, y: 3, width: 300, height: 200 };
		expect(moveFloatRectByKey(rect, 'ArrowLeft', 10, BOX, MINIMUM).x).toBe(0);
		expect(moveFloatRectByKey(rect, 'ArrowUp', 10, BOX, MINIMUM).y).toBe(0);
	});

	it('stops at the far edges of the box', () => {
		const rect = { x: 495, y: 395, width: 300, height: 200 };
		expect(moveFloatRectByKey(rect, 'ArrowRight', 100, BOX, MINIMUM).x).toBe(500);
		expect(moveFloatRectByKey(rect, 'ArrowDown', 100, BOX, MINIMUM).y).toBe(400);
	});

	it('steps from where the window is drawn when the stored rect lies outside the box', () => {
		const rect = { x: 900, y: 150, width: 300, height: 200 };
		expect(moveFloatRectByKey(rect, 'ArrowLeft', 10, BOX, MINIMUM).x).toBe(490);
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

	it('stops shrinking at the minimum', () => {
		const rect = { x: 200, y: 150, width: 130, height: 100 };
		expect(resizeFloatRectByKey(rect, 'ArrowLeft', 100, BOX, MINIMUM).width).toBe(120);
		expect(resizeFloatRectByKey(rect, 'ArrowUp', 100, BOX, MINIMUM).height).toBe(90);
	});

	it('stops growing at the edges of the box', () => {
		expect(resizeFloatRectByKey(START, 'ArrowRight', 1000, BOX, MINIMUM).width).toBe(600);
		expect(resizeFloatRectByKey(START, 'ArrowDown', 1000, BOX, MINIMUM).height).toBe(450);
	});
});
