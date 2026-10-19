import { describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { userEvent } from 'vitest/browser';

import NumberInput from '../NumberInput.svelte';
import BoundNumberInput from './BoundNumberInput.svelte';
import ControlledNumberInput from './ControlledNumberInput.svelte';

describe('NumberInput', () => {
	it('renders a native number input with the given value', () => {
		const { container } = render(NumberInput, { props: { value: 5 } });
		const input = container.querySelector('input');
		expect(input?.getAttribute('type')).toBe('number');
		expect(input?.value).toBe('5');
	});

	it('marks aria-invalid in the error state', () => {
		const { container } = render(NumberInput, { props: { value: 1, state: 'error' } });
		expect(container.querySelector('input')?.getAttribute('aria-invalid')).toBe('true');
	});

	it('renders the input as the only element', () => {
		const { container } = render(NumberInput, { props: {} });
		expect(container.children).toHaveLength(1);
		expect(container.firstElementChild?.tagName).toBe('INPUT');
	});

	it('puts a passed class on the input and leaves width to the consumer', () => {
		const { container } = render(NumberInput, { props: { class: 'w-24' } });
		const classes = container.querySelector('input')!.classList;
		expect(classes.contains('w-24')).toBe(true);
		expect(classes.contains('w-full')).toBe(false);
	});

	it('sets data-state in the error state and omits it for none', () => {
		const { container: errored } = render(NumberInput, { props: { state: 'error' } });
		const { container: plain } = render(NumberInput, { props: { state: 'none' } });
		expect(errored.querySelector('input')?.getAttribute('data-state')).toBe('error');
		expect(plain.querySelector('input')?.hasAttribute('data-state')).toBe(false);
	});

	it('disables the native input', () => {
		const { container } = render(NumberInput, { props: { disabled: true } });
		expect(container.querySelector('input')?.disabled).toBe(true);
	});

	it('forwards min, max and step to the native input', () => {
		const { container } = render(NumberInput, { props: { min: 0, max: 10, step: 2 } });
		const input = container.querySelector('input')!;
		expect(input.getAttribute('min')).toBe('0');
		expect(input.getAttribute('max')).toBe('10');
		expect(input.getAttribute('step')).toBe('2');
	});

	it('steps the value and forwards it on ArrowUp', async () => {
		let value = Number.NaN;
		const { container } = render(NumberInput, {
			props: { value: 5, step: 1, oninput: (event) => (value = event.currentTarget.valueAsNumber) }
		});
		const input = container.querySelector('input')!;
		await userEvent.click(input);
		await userEvent.keyboard('{ArrowUp}');
		await vi.waitFor(() => expect(input.value).toBe('6'));
		expect(value).toBe(6);
	});

	it('reports an empty field as NaN', async () => {
		let value = 0;
		const { container } = render(NumberInput, {
			props: { value: 7, oninput: (event) => (value = event.currentTarget.valueAsNumber) }
		});
		const input = container.querySelector('input')!;
		await userEvent.click(input);
		await userEvent.keyboard('{Backspace}');
		await vi.waitFor(() => expect(input.value).toBe(''));
		expect(value).toBeNaN();
	});

	it('two-way: bind:value keeps the owner in sync', async () => {
		const { container } = render(BoundNumberInput, { props: {} });
		const input = container.querySelector('input')!;
		await userEvent.click(input);
		await userEvent.keyboard('42');
		expect(container.querySelector('[data-testid="owner"]')?.textContent).toBe('42');
	});

	it('controlled: a function-binding setter can veto typing', async () => {
		const { container } = render(ControlledNumberInput, { props: { accept: false } });
		const input = container.querySelector('input')!;
		await userEvent.click(input);
		await userEvent.keyboard('7');
		expect(input.value).toBe('');
		expect(container.querySelector('[data-testid="owner"]')?.textContent).toBe('');
	});
});
