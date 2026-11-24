import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';

import { nextFrame, settleFrames } from '../../../../test/frames.ts';
import '../../../../test/tailwind.css';
import RootChart from './fixtures/RootChart.svelte';

const INITIAL_WIDTH = 400;
const RESIZED_WIDTH = 250;
const LEGEND_WIDTH = 96;

const SETTLE_FRAMES = 3;
const WIDE_LABEL_SCALE = 1000;

const points = [
	{ x: new Date('2026-01-01T00:00:00Z'), y: 2 },
	{ x: new Date('2026-01-01T00:01:00Z'), y: 8 }
];
const widePoints = points.map((point) => ({ ...point, y: point.y * WIDE_LABEL_SCALE }));

const SUBPIXEL = 0.1;
const QUARTER_MINUTE_TICKS = 5;
const HALF_MINUTE_TICKS = 3;
const NARROW_HOURS_WIDTH = 170;
const WIDE_HOURS_WIDTH = 700;
const NARROW_HOURS_TICKS = 3;
const WIDE_HOURS_TICKS = 7;

const plotBoxOf = (container: Element) =>
	container.querySelector('[data-part="plot"]')!.getBoundingClientRect();

const gutterOf = (container: Element) => {
	const plot = plotBoxOf(container);
	const path = container.querySelector('path')!.getBoundingClientRect();
	return {
		left: path.left - plot.left,
		right: plot.right - path.right,
		column: Math.ceil(
			container.querySelector('.y-part')!.parentElement!.getBoundingClientRect().width
		)
	};
};

const expectSettledGutter = async (container: Element) => {
	await expect.poll(() => container.querySelectorAll('.y-part span').length).toBeGreaterThan(1);
	await expect
		.poll(
			() => {
				const { left, column } = gutterOf(container);
				return column > 0 && left === column;
			},
			{ message: 'the line starts one measured y label column from the plot edge' }
		)
		.toBe(true);
	const settled = gutterOf(container);
	for (let frame = 0; frame < SETTLE_FRAMES; frame++) {
		await nextFrame();
		expect(gutterOf(container), `gutter after frame ${frame + 1}`).toEqual(settled);
	}
};

const resizeTo = async (container: Element, width: number) => {
	container.querySelector<HTMLElement>('[data-testid="frame"]')!.style.width = `${width}px`;
	await expect.poll(() => container.querySelector('svg')?.getAttribute('width')).toBe(`${width}`);
	await settleFrames(SETTLE_FRAMES);
};

const xLabelOverflow = (container: Element) => {
	const plot = plotBoxOf(container);
	const boxes = [...container.querySelectorAll('.x-part span')].map((node) =>
		node.getBoundingClientRect()
	);
	return {
		left: Math.max(0, plot.left - boxes[0].left),
		right: Math.max(0, boxes[boxes.length - 1].right - plot.right)
	};
};

describe('Chart resize', () => {
	it('redraws at the new width when the container changes size', async () => {
		const { container } = render(RootChart, {
			props: { series: [{ name: 'Reading', points }], width: INITIAL_WIDTH }
		});
		const path = () => container.querySelector('path')?.getAttribute('d') ?? '';

		await expect.poll(path).toMatch(new RegExp(`L${INITIAL_WIDTH},`));

		container.querySelector<HTMLElement>('[data-testid="frame"]')!.style.width =
			`${RESIZED_WIDTH}px`;

		await expect.poll(path).toMatch(new RegExp(`L${RESIZED_WIDTH},`));
	});

	it('narrows the drawing by a legend beside the plot', async () => {
		const { container } = render(RootChart, {
			props: { series: [{ name: 'Reading', points }], width: INITIAL_WIDTH, hasLegendBeside: true }
		});
		const path = () => container.querySelector('path')?.getAttribute('d') ?? '';

		await expect.poll(path).toMatch(new RegExp(`L${INITIAL_WIDTH - LEGEND_WIDTH},`));
	});

	it('settles the y gutter in one pass, before and after a resize', async () => {
		const { container } = render(RootChart, {
			props: {
				series: [{ name: 'Reading', points: widePoints }],
				width: INITIAL_WIDTH,
				hasAxes: true
			}
		});
		await expectSettledGutter(container);

		await resizeTo(container, RESIZED_WIDTH);

		await expectSettledGutter(container);
	});

	it('keeps the edge x labels inside the plot after shrinking drops ticks', async () => {
		const { container } = render(RootChart, {
			props: { series: [{ name: 'Reading', points }], width: INITIAL_WIDTH, hasAxes: true }
		});
		await expect
			.poll(() => container.querySelectorAll('.x-part span').length)
			.toBe(QUARTER_MINUTE_TICKS);

		await resizeTo(container, RESIZED_WIDTH);

		expect(container.querySelectorAll('.x-part span')).toHaveLength(HALF_MINUTE_TICKS);
		expect(xLabelOverflow(container).right).toBeLessThan(SUBPIXEL);
		expect(xLabelOverflow(container).left).toBeLessThan(SUBPIXEL);
	});

	it('keeps the edge x labels inside the plot after widening adds ticks', async () => {
		const hours = [
			{ x: new Date(2026, 0, 1, 0), y: 2 },
			{ x: new Date(2026, 0, 1, 6), y: 8 }
		];
		const { container } = render(RootChart, {
			props: {
				series: [{ name: 'Reading', points: hours }],
				width: NARROW_HOURS_WIDTH,
				hasAxes: true
			}
		});
		await expect
			.poll(() => container.querySelectorAll('.x-part span').length)
			.toBe(NARROW_HOURS_TICKS);

		await resizeTo(container, WIDE_HOURS_WIDTH);

		expect(container.querySelectorAll('.x-part span')).toHaveLength(WIDE_HOURS_TICKS);
		expect(xLabelOverflow(container).right).toBeLessThan(SUBPIXEL);
		expect(xLabelOverflow(container).left).toBeLessThan(SUBPIXEL);
	});
});
