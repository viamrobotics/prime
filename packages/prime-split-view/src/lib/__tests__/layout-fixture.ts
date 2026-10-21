import type { LayoutNode } from '../layout.ts';

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
