import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { userEvent } from 'vitest/browser';

import '../../../../test/tailwind.css';
import TooltipChart from './TooltipChart.svelte';

const START = Date.parse('2026-01-01T00:00:00Z');
const MINUTE = 60_000;
const NEAR_TOP = 0.05;
const NEAR_BOTTOM = 0.95;
const MIDDLE = 0.5;
const NEAR_RIGHT = 0.99;
const HIDDEN_LINE_HEIGHT = 0.125;

const POINT_COUNT = 3;

const flat = (value: number) =>
	Array.from({ length: POINT_COUNT }, (_, minute) => ({
		x: new Date(START + minute * MINUTE),
		y: value
	}));

const low = { name: 'cell-01', points: flat(10) };
const high = { name: 'cell-02', points: flat(90) };

const plotOf = (container: Element) =>
	container.querySelector('[role="figure"]')!.firstElementChild as HTMLElement;
const readoutOf = (container: Element) =>
	container.querySelector<HTMLElement>('[data-part="tooltip"]');
const readoutLines = (container: Element) =>
	[...(readoutOf(container)?.children ?? [])].map((line) => line.textContent?.trim());

async function hoverAt(container: Element, xFraction: number, yFraction: number) {
	const plot = plotOf(container);
	await expect.poll(() => container.querySelector('path')).not.toBeNull();
	const { width, height } = plot.getBoundingClientRect();
	await userEvent.hover(plot, { position: { x: width * xFraction, y: height * yFraction } });
}

describe('Chart.Tooltip', () => {
	it.each([
		{ yFraction: NEAR_TOP, name: 'cell-02', value: '90' },
		{ yFraction: NEAR_BOTTOM, name: 'cell-01', value: '10' }
	])('shows $name, the series nearest the pointer', async ({ yFraction, name, value }) => {
		const { container } = render(TooltipChart, {
			props: { series: [low, high], xFormat: () => 'time' }
		});

		await hoverAt(container, MIDDLE, yFraction);

		await expect.poll(() => readoutLines(container)).toEqual([name, 'time', value]);
	});

	it('paints the swatch in the series color', async () => {
		const { container } = render(TooltipChart, { props: { series: [low, high] } });

		await hoverAt(container, MIDDLE, NEAR_TOP);

		await expect.poll(() => readoutOf(container)).not.toBeNull();
		const swatch = readoutOf(container)!.querySelector<HTMLElement>('[data-part="tooltip-swatch"]');
		expect(swatch?.style.backgroundColor).toBe('var(--color-chart-series-2)');
	});

	it('ignores a hidden series', async () => {
		const hidden = { name: 'cell-03', points: flat(80), hidden: true };
		const { container } = render(TooltipChart, { props: { series: [low, high, hidden] } });

		await hoverAt(container, MIDDLE, HIDDEN_LINE_HEIGHT);

		await expect.poll(() => readoutLines(container)[0]).toBe('cell-02');
	});

	it('hides the readout when the pointer leaves', async () => {
		const { container } = render(TooltipChart, { props: { series: [low, high] } });
		await hoverAt(container, MIDDLE, NEAR_TOP);
		await expect.poll(() => readoutOf(container)).not.toBeNull();

		await userEvent.unhover(plotOf(container));

		await expect.poll(() => readoutOf(container)).toBeNull();
	});

	it('hides the readout from assistive technology', async () => {
		const { container } = render(TooltipChart, { props: { series: [low, high] } });

		await hoverAt(container, MIDDLE, NEAR_TOP);

		await expect.poll(() => readoutOf(container)?.getAttribute('aria-hidden')).toBe('true');
	});

	it('keeps the readout inside the plot at its top right corner', async () => {
		const { container } = render(TooltipChart, { props: { series: [low, high] } });

		await hoverAt(container, NEAR_RIGHT, NEAR_TOP);

		await expect.poll(() => readoutOf(container)).not.toBeNull();
		const plot = plotOf(container).getBoundingClientRect();
		const readout = readoutOf(container)!.getBoundingClientRect();
		expect(readout.right).toBeLessThanOrEqual(plot.right);
		expect(readout.top).toBeGreaterThanOrEqual(plot.top);
	});

	it('formats with its own xFormat and yFormat', async () => {
		const { container } = render(TooltipChart, {
			props: {
				series: [low, high],
				hasAxes: true,
				axisXFormat: () => 'axis-x',
				axisYFormat: (value: number) => `${value} axis`,
				xFormat: () => 'tooltip-x',
				yFormat: (value: number) => `${value} tooltip`
			}
		});

		await hoverAt(container, MIDDLE, NEAR_TOP);

		await expect
			.poll(() => readoutLines(container))
			.toEqual(['cell-02', 'tooltip-x', '90 tooltip']);
	});

	it('falls back to the axis formats', async () => {
		const { container } = render(TooltipChart, {
			props: {
				series: [low, high],
				hasAxes: true,
				axisXFormat: () => 'axis-x',
				axisYFormat: (value: number) => `${value} axis`
			}
		});

		await hoverAt(container, MIDDLE, NEAR_TOP);

		await expect.poll(() => readoutLines(container)).toEqual(['cell-02', 'axis-x', '90 axis']);
	});

	it('shows a full date and time with seconds and a grouped number by default', async () => {
		const points = [
			{ x: new Date('2026-06-15T12:00:07Z'), y: 12345.6 },
			{ x: new Date('2026-06-15T12:01:07Z'), y: 12345.6 }
		];
		const { container } = render(TooltipChart, {
			props: { series: [{ name: 'cell-01', points }] }
		});

		await hoverAt(container, MIDDLE, MIDDLE);

		await expect.poll(() => readoutLines(container)[2]).toBe('12,345.6');
		expect(readoutLines(container)[1]).toMatch(/2026.*\d:\d{2}:07/);
	});
});
