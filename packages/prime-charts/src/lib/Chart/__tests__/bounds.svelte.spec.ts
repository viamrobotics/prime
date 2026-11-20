import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';

import '../../../../test/tailwind.css';
import RootChart from './RootChart.svelte';

const WIDTH = 400;
const HEIGHT = 200;
const points = [
	{ x: new Date('2026-01-01T00:00:00Z'), y: 2 },
	{ x: new Date('2026-01-01T00:01:00Z'), y: 8 }
];
const series = [{ name: 'Reading', points }];

const pathData = (container: Element) =>
	expect.poll(() => container.querySelector('path')?.getAttribute('d') ?? '');

describe('Chart bounds', () => {
	it('spans the data without bounds', async () => {
		const { container } = render(RootChart, { props: { series, height: HEIGHT } });
		await pathData(container).toBe(`M0,${HEIGHT}L${WIDTH},0`);
	});

	it('uses both y bounds exactly', async () => {
		const { container } = render(RootChart, {
			props: { series, height: HEIGHT, yMin: 0, yMax: 10 }
		});
		await pathData(container).toBe(`M0,${HEIGHT * 0.8}L${WIDTH},${HEIGHT * 0.2}`);
	});

	it('takes the other end from the data when one bound is given', async () => {
		const { container } = render(RootChart, { props: { series, height: HEIGHT, yMin: 0 } });
		await pathData(container).toBe(`M0,${HEIGHT * 0.75}L${WIDTH},0`);
	});

	it('uses x bounds exactly', async () => {
		const { container } = render(RootChart, {
			props: {
				series,
				height: HEIGHT,
				xMin: new Date('2025-12-31T23:59:00Z'),
				xMax: new Date('2026-01-01T00:01:00Z')
			}
		});
		await pathData(container).toBe(`M${WIDTH / 2},${HEIGHT}L${WIDTH},0`);
	});

	it('clips a line the x bounds cut to the plot', async () => {
		const { container } = render(RootChart, {
			props: {
				series,
				height: HEIGHT,
				xMin: new Date('2026-01-01T00:00:30Z'),
				xMax: new Date('2026-01-01T00:01:00Z')
			}
		});
		await pathData(container).toBe(`M${-WIDTH},${HEIGHT}L${WIDTH},0`);
		const clipUrl = container.querySelector('path')?.closest('g')?.getAttribute('clip-path');
		const clipId = clipUrl?.match(/^url\(#(.+)\)$/)?.[1] ?? '';
		const clipRect = () => document.getElementById(clipId)?.querySelector('rect');
		await expect
			.poll(() => ['x', 'y', 'width', 'height'].map((name) => clipRect()?.getAttribute(name)))
			.toEqual(['-1', '-1', String(WIDTH + 2), String(HEIGHT + 2)]);
	});

	it('draws a lone point inside the plot', async () => {
		const { container } = render(RootChart, {
			props: { series: [{ name: 'Reading', points: [points[0]] }], height: HEIGHT }
		});
		await expect
			.poll(() => container.querySelector('circle')?.getAttribute('cx'))
			.toBe(String(WIDTH / 2));
		expect(container.querySelector('circle')?.getAttribute('cy')).toBe(String(HEIGHT / 2));
	});
});
