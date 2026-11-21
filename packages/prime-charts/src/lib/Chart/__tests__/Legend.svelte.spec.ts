import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { userEvent } from 'vitest/browser';

import '../../../../test/tailwind.css';
import LegendChart from './LegendChart.svelte';
import TooltipChart from './TooltipChart.svelte';

const MIDDLE = 0.5;

const points = [
	{ x: new Date('2026-01-01T00:00:00Z'), y: 2 },
	{ x: new Date('2026-01-01T00:01:00Z'), y: 8 }
];
const twoSeries = [
	{ name: 'cell-01', unit: '°', points },
	{ name: 'cell-02', points }
];

const buttons = (container: Element) => [...container.querySelectorAll('button')];
const boundHiddenText = (container: Element) =>
	container.querySelector('[data-testid="hidden"]')?.textContent;

describe('Chart.Legend', () => {
	it('renders one button per series in source order with name and unit', async () => {
		const { container } = render(LegendChart, { props: { series: twoSeries } });
		await expect.poll(() => buttons(container).length).toBe(2);
		expect(buttons(container).map((button) => button.textContent?.trim())).toEqual([
			'cell-01 (°)',
			'cell-02'
		]);
	});

	it('toggles a bound hidden by pointer', async () => {
		const { container } = render(LegendChart, { props: { series: twoSeries, isBound: true } });
		await expect.poll(() => buttons(container).length).toBe(2);
		expect(boundHiddenText(container)).toBe('false,false');
		buttons(container)[0].click();
		await expect.poll(() => boundHiddenText(container)).toBe('true,false');
		buttons(container)[0].click();
		await expect.poll(() => boundHiddenText(container)).toBe('false,false');
	});

	it.each(['{Enter}', ' '])('toggles a bound hidden from the keyboard with %j', async (key) => {
		const { container } = render(LegendChart, { props: { series: twoSeries, isBound: true } });
		await expect.poll(() => buttons(container).length).toBe(2);
		buttons(container)[1].focus();
		await userEvent.keyboard(key);
		await expect.poll(() => boundHiddenText(container)).toBe('false,true');
	});

	it('toggles an unbound line and removes its path', async () => {
		const { container } = render(LegendChart, { props: { series: twoSeries } });
		await expect.poll(() => container.querySelectorAll('path').length).toBeGreaterThan(0);
		const before = container.querySelectorAll('path').length;
		buttons(container)[0].click();
		await expect.poll(() => container.querySelectorAll('path').length).toBeLessThan(before);
		buttons(container)[0].click();
		await expect.poll(() => container.querySelectorAll('path').length).toBe(before);
	});

	it('follows the shown state in aria-pressed', async () => {
		const { container } = render(LegendChart, { props: { series: twoSeries, isBound: true } });
		await expect.poll(() => buttons(container).length).toBe(2);
		expect(buttons(container).map((button) => button.getAttribute('aria-pressed'))).toEqual([
			'true',
			'true'
		]);
		buttons(container)[0].click();
		await expect.poll(() => buttons(container)[0].getAttribute('aria-pressed')).toBe('false');
		expect(buttons(container)[1].getAttribute('aria-pressed')).toBe('true');
	});

	it('shows the loading mark only for a loading series', async () => {
		const { container } = render(LegendChart, {
			props: { series: [{ ...twoSeries[0], loading: true }, twoSeries[1]] }
		});
		await expect.poll(() => buttons(container).length).toBe(2);
		const marks = (index: number) =>
			buttons(container)[index].querySelector('[data-part="legend-loading"]');
		expect(marks(0)).not.toBeNull();
		expect(marks(1)).toBeNull();
		expect(container.textContent).toContain('Loading');
	});

	it('keeps the chart not empty when every series is hidden', async () => {
		const { container } = render(LegendChart, {
			props: { series: twoSeries.map((entry) => ({ ...entry, hidden: true })) }
		});
		await expect.poll(() => container.querySelector('svg')).not.toBeNull();
		expect(buttons(container).length).toBe(2);
		expect(container.textContent).not.toContain('No data');
	});

	it('keeps the axes, the plot out of the tab order and no readout with every series hidden', async () => {
		const { container } = render(TooltipChart, {
			props: {
				series: twoSeries.map((entry) => ({ ...entry, hidden: true })),
				hasAxes: true,
				hasLegend: true
			}
		});
		const plot = container.querySelector<HTMLElement>('[data-part="plot"]')!;
		await expect.poll(() => container.querySelectorAll('.x-part span').length).toBeGreaterThan(1);
		expect(container.querySelectorAll('.y-part span').length).toBeGreaterThan(1);

		container.querySelector('button')!.focus();
		await userEvent.tab();
		expect(document.activeElement, 'the first tab stop after the plot').toBe(buttons(container)[1]);
		expect(plot.hasAttribute('tabindex')).toBe(false);

		const { width, height } = plot.getBoundingClientRect();
		await userEvent.hover(plot, { position: { x: width * MIDDLE, y: height * MIDDLE } });
		expect(container.querySelector('[data-part="tooltip"]')).toBeNull();
	});

	it.each([
		{ isLegendFirst: false, flag: Node.DOCUMENT_POSITION_FOLLOWING, place: 'after' },
		{ isLegendFirst: true, flag: Node.DOCUMENT_POSITION_PRECEDING, place: 'before' }
	])('places the legend $place the plot', async ({ isLegendFirst, flag }) => {
		const { container } = render(LegendChart, { props: { series: twoSeries, isLegendFirst } });
		await expect.poll(() => buttons(container).length).toBe(2);
		const plot = container.querySelector('[data-part="plot"]')!;
		const legend = container.querySelector('[data-part="legend"]')!;
		expect(plot.compareDocumentPosition(legend) & flag).toBe(flag);
	});
});
