import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';

import '../../../../test/tailwind.css';
import AxesChart from './fixtures/AxesChart.svelte';
import StackedAxesChart from './fixtures/StackedAxesChart.svelte';

const points = [
	{ x: new Date('2026-01-01T00:00:00Z'), y: 2 },
	{ x: new Date('2026-01-01T00:01:00Z'), y: 8 }
];
const series = [{ name: 'Reading', points }];

const WIDE_LABEL = '1,234,567.89 units';
const TICK_SIZE = 6;
const LABEL_GAP = 10;
const SIZE_16_PX = 64;
const SIZE_32_PX = 128;
const SUBPIXEL = 0.5;
const SETTLE_FRAMES = 3;
const MAX_FRAMES = 120;

const utcClock = new Intl.DateTimeFormat('en-US', {
	timeZone: 'UTC',
	hour: '2-digit',
	minute: '2-digit',
	hour12: false
});
const utcFormat = (value: Date) => utcClock.format(value);

const nextFrame = () => new Promise((resolve) => requestAnimationFrame(resolve));

const labelNodes = (container: Element, part: string) => [
	...container.querySelectorAll(`.${part} span`)
];

const labels = (container: Element, part: string) =>
	labelNodes(container, part).map((node) => node.textContent?.trim());

const labelBoxes = (container: Element, part: string) =>
	labelNodes(container, part).map((node) => node.getBoundingClientRect());

const plotBoxOf = (container: Element) =>
	container.querySelector('[data-part="plot"]')!.getBoundingClientRect();

const offsetOf = (container: Element) =>
	container.querySelector('path')!.getBoundingClientRect().left - plotBoxOf(container).left;

const layerPadding = (container: Element) => {
	const { top, right, bottom, left } =
		container.querySelector<HTMLElement>('.layercake-layout-html')!.style;
	return `${top} ${right} ${bottom} ${left}`;
};

const settled = async (container: Element) => {
	await expect.poll(() => labels(container, 'x-part').length).toBeGreaterThan(1);
	await expect.poll(() => container.querySelector('path')).not.toBeNull();
	let quiet = 0;
	let previous = layerPadding(container);
	for (let frame = 0; frame < MAX_FRAMES && quiet < SETTLE_FRAMES; frame++) {
		await nextFrame();
		const current = layerPadding(container);
		quiet = current === previous ? quiet + 1 : 0;
		previous = current;
	}
};

const axisMarks = (container: Element) =>
	[...container.querySelectorAll('svg line.stroke-chart-axis')].map((line) =>
		line.getBoundingClientRect()
	);

const isNear = (actual: number, expected: number) => Math.abs(actual - expected) <= SUBPIXEL;

const xTickMarks = (container: Element) =>
	axisMarks(container).filter((box) => box.width <= SUBPIXEL && isNear(box.height, TICK_SIZE));

const yTickMarks = (container: Element) =>
	axisMarks(container).filter((box) => box.height <= SUBPIXEL && isNear(box.width, TICK_SIZE));

const xAxisLine = (container: Element) =>
	axisMarks(container).find((box) => box.height <= SUBPIXEL && box.width > TICK_SIZE + SUBPIXEL)!;

const yAxisLine = (container: Element) =>
	axisMarks(container).find((box) => box.width <= SUBPIXEL && box.height > TICK_SIZE + SUBPIXEL)!;

const bottomGutterOf = (container: Element) =>
	plotBoxOf(container).bottom - xAxisLine(container).top;

const labelRowOf = (container: Element) => container.querySelector('.x-part')!;

const columnGutterOf = (container: Element) =>
	Math.ceil(container.querySelector('.y-part')!.getBoundingClientRect().width) + LABEL_GAP;

const rowGutterOf = (container: Element) =>
	Math.ceil(labelRowOf(container).getBoundingClientRect().height) + TICK_SIZE;

const outsidePlot = (container: Element, part: string) => {
	const plot = plotBoxOf(container);
	return labelBoxes(container, part)
		.map((box, index) => ({ index, text: labels(container, part)[index], box }))
		.filter(
			({ box }) =>
				box.left < plot.left - SUBPIXEL ||
				box.right > plot.right + SUBPIXEL ||
				box.top < plot.top - SUBPIXEL ||
				box.bottom > plot.bottom + SUBPIXEL
		)
		.map(({ index, text }) => `${part} label ${index} "${text}"`);
};

const withoutMatches = (texts: (string | undefined)[], isMatch: (text: string) => boolean) =>
	texts.filter((text) => !isMatch(text ?? ''));

describe('Chart axes', () => {
	it('labels every x tick with the given format', async () => {
		const { container } = render(AxesChart, { props: { series, xFormat: () => 'tick-x' } });
		await expect.poll(() => labels(container, 'x-part').length).toBeGreaterThan(1);

		const unformatted = withoutMatches(labels(container, 'x-part'), (text) => text === 'tick-x');

		expect(unformatted).toEqual([]);
	});

	it('labels every y tick with the given format', async () => {
		const { container } = render(AxesChart, {
			props: { series, yFormat: (value: number) => `${value} units` }
		});
		await expect.poll(() => labels(container, 'y-part').length).toBeGreaterThan(1);

		const unformatted = withoutMatches(labels(container, 'y-part'), (text) =>
			text.endsWith(' units')
		);

		expect(unformatted).toEqual([]);
	});

	it('labels the x ticks from the time scale by default', async () => {
		const { container } = render(AxesChart, { props: { series } });
		await expect.poll(() => labels(container, 'x-part').length).toBeGreaterThan(1);

		const unexpected = withoutMatches(labels(container, 'x-part'), (text) =>
			/^[\d:.A-Za-z ]+$/.test(text)
		);

		expect(unexpected).toEqual([]);
		expect(
			labels(container, 'x-part').some((text) => text?.startsWith(':')),
			`a seconds label such as ":15" among ${labels(container, 'x-part').join(' ')}`
		).toBe(true);
	});

	it('starts the line at the plot edge without axes', async () => {
		const { container } = render(AxesChart, { props: { series, hasAxes: false } });
		await expect.poll(() => container.querySelector('path')).not.toBeNull();

		expect(offsetOf(container)).toBe(0);
	});

	it('starts the line exactly one measured y label column and gap from the plot edge', async () => {
		const { container } = render(AxesChart, { props: { series, yFormat: () => WIDE_LABEL } });
		await settled(container);

		expect(offsetOf(container)).toBe(columnGutterOf(container));
	});

	it('counts a border on the y axis class exactly once in the left gutter', async () => {
		const { container } = render(AxesChart, { props: { series, yClass: 'border-l-8' } });
		await settled(container);

		expect(offsetOf(container)).toBe(columnGutterOf(container));
		expect(
			container.querySelector('.y-part')!.getBoundingClientRect().width,
			'column includes its 8px border'
		).toBeGreaterThanOrEqual(8);
	});

	it('draws one grid line per y tick', async () => {
		const { container } = render(AxesChart, { props: { series, yMin: 0, yMax: 10 } });
		await expect.poll(() => labels(container, 'y-part').length).toBeGreaterThan(1);
		const ticks = labels(container, 'y-part').length;
		expect(container.querySelectorAll('.grid-part line')).toHaveLength(ticks);
	});

	it('keeps the y ticks of the hidden data with every series hidden', async () => {
		const { container } = render(AxesChart, {
			props: { series: [{ name: 'Reading', points, hidden: true }] }
		});

		await expect
			.poll(() => labels(container, 'y-part'))
			.toEqual(['2', '3', '4', '5', '6', '7', '8']);
	});

	it('keeps a wide y label inside the plot', async () => {
		const { container } = render(AxesChart, { props: { series, yFormat: () => WIDE_LABEL } });
		await settled(container);

		expect(outsidePlot(container, 'y-part')).toEqual([]);
	});

	it('keeps every x label inside the plot box vertically', async () => {
		const { container } = render(AxesChart, { props: { series, xFormat: utcFormat } });
		await settled(container);

		expect(outsidePlot(container, 'x-part')).toEqual([]);
	});

	it('takes the measured x row height and the tick length as the bottom gutter', async () => {
		const { container } = render(AxesChart, { props: { series, xFormat: utcFormat } });
		await settled(container);

		expect(bottomGutterOf(container)).toBeCloseTo(rowGutterOf(container), 1);
	});

	it('sizes the bottom gutter from a minimum height on the x axis class', async () => {
		const { container } = render(AxesChart, {
			props: { series, xFormat: utcFormat, xClass: 'min-h-16' }
		});
		await settled(container);

		const row = labelRowOf(container).getBoundingClientRect();
		expect(row.height, 'label row takes min-h-16').toBe(SIZE_16_PX);
		expect(bottomGutterOf(container)).toBeCloseTo(SIZE_16_PX + TICK_SIZE, 1);
	});

	it('centers each x label on its tick mark', async () => {
		const { container } = render(AxesChart, { props: { series, xFormat: utcFormat } });
		await settled(container);

		const boxes = labelBoxes(container, 'x-part');
		const marks = xTickMarks(container);
		expect(marks).toHaveLength(boxes.length);
		const misplaced = boxes
			.map((box, index) => ({
				text: labels(container, 'x-part')[index],
				distance: Math.abs(box.left + box.width / 2 - marks[index].left)
			}))
			.filter(({ distance }) => distance > SUBPIXEL);
		expect(misplaced).toEqual([]);
	});

	it.each([
		{ frame: 'no class', yClass: undefined },
		{ frame: 'top padding and border', yClass: 'pt-4 border-t-8 pb-1' }
	])('centers each y label on its tick mark under $frame', async ({ yClass }) => {
		const { container } = render(AxesChart, { props: { series, yMin: 0, yMax: 10, yClass } });
		await settled(container);
		await expect.poll(() => labels(container, 'y-part').length).toBeGreaterThan(1);

		const boxes = labelBoxes(container, 'y-part');
		const marks = yTickMarks(container);
		expect(marks).toHaveLength(boxes.length);
		const misplaced = boxes
			.map((box, index) => ({
				text: labels(container, 'y-part')[index],
				distance: Math.abs(box.top + box.height / 2 - marks[index].top)
			}))
			.filter(({ distance }) => distance > SUBPIXEL);
		expect(misplaced).toEqual([]);
	});

	it('draws the y tick marks at their values, from the lowest at the bottom up', async () => {
		const { container } = render(AxesChart, { props: { series, yMin: 0, yMax: 10 } });
		await settled(container);
		await expect.poll(() => labels(container, 'y-part')).toContain('10');

		const values = labels(container, 'y-part').map(Number);
		const tops = yTickMarks(container).map((box) => box.top);
		const axis = yAxisLine(container);
		const span = values.at(-1)! - values[0];
		const misplaced = values
			.map((value, index) => ({
				value,
				expected: axis.bottom - ((value - values[0]) / span) * axis.height,
				actual: tops[index]
			}))
			.filter(({ expected, actual }) => !isNear(actual, expected));
		expect(misplaced).toEqual([]);
	});

	it('starts the x tick marks on the axis line and keeps them along its length', async () => {
		const { container } = render(AxesChart, { props: { series, xFormat: utcFormat } });
		await settled(container);

		const axis = xAxisLine(container);
		expect(xTickMarks(container), 'x tick marks drawn').toHaveLength(
			labels(container, 'x-part').length
		);
		const stray = xTickMarks(container)
			.map((box, index) => ({ index, box }))
			.filter(
				({ box }) =>
					!isNear(box.top, axis.top) ||
					box.left < axis.left - SUBPIXEL ||
					box.left > axis.right + SUBPIXEL
			)
			.map(({ index }) => `x tick mark ${index}`);
		expect(stray).toEqual([]);
	});

	it('draws the y tick marks left of the axis line, ending on it', async () => {
		const { container } = render(AxesChart, { props: { series } });
		await settled(container);

		const axis = yAxisLine(container);
		const stray = yTickMarks(container)
			.map((box, index) => ({ index, box }))
			.filter(({ box }) => !isNear(box.right, axis.left))
			.map(({ index }) => `y tick mark ${index}`);
		expect(yTickMarks(container).length).toBeGreaterThan(1);
		expect(stray).toEqual([]);
	});

	it('aligns stacked plots whose y axes share a minimum width class', async () => {
		const { container } = render(StackedAxesChart, { props: { points, yClass: 'min-w-16' } });
		const charts = ['narrow', 'wide'].map(
			(name) => container.querySelector(`[data-testid="${name}"]`)!
		);

		await expect
			.poll(() => charts.map((chart) => offsetOf(chart)))
			.toEqual([SIZE_16_PX + LABEL_GAP, SIZE_16_PX + LABEL_GAP]);
	});

	it('leaves stacked plots misaligned by their own labels without a shared y axis class', async () => {
		const { container } = render(StackedAxesChart, { props: { points, yClass: undefined } });
		const [narrow, wide] = ['narrow', 'wide'].map(
			(name) => container.querySelector(`[data-testid="${name}"]`)!
		);

		await expect.poll(() => offsetOf(wide)).toBe(columnGutterOf(wide));
		await expect.poll(() => offsetOf(narrow)).toBe(columnGutterOf(narrow));
		expect(offsetOf(narrow)).toBeLessThan(offsetOf(wide));
	});

	it.each([{ hasYAxis: true }, { hasYAxis: false }])(
		'keeps the first and last x labels inside the plot with a y axis: $hasYAxis',
		async ({ hasYAxis }) => {
			const { container } = render(AxesChart, {
				props: { series, hasYAxis, xFormat: utcFormat }
			});
			await settled(container);

			expect(outsidePlot(container, 'x-part')).toEqual([]);
		}
	);
});

describe('Chart axes after mounting', () => {
	it('widens the left gutter when the y format changes to a wider label', async () => {
		const { container, rerender } = render(AxesChart, { props: { series, xFormat: utcFormat } });
		await settled(container);
		const before = offsetOf(container);

		await rerender({ yFormat: () => WIDE_LABEL });

		await expect.poll(() => offsetOf(container)).toBeGreaterThan(before);
		await settled(container);
		expect(offsetOf(container)).toBe(columnGutterOf(container));
		expect(outsidePlot(container, 'y-part')).toEqual([]);
	});

	it('takes a new y axis class as the left gutter', async () => {
		const { container, rerender } = render(AxesChart, { props: { series, xFormat: utcFormat } });
		await settled(container);

		await rerender({ yClass: 'min-w-32' });

		await expect.poll(() => offsetOf(container)).toBe(SIZE_32_PX + LABEL_GAP);
		expect(outsidePlot(container, 'y-part')).toEqual([]);
	});

	it('takes a new x axis class as the bottom gutter', async () => {
		const { container, rerender } = render(AxesChart, { props: { series, xFormat: utcFormat } });
		await settled(container);

		await rerender({ xClass: 'min-h-16' });

		await expect.poll(() => bottomGutterOf(container)).toBeCloseTo(SIZE_16_PX + TICK_SIZE, 1);
		expect(outsidePlot(container, 'x-part')).toEqual([]);
	});

	it('keeps the x labels inside the plot when the x format changes to a wider label', async () => {
		const { container, rerender } = render(AxesChart, { props: { series, xFormat: utcFormat } });
		await settled(container);

		await rerender({ xFormat: () => WIDE_LABEL });

		await expect.poll(() => labels(container, 'x-part')[0]).toBe(WIDE_LABEL);
		await settled(container);
		expect(outsidePlot(container, 'x-part')).toEqual([]);
	});
});
