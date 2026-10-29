import { afterEach, describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { userEvent } from 'vitest/browser';

import { backgroundColor, colorOf, textColor } from '../../__tests__/computed-style.ts';
import BoundTooltip from './BoundTooltip.svelte';
import ControlledTooltip from './ControlledTooltip.svelte';
import HoverOnlyTooltip from './HoverOnlyTooltip.svelte';
import IconTriggerTooltip from './IconTriggerTooltip.svelte';
import TabOrderTooltip from './TabOrderTooltip.svelte';
import UndefinedTooltip from './UndefinedTooltip.svelte';

const button = (container: Element) => container.querySelector('button')!;
const owner = (container: Element) => container.querySelector('[data-testid="owner"]')?.textContent;
const tooltip = () => document.querySelector<HTMLElement>('[role="tooltip"]');
// Long enough for a vetoed open to have shown if it were going to.
const SETTLE_MS = 100;
// expect.poll gives up after 1000ms, so an open delay on either side of it decides the case.
const DELAY_UNDER_POLL_MS = 250;
const DELAY_OVER_POLL_MS = 5000;
const settle = () => new Promise((resolve) => setTimeout(resolve, SETTLE_MS));

afterEach(async () => {
	if (tooltip()) await userEvent.keyboard('{Escape}');
	await userEvent.unhover(document.body);
});

describe('Tooltip', () => {
	it('hover opens it only after openDelay has passed', async () => {
		const { container } = render(BoundTooltip, { props: { openDelay: DELAY_UNDER_POLL_MS } });

		await userEvent.hover(button(container));
		expect(tooltip(), 'still closed right after the pointer arrives').toBeNull();

		await expect.poll(tooltip).not.toBeNull();
		expect(tooltip()?.textContent).toBe('Copy to clipboard');
	});

	it('focusing the control inside opens it without waiting for openDelay', async () => {
		const { container } = render(BoundTooltip, { props: { openDelay: DELAY_OVER_POLL_MS } });

		button(container).focus();

		await expect.poll(tooltip).not.toBeNull();
	});

	it('Escape closes it', async () => {
		const { container } = render(BoundTooltip, { props: { openDelay: 0 } });
		button(container).focus();
		await expect.poll(tooltip).not.toBeNull();

		await userEvent.keyboard('{Escape}');

		await expect.poll(tooltip).toBeNull();
	});

	it('moving focus off the control closes it', async () => {
		const { container } = render(BoundTooltip, { props: { openDelay: 0 } });
		button(container).focus();
		await expect.poll(tooltip).not.toBeNull();

		button(container).blur();

		await expect.poll(tooltip).toBeNull();
	});

	it('the pointer leaving the trigger closes it', async () => {
		const { container } = render(BoundTooltip, { props: { openDelay: 0 } });
		await userEvent.hover(button(container));
		await expect.poll(tooltip).not.toBeNull();

		await userEvent.unhover(button(container));

		await expect.poll(tooltip).toBeNull();
	});

	it('the pointer moving onto the content keeps it open when interactive', async () => {
		const { container } = render(BoundTooltip, { props: { openDelay: 0, interactive: true } });
		await userEvent.hover(button(container));
		await expect.poll(tooltip).not.toBeNull();

		await userEvent.hover(tooltip()!);
		await settle();

		expect(tooltip(), 'still open under the pointer').not.toBeNull();
	});

	it('does not open while disabled', async () => {
		const { container } = render(BoundTooltip, { props: { openDelay: 0, disabled: true } });

		button(container).focus();
		await userEvent.hover(button(container));
		await settle();

		expect(tooltip()).toBeNull();
	});

	it('stacks the label on the tooltip layer', async () => {
		const { container } = render(BoundTooltip, { props: { openDelay: 0 } });
		button(container).focus();
		await expect.poll(tooltip).not.toBeNull();

		expect(getComputedStyle(tooltip()!).zIndex).toBe('1400');
	});

	it('paints the label on a dark background in white text', async () => {
		const { container } = render(BoundTooltip, { props: { openDelay: 0 } });
		button(container).focus();
		await expect.poll(tooltip).not.toBeNull();

		expect(backgroundColor(tooltip()!)).toBe(colorOf('bg-gray-9', 'backgroundColor'));
		expect(textColor(tooltip()!)).toBe(colorOf('text-white', 'color'));
	});

	describe('the wrapper span', () => {
		it('names the content on the inner control while open, and not on the span', async () => {
			const { container } = render(BoundTooltip, { props: { openDelay: 0 } });
			const span = button(container).parentElement!;
			expect(button(container).hasAttribute('aria-describedby'), 'closed').toBe(false);

			button(container).focus();
			await expect.poll(tooltip).not.toBeNull();

			expect(tooltip()!.id).not.toBe('');
			expect(button(container).getAttribute('aria-describedby')).toBe(tooltip()!.id);
			expect(span.hasAttribute('aria-describedby')).toBe(false);
			expect(span.hasAttribute('tabindex')).toBe(false);
		});

		it('takes the description back off the control once closed', async () => {
			const { container } = render(BoundTooltip, { props: { openDelay: 0 } });
			button(container).focus();
			await expect.poll(tooltip).not.toBeNull();

			await userEvent.keyboard('{Escape}');

			await expect.poll(() => button(container).hasAttribute('aria-describedby')).toBe(false);
		});

		it('is skipped by Tab, which lands on the control inside and opens the tooltip', async () => {
			const { container } = render(TabOrderTooltip);
			container.querySelector('input')!.focus();

			await userEvent.tab();

			expect(document.activeElement).toBe(button(container));
			await expect.poll(tooltip).not.toBeNull();
		});

		it('opens on focus and names itself on an icon given an aria-label and tabindex', async () => {
			const { container } = render(IconTriggerTooltip);
			const icon = container.querySelector('svg')!;

			await userEvent.tab();

			expect(document.activeElement).toBe(icon);
			await expect.poll(tooltip).not.toBeNull();
			expect(icon.getAttribute('role')).toBe('img');
			expect(icon.getAttribute('aria-describedby')).toBe(tooltip()!.id);
		});

		it('opens on hover alone when nothing inside it is focusable', async () => {
			const { container } = render(HoverOnlyTooltip);
			const trigger = container.querySelector<HTMLElement>('[data-testid="trigger"]')!;
			expect(trigger.querySelector('button, a[href], input, [tabindex]')).toBeNull();

			await userEvent.hover(trigger);

			await expect.poll(tooltip).not.toBeNull();
			expect(trigger.hasAttribute('aria-describedby')).toBe(false);
		});
	});

	describe('placement', () => {
		it.each(['top', 'right', 'bottom', 'left'] as const)(
			'places the content on the %s side',
			async (placement) => {
				const { container } = render(BoundTooltip, { props: { openDelay: 0, placement } });

				button(container).focus();

				await expect.poll(() => tooltip()?.getAttribute('data-side')).toBe(placement);
			}
		);
	});

	describe('binding', () => {
		it('two-way: the owner follows the tooltip open and closed', async () => {
			const { container } = render(BoundTooltip, { props: { openDelay: 0 } });
			expect(owner(container)).toBe('false');

			button(container).focus();
			await expect.poll(() => owner(container)).toBe('true');

			await userEvent.keyboard('{Escape}');
			await expect.poll(() => owner(container)).toBe('false');
		});

		it('two-way: opens from undefined state and writes the result back', async () => {
			const { container } = render(UndefinedTooltip);
			expect(owner(container)).toBe('undefined');

			button(container).focus();

			await expect.poll(() => owner(container)).toBe('true');
			expect(tooltip()).not.toBeNull();
		});

		it.each([
			{ accept: false, opens: false },
			{ accept: true, opens: true }
		])('controlled: accept=$accept, opens=$opens', async ({ accept, opens }) => {
			const { container } = render(ControlledTooltip, { props: { accept } });

			button(container).focus();
			await settle();

			expect(owner(container)).toBe(String(opens));
			expect(tooltip() !== null).toBe(opens);
		});
	});
});
