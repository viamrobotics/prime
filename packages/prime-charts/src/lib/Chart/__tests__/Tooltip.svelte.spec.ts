import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { userEvent } from 'vitest/browser';

import '../../../../test/tailwind.css';
import TooltipChart from './fixtures/TooltipChart.svelte';

const START = Date.parse('2026-01-01T00:00:00Z');
const MINUTE = 60_000;
const NEAR_TOP = 0.05;
const NEAR_BOTTOM = 0.95;
const MIDDLE = 0.5;
const NEAR_LEFT = 0.01;
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

const plotOf = (container: Element) => container.querySelector<HTMLElement>('[data-part="plot"]')!;
const readoutOf = (container: Element) =>
	container.querySelector<HTMLElement>('[data-part="tooltip"]');
const readoutLines = (container: Element) =>
	[...(readoutOf(container)?.children ?? [])].map((line) => line.textContent?.trim());

const SETTLE_FRAMES = 3;
const MAX_FRAMES = 120;

const nextFrame = () => new Promise((resolve) => requestAnimationFrame(resolve));

const labelNodesOf = (container: Element, part: string) => [
	...container.querySelectorAll(`.${part} span`)
];

const labelCenters = (container: Element, part: string) =>
	labelNodesOf(container, part)
		.map((node) => node.getBoundingClientRect())
		.map((box) => `${box.left + box.width / 2},${box.top + box.height / 2}`)
		.join(' ');

async function settledLabels(container: Element, part: string) {
	await expect.poll(() => labelNodesOf(container, part).length).toBeGreaterThan(1);
	await expect.poll(() => container.querySelector('path')).not.toBeNull();
	let quiet = 0;
	let previous = labelCenters(container, part);
	for (let frame = 0; frame < MAX_FRAMES && quiet < SETTLE_FRAMES; frame++) {
		await nextFrame();
		const current = labelCenters(container, part);
		quiet = current === previous ? quiet + 1 : 0;
		previous = current;
	}
}

async function hoverOnLabel(container: Element, part: string, which: 'first' | 'last') {
	await settledLabels(container, part);
	const nodes = labelNodesOf(container, part);
	const label = (which === 'first' ? nodes[0] : nodes.at(-1))!.getBoundingClientRect();
	const plot = plotOf(container);
	const box = plot.getBoundingClientRect();
	await userEvent.hover(plot, {
		position: {
			x: label.left + label.width / 2 - box.left,
			y: label.top + label.height / 2 - box.top
		}
	});
}

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

	it('hides a hovered readout on Escape with the pointer still on the plot', async () => {
		const { container } = render(TooltipChart, { props: { series: [low, high] } });
		await hoverAt(container, MIDDLE, NEAR_TOP);
		await expect.poll(() => readoutOf(container)).not.toBeNull();

		await userEvent.keyboard('{Escape}');

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
		expect(readout.right, 'readout right edge against the plot').toBeLessThanOrEqual(plot.right);
		expect(readout.top, 'readout top edge against the plot').toBeGreaterThanOrEqual(plot.top);
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

	it.each([
		{ part: 'y-part', which: 'last', name: 'cell-02', value: '90 axis' },
		{ part: 'x-part', which: 'first', name: 'cell-01', value: '10 axis' }
	] as const)(
		'answers a pointer resting on a tick label of the $part axis',
		async ({ part, which, name, value }) => {
			const { container } = render(TooltipChart, {
				props: {
					series: [low, high],
					hasAxes: true,
					axisXFormat: () => 'axis-x',
					axisYFormat: (tick: number) => `${tick} axis`
				}
			});

			await hoverOnLabel(container, part, which);

			await expect.poll(() => readoutLines(container)).toEqual([name, 'axis-x', value]);
		}
	);

	it('formats the time as a full date and time with seconds and the value grouped by default', async () => {
		const points = [
			{ x: new Date(2026, 5, 15, 12, 0, 7), y: 12345.6 },
			{ x: new Date(2026, 5, 15, 12, 1, 7), y: 12345.6 }
		];
		const { container } = render(TooltipChart, {
			props: { series: [{ name: 'cell-01', points }] }
		});

		await hoverAt(container, NEAR_LEFT, MIDDLE);

		await expect
			.poll(() => readoutLines(container).map((line) => line?.replace(/\s/g, ' ')))
			.toEqual(['cell-01', 'Jun 15, 2026, 12:00:07 PM', '12,345.6']);
	});

	it.each([
		{ yFraction: NEAR_TOP, name: 'cell-01', value: '12.3 °' },
		{ yFraction: NEAR_BOTTOM, name: 'cell-02', value: '4 V' }
	])('follows the $name value with its own unit', async ({ yFraction, name, value }) => {
		const series = [
			{ name: 'cell-01', unit: '°', points: flat(12.3) },
			{ name: 'cell-02', unit: 'V', points: flat(4) }
		];
		const { container } = render(TooltipChart, { props: { series, xFormat: () => 'time' } });

		await hoverAt(container, MIDDLE, yFraction);

		await expect.poll(() => readoutLines(container)).toEqual([name, 'time', value]);
	});
});
