import { afterEach, describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { userEvent } from 'vitest/browser';

import '../../__tests__/tailwind.css';
import BoundPopover from './BoundPopover.svelte';
import ControlledPopover from './ControlledPopover.svelte';
import UndefinedPopover from './UndefinedPopover.svelte';

const trigger = (container: Element) =>
	[...container.querySelectorAll('button')].find(
		(button) => button.textContent?.trim() === 'Open'
	)!;
const outside = (container: Element) =>
	[...container.querySelectorAll('button')].find(
		(button) => button.textContent?.trim() === 'Outside'
	)!;
const owner = (container: Element) => container.querySelector('[data-testid="owner"]')?.textContent;
const dialog = () => document.querySelector<HTMLElement>('[role="dialog"]');

const open = async (container: Element) => {
	await userEvent.click(trigger(container));
	await vi.waitFor(() => expect(dialog()).toBeTruthy());
};

afterEach(async () => {
	if (dialog()) await userEvent.keyboard('{Escape}');
});

describe('Popover', () => {
	it('is closed by default', () => {
		const { container } = render(BoundPopover);

		expect(dialog()).toBeNull();
		expect(owner(container)).toBe('false');
	});

	it('opens on trigger click with role dialog', async () => {
		const { container } = render(BoundPopover);

		await open(container);

		expect(dialog()?.textContent).toContain('Details');
		expect(dialog()?.getAttribute('aria-label')).toBe('Details');
		expect(trigger(container).dataset.state).toBe('open');
	});

	it('renders no forcemount attribute on any element while open', async () => {
		const { container } = render(BoundPopover);

		await open(container);

		expect(dialog()?.textContent).toContain('Details');
		expect(document.querySelector('[forcemount]')).toBeNull();
	});

	it('wears the shared focus ring on the trigger', () => {
		const { container } = render(BoundPopover);

		expect(trigger(container).classList.contains('focus-ring')).toBe(true);
	});

	it('closes on Escape and returns focus to the trigger', async () => {
		const { container } = render(BoundPopover);
		await open(container);

		await userEvent.keyboard('{Escape}');

		await vi.waitFor(() => expect(dialog()).toBeNull());
		expect(document.activeElement).toBe(trigger(container));
	});

	it('closes on an outside press and returns focus to the trigger', async () => {
		const { container } = render(BoundPopover);
		await open(container);

		await userEvent.click(outside(container));

		await vi.waitFor(() => expect(dialog()).toBeNull());
		await vi.waitFor(() => expect(document.activeElement).toBe(trigger(container)));
	});

	it('Popover.Close closes, wears icon-button, and is labeled Close', async () => {
		const { container } = render(BoundPopover);
		await open(container);
		const closeButton = dialog()!.querySelector<HTMLButtonElement>('button')!;

		expect(closeButton.classList.contains('icon-button')).toBe(true);
		expect(closeButton.getAttribute('aria-label')).toBe('Close');
		expect(closeButton.querySelector('svg')).toBeTruthy();

		await userEvent.click(closeButton);

		await vi.waitFor(() => expect(dialog()).toBeNull());
	});

	it('stacks the panel on the popover layer', async () => {
		const { container } = render(BoundPopover);
		await open(container);

		expect(getComputedStyle(dialog()!).zIndex).toBe('1200');
	});

	it('wears the panel chrome', async () => {
		const { container } = render(BoundPopover);
		await open(container);

		for (const name of [
			'z-popover',
			'rounded-sm',
			'border',
			'border-light',
			'bg-white',
			'p-4',
			'shadow-sm'
		]) {
			expect(dialog()!.classList.contains(name), name).toBe(true);
		}
	});

	it.each([
		{ side: 'top', align: 'start' },
		{ side: 'right', align: 'end' },
		{ side: 'bottom', align: 'center' }
	] as const)('places the panel at side $side, align $align', async (placement) => {
		const { container } = render(BoundPopover, { props: { placement } });

		await open(container);

		await vi.waitFor(() => {
			const panel = dialog()!;
			expect(panel.dataset.side).toBe(placement.side);
			expect(panel.dataset.align).toBe(placement.align);
		});
	});

	it('keeps the page scrollable while open', async () => {
		const { container } = render(BoundPopover);

		await open(container);

		expect(getComputedStyle(document.body).overflow).not.toBe('hidden');
		expect(getComputedStyle(document.documentElement).overflow).not.toBe('hidden');
	});

	it('two-way: opening and closing write to the owner', async () => {
		const { container } = render(BoundPopover);

		await open(container);
		await vi.waitFor(() => expect(owner(container)).toBe('true'));

		await userEvent.keyboard('{Escape}');
		await vi.waitFor(() => expect(owner(container)).toBe('false'));
	});

	it('controlled: a setter that declines keeps it closed', async () => {
		const { container } = render(ControlledPopover, { props: { accept: false } });

		await userEvent.click(trigger(container));

		expect(owner(container)).toBe('false');
		expect(dialog()).toBeNull();
	});

	it('controlled: a setter that accepts opens it', async () => {
		const { container } = render(ControlledPopover, { props: { accept: true } });

		await open(container);

		await vi.waitFor(() => expect(owner(container)).toBe('true'));
	});

	it('renders and opens from undefined state', async () => {
		const { container } = render(UndefinedPopover);
		expect(owner(container)).toBe('undefined');

		await open(container);

		await vi.waitFor(() => expect(owner(container)).toBe('true'));
	});
});
