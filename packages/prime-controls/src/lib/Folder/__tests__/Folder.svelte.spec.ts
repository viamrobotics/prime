import { describe, expect, it, onTestFinished, vi } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { page, userEvent } from 'vitest/browser';

import '../../../../test/tailwind.css';
import Folder from '../Folder.svelte';
import BoundFolder from './fixtures/BoundFolder.svelte';
import DefaultFolder from './fixtures/DefaultFolder.svelte';
import IndicatorFolder from './fixtures/IndicatorFolder.svelte';
import UnsetFolder from './fixtures/UnsetFolder.svelte';

const trigger = () => page.getByRole('button', { name: 'Lighting', exact: true });
const child = () => page.getByText('Intensity', { exact: true });
const owner = (container: Element) => container.querySelector('[data-testid="open"]')!.textContent;

describe('Folder', () => {
	it('names the button from the title', async () => {
		render(BoundFolder);

		await expect.element(trigger()).toBeVisible();
	});

	it('is open by default and shows its children', async () => {
		render(DefaultFolder);

		await expect.element(trigger()).toHaveAttribute('aria-expanded', 'true');
		await expect.element(child()).toBeVisible();
	});

	it('collapses on a pointer click and hides the children', async () => {
		render(BoundFolder);

		await trigger().click();

		await expect.element(trigger()).toHaveAttribute('aria-expanded', 'false');
		await expect.element(child()).not.toBeInTheDocument();
	});

	it('writes the binding when the pointer collapses it', async () => {
		const { container } = render(BoundFolder);

		await trigger().click();

		await vi.waitFor(() => expect(owner(container)).toBe('false'));
	});

	it.each(['{Enter}', ' '])('toggles from the keyboard with %j', async (key) => {
		render(BoundFolder);
		(trigger().element() as HTMLElement).focus();

		await userEvent.keyboard(key);
		await expect
			.element(trigger(), { message: 'closed after the first key' })
			.toHaveAttribute('aria-expanded', 'false');

		await userEvent.keyboard(key);
		await expect
			.element(trigger(), { message: 'open after the second key' })
			.toHaveAttribute('aria-expanded', 'true');
	});

	it('hides its children when the parent sets open to false', async () => {
		render(BoundFolder, { props: { open: false } });

		await expect.element(child()).not.toBeInTheDocument();
	});

	it('shows its children when the parent sets open to true', async () => {
		const screen = render(BoundFolder, { props: { open: false } });

		await screen.rerender({ open: true });

		await expect.element(child()).toBeVisible();
	});

	it('does not toggle when disabled', async () => {
		const { container } = render(BoundFolder, { props: { disabled: true } });

		await trigger().click({ force: true });

		await expect.element(trigger()).toHaveAttribute('aria-expanded', 'true');
		expect(owner(container)).toBe('true');
	});

	it('puts the class prop on the root', () => {
		const { container } = render(BoundFolder, { props: { class: 'extra' } });

		expect(container.querySelector('.extra'), 'an element carries the class').not.toBeNull();
		expect(
			container.querySelector('.extra')!.contains(trigger().element()),
			'the class element holds the trigger'
		).toBe(true);
	});
});

describe('Folder summary', () => {
	const summarized = () => page.getByRole('button', { name: /^Lighting\s*Set$/ });
	const chevron = () => summarized().element().querySelector('svg')!;

	it('draws no summary text without one', async () => {
		render(BoundFolder);

		await expect.element(trigger()).toBeVisible();

		expect(trigger().element().textContent?.trim()).toBe('Lighting');
	});

	it('keeps the chevron without a summary', async () => {
		render(BoundFolder);

		await expect.element(trigger()).toBeVisible();

		expect(trigger().element().querySelector('svg'), 'the trigger draws a chevron').not.toBeNull();
	});

	it('adds the summary to the button name', async () => {
		render(BoundFolder, { props: { summary: 'Set' } });

		await expect.element(summarized()).toBeVisible();
	});

	it('puts the summary between the title and the chevron', async () => {
		render(BoundFolder, { props: { summary: 'Set' } });
		await expect.element(summarized()).toBeVisible();

		const title = page.getByText('Lighting', { exact: true }).element().getBoundingClientRect();
		const summary = page.getByText('Set', { exact: true }).element().getBoundingClientRect();
		const icon = chevron().getBoundingClientRect();

		expect(summary.left, 'the summary starts after the title').toBeGreaterThan(title.right);
		expect(icon.left, 'the chevron starts after the summary').toBeGreaterThanOrEqual(summary.right);
	});

	it('rotates the chevron half a turn while the folder is open', async () => {
		render(BoundFolder, { props: { summary: 'Set' } });
		await expect.element(summarized()).toHaveAttribute('aria-expanded', 'true');

		expect(getComputedStyle(chevron()).rotate).toBe('180deg');
	});

	it('returns the chevron to rest when the folder closes', async () => {
		render(BoundFolder, { props: { summary: 'Set' } });

		await summarized().click();

		await expect.element(summarized()).toHaveAttribute('aria-expanded', 'false');
		await vi.waitFor(() => expect(getComputedStyle(chevron()).rotate).toBe('none'));
	});
});

describe('Folder root and indicator', () => {
	it('passes an id and a data attribute to the root', () => {
		const { container } = render(Folder, {
			props: { title: 'Lighting', id: 'lighting-root', 'data-extra': 'yes' }
		});

		const root = container.firstElementChild!;
		expect(root).toHaveAttribute('id', 'lighting-root');
		expect(root).toHaveAttribute('data-extra', 'yes');
	});

	it('mounts open with a binding that starts undefined and warns of nothing', async () => {
		const error = vi.spyOn(console, 'error');
		onTestFinished(() => error.mockRestore());

		render(UnsetFolder);

		await expect.element(trigger()).toHaveAttribute('aria-expanded', 'true');
		await expect.element(child()).toBeVisible();
		expect(error).not.toHaveBeenCalled();
	});

	it('draws the indicator in place of the chevron and flips it on toggle', async () => {
		render(IndicatorFolder);

		const indicator = page.getByTestId('indicator');
		await expect.element(indicator).toHaveTextContent('Hide');
		expect(trigger().element().querySelector('svg'), 'no default chevron').toBeNull();

		await trigger().click();

		await expect.element(indicator).toHaveTextContent('Show');
	});

	it('keeps the summary and draws the indicator after it in place of the chevron', async () => {
		render(IndicatorFolder, { props: { summary: 'Set' } });

		const indicator = page.getByTestId('indicator');
		await expect.element(indicator).toHaveTextContent('Hide');
		const summary = page.getByText('Set', { exact: true }).element().getBoundingClientRect();

		const button = page.getByRole('button', { name: /^Lighting\s*Set/ }).element();

		expect(button.querySelector('svg'), 'no default chevron').toBeNull();
		expect(indicator.element().getBoundingClientRect().left).toBeGreaterThanOrEqual(summary.right);
	});
});
