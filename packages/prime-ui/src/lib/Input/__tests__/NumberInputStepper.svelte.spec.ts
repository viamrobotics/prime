import type { ComponentProps } from 'svelte';

import { describe, expect, it, onTestFinished, vi } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { userEvent } from 'vitest/browser';

import '../../../../test/tailwind.css';
import NumberInput from '../NumberInput.svelte';
import ControlledNumberInput from './fixtures/ControlledNumberInput.svelte';
import FieldsetNumberInput from './fixtures/FieldsetNumberInput.svelte';
import GroupedNumberInput from './fixtures/GroupedNumberInput.svelte';
import TallTrailingNumberInput from './fixtures/TallTrailingNumberInput.svelte';

type Direction = 'up' | 'down';

const input = (container: Element) => container.querySelector('input')!;
const stepper = (container: Element) =>
	container.querySelector<HTMLElement>('[data-number-stepper]')!;
const stepButton = (container: Element, direction: Direction) =>
	container.querySelector<HTMLButtonElement>(`[data-number-stepper] [data-step="${direction}"]`)!;

const hold = (button: HTMLButtonElement) =>
	button.dispatchEvent(
		new PointerEvent('pointerdown', { bubbles: true, cancelable: true, button: 0 })
	);

const press = (button: HTMLButtonElement) => {
	hold(button);
	window.dispatchEvent(new PointerEvent('pointerup'));
};

const renderRecorded = (props: Omit<ComponentProps<typeof NumberInput>, 'aria-label'> = {}) => {
	const inputs: string[] = [];
	const changes: string[] = [];
	const screen = render(NumberInput, {
		props: {
			'aria-label': 'Quantity',
			...props,
			oninput: (event) => inputs.push(event.currentTarget.value),
			onchange: (event) => changes.push(event.currentTarget.value)
		}
	});
	return { ...screen, inputs, changes };
};

const useFakeTimers = () => {
	vi.useFakeTimers();
	onTestFinished(() => {
		vi.useRealTimers();
	});
};

const stepperInset = (container: Element) => {
	const frame = stepper(container).parentElement!;
	const border = Number.parseFloat(getComputedStyle(frame).borderTopWidth);
	const outer = frame.getBoundingClientRect();
	const box = stepper(container).getBoundingClientRect();
	return {
		right: outer.right - border - box.right,
		top: box.top - outer.top - border,
		bottom: outer.bottom - border - box.bottom
	};
};

describe('NumberInput.Stepper', () => {
	it.each([
		{ direction: 'up', expected: '5.5' },
		{ direction: 'down', expected: '4.5' }
	] as const)('steps $direction by one step', ({ direction, expected }) => {
		const { container } = renderRecorded({ value: 5, step: 0.5 });

		press(stepButton(container, direction));

		expect(input(container).value).toBe(expected);
	});

	it('fires input and then change on each step, as a native spin button does', () => {
		const { container, inputs, changes } = renderRecorded({ value: 2 });

		press(stepButton(container, 'up'));
		press(stepButton(container, 'up'));

		expect(inputs).toEqual(['3', '4']);
		expect(changes).toEqual(['3', '4']);
	});

	it.each([
		{ direction: 'up', value: 9, bounds: { max: 10 }, expected: '10' },
		{ direction: 'down', value: 1, bounds: { min: 0 }, expected: '0' }
	] as const)(
		'stops $direction at the bound and fires nothing past it',
		({ direction, value, bounds, expected }) => {
			const { container, inputs } = renderRecorded({ value, ...bounds });

			press(stepButton(container, direction));
			press(stepButton(container, direction));

			expect(input(container).value).toBe(expected);
			expect(inputs).toEqual([expected]);
		}
	);

	it('steps by 1 under step="any"', () => {
		const { container } = renderRecorded({ value: 2, step: 'any' });

		press(stepButton(container, 'up'));

		expect(input(container).value).toBe('3');
		expect(input(container).getAttribute('step')).toBe('any');
	});

	it('writes the stepped number to a bound value', async () => {
		const { container } = render(GroupedNumberInput, { props: { value: 4 } });

		press(stepButton(container, 'up'));

		await vi.waitFor(() => expect(input(container).value).toBe('5'));
	});

	it.each([
		{ mode: 'accepts', accept: true, shown: '1' },
		{ mode: 'vetoes', accept: false, shown: '' }
	])('a function-binding setter $mode a step', async ({ accept, shown }) => {
		const { container } = render(ControlledNumberInput, { props: { accept } });

		press(stepButton(container, 'up'));

		await vi.waitFor(() => expect(input(container).value).toBe(shown));
		expect(container.querySelector('[data-testid="owner"]')?.textContent).toBe(shown);
	});

	it('repeats every 60 ms once a press is held past 400 ms', () => {
		useFakeTimers();
		const { container, inputs } = renderRecorded({ value: 5 });

		hold(stepButton(container, 'up'));
		vi.advanceTimersByTime(399);
		expect(inputs, 'one step before the delay').toEqual(['6']);

		vi.advanceTimersByTime(121);
		expect(inputs, 'repeats at 460 and 520 ms').toEqual(['6', '7', '8']);
	});

	it.each([
		{ end: 'pointerup', event: () => new PointerEvent('pointerup') },
		{ end: 'pointercancel', event: () => new PointerEvent('pointercancel') },
		{ end: 'window blur', event: () => new FocusEvent('blur') }
	])('stops repeating on $end', ({ event }) => {
		useFakeTimers();
		const { container, inputs } = renderRecorded({ value: 5 });
		hold(stepButton(container, 'up'));
		vi.advanceTimersByTime(460);

		window.dispatchEvent(event());
		vi.advanceTimersByTime(1000);

		expect(inputs).toEqual(['6', '7']);
	});

	it.each([
		{ lock: 'disabled', props: { disabled: true } },
		{ lock: 'readonly', props: { readonly: true } }
	])('hides and ignores a press while the input is $lock', ({ props }) => {
		const { container, inputs } = renderRecorded({ value: 5, ...props });

		press(stepButton(container, 'up'));

		expect(getComputedStyle(stepper(container)).visibility).toBe('hidden');
		expect(input(container).value).toBe('5');
		expect(inputs).toEqual([]);
	});

	it('hides and ignores a press inside a disabled fieldset', () => {
		const { container } = render(FieldsetNumberInput);

		press(stepButton(container, 'up'));

		expect(getComputedStyle(stepper(container)).visibility).toBe('hidden');
		expect(input(container).value).toBe('3');
	});

	it('is hidden from assistive technology and takes no tab stop', async () => {
		const { container } = renderRecorded({ value: 5 });

		expect(stepper(container).closest('[aria-hidden="true"]')).toBe(stepper(container));
		expect(
			[...stepper(container).querySelectorAll('button')].map((button) => button.tabIndex)
		).toEqual([-1, -1]);

		input(container).focus();
		await userEvent.tab();
		expect(document.activeElement?.closest('[data-number-stepper]')).toBeNull();
	});

	it('keeps focus on the input after a press', async () => {
		const { container } = renderRecorded({ value: 5 });
		input(container).focus();

		await userEvent.click(stepButton(container, 'up'));

		expect(input(container).value).toBe('6');
		expect(document.activeElement).toBe(input(container));
	});

	it('shows while the frame is hovered and hides at rest', async () => {
		const { container } = renderRecorded({ value: 5 });

		expect(getComputedStyle(stepper(container)).opacity).toBe('0');

		await userEvent.hover(input(container));
		expect(getComputedStyle(stepper(container)).opacity).toBe('1');
	});

	it('renders one stepper on its own and hides the native spin buttons', () => {
		const { container } = renderRecorded({ value: 5 });

		expect(container.querySelectorAll('[data-number-stepper]')).toHaveLength(1);
		expect(getComputedStyle(input(container)).appearance).toBe('textfield');
	});

	it('renders the stepper last in an Input.Group that places none, after the suffix, hiding the native spin buttons', () => {
		const { container } = render(GroupedNumberInput, { props: { hasStepper: false } });
		const group = container.querySelector('[data-testid="group"]')!;

		press(stepButton(container, 'up'));

		expect(container.querySelectorAll('[data-number-stepper]')).toHaveLength(1);
		expect(group.lastElementChild).toHaveAttribute('data-number-stepper');
		expect(getComputedStyle(input(container)).appearance).toBe('textfield');
		expect(input(container).value).toBe('2');
	});

	it('renders one stepper when the group places it', () => {
		const { container } = render(GroupedNumberInput);

		expect(container.querySelectorAll('[data-number-stepper]')).toHaveLength(1);
	});

	it('steps the grouped input from a stepper placed after a suffix, right of the suffix', () => {
		const { container } = render(GroupedNumberInput);
		const suffix = container.querySelector('[data-testid="suffix"]')!;

		press(stepButton(container, 'up'));

		expect(container.querySelectorAll('[data-number-stepper]')).toHaveLength(1);
		expect(input(container).value).toBe('2');
		expect(stepper(container).getBoundingClientRect().left).toBeGreaterThanOrEqual(
			suffix.getBoundingClientRect().right
		);
	});

	it.each([
		{ frame: 'standalone', renderFrame: () => renderRecorded({ value: 5 }) },
		{
			frame: 'compact group',
			renderFrame: () => render(GroupedNumberInput, { props: { groupClass: 'input-compact' } })
		},
		{ frame: 'taller compact group', renderFrame: () => render(TallTrailingNumberInput) }
	])('fills the $frame frame flush right at full height', ({ renderFrame }) => {
		const { container } = renderFrame();

		expect(stepperInset(container)).toEqual({ right: 0, top: 0, bottom: 0 });
	});
});
