import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';

import '../../../../test/tailwind.css';
import TableChart from './TableChart.svelte';
import TableInPlot from './TableInPlot.svelte';

const MINUTE = 60_000;
const START = Date.UTC(2026, 0, 1);
const at = (minutes: number) => new Date(START + minutes * MINUTE);

const cells = (row: Element) => [...row.querySelectorAll('th, td')].map((cell) => cell.textContent);
const headerTexts = (container: Element) =>
	[...container.querySelectorAll('thead th')].map((cell) => cell.textContent);
const bodyRows = (container: Element) =>
	[...container.querySelectorAll('tbody tr')].map((row) => cells(row));
const table = (container: Element) => container.querySelector('table[data-part="table"]');

const formatTime = (value: Date) => `t${(value.getTime() - START) / MINUTE}`;
const formatValue = (value: number) => `${value}!`;

describe('Chart.Table', () => {
	it('heads one column per series with its unit after a Time column', async () => {
		const series = [
			{ name: 'cell-01', unit: '°', points: [{ x: at(0), y: 1 }] },
			{ name: 'cell-02', points: [{ x: at(0), y: 2 }] }
		];
		const { container } = render(TableChart, { props: { series } });
		await expect.poll(() => headerTexts(container)).toEqual(['Time', 'cell-01 (°)', 'cell-02']);
		expect(
			[...container.querySelectorAll('thead th')].map((th) => th.getAttribute('scope'))
		).toEqual(['col', 'col', 'col']);
	});

	it('merges series on x with a gap for a missing point and equal times from distinct Dates', async () => {
		const series = [
			{
				name: 'a',
				points: [
					{ x: at(0), y: 1 },
					{ x: at(1), y: 2 },
					{ x: at(2), y: null }
				]
			},
			{
				name: 'b',
				points: [
					{ x: new Date(at(0).getTime()), y: 10 },
					{ x: at(2), y: 30 }
				]
			}
		];
		const { container } = render(TableChart, {
			props: { series, hasAxes: true, xFormat: formatTime, yFormat: formatValue }
		});
		await expect
			.poll(() => bodyRows(container))
			.toEqual([
				['t0', '1!', '10!'],
				['t1', '2!', ''],
				['t2', '', '30!']
			]);
	});

	it('keeps the first of a duplicate x within one series', async () => {
		const series = [
			{
				name: 'a',
				points: [
					{ x: at(0), y: 1 },
					{ x: new Date(at(0).getTime()), y: 9 }
				]
			}
		];
		const { container } = render(TableChart, {
			props: { series, hasAxes: true, xFormat: formatTime, yFormat: formatValue }
		});
		await expect.poll(() => bodyRows(container)).toEqual([['t0', '1!']]);
	});

	it('drops the column of a hidden series', async () => {
		const series = [
			{ name: 'a', points: [{ x: at(0), y: 1 }], hidden: true },
			{ name: 'b', points: [{ x: at(0), y: 2 }] }
		];
		const { container } = render(TableChart, {
			props: { series, hasAxes: true, xFormat: formatTime, yFormat: formatValue }
		});
		await expect.poll(() => headerTexts(container)).toEqual(['Time', 'b']);
		expect(bodyRows(container)).toEqual([['t0', '2!']]);
	});

	it('formats cells with the default formats when no axis is placed', async () => {
		const series = [{ name: 'a', points: [{ x: at(0), y: 1234.5 }] }];
		const { container } = render(TableChart, { props: { series } });
		const expectedTime = new Intl.DateTimeFormat(undefined, {
			dateStyle: 'medium',
			timeStyle: 'medium'
		}).format(at(0));
		await expect.poll(() => bodyRows(container)).toEqual([[expectedTime, '1,234.5']]);
	});

	it('names the table with the chart aria-label', async () => {
		const series = [{ name: 'a', points: [{ x: at(0), y: 1 }] }];
		const { container } = render(TableChart, { props: { series } });
		await expect
			.poll(() => table(container)?.querySelector('caption')?.textContent)
			.toBe('Readings');
	});

	it('prefers the caption prop over the aria-label', async () => {
		const series = [{ name: 'a', points: [{ x: at(0), y: 1 }] }];
		const { container } = render(TableChart, { props: { series, caption: 'Raw values' } });
		await expect
			.poll(() => table(container)?.querySelector('caption')?.textContent)
			.toBe('Raw values');
	});

	it('falls back to the aria-label for an empty caption', async () => {
		const series = [{ name: 'a', points: [{ x: at(0), y: 1 }] }];
		const { container } = render(TableChart, { props: { series, caption: '' } });
		await expect
			.poll(() => table(container)?.querySelector('caption')?.textContent)
			.toBe('Readings');
	});

	it('takes the chart aria-labelledby as its name and renders no caption', async () => {
		const series = [{ name: 'a', points: [{ x: at(0), y: 1 }] }];
		const { container } = render(TableChart, { props: { series, labelledBy: true } });
		await expect.poll(() => table(container)?.getAttribute('aria-labelledby')).toBe('chart-title');
		expect(table(container)?.querySelector('caption')).toBeNull();
	});

	it('drops the rows outside xMin and xMax and keeps those on a bound', async () => {
		const series = [
			{
				name: 'a',
				points: [
					{ x: at(0), y: 1 },
					{ x: at(1), y: 2 },
					{ x: at(2), y: 3 },
					{ x: at(3), y: 4 }
				]
			}
		];
		const { container } = render(TableChart, {
			props: {
				series,
				hasAxes: true,
				xFormat: formatTime,
				yFormat: formatValue,
				xMin: at(1),
				xMax: at(2)
			}
		});
		await expect
			.poll(() => bodyRows(container))
			.toEqual([
				['t1', '2!'],
				['t2', '3!']
			]);
	});

	it('renders a header and no body rows for an empty chart', async () => {
		const { container } = render(TableChart, { props: { series: [] } });
		await expect.poll(() => headerTexts(container)).toEqual(['Time']);
		expect(bodyRows(container)).toEqual([]);
	});

	it('throws when placed inside Chart.Plot', () => {
		expect(() => render(TableInPlot)).toThrow('Chart.Table must be placed outside Chart.Plot.');
	});

	it('renders a header and no body rows when every point is a gap', async () => {
		const series = [
			{
				name: 'a',
				points: [
					{ x: at(0), y: null },
					{ x: at(1), y: null }
				]
			}
		];
		const { container } = render(TableChart, { props: { series } });
		await expect.poll(() => headerTexts(container)).toEqual(['Time', 'a']);
		expect(bodyRows(container)).toEqual([]);
	});

	it('shows the table at its full size by default', async () => {
		const series = [{ name: 'a', points: [{ x: at(0), y: 1 }] }];
		const { container } = render(TableChart, { props: { series } });
		await expect.poll(() => bodyRows(container).length).toBe(1);
		const box = table(container)!.parentElement!.getBoundingClientRect();
		expect(box.width > 1 && box.height > 1, `wrapper box is ${box.width}x${box.height}`).toBe(true);
	});

	it('hides a long table with sr-only on its wrapper without growing the page', async () => {
		const points = Array.from({ length: 200 }, (_, index) => ({ x: at(index), y: index }));
		const { container } = render(TableChart, {
			props: { series: [{ name: 'a', points }], tableClass: 'sr-only' }
		});
		await expect.poll(() => bodyRows(container).length).toBe(200);
		const wrapper = table(container)!.parentElement!;
		expect(wrapper.classList.contains('sr-only'), 'the class lands on the wrapper').toBe(true);
		const box = wrapper.getBoundingClientRect();
		expect(box.width <= 1 && box.height <= 1, `wrapper box is ${box.width}x${box.height}`).toBe(
			true
		);
		expect(document.documentElement.scrollHeight, 'page height').toBeLessThanOrEqual(
			window.innerHeight
		);
	});

	it.each([
		{ place: 'before', isTableFirst: true, plotPosition: Node.DOCUMENT_POSITION_FOLLOWING },
		{ place: 'after', isTableFirst: false, plotPosition: Node.DOCUMENT_POSITION_PRECEDING }
	])('renders $place the plot where it is placed', async ({ isTableFirst, plotPosition }) => {
		const series = [{ name: 'a', points: [{ x: at(0), y: 1 }] }];
		const { container } = render(TableChart, { props: { series, isTableFirst } });
		await expect.poll(() => table(container)).toBeTruthy();
		const plot = container.querySelector('[data-part="plot"]')!;
		expect(table(container)!.compareDocumentPosition(plot) & plotPosition, 'plot order').toBe(
			plotPosition
		);
	});
});
