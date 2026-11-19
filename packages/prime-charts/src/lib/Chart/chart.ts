import Root from './Chart.svelte';
import Line from './Line.svelte';

export const Chart: typeof Root & { Line: typeof Line } = Object.assign(Root, {
	Line
});
