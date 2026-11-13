import type { ComponentProps } from 'svelte';

import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { page } from 'vitest/browser';

import '../../../../test/tailwind.css';
import Panel from '../Panel.svelte';
import PanelWithChild from './PanelWithChild.svelte';

describe('Panel', () => {
	it('names the group from the title', async () => {
		render(PanelWithChild, { props: { title: 'Camera' } });
		await expect.element(page.getByRole('group', { name: 'Camera', exact: true })).toBeVisible();
	});

	it('points aria-labelledby at the visible title', async () => {
		const { container } = render(PanelWithChild, { props: { title: 'Camera' } });
		const group = container.querySelector('[role="group"]')!;
		const titleElement = document.getElementById(group.getAttribute('aria-labelledby')!);
		expect(titleElement?.textContent).toBe('Camera');
		expect(group.hasAttribute('aria-label')).toBe(false);
	});

	it('is named by aria-label without a title and renders no title element', async () => {
		const { container } = render(PanelWithChild, { props: { ariaLabel: 'Camera settings' } });
		await expect
			.element(page.getByRole('group', { name: 'Camera settings', exact: true }))
			.toBeVisible();
		const group = container.querySelector('[role="group"]')!;
		expect(group.hasAttribute('aria-labelledby')).toBe(false);
		expect(group.querySelector('span:not([data-testid="child"])')).toBeNull();
	});

	it('renders its children', async () => {
		render(PanelWithChild, { props: { title: 'Camera' } });
		await expect.element(page.getByTestId('child')).toBeVisible();
	});

	it('requires an accessible name', () => {
		// @ts-expect-error no label, aria-label, or aria-labelledby
		const props: ComponentProps<typeof Panel> = {};
		expect(props).toBeDefined();
	});
});
