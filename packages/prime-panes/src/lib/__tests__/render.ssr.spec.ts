import { render } from 'svelte/server';
import { describe, expect, it } from 'vitest';

import SsrPanes from '../../../test/fixtures/SsrPanes.svelte';

describe('server rendering', () => {
	const { body } = render(SsrPanes);

	it('renders the pane of a split', () => {
		expect(body).toContain('Body of Solo pane');
	});

	it('renders the active pane of a stack', () => {
		expect(body).toContain('Body of Tab one');
	});

	it('renders the tab of every pane in a stack', () => {
		expect(body).toContain('Tab two');
	});

	it('renders the pane of a floating window', () => {
		expect(body).toContain('Body of Window pane');
	});

	it('renders a tablist for the stack', () => {
		expect(body).toContain('role="tablist"');
	});

	it('names the move trigger of each pane', () => {
		expect(body).toContain('aria-label="Move Solo pane"');
		expect(body).toContain('aria-label="Move Window pane"');
	});
});
