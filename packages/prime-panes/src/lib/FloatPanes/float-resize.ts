import type { FloatRect } from '../layout.ts';
import type { FloatSize } from './float-geometry.ts';

export const FLOAT_RESIZE_AXES = ['n', 'e', 's', 'w', 'ne', 'nw', 'se', 'sw'] as const;

export type ResizeAxis = (typeof FLOAT_RESIZE_AXES)[number];

type Edge = 'start' | 'end';

interface MovedEdges {
	horizontal?: Edge;
	vertical?: Edge;
}

const MOVED_EDGES: Record<ResizeAxis, MovedEdges> = {
	n: { vertical: 'start' },
	e: { horizontal: 'end' },
	s: { vertical: 'end' },
	w: { horizontal: 'start' },
	ne: { horizontal: 'end', vertical: 'start' },
	nw: { horizontal: 'start', vertical: 'start' },
	se: { horizontal: 'end', vertical: 'end' },
	sw: { horizontal: 'start', vertical: 'end' }
};

const fit = (value: number, min: number, max: number) => Math.max(min, Math.min(value, max));

function resizeSpan(
	origin: number,
	length: number,
	edge: Edge | undefined,
	nextLength: number,
	minLength: number,
	boxLength: number
) {
	const wholeLength = Math.round(nextLength);
	if (edge === 'end') {
		return { origin, length: fit(wholeLength, minLength, boxLength - origin) };
	}
	if (edge === 'start') {
		const end = origin + length;
		const fitted = fit(wholeLength, minLength, end);
		return { origin: end - fitted, length: fitted };
	}
	return { origin, length };
}

/**
 * The rect of a window resized from `axis`, starting from `start`. Only the edges the axis names
 * move. The opposite edges stay where they were, including once `size` reaches `minimum`, and no
 * edge leaves `box`. The size is rounded to whole pixels.
 */
export function resizeFloatRect(
	start: FloatRect,
	axis: ResizeAxis,
	size: FloatSize,
	box: FloatSize,
	minimum: FloatSize
): FloatRect {
	const { horizontal, vertical } = MOVED_EDGES[axis];
	const across = resizeSpan(start.x, start.width, horizontal, size.width, minimum.width, box.width);
	const down = resizeSpan(start.y, start.height, vertical, size.height, minimum.height, box.height);
	return { x: across.origin, y: down.origin, width: across.length, height: down.length };
}
