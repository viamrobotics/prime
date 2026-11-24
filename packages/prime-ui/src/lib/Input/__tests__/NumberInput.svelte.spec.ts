import { describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { userEvent } from 'vitest/browser';

import '../../../../test/tailwind.css';
import NumberInput from '../NumberInput.svelte';
import BoundNumberInput from './fixtures/BoundNumberInput.svelte';
import ControlledNumberInput from './fixtures/ControlledNumberInput.svelte';
import UndefinedNumberInput from './fixtures/UndefinedNumberInput.svelte';

const input = (container: Element) => container.querySelector('input')!;
const owner = (container: Element) => container.querySelector('[data-testid="owner"]')?.textContent;

describe('NumberInput', () => {
	it('renders one bare number input carrying its value', () => {
		const { container } = render(NumberInput, { props: { 'aria-label': 'Quantity', value: 5 } });

		expect(container.children).toHaveLength(1);
		expect(input(container).type).toBe('number');
		expect(input(container).value).toBe('5');
	});

	it('takes its width from a consumer class', () => {
		const { container } = render(NumberInput, {
			props: { 'aria-label': 'Quantity', class: 'w-24' }
		});

		expect(getComputedStyle(input(container)).width).toBe('96px');
	});

	it.each([
		{ state: 'error', dataState: 'error', invalid: 'true' },
		{ state: 'none', dataState: null, invalid: null }
	] as const)(
		'state $state sets data-field-state $dataState and aria-invalid $invalid',
		({ state, dataState, invalid }) => {
			const { container } = render(NumberInput, { props: { 'aria-label': 'Quantity', state } });

			expect(input(container).getAttribute('data-field-state')).toBe(dataState);
			expect(input(container).getAttribute('aria-invalid')).toBe(invalid);
		}
	);

	it('disables the native input', () => {
		const { container } = render(NumberInput, {
			props: { 'aria-label': 'Quantity', disabled: true }
		});

		expect(input(container).disabled, 'native disabled attribute').toBe(true);
	});

	it('forwards min, max, and a numeric step', () => {
		const { container } = render(NumberInput, {
			props: { 'aria-label': 'Quantity', min: 0, max: 10, step: 2 }
		});

		expect(input(container).min).toBe('0');
		expect(input(container).max).toBe('10');
		expect(input(container).step).toBe('2');
	});

	it('forwards step="any" so a decimal passes constraint validation', () => {
		const { container } = render(NumberInput, {
			props: { 'aria-label': 'Quantity', step: 'any', value: 0.125 }
		});

		expect(input(container).step).toBe('any');
		expect(input(container).validity.stepMismatch, 'no step mismatch').toBe(false);
	});

	it("two-way: the input shows the owner's number", () => {
		const { container } = render(BoundNumberInput);

		expect(input(container).value).toBe('3');
	});

	it('two-way: typing writes a number, not a string, to the owner', async () => {
		const { container } = render(BoundNumberInput);

		await userEvent.fill(input(container), '42');

		expect(owner(container)).toBe('42');
	});

	it('two-way: typing updates an owner that starts undefined, and clearing binds undefined, not NaN or an empty string', async () => {
		const { container } = render(UndefinedNumberInput);

		await userEvent.click(input(container));
		await userEvent.keyboard('42');
		expect(owner(container), 'after typing').toBe('42');

		await userEvent.keyboard('{Backspace}{Backspace}');
		await vi.waitFor(() => expect(input(container).value).toBe(''));
		expect(owner(container), 'after clearing').toBe('undefined');
	});

	it.each([
		{ mode: 'accepts', accept: true, shown: '7' },
		{ mode: 'vetoes', accept: false, shown: '' }
	])('controlled: a function-binding setter $mode typing', async ({ accept, shown }) => {
		const { container } = render(ControlledNumberInput, { props: { accept } });

		await userEvent.click(input(container));
		await userEvent.keyboard('7');

		expect(input(container).value).toBe(shown);
		expect(owner(container)).toBe(shown);
	});
});
