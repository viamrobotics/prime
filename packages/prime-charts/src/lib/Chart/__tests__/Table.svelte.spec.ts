import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';

import '../../../../test/tailwind.css';
import TableChart from './fixtures/TableChart.svelte';

const MINUTE = 60_000;
const START = Date.UTC(2026, 0, 1);
const LONG_TABLE_ROWS = 200;
const at = (minutes: number) => new Date(START + minutes * MINUTE);

const cells = (row: Element) => [...row.querySelectorAll('th, td')].map((cell) => cell.textContent);
const headerTexts = (container: Element) =>
	[...container.querySelectorAll('thead th')].map((cell) => cell.textContent);
const bodyRows = (container: Element) =>
	[...container.querySelectorAll('tbody tr')].map((row) => cells(row));
const table = (container: Element) => container.querySelector('table[data-part="table"]');
const captionText = (container: Element) => table(container)?.querySelector('caption')?.textContent;

const formatTime = (value: Date) => `t${(value.getTime() - START) / MINUTE}`;
const formatValue = (value: number) => `${value}!`;
const onePoint = [{ name: 'a', points: [{ x: at(0), y: 1 }] }];

describe('Chart.Table', () => {
	it('heads one column per series with its unit after a Time column', async () => {
		const series = [
			{ name: 'cell-01', unit: '°', points: [{ x: at(0), y: 1 }] },
			{ name: 'cell-02', points: [{ x: at(0), y: 2 }] }
		];

		const { container } = render(TableChart, { props: { series } });

		await expect.poll(() => headerTexts(container)).toEqual(['Time', 'cell-01 (°)', 'cell-02']);
	});

	it('scopes every header cell to its column', async () => {
		const { container } = render(TableChart, { props: { series: onePoint } });

		await expect
			.poll(() => [...container.querySelectorAll('thead th')].map((th) => th.getAttribute('scope')))
			.toEqual(['col', 'col']);
	});

	it('renders a row per x with the axis formats and an empty cell where a series has no value', async () => {
		const series = [
			{
				name: 'a',
				points: [
					{ x: at(0), y: 1 },
					{ x: at(1), y: 2 }
				]
			},
			{
				name: 'b',
				points: [
					{ x: at(0), y: 10 },
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

	it('drops the column of a hidden series', async () => {
		const series = [
			{ name: 'a', points: [{ x: at(0), y: 1 }], hidden: true },
			{ name: 'b', points: [{ x: at(0), y: 2 }] }
		];

		const { container } = render(TableChart, {
			props: { series, hasAxes: true, xFormat: formatTime, yFormat: formatValue }
		});

		await expect
			.poll(() => ({ header: headerTexts(container), rows: bodyRows(container) }))
			.toEqual({ header: ['Time', 'b'], rows: [['t0', '2!']] });
	});

	it('formats cells with the default formats when no axis is placed', async () => {
		const series = [{ name: 'a', points: [{ x: new Date(2026, 0, 1, 0, 0, 0), y: 1234.5 }] }];

		const { container } = render(TableChart, { props: { series } });

		await expect
			.poll(() => bodyRows(container).map((row) => row.map((cell) => cell?.replace(/\s/g, ' '))))
			.toEqual([['Jan 1, 2026, 12:00:00 AM', '1,234.5']]);
	});

	it('names the table with the chart aria-label', async () => {
		const { container } = render(TableChart, { props: { series: onePoint } });

		await expect.poll(() => captionText(container)).toBe('Readings');
	});

	it('prefers the caption prop over the aria-label', async () => {
		const { container } = render(TableChart, {
			props: { series: onePoint, caption: 'Raw values' }
		});

		await expect.poll(() => captionText(container)).toBe('Raw values');
	});

	it('falls back to the aria-label for an empty caption', async () => {
		const { container } = render(TableChart, { props: { series: onePoint, caption: '' } });

		await expect.poll(() => captionText(container)).toBe('Readings');
	});

	it('takes the chart aria-labelledby as its name and renders no caption', async () => {
		const { container } = render(TableChart, { props: { series: onePoint, isLabelled: true } });

		await expect
			.poll(() => ({
				labelledBy: table(container)?.getAttribute('aria-labelledby'),
				caption: table(container)?.querySelector('caption') ?? null
			}))
			.toEqual({ labelledBy: 'chart-title', caption: null });
	});

	it('reads its rows from the chart x window', async () => {
		const series = [
			{
				name: 'a',
				points: [
					{ x: at(0), y: 1 },
					{ x: at(1), y: 2 },
					{ x: at(2), y: 3 }
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

		await expect
			.poll(() => ({ header: headerTexts(container), rows: bodyRows(container) }))
			.toEqual({ header: ['Time'], rows: [] });
	});

	it('shows the table at its full size by default', async () => {
		const { container } = render(TableChart, { props: { series: onePoint } });
		await expect.poll(() => bodyRows(container).length).toBe(1);

		const box = table(container)!.parentElement!.getBoundingClientRect();

		expect(box.width > 1 && box.height > 1, `wrapper box is ${box.width}x${box.height}`).toBe(true);
	});

	it('hides a long table with sr-only on its wrapper without growing the page', async () => {
		const points = Array.from({ length: LONG_TABLE_ROWS }, (_, index) => ({
			x: at(index),
			y: index
		}));

		const { container } = render(TableChart, {
			props: { series: [{ name: 'a', points }], tableClass: 'sr-only' }
		});

		await expect.poll(() => bodyRows(container).length).toBe(LONG_TABLE_ROWS);
		const box = table(container)!.parentElement!.getBoundingClientRect();
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
		const { container } = render(TableChart, { props: { series: onePoint, isTableFirst } });
		await expect.poll(() => table(container)).not.toBeNull();

		const plot = container.querySelector('[data-part="plot"]')!;

		expect(table(container)!.compareDocumentPosition(plot) & plotPosition, 'plot order').toBe(
			plotPosition
		);
	});
});
