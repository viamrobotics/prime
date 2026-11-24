import { afterEach, describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { userEvent } from 'vitest/browser';

import { colorOf } from '../../../../test/computed-style.ts';
import BasicMenu from './fixtures/BasicMenu.svelte';
import CustomDecoration from './fixtures/CustomDecoration.svelte';
import UnnamedContextMenu from './fixtures/UnnamedContextMenu.svelte';
import UnnamedMenu from './fixtures/UnnamedMenu.svelte';

const menu = () => document.querySelector<HTMLElement>('[role="menu"]');
const trigger = (container: Element) => container.querySelector<HTMLElement>('button')!;
const row = (role: string, name: string) =>
	[...document.querySelectorAll<HTMLElement>(`[role="${role}"]`)].find((candidate) =>
		candidate.textContent?.includes(name)
	)!;

const nextFrame = () => new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));

const open = async (container: Element) => {
	await userEvent.click(trigger(container));
	await vi.waitFor(() =>
		expect(menu()?.contains(document.activeElement), 'focus moved into the open menu').toBe(true)
	);
	await nextFrame();
	await nextFrame();
};

afterEach(async () => {
	if (menu()) await userEvent.keyboard('{Escape}');
});

describe('Menu rows', () => {
	it('draws a highlighted row with a 2px inset link outline', async () => {
		const { container } = render(BasicMenu);
		await open(container);

		row('menuitem', 'New').focus();

		await vi.waitFor(() =>
			expect(row('menuitem', 'New').hasAttribute('data-highlighted'), 'row highlighted').toBe(true)
		);
		const style = getComputedStyle(row('menuitem', 'New'));
		expect(style.outlineStyle).toBe('solid');
		expect(style.outlineWidth).toBe('2px');
		expect(style.outlineOffset).toBe('-2px');
		expect(style.outlineColor).toBe(colorOf('border-link', 'borderTopColor'));
	});

	it('does not space a row apart', async () => {
		const { container } = render(BasicMenu);
		await open(container);

		expect(getComputedStyle(row('menuitem', 'New')).justifyContent).not.toBe('space-between');
	});
});

describe('Menu panel names', () => {
	it('names a Menu.Content by its trigger', async () => {
		const { container } = render(UnnamedMenu);
		await open(container);

		const labelledBy = menu()!.getAttribute('aria-labelledby');

		expect(labelledBy).toBe(trigger(container).id);
		expect(labelledBy).toBeTruthy();
	});

	it('keeps an aria-label the consumer passes and adds no aria-labelledby', async () => {
		const { container } = render(BasicMenu);
		await open(container);

		expect(menu()!.getAttribute('aria-label')).toBe('Actions');
		expect(menu()!.hasAttribute('aria-labelledby')).toBe(false);
	});

	it('names a ContextMenu.Content by its trigger area', async () => {
		const { container } = render(UnnamedContextMenu);
		const area = container.querySelector('[data-testid="area"]')!;
		const rect = area.getBoundingClientRect();
		area.dispatchEvent(
			new MouseEvent('contextmenu', {
				bubbles: true,
				cancelable: true,
				clientX: rect.left + 10,
				clientY: rect.top + 10
			})
		);
		await vi.waitFor(() => expect(menu()).not.toBeNull());

		const labelledBy = menu()!.getAttribute('aria-labelledby');

		expect(labelledBy).toBeTruthy();
		expect(document.getElementById(labelledBy!)).toBe(area.parentElement);
	});
});

describe('Menu decoration snippets', () => {
	it('renders an indicator snippet in place of the check icon on a checkbox item', async () => {
		const { container } = render(CustomDecoration);
		await open(container);

		const item = row('menuitemcheckbox', 'Show hidden');

		expect(item.querySelector('[data-testid="check-indicator"]')?.textContent).toBe('on');
		expect(item.querySelector('svg')).toBeNull();
	});

	it('renders an indicator snippet in place of the check icon on a radio item', async () => {
		const { container } = render(CustomDecoration);
		await open(container);

		const item = row('menuitemradio', 'Small');

		expect(item.querySelector('[data-testid="radio-indicator"]')?.textContent).toBe('on');
		expect(item.querySelector('svg')).toBeNull();
	});

	it('renders a chevron snippet in place of the submenu chevron', async () => {
		const { container } = render(CustomDecoration);
		await open(container);

		const subTrigger = row('menuitem', 'Export');

		expect(subTrigger.querySelector('[data-testid="chevron"]')?.textContent).toBe('more');
		expect(subTrigger.querySelector('svg')).toBeNull();
	});
});
