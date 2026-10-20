import type { ComponentProps } from 'svelte';

import { describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { userEvent } from 'vitest/browser';

import { borderColor, colorOf as colorOfUtility } from '../../__tests__/computed-style.ts';
import GroupedInput from './GroupedInput.svelte';

const pointerDown = (element: Element) => {
	const event = new PointerEvent('pointerdown', { bubbles: true, cancelable: true });
	element.dispatchEvent(event);
	return event;
};

const colorOf = (utility: string) => colorOfUtility(utility, 'borderTopColor');

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
	it('renders a div around its children', () => {
		const { group, input, suffix } = setup();
		expect(group.tagName).toBe('DIV');
		expect(group.contains(input)).toBe(true);
		expect(group.contains(suffix)).toBe(true);
	});

	it('puts the frame on the group and leaves the input borderless', () => {
		const { group, input } = setup();
		expect(group.classList.contains('rounded-sm')).toBe(true);
		expect(group.classList.contains('border')).toBe(true);
		expect(input.classList.contains('border-0')).toBe(true);
		expect(input.classList.contains('rounded')).toBe(false);
	});

	it('carries the has- variants that restyle the group from its input', () => {
		const { group } = setup();
		for (const variant of [
			'has-[input:disabled]:cursor-not-allowed',
			'has-[input:disabled]:border-transparent',
			'has-[input:disabled]:bg-disabled-light',
			'has-[input[readonly]]:border-transparent',
			'has-[input[readonly]]:bg-light',
			'has-[input[data-state=error]:not(:disabled):not([readonly])]:border-danger-dark',
			'has-[input[data-state=warn]:not(:disabled):not([readonly])]:border-warning-bright'
		]) {
			expect(group.classList.contains(variant), variant).toBe(true);
		}
	});

	it('merges a consumer class with its own', () => {
		const { group } = setup({ groupClass: 'w-64' });
		expect(group.classList.contains('w-64')).toBe(true);
		expect(group.classList.contains('rounded-sm')).toBe(true);
	});

	it('leaves a disabled inner input disabled', () => {
		const { input } = setup({ disabled: true });
		expect(input.disabled).toBe(true);
	});

	it('focuses the input when non-interactive content is pressed', async () => {
		const { input, suffix } = setup();
		await userEvent.click(suffix);
		expect(document.activeElement).toBe(input);
	});

	it('focuses the input when the group padding is pressed', async () => {
		const { group, input } = setup();
		await userEvent.click(group, { position: { x: 2, y: 2 } });
		expect(document.activeElement).toBe(input);
	});

	it('cancels the pointer-down so focus does not land on the group', () => {
		const { suffix } = setup();
		expect(pointerDown(suffix).defaultPrevented).toBe(true);
	});

	it('leaves interactive content alone', () => {
		const { input, action } = setup();
		expect(pointerDown(action).defaultPrevented).toBe(false);
		expect(document.activeElement).not.toBe(input);
	});

	it('leaves the input itself alone', () => {
		const { input } = setup();
		expect(pointerDown(input).defaultPrevented).toBe(false);
	});

	it('calls a consumer onpointerdown first and honors its preventDefault', () => {
		const onpointerdown = vi.fn((event: PointerEvent) => event.preventDefault());
		const { input, suffix } = setup({ onpointerdown });
		pointerDown(suffix);
		expect(onpointerdown).toHaveBeenCalledOnce();
		expect(document.activeElement).not.toBe(input);
	});

	describe('styles', () => {
		it('has the Tailwind theme loaded, so the color checks can tell the states apart', () => {
			const colors = new Set(
				['border-light', 'border-danger-dark', 'border-warning-bright', 'border-transparent'].map(
					colorOf
				)
			);
			expect(colors.size).toBe(4);
		});

		it('darkens the default border on hover', async () => {
			const { group } = setup();
			await userEvent.hover(group);
			expect(borderColor(group)).toBe(colorOf('border-gray-6'));
		});

		it('shows the focus ring on the group and does not darken the border past hover while the input is focused', async () => {
			const { group, input } = setup();
			await userEvent.click(input);
			expect(getComputedStyle(group).outlineWidth).toBe('2px');
			expect(group.classList.contains('has-[:focus-visible]:outline-2')).toBe(true);
			expect(borderColor(group)).toBe(colorOf('border-gray-6'));
		});

		it('turns the border transparent for a disabled input, even on hover', async () => {
			const { group } = setup({ disabled: true });
			await userEvent.hover(group);
			expect(borderColor(group)).toBe(colorOf('border-transparent'));
			expect(getComputedStyle(group).cursor).toBe('not-allowed');
		});

		it('turns the border transparent for a readonly input, even when focused', async () => {
			const { group, input } = setup({ readonly: true });
			await userEvent.click(input);
			expect(borderColor(group)).toBe(colorOf('border-transparent'));
		});

		it('keeps the disabled border when the state is also error', () => {
			const { group } = setup({ disabled: true, state: 'error' });
			expect(borderColor(group)).toBe(colorOf('border-transparent'));
		});

		it('keeps the readonly border when the state is also error', () => {
			const { group } = setup({ readonly: true, state: 'error' });
			expect(borderColor(group)).toBe(colorOf('border-transparent'));
		});

		it('keeps the default border when only a trailing button is disabled', () => {
			const { group } = setup({ actionDisabled: true });
			expect(borderColor(group)).toBe(colorOf('border-light'));
			expect(getComputedStyle(group).cursor).not.toBe('not-allowed');
		});

		it('colors the border danger for an error input, even on hover', async () => {
			const { group } = setup({ state: 'error' });
			await userEvent.hover(group);
			expect(borderColor(group)).toBe(colorOf('border-danger-dark'));
		});

		it('colors the border warning for a warn input while focused', async () => {
			const { group, input } = setup({ state: 'warn' });
			await userEvent.click(input);
			expect(borderColor(group)).toBe(colorOf('border-warning-bright'));
		});

		it('uses the default border for an input with no state', () => {
			const { group } = setup();
			expect(borderColor(group)).toBe(colorOf('border-light'));
		});
	});
});
