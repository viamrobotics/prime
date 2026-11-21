import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';

import '../../../../test/tailwind.css';
import RootChart from './RootChart.svelte';
import RootEmptyText from './RootEmptyText.svelte';

const points = [
	{ x: new Date('2026-01-01T00:00:00Z'), y: 2 },
	{ x: new Date('2026-01-01T00:01:00Z'), y: 8 }
];
const series = [{ name: 'Reading', points }];

const WIDE_LABEL = '1,234,567.89 units';
const LABEL_GAP = 10;

const utcClock = new Intl.DateTimeFormat('en-US', {
	timeZone: 'UTC',
	hour: '2-digit',
	minute: '2-digit',
	hour12: false
});
const utcFormat = (value: Date) => utcClock.format(value);

const emptyText = (container: Element) =>
	container.querySelector('[data-part="empty"]')?.textContent?.trim();

describe('Chart states', () => {
	it('shows "No data" with no series', async () => {
		const { container } = render(RootChart, { props: {} });
		await expect.poll(() => emptyText(container)).toBe('No data');
	});

	it('shows "No data" when every point is null', async () => {
		const { container } = render(RootChart, {
			props: { series: [{ name: 'Reading', points: [{ x: new Date(0), y: null }] }] }
		});
		await expect.poll(() => emptyText(container)).toBe('No data');
	});

	it('describes an empty chart as "No data."', async () => {
		const { container } = render(RootChart, { props: {} });
		await expect.poll(() => container.textContent).toContain('No data');
		const figure = container.querySelector('[role="figure"]')!;
		const describedBy = figure.getAttribute('aria-describedby')!;

		expect(container.querySelector(`[id="${describedBy}"]`)?.textContent).toBe('No data.');
	});

	it('places a table with a header row and no body rows when empty', async () => {
		const { container } = render(RootChart, { props: { hasTable: true } });
		await expect.poll(() => container.querySelector('table')).not.toBeNull();

		expect(container.querySelectorAll('thead tr')).toHaveLength(1);
		expect(container.querySelectorAll('tbody tr')).toHaveLength(0);
	});

	it('renders a custom empty snippet', async () => {
		const { container } = render(RootEmptyText);
		await expect.poll(() => container.textContent).toContain('Nothing recorded');
		expect(container.querySelector('[data-part="plot"]')?.textContent).not.toContain('No data');
	});

	it('is not empty when every series is hidden', async () => {
		const { container } = render(RootChart, {
			props: { series: [{ name: 'Reading', points, hidden: true }] }
		});
		await expect.poll(() => container.querySelector('svg')).not.toBeNull();
		expect(container.textContent).not.toContain('No data');
	});

	it('keeps the path under a loading overlay', async () => {
		const { container } = render(RootChart, { props: { series, loading: true } });
		await expect.poll(() => container.querySelector('path')).not.toBeNull();
		expect(container.querySelector('[data-part="loading"]')).not.toBeNull();
		expect(container.querySelector('[role="figure"]')?.getAttribute('aria-busy')).toBe('true');
	});

	it('keeps the axes and the measured y gutter under a loading overlay', async () => {
		const { container } = render(RootChart, {
			props: {
				series,
				loading: true,
				hasAxes: true,
				xFormat: utcFormat,
				yFormat: () => WIDE_LABEL
			}
		});
		await expect.poll(() => container.querySelectorAll('.x-part span').length).toBeGreaterThan(1);
		expect(container.querySelectorAll('.y-part span').length).toBeGreaterThan(1);
		const plot = container.querySelector('[data-part="plot"]')!.getBoundingClientRect();
		const gutter = () =>
			Math.ceil(container.querySelector('.y-part')!.getBoundingClientRect().width) + LABEL_GAP;
		const offset = () => container.querySelector('path')!.getBoundingClientRect().left - plot.left;

		await expect.poll(() => offset() - gutter()).toBe(0);
		expect(gutter()).toBeGreaterThan(LABEL_GAP);
	});

	it('shows no overlay and is not busy when not loading', async () => {
		const { container } = render(RootChart, { props: { series } });
		await expect.poll(() => container.querySelector('path')).not.toBeNull();
		expect(container.querySelector('[data-part="loading"]')).toBeNull();
		expect(
			container.querySelector('[role="figure"]')?.hasAttribute('aria-busy'),
			'figure has aria-busy when not loading'
		).toBe(false);
	});

	it.each([
		['loading', { series, loading: true }],
		['empty', {}]
	])('keeps the %s overlay inside the plot, off a legend beside it', async (part, props) => {
		const { container } = render(RootChart, { props: { ...props, hasLegendBeside: true } });
		await expect.poll(() => container.querySelector(`[data-part="${part}"]`)).not.toBeNull();
		const overlay = container.querySelector(`[data-part="${part}"]`)!;
		const plot = container.querySelector('[data-part="plot"]')!;
		const legend = container.querySelector('[data-part="legend"]')!;

		expect(plot.contains(overlay), `${part} overlay is inside the plot`).toBe(true);
		expect(plot.contains(legend), 'legend is outside the plot').toBe(false);
		expect(overlay.getBoundingClientRect().left).toBeGreaterThanOrEqual(
			legend.getBoundingClientRect().right
		);
	});

	it('lets the consumer position the plot', async () => {
		const { container } = render(RootChart, {
			props: { series, loading: true, isPlotAbsolute: true }
		});
		await expect.poll(() => container.querySelector('path')).not.toBeNull();
		const plot = container.querySelector('[data-part="plot"]')!;
		const overlay = container.querySelector('[data-part="loading"]')!;

		expect(getComputedStyle(plot).position).toBe('absolute');
		expect(plot.getBoundingClientRect().height).toBe(200);
		const overlayBox = overlay.getBoundingClientRect();
		const plotBox = plot.getBoundingClientRect();
		expect(overlayBox.left).toBe(plotBox.left);
		expect(overlayBox.top).toBe(plotBox.top);
		expect(overlayBox.width).toBe(plotBox.width);
		expect(overlayBox.height).toBe(plotBox.height);
	});

	it('lets loading win over the empty state', async () => {
		const { container } = render(RootChart, { props: { loading: true } });
		await expect.poll(() => container.querySelector('[data-part="loading"]')).not.toBeNull();
		expect(container.querySelector('[data-part="plot"]')?.textContent).not.toContain('No data');
	});
});
