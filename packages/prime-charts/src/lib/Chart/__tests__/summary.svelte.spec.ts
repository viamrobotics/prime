import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';

import '../../../../test/tailwind.css';
import SummaryChart from './SummaryChart.svelte';

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

describe('Chart summary', () => {
	it('describes the series and both ranges', async () => {
		const { container } = render(SummaryChart, {
			props: { series, hasAxes: true, xFormat, yFormat }
		});
		await expect
			.poll(() => summaryText(container))
			.toBe('Series: Temperature (°), Load. Time: 00:00 to 00:01. Values: 2 u to 8 u.');
		const figure = container.querySelector('[role="figure"]');
		await expect
			.element(figure as HTMLElement)
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

	it('uses the x bounds for the time range', async () => {
		const { container } = render(SummaryChart, {
			props: {
				series,
				hasAxes: true,
				xFormat,
				yFormat,
				xMin: new Date('2025-12-31T23:59:00Z'),
				xMax: new Date('2026-01-01T00:02:00Z')
			}
		});
		await expect
			.poll(() => summaryText(container))
			.toContain('Time: 23:59 to 00:02. Values: 2 u to 8 u.');
	});

	it('drops the values when no point is inside the x window', async () => {
		const { container } = render(SummaryChart, {
			props: {
				series,
				xMin: new Date('2026-01-01T00:00:10Z'),
				xMax: new Date('2026-01-01T00:00:50Z')
			}
		});
		await expect.poll(() => summaryText(container)).toContain('Time: ');
		expect(summaryText(container)).not.toContain('Values:');
	});

	it('uses the y bounds for the value range', async () => {
		const { container } = render(SummaryChart, {
			props: { series, hasAxes: true, xFormat, yFormat, yMin: 0, yMax: 10 }
		});
		await expect.poll(() => summaryText(container)).toContain('Values: 0 u to 10 u.');
	});

	it('drops a hidden series', async () => {
		const { container } = render(SummaryChart, {
			props: {
				series: [series[0], { ...series[1], hidden: true }],
				hasAxes: true,
				xFormat,
				yFormat
			}
		});
		await expect
			.poll(() => summaryText(container))
			.toBe('Series: Temperature (°). Time: 00:00 to 00:01. Values: 2 u to 8 u.');
	});

	it('says so when every series is hidden', async () => {
		const { container } = render(SummaryChart, {
			props: { series: series.map((entry) => ({ ...entry, hidden: true })) }
		});
		await expect.poll(() => summaryText(container)).toBe('Every series is hidden.');
	});

	it('says "No data." with no points', async () => {
		const { container } = render(SummaryChart, { props: {} });
		await expect.poll(() => summaryText(container)).toBe('No data.');
	});

	it('says "No data." when every point is a gap', async () => {
		const gaps = [{ name: 'Load', points: [{ x: new Date(0), y: null }] }];
		const { container } = render(SummaryChart, { props: { series: gaps } });
		await expect.poll(() => summaryText(container)).toBe('No data.');
	});

	it('leaves a consumer description alone and renders no summary', async () => {
		const { container } = render(SummaryChart, { props: { series, describedby: 'own' } });
		const figure = container.querySelector('[role="figure"]') as HTMLElement;
		await expect.element(figure).toHaveAccessibleDescription('Own description');
		expect(figure.getAttribute('aria-describedby')).toBe('own');
		expect(container.querySelector('[data-part="summary"]')).toBeNull();
	});
});
