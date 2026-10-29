import { afterEach, describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { userEvent } from 'vitest/browser';

import { colorOf, textColor } from '../../__tests__/computed-style.ts';
import BasicMenu from './BasicMenu.svelte';
import ControlledMenu from './ControlledMenu.svelte';

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
	await vi.waitFor(() => expect(menu()?.contains(document.activeElement)).toBe(true));
	await nextFrame();
	await nextFrame();
};

const openOnFirstItem = async (container: Element) => {
	await open(container);
	await userEvent.keyboard('{ArrowDown}');
	await focused('New');
};

const resolvedColor = (color: string) => {
	const probe = document.createElement('div');
	probe.style.color = color;
	document.body.append(probe);
	const resolved = getComputedStyle(probe).color;
	probe.remove();
	return resolved;
};

afterEach(async () => {
	const lock = document.querySelector<HTMLInputElement>('input[type="checkbox"]');
	if (lock?.checked) lock.click();
	if (menu()) await userEvent.keyboard('{Escape}');
});

describe('Menu', () => {
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

	it('wears the shared focus ring on the trigger', () => {
		const { container } = render(BasicMenu);

		expect(trigger(container).classList.contains('focus-ring')).toBe(true);
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

	it('paints the danger item with the danger token', async () => {
		const { container } = render(BasicMenu);
		await open(container);
		const token = getComputedStyle(document.documentElement)
			.getPropertyValue('--color-danger-dark')
			.trim();

		expect(item('Delete').dataset.variant).toBe('danger');
		expect(token).not.toBe('');
		expect(textColor(item('Delete'))).toBe(resolvedColor(token));
		expect(textColor(item('Delete'))).toBe(colorOf('text-danger-dark', 'color'));
		expect(textColor(item('New'))).toBe(colorOf('text-default', 'color'));
		expect(textColor(item('New'))).not.toBe(textColor(item('Delete')));
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
		await vi.waitFor(() => expect(owner(container)).toBe('true'));

		await userEvent.keyboard('{Escape}');
		await vi.waitFor(() => expect(owner(container)).toBe('false'));
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
