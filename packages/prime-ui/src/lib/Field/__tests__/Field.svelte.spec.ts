import { describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-svelte';

import { colorOf, textColor } from '../../__tests__/computed-style.ts';
import { FieldStates } from '../state.ts';
import InputField from './InputField.svelte';
import WidgetFields from './WidgetFields.svelte';

const parts = (container: Element) => {
	const label = container.querySelector('label')!;
	const input = container.querySelector('input')!;
	const hints = [...container.querySelectorAll('p')];
	return { label, input, hints };
};

describe('Field', () => {
	it('points the label at the control', () => {
		const { label, input } = parts(render(InputField).container);
		expect(input.id).toBeTruthy();
		expect(label.getAttribute('for')).toBe(input.id);
	});

	it('puts controlId on the control', () => {
		const { container } = render(InputField, { props: { controlId: 'email' } });
		expect(container.querySelector('input')?.id).toBe('email');
		expect(container.querySelector('div')?.id).toBe('');
	});

	it('puts id on the wrapper', () => {
		const { container } = render(InputField, { props: { id: 'email-field' } });
		expect(container.querySelector('div')?.id).toBe('email-field');
		expect(container.querySelector('input')?.id).not.toBe('email-field');
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
			expect(container.querySelector('input')?.hasAttribute('aria-describedby')).toBe(false);
		});
	});

	it('cascades disabled to the label, control, and hint', () => {
		const { label, input, hints } = parts(
			render(InputField, { props: { disabled: true } }).container
		);
		expect(input.disabled).toBe(true);
		expect(getComputedStyle(label).cursor).toBe('not-allowed');
		expect(textColor(hints[0]!)).toBe(colorOf('text-disabled', 'color'));
	});

	it('cascades required to the label and control', () => {
		const { label, input } = parts(render(InputField, { props: { required: true } }).container);
		expect(input.required).toBe(true);
		expect(label.textContent).toContain('*');
	});

	it('cascades the error state to the control and hint', () => {
		const { input, hints } = parts(
			render(InputField, { props: { state: FieldStates.Error } }).container
		);
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
		const items = [...scope.querySelectorAll('[role="radio"]')];
		const enabled = items.filter((item) => !item.hasAttribute('data-disabled'));
		expect(items.length).toBe(2);
		expect(enabled.length).toBe(0);
	});

	it('wires a select trigger', async () => {
		const scope = field(
			render(WidgetFields, { props: { disabled: true } }).container,
			'select-field'
		);
		const trigger = scope.querySelector('button')!;
		expect(scope.querySelector('label')?.getAttribute('for')).toBe(trigger.id);
		expect(trigger.disabled).toBe(true);
		await vi.waitFor(() => {
			expect(trigger.getAttribute('aria-describedby')).toBe(scope.querySelector('p')?.id);
		});
	});
});
