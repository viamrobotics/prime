import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { userEvent } from 'vitest/browser';

import { backgroundColor, borderColor, colorOf } from '../../../../test/computed-style.ts';
import Input from '../Input.svelte';
import BoundInput from './fixtures/BoundInput.svelte';
import ControlledInput from './fixtures/ControlledInput.svelte';
import UndefinedInput from './fixtures/UndefinedInput.svelte';

const input = (container: Element) => container.querySelector('input')!;
const owner = (container: Element) => container.querySelector('[data-testid="owner"]')?.textContent;

describe('Input', () => {
	it('renders one bare input wearing the input class and carrying the native attributes and value', () => {
		const { container } = render(Input, {
			props: {
				'aria-label': 'Name',
				type: 'email',
				placeholder: 'you@viam.com',
				value: 'hi@viam.com'
			}
		});

		expect(container.children).toHaveLength(1);
		expect(input(container).classList).toContain('input');
		expect(input(container).type).toBe('email');
		expect(input(container).placeholder).toBe('you@viam.com');
		expect(input(container).value).toBe('hi@viam.com');
	});

	it('draws the shared focus ring on keyboard focus', async () => {
		const { container } = render(Input, { props: { 'aria-label': 'Name' } });

		await userEvent.click(container);
		await userEvent.tab();

		const field = input(container);
		expect(document.activeElement).toBe(field);
		expect(
			getComputedStyle(field).outlineStyle,
			'the keyboard-focused field draws an outline'
		).toBe('solid');
		expect(getComputedStyle(field).outlineWidth).toBe('2px');
		expect(getComputedStyle(field).outlineOffset).toBe('2px');
	});

	it('takes its width from a consumer class', () => {
		const { container } = render(Input, { props: { 'aria-label': 'Name', class: 'w-64' } });

		expect(getComputedStyle(input(container)).width).toBe('256px');
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
			const { container } = render(Input, { props: { 'aria-label': 'Name', state } });

			expect(input(container).getAttribute('data-field-state')).toBe(dataState);
			expect(input(container).getAttribute('aria-invalid')).toBe(invalid);
		}
	);

	it('takes the danger border in the error state', () => {
		const { container } = render(Input, { props: { 'aria-label': 'Name', state: 'error' } });

		expect(borderColor(input(container))).toBe(colorOf('border-danger-dark', 'borderTopColor'));
	});

	it('disables the input and paints the disabled background', () => {
		const { container } = render(Input, { props: { 'aria-label': 'Name', disabled: true } });

		expect(input(container).disabled, 'native disabled attribute').toBe(true);
		expect(backgroundColor(input(container))).toBe(colorOf('bg-disabled-light', 'backgroundColor'));
	});

	it('marks the input readonly with the muted background and no visible border', () => {
		const { container } = render(Input, { props: { 'aria-label': 'Name', readonly: true } });

		expect(input(container).readOnly, 'native readonly attribute').toBe(true);
		expect(backgroundColor(input(container))).toBe(colorOf('bg-light', 'backgroundColor'));
		expect(borderColor(input(container))).toBe(colorOf('border-transparent', 'borderTopColor'));
	});

	it('forwards native handlers such as oninput', async () => {
		let typed = '';
		const { container } = render(Input, {
			props: { 'aria-label': 'Name', oninput: (event) => (typed = event.currentTarget.value) }
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

	it('two-way: typing updates an owner that starts undefined, and clearing yields an empty string', async () => {
		const { container } = render(UndefinedInput);

		await userEvent.click(input(container));
		await userEvent.keyboard('hi');
		expect(owner(container), 'after typing').toBe('"hi"');

		await userEvent.keyboard('{Backspace}{Backspace}');
		expect(owner(container), 'after clearing').toBe('""');
	});

	it.each([
		{ mode: 'accepts', accept: true, shown: 'hi' },
		{ mode: 'vetoes', accept: false, shown: '' }
	])('controlled: a function-binding setter $mode typing', async ({ accept, shown }) => {
		const { container } = render(ControlledInput, { props: { accept } });

		await userEvent.click(input(container));
		await userEvent.keyboard('hi');

		expect(input(container).value).toBe(shown);
		expect(owner(container)).toBe(shown);
	});
});
