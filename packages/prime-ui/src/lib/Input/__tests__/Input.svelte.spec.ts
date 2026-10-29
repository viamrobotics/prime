import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { userEvent } from 'vitest/browser';

import { backgroundColor, borderColor, colorOf } from '../../__tests__/computed-style.ts';
import Input from '../Input.svelte';
import BoundInput from './BoundInput.svelte';
import ControlledInput from './ControlledInput.svelte';

const input = (container: Element) => container.querySelector('input')!;
const owner = (container: Element) => container.querySelector('[data-testid="owner"]')?.textContent;

describe('Input', () => {
	it('renders one bare input carrying the native attributes, its value, and a passed class', () => {
		const { container } = render(Input, {
			props: { type: 'email', placeholder: 'you@viam.com', value: 'hi@viam.com', class: 'w-64' }
		});

		expect(container.children).toHaveLength(1);
		expect(input(container).type).toBe('email');
		expect(input(container).placeholder).toBe('you@viam.com');
		expect(input(container).value).toBe('hi@viam.com');
		expect([...input(container).classList]).toEqual(expect.arrayContaining(['w-64', 'focus-ring']));
		expect(input(container).classList.contains('w-full'), 'no built-in width').toBe(false);
	});

	it.each([
		{ state: 'error', dataState: 'error', invalid: 'true' },
		{ state: 'warn', dataState: 'warn', invalid: null },
		{ state: 'info', dataState: 'info', invalid: null },
		{ state: 'none', dataState: null, invalid: null },
		{ state: undefined, dataState: null, invalid: null }
	] as const)(
		'state $state sets data-field-state $dataState and aria-invalid $invalid',
		({ state, dataState, invalid }) => {
			const { container } = render(Input, { props: { state } });

			expect(input(container).getAttribute('data-field-state')).toBe(dataState);
			expect(input(container).getAttribute('aria-invalid')).toBe(invalid);
		}
	);

	it('takes the danger border in the error state', () => {
		const { container } = render(Input, { props: { state: 'error' } });

		expect(borderColor(input(container))).toBe(colorOf('border-danger-dark', 'borderTopColor'));
	});

	it('disables the input and paints the disabled background', () => {
		const { container } = render(Input, { props: { disabled: true } });

		expect(input(container).disabled, 'native disabled attribute').toBe(true);
		expect(backgroundColor(input(container))).toBe(colorOf('bg-disabled-light', 'backgroundColor'));
	});

	it('marks the input readonly with the muted background and no visible border', () => {
		const { container } = render(Input, { props: { readonly: true } });

		expect(input(container).readOnly, 'native readonly attribute').toBe(true);
		expect(backgroundColor(input(container))).toBe(colorOf('bg-light', 'backgroundColor'));
		expect(borderColor(input(container))).toBe(colorOf('border-transparent', 'borderTopColor'));
	});

	it('forwards native handlers such as oninput', async () => {
		let typed = '';
		const { container } = render(Input, {
			props: { oninput: (event) => (typed = event.currentTarget.value) }
		});

		await userEvent.click(input(container));
		await userEvent.keyboard('hi');

		expect(typed).toBe('hi');
	});

	it('two-way: bind:value keeps the owner in sync', async () => {
		const { container } = render(BoundInput);

		await userEvent.click(input(container));
		await userEvent.keyboard('hi');

		expect(owner(container)).toBe('hi');
	});

	it('controlled: a function-binding setter can veto typing', async () => {
		const { container } = render(ControlledInput, { props: { accept: false } });

		await userEvent.click(input(container));
		await userEvent.keyboard('hi');

		expect(input(container).value).toBe('');
		expect(owner(container)).toBe('');
	});
});
