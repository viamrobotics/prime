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

describe('Chart states', () => {
	it('shows "No data" with no series', async () => {
		const { container } = render(RootChart, { props: {} });
		await expect.poll(() => container.textContent).toContain('No data');
	});

	it('shows "No data" when every point is null', async () => {
		const { container } = render(RootChart, {
			props: { series: [{ name: 'Reading', points: [{ x: new Date(0), y: null }] }] }
		});
		await expect.poll(() => container.textContent).toContain('No data');
	});

	it('renders a custom empty snippet', async () => {
		const { container } = render(RootEmptyText);
		await expect.poll(() => container.textContent).toContain('Nothing recorded');
		expect(container.textContent).not.toContain('No data');
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

	it('shows no overlay and is not busy when not loading', async () => {
		const { container } = render(RootChart, { props: { series } });
		await expect.poll(() => container.querySelector('path')).not.toBeNull();
		expect(container.querySelector('[data-part="loading"]')).toBeNull();
		expect(container.querySelector('[role="figure"]')?.hasAttribute('aria-busy')).toBe(false);
	});

	it('lets loading win over the empty state', async () => {
		const { container } = render(RootChart, { props: { loading: true } });
		await expect.poll(() => container.querySelector('[data-part="loading"]')).not.toBeNull();
		expect(container.textContent).not.toContain('No data');
	});
});
