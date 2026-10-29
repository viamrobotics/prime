import { afterEach, describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { userEvent } from 'vitest/browser';

import StructuredMenu from './StructuredMenu.svelte';

const trigger = (container: Element) =>
	[...container.querySelectorAll('button')].find(
		(button) => button.textContent?.trim() === 'Open'
	)!;
const log = (container: Element) => container.querySelector('[data-testid="log"]')?.textContent;
const menus = () => [...document.querySelectorAll<HTMLElement>('[role="menu"]')];
const item = (name: string) =>
	[...document.querySelectorAll<HTMLElement>('[role="menuitem"]')].find(
		(candidate) => candidate.textContent?.trim() === name
	)!;
const subTrigger = () => document.querySelector<HTMLElement>('[aria-haspopup="menu"]:not(button)')!;

const nextFrame = () => new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));

const open = async (container: Element) => {
	await userEvent.click(trigger(container));
	await vi.waitFor(() => expect(menus()[0]?.contains(document.activeElement)).toBe(true));
	await nextFrame();
	await nextFrame();
};

const focusSubTrigger = async (container: Element) => {
	await open(container);
	await userEvent.keyboard('{ArrowDown}{ArrowDown}{ArrowDown}');
	await vi.waitFor(() => expect(document.activeElement).toBe(subTrigger()));
};

const openSub = async (container: Element) => {
	await focusSubTrigger(container);
	await userEvent.keyboard('{ArrowRight}');
	await vi.waitFor(() => expect(document.activeElement).toBe(item('PDF')));
	await nextFrame();
};

afterEach(async () => {
	if (menus().length > 0) await userEvent.keyboard('{Escape}');
	await vi.waitFor(() => expect(menus()).toHaveLength(0));
});

describe('Menu structure', () => {
	it('renders the separator with its role', async () => {
		const { container } = render(StructuredMenu);
		await open(container);

		expect(document.querySelector('[role="separator"]')).not.toBeNull();
	});

	it('labels the group by its heading', async () => {
		const { container } = render(StructuredMenu);
		await open(container);

		const group = document.querySelector('[role="group"][aria-labelledby]')!;
		const labelledBy = group.getAttribute('aria-labelledby')!;
		expect(document.getElementById(labelledBy)?.textContent?.trim()).toBe('File');
	});

	it('marks the sub trigger as a closed menu popup', async () => {
		const { container } = render(StructuredMenu);
		await open(container);

		expect(subTrigger().getAttribute('aria-haspopup')).toBe('menu');
		expect(subTrigger().getAttribute('data-state')).toBe('closed');
		expect(menus()).toHaveLength(1);
	});

	it('opens the submenu with ArrowRight and focuses its first item', async () => {
		const { container } = render(StructuredMenu);
		await openSub(container);

		expect(menus()).toHaveLength(2);
		expect(subTrigger().getAttribute('data-state')).toBe('open');
	});

	it('closes the submenu with ArrowLeft and returns focus to the sub trigger', async () => {
		const { container } = render(StructuredMenu);
		await openSub(container);

		await userEvent.keyboard('{ArrowLeft}');

		await vi.waitFor(() => expect(menus()).toHaveLength(1));
		await vi.waitFor(() => expect(document.activeElement).toBe(subTrigger()));
	});

	it('opens the submenu with Enter', async () => {
		const { container } = render(StructuredMenu);
		await focusSubTrigger(container);

		await userEvent.keyboard('{Enter}');

		await vi.waitFor(() => expect(menus()).toHaveLength(2));
	});

	it('moves focus to a submenu item by typeahead', async () => {
		const { container } = render(StructuredMenu);
		await openSub(container);

		await userEvent.keyboard('m');

		await vi.waitFor(() => expect(document.activeElement).toBe(item('Markdown')));
	});

	it('gives the submenu panel a unique id that the sub trigger controls', async () => {
		const { container } = render(StructuredMenu);
		await openSub(container);

		const panel = menus()[1]!;
		expect(panel.id).not.toBe('');
		expect(document.querySelectorAll(`[id="${panel.id}"]`)).toHaveLength(1);
		expect(subTrigger().getAttribute('aria-controls')).toBe(panel.id);
	});

	it('activates a submenu item and closes every menu', async () => {
		const { container } = render(StructuredMenu);
		await openSub(container);

		await userEvent.keyboard('{ArrowDown}{Enter}');

		await vi.waitFor(() => expect(log(container)).toBe('PNG'));
		await vi.waitFor(() => expect(menus()).toHaveLength(0));
	});

	it('closes every menu on Escape from the submenu and refocuses the trigger', async () => {
		const { container } = render(StructuredMenu);
		await openSub(container);

		await userEvent.keyboard('{Escape}');

		await vi.waitFor(() => expect(menus()).toHaveLength(0));
		await vi.waitFor(() => expect(document.activeElement).toBe(trigger(container)));
	});
});
