import { afterEach, describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { userEvent } from 'vitest/browser';

import BasicMenubar from './fixtures/BasicMenubar.svelte';

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
	await vi.waitFor(() =>
		expect(menu()?.contains(document.activeElement), 'focus moved into the open menu').toBe(true)
	);
	await nextFrame();
	await nextFrame();
};

const parkPointerOffTheBar = (container: Element) =>
	userEvent.hover(container.querySelector('input[aria-label="Outside"]')!);

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

	it('opens a menu on ArrowDown from a focused trigger and focuses its first item', async () => {
		const { container } = render(BasicMenubar);
		await parkPointerOffTheBar(container);
		trigger('Edit').focus();

		await userEvent.keyboard('{ArrowDown}');

		await openMenuLabel('Edit');
		await vi.waitFor(() => expect(document.activeElement).toBe(item('Undo')));
	});

	it('closes on Escape and returns focus to the trigger', async () => {
		render(BasicMenubar);
		await openMenu('Edit');

		await userEvent.keyboard('{Escape}');

		await vi.waitFor(() => expect(menu()).toBeNull());
		expect(document.activeElement).toBe(trigger('Edit'));
	});

	it('closes on a press outside and focuses the pressed input', async () => {
		render(BasicMenubar);
		await openMenu('Edit');
		const input = document.querySelector<HTMLInputElement>('input[aria-label="Outside"]')!;

		await userEvent.click(input);

		await vi.waitFor(() => expect(menu()).toBeNull());
		await new Promise((resolve) => setTimeout(resolve, CLOSE_SETTLE_MS));
		expect(
			document.activeElement,
			`focus ${CLOSE_SETTLE_MS}ms after the close, once every deferred focus move has run`
		).toBe(input);
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

	it('renders the shared separator part in its content', async () => {
		render(BasicMenubar);
		await openMenu('File');

		expect(menu()?.querySelectorAll('[role="separator"]')).toHaveLength(1);
	});

	it('renders the shared shortcut part in an item', async () => {
		render(BasicMenubar);
		await openMenu('File');

		expect(item('New').querySelector('kbd')?.textContent).toBe('⌘N');
	});

	it('activates an item in a submenu', async () => {
		const { container } = render(BasicMenubar);
		await openMenu('File');

		await userEvent.click(item('Export'));
		await vi.waitFor(() => expect(item('PDF')).toBeTruthy());
		await userEvent.click(item('PDF'));

		await vi.waitFor(() => expect(readout(container, 'log')).toBe('PDF'));
	});
});
