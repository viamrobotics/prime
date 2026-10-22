import type { LayoutNode, SplitNode } from '../layout.ts';

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

/** A fresh copy of `layoutRoot`, so a test can never affect another. */
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

/** Narrows `node` to a split, failing the test when it is not one. */
export function expectSplit(node: LayoutNode<PaneData> | undefined): SplitNode<PaneData> {
	if (node?.type !== 'split') {
		throw new Error('node is not a split');
	}
	return node;
}
