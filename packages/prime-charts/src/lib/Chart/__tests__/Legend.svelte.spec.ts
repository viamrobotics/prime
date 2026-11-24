import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { userEvent } from 'vitest/browser';

import '../../../../test/tailwind.css';
import LegendChart from './fixtures/LegendChart.svelte';

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

		await expect
			.poll(() => buttons(container).map((button) => button.textContent?.trim()))
			.toEqual(['cell-01 (°)', 'cell-02']);
	});

	it('toggles a bound hidden by pointer', async () => {
		const { container } = render(LegendChart, { props: { series: twoSeries, isBound: true } });
		await expect.poll(() => buttons(container).length).toBe(2);

		buttons(container)[0].click();

		await expect
			.poll(() => boundHiddenText(container), { message: 'first click hides the series' })
			.toBe('true,false');

		buttons(container)[0].click();

		await expect
			.poll(() => boundHiddenText(container), { message: 'second click shows it again' })
			.toBe('false,false');
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
		await expect.poll(() => container.querySelectorAll('path').length).toBe(2);

		buttons(container)[0].click();

		await expect
			.poll(() => container.querySelectorAll('path').length, {
				message: 'first click removes the hidden line'
			})
			.toBe(1);

		buttons(container)[0].click();

		await expect
			.poll(() => container.querySelectorAll('path').length, {
				message: 'second click draws it again'
			})
			.toBe(2);
	});

	it('follows the shown state in aria-pressed', async () => {
		const { container } = render(LegendChart, { props: { series: twoSeries, isBound: true } });
		await expect.poll(() => buttons(container).length).toBe(2);
		const pressed = () => buttons(container).map((button) => button.getAttribute('aria-pressed'));
		expect(pressed(), 'every series shows at first').toEqual(['true', 'true']);

		buttons(container)[0].click();

		await expect
			.poll(pressed, { message: 'only the hidden series is not pressed' })
			.toEqual(['false', 'true']);
	});

	it('shows the loading mark only for a loading series', async () => {
		const { container } = render(LegendChart, {
			props: { series: [{ ...twoSeries[0], loading: true }, twoSeries[1]] }
		});
		await expect.poll(() => buttons(container).length).toBe(2);

		const hasMark = buttons(container).map(
			(button) => button.querySelector('[data-part="legend-loading"]') !== null
		);
		expect(hasMark).toEqual([true, false]);
	});

	it('names a loading series as loading in text', async () => {
		const { container } = render(LegendChart, {
			props: { series: [{ ...twoSeries[0], loading: true }, twoSeries[1]] }
		});

		await expect.poll(() => buttons(container).length).toBe(2);

		const items = [...container.querySelectorAll('[data-part="legend"] li')].map((item) =>
			item.textContent?.replace(/\s+/g, ' ').trim()
		);
		expect(items).toEqual(['cell-01 (°) Loading', 'cell-02']);
	});

	it('names the list as the shown series', async () => {
		const { container } = render(LegendChart, { props: { series: twoSeries } });

		await expect
			.poll(() => container.querySelector('[data-part="legend"]')?.getAttribute('aria-label'))
			.toBe('Shown series');
		expect(container.querySelector('[data-part="legend"]')?.getAttribute('role'), 'list role').toBe(
			'list'
		);
	});

	it('describes only a loading series button as Loading', async () => {
		const { container } = render(LegendChart, {
			props: { series: [{ ...twoSeries[0], loading: true }, twoSeries[1]] }
		});
		await expect.poll(() => buttons(container).length).toBe(2);

		const descriptions = buttons(container).map((button) => {
			const id = button.getAttribute('aria-describedby');
			return id === null ? null : document.getElementById(id)?.textContent;
		});

		expect(descriptions).toEqual(['Loading', null]);
	});

	it('gives each loading series its own description id', async () => {
		const { container } = render(LegendChart, {
			props: { series: twoSeries.map((entry) => ({ ...entry, loading: true })) }
		});
		await expect.poll(() => buttons(container).length).toBe(2);

		const ids = buttons(container).map((button) => button.getAttribute('aria-describedby'));

		expect(new Set(ids).size, `ids were ${ids.join(', ')}`).toBe(2);
	});

	it('passes a consumer id and data attribute to the list', async () => {
		const { container } = render(LegendChart, {
			props: { series: twoSeries, legendProps: { id: 'series-legend', 'data-extra': 'yes' } }
		});

		await expect
			.poll(() => {
				const list = container.querySelector('[data-part="legend"]');
				return { tag: list?.tagName, id: list?.id, extra: list?.getAttribute('data-extra') };
			})
			.toEqual({ tag: 'UL', id: 'series-legend', extra: 'yes' });
	});

	it.each([
		{ isLegendFirst: false, flag: Node.DOCUMENT_POSITION_FOLLOWING, place: 'after' },
		{ isLegendFirst: true, flag: Node.DOCUMENT_POSITION_PRECEDING, place: 'before' }
	])('places the legend $place the plot', async ({ isLegendFirst, flag }) => {
		const { container } = render(LegendChart, { props: { series: twoSeries, isLegendFirst } });
		await expect.poll(() => buttons(container).length).toBe(2);

		const plot = container.querySelector('[data-part="plot"]')!;
		const legend = container.querySelector('[data-part="legend"]')!;
		expect(
			plot.compareDocumentPosition(legend) & flag,
			'legend position relative to the plot'
		).toBe(flag);
	});
});
