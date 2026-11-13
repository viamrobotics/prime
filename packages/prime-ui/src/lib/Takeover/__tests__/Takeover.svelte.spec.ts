import { afterEach, describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { userEvent } from 'vitest/browser';

import '../../__tests__/tailwind.css';
import BoundTakeover from './BoundTakeover.svelte';
import TextCloseTakeover from './TextCloseTakeover.svelte';
import UndefinedTakeover from './UndefinedTakeover.svelte';

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

	it('sits on the dialog layer with no overlay behind it', async () => {
		const { container } = render(BoundTakeover);

		await open(container);

		expect(getComputedStyle(sheet()!).zIndex, 'the z-dialog layer').toBe('1100');
		expect(document.querySelector('[data-dialog-overlay]')).toBeNull();
	});

	it('closes on Escape and returns focus to the trigger', async () => {
		const { container } = render(BoundTakeover);
		await open(container);

		await userEvent.keyboard('{Escape}');

		await vi.waitFor(() => expect(sheet()).toBeNull());
		await vi.waitFor(() => expect(document.activeElement).toBe(trigger(container)));
	});

	it('closes from Takeover.Close and returns focus to the trigger', async () => {
		const { container } = render(BoundTakeover);
		await open(container);

		expect(closeButton().classList.contains('icon-button')).toBe(true);
		await userEvent.click(closeButton());

		await vi.waitFor(() => expect(sheet()).toBeNull());
		await vi.waitFor(() => expect(document.activeElement).toBe(trigger(container)));
	});

	it('a close given children wears only the consumer class', async () => {
		const { container } = render(TextCloseTakeover);
		await open(container);
		const text = [...sheet()!.querySelectorAll('button')].find(
			(button) => button.textContent?.trim() === 'Cancel'
		)!;

		expect(text.classList.contains('button')).toBe(true);
		expect(text.classList.contains('icon-button')).toBe(false);
	});

	it('two-way: opening and closing are reflected in the owner', async () => {
		const { container } = render(BoundTakeover);
		expect(owner(container)).toBe('false');

		await open(container);
		await vi.waitFor(() => expect(owner(container)).toBe('true'));
		await userEvent.keyboard('{Escape}');

		await vi.waitFor(() => expect(owner(container)).toBe('false'));
	});

	it('two-way: renders from undefined state and writes the open state back', async () => {
		const { container } = render(UndefinedTakeover);
		expect(owner(container)).toBe('undefined');
		expect(sheet()).toBeNull();

		await open(container);

		await vi.waitFor(() => expect(owner(container)).toBe('true'));
	});
});
