import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { userEvent } from 'vitest/browser';

import Input from '../Input.svelte';
import { InputStates } from '../state.ts';
import BoundInput from './BoundInput.svelte';
import ControlledInput from './ControlledInput.svelte';
import WithStateIcon from './WithStateIcon.svelte';

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
		const { container } = render(Input, { props: { state: InputStates.Error } });
		expect(container.querySelector('input')?.getAttribute('aria-invalid')).toBe('true');
	});

	it('renders no status icon itself — that is StateIcon', () => {
		const { container } = render(Input, { props: { state: InputStates.Error } });
		expect(container.querySelector('svg')).toBeFalsy();
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

describe('Input.StateIcon', () => {
	it('renders the matching icon for the provided state', () => {
		const { container } = render(WithStateIcon, { props: { state: InputStates.Error } });
		expect(container.querySelector('[data-testid="icon-alert-circle"]')).toBeTruthy();
	});

	it('renders nothing in the none state', () => {
		const { container } = render(WithStateIcon, { props: { state: InputStates.None } });
		expect(container.querySelector('svg')).toBeFalsy();
	});

	it('merges a passed class with the state color instead of replacing it', () => {
		const { container } = render(WithStateIcon, {
			props: { state: InputStates.Error, iconClass: 'size-6' }
		});
		const classes = container.querySelector('svg')?.getAttribute('class');
		expect(classes).toContain('size-6');
		expect(classes).toContain('text-danger-dark');
	});
});
