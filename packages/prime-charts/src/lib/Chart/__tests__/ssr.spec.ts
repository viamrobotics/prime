import { describe, expect, it } from 'vitest';
import { render } from 'svelte/server';

import RootChart from './fixtures/RootChart.svelte';

describe('Chart server rendering', () => {
	it('renders the loading overlay', () => {
		const { body } = render(RootChart, { props: { loading: true, hasAxes: true } });

		expect(body).toContain('data-part="loading"');
	});

	it('renders the empty overlay with its "No data" text', () => {
		const { body } = render(RootChart, { props: { hasAxes: true } });

		expect(body).toMatch(/data-part="empty"[^]*No data/);
	});
});
