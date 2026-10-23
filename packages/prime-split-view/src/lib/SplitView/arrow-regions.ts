import type { DropRegion, EdgeRegion } from '../drop-region.ts';

type Axis = 'horizontal' | 'vertical';

const EDGE_BY_ARROW = new Map<string, EdgeRegion>([
	['ArrowLeft', 'left'],
	['ArrowRight', 'right'],
	['ArrowUp', 'top'],
	['ArrowDown', 'bottom']
]);

export const OPPOSITE_EDGE = {
	left: 'right',
	right: 'left',
	top: 'bottom',
	bottom: 'top'
} as const satisfies Record<EdgeRegion, EdgeRegion>;

const STEP_BY_EDGE = {
	left: { axis: 'horizontal', delta: -1 },
	right: { axis: 'horizontal', delta: 1 },
	top: { axis: 'vertical', delta: -1 },
	bottom: { axis: 'vertical', delta: 1 }
} as const satisfies Record<EdgeRegion, { axis: Axis; delta: number }>;

const POSITION_BY_REGION = {
	horizontal: { left: -1, center: 0, right: 1, top: 0, bottom: 0 },
	vertical: { top: -1, center: 0, bottom: 1, left: 0, right: 0 }
} as const satisfies Record<Axis, Record<DropRegion, number>>;

const REGION_BY_POSITION = {
	horizontal: new Map<number, DropRegion>([
		[-1, 'left'],
		[0, 'center'],
		[1, 'right']
	]),
	vertical: new Map<number, DropRegion>([
		[-1, 'top'],
		[0, 'center'],
		[1, 'bottom']
	])
} as const satisfies Record<Axis, ReadonlyMap<number, DropRegion>>;

export function edgeOfArrow(event: KeyboardEvent): EdgeRegion | undefined {
	if (event.altKey || event.ctrlKey || event.metaKey) return undefined;
	return EDGE_BY_ARROW.get(event.key);
}

export function stepRegion(region: DropRegion, direction: EdgeRegion): DropRegion | undefined {
	const { axis, delta } = STEP_BY_EDGE[direction];
	return REGION_BY_POSITION[axis].get(POSITION_BY_REGION[axis][region] + delta);
}
