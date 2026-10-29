import { afterEach, describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { userEvent } from 'vitest/browser';

import BoundSelection from './BoundSelection.svelte';
import ControlledSelection from './ControlledSelection.svelte';

const readout = (container: Element, id: string) =>
	container.querySelector(`[data-testid="${id}"]`)?.textContent;
const menu = () => document.querySelector<HTMLElement>('[role="menu"]');
const trigger = (container: Element) =>
	[...container.querySelectorAll('button')].find(
		(button) => button.textContent?.trim() === 'Open'
	)!;
const entry = (role: string, name: string) =>
	[...document.querySelectorAll<HTMLElement>(`[role="${role}"]`)].find(
		(candidate) => candidate.textContent?.trim() === name
	)!;
const checkbox = (name: string) => entry('menuitemcheckbox', name);
const radio = (name: string) => entry('menuitemradio', name);

const nextFrame = () => new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));

const open = async (container: Element) => {
	await userEvent.click(trigger(container));
	await vi.waitFor(() => expect(menu()?.contains(document.activeElement)).toBe(true));
	await nextFrame();
	await nextFrame();
};

const focus = async (element: HTMLElement) => {
	element.focus();
	await vi.waitFor(() => expect(document.activeElement).toBe(element));
};

const setLock = (on: boolean) => {
	const lock = document.querySelector<HTMLInputElement>('input[type="checkbox"]')!;
	if (lock.checked !== on) lock.click();
};

afterEach(async () => {
	const lock = document.querySelector<HTMLInputElement>('input[type="checkbox"]');
	if (lock?.checked) lock.click();
	if (menu()) await userEvent.keyboard('{Escape}');
});

describe('Menu selection', () => {
	it('renders an unchecked checkbox item without a check icon', async () => {
		const { container } = render(BoundSelection);
		await open(container);

		expect(checkbox('Show hidden').getAttribute('aria-checked')).toBe('false');
		expect(checkbox('Show hidden').querySelector('svg')).toBeNull();
	});

	it('toggles on click and shows the check icon on reopen', async () => {
		const { container } = render(BoundSelection);
		await open(container);
		await userEvent.click(checkbox('Show hidden'));

		await vi.waitFor(() => expect(readout(container, 'hidden')).toBe('true'));
		await vi.waitFor(() => expect(menu()).toBeNull());

		await open(container);
		expect(checkbox('Show hidden').getAttribute('aria-checked')).toBe('true');
		expect(checkbox('Show hidden').querySelector('svg')).not.toBeNull();
	});

	it('toggles on Space and closes the menu', async () => {
		const { container } = render(BoundSelection);
		await open(container);
		await focus(checkbox('Show hidden'));
		await userEvent.keyboard(' ');

		await vi.waitFor(() => expect(readout(container, 'hidden')).toBe('true'));
		await vi.waitFor(() => expect(menu()).toBeNull());
	});

	it('toggles on Enter', async () => {
		const { container } = render(BoundSelection);
		await open(container);
		await focus(checkbox('Show hidden'));
		await userEvent.keyboard('{Enter}');

		await vi.waitFor(() => expect(readout(container, 'hidden')).toBe('true'));
	});

	it('does not toggle a disabled checkbox item', async () => {
		const { container } = render(BoundSelection);
		await open(container);
		const locked = checkbox('Locked');
		expect(locked.getAttribute('aria-checked')).toBe('true');
		locked.focus();
		await userEvent.keyboard('{Enter}');
		await nextFrame();

		expect(checkbox('Locked').getAttribute('aria-checked')).toBe('true');
		expect(menu()).not.toBeNull();
	});

	it('honors a getter and setter on the checkbox item', async () => {
		const { container } = render(ControlledSelection);
		setLock(true);
		await open(container);
		await userEvent.click(checkbox('Show hidden'));
		await nextFrame();
		expect(readout(container, 'hidden')).toBe('false');

		if (menu()) await userEvent.keyboard('{Escape}');
		setLock(false);
		await open(container);
		await userEvent.click(checkbox('Show hidden'));
		await vi.waitFor(() => expect(readout(container, 'hidden')).toBe('true'));
	});

	it('labels the radio group by a heading inside it', async () => {
		const { container } = render(BoundSelection);
		await open(container);

		const group = document.querySelector('[role="group"][aria-labelledby]')!;
		const heading = document.getElementById(group.getAttribute('aria-labelledby')!);
		expect(heading?.textContent?.trim()).toBe('Size');
	});

	it('renders radio items with menuitemradio roles', async () => {
		const { container } = render(BoundSelection);
		await open(container);

		for (const name of ['Small', 'Medium', 'Large']) {
			expect(radio(name)).toBeDefined();
		}
		expect(radio('Small').getAttribute('aria-checked')).toBe('true');
	});

	it('selects a radio item on click and shows it checked on reopen', async () => {
		const { container } = render(BoundSelection);
		await open(container);
		await userEvent.click(radio('Medium'));

		await vi.waitFor(() => expect(readout(container, 'size')).toBe('Medium'));
		await vi.waitFor(() => expect(menu()).toBeNull());

		await open(container);
		expect(radio('Medium').getAttribute('aria-checked')).toBe('true');
		expect(radio('Medium').querySelector('svg')).not.toBeNull();
		expect(radio('Small').getAttribute('aria-checked')).toBe('false');
		expect(radio('Large').getAttribute('aria-checked')).toBe('false');
	});

	it('selects a radio item on Enter', async () => {
		const { container } = render(BoundSelection);
		await open(container);
		await focus(radio('Large'));
		await userEvent.keyboard('{Enter}');

		await vi.waitFor(() => expect(readout(container, 'size')).toBe('Large'));
	});

	it('keeps the old radio value when the setter vetoes', async () => {
		const { container } = render(ControlledSelection);
		setLock(true);
		await open(container);
		await userEvent.click(radio('Medium'));
		await nextFrame();

		expect(readout(container, 'size')).toBe('Small');
	});

	it('renders the shortcut as a decorative kbd inside its item', async () => {
		const { container } = render(BoundSelection);
		await open(container);
		const save = [...document.querySelectorAll<HTMLElement>('[role="menuitem"]')].find(
			(candidate) => candidate.textContent?.includes('Save')
		)!;
		const shortcut = save.querySelector('kbd');

		expect(shortcut?.classList.contains('kbd')).toBe(true);
		expect(shortcut?.getAttribute('aria-hidden')).toBe('true');
		expect(shortcut?.textContent).toBe('⌘S');
	});
});
