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
	it('renders one bare textarea wearing the input class', () => {
		const { container } = render(Textarea);

		expect(container.children).toHaveLength(1);
		expect(textarea(container).classList).toContain('input');
	});

	it('draws the shared focus ring on keyboard focus', async () => {
		const { container } = render(Textarea);

		await userEvent.click(container);
		await userEvent.tab();

		const field = textarea(container);
		expect(document.activeElement).toBe(field);
		expect(
			getComputedStyle(field).outlineStyle,
			'the keyboard-focused field draws an outline'
		).toBe('solid');
		expect(getComputedStyle(field).outlineWidth).toBe('2px');
		expect(getComputedStyle(field).outlineOffset).toBe('2px');
	});

	it.each([
		{ rows: undefined, shown: 3 },
		{ rows: 6, shown: 6 }
	])('rows $rows shows $shown rows', ({ rows, shown }) => {
		const { container } = render(Textarea, { props: { rows } });

		expect(textarea(container).rows).toBe(shown);
	});

	it('takes its width from a consumer class', () => {
		const { container } = render(Textarea, { props: { class: 'w-64' } });

		expect(getComputedStyle(textarea(container)).width).toBe('256px');
	});

	it('sizes to its content', () => {
		const { container } = render(Textarea);

		expect(getComputedStyle(textarea(container)).fieldSizing).toBe('content');
	});

	it('two-way: typing updates an owner that starts undefined, and clearing yields an empty string', async () => {
		const { container } = render(UndefinedTextarea);

		await userEvent.click(textarea(container));
		await userEvent.keyboard('hi');
		expect(owner(container), 'after typing').toBe('"hi"');

		await userEvent.keyboard('{Backspace}{Backspace}');
		expect(owner(container), 'after clearing').toBe('""');
	});

	it('two-way: typing across lines writes the text with its line break to the owner', async () => {
		const { container } = render(BoundTextarea);

		await userEvent.click(textarea(container));
		await userEvent.keyboard('a{Enter}b');

		expect(owner(container)).toBe('a\nb');
	});

	it.each([
		{ mode: 'accepts', accept: true, shown: 'hi' },
		{ mode: 'vetoes', accept: false, shown: '' }
	])('controlled: a function-binding setter $mode typing', async ({ accept, shown }) => {
		const { container } = render(ControlledTextarea, { props: { accept } });

		await userEvent.click(textarea(container));
		await userEvent.keyboard('hi');

		expect(textarea(container).value).toBe(shown);
		expect(owner(container)).toBe(shown);
	});

	it.each([
		{ prop: 'disabled', read: (element: HTMLTextAreaElement) => element.disabled },
		{ prop: 'readonly', read: (element: HTMLTextAreaElement) => element.readOnly },
		{ prop: 'required', read: (element: HTMLTextAreaElement) => element.required }
	])('$prop lands as a native attribute', ({ prop, read }) => {
		const { container } = render(BoundTextarea, { props: { [prop]: true } });

		expect(read(textarea(container)), `native ${prop} attribute`).toBe(true);
	});

	it.each([
		{ state: 'error', dataState: 'error', invalid: 'true', border: 'border-danger-dark' },
		{ state: 'warn', dataState: 'warn', invalid: null, border: 'border-warning-dark' }
	] as const)(
		'state $state sets aria-invalid $invalid and paints the $border border',
		({ state, dataState, invalid, border }) => {
			const { container } = render(Textarea, { props: { state } });

			expect(textarea(container).getAttribute('data-field-state')).toBe(dataState);
			expect(textarea(container).getAttribute('aria-invalid')).toBe(invalid);
			expect(borderColor(textarea(container))).toBe(colorOf(border, 'borderTopColor'));
		}
	);

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
