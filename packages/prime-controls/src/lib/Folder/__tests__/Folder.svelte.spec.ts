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

describe('Folder summary', () => {
	const summarized = () => page.getByRole('button', { name: /^Lighting\s*Set$/ });
	const chevron = () => summarized().element().querySelector('svg')!;

	it('draws no summary without one and keeps the chevron', async () => {
		render(BoundFolder);
		await expect.element(trigger()).toBeVisible();
		expect(trigger().element().textContent?.trim()).toBe('Lighting');
		expect(trigger().element().querySelector('svg')).not.toBeNull();
	});

	it('adds the summary to the title row and to the button name', async () => {
		render(BoundFolder, { props: { summary: 'Set' } });
		await expect.element(summarized()).toBeVisible();
		await expect.element(page.getByText('Set', { exact: true })).toBeVisible();
	});

	it('puts the summary between the title and the chevron', async () => {
		render(BoundFolder, { props: { summary: 'Set' } });
		await expect.element(summarized()).toBeVisible();
		const title = page.getByText('Lighting', { exact: true }).element().getBoundingClientRect();
		const summary = page.getByText('Set', { exact: true }).element().getBoundingClientRect();
		const icon = chevron().getBoundingClientRect();
		expect(summary.left).toBeGreaterThan(title.right);
		expect(icon.left).toBeGreaterThanOrEqual(summary.right);
	});

	it('turns the chevron with the folder when it has a summary', async () => {
		render(BoundFolder, { props: { summary: 'Set' } });
		await expect.element(summarized()).toHaveAttribute('aria-expanded', 'true');
		expect(chevron().classList.contains('rotate-180')).toBe(true);
		await summarized().click();
		await expect.element(summarized()).toHaveAttribute('aria-expanded', 'false');
		expect(chevron().classList.contains('rotate-180')).toBe(false);
	});
});
