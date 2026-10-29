import { afterEach, describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { userEvent } from 'vitest/browser';

import '../../__tests__/tailwind.css';
import BoundDialog from './BoundDialog.svelte';
import ControlledDialog from './ControlledDialog.svelte';
import UndefinedDialog from './UndefinedDialog.svelte';

// Long enough for a vetoed open to have shown if it were going to.
const SETTLE_MS = 100;
const trigger = (container: Element) => container.querySelector('button')!;
const owner = (container: Element) => container.querySelector('[data-testid="owner"]')?.textContent;
const dialog = () => document.querySelector<HTMLElement>('[role="dialog"]');
const closeButton = () => dialog()!.querySelector<HTMLButtonElement>('button[aria-label="Close"]')!;

const open = async (container: Element) => {
	await userEvent.click(trigger(container));
	await vi.waitFor(() => expect(dialog(), 'dialog opened').toBeTruthy());
};

afterEach(async () => {
	if (dialog()) await userEvent.keyboard('{Escape}');
	await vi.waitFor(() => expect(dialog()).toBeNull());
});

describe('Dialog', () => {
	it('is closed by default', () => {
		render(BoundDialog);

		expect(dialog()).toBeNull();
	});

	it('opens on trigger click as a labelled, described modal dialog', async () => {
		const { container } = render(BoundDialog);

		await open(container);

		const dialogElement = dialog()!;
		expect(dialogElement.getAttribute('aria-modal')).toBe('true');
		const title = document.getElementById(dialogElement.getAttribute('aria-labelledby')!);
		expect(title?.tagName).toBe('H2');
		expect(title?.textContent).toBe('Rename');
		const description = document.getElementById(dialogElement.getAttribute('aria-describedby')!);
		expect(description?.tagName).toBe('P');
		expect(description?.textContent).toBe('Pick a new name.');
	});

	it('stacks the overlay and the panel on their named layers', async () => {
		const { container } = render(BoundDialog);

		await open(container);

		const overlay = document.querySelector('[data-dialog-overlay]')!;
		expect(getComputedStyle(overlay).zIndex).toBe('1000');
		expect(getComputedStyle(dialog()!).zIndex).toBe('1100');
	});

	it('moves focus into the dialog and traps Tab and Shift+Tab inside it', async () => {
		const { container } = render(BoundDialog);

		await open(container);

		await vi.waitFor(() => expect(dialog()!.contains(document.activeElement)).toBe(true));
		const focusables = [
			...dialog()!.querySelectorAll<HTMLElement>(
				'input, button, [href], [tabindex]:not([tabindex="-1"])'
			)
		];
		expect(focusables.length, 'two inputs and the close button').toBeGreaterThanOrEqual(3);
		const first = focusables[0]!;
		const last = focusables[focusables.length - 1]!;

		first.focus();
		for (let i = 0; i < focusables.length; i += 1) {
			await userEvent.keyboard('{Tab}');
			expect(dialog()!.contains(document.activeElement), 'focus stayed inside').toBe(true);
		}
		expect(document.activeElement, 'Tab wrapped to the first').toBe(first);

		await userEvent.keyboard('{Shift>}{Tab}{/Shift}');
		expect(document.activeElement, 'Shift+Tab wrapped to the last').toBe(last);
	});

	it('closes on Escape and returns focus to the trigger', async () => {
		const { container } = render(BoundDialog);
		await open(container);

		await userEvent.keyboard('{Escape}');

		await vi.waitFor(() => expect(dialog()).toBeNull());
		await vi.waitFor(() => expect(document.activeElement).toBe(trigger(container)));
	});

	it('closes from Dialog.Close, which wears icon-button and is labelled Close', async () => {
		const { container } = render(BoundDialog);
		await open(container);

		expect(closeButton().classList.contains('icon-button')).toBe(true);
		expect(closeButton().getAttribute('aria-label')).toBe('Close');
		await userEvent.click(closeButton());

		await vi.waitFor(() => expect(dialog()).toBeNull());
	});

	it('locks body scroll while open and restores it after close', async () => {
		const { container } = render(BoundDialog);
		const before = getComputedStyle(document.body).overflow;

		await open(container);
		await vi.waitFor(() => expect(getComputedStyle(document.body).overflow).toBe('hidden'));
		await userEvent.keyboard('{Escape}');

		await vi.waitFor(() => expect(getComputedStyle(document.body).overflow).toBe(before));
	});

	it('puts the consumer class on the content element and the focus ring on the trigger', async () => {
		const { container } = render(BoundDialog);
		await open(container);

		expect(dialog()!.classList.contains('max-w-md')).toBe(true);
		expect(trigger(container).classList.contains('focus-ring')).toBe(true);
	});

	it('two-way: opening and closing are reflected in the owner', async () => {
		const { container } = render(BoundDialog);
		expect(owner(container)).toBe('false');

		await open(container);
		await vi.waitFor(() => expect(owner(container)).toBe('true'));
		await userEvent.keyboard('{Escape}');

		await vi.waitFor(() => expect(owner(container)).toBe('false'));
	});

	it('two-way: renders from undefined state and writes the open state back', async () => {
		const { container } = render(UndefinedDialog);
		expect(owner(container)).toBe('undefined');
		expect(dialog()).toBeNull();

		await open(container);

		await vi.waitFor(() => expect(owner(container)).toBe('true'));
	});

	it('controlled: a function-binding setter can veto opening', async () => {
		const { container } = render(ControlledDialog, { props: { accept: false } });

		await userEvent.click(trigger(container));

		await new Promise((resolve) => setTimeout(resolve, SETTLE_MS));
		expect(dialog()).toBeNull();
		expect(owner(container)).toBe('false');
	});

	it('controlled: a setter that accepts lets it open', async () => {
		const { container } = render(ControlledDialog, { props: { accept: true } });

		await open(container);

		await vi.waitFor(() => expect(owner(container)).toBe('true'));
	});
});
