import type { FloatRect } from '../layout.ts';

export interface FloatSize {
	width: number;
	height: number;
}

export const DEFAULT_FLOAT_MIN_SIZE: FloatSize = { width: 160, height: 120 };

// A box that has not been measured yet reports no size.
const isMeasured = (box: FloatSize) => box.width > 0 && box.height > 0;

/** A minimum the box itself cannot fit becomes the box. */
export function fitMinimumToBox(minimum: FloatSize, box: FloatSize): FloatSize {
	if (!isMeasured(box)) return minimum;
	return {
		width: Math.min(minimum.width, box.width),
		height: Math.min(minimum.height, box.height)
	};
}

/** The rect a window is drawn at: no smaller than `minimum`, and moved or shrunk to sit inside `box`. */
export function clampToBox(rect: FloatRect, box: FloatSize, minimum: FloatSize): FloatRect {
	const width = Math.max(rect.width, minimum.width);
	const height = Math.max(rect.height, minimum.height);
	if (!isMeasured(box)) return { ...rect, width, height };

	const fittedWidth = Math.min(width, box.width);
	const fittedHeight = Math.min(height, box.height);
	return {
		width: fittedWidth,
		height: fittedHeight,
		x: Math.max(0, Math.min(rect.x, box.width - fittedWidth)),
		y: Math.max(0, Math.min(rect.y, box.height - fittedHeight))
	};
}
