import { afterEach, describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { userEvent } from 'vitest/browser';

import { backgroundColor, colorOf, textColor } from '../../../../test/computed-style.ts';
import BasicMenu from './fixtures/BasicMenu.svelte';
import ControlledMenu from './fixtures/ControlledMenu.svelte';

const buttonLabeled = (container: Element, label: string) =>
	[...container.querySelectorAll('button')].find((button) => button.textContent?.trim() === label)!;
const trigger = (container: Element) => buttonLabeled(container, 'Open');
const readout = (container: Element, id: string) =>
	container.querySelector(`[data-testid="${id}"]`)?.textContent;
const owner = (container: Element) => readout(container, 'owner');
const log = (container: Element) => readout(container, 'log');
const menu = () => document.querySelector<HTMLElement>('[role="menu"]');
const item = (name: string) =>
	[...document.querySelectorAll<HTMLElement>('[role="menuitem"]')].find(
		(candidate) => candidate.textContent?.trim() === name
	)!;

const focused = (name: string) => vi.waitFor(() => expect(document.activeElement).toBe(item(name)));

const nextFrame = () => new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));

const open = async (container: Element) => {
	await userEvent.click(trigger(container));
	await vi.waitFor(() =>
		expect(menu()?.contains(document.activeElement), 'focus moved into the open menu').toBe(true)
	);
	await nextFrame();
	await nextFrame();
};

const openOnFirstItem = async (container: Element) => {
	await open(container);
	await userEvent.keyboard('{ArrowDown}');
	await focused('New');
};

afterEach(async () => {
	const lock = document.querySelector<HTMLInputElement>('input[type="checkbox"]');
	if (lock?.checked) lock.click();
	if (menu()) await userEvent.keyboard('{Escape}');
});

const CLOSE_SETTLE_MS = 400;

const addOutsideInput = () => {
	const input = document.createElement('input');
	input.setAttribute('aria-label', 'Outside');
	input.style.cssText = 'position: fixed; right: 0; bottom: 0';
	document.body.append(input);
	return input;
};

afterEach(() => {
	document.querySelectorAll('input[aria-label="Outside"]').forEach((input) => input.remove());
	document.body.style.paddingTop = '';
});

const ROOM_ABOVE_TRIGGER_PX = 400;

const makeRoomAboveTheTrigger = () => {
	document.body.style.paddingTop = `${ROOM_ABOVE_TRIGGER_PX}px`;
};

describe('Menu', () => {
	it('closes on a press outside that does not reach the input, returning focus to the trigger', async () => {
		const { container } = render(BasicMenu);
		await open(container);
		const input = addOutsideInput();

		await userEvent.click(input, { force: true });

		await vi.waitFor(() => expect(menu()).toBeNull());
		await new Promise((resolve) => setTimeout(resolve, CLOSE_SETTLE_MS));
		expect(document.activeElement).toBe(trigger(container));
	});

	it('is closed by default', () => {
		const { container } = render(BasicMenu);

		expect(menu()).toBeNull();
		expect(owner(container)).toBe('false');
	});

	it('opens on trigger click with role menu', async () => {
		const { container } = render(BasicMenu);

		await open(container);

		expect(menu()?.textContent).toContain('Rename');
		expect(trigger(container).dataset.state).toBe('open');
	});

	it('puts one id on the panel and points the trigger at it', async () => {
		const { container } = render(BasicMenu);

		await open(container);

		const panel = menu()!;
		expect(panel.id).not.toBe('');
		expect(document.querySelectorAll(`[id="${panel.id}"]`)).toHaveLength(1);
		expect(trigger(container).getAttribute('aria-controls')).toBe(panel.id);
	});

	it('opens below the trigger, aligned to its start, by default', async () => {
		makeRoomAboveTheTrigger();
		const { container } = render(BasicMenu);

		await open(container);

		expect([menu()?.dataset.side, menu()?.dataset.align]).toStrictEqual(['bottom', 'start']);
	});

	it('wears the shared focus ring on the trigger', async () => {
		const { container } = render(BasicMenu);
		// The `button` class applies focus-ring too, so drop it to measure the trigger's own ring.
		trigger(container).classList.remove('button');
		buttonLabeled(container, 'Outside').focus();

		await userEvent.keyboard('{Shift>}{Tab}{/Shift}');

		await vi.waitFor(() => expect(document.activeElement).toBe(trigger(container)));
		const style = getComputedStyle(trigger(container));
		expect(style.outlineStyle, 'the keyboard-focused trigger draws an outline').toBe('solid');
		expect(style.outlineWidth).toBe('2px');
	});

	it('opens on ArrowDown from the focused trigger and focuses the first item', async () => {
		const { container } = render(BasicMenu);
		trigger(container).focus();

		await userEvent.keyboard('{ArrowDown}');

		await vi.waitFor(() => expect(menu()).toBeTruthy());
		await focused('New');
	});

	it('moves between items with ArrowDown and ArrowUp', async () => {
		const { container } = render(BasicMenu);
		await openOnFirstItem(container);

		await userEvent.keyboard('{ArrowDown}');
		await focused('Open');

		await userEvent.keyboard('{ArrowUp}');
		await focused('New');
	});

	it('wraps from the last item to the first, the bits-ui `loop` default', async () => {
		const { container } = render(BasicMenu);
		await openOnFirstItem(container);
		await userEvent.keyboard('{End}');
		await focused('Delete');

		await userEvent.keyboard('{ArrowDown}');

		await focused('New');
	});

	it('moves to the last enabled item on End and the first on Home', async () => {
		const { container } = render(BasicMenu);
		await openOnFirstItem(container);

		await userEvent.keyboard('{End}');
		await focused('Delete');

		await userEvent.keyboard('{Home}');
		await focused('New');
	});

	it('closes on Escape and returns focus to the trigger', async () => {
		const { container } = render(BasicMenu);
		await open(container);

		await userEvent.keyboard('{Escape}');

		await vi.waitFor(() => expect(menu()).toBeNull());
		expect(document.activeElement).toBe(trigger(container));
	});

	it('focuses the matching item when typing its first letter', async () => {
		const { container } = render(BasicMenu);
		await open(container);

		await userEvent.keyboard('r');

		await focused('Rename');
	});

	it('skips the disabled item when navigating by arrow', async () => {
		const { container } = render(BasicMenu);
		await openOnFirstItem(container);
		await userEvent.keyboard('{ArrowDown}{ArrowDown}');
		await focused('Rename');

		await userEvent.keyboard('{ArrowDown}');

		await focused('Delete');
	});

	it('does not activate the disabled item on Enter after hovering it', async () => {
		const { container } = render(BasicMenu);
		await open(container);

		await userEvent.hover(item('Share'));
		await userEvent.keyboard('{Enter}');

		expect(log(container)).toBe('');
		expect(menu()).toBeTruthy();
	});

	it('activates the focused item on Enter and closes', async () => {
		const { container } = render(BasicMenu);
		await openOnFirstItem(container);
		await userEvent.keyboard('{ArrowDown}{ArrowDown}');
		await focused('Rename');

		await userEvent.keyboard('{Enter}');

		await vi.waitFor(() => expect(menu()).toBeNull());
		expect(log(container)).toBe('Rename');
	});

	it('activates an item on click and closes', async () => {
		const { container } = render(BasicMenu);
		await open(container);

		await userEvent.click(item('New'));

		await vi.waitFor(() => expect(menu()).toBeNull());
		expect(log(container)).toBe('New');
	});

	it.each([
		{ variant: 'default', name: 'New' },
		{ variant: 'danger', name: 'Delete' }
	])('marks a $variant item with data-variant', async ({ variant, name }) => {
		const { container } = render(BasicMenu);

		await open(container);

		expect(item(name).dataset.variant).toBe(variant);
	});

	it.each([
		{ variant: 'default', name: 'New', utility: 'text-default' },
		{ variant: 'danger', name: 'Delete', utility: 'text-danger-dark' }
	])('paints a $variant item with $utility', async ({ name, utility }) => {
		const { container } = render(BasicMenu);

		await open(container);

		expect(textColor(item(name))).toBe(colorOf(utility, 'color'));
	});

	it.each([
		{ variant: 'default', name: 'New', utility: 'bg-light' },
		{ variant: 'danger', name: 'Delete', utility: 'bg-danger-light' }
	])('fills a highlighted $variant item with $utility', async ({ name, utility }) => {
		const { container } = render(BasicMenu);
		await open(container);

		item(name).focus();

		await vi.waitFor(() =>
			expect(item(name).hasAttribute('data-highlighted'), 'item highlighted').toBe(true)
		);
		expect(backgroundColor(item(name))).toBe(colorOf(utility, 'backgroundColor'));
	});

	it('closes on a press outside the menu', async () => {
		const { container } = render(BasicMenu);
		await open(container);

		await userEvent.click(document.documentElement);

		await vi.waitFor(() => expect(menu()).toBeNull());
	});

	it('two-way: opening and closing write to the owner', async () => {
		const { container } = render(BasicMenu);

		await open(container);
		await vi.waitFor(() => expect(owner(container), 'owner after opening').toBe('true'));

		await userEvent.keyboard('{Escape}');
		await vi.waitFor(() => expect(owner(container), 'owner after closing').toBe('false'));
	});

	it('controlled: a setter that vetoes closing keeps the menu open', async () => {
		const { container } = render(ControlledMenu);
		await userEvent.click(container.querySelector('input[type="checkbox"]')!);
		await open(container);

		await userEvent.keyboard('{Escape}');

		expect(owner(container)).toBe('true');
		expect(menu()).toBeTruthy();
	});

	it('controlled: a setter that accepts closing closes the menu', async () => {
		const { container } = render(ControlledMenu);
		await open(container);
		await vi.waitFor(() => expect(owner(container)).toBe('true'));

		await userEvent.keyboard('{Escape}');

		await vi.waitFor(() => expect(menu()).toBeNull());
		expect(owner(container)).toBe('false');
	});
});
