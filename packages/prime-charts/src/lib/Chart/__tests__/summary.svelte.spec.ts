import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';

import '../../../../test/tailwind.css';
import SummaryChart from './fixtures/SummaryChart.svelte';

const START = new Date('2026-01-01T00:00:00Z');
const END = new Date('2026-01-01T00:01:00Z');
const series = [
	{
		name: 'Temperature',
		unit: '°',
		points: [
			{ x: START, y: 2 },
			{ x: END, y: 8 }
		]
	},
	{
		name: 'Load',
		points: [
			{ x: START, y: 4 },
			{ x: END, y: 6 }
		]
	}
];

const utcClock = new Intl.DateTimeFormat('en-US', {
	timeZone: 'UTC',
	hour: '2-digit',
	minute: '2-digit',
	hour12: false
});
const xFormat = (value: Date) => utcClock.format(value);
const yFormat = (value: number) => `${value} u`;

const summaryText = (container: HTMLElement) =>
	container.querySelector('[data-part="summary"]')?.textContent;
const figureOf = (container: HTMLElement) => container.querySelector<HTMLElement>('figure')!;

describe('Chart summary', () => {
	it('describes the figure with the series and both ranges in the axis formats', async () => {
		const { container } = render(SummaryChart, {
			props: { series, hasAxes: true, xFormat, yFormat }
		});

		await expect
			.element(figureOf(container))
			.toHaveAccessibleDescription(
				'Series: Temperature (°), Load. Time: 00:00 to 00:01. Values: 2 u to 8 u.'
			);
	});

	it('falls back to the default formats without axes', async () => {
		const localSeries = series.map((entry) => ({
			...entry,
			points: entry.points.map((point, index) => ({
				...point,
				x: new Date(2026, 0, 1, 0, index, 0)
			}))
		}));

		const { container } = render(SummaryChart, { props: { series: localSeries } });

		await expect
			.poll(() => summaryText(container)?.replace(/\s/g, ' '))
			.toBe(
				'Series: Temperature (°), Load. Time: Jan 1, 2026, 12:00:00 AM to Jan 1, 2026, 12:01:00 AM. Values: 2 to 8.'
			);
	});

	it('reads the x and y bounds the chart is given', async () => {
		const { container } = render(SummaryChart, {
			props: {
				series,
				hasAxes: true,
				xFormat,
				yFormat,
				xMin: new Date('2025-12-31T23:59:00Z'),
				xMax: new Date('2026-01-01T00:02:00Z'),
				yMin: 0,
				yMax: 10
			}
		});

		await expect
			.poll(() => summaryText(container))
			.toBe('Series: Temperature (°), Load. Time: 23:59 to 00:02. Values: 0 u to 10 u.');
	});

	it('says "Every series is hidden." when every series is hidden', async () => {
		const { container } = render(SummaryChart, {
			props: { series: series.map((entry) => ({ ...entry, hidden: true })) }
		});

		await expect.poll(() => summaryText(container)).toBe('Every series is hidden.');
	});

	it('takes a consumer aria-describedby in place of the summary', async () => {
		const { container } = render(SummaryChart, { props: { series, describedby: 'own' } });

		await expect.element(figureOf(container)).toHaveAccessibleDescription('Own description');
	});

	it('renders no summary under a consumer aria-describedby', async () => {
		const { container } = render(SummaryChart, { props: { series, describedby: 'own' } });

		await expect.element(figureOf(container)).toHaveAccessibleDescription('Own description');

		expect(container.querySelector('[data-part="summary"]')).toBeNull();
	});
});
