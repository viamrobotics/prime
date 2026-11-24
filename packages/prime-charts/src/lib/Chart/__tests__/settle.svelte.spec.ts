import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';

import { settleFrames } from '../../../../test/frames.ts';
import '../../../../test/tailwind.css';
import type { ChartPoint } from '../point.ts';
import AxesChart from './fixtures/AxesChart.svelte';

const SETTLE_FRAMES = 3;
const SUBPIXEL = 0.1;
const LONG_LABEL = 'Friday, November 20, 2026 at 10:30:00 AM';
const ONE_MINUTE_MS = 60_000;
const CHART_WIDTH = 470;
const BAND_NARROWEST_WIDTH = 415;
const NO_GUTTER_WIDTH = 400;
const SINGLE_TICK_WIDTH = 220;
const WIDE_LABELS_WIDTH = 230;
const TICK_DROP_WIDTH = 430;
const OVERHANG_SHARE = 0.5;
const LABEL_TO_PLOT_RATIO = 1.1;
const WIDE_Y_LABEL_SCALE = 1000;
const ONE_MINUTE_TICKS = 10;
const FIVE_MINUTE_TICKS = 2;
const FIXED_COLUMN = { className: 'w-24', width: 96 };
const FRACTIONAL_COLUMN = { className: 'min-w-[60.3px]', width: 60.3 };

const reading = (points: ChartPoint[]) => [{ name: 'Reading', points }];

const errors: string[] = [];
const recordError = (event: ErrorEvent) => {
	errors.push(String(event.message || event.error));
};

beforeEach(() => {
	errors.length = 0;
	window.addEventListener('error', recordError);
});

afterEach(() => {
	window.removeEventListener('error', recordError);
});

const frameOf = (container: Element) =>
	container.querySelector<HTMLElement>('[data-testid="frame"]')!;

const htmlLayerOf = (container: Element) =>
	container.querySelector<HTMLElement>('.layercake-layout-html')!;

const plotBoxOf = (container: Element) =>
	container.querySelector('[data-part="plot"]')!.getBoundingClientRect();

const pathBoxOf = (container: Element) => container.querySelector('path')!.getBoundingClientRect();

const xLabelBoxes = (container: Element) =>
	[...container.querySelectorAll('.x-part span')].map((node) => node.getBoundingClientRect());

const yLabelBoxes = (container: Element) =>
	[...container.querySelectorAll('.y-part span')].map((node) => node.getBoundingClientRect());

const centerOf = (box: DOMRect) => box.left + box.width / 2;

const paddingOf = (container: Element) => {
	const { top, right, bottom, left } = htmlLayerOf(container).style;
	return `${top} ${right} ${bottom} ${left}`;
};

const recordPaddingChanges = (container: Element) => {
	const changes: string[] = [];
	let last = paddingOf(container);
	const observer = new MutationObserver(() => {
		const current = paddingOf(container);
		if (current === last) return;
		changes.push(current);
		last = current;
	});
	observer.observe(htmlLayerOf(container), { attributes: true, attributeFilter: ['style'] });
	return { changes, stop: () => observer.disconnect() };
};

const waitUntilSettled = async (container: Element) => {
	await expect.poll(() => container.querySelectorAll('.x-part span').length).toBeGreaterThan(0);
	await expect.poll(() => container.querySelector('path')).not.toBeNull();
	await settleFrames(SETTLE_FRAMES);
};

const minutesPastTen = (minutes: number, seconds: number) =>
	new Date(2026, 0, 1, 10, minutes, seconds);

const shortOfAMinute = [
	{ x: minutesPastTen(0, 0), y: 2 },
	{ x: minutesPastTen(9, 1), y: 8 }
];

describe('Chart axes settling', () => {
	it('settles every width across a band where the last tick falls short of the domain end', async () => {
		const points = [
			{ x: minutesPastTen(0, 0), y: 2 },
			{ x: minutesPastTen(9, 1), y: 8 }
		];
		const { container } = render(AxesChart, {
			props: { series: reading(points), width: CHART_WIDTH }
		});
		await expect.poll(() => container.querySelectorAll('.x-part span').length).toBeGreaterThan(1);
		await settleFrames(SETTLE_FRAMES);

		const unsettled: number[] = [];
		const overhanging: number[] = [];
		for (let width = CHART_WIDTH; width >= BAND_NARROWEST_WIDTH; width--) {
			const recorder = recordPaddingChanges(container);
			frameOf(container).style.width = `${width}px`;
			await settleFrames(SETTLE_FRAMES);
			recorder.stop();
			if (recorder.changes.length > 1) unsettled.push(width);
			if (xLabelBoxes(container).at(-1)!.right > plotBoxOf(container).right + SUBPIXEL) {
				overhanging.push(width);
			}
		}
		expect(unsettled).toEqual([]);
		expect(overhanging).toEqual([]);
		expect(errors).toEqual([]);
	});

	it('changes the padding at most once when a slide replaces the last x label', async () => {
		const { container, rerender } = render(AxesChart, {
			props: { series: reading(shortOfAMinute), width: CHART_WIDTH }
		});
		await waitUntilSettled(container);
		const recorder = recordPaddingChanges(container);

		await rerender({
			series: reading(
				shortOfAMinute.map((point) => ({
					...point,
					x: new Date(point.x.getTime() + ONE_MINUTE_MS)
				}))
			)
		});
		await settleFrames(SETTLE_FRAMES);
		recorder.stop();

		expect(
			container.querySelector('.x-part span:last-child')?.textContent?.trim(),
			'the slide brings a new last label'
		).toBe('10:10');
		expect(
			recorder.changes.length,
			`padding changes: ${recorder.changes.join(' | ')}`
		).toBeLessThanOrEqual(1);
	});

	it('puts an overhanging last x label flush with the plot edge rather than past or short of it', async () => {
		const { container } = render(AxesChart, {
			props: { series: reading(shortOfAMinute), width: CHART_WIDTH }
		});
		await waitUntilSettled(container);

		const last = xLabelBoxes(container).at(-1)!;

		expect(plotBoxOf(container).right - last.right).toBeCloseTo(0, 1);
	});

	it('reserves no x gutter when the edge labels fit inside the drawing', async () => {
		const points = [
			{ x: minutesPastTen(0, 7), y: 2 },
			{ x: minutesPastTen(1, 7), y: 8 }
		];
		const { container } = render(AxesChart, {
			props: { series: reading(points), width: NO_GUTTER_WIDTH, hasYAxis: false }
		});
		await waitUntilSettled(container);

		expect(pathBoxOf(container).width).toBe(NO_GUTTER_WIDTH);
	});

	it('keeps a single tick label inside the plot when it overhangs the nearer edge', async () => {
		const points = [
			{ x: minutesPastTen(0, 30), y: 2 },
			{ x: minutesPastTen(50, 30), y: 8 }
		];
		const { container } = render(AxesChart, {
			props: {
				series: reading(points),
				width: CHART_WIDTH,
				hasYAxis: false,
				xFormat: () => 'Thursday, January 1, 10:30 AM'
			}
		});
		await waitUntilSettled(container);
		const labelWidth = xLabelBoxes(container)[0].width;

		frameOf(container).style.width = `${Math.ceil(labelWidth * LABEL_TO_PLOT_RATIO)}px`;
		await settleFrames(SETTLE_FRAMES);

		const [label] = xLabelBoxes(container);
		const plot = plotBoxOf(container);
		expect(xLabelBoxes(container)).toHaveLength(1);
		expect(label.left).toBeGreaterThanOrEqual(plot.left - SUBPIXEL);
		expect(label.right).toBeLessThanOrEqual(plot.right + SUBPIXEL);
	});

	it('keeps the drawing inside the plot when a single tick label is wider than the plot', async () => {
		const points = [
			{ x: minutesPastTen(5, 0), y: 2 },
			{ x: minutesPastTen(55, 0), y: 8 }
		];
		const { container } = render(AxesChart, {
			props: { series: reading(points), width: SINGLE_TICK_WIDTH, xFormat: () => LONG_LABEL }
		});
		await waitUntilSettled(container);

		const plot = plotBoxOf(container);
		const path = pathBoxOf(container);
		expect(errors).toEqual([]);
		expect(path.width).toBeGreaterThan(0);
		expect(path.left).toBeGreaterThanOrEqual(plot.left);
		expect(path.right).toBeLessThanOrEqual(plot.right);
	});

	it('keeps half the plot for the drawing when both edge labels are wider than the plot', async () => {
		const points = [
			{ x: new Date('2026-01-01T00:00:00Z'), y: 2 },
			{ x: new Date('2026-01-01T06:00:00Z'), y: 8 }
		];
		const { container } = render(AxesChart, {
			props: {
				series: reading(points),
				width: WIDE_LABELS_WIDTH,
				hasYAxis: false,
				xFormat: () => LONG_LABEL
			}
		});
		await waitUntilSettled(container);

		expect(pathBoxOf(container).width).toBeCloseTo(WIDE_LABELS_WIDTH * (1 - OVERHANG_SHARE), 1);
	});

	it('restores the gutters when data returns after the chart was empty', async () => {
		const { container, rerender } = render(AxesChart, {
			props: { series: reading(shortOfAMinute), width: CHART_WIDTH }
		});
		await waitUntilSettled(container);
		const before = pathBoxOf(container);

		await rerender({ series: reading([]) });
		await expect.poll(() => container.querySelector('[data-part="empty"]')).not.toBeNull();
		await rerender({ series: reading(shortOfAMinute) });
		await waitUntilSettled(container);

		const after = pathBoxOf(container);
		expect({ left: after.left, right: after.right }).toEqual({
			left: before.left,
			right: before.right
		});
	});
});

const wholeMinutes = [
	{ x: minutesPastTen(0, 0), y: 5 },
	{ x: minutesPastTen(10, 0), y: 1000 }
];

const labelPlacesIn = async (dir: 'ltr' | 'rtl') => {
	const { container, unmount } = render(AxesChart, {
		props: { series: reading(wholeMinutes), width: CHART_WIDTH, dir }
	});
	await waitUntilSettled(container);
	const plotLeft = plotBoxOf(container).left;
	const places = {
		x: xLabelBoxes(container).map((box) => centerOf(box) - plotLeft),
		y: yLabelBoxes(container).map((box) => box.right - plotLeft)
	};
	unmount();
	return places;
};

const offsetsBetween = (expected: number[], actual: number[]) =>
	actual
		.map((place, index) => ({ index, offset: Math.abs(place - expected[index]) }))
		.filter(({ offset }) => offset > SUBPIXEL);

describe('Chart axes measuring', () => {
	it('raises no ResizeObserver loop error when a data update widens the y labels', async () => {
		const { container, rerender } = render(AxesChart, {
			props: { series: reading(wholeMinutes), width: CHART_WIDTH }
		});
		await waitUntilSettled(container);
		const narrowLeft = pathBoxOf(container).left;

		await rerender({
			series: reading(wholeMinutes.map((point) => ({ ...point, y: point.y * WIDE_Y_LABEL_SCALE })))
		});
		await settleFrames(SETTLE_FRAMES);

		expect(pathBoxOf(container).left).toBeGreaterThan(narrowLeft);
		expect(errors.filter((message) => message.includes('ResizeObserver loop'))).toEqual([]);
	});

	it('raises no ResizeObserver loop error when widening the y labels narrows the x label row', async () => {
		const points = [
			{ x: minutesPastTen(0, 0), y: 2 },
			{ x: minutesPastTen(9, 0), y: 8 }
		];
		const xFormat = (value: Date) => 'm'.repeat(value.getMinutes() + 1);
		const { container, rerender } = render(AxesChart, {
			props: { series: reading(points), width: TICK_DROP_WIDTH, xFormat }
		});
		await waitUntilSettled(container);
		const narrowTicks = xLabelBoxes(container).length;

		await rerender({
			series: reading(points.map((point) => ({ ...point, y: point.y * WIDE_Y_LABEL_SCALE }))),
			xFormat
		});
		await settleFrames(SETTLE_FRAMES);

		expect({ before: narrowTicks, after: xLabelBoxes(container).length }).toEqual({
			before: ONE_MINUTE_TICKS,
			after: FIVE_MINUTE_TICKS
		});
		expect(errors.filter((message) => message.includes('ResizeObserver loop'))).toEqual([]);
	});

	it('places the x labels where a left-to-right chart does under a right-to-left ancestor', async () => {
		const leftToRight = await labelPlacesIn('ltr');

		const rightToLeft = await labelPlacesIn('rtl');

		expect(rightToLeft.x).toHaveLength(leftToRight.x.length);
		expect(offsetsBetween(leftToRight.x, rightToLeft.x)).toEqual([]);
	});

	it('places the y labels where a left-to-right chart does under a right-to-left ancestor', async () => {
		const leftToRight = await labelPlacesIn('ltr');

		const rightToLeft = await labelPlacesIn('rtl');

		expect(rightToLeft.y).toHaveLength(leftToRight.y.length);
		expect(offsetsBetween(leftToRight.y, rightToLeft.y)).toEqual([]);
	});

	it('takes a fixed width on the y axis class as the label column width', async () => {
		const { container } = render(AxesChart, {
			props: { series: reading(wholeMinutes), width: CHART_WIDTH, yClass: FIXED_COLUMN.className }
		});
		await waitUntilSettled(container);

		expect(container.querySelector('.y-part')!.getBoundingClientRect().width).toBe(
			FIXED_COLUMN.width
		);
	});

	it('keeps a y label column of fractional width inside the plot', async () => {
		const { container } = render(AxesChart, {
			props: {
				series: reading(wholeMinutes),
				width: CHART_WIDTH,
				yClass: FRACTIONAL_COLUMN.className
			}
		});
		await waitUntilSettled(container);

		const column = container.querySelector('.y-part')!.getBoundingClientRect();
		expect(column.width).toBeCloseTo(FRACTIONAL_COLUMN.width, 1);
		expect(column.left).toBeGreaterThanOrEqual(plotBoxOf(container).left);
	});
});
