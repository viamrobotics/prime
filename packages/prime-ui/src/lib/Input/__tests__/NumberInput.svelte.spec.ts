import { describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { userEvent } from 'vitest/browser';

import NumberInput from '../NumberInput.svelte';
import BoundNumberInput from './BoundNumberInput.svelte';
import ControlledNumberInput from './ControlledNumberInput.svelte';

const input = (container: Element) => container.querySelector('input')!;
const owner = (container: Element) => container.querySelector('[data-testid="owner"]')?.textContent;

describe('NumberInput', () => {
	it('renders one bare number input carrying its value and a passed class', () => {
		const { container } = render(NumberInput, { props: { value: 5, class: 'w-24' } });

		expect(container.children).toHaveLength(1);
		expect(input(container).type).toBe('number');
		expect(input(container).value).toBe('5');
		expect(input(container).classList.contains('w-24'), 'consumer class lands on the input').toBe(
			true
		);
		expect(input(container).classList.contains('w-full'), 'no built-in width').toBe(false);
	});

	it.each([
		{ state: 'error', dataState: 'error', invalid: 'true' },
		{ state: 'none', dataState: null, invalid: null }
	] as const)(
		'state $state sets data-field-state $dataState and aria-invalid $invalid',
		({ state, dataState, invalid }) => {
			const { container } = render(NumberInput, { props: { state } });

			expect(input(container).getAttribute('data-field-state')).toBe(dataState);
			expect(input(container).getAttribute('aria-invalid')).toBe(invalid);
		}
	);

	it('disables the native input', () => {
		const { container } = render(NumberInput, { props: { disabled: true } });

		expect(input(container).disabled, 'native disabled attribute').toBe(true);
	});

	it('forwards min, max, and a numeric step', () => {
		const { container } = render(NumberInput, { props: { min: 0, max: 10, step: 2 } });

		expect(input(container).min).toBe('0');
		expect(input(container).max).toBe('10');
		expect(input(container).step).toBe('2');
	});

	it('forwards step="any" so a decimal passes constraint validation', () => {
		const { container } = render(NumberInput, { props: { step: 'any', value: 0.125 } });

		expect(input(container).step).toBe('any');
		expect(input(container).validity.stepMismatch, 'no step mismatch').toBe(false);
	});

	it('two-way: typing binds a number to the owner', async () => {
		const { container } = render(BoundNumberInput);

		await userEvent.click(input(container));
		await userEvent.keyboard('42');

		expect(owner(container)).toBe('42');
	});

	it('two-way: clearing the field binds undefined, not NaN or an empty string', async () => {
		const { container } = render(BoundNumberInput);
		await userEvent.click(input(container));
		await userEvent.keyboard('42');

		await userEvent.keyboard('{Backspace}{Backspace}');

		await vi.waitFor(() => expect(input(container).value).toBe(''));
		expect(owner(container)).toBe('undefined');
	});

	it('controlled: a function-binding setter can veto typing', async () => {
		const { container } = render(ControlledNumberInput, { props: { accept: false } });

		await userEvent.click(input(container));
		await userEvent.keyboard('7');

		expect(input(container).value).toBe('');
		expect(owner(container)).toBe('');
	});
});
