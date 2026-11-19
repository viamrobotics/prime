import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';

import '../../../../test/tailwind.css';
import LineChart from './LineChart.svelte';

const WIDTH = 400;
const HEIGHT = 200;

const paths = (container: Element) => [...container.querySelectorAll('path')];

describe('Chart.Line', () => {
	it('draws one path across the measured width for a series', async () => {
		const { container } = render(LineChart, {
			props: {
				width: WIDTH,
				height: HEIGHT,
				points: [
					{ x: new Date('2026-01-01T00:00:00Z'), y: 2 },
					{ x: new Date('2026-01-01T00:01:00Z'), y: 8 },
					{ x: new Date('2026-01-01T00:02:00Z'), y: 5 }
				]
			}
		});

		await expect
			.poll(() => paths(container)[0]?.getAttribute('d'))
			.toMatch(new RegExp(`L${WIDTH},`));

		expect(container.querySelector('[role="figure"] svg')).not.toBeNull();

		const all = paths(container);
		expect(all).toHaveLength(1);
		const pathData = all[0].getAttribute('d') ?? '';
		expect(pathData).not.toBe('');
		expect(pathData).not.toContain('NaN');
		expect(pathData).toBe(`M0,${HEIGHT}L${WIDTH / 2},0L${WIDTH},${HEIGHT / 2}`);
	});

	it('draws no path for an empty series', async () => {
		const { container } = render(LineChart, {
			props: { points: [], width: WIDTH, height: HEIGHT }
		});

		await expect
			.poll(() => container.querySelector('svg')?.getAttribute('width'))
			.toBe(String(WIDTH));

		expect(paths(container)).toHaveLength(0);
	});
});
