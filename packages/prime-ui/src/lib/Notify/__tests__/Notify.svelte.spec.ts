import { describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { userEvent } from 'vitest/browser';

import '../../__tests__/tailwind.css';
import NotifyHost from './NotifyHost.svelte';

const LONG_DURATION_MS = 3000;

const region = () =>
	document.querySelector<HTMLElement>('[data-scope="toast"][data-part="group"]')!;
const items = () => [...region().querySelectorAll<HTMLElement>('[data-part="root"]')];
const titleOf = (item: HTMLElement) => item.querySelector('.banner-title')?.textContent;
const remainingOf = (item: HTMLElement) =>
	Number(item.querySelector('[role="progressbar"]')!.getAttribute('aria-valuenow'));
const wait = (milliseconds: number) =>
	new Promise<void>((resolve) => setTimeout(resolve, milliseconds));

const create = async (container: Element, testId: string) => {
	await userEvent.click(container.querySelector<HTMLElement>(`[data-testid="${testId}"]`)!);
};

const firstItem = async () => {
	await vi.waitFor(() => expect(items()).toHaveLength(1));
	return items()[0];
};

describe('Notify', () => {
	it.each([
		{ testId: 'info', role: 'status', title: 'Deployed' },
		{ testId: 'danger', role: 'alert', title: 'Failed to publish' }
	])('shows a $testId notification in a $role item', async ({ testId, role, title }) => {
		const { container } = render(NotifyHost);
		await create(container, testId);

		const item = await firstItem();

		expect(item.getAttribute('role')).toBe(role);
		expect(item.querySelector('.banner-chip')).toBeTruthy();
		expect(titleOf(item)).toBe(title);
	});

	it('shows the description under the title', async () => {
		const { container } = render(NotifyHost);
		await create(container, 'danger');

		const item = await firstItem();

		expect(item.querySelector('.banner-description')?.textContent?.trim()).toBe(
			'The module is unreachable.'
		);
	});

	it('counts the progress bar down while the timer runs', async () => {
		const { container } = render(NotifyHost, { props: { duration: LONG_DURATION_MS } });
		await create(container, 'info');
		const item = await firstItem();
		const atCreation = remainingOf(item);

		await wait(200);

		expect(remainingOf(item)).toBeLessThan(atCreation);
	});

	it('holds the progress bar while the region is hovered and resumes after', async () => {
		const { container } = render(NotifyHost, { props: { duration: LONG_DURATION_MS } });
		await create(container, 'info');
		const item = await firstItem();

		await userEvent.hover(item);
		await vi.waitFor(() => expect(item.hasAttribute('data-paused')).toBe(true));
		const held = remainingOf(item);
		await wait(200);

		expect(remainingOf(item)).toBe(held);

		await userEvent.unhover(item);

		await vi.waitFor(() => expect(remainingOf(item)).toBeLessThan(held));
	});

	it('shows a spinner and no progress bar while pending', async () => {
		const { container } = render(NotifyHost, { props: { duration: LONG_DURATION_MS } });
		await create(container, 'pending');

		const item = await firstItem();

		expect(item.querySelector('.banner-chip .progress-dots')).toBeTruthy();
		expect(item.querySelector('[role="progressbar"]')).toBeNull();
	});

	it('removes the item through Banner.Close and calls onDismiss once', async () => {
		const onDismiss = vi.fn();
		const { container } = render(NotifyHost, { props: { onDismiss } });
		await create(container, 'dismissable');
		const item = await firstItem();

		await userEvent.click(item.querySelector<HTMLElement>('button[aria-label="Dismiss"]')!);

		await vi.waitFor(() => expect(items()).toHaveLength(0));
		await vi.waitFor(() => expect(onDismiss).toHaveBeenCalledOnce());
	});

	it.each(['info', 'danger'])(
		'carries one live-region role on a %s notification, the item itself',
		async (testId) => {
			const { container } = render(NotifyHost);
			await create(container, testId);
			const item = await firstItem();

			const liveRegions = region().querySelectorAll('[role="status"], [role="alert"]');

			expect([...liveRegions]).toEqual([item]);
		}
	);

	it('renders the item snippet with the remaining time and no Banner', async () => {
		const { container } = render(NotifyHost, {
			props: { custom: true, duration: LONG_DURATION_MS }
		});
		await create(container, 'info');
		const item = await firstItem();

		expect(item.querySelector('[data-testid="custom"]')?.textContent).toMatch(/^Deployed \d+$/);
		expect(item.querySelector('.banner')).toBeNull();
	});

	it('dismisses through the dismiss of the item snippet', async () => {
		const { container } = render(NotifyHost, {
			props: { custom: true, duration: LONG_DURATION_MS }
		});
		await create(container, 'info');
		const item = await firstItem();

		await userEvent.click(item.querySelector<HTMLElement>('[data-testid="custom-dismiss"]')!);

		await vi.waitFor(() => expect(items()).toHaveLength(0));
	});

	it('lists the newest notification first', async () => {
		const { container } = render(NotifyHost, { props: { duration: LONG_DURATION_MS } });
		await create(container, 'info');
		await create(container, 'danger');

		await vi.waitFor(() => expect(items()).toHaveLength(2));

		expect(items().map(titleOf)).toEqual(['Failed to publish', 'Deployed']);
	});
});
