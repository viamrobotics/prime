import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';

import '../../../../test/tailwind.css';
import AxesChart from './AxesChart.svelte';

const points = [
	{ x: new Date('2026-01-01T00:00:00Z'), y: 2 },
	{ x: new Date('2026-01-01T00:01:00Z'), y: 8 }
];
const series = [{ name: 'Reading', points }];
const MIN_Y_AXIS_OFFSET_PX = 20;

const labels = (container: Element, part: string) =>
	[...container.querySelectorAll(`.${part} text`)].map((node) => node.textContent?.trim());

const offsetOf = (container: Element) =>
	container.querySelector('path')!.getBoundingClientRect().left -
	container.querySelector('[data-testid="frame"]')!.getBoundingClientRect().left;

describe('Chart axes', () => {
	it('labels the x ticks with the given format', async () => {
		const { container } = render(AxesChart, { props: { series, xFormat: () => 'tick-x' } });
		await expect.poll(() => labels(container, 'x-part').length).toBeGreaterThan(1);
		expect(labels(container, 'x-part').every((text) => text === 'tick-x')).toBe(true);
	});

	it('labels the y ticks with the given format', async () => {
		const { container } = render(AxesChart, {
			props: { series, yFormat: (value: number) => `${value} units` }
		});
		await expect.poll(() => labels(container, 'y-part').length).toBeGreaterThan(1);
		expect(labels(container, 'y-part').every((text) => text?.endsWith(' units'))).toBe(true);
	});

	it('labels the x ticks from the time scale by default', async () => {
		const { container } = render(AxesChart, { props: { series } });
		await expect.poll(() => labels(container, 'x-part').length).toBeGreaterThan(1);
		expect(labels(container, 'x-part').every((text) => /^[\d:.A-Za-z ]+$/.test(text ?? ''))).toBe(
			true
		);
		expect(labels(container, 'x-part').some((text) => text?.startsWith(':'))).toBe(true);
	});

	it('shows both y bounds when given', async () => {
		const { container } = render(AxesChart, { props: { series, yMin: 0, yMax: 10 } });
		await expect.poll(() => labels(container, 'y-part')).toContain('0');
		expect(labels(container, 'y-part')).toContain('10');
	});

	it('shows the given y bound and takes the other from the data', async () => {
		const { container } = render(AxesChart, { props: { series, yMin: 0 } });
		await expect.poll(() => labels(container, 'y-part')).toContain('0');
		const values = labels(container, 'y-part').map(Number);
		expect(Math.min(...values)).toBe(0);
		expect(Math.max(...values)).toBeGreaterThanOrEqual(8);
		expect(Math.max(...values)).toBeLessThan(10);
	});

	it('rounds a y end from the data out to a drawn tick', async () => {
		const unaligned = [
			{ x: new Date('2026-01-01T00:00:00Z'), y: 2.3 },
			{ x: new Date('2026-01-01T00:01:00Z'), y: 7.1 }
		];
		const { container } = render(AxesChart, {
			props: { series: [{ name: 'Reading', points: unaligned }] }
		});
		await expect.poll(() => labels(container, 'y-part').length).toBeGreaterThan(1);
		const values = labels(container, 'y-part').map(Number);
		expect(Math.min(...values)).toBeLessThanOrEqual(2.3);
		expect(Math.max(...values)).toBeGreaterThanOrEqual(7.1);
	});

	it('starts the line right of the y axis padding', async () => {
		const bare = render(AxesChart, { props: { series, hasAxes: false } });
		await expect.poll(() => bare.container.querySelector('path')).not.toBeNull();
		expect(offsetOf(bare.container)).toBe(0);
		bare.unmount();

		const { container } = render(AxesChart, { props: { series } });
		await expect.poll(() => container.querySelector('path')).not.toBeNull();
		expect(offsetOf(container)).toBeGreaterThan(MIN_Y_AXIS_OFFSET_PX);
	});

	it('draws one grid line per y tick', async () => {
		const { container } = render(AxesChart, { props: { series, yMin: 0, yMax: 10 } });
		await expect.poll(() => labels(container, 'y-part').length).toBeGreaterThan(1);
		const ticks = labels(container, 'y-part').length;
		expect(container.querySelectorAll('.grid-part line')).toHaveLength(ticks);
	});

	it('keeps drawing the axes with every series hidden', async () => {
		const { container } = render(AxesChart, {
			props: { series: [{ name: 'Reading', points, hidden: true }] }
		});
		await expect.poll(() => labels(container, 'x-part').length).toBeGreaterThan(1);
		expect(labels(container, 'y-part').length).toBeGreaterThan(1);
		expect(container.querySelector('path')).toBeNull();
	});
});
