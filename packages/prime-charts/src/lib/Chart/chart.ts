import Root from './Chart.svelte';
import Grid from './Grid.svelte';
import Legend from './Legend.svelte';
import Line from './Line.svelte';
import Tooltip from './Tooltip.svelte';
import XAxis from './XAxis.svelte';
import YAxis from './YAxis.svelte';

export const Chart: typeof Root & {
	Line: typeof Line;
	XAxis: typeof XAxis;
	YAxis: typeof YAxis;
	Grid: typeof Grid;
	Tooltip: typeof Tooltip;
	Legend: typeof Legend;
} = Object.assign(Root, { Line, XAxis, YAxis, Grid, Tooltip, Legend });
