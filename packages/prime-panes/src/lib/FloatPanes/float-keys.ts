import type { FloatRect } from '../layout.ts';
import { clampToBox } from './float-geometry.ts';
import type { FloatSize } from './float-geometry.ts';
import { resizeFloatRect } from './float-resize.ts';

export const FLOAT_KEY_STEP = 10;
export const FLOAT_KEY_LARGE_STEP = 100;

const ARROW_DIRECTIONS = {
	ArrowLeft: { x: -1, y: 0 },
	ArrowRight: { x: 1, y: 0 },
	ArrowUp: { x: 0, y: -1 },
	ArrowDown: { x: 0, y: 1 }
} as const;

export type ArrowKey = keyof typeof ARROW_DIRECTIONS;

export const isArrowKey = (key: string): key is ArrowKey => Object.hasOwn(ARROW_DIRECTIONS, key);

/** The rect of a window moved `distance` pixels toward `key`, stopping at the edges of `box`. */
export function moveFloatRectByKey(
	rect: FloatRect,
	key: ArrowKey,
	distance: number,
	box: FloatSize,
	minimum: FloatSize
): FloatRect {
	const start = clampToBox(rect, box, minimum);
	const direction = ARROW_DIRECTIONS[key];
	return clampToBox(
		{ ...start, x: start.x + direction.x * distance, y: start.y + direction.y * distance },
		box,
		minimum
	);
}

/**
 * The rect of a window whose east edge moves `distance` pixels along ArrowLeft or ArrowRight, or
 * whose south edge does along ArrowUp or ArrowDown. A positive direction grows it. The other edges
 * stay put, and the size stops at `minimum` and at the edges of `box`.
 */
export function resizeFloatRectByKey(
	rect: FloatRect,
	key: ArrowKey,
	distance: number,
	box: FloatSize,
	minimum: FloatSize
): FloatRect {
	const start = clampToBox(rect, box, minimum);
	const direction = ARROW_DIRECTIONS[key];
	const axis = direction.x === 0 ? 's' : 'e';
	const size = {
		width: start.width + direction.x * distance,
		height: start.height + direction.y * distance
	};
	return resizeFloatRect(start, axis, size, box, minimum);
}
