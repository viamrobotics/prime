import { describe, expect, it } from 'vitest';
import { render } from 'svelte/server';

import { Chart } from '../chart.ts';
import RootChart from './fixtures/RootChart.svelte';
import ServerChart from './fixtures/ServerChart.svelte';

const PLACED_PARTS = ['Grid', 'Legend', 'Line', 'Plot', 'Table', 'Tooltip', 'XAxis', 'YAxis'];

describe('Chart server rendering', () => {
	it('renders the loading overlay', () => {
		const { body } = render(RootChart, { props: { loading: true, hasAxes: true } });

		expect(body).toContain('data-part="loading"');
	});

	it('renders the empty overlay with its "No data" text', () => {
		const { body } = render(RootChart, { props: { hasAxes: true } });

		expect(body).toMatch(/data-part="empty"[^]*No data/);
	});

	it('renders every placed part without touching the browser', () => {
		const { body } = render(ServerChart);

		expect(body).toContain('<figure');
		expect(body).toContain('aria-label="Readings"');
		expect(body).toContain('data-part="legend"');
		expect(body).toContain('aria-label="Shown series"');
		expect(body).toContain('data-part="plot"');
		expect(body).toContain('data-part="table"');
		expect(body).toContain('>Time</th>');
	});

	it('places every part of Chart in the server fixture', () => {
		const parts = Object.keys(Chart).filter((key) => /^[A-Z]/.test(key));

		expect(parts.sort(), 'capitalized keys of Chart, the parts ServerChart must place').toEqual(
			PLACED_PARTS
		);
	});
});
