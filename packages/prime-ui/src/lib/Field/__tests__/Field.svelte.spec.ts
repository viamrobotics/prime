import { describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-svelte';

import { colorOf, textColor } from '../../__tests__/computed-style.ts';
import InputField from './InputField.svelte';
import TextareaField from './TextareaField.svelte';
import WidgetFields from './WidgetFields.svelte';

const parts = (container: Element) => {
	const label = container.querySelector('label')!;
	const input = container.querySelector('input')!;
	const hints = [...container.querySelectorAll('p')];
	return { label, input, hints };
};

describe('Field', () => {
	it('points the label at the control through a generated id', () => {
		const { label, input } = parts(render(InputField).container);

		expect(input.id).not.toBe('');
		expect(label.getAttribute('for')).toBe(input.id);
	});

	it('puts controlId on the control and id on the wrapper', () => {
		const { container } = render(InputField, {
			props: { controlId: 'email', id: 'email-field' }
		});

		expect(container.querySelector('input')?.id).toBe('email');
		expect(container.querySelector('div')?.id).toBe('email-field');
	});

	it('describes the control by every hint', async () => {
		const { container } = render(InputField, { props: { hintCount: 2 } });
		const { input, hints } = parts(container);

		await vi.waitFor(() => {
			expect(input.getAttribute('aria-describedby')).toBe(hints.map((hint) => hint.id).join(' '));
		});
	});

	it('leaves aria-describedby off when there are no hints', async () => {
		const { container } = render(InputField, { props: { hintCount: 0 } });

		await vi.waitFor(() => {
			expect(container.querySelector('input')?.getAttribute('aria-describedby')).toBeNull();
		});
	});

	it('cascades disabled to the label, control, and hint', () => {
		const { label, input, hints } = parts(
			render(InputField, { props: { disabled: true } }).container
		);

		expect(input.disabled, 'control disabled').toBe(true);
		expect(getComputedStyle(label).cursor).toBe('not-allowed');
		expect(textColor(hints[0]!)).toBe(colorOf('text-disabled', 'color'));
	});

	it('cascades required to the label and control', () => {
		const { label, input } = parts(render(InputField, { props: { required: true } }).container);

		expect(input.required, 'control required').toBe(true);
		expect(label.textContent).toContain('*');
	});

	it('cascades the error state to the control and hint', () => {
		const { input, hints } = parts(render(InputField, { props: { state: 'error' } }).container);

		expect(input.getAttribute('aria-invalid')).toBe('true');
		expect(textColor(hints[0]!)).toBe(colorOf('text-danger-dark', 'color'));
	});

	it('lets a prop on the part override the field', () => {
		const { label, input } = parts(
			render(InputField, { props: { controlId: 'email', inputId: 'custom' } }).container
		);

		expect(input.id).toBe('custom');
		expect(label.getAttribute('for')).toBe('email');
	});
});

describe('Field with a textarea', () => {
	const textareaParts = (container: Element) => ({
		label: container.querySelector('label')!,
		textarea: container.querySelector('textarea')!,
		hints: [...container.querySelectorAll('p')]
	});

	it('points the label at the textarea', () => {
		const { label, textarea } = textareaParts(render(TextareaField).container);

		expect(textarea.id).not.toBe('');
		expect(label.getAttribute('for')).toBe(textarea.id);
	});

	it('describes the textarea by every hint', async () => {
		const { textarea, hints } = textareaParts(
			render(TextareaField, { props: { hintCount: 2 } }).container
		);

		await vi.waitFor(() => {
			expect(textarea.getAttribute('aria-describedby')).toBe(
				hints.map((hint) => hint.id).join(' ')
			);
		});
	});

	it('cascades disabled, required, and the error state', () => {
		const disabled = textareaParts(
			render(TextareaField, { props: { disabled: true } }).container
		).textarea;
		const required = textareaParts(
			render(TextareaField, { props: { required: true } }).container
		).textarea;
		const errored = textareaParts(
			render(TextareaField, { props: { state: 'error' } }).container
		).textarea;

		expect(disabled.disabled, 'textarea disabled').toBe(true);
		expect(required.required, 'textarea required').toBe(true);
		expect(errored.getAttribute('aria-invalid')).toBe('true');
	});

	it('lets disabled={false} on the textarea override a disabled field', () => {
		const { container } = render(TextareaField, {
			props: { disabled: true, textareaDisabled: false }
		});

		expect(container.querySelector('textarea')?.disabled).toBe(false);
	});
});

describe('Field with widgets', () => {
	const field = (container: Element, testId: string) =>
		container.querySelector(`[data-testid="${testId}"]`)!;

	it('wires a checkbox', async () => {
		const scope = field(
			render(WidgetFields, { props: { required: true } }).container,
			'checkbox-field'
		);
		const checkbox = scope.querySelector('button')!;

		expect(scope.querySelector('label')?.getAttribute('for')).toBe(checkbox.id);
		expect(checkbox.getAttribute('aria-required')).toBe('true');
		await vi.waitFor(() => {
			expect(checkbox.getAttribute('aria-describedby')).toBe(scope.querySelector('p')?.id);
		});
	});

	it('names a radio group by its label and describes it by its hint', async () => {
		const scope = field(render(WidgetFields).container, 'radio-field');
		const group = scope.querySelector('[role="radiogroup"]')!;

		await vi.waitFor(() => {
			expect(group.getAttribute('aria-labelledby')).toBe(scope.querySelector('label')?.id);
			expect(group.getAttribute('aria-describedby')).toBe(scope.querySelector('p')?.id);
		});
	});

	it('marks every radio item disabled when the field is disabled', () => {
		const scope = field(
			render(WidgetFields, { props: { disabled: true } }).container,
			'radio-field'
		);

		expect(
			[...scope.querySelectorAll<HTMLButtonElement>('[role="radio"]')].map((item) => item.disabled)
		).toEqual([true, true]);
	});

	it('wires a select trigger', async () => {
		const scope = field(
			render(WidgetFields, { props: { disabled: true } }).container,
			'select-field'
		);
		const trigger = scope.querySelector('button')!;

		expect(scope.querySelector('label')?.getAttribute('for')).toBe(trigger.id);
		expect(trigger.disabled, 'trigger disabled').toBe(true);
		await vi.waitFor(() => {
			expect(trigger.getAttribute('aria-describedby')).toBe(scope.querySelector('p')?.id);
		});
	});

	it('wires a switch', async () => {
		const scope = field(render(WidgetFields).container, 'switch-field');
		const control = scope.querySelector('[role="switch"]')!;

		expect(scope.querySelector('label')?.getAttribute('for')).toBe(control.id);
		await vi.waitFor(() => {
			expect(control.getAttribute('aria-describedby')).toBe(scope.querySelector('p')?.id);
		});
	});

	it('names a toggle group by its label and describes it by its hint', async () => {
		const scope = field(render(WidgetFields).container, 'toggle-field');
		const group = scope.querySelector('[role="group"]')!;

		await vi.waitFor(() => {
			expect(group.getAttribute('aria-labelledby')).toBe(scope.querySelector('label')?.id);
			expect(group.getAttribute('aria-describedby')).toBe(scope.querySelector('p')?.id);
		});
	});

	it('disables the switch and every toggle item when the field is disabled', () => {
		const { container } = render(WidgetFields, { props: { disabled: true } });
		const toggles = [
			...field(container, 'toggle-field').querySelectorAll<HTMLButtonElement>('[role="radio"]')
		];

		expect(field(container, 'switch-field').querySelector('button')?.disabled).toBe(true);
		expect(toggles.map((item) => item.disabled)).toEqual([true, true]);
	});

	it('cascades the error state to every widget as aria-invalid', () => {
		const { container } = render(WidgetFields, { props: { state: 'error' } });

		expect(
			[
				field(container, 'checkbox-field').querySelector('[role="checkbox"]'),
				field(container, 'radio-field').querySelector('[role="radiogroup"]'),
				field(container, 'select-field').querySelector('button'),
				field(container, 'switch-field').querySelector('[role="switch"]'),
				field(container, 'toggle-field').querySelector('[role="group"]')
			].map((control) => control?.getAttribute('aria-invalid'))
		).toEqual(['true', 'true', 'true', 'true', 'true']);
	});
});
