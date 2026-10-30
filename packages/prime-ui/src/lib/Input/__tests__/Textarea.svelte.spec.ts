import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { userEvent } from 'vitest/browser';

import { borderColor, colorOf } from '../../__tests__/computed-style.ts';
import Textarea from '../Textarea.svelte';
import BoundTextarea from './BoundTextarea.svelte';
import ControlledTextarea from './ControlledTextarea.svelte';
import UndefinedTextarea from './UndefinedTextarea.svelte';

const textarea = (container: Element) => container.querySelector('textarea')!;
const owner = (container: Element) => container.querySelector('[data-testid="owner"]')?.textContent;

describe('Textarea', () => {
	it('renders one native textarea wearing the input class with three rows by default', () => {
		const { container } = render(Textarea);

		expect(container.children).toHaveLength(1);
		expect(textarea(container).classList.contains('input')).toBe(true);
		expect(textarea(container).rows).toBe(3);
	});

	it('takes the consumer rows', () => {
		const { container } = render(Textarea, { props: { rows: 6 } });

		expect(textarea(container).rows).toBe(6);
	});

	it('sizes to its content', () => {
		const { container } = render(Textarea);

		expect(getComputedStyle(textarea(container)).fieldSizing).toBe('content');
	});

	it('two-way: typing updates the owner and clearing yields an empty string', async () => {
		const { container } = render(UndefinedTextarea);

		await userEvent.click(textarea(container));
		await userEvent.keyboard('hi');
		expect(owner(container), 'after typing').toBe('"hi"');

		await userEvent.keyboard('{Backspace}{Backspace}');
		expect(owner(container), 'after clearing').toBe('""');
	});

	it('two-way: bind:value keeps the owner in sync', async () => {
		const { container } = render(BoundTextarea);

		await userEvent.click(textarea(container));
		await userEvent.keyboard('a{Enter}b');

		expect(owner(container)).toBe('a\nb');
	});

	it.each([
		{ accept: true, shown: 'hi' },
		{ accept: false, shown: '' }
	])('controlled: accept $accept leaves the value $shown', async ({ accept, shown }) => {
		const { container } = render(ControlledTextarea, { props: { accept } });

		await userEvent.click(textarea(container));
		await userEvent.keyboard('hi');

		expect(textarea(container).value).toBe(shown);
		expect(owner(container)).toBe(shown);
	});

	it.each([
		{ prop: 'disabled', read: (el: HTMLTextAreaElement) => el.disabled },
		{ prop: 'readonly', read: (el: HTMLTextAreaElement) => el.readOnly },
		{ prop: 'required', read: (el: HTMLTextAreaElement) => el.required }
	])('$prop lands as a native attribute', ({ prop, read }) => {
		const { container } = render(BoundTextarea, { props: { [prop]: true } });

		expect(read(textarea(container))).toBe(true);
	});

	it('takes the danger border and aria-invalid in the error state', () => {
		const { container } = render(BoundTextarea, { props: { state: 'error' } });

		expect(textarea(container).getAttribute('aria-invalid')).toBe('true');
		expect(borderColor(textarea(container))).toBe(colorOf('border-danger-dark', 'borderTopColor'));
	});

	it('forwards native handlers such as oninput', async () => {
		let typed = '';
		const { container } = render(Textarea, {
			props: { oninput: (event) => (typed = event.currentTarget.value) }
		});

		await userEvent.click(textarea(container));
		await userEvent.keyboard('hi');

		expect(typed).toBe('hi');
	});
});
