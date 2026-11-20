import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { userEvent } from 'vitest/browser';

import '../../../../test/tailwind.css';
import TooltipChart from './TooltipChart.svelte';

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

const plotOf = (container: Element) =>
	container.querySelector('[role="figure"]')!.firstElementChild as HTMLElement;
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

	it('moves between series at the point nearest in time', async () => {
		const { container } = render(TooltipChart, {
			props: {
				series: [series('cell-01', [1, 2, 3, 4, 5]), series('cell-02', [10, 20, 30], [0, 2.9, 4])],
				xFormat
			}
		});
		await tabIntoChart(container);
		await readAfter(container, ['{ArrowRight}', '{ArrowRight}', '{ArrowRight}']);

		const reads = await readAfter(container, ['{ArrowDown}', '{ArrowDown}', '{ArrowUp}']);

		expect(reads).toEqual([
			'cell-02, 00:02:54, 20',
			'cell-02, 00:02:54, 20',
			'cell-01, 00:03:00, 4'
		]);
	});

	it('skips a gap', async () => {
		const { container } = render(TooltipChart, {
			props: { series: [series('cell-01', [1, null, 3])], xFormat }
		});
		await tabIntoChart(container);

		await userEvent.keyboard('{ArrowRight}');

		await expect.poll(() => liveText(container)).toBe('cell-01, 00:02:00, 3');
	});

	it('skips a hidden series', async () => {
		const { container } = render(TooltipChart, {
			props: {
				series: [
					series('cell-01', [1, 2]),
					{ ...series('cell-02', [3, 4]), hidden: true },
					series('cell-03', [5, 6])
				],
				xFormat
			}
		});
		await tabIntoChart(container);

		await userEvent.keyboard('{ArrowDown}');

		await expect.poll(() => liveText(container)).toBe('cell-03, 00:00:00, 5');
	});

	it('starts on the first visible series', async () => {
		const { container } = render(TooltipChart, {
			props: {
				series: [{ ...series('cell-01', [1, 2]), hidden: true }, series('cell-02', [null, 4])],
				xFormat
			}
		});

		await tabIntoChart(container);

		await expect.poll(() => liveText(container)).toBe('cell-02, 00:01:00, 4');
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

	it('hides the readout on Escape and keeps focus on the plot', async () => {
		const { container } = render(TooltipChart, {
			props: { series: [series('cell-01', [1, 2])], xFormat }
		});
		await tabIntoChart(container);
		await expect.poll(() => readoutOf(container)).not.toBeNull();

		await userEvent.keyboard('{Escape}');

		await expect.poll(() => readoutOf(container)).toBeNull();
		expect(liveText(container)).toBe('');
		expect(document.activeElement).toBe(plotOf(container));
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

	it('makes the plot an application described by its instructions', async () => {
		const { container } = render(TooltipChart, {
			props: { series: [series('cell-01', [1, 2])], xFormat }
		});

		await tabIntoChart(container);

		expect(document.activeElement).toBe(plotOf(container));
		expect(plotOf(container).getAttribute('role')).toBe('application');
		expect(plotOf(container).getAttribute('aria-label')).toBe('Readings');
		const describedBy = plotOf(container).getAttribute('aria-describedby') ?? '';
		expect(document.getElementById(describedBy)?.textContent).toContain('arrows move');
	});

	it('leaves the plot out of the tab order without a tooltip', async () => {
		const { container } = render(TooltipChart, {
			props: { series: [series('cell-01', [1, 2])], hasTooltip: false, hasLegend: true }
		});

		await tabIntoChart(container);

		expect(document.activeElement?.textContent?.trim()).toBe('cell-01');
		expect(plotOf(container).hasAttribute('tabindex')).toBe(false);
		expect(plotOf(container).hasAttribute('role')).toBe(false);
	});
});
