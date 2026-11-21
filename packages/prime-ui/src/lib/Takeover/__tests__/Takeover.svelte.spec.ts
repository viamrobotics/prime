import { afterEach, describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { page, userEvent } from 'vitest/browser';

import { backgroundColor, colorOf, textColor } from '../../__tests__/computed-style.ts';
import BoundTakeover from './BoundTakeover.svelte';
import TextCloseTakeover from './TextCloseTakeover.svelte';
import UndefinedTakeover from './UndefinedTakeover.svelte';

const ICON_BUTTON_SQUARE_PX = 30;

const trigger = (container: Element) => container.querySelector('button')!;
const owner = (container: Element) => container.querySelector('[data-testid="owner"]')?.textContent;
const sheet = () => document.querySelector<HTMLElement>('[role="dialog"]');
const closeButton = () => sheet()!.querySelector<HTMLButtonElement>('button[aria-label="Close"]')!;

const open = async (container: Element) => {
	await userEvent.click(trigger(container));
	await vi.waitFor(() => expect(sheet(), 'sheet opened').toBeTruthy());
};

afterEach(async () => {
	if (sheet()) await userEvent.keyboard('{Escape}');
	await vi.waitFor(() => expect(sheet()).toBeNull());
});

describe('Takeover', () => {
	it('is closed by default', () => {
		render(BoundTakeover);

		expect(sheet()).toBeNull();
	});

	it('opens on trigger click as a modal dialog labeled by its title', async () => {
		const { container } = render(BoundTakeover);

		await open(container);

		expect(sheet()!.getAttribute('aria-modal')).toBe('true');
		const title = document.getElementById(sheet()!.getAttribute('aria-labelledby')!);
		expect(title?.tagName).toBe('H2');
		expect(title?.textContent).toBe('Settings');
	});

	it('fills the viewport', async () => {
		const { container } = render(BoundTakeover);

		await open(container);

		const rect = sheet()!.getBoundingClientRect();
		expect(rect.left).toBe(0);
		expect(rect.top).toBe(0);
		expect(rect.width).toBe(window.innerWidth);
		expect(rect.height).toBe(window.innerHeight);
	});

	it('sits on the dialog layer', async () => {
		const { container } = render(BoundTakeover);

		await open(container);

		expect(getComputedStyle(sheet()!).zIndex, 'the z-dialog layer').toBe('1100');
	});

	it('renders no overlay behind the sheet', async () => {
		const { container } = render(BoundTakeover);

		await open(container);

		expect(document.querySelector('[data-dialog-overlay]')).toBeNull();
	});

	it('moves focus into the sheet on open', async () => {
		const { container } = render(BoundTakeover);

		await open(container);

		await vi.waitFor(() => expect(document.activeElement).toBe(closeButton()));
	});

	it('closes on Escape', async () => {
		const { container } = render(BoundTakeover);
		await open(container);

		await userEvent.keyboard('{Escape}');

		await vi.waitFor(() => expect(sheet()).toBeNull());
	});

	it('returns focus to the trigger on close', async () => {
		const { container } = render(BoundTakeover);
		await open(container);

		await userEvent.click(closeButton());

		await vi.waitFor(() => expect(document.activeElement).toBe(trigger(container)));
	});

	it('closes from Takeover.Close', async () => {
		const { container } = render(BoundTakeover);
		await open(container);

		await userEvent.click(closeButton());

		await vi.waitFor(() => expect(sheet()).toBeNull());
	});

	it('renders Takeover.Close as an icon button named Close', async () => {
		const { container } = render(BoundTakeover);

		await open(container);

		await expect.element(page.getByRole('button', { name: 'Close', exact: true })).toBeVisible();
		expect(textColor(closeButton()), 'paints the icon-button text color').toBe(
			colorOf('icon-button', 'color')
		);
	});

	it('a close given children paints the consumer class instead of the icon button', async () => {
		const { container } = render(TextCloseTakeover);
		await open(container);
		const text = [...sheet()!.querySelectorAll('button')].find(
			(button) => button.textContent?.trim() === 'Cancel'
		)!;

		expect(backgroundColor(text), 'paints the consumer button fill').toBe(
			colorOf('button', 'backgroundColor')
		);
		expect(textColor(text), 'paints the consumer button text color').toBe(
			colorOf('button', 'color')
		);
		expect(
			text.offsetWidth,
			'sized by its text, wider than the icon button square'
		).toBeGreaterThan(ICON_BUTTON_SQUARE_PX);
	});

	it.each([
		{ label: undefined, name: 'Cancel' },
		{ label: 'Dismiss', name: 'Dismiss' }
	])('a close given children and aria-label $label is named $name', async ({ label, name }) => {
		const { container } = render(TextCloseTakeover, { props: { label } });

		await open(container);

		await expect.element(page.getByRole('button', { name, exact: true })).toBeVisible();
	});

	it('two-way: opening and closing are reflected in the owner', async () => {
		const { container } = render(BoundTakeover);
		expect(owner(container), 'starts closed').toBe('false');

		await open(container);
		await vi.waitFor(() => expect(owner(container), 'owner sees the open').toBe('true'));
		await userEvent.keyboard('{Escape}');

		await vi.waitFor(() => expect(owner(container), 'owner sees the close').toBe('false'));
	});

	it('two-way: renders from undefined state and writes the open state back', async () => {
		const { container } = render(UndefinedTakeover);
		expect(owner(container)).toBe('undefined');
		expect(sheet()).toBeNull();

		await open(container);

		await vi.waitFor(() => expect(owner(container)).toBe('true'));
	});
});
