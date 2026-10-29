import type { DropRegion, EdgeRegion } from '../drop-region.ts';

type Axis = 'horizontal' | 'vertical';

// The default selection is taken from the first offered placement.
export const ALL_REGIONS: readonly DropRegion[] = [
	'center',
	'stack',
	'left',
	'right',
	'top',
	'bottom'
];

export const EDGE_REGIONS: readonly DropRegion[] = ['left', 'right', 'top', 'bottom'];

// The edges stay first so a pointer entering the pane does not lift the moving pane's tab out of the strip.
export const OWN_SLOT_REGIONS: readonly DropRegion[] = [...EDGE_REGIONS, 'stack'];

const INDEX_STEP_BY_EDGE = { left: -1, right: 1 } as const;

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
} as const satisfies Record<Axis, Record<Exclude<DropRegion, 'stack'>, number>>;

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

// The stack region sits one step past the edge on its side, so the arrow toward that side reaches it.
const STACK_POSITION_BY_SIDE = {
	left: { axis: 'horizontal', position: -2 },
	right: { axis: 'horizontal', position: 2 },
	top: { axis: 'vertical', position: -2 },
	bottom: { axis: 'vertical', position: 2 }
} as const satisfies Record<EdgeRegion, { axis: Axis; position: number }>;

function positionOf(region: DropRegion, axis: Axis, stackSide: EdgeRegion) {
	if (region !== 'stack') return POSITION_BY_REGION[axis][region];

	const stackPosition = STACK_POSITION_BY_SIDE[stackSide];
	return stackPosition.axis === axis ? stackPosition.position : 0;
}

function regionAt(axis: Axis, position: number, stackSide: EdgeRegion) {
	const stackPosition = STACK_POSITION_BY_SIDE[stackSide];
	if (stackPosition.axis === axis && stackPosition.position === position) return 'stack';
	return REGION_BY_POSITION[axis].get(position);
}

export function edgeOfArrow(
	event: Pick<KeyboardEvent, 'key' | 'altKey' | 'ctrlKey' | 'metaKey'>
): EdgeRegion | undefined {
	if (event.altKey || event.ctrlKey || event.metaKey) return undefined;
	return EDGE_BY_ARROW.get(event.key);
}

// Regions that `offeredRegions` leaves out are stepped over. The stack region lies past the edge on `stackSide`.
export function stepRegion(
	region: DropRegion,
	direction: EdgeRegion,
	offeredRegions: readonly DropRegion[],
	stackSide: EdgeRegion
): DropRegion | undefined {
	const { axis, delta } = STEP_BY_EDGE[direction];

	let position = positionOf(region, axis, stackSide) + delta;
	let candidate = regionAt(axis, position, stackSide);
	while (candidate !== undefined && !offeredRegions.includes(candidate)) {
		position += delta;
		candidate = regionAt(axis, position, stackSide);
	}
	return candidate;
}

export function stepInsertion(
	index: number,
	direction: EdgeRegion,
	lastIndex: number
): number | undefined {
	if (direction !== 'left' && direction !== 'right') return undefined;

	const next = index + INDEX_STEP_BY_EDGE[direction];
	return next >= 0 && next <= lastIndex ? next : undefined;
}
