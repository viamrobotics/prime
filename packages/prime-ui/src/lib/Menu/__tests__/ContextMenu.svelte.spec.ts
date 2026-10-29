import { afterEach, describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { userEvent } from 'vitest/browser';

import BasicContextMenu from './BasicContextMenu.svelte';

const owner = (container: Element) => container.querySelector('[data-testid="owner"]')?.textContent;
const log = (container: Element) => container.querySelector('[data-testid="log"]')?.textContent;
const area = (container: Element) => container.querySelector('[data-testid="area"]')!;
const menu = () => document.querySelector('[role="menu"]');

const rightClick = (container: Element) => {
	const rect = area(container).getBoundingClientRect();
	const clientX = rect.left + rect.width / 2;
	const clientY = rect.top + rect.height / 2;
	area(container).dispatchEvent(
		new MouseEvent('contextmenu', { bubbles: true, cancelable: true, clientX, clientY })
	);
	return { clientX, clientY };
};

const itemLabeled = (label: string) =>
	[...document.querySelectorAll('[role="menuitem"]')].find(
		(item) => item.textContent?.trim() === label
	)!;

afterEach(async () => {
	if (menu()) await userEvent.keyboard('{Escape}');
});

describe('ContextMenu', () => {
	it('is closed by default', () => {
		const { container } = render(BasicContextMenu);

		expect(menu()).toBeNull();
		expect(owner(container)).toBe('false');
	});

	it('puts one id on the panel', async () => {
		const { container } = render(BasicContextMenu);

		rightClick(container);
		await vi.waitFor(() => expect(menu()).not.toBeNull());

		const panel = menu()!;
		expect(panel.id).not.toBe('');
		expect(document.querySelectorAll(`[id="${panel.id}"]`)).toHaveLength(1);
	});

	it('opens on right-click', async () => {
		const { container } = render(BasicContextMenu);

		rightClick(container);

		await vi.waitFor(() => expect(menu()).not.toBeNull());
		expect(owner(container)).toBe('true');
	});

	it('opens at the pointer', async () => {
		const { container } = render(BasicContextMenu);

		const { clientX, clientY } = rightClick(container);

		await vi.waitFor(() => expect(menu()).not.toBeNull());
		await vi.waitFor(() => {
			const rect = menu()!.getBoundingClientRect();
			expect(rect.left).toBeGreaterThanOrEqual(clientX);
			expect(rect.left).toBeLessThanOrEqual(clientX + 8);
			expect(rect.top).toBeGreaterThanOrEqual(clientY);
			expect(rect.top).toBeLessThanOrEqual(clientY + 8);
		});
	});

	it('does not open on a left click', async () => {
		const { container } = render(BasicContextMenu);

		await userEvent.click(area(container));

		expect(menu()).toBeNull();
		expect(owner(container)).toBe('false');
	});

	it('closes on Escape', async () => {
		const { container } = render(BasicContextMenu);
		rightClick(container);
		await vi.waitFor(() => expect(menu()).not.toBeNull());

		await userEvent.keyboard('{Escape}');

		await vi.waitFor(() => expect(menu()).toBeNull());
		expect(owner(container)).toBe('false');
	});

	it('closes on an outside click', async () => {
		const { container } = render(BasicContextMenu);
		rightClick(container);
		await vi.waitFor(() => expect(menu()).not.toBeNull());

		const outside = container.querySelector('button')!;
		for (const type of ['pointerdown', 'pointerup', 'click']) {
			outside.dispatchEvent(new PointerEvent(type, { bubbles: true, cancelable: true }));
		}

		await vi.waitFor(() => expect(menu()).toBeNull());
		expect(owner(container)).toBe('false');
	});

	it('logs and closes when an item is clicked', async () => {
		const { container } = render(BasicContextMenu);
		rightClick(container);
		await vi.waitFor(() => expect(itemLabeled('Copy')).toBeTruthy());

		await userEvent.click(itemLabeled('Copy'));

		await vi.waitFor(() => expect(menu()).toBeNull());
		expect(log(container)).toBe('Copy');
		expect(owner(container)).toBe('false');
	});

	it('activates the first item from the keyboard', async () => {
		const { container } = render(BasicContextMenu);
		rightClick(container);
		await vi.waitFor(() => expect(menu()).not.toBeNull());

		await userEvent.keyboard('{ArrowDown}');
		await userEvent.keyboard('{Enter}');

		await vi.waitFor(() => expect(log(container)).toBe('Copy'));
	});

	it('ignores right-clicks when disabled', async () => {
		const { container } = render(BasicContextMenu, { disabled: true });

		rightClick(container);
		await new Promise((resolve) => setTimeout(resolve, 100));

		expect(menu()).toBeNull();
		expect(owner(container)).toBe('false');
	});
});
