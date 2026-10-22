import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { page } from 'vitest/browser';

import EmptyingSplitView from './EmptyingSplitView.svelte';

describe('SplitView empty state', () => {
	it('renders the empty snippet and no pane when the owner clears the layout', async () => {
		const { container } = render(EmptyingSplitView);
		expect(container.querySelectorAll('[data-testid="pane"]').length).toBeGreaterThan(0);

		await page.getByRole('button', { name: 'Clear layout' }).click();

		await expect
			.poll(() => container.querySelector('[data-testid="empty"]')?.textContent)
			.toBe('No panes');
		expect(container.querySelectorAll('[data-testid="pane"]')).toHaveLength(0);
	});

	it('renders only the status region in the root when there is no empty snippet', async () => {
		const { container } = render(EmptyingSplitView, { props: { withEmpty: false } });

		await page.getByRole('button', { name: 'Clear layout' }).click();

		const root = container.querySelector('[data-testid="root"]');
		await expect.poll(() => container.querySelectorAll('[data-testid="pane"]').length).toBe(0);
		expect(root).not.toBeNull();
		expect([...root!.children].map((child) => child.getAttribute('role'))).toEqual(['status']);
	});
});
