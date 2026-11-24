import { createRawSnippet } from 'svelte';
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';

import '../../../../test/tailwind.css';
import RootChart from './fixtures/RootChart.svelte';

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

	it('renders the empty snippet in place of "No data"', async () => {
		const empty = createRawSnippet(() => ({ render: () => '<span>Nothing recorded</span>' }));

		const { container } = render(RootChart, { props: { empty } });

		await expect.poll(() => emptyText(container)).toBe('Nothing recorded');
	});

	it('is not empty when every series is hidden', async () => {
		const { container } = render(RootChart, {
			props: { series: [{ name: 'Reading', points, hidden: true }] }
		});
		await expect.poll(() => container.querySelector('svg')).not.toBeNull();

		expect(container.querySelector('[data-part="empty"]')).toBeNull();
	});

	it('keeps the path under a loading overlay', async () => {
		const { container } = render(RootChart, { props: { series, loading: true } });
		await expect.poll(() => container.querySelector('path')).not.toBeNull();

		expect(container.querySelector('[data-part="loading"]')).not.toBeNull();
	});

	it.each([
		{ loading: true, busy: 'true' },
		{ loading: false, busy: null }
	])(
		'sets aria-busy to $busy on the figure when loading is $loading',
		async ({ loading, busy }) => {
			const { container } = render(RootChart, { props: { series, loading } });
			await expect.poll(() => container.querySelector('path')).not.toBeNull();

			expect(container.querySelector('[role="figure"]')?.getAttribute('aria-busy')).toBe(busy);
		}
	);

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

	it('shows no overlay when not loading', async () => {
		const { container } = render(RootChart, { props: { series } });
		await expect.poll(() => container.querySelector('path')).not.toBeNull();

		expect(container.querySelector('[data-part="loading"]')).toBeNull();
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

		expect(container.querySelector('[data-part="empty"]')).toBeNull();
	});
});
