import { mdiAlert, mdiAlertCircle, mdiCheckCircle, mdiInformation } from '@mdi/js';
import { describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { userEvent } from 'vitest/browser';

import '../../__tests__/tailwind.css';
import ToastHost from './ToastHost.svelte';

const HOLD_OPEN = 60_000;
const REMOVAL_TIMEOUT = 3000;
const TOAST_WIDTH_PX = 320;

const trigger = (container: Element, testId: string) =>
	container.querySelector<HTMLButtonElement>(`[data-testid="${testId}"]`)!;
const region = () => document.querySelector('[data-scope="toast"][data-part="group"]')!;
const items = () => [
	...region().querySelectorAll<HTMLElement>('[data-scope="toast"][data-part="root"]')
];
const waitForItem = async () => {
	await vi.waitFor(() => expect(items()).toHaveLength(1));
	return items()[0]!;
};
const waitForNoItems = () =>
	vi.waitFor(() => expect(items()).toHaveLength(0), { timeout: REMOVAL_TIMEOUT });

describe('Toast', () => {
	it('labels the region', () => {
		render(ToastHost);

		expect(region().getAttribute('role')).toBe('region');
		expect(region().getAttribute('aria-label')).toContain('Notifications');
	});

	it.each([
		{ variant: 'info', role: 'status', glyph: mdiInformation },
		{ variant: 'success', role: 'status', glyph: mdiCheckCircle },
		{ variant: 'warning', role: 'alert', glyph: mdiAlert },
		{ variant: 'danger', role: 'alert', glyph: mdiAlertCircle }
	])('$variant is a $role with its glyph and title', async ({ variant, role, glyph }) => {
		const { container } = render(ToastHost, { duration: HOLD_OPEN });

		await userEvent.click(trigger(container, variant));

		const item = await waitForItem();
		expect(item.getAttribute('role')).toBe(role);
		expect(item.textContent).toContain(`Title ${variant}`);
		expect(item.querySelector('svg')?.getAttribute('aria-hidden')).toBe('true');
		expect(item.querySelector('svg path')?.getAttribute('d')).toBe(glyph);
	});

	it.each(['top-start', 'top', 'top-end', 'bottom-start', 'bottom', 'bottom-end'] as const)(
		'draws a toast at its full width when placed at %s',
		async (placement) => {
			const { container } = render(ToastHost, { props: { duration: HOLD_OPEN, placement } });

			await userEvent.click(trigger(container, 'info'));
			const item = await waitForItem();

			expect(item.getBoundingClientRect().width).toBe(TOAST_WIDTH_PX);
		}
	);

	it('dismisses from its close button', async () => {
		const { container } = render(ToastHost, { duration: HOLD_OPEN });
		await userEvent.click(trigger(container, 'info'));
		const item = await waitForItem();

		await userEvent.click(item.querySelector<HTMLButtonElement>('button[aria-label="Dismiss"]')!);

		await waitForNoItems();
	});

	it('dismisses on Escape with focus inside', async () => {
		const { container } = render(ToastHost, { duration: HOLD_OPEN });
		await userEvent.click(trigger(container, 'info'));
		const item = await waitForItem();

		item.focus();
		await userEvent.keyboard('{Escape}');

		await waitForNoItems();
	});

	it('dismisses itself after its duration', async () => {
		const { container } = render(ToastHost);

		await userEvent.click(trigger(container, 'info'));
		await waitForItem();

		await waitForNoItems();
	});

	it('holds its timer while the region is hovered and releases it on leave', async () => {
		const { container } = render(ToastHost, { duration: 600 });
		await userEvent.click(trigger(container, 'info'));
		const item = await waitForItem();

		await userEvent.hover(item);
		await new Promise((resolve) => setTimeout(resolve, 1200));

		expect(items()).toHaveLength(1);
		expect(item.getAttribute('data-state')).toBe('open');

		await userEvent.unhover(item);

		await waitForNoItems();
	});

	it('shows the description', async () => {
		const { container } = render(ToastHost, { duration: HOLD_OPEN });

		await userEvent.click(trigger(container, 'action'));

		const item = await waitForItem();
		expect(item.textContent).toContain('report.csv');
	});

	it('runs the action once, then dismisses the toast', async () => {
		let itemsWhenRun = 0;
		const onaction = vi.fn(() => {
			itemsWhenRun = items().length;
		});
		const { container } = render(ToastHost, { duration: HOLD_OPEN, onaction });
		await userEvent.click(trigger(container, 'action'));
		const item = await waitForItem();

		await userEvent.click(
			[...item.querySelectorAll('button')].find((button) => button.textContent?.trim() === 'Undo')!
		);

		expect(onaction).toHaveBeenCalledTimes(1);
		expect(itemsWhenRun).toBe(1);
		await waitForNoItems();
	});

	it('lists the newest toast first', async () => {
		const { container } = render(ToastHost, { duration: HOLD_OPEN });

		await userEvent.click(trigger(container, 'pair'));

		await vi.waitFor(() => expect(items()).toHaveLength(2));
		expect(items().map((item) => item.textContent?.trim())).toEqual([
			expect.stringContaining('Second'),
			expect.stringContaining('First')
		]);
	});
});
