import { type ComponentProps, createRawSnippet } from 'svelte';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { page, userEvent } from 'vitest/browser';

import {
	backgroundColor,
	boxShadow,
	colorOf,
	shapeOf,
	textColor
} from '../../../../test/computed-style.ts';
import { Dialog } from '../dialog.ts';
import BoundDialog from './fixtures/BoundDialog.svelte';
import ControlledDialog from './fixtures/ControlledDialog.svelte';
import TextCloseDialog from './fixtures/TextCloseDialog.svelte';
import UndefinedDialog from './fixtures/UndefinedDialog.svelte';

const ICON_BUTTON_SQUARE_PX = 30;
const VETOED_OPEN_SETTLE_MS = 100;
const trigger = (container: Element) => container.querySelector('button')!;
const owner = (container: Element) => container.querySelector('[data-testid="owner"]')?.textContent;
const dialog = () => document.querySelector<HTMLElement>('[role="dialog"]');
const closeButton = () => dialog()!.querySelector<HTMLButtonElement>('button[aria-label="Close"]')!;
const firstField = () => dialog()!.querySelector<HTMLInputElement>('input[name="first"]')!;

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

	it('opens on trigger click as a labeled, described modal dialog', async () => {
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
		expect(getComputedStyle(overlay).zIndex, 'the z-overlay layer').toBe('1000');
		expect(getComputedStyle(dialog()!).zIndex, 'the z-dialog layer').toBe('1100');
	});

	it('dims the page with the scrim token in the light theme', async () => {
		const { container } = render(BoundDialog);

		await open(container);

		const overlay = document.querySelector<HTMLElement>('[data-dialog-overlay]')!;
		expect(backgroundColor(overlay)).toBe(colorOf('bg-scrim', 'backgroundColor'));
	});

	it('dims the page with the dark scrim value under .dark', async () => {
		document.documentElement.classList.add('dark');
		try {
			const { container } = render(BoundDialog);

			await open(container);

			const overlay = document.querySelector<HTMLElement>('[data-dialog-overlay]')!;
			const expected = colorOf('bg-scrim', 'backgroundColor');
			expect(backgroundColor(overlay)).toBe(expected);
			expect(expected).toBe('rgba(0, 0, 0, 0.6)');
		} finally {
			document.documentElement.classList.remove('dark');
		}
	});

	it('caps its height at the dynamic viewport minus the spacing scale', async () => {
		const { container } = render(BoundDialog);

		await open(container);

		const probe = document.createElement('div');
		probe.style.height = 'calc(100dvh - var(--spacing) * 8)';
		document.body.append(probe);
		const expected = parseFloat(getComputedStyle(probe).height);
		probe.remove();
		expect(parseFloat(getComputedStyle(dialog()!).maxHeight)).toBeCloseTo(expected, 1);
	});

	it('wears the dialog shadow token', async () => {
		const { container } = render(BoundDialog);

		await open(container);

		const expectedShadow = shapeOf('shadow-dialog', 'boxShadow');
		expect(expectedShadow).not.toBe('none');
		expect(boxShadow(dialog()!)).toBe(expectedShadow);
	});

	it('rounds its corners with the shared radius', async () => {
		const { container } = render(BoundDialog);

		await open(container);

		const expectedRadius = shapeOf('rounded-sm', 'borderTopLeftRadius');
		expect(expectedRadius).not.toBe('0px');
		expect(getComputedStyle(dialog()!).borderTopLeftRadius).toBe(expectedRadius);
	});

	it('moves focus to the first field on open', async () => {
		const { container } = render(BoundDialog);

		await open(container);

		await vi.waitFor(() => expect(document.activeElement).toBe(firstField()));
	});

	it.each([
		{ key: 'Tab', press: '{Tab}', from: closeButton, to: firstField },
		{ key: 'Shift+Tab', press: '{Shift>}{Tab}{/Shift}', from: firstField, to: closeButton }
	])('wraps $key from one end of the dialog to the other', async ({ press, from, to }) => {
		const { container } = render(BoundDialog);
		await open(container);
		from().focus();

		await userEvent.keyboard(press);

		expect(document.activeElement).toBe(to());
	});

	it('closes on Escape', async () => {
		const { container } = render(BoundDialog);
		await open(container);

		await userEvent.keyboard('{Escape}');

		await vi.waitFor(() => expect(dialog()).toBeNull());
	});

	it('returns focus to the trigger on close', async () => {
		const { container } = render(BoundDialog);
		await open(container);

		await userEvent.keyboard('{Escape}');

		await vi.waitFor(() => expect(document.activeElement).toBe(trigger(container)));
	});

	it('closes from Dialog.Close', async () => {
		const { container } = render(BoundDialog);
		await open(container);

		await userEvent.click(closeButton());

		await vi.waitFor(() => expect(dialog()).toBeNull());
	});

	it('renders Dialog.Close as an icon button named Close', async () => {
		const { container } = render(BoundDialog);

		await open(container);

		await expect.element(page.getByRole('button', { name: 'Close', exact: true })).toBeVisible();
		expect(textColor(closeButton()), 'paints the icon-button text color').toBe(
			colorOf('icon-button', 'color')
		);
	});

	it('a close given children paints the consumer class instead of the icon button', async () => {
		const { container } = render(TextCloseDialog);
		await open(container);
		const text = [...dialog()!.querySelectorAll('button')].find(
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
		const { container } = render(TextCloseDialog, { props: { label } });

		await open(container);

		await expect.element(page.getByRole('button', { name, exact: true })).toBeVisible();
	});

	it('locks body scroll while open and restores it after close', async () => {
		const { container } = render(BoundDialog);
		const before = getComputedStyle(document.body).overflow;

		await open(container);
		await vi.waitFor(() =>
			expect(getComputedStyle(document.body).overflow, 'locked while open').toBe('hidden')
		);
		await userEvent.keyboard('{Escape}');

		await vi.waitFor(() =>
			expect(getComputedStyle(document.body).overflow, 'restored after close').toBe(before)
		);
	});

	it('puts the consumer class on the content element', async () => {
		const { container } = render(BoundDialog);

		await open(container);

		expect(dialog()!.classList.contains('max-w-md'), 'wears the consumer class').toBe(true);
	});

	it('gives the trigger the shared focus ring', () => {
		const { container } = render(BoundDialog);

		expect(trigger(container).classList.contains('focus-ring'), 'wears focus-ring').toBe(true);
	});

	it('two-way: opening and closing are reflected in the owner', async () => {
		const { container } = render(BoundDialog);
		expect(owner(container), 'starts closed').toBe('false');

		await open(container);
		await vi.waitFor(() => expect(owner(container), 'owner sees the open').toBe('true'));
		await userEvent.keyboard('{Escape}');

		await vi.waitFor(() => expect(owner(container), 'owner sees the close').toBe('false'));
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

		await new Promise((resolve) => setTimeout(resolve, VETOED_OPEN_SETTLE_MS));
		expect(dialog(), 'a vetoed open shows no dialog after the settle wait').toBeNull();
		expect(owner(container)).toBe('false');
	});

	it('controlled: a setter that accepts lets it open', async () => {
		const { container } = render(ControlledDialog, { props: { accept: true } });

		await open(container);

		await vi.waitFor(() => expect(owner(container)).toBe('true'));
	});

	it('requires a name on an icon-only Dialog.Close by type', () => {
		const children = createRawSnippet(() => ({ render: () => '<span>Cancel</span>' }));
		// @ts-expect-error an icon-only close requires a name
		const unnamed: ComponentProps<typeof Dialog.Close> = {};
		// @ts-expect-error a close takes one name, not two
		const twice: ComponentProps<typeof Dialog.Close> = { label: 'Close', 'aria-label': 'Close' };
		const named: ComponentProps<typeof Dialog.Close> = { label: 'Close' };
		const withChildren: ComponentProps<typeof Dialog.Close> = { children };

		expect([unnamed, twice, named, withChildren]).toHaveLength(4);
	});
});
