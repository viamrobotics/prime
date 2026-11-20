import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { userEvent } from 'vitest/browser';

import '../../../../test/tailwind.css';
import TooltipChart from './TooltipChart.svelte';

const START = Date.parse('2026-01-01T00:00:00Z');
const MINUTE = 60_000;
const NEAR_TOP = 0.05;
const NEAR_BOTTOM = 0.95;
const MIDDLE = 0.5;
const POINT_COUNT = 3;

const flat = (value: number) =>
	Array.from({ length: POINT_COUNT }, (_, minute) => ({
		x: new Date(START + minute * MINUTE),
		y: value
	}));

const twoUnits = [
	{ name: 'cell-01', unit: '°', points: flat(12.3) },
	{ name: 'cell-02', unit: 'V', points: flat(4) }
];
const xFormat = (value: Date) => value.toISOString().slice(11, 19);

const plotOf = (container: Element) =>
	container.querySelector('[role="figure"]')!.firstElementChild as HTMLElement;
const readoutLines = (container: Element) =>
	[...(container.querySelector('[data-part="tooltip"]')?.children ?? [])].map((line) =>
		line.textContent?.trim()
	);
const liveText = (container: Element) =>
	container.querySelector('[role="status"]')?.textContent?.trim();

describe('Chart series units', () => {
	it('labels each legend entry with its own unit', async () => {
		const { container } = render(TooltipChart, { props: { series: twoUnits, hasLegend: true } });

		await expect.poll(() => container.querySelectorAll('[data-part="legend-item"]').length).toBe(2);

		const labels = [...container.querySelectorAll('[data-part="legend-item"]')].map((item) =>
			item.textContent?.trim()
		);
		expect(labels).toEqual(['cell-01 (°)', 'cell-02 (V)']);
	});

	it.each([
		{ yFraction: NEAR_TOP, name: 'cell-01', value: '12.3 °' },
		{ yFraction: NEAR_BOTTOM, name: 'cell-02', value: '4 V' }
	])('follows the $name value with its unit in the readout', async ({ yFraction, name, value }) => {
		const { container } = render(TooltipChart, { props: { series: twoUnits, xFormat } });
		await expect.poll(() => container.querySelector('path')).not.toBeNull();
		const { width, height } = plotOf(container).getBoundingClientRect();

		await userEvent.hover(plotOf(container), {
			position: { x: width * MIDDLE, y: height * yFraction }
		});

		await expect.poll(() => readoutLines(container)).toEqual([name, '00:01:00', value]);
	});

	it('announces each value with its own unit', async () => {
		const { container } = render(TooltipChart, { props: { series: twoUnits, xFormat } });
		await expect.poll(() => container.querySelector('path')).not.toBeNull();
		container.querySelector('button')!.focus();
		await userEvent.tab();
		await expect.poll(() => liveText(container)).toBe('cell-01, 00:00:00, 12.3 °');

		await userEvent.keyboard('{ArrowDown}');

		await expect.poll(() => liveText(container)).toBe('cell-02, 00:00:00, 4 V');
	});
});
