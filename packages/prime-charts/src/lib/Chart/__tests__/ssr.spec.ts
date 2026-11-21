import { describe, expect, it } from 'vitest';
import { render } from 'svelte/server';

import SsrChart from './SsrChart.svelte';

describe('Chart server rendering', () => {
	it('renders the loading overlay', () => {
		const { body } = render(SsrChart, { props: { loading: true } });
		expect(body).toContain('data-part="loading"');
	});

	it('renders the empty overlay with its "No data" text', () => {
		const { body } = render(SsrChart, { props: {} });
		expect(body).toMatch(/data-part="empty"[^]*No data/);
	});
});
