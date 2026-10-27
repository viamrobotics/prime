import type { EdgeRegion } from '../drop-region.ts';

export type PaneBounds = Pick<DOMRectReadOnly, 'left' | 'right' | 'top' | 'bottom'>;

interface Candidate {
	id: string;
	gap: number;
	overlap: number;
}

// Fractional layout can leave the edges of adjacent panes up to a pixel apart or overlapping.
const FACING_TOLERANCE_PX = 1;

const GAP_BY_DIRECTION = {
	left: (from, to) => from.left - to.right,
	right: (from, to) => to.left - from.right,
	top: (from, to) => from.top - to.bottom,
	bottom: (from, to) => to.top - from.bottom
} as const satisfies Record<EdgeRegion, (from: PaneBounds, to: PaneBounds) => number>;

const OVERLAP_BY_DIRECTION = {
	left: (from, to) => Math.min(from.bottom, to.bottom) - Math.max(from.top, to.top),
	right: (from, to) => Math.min(from.bottom, to.bottom) - Math.max(from.top, to.top),
	top: (from, to) => Math.min(from.right, to.right) - Math.max(from.left, to.left),
	bottom: (from, to) => Math.min(from.right, to.right) - Math.max(from.left, to.left)
} as const satisfies Record<EdgeRegion, (from: PaneBounds, to: PaneBounds) => number>;

// Overlap on the other axis beats distance, then the shorter gap wins, then the larger overlap.
function isPreferred(candidate: Candidate, best: Candidate) {
	const candidateOverlaps = candidate.overlap > 0;
	const bestOverlaps = best.overlap > 0;
	if (candidateOverlaps !== bestOverlaps) return candidateOverlaps;

	const gapDifference = candidate.gap - best.gap;
	if (Math.abs(gapDifference) > FACING_TOLERANCE_PX) return gapDifference < 0;

	return candidate.overlap > best.overlap;
}

export function findNeighbor(
	paneEntries: Iterable<readonly [string, PaneBounds]>,
	fromId: string,
	direction: EdgeRegion,
	excludedId?: string
): string | undefined {
	const panes = new Map(paneEntries);
	const from = panes.get(fromId);
	if (from === undefined) return undefined;

	let best: Candidate | undefined;
	for (const [id, bounds] of panes) {
		if (id === fromId || id === excludedId) continue;

		const gap = GAP_BY_DIRECTION[direction](from, bounds);
		if (gap < -FACING_TOLERANCE_PX) continue;

		const candidate = { id, gap, overlap: OVERLAP_BY_DIRECTION[direction](from, bounds) };
		if (best === undefined || isPreferred(candidate, best)) best = candidate;
	}
	return best?.id;
}
