import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { userEvent } from 'vitest/browser';

import '../../../../test/tailwind.css';
import TooltipChart from './fixtures/TooltipChart.svelte';

const START = Date.parse('2026-01-01T00:00:00Z');
const MINUTE = 60_000;
const SERIES_LENGTH = 25;

const xFormat = (value: Date) => value.toISOString().slice(11, 19);

const series = (name: string, values: (number | null)[], minutes?: number[]) => ({
	name,
	points: values.map((y, index) => ({
		x: new Date(START + (minutes?.[index] ?? index) * MINUTE),
		y
	}))
});

const plotOf = (container: Element) => container.querySelector<HTMLElement>('[data-part="plot"]')!;
const liveText = (container: Element) =>
	container.querySelector('[role="status"]')?.textContent?.trim();
const readoutOf = (container: Element) => container.querySelector('[data-part="tooltip"]');

async function tabIntoChart(container: Element) {
	await expect.poll(() => container.querySelector('svg path, svg circle')).not.toBeNull();
	container.querySelector('button')!.focus();
	await userEvent.tab();
}

async function readAfter(container: Element, keys: string[]) {
	const reads: (string | undefined)[] = [];
	for (const key of keys) {
		await userEvent.keyboard(key);
		reads.push(liveText(container));
	}
	return reads;
}

describe('Chart.Tooltip keyboard', () => {
	it('reaches every point of both series and reads each from the live region', async () => {
		const { container } = render(TooltipChart, {
			props: { series: [series('cell-01', [1, 2, 3]), series('cell-02', [4, 5, 6])], xFormat }
		});
		await tabIntoChart(container);
		await expect.poll(() => liveText(container)).toBe('cell-01, 00:00:00, 1');

		const reads = await readAfter(container, [
			'{ArrowRight}',
			'{ArrowRight}',
			'{ArrowDown}',
			'{ArrowLeft}',
			'{ArrowLeft}'
		]);

		expect(reads).toEqual([
			'cell-01, 00:01:00, 2',
			'cell-01, 00:02:00, 3',
			'cell-02, 00:02:00, 6',
			'cell-02, 00:01:00, 5',
			'cell-02, 00:00:00, 4'
		]);
	});

	it('moves to the ends with Home and End and by a tenth with PageUp and PageDown', async () => {
		const values = Array.from({ length: SERIES_LENGTH }, (_, index) => index);
		const { container } = render(TooltipChart, {
			props: { series: [series('cell-01', values)], xFormat }
		});
		await tabIntoChart(container);
		await expect.poll(() => liveText(container)).toBe('cell-01, 00:00:00, 0');

		const reads = await readAfter(container, ['{End}', '{PageUp}', '{Home}', '{PageDown}']);

		expect(reads.map((read) => read?.split(', ').at(-1))).toEqual(['24', '22', '0', '2']);
	});

	it('restores the point focus left when the plot is focused again', async () => {
		const { container } = render(TooltipChart, {
			props: { series: [series('cell-01', [1, 2, 3])], xFormat, hasLegend: true }
		});
		await tabIntoChart(container);
		await readAfter(container, ['{ArrowRight}', '{ArrowRight}']);
		await userEvent.tab();
		await expect.poll(() => liveText(container)).toBe('');

		await userEvent.tab({ shift: true });

		await expect.poll(() => liveText(container)).toBe('cell-01, 00:02:00, 3');
	});

	it('moves off a series the legend hides', async () => {
		const { container } = render(TooltipChart, {
			props: {
				series: [series('cell-01', [1, 2]), series('cell-02', [3, 4])],
				xFormat,
				hasLegend: true
			}
		});
		await tabIntoChart(container);
		await readAfter(container, ['{ArrowDown}']);
		await userEvent.tab();
		await userEvent.tab();
		await userEvent.keyboard(' ');

		await userEvent.tab({ shift: true });
		await userEvent.tab({ shift: true });

		await expect.poll(() => liveText(container)).toBe('cell-01, 00:00:00, 1');
	});

	it('hides the readout and empties the live region on Escape', async () => {
		const { container } = render(TooltipChart, {
			props: { series: [series('cell-01', [1, 2])], xFormat }
		});
		await tabIntoChart(container);
		await expect.poll(() => readoutOf(container)).not.toBeNull();

		await userEvent.keyboard('{Escape}');

		await expect
			.poll(() => ({ readout: readoutOf(container), live: liveText(container) }))
			.toEqual({
				readout: null,
				live: ''
			});
	});

	it('keeps focus on the plot on Escape', async () => {
		const { container } = render(TooltipChart, {
			props: { series: [series('cell-01', [1, 2])], xFormat }
		});
		await tabIntoChart(container);

		await userEvent.keyboard('{Escape}');

		expect(document.activeElement).toBe(plotOf(container));
	});

	it('announces the value followed by the series unit', async () => {
		const { container } = render(TooltipChart, {
			props: { series: [{ ...series('cell-01', [12.3, 4]), unit: '°' }], xFormat }
		});

		await tabIntoChart(container);

		await expect.poll(() => liveText(container)).toBe('cell-01, 00:00:00, 12.3 °');
	});

	it('keeps the arrow keys from scrolling the page', async () => {
		const { container } = render(TooltipChart, {
			props: { series: [series('cell-01', [1, 2]), series('cell-02', [3, 4])], xFormat }
		});
		await tabIntoChart(container);
		const prevented: string[] = [];
		const record = (event: KeyboardEvent) => {
			if (event.defaultPrevented) prevented.push(event.key);
		};
		document.addEventListener('keydown', record);

		await userEvent.keyboard('{ArrowDown}{ArrowRight}{PageDown}{End}');

		document.removeEventListener('keydown', record);
		expect(prevented).toEqual(['ArrowDown', 'ArrowRight', 'PageDown', 'End']);
	});

	it('makes the focused plot an application named like the chart', async () => {
		const { container } = render(TooltipChart, {
			props: { series: [series('cell-01', [1, 2])], xFormat }
		});

		await tabIntoChart(container);

		const plot = plotOf(container);
		expect({
			focused: document.activeElement === plot,
			role: plot.getAttribute('role'),
			name: plot.getAttribute('aria-label')
		}).toEqual({ focused: true, role: 'application', name: 'Readings' });
	});

	it('describes the plot by its keyboard instructions', async () => {
		const { container } = render(TooltipChart, {
			props: { series: [series('cell-01', [1, 2])], xFormat }
		});

		await tabIntoChart(container);

		const describedBy = plotOf(container).getAttribute('aria-describedby') ?? '';
		expect(document.getElementById(describedBy)?.textContent?.replace(/\s+/g, ' ').trim()).toBe(
			'Left and right arrows move between points. Up and down arrows move between series. Home and End go to the leftmost and rightmost point. Page Up and Page Down move by a tenth of the series. Escape hides the tooltip.'
		);
	});

	it('follows DOM order with the legend before the plot, and the plot is one tab stop', async () => {
		const { container } = render(TooltipChart, {
			props: {
				series: [series('cell-01', [1, 2]), series('cell-02', [3, 4])],
				xFormat,
				hasLegend: true,
				isLegendFirst: true
			}
		});
		await expect.poll(() => container.querySelector('svg path, svg circle')).not.toBeNull();
		container.querySelector('button')!.focus();
		const expectedStops = ['cell-01', 'cell-02', 'plot', 'After'];
		const stops: string[] = [];
		for (let index = 0; index < expectedStops.length; index++) {
			await userEvent.tab();
			const active = document.activeElement as HTMLElement;
			stops.push(active === plotOf(container) ? 'plot' : (active.textContent?.trim() ?? ''));
		}

		expect(stops).toEqual(expectedStops);
	});

	it('leaves the plot out of the tab order without a tooltip', async () => {
		const { container } = render(TooltipChart, {
			props: { series: [series('cell-01', [1, 2])], hasTooltip: false, hasLegend: true }
		});

		await tabIntoChart(container);

		expect(document.activeElement?.textContent?.trim()).toBe('cell-01');
		expect(plotOf(container).hasAttribute('tabindex'), 'plot has no tabindex').toBe(false);
		expect(plotOf(container).hasAttribute('role'), 'plot has no role').toBe(false);
	});

	it('has no tab stop when every point sits outside the x window', async () => {
		const { container } = render(TooltipChart, {
			props: {
				series: [series('cell-01', [1, 2, 3])],
				xMin: new Date(START + 10 * MINUTE),
				xMax: new Date(START + 20 * MINUTE)
			}
		});
		await expect.poll(() => plotOf(container)).not.toBeNull();

		expect(plotOf(container).hasAttribute('tabindex'), 'plot has no tabindex').toBe(false);
		expect(container.querySelector('[role="application"]')).toBeNull();
	});

	it('keeps first focus, Home and End inside the x window', async () => {
		const { container } = render(TooltipChart, {
			props: {
				series: [series('cell-01', [1, 2, 3, 4, 5, 6])],
				xMin: new Date(START + 2 * MINUTE),
				xMax: new Date(START + 4 * MINUTE),
				xFormat
			}
		});
		await tabIntoChart(container);
		await expect.poll(() => liveText(container)).toBe('cell-01, 00:02:00, 3');

		const reads = await readAfter(container, ['{End}', '{Home}']);

		expect(reads).toEqual(['cell-01, 00:04:00, 5', 'cell-01, 00:02:00, 3']);
	});

	it('moves the arrow keys the way the points are drawn on a reversed x axis', async () => {
		const { container } = render(TooltipChart, {
			props: {
				series: [series('cell-01', [1, 2, 3])],
				xMin: new Date(START + 2 * MINUTE),
				xMax: new Date(START),
				xFormat
			}
		});
		await tabIntoChart(container);
		await expect.poll(() => liveText(container)).toBe('cell-01, 00:02:00, 3');

		const reads = await readAfter(container, ['{ArrowRight}', '{ArrowLeft}']);

		expect(reads).toEqual(['cell-01, 00:01:00, 2', 'cell-01, 00:02:00, 3']);
	});

	it('hides the readout and empties the live region when the window leaves every point', async () => {
		const points = series('cell-01', [1, 2, 3]);
		const { container, rerender } = render(TooltipChart, { props: { series: [points], xFormat } });
		await tabIntoChart(container);
		await expect.poll(() => liveText(container)).toBe('cell-01, 00:00:00, 1');

		await rerender({
			series: [points],
			xFormat,
			xMin: new Date(START + 10 * MINUTE),
			xMax: new Date(START + 20 * MINUTE)
		});

		await expect
			.poll(() => readoutOf(container), {
				message: 'readout hides when the window leaves the points'
			})
			.toBeNull();
		expect(liveText(container), 'live region empties when the window leaves the points').toBe('');

		await rerender({ series: [points], xFormat, xMin: undefined, xMax: undefined });

		expect(readoutOf(container), 'readout stays hidden once points return').toBeNull();
		expect(liveText(container), 'live region stays empty once points return').toBe('');
	});

	it('hides a hovered readout when the window leaves every point', async () => {
		const points = series('cell-01', [1, 2, 3]);
		const { container, rerender } = render(TooltipChart, { props: { series: [points], xFormat } });
		await expect.poll(() => container.querySelector('svg path, svg circle')).not.toBeNull();
		await userEvent.hover(plotOf(container));
		await expect.poll(() => readoutOf(container)).not.toBeNull();

		await rerender({
			series: [points],
			xFormat,
			xMin: new Date(START + 10 * MINUTE),
			xMax: new Date(START + 20 * MINUTE)
		});

		await expect
			.poll(() => readoutOf(container), {
				message: 'readout hides when the window leaves the points'
			})
			.toBeNull();
		await userEvent.hover(container.querySelector('button')!);

		await rerender({ series: [points], xFormat, xMin: undefined, xMax: undefined });

		await expect
			.poll(() => plotOf(container).getAttribute('tabindex'), {
				message: 'plot is a tab stop again once points return'
			})
			.toBe('0');
		expect(readoutOf(container), 'readout stays hidden once points return').toBeNull();
	});
});
