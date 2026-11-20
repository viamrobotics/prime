import type { ComponentProps } from 'svelte';
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';

import '../../../../test/tailwind.css';
import Line from '../Line.svelte';
import LineChart from './LineChart.svelte';
import LineSeriesChart from './LineSeriesChart.svelte';

const WIDTH = 400;
const HEIGHT = 200;

const MINUTE = 60_000;
const START = new Date('2026-01-01T00:00:00Z').getTime();
const TEN_THOUSAND = 10_000;
const TEN_THOUSAND_POINTS_BUDGET_MS = 250;
const BUDGET_RUNS = 3;

const at = (minute: number, y: number | null) => ({ x: new Date(START + minute * MINUTE), y });
const ramp = (count: number) => Array.from({ length: count }, (_, i) => at(i, (i * 7) % 13));

const token = (slot: number) => {
	const probe = document.createElement('span');
	probe.style.color = `var(--color-chart-series-${slot})`;
	document.body.append(probe);
	const computed = getComputedStyle(probe).color;
	probe.remove();
	return computed;
};
const stroke = (element: Element | undefined) =>
	element ? getComputedStyle(element).stroke : undefined;

const named = (count: number, extra: Record<number, object> = {}) =>
	Array.from({ length: count }, (_, i) => ({
		name: `Series ${i}`,
		points: [at(0, i), at(1, i + 5), at(2, i + 2)],
		...extra[i]
	}));

const paths = (container: Element) => [...container.querySelectorAll('path')];

describe('Chart.Line', () => {
	it('draws one path across the measured width for a series', async () => {
		const { container } = render(LineChart, {
			props: {
				width: WIDTH,
				height: HEIGHT,
				points: [
					{ x: new Date('2026-01-01T00:00:00Z'), y: 2 },
					{ x: new Date('2026-01-01T00:01:00Z'), y: 8 },
					{ x: new Date('2026-01-01T00:02:00Z'), y: 5 }
				]
			}
		});

		await expect
			.poll(() => paths(container)[0]?.getAttribute('d'))
			.toMatch(new RegExp(`L${WIDTH},`));

		expect(container.querySelector('[role="figure"] svg')).not.toBeNull();

		const all = paths(container);
		expect(all).toHaveLength(1);
		const pathData = all[0].getAttribute('d') ?? '';
		expect(pathData).not.toBe('');
		expect(pathData).not.toContain('NaN');
		expect(pathData).toBe(`M0,${HEIGHT}L${WIDTH / 2},0L${WIDTH},${HEIGHT / 2}`);
	});

	it('draws no path for an empty series', async () => {
		const { container } = render(LineChart, {
			props: { points: [], width: WIDTH, height: HEIGHT }
		});

		await expect
			.poll(() => container.querySelector('svg')?.getAttribute('width'))
			.toBe(String(WIDTH));

		expect(paths(container)).toHaveLength(0);
	});

	describe('colors', () => {
		it('draws three series in the first three palette colors', async () => {
			const { container } = render(LineSeriesChart, {
				props: { series: named(3), width: WIDTH, height: HEIGHT }
			});

			await expect.poll(() => paths(container)).toHaveLength(3);

			const colors = paths(container).map(stroke);
			expect(colors).toEqual([token(1), token(2), token(3)]);
			expect(new Set(colors).size).toBe(3);
		});

		it('keeps the third color when the second is hidden', async () => {
			const { container } = render(LineSeriesChart, {
				props: {
					series: named(3, { 1: { hidden: true } }),
					width: WIDTH,
					height: HEIGHT
				}
			});

			await expect.poll(() => paths(container)).toHaveLength(2);

			expect(paths(container).map(stroke)).toEqual([token(1), token(3)]);
		});

		it('lets a color override win over the palette slot', async () => {
			const { container } = render(LineSeriesChart, {
				props: {
					series: named(2, { 0: { color: '--color-chart-series-5' } }),
					width: WIDTH,
					height: HEIGHT
				}
			});

			await expect.poll(() => paths(container)).toHaveLength(2);

			expect(paths(container).map(stroke)).toEqual([token(5), token(2)]);
		});

		it('wraps the eighth series to the first palette color', async () => {
			const { container } = render(LineSeriesChart, {
				props: { series: named(8), width: WIDTH, height: HEIGHT }
			});

			await expect.poll(() => paths(container)).toHaveLength(8);

			expect(stroke(paths(container)[7])).toBe(token(1));
			expect(stroke(paths(container)[7])).toBe(stroke(paths(container)[0]));
		});

		it('refuses a raw color', () => {
			// @ts-expect-error a raw color is not a CSS variable name
			const raw: ComponentProps<typeof Line>['color'] = '#ff0000';
			expect(raw).toBe('#ff0000');
		});
	});

	describe('gaps and dots', () => {
		it('splits the path into two subpaths at a gap', async () => {
			const { container } = render(LineSeriesChart, {
				props: {
					series: [
						{
							name: 'Gappy',
							points: [at(0, 1), at(1, 2), at(2, null), at(3, 4), at(4, 3)]
						}
					],
					width: WIDTH,
					height: HEIGHT
				}
			});

			await expect.poll(() => paths(container)).toHaveLength(1);

			const pathData = paths(container)[0].getAttribute('d') ?? '';
			expect(pathData.match(/M/g)).toHaveLength(2);
			expect(pathData).not.toContain('NaN');
			expect(container.querySelectorAll('circle')).toHaveLength(0);
		});

		it('draws a one-point series as a dot in the series color', async () => {
			const { container } = render(LineSeriesChart, {
				props: {
					series: [{ name: 'Lone', points: [at(0, 3)] }],
					width: WIDTH,
					height: HEIGHT
				}
			});

			await expect.poll(() => container.querySelectorAll('circle')).toHaveLength(1);

			const dot = container.querySelector('circle');
			expect(getComputedStyle(dot as Element).fill).toBe(token(1));
			expect(dot?.getAttribute('cx')).not.toContain('NaN');
			expect(dot?.getAttribute('cy')).not.toContain('NaN');
			expect(paths(container)).toHaveLength(0);
		});

		it('draws an isolated point between gaps as a dot beside the line', async () => {
			const { container } = render(LineSeriesChart, {
				props: {
					series: [
						{
							name: 'Isolated',
							points: [at(0, 1), at(1, 2), at(2, null), at(3, 5), at(4, null)]
						}
					],
					width: WIDTH,
					height: HEIGHT
				}
			});

			await expect.poll(() => container.querySelectorAll('circle')).toHaveLength(1);

			expect(paths(container)).toHaveLength(1);
			expect(paths(container)[0].getAttribute('d')?.match(/M/g)).toHaveLength(1);
		});

		it('draws nothing for an all-gap series', async () => {
			const { container } = render(LineSeriesChart, {
				props: {
					series: [{ name: 'Empty', points: [at(0, null), at(1, null)] }],
					width: WIDTH,
					height: HEIGHT
				}
			});

			await expect
				.poll(() => container.querySelector('svg')?.getAttribute('width'))
				.toBe(String(WIDTH));

			expect(paths(container)).toHaveLength(0);
			expect(container.querySelectorAll('circle')).toHaveLength(0);
			expect(container.innerHTML).not.toContain('NaN');
		});
	});

	describe('budget', () => {
		it('draws ten thousand points inside the budget', async () => {
			const points = ramp(TEN_THOUSAND);
			const timings: number[] = [];

			for (let run = 0; run < BUDGET_RUNS; run++) {
				const started = performance.now();
				const { container, unmount } = render(LineChart, {
					props: { points, width: WIDTH, height: HEIGHT }
				});
				await expect.poll(() => paths(container)[0]?.getAttribute('d')).toMatch(/L/);
				timings.push(performance.now() - started);

				const pathData = paths(container)[0].getAttribute('d') ?? '';
				expect(pathData).not.toBe('');
				expect(pathData).not.toContain('NaN');
				unmount();
			}

			console.info(
				`ten thousand points, ms per run: ${timings.map((t) => t.toFixed(1)).join(', ')}`
			);
			expect(Math.max(...timings)).toBeLessThan(TEN_THOUSAND_POINTS_BUDGET_MS);
		});
	});
});
