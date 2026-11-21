import { afterEach, describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { page, userEvent } from 'vitest/browser';

import {
	backgroundColor,
	boxShadow,
	colorOf,
	shapeOf,
	textColor
} from '../../__tests__/computed-style.ts';
import BoundPopover from './BoundPopover.svelte';
import ControlledPopover from './ControlledPopover.svelte';
import TextClosePopover from './TextClosePopover.svelte';
import UndefinedPopover from './UndefinedPopover.svelte';

const ICON_BUTTON_SQUARE_PX = 30;
const VETOED_OPEN_SETTLE_MS = 100;
const trigger = (container: Element) =>
	[...container.querySelectorAll('button')].find(
		(button) => button.textContent?.trim() === 'Open'
	)!;
const outside = (container: Element) =>
	[...container.querySelectorAll('button')].find(
		(button) => button.textContent?.trim() === 'Outside'
	)!;
const owner = (container: Element) => container.querySelector('[data-testid="owner"]')?.textContent;
const dialog = () => document.querySelector<HTMLElement>('[role="dialog"]');
const closeButton = () => dialog()!.querySelector<HTMLButtonElement>('button[aria-label="Close"]')!;
const nameField = () => dialog()!.querySelector<HTMLInputElement>('input[aria-label="Name"]')!;

const open = async (container: Element) => {
	await userEvent.click(trigger(container));
	await vi.waitFor(() => expect(dialog()).toBeTruthy());
};

afterEach(async () => {
	if (dialog()) await userEvent.keyboard('{Escape}');
});

describe('Popover', () => {
	it('is closed by default', () => {
		const { container } = render(BoundPopover);

		expect(dialog()).toBeNull();
		expect(owner(container)).toBe('false');
	});

	it('opens on trigger click with role dialog', async () => {
		const { container } = render(BoundPopover);

		await open(container);

		expect(dialog()?.textContent).toContain('Details');
		expect(dialog()?.getAttribute('aria-label')).toBe('Details');
		expect(trigger(container).dataset.state).toBe('open');
	});

	it('wears the popover shadow token', async () => {
		const { container } = render(BoundPopover);

		await open(container);

		const expected = shapeOf('shadow-popover', 'boxShadow');
		expect(expected, 'the theme defines a popover shadow').not.toBe('none');
		expect(boxShadow(dialog()!)).toBe(expected);
	});

	it('renders no forcemount attribute on any element while open', async () => {
		const { container } = render(BoundPopover);

		await open(container);

		expect(dialog()?.textContent).toContain('Details');
		expect(document.querySelector('[forcemount]')).toBeNull();
	});

	it('wears the shared focus ring on the trigger', () => {
		const { container } = render(BoundPopover);

		expect(trigger(container).classList.contains('focus-ring'), 'wears focus-ring').toBe(true);
	});

	it('moves focus to the first control in the panel on open', async () => {
		const { container } = render(BoundPopover);

		await open(container);

		await vi.waitFor(() => expect(document.activeElement).toBe(nameField()));
	});

	it.each([
		{ key: 'Tab', press: '{Tab}', from: closeButton, to: nameField },
		{ key: 'Shift+Tab', press: '{Shift>}{Tab}{/Shift}', from: nameField, to: closeButton }
	])('wraps $key from one end of the panel to the other', async ({ press, from, to }) => {
		const { container } = render(BoundPopover);
		await open(container);
		from().focus();

		await userEvent.keyboard(press);

		expect(document.activeElement).toBe(to());
	});

	it('closes on Escape and returns focus to the trigger', async () => {
		const { container } = render(BoundPopover);
		await open(container);

		await userEvent.keyboard('{Escape}');

		await vi.waitFor(() => expect(dialog()).toBeNull());
		expect(document.activeElement).toBe(trigger(container));
	});

	it('closes on an outside press and returns focus to the trigger', async () => {
		const { container } = render(BoundPopover);
		await open(container);

		await userEvent.click(outside(container));

		await vi.waitFor(() => expect(dialog()).toBeNull());
		await vi.waitFor(() => expect(document.activeElement).toBe(trigger(container)));
	});

	it('closes from Popover.Close', async () => {
		const { container } = render(BoundPopover);
		await open(container);

		await userEvent.click(closeButton());

		await vi.waitFor(() => expect(dialog()).toBeNull());
	});

	it('renders Popover.Close as an icon button named Close', async () => {
		const { container } = render(BoundPopover);

		await open(container);

		await expect.element(page.getByRole('button', { name: 'Close', exact: true })).toBeVisible();
		expect(textColor(closeButton()), 'paints the icon-button text color').toBe(
			colorOf('icon-button', 'color')
		);
	});

	it('a close given children paints the consumer class instead of the icon button', async () => {
		const { container } = render(TextClosePopover);
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
		const { container } = render(TextClosePopover, { props: { label } });

		await open(container);

		await expect.element(page.getByRole('button', { name, exact: true })).toBeVisible();
	});

	it('stacks the panel on the popover layer', async () => {
		const { container } = render(BoundPopover);
		await open(container);

		expect(getComputedStyle(dialog()!).zIndex).toBe('1200');
	});

	it.each([
		{ side: 'top', align: 'start' },
		{ side: 'right', align: 'end' },
		{ side: 'bottom', align: 'center' }
	] as const)('places the panel at side $side, align $align', async (placement) => {
		const { container } = render(BoundPopover, { props: { placement } });

		await open(container);

		await vi.waitFor(() => {
			const panel = dialog()!;
			expect(panel.dataset.side).toBe(placement.side);
			expect(panel.dataset.align).toBe(placement.align);
		});
	});

	it('keeps the page scrollable while open', async () => {
		const { container } = render(BoundPopover);

		await open(container);

		expect(getComputedStyle(document.body).overflow).toBe('visible');
		expect(getComputedStyle(document.documentElement).overflow).toBe('visible');
	});

	it('two-way: opening and closing write to the owner', async () => {
		const { container } = render(BoundPopover);

		await open(container);
		await vi.waitFor(() => expect(owner(container)).toBe('true'));

		await userEvent.keyboard('{Escape}');
		await vi.waitFor(() => expect(owner(container)).toBe('false'));
	});

	it('controlled: a setter that declines keeps it closed', async () => {
		const { container } = render(ControlledPopover, { props: { accept: false } });

		await userEvent.click(trigger(container));
		await new Promise((resolve) => setTimeout(resolve, VETOED_OPEN_SETTLE_MS));

		expect(owner(container)).toBe('false');
		expect(dialog()).toBeNull();
	});

	it('controlled: a setter that accepts opens it', async () => {
		const { container } = render(ControlledPopover, { props: { accept: true } });

		await open(container);

		await vi.waitFor(() => expect(owner(container)).toBe('true'));
	});

	it('renders and opens from undefined state', async () => {
		const { container } = render(UndefinedPopover);
		expect(owner(container)).toBe('undefined');

		await open(container);

		await vi.waitFor(() => expect(owner(container)).toBe('true'));
	});
});
