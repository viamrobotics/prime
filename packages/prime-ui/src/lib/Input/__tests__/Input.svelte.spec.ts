import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { userEvent } from 'vitest/browser';

import { FieldStates } from '../../Field/state.ts';
import Input from '../Input.svelte';
import BoundInput from './BoundInput.svelte';
import ControlledInput from './ControlledInput.svelte';

describe('Input', () => {
	it('renders an input forwarding type, placeholder and value', () => {
		const { container } = render(Input, {
			props: { type: 'email', placeholder: 'you@viam.com', value: 'hi@viam.com' }
		});
		const input = container.querySelector('input');
		expect(input?.getAttribute('type')).toBe('email');
		expect(input?.getAttribute('placeholder')).toBe('you@viam.com');
		expect(input?.value).toBe('hi@viam.com');
	});

	it('marks aria-invalid in the error state', () => {
		const { container } = render(Input, { props: { state: FieldStates.Error } });
		expect(container.querySelector('input')?.getAttribute('aria-invalid')).toBe('true');
	});

	it('renders the input as the only element', () => {
		const { container } = render(Input, { props: {} });
		expect(container.children).toHaveLength(1);
		expect(container.firstElementChild?.tagName).toBe('INPUT');
	});

	it('puts a passed class on the input and keeps its own', () => {
		const { container } = render(Input, { props: { class: 'w-64' } });
		const classes = container.querySelector('input')!.classList;
		expect(classes.contains('w-64')).toBe(true);
		expect(classes.contains('rounded-sm')).toBe(true);
		expect(classes.contains('focus-visible:outline-2')).toBe(true);
	});

	it('leaves width to the consumer', () => {
		const { container } = render(Input, { props: {} });
		expect(container.querySelector('input')!.classList.contains('w-full')).toBe(false);
	});

	it('sets data-state in the error state', () => {
		const { container } = render(Input, { props: { state: FieldStates.Error } });
		expect(container.querySelector('input')?.getAttribute('data-state')).toBe('error');
	});

	it('sets data-state in the warn state', () => {
		const { container } = render(Input, { props: { state: FieldStates.Warn } });
		expect(container.querySelector('input')?.getAttribute('data-state')).toBe('warn');
	});

	it('omits data-state and aria-invalid in the none state', () => {
		const { container } = render(Input, { props: { state: FieldStates.None } });
		const input = container.querySelector('input')!;
		expect(input.hasAttribute('data-state')).toBe(false);
		expect(input.hasAttribute('aria-invalid')).toBe(false);
	});

	it('omits data-state when no state is given', () => {
		const { container } = render(Input, { props: {} });
		expect(container.querySelector('input')!.hasAttribute('data-state')).toBe(false);
	});

	it('uses the disabled background when disabled', () => {
		const { container } = render(Input, { props: { disabled: true } });
		expect(container.querySelector('input')!.classList.contains('bg-disabled-light')).toBe(true);
	});

	it('uses the readonly background and a transparent border when readonly', () => {
		const { container } = render(Input, { props: { readonly: true } });
		const input = container.querySelector('input')!;
		expect(input.readOnly).toBe(true);
		expect(input.classList.contains('bg-light')).toBe(true);
		expect(input.classList.contains('border-transparent')).toBe(true);
	});

	it('takes the error border from its state', () => {
		const { container } = render(Input, { props: { state: FieldStates.Error } });
		expect(container.querySelector('input')!.classList.contains('border-danger-dark')).toBe(true);
	});

	it('disables the underlying input', () => {
		const { container } = render(Input, { props: { disabled: true } });
		expect(container.querySelector('input')?.disabled).toBe(true);
	});

	it('forwards oninput to the native input', async () => {
		let value = '';
		const { container } = render(Input, {
			props: { oninput: (event) => (value = event.currentTarget.value) }
		});
		const input = container.querySelector('input')!;
		await userEvent.click(input);
		await userEvent.keyboard('hi');
		expect(value).toBe('hi');
	});

	it('forwards onblur to the native input', async () => {
		let value = '';
		const { container } = render(Input, {
			props: { onblur: (event) => (value = event.currentTarget.value) }
		});
		const input = container.querySelector('input')!;
		await userEvent.click(input);
		await userEvent.keyboard('bye');
		input.blur();
		expect(value).toBe('bye');
	});

	it('two-way: bind:value keeps the owner in sync', async () => {
		const { container } = render(BoundInput, { props: {} });
		const input = container.querySelector('input')!;
		await userEvent.click(input);
		await userEvent.keyboard('hi');
		expect(container.querySelector('[data-testid="owner"]')?.textContent).toBe('hi');
	});

	it('controlled: a function-binding setter can veto typing', async () => {
		const { container } = render(ControlledInput, { props: { accept: false } });
		const input = container.querySelector('input')!;
		await userEvent.click(input);
		await userEvent.keyboard('hi');
		expect(input.value).toBe('');
		expect(container.querySelector('[data-testid="owner"]')?.textContent).toBe('');
	});
});
