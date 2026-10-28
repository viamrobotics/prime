import type { LayoutNode, PaneNode, SplitNode, StackNode } from '../src/lib/layout.ts';

export interface PaneData {
	label: string;
}

export const ids = {
	rootSplit: 'root-split',
	mycam: 'mycam',
	innerSplit: 'inner-split',
	mytimeseries: 'mytimeseries',
	lowerSplit: 'lower-split',
	mysensor: 'mysensor',
	mycam2: 'mycam2'
};

export const layoutRoot: LayoutNode<PaneData> = {
	type: 'split',
	id: ids.rootSplit,
	direction: 'column',
	ratio: 0.3,
	first: { type: 'pane', id: ids.mycam, data: { label: 'Camera' } },
	second: {
		type: 'split',
		id: ids.innerSplit,
		direction: 'row',
		ratio: 0.6,
		first: { type: 'pane', id: ids.mytimeseries, data: { label: 'Time series' } },
		second: {
			type: 'split',
			id: ids.lowerSplit,
			direction: 'column',
			ratio: 0.5,
			first: { type: 'pane', id: ids.mysensor, data: { label: 'Sensor stat' } },
			second: { type: 'pane', id: ids.mycam2, data: { label: 'Camera 2' } }
		}
	}
};

export function createLayout(): LayoutNode<PaneData> {
	return structuredClone(layoutRoot);
}

export function deepFreeze<TValue>(value: TValue): TValue {
	if (typeof value === 'object' && value !== null && !Object.isFrozen(value)) {
		Object.freeze(value);
		Object.values(value).forEach(deepFreeze);
	}
	return value;
}

export function expectSplit(node: LayoutNode<PaneData> | undefined): SplitNode<PaneData> {
	if (node?.type !== 'split') {
		throw new Error('node is not a split');
	}
	return node;
}

export const stackIds = {
	rootSplit: 'stack-root-split',
	stackA: 'stack-a',
	tabA1: 'tab-a1',
	tabA2: 'tab-a2',
	tabA3: 'tab-a3',
	sideSplit: 'stack-side-split',
	solo: 'solo',
	stackB: 'stack-b',
	tabB1: 'tab-b1',
	tabB2: 'tab-b2'
};

function labeledPane(id: string): PaneNode<PaneData> {
	return { type: 'pane', id, data: { label: id } };
}

const stackLayoutRoot: LayoutNode<PaneData> = {
	type: 'split',
	id: stackIds.rootSplit,
	direction: 'row',
	ratio: 0.6,
	first: {
		type: 'stack',
		id: stackIds.stackA,
		panes: [labeledPane(stackIds.tabA1), labeledPane(stackIds.tabA2), labeledPane(stackIds.tabA3)],
		activeId: stackIds.tabA2
	},
	second: {
		type: 'split',
		id: stackIds.sideSplit,
		direction: 'column',
		ratio: 0.4,
		first: labeledPane(stackIds.solo),
		second: {
			type: 'stack',
			id: stackIds.stackB,
			panes: [labeledPane(stackIds.tabB1), labeledPane(stackIds.tabB2)],
			activeId: stackIds.tabB1
		}
	}
};

export function createStackLayout(): LayoutNode<PaneData> {
	return structuredClone(stackLayoutRoot);
}

export function expectStack(node: LayoutNode<PaneData> | undefined): StackNode<PaneData> {
	if (node?.type !== 'stack') {
		throw new Error('node is not a stack');
	}
	return node;
}

export function tabIds(stack: StackNode<PaneData>): string[] {
	return stack.panes.map((pane) => pane.id);
}

export function pane(id: string, label: string): PaneNode<PaneData> {
	return { type: 'pane', id, data: { label } };
}

export const CAM_A = pane('cam-a', 'Camera A');
export const CAM_B = pane('cam-b', 'Camera B');
export const CAM_C = pane('cam-c', 'Camera C');
export const SOLO = pane('solo', 'Solo');

export const CAMERAS: StackNode<PaneData> = {
	type: 'stack',
	id: 'cameras',
	panes: [CAM_A, CAM_B, CAM_C],
	activeId: 'cam-a'
};

export const CAMERA_ROW: SplitNode<PaneData> = {
	type: 'split',
	id: 'row',
	direction: 'row',
	ratio: 0.7,
	first: CAMERAS,
	second: SOLO
};

export const STACK_A: StackNode<PaneData> = {
	type: 'stack',
	id: 'stack-a',
	panes: [pane('a1', 'A1'), pane('a2', 'A2')],
	activeId: 'a1'
};

export const STACK_B: StackNode<PaneData> = {
	type: 'stack',
	id: 'stack-b',
	panes: [pane('b1', 'B1'), pane('b2', 'B2'), pane('b3', 'B3')],
	activeId: 'b2'
};

export const TWO_STACKS: SplitNode<PaneData> = {
	type: 'split',
	id: 'two',
	direction: 'row',
	ratio: 0.5,
	first: STACK_A,
	second: STACK_B
};
