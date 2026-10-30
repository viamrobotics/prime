import type { ComponentProps } from 'svelte';

import { describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { userEvent } from 'vitest/browser';

import { borderColor, colorOf } from '../../__tests__/computed-style.ts';
import GroupedInput from './GroupedInput.svelte';

const pointerDown = (element: Element) => {
	const event = new PointerEvent('pointerdown', { bubbles: true, cancelable: true });
	element.dispatchEvent(event);
	return event;
};

const borderOf = (utility: string) => colorOf(utility, 'borderTopColor');

type Parts = ReturnType<typeof setup>;

const interactions = {
	rest: async () => {},
	hover: ({ group }: Parts) => userEvent.hover(group),
	focus: ({ input }: Parts) => userEvent.click(input)
};

const setup = (props: ComponentProps<typeof GroupedInput> = {}) => {
	const { container } = render(GroupedInput, { props });
	return {
		group: container.querySelector<HTMLElement>('[data-testid="group"]')!,
		input: container.querySelector('input')!,
		suffix: container.querySelector<HTMLElement>('[data-testid="suffix"]')!,
		action: container.querySelector<HTMLElement>('[data-testid="action"]')!
	};
};

describe('Input.Group', () => {
	it('wears the frame itself and leaves the input inside borderless', () => {
		const { group, input } = setup({ groupClass: 'w-64' });

		expect(getComputedStyle(group).borderTopWidth).toBe('1px');
		expect(getComputedStyle(input).borderTopWidth).toBe('0px');
		expect(group.classList.contains('w-64'), 'consumer class lands on the group').toBe(true);
	});

	it('focuses the input when non-interactive content is pressed, without focusing the group', async () => {
		const { input, suffix } = setup();

		await userEvent.click(suffix);

		expect(document.activeElement).toBe(input);
		expect(pointerDown(suffix).defaultPrevented, 'pointer-down canceled').toBe(true);
	});

	it('focuses the input when the group padding is pressed', async () => {
		const { group, input } = setup();

		await userEvent.click(group, { position: { x: 2, y: 2 } });

		expect(document.activeElement).toBe(input);
	});

	it('leaves interactive content and the input itself alone', () => {
		const { input, action } = setup();

		expect(pointerDown(action).defaultPrevented, 'button press passes through').toBe(false);
		expect(pointerDown(input).defaultPrevented, 'input press passes through').toBe(false);
		expect(document.activeElement).not.toBe(input);
	});

	it('runs a consumer onpointerdown first and honors its preventDefault', () => {
		const onpointerdown = vi.fn((event: PointerEvent) => event.preventDefault());
		const { input, suffix } = setup({ onpointerdown });

		pointerDown(suffix);

		expect(onpointerdown).toHaveBeenCalledOnce();
		expect(document.activeElement).not.toBe(input);
	});

	describe('border color', () => {
		it('tells the four border tokens apart, so the cases below cannot pass vacuously', () => {
			const colors = [
				'border-light',
				'border-danger-dark',
				'border-warning-dark',
				'border-transparent'
			];

			expect(new Set(colors.map(borderOf)).size).toBe(colors.length);
		});

		it.each([
			{ name: 'light at rest', props: {}, interact: 'rest', border: 'border-light' },
			{ name: 'gray-6 on hover', props: {}, interact: 'hover', border: 'border-gray-6' },
			{
				name: 'gray-6, not darker, while the input is focused',
				props: {},
				interact: 'focus',
				border: 'border-gray-6'
			},
			{
				name: 'transparent for a disabled input, even on hover',
				props: { disabled: true },
				interact: 'hover',
				border: 'border-transparent'
			},
			{
				name: 'transparent for a readonly input, even when focused',
				props: { readonly: true },
				interact: 'focus',
				border: 'border-transparent'
			},
			{
				name: 'transparent when disabled wins over error',
				props: { disabled: true, state: 'error' },
				interact: 'rest',
				border: 'border-transparent'
			},
			{
				name: 'transparent when readonly wins over error',
				props: { readonly: true, state: 'error' },
				interact: 'rest',
				border: 'border-transparent'
			},
			{
				name: 'light when only a trailing button is disabled',
				props: { actionDisabled: true },
				interact: 'rest',
				border: 'border-light'
			},
			{
				name: 'danger for an error input, even on hover',
				props: { state: 'error' },
				interact: 'hover',
				border: 'border-danger-dark'
			},
			{
				name: 'warning for a warn input while focused',
				props: { state: 'warn' },
				interact: 'focus',
				border: 'border-warning-dark'
			}
		] as const)('is $name', async ({ props, interact, border }) => {
			const parts = setup(props);

			await interactions[interact](parts);

			expect(borderColor(parts.group)).toBe(borderOf(border));
		});
	});

	it('shows the focus ring on the group while the input is focused', async () => {
		const { group, input } = setup();

		await userEvent.click(input);

		expect(getComputedStyle(group).outlineWidth).toBe('2px');
	});

	it('shows the not-allowed cursor for a disabled input and not for a disabled trailing button', () => {
		const disabledInput = setup({ disabled: true });
		const disabledAction = setup({ actionDisabled: true });

		expect(getComputedStyle(disabledInput.group).cursor).toBe('not-allowed');
		expect(getComputedStyle(disabledAction.group).cursor).not.toBe('not-allowed');
	});
});
