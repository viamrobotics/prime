import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { page, userEvent } from 'vitest/browser';

import '../../../../test/tailwind.css';
import BoundFolder from './BoundFolder.svelte';

const trigger = () => page.getByRole('button', { name: 'Lighting', exact: true });
const child = () => page.getByText('Intensity', { exact: true });

describe('Folder', () => {
	it('names the button from the title', async () => {
		render(BoundFolder);
		await expect.element(trigger()).toBeVisible();
	});

	it('is open by default and shows its children', async () => {
		render(BoundFolder);
		await expect.element(trigger()).toHaveAttribute('aria-expanded', 'true');
		await expect.element(child()).toBeVisible();
	});

	it('collapses on a pointer click and writes the binding', async () => {
		const { container } = render(BoundFolder);
		await trigger().click();
		await expect.element(trigger()).toHaveAttribute('aria-expanded', 'false');
		await expect.element(child()).not.toBeInTheDocument();
		expect(container.querySelector('[data-testid="open"]')!.textContent).toBe('false');
	});

	it.each(['{Enter}', ' '])('toggles from the keyboard with %j', async (key) => {
		render(BoundFolder);
		(trigger().element() as HTMLElement).focus();
		await userEvent.keyboard(key);
		await expect.element(trigger()).toHaveAttribute('aria-expanded', 'false');
		await userEvent.keyboard(key);
		await expect.element(trigger()).toHaveAttribute('aria-expanded', 'true');
	});

	it('follows open set by the parent', async () => {
		const screen = render(BoundFolder, { props: { open: false } });
		await expect.element(child()).not.toBeInTheDocument();
		await screen.rerender({ open: true });
		await expect.element(child()).toBeVisible();
	});

	it('does not toggle when disabled', async () => {
		render(BoundFolder, { props: { disabled: true } });
		await trigger().click({ force: true });
		await expect.element(trigger()).toHaveAttribute('aria-expanded', 'true');
		await expect.element(child()).toBeVisible();
	});
});
