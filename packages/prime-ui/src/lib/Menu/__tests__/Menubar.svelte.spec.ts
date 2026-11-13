import { afterEach, describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { userEvent } from 'vitest/browser';

import BasicMenubar from './BasicMenubar.svelte';

const trigger = (name: string) =>
	[...document.querySelectorAll<HTMLElement>('[role="menubar"] [role="menuitem"]')].find(
		(candidate) => candidate.textContent?.trim() === name
	)!;
const menu = () => document.querySelector<HTMLElement>('[role="menu"]');
const item = (name: string) =>
	[...document.querySelectorAll<HTMLElement>('[role^="menuitem"]')].find(
		(candidate) =>
			candidate.textContent?.trim().startsWith(name) && !candidate.closest('[role="menubar"]')
	)!;
const readout = (container: Element, id: string) =>
	container.querySelector(`[data-testid="${id}"]`)?.textContent;

const nextFrame = () => new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));

const openMenu = async (name: string) => {
	await userEvent.click(trigger(name));
	await vi.waitFor(() => expect(menu()?.getAttribute('aria-label')).toBe(name));
	await vi.waitFor(() => expect(menu()?.contains(document.activeElement)).toBe(true));
	await nextFrame();
	await nextFrame();
};

const openMenuLabel = (label: string) =>
	vi.waitFor(() => expect(menu()?.getAttribute('aria-label')).toBe(label));

const PAGE_PADDING_PX = 2000;
const BAR_OFFSET_FROM_VIEWPORT_TOP_PX = 200;

const scrollBarIntoTallPage = () => {
	document.body.style.paddingBlock = `${PAGE_PADDING_PX}px`;
	window.scrollTo(0, PAGE_PADDING_PX - BAR_OFFSET_FROM_VIEWPORT_TOP_PX);
};

afterEach(async () => {
	if (menu()) await userEvent.keyboard('{Escape}');
	await vi.waitFor(() => expect(menu()).toBeNull());
	document.body.style.paddingBlock = '';
});

// bits-ui runs the close-focus handler twice on an outside press, so the check waits past both calls.
const CLOSE_SETTLE_MS = 400;

describe('Menubar', () => {
	it('renders a menubar with one menuitem trigger per menu', () => {
		render(BasicMenubar);

		const bar = document.querySelector('[role="menubar"]')!;
		const triggers = [...bar.querySelectorAll('[role="menuitem"]')].map((node) =>
			node.textContent?.trim()
		);

		expect(triggers).toEqual(['File', 'Edit', 'View']);
		expect(menu()).toBeNull();
	});

	it('opens a menu on click', async () => {
		render(BasicMenubar);

		await openMenu('Edit');

		expect(trigger('Edit').getAttribute('aria-expanded')).toBe('true');
		expect(item('Undo')).toBeTruthy();
	});

	it('does not scroll the page when a menu opens', async () => {
		render(BasicMenubar);
		scrollBarIntoTallPage();

		await openMenu('Edit');

		expect(window.scrollY).toBe(PAGE_PADDING_PX - BAR_OFFSET_FROM_VIEWPORT_TOP_PX);
	});

	it('opens the next menu on ArrowRight and the previous on ArrowLeft', async () => {
		render(BasicMenubar);
		await openMenu('Edit');

		await userEvent.keyboard('{ArrowRight}');
		await openMenuLabel('View');

		await userEvent.keyboard('{ArrowLeft}');
		await openMenuLabel('Edit');
	});

	it('wraps from the last menu to the first', async () => {
		render(BasicMenubar);
		await openMenu('View');

		await userEvent.keyboard('{ArrowRight}');
		await openMenuLabel('File');

		await userEvent.keyboard('{ArrowLeft}');
		await openMenuLabel('View');
	});

	it('moves focus between closed triggers with the arrow keys', async () => {
		render(BasicMenubar);
		trigger('File').focus();

		await userEvent.keyboard('{ArrowRight}');

		await vi.waitFor(() => expect(document.activeElement).toBe(trigger('Edit')));
		expect(menu()).toBeNull();
	});

	it('closes on Escape and returns focus to the trigger', async () => {
		render(BasicMenubar);
		await openMenu('Edit');

		await userEvent.keyboard('{Escape}');

		await vi.waitFor(() => expect(menu()).toBeNull());
		expect(document.activeElement).toBe(trigger('Edit'));
	});

	it('does not pull focus back to the trigger after a press outside', async () => {
		render(BasicMenubar);
		await openMenu('Edit');
		const input = document.querySelector<HTMLInputElement>('input[aria-label="Outside"]')!;

		await userEvent.click(input);

		await vi.waitFor(() => expect(menu()).toBeNull());
		await new Promise((resolve) => setTimeout(resolve, CLOSE_SETTLE_MS));
		expect(document.activeElement).not.toBe(trigger('Edit'));
	});

	it('closes on a press outside and focuses the pressed input', async () => {
		render(BasicMenubar);
		await openMenu('Edit');
		const input = document.querySelector<HTMLInputElement>('input[aria-label="Outside"]')!;

		await userEvent.click(input);

		await vi.waitFor(() => expect(menu()).toBeNull());
		await new Promise((resolve) => setTimeout(resolve, CLOSE_SETTLE_MS));
		expect(document.activeElement).toBe(input);
	});

	it('moves the highlight by type-ahead', async () => {
		render(BasicMenubar);
		await openMenu('Edit');

		await userEvent.keyboard('r');

		await vi.waitFor(() => expect(document.activeElement).toBe(item('Redo')));
	});

	it('fires onclick on an item and closes the menu', async () => {
		const { container } = render(BasicMenubar);
		await openMenu('Edit');

		await userEvent.click(item('Undo'));

		await vi.waitFor(() => expect(menu()).toBeNull());
		expect(readout(container, 'log')).toBe('Undo');
	});

	it('toggles a checkbox item', async () => {
		const { container } = render(BasicMenubar);
		await openMenu('View');

		await userEvent.click(document.querySelector('[role="menuitemcheckbox"]')!);

		await vi.waitFor(() => expect(readout(container, 'grid')).toBe('true'));
	});

	it('renders a separator and a shortcut in the content', async () => {
		render(BasicMenubar);
		await openMenu('File');

		expect(menu()?.querySelector('[role="separator"]')).toBeTruthy();
		expect(item('New').textContent).toContain('⌘N');
	});

	it('opens a submenu', async () => {
		const { container } = render(BasicMenubar);
		await openMenu('File');

		await userEvent.click(item('Export'));
		await vi.waitFor(() => expect(item('PDF')).toBeTruthy());
		await userEvent.click(item('PDF'));

		await vi.waitFor(() => expect(readout(container, 'log')).toBe('PDF'));
	});
});
