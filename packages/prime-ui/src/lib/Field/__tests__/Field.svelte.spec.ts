import type { ComponentProps } from 'svelte';

import { describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-svelte';

import type Field from '../Field.svelte';

import { colorOf, textColor } from '../../../../test/computed-style.ts';
import FileInputField from './fixtures/FileInputField.svelte';
import InputField from './fixtures/InputField.svelte';
import NamedField from './fixtures/NamedField.svelte';
import TextareaField from './fixtures/TextareaField.svelte';
import WidgetFields from './fixtures/WidgetFields.svelte';

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

	it('drops a removed hint from aria-describedby', async () => {
		const { container, rerender } = render(InputField, { props: { hintCount: 2 } });

		await rerender({ hintCount: 1 });

		const { input, hints } = parts(container);
		await vi.waitFor(() => {
			expect(input.getAttribute('aria-describedby')).toBe(hints[0]?.id);
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
		expect(textColor(hints[0]!)).toBe(colorOf('text-disabled-dark', 'color'));
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

	it.each([
		{ props: { disabled: true }, attribute: 'disabled', expected: '' },
		{ props: { required: true }, attribute: 'required', expected: '' },
		{ props: { state: 'error' }, attribute: 'aria-invalid', expected: 'true' }
	] as const)(
		'sets $attribute on the textarea from the field',
		({ props, attribute, expected }) => {
			const { textarea } = textareaParts(render(TextareaField, { props }).container);

			expect(textarea.getAttribute(attribute)).toBe(expected);
		}
	);

	it('lets disabled={false} on the textarea override a disabled field', () => {
		const { container } = render(TextareaField, {
			props: { disabled: true, textareaDisabled: false }
		});

		expect(container.querySelector('textarea')?.disabled).toBe(false);
	});
});

describe('Field with a file input', () => {
	const fileParts = (container: Element) => ({
		label: container.querySelector('label')!,
		input: container.querySelector<HTMLInputElement>('input[type="file"]')!,
		hints: [...container.querySelectorAll('p')]
	});

	it('puts the field controlId on the file input and points the label at it', () => {
		const { label, input } = fileParts(
			render(FileInputField, { props: { controlId: 'audio' } }).container
		);

		expect(input.id).toBe('audio');
		expect(label.getAttribute('for')).toBe('audio');
	});

	it('points the label at the file input through a generated id', () => {
		const { label, input } = fileParts(render(FileInputField).container);

		expect(input.id).not.toBe('');
		expect(label.getAttribute('for')).toBe(input.id);
	});

	it('describes the file input by every hint', async () => {
		const { input, hints } = fileParts(
			render(FileInputField, { props: { hintCount: 2 } }).container
		);

		await vi.waitFor(() => {
			expect(input.getAttribute('aria-describedby')).toBe(hints.map((hint) => hint.id).join(' '));
		});
	});

	it.each([
		{ props: { disabled: true }, attribute: 'disabled', expected: '' },
		{ props: { required: true }, attribute: 'required', expected: '' },
		{ props: { state: 'error' }, attribute: 'aria-invalid', expected: 'true' },
		{ props: { state: 'warn' }, attribute: 'data-field-state', expected: 'warn' }
	] as const)(
		'sets $attribute on the file input from the field',
		({ props, attribute, expected }) => {
			const { input } = fileParts(render(FileInputField, { props }).container);

			expect(input.getAttribute(attribute)).toBe(expected);
		}
	);

	it('lets disabled={false} on the file input override a disabled field', () => {
		const { input } = fileParts(
			render(FileInputField, { props: { disabled: true, inputDisabled: false } }).container
		);

		expect(input.disabled, 'file input enabled').toBe(false);
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

	it('disables the checkbox when the field is disabled', () => {
		const scope = field(
			render(WidgetFields, { props: { disabled: true } }).container,
			'checkbox-field'
		);

		expect(
			scope.querySelector<HTMLButtonElement>('[role="checkbox"]')?.disabled,
			'checkbox disabled'
		).toBe(true);
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

	it('wires a combobox input', async () => {
		const scope = field(
			render(WidgetFields, { props: { required: true } }).container,
			'combobox-field'
		);
		const input = scope.querySelector<HTMLInputElement>('[role="combobox"]')!;

		expect(scope.querySelector('label')?.getAttribute('for')).toBe(input.id);
		expect(input.getAttribute('aria-required')).toBe('true');
		await vi.waitFor(() => {
			expect(input.getAttribute('aria-describedby')).toBe(scope.querySelector('p')?.id);
		});
	});

	it('disables the combobox input and trigger when the field is disabled', () => {
		const scope = field(
			render(WidgetFields, { props: { disabled: true } }).container,
			'combobox-field'
		);

		expect(scope.querySelector<HTMLInputElement>('[role="combobox"]')?.disabled).toBe(true);
		expect(scope.querySelector('button')?.disabled, 'trigger disabled').toBe(true);
	});

	it('names a date field by its label and describes it by its hint', async () => {
		const scope = field(render(WidgetFields).container, 'date-field');
		const group = scope.querySelector('[role="group"]')!;

		await vi.waitFor(() => {
			expect(group.getAttribute('aria-labelledby')).toBe(scope.querySelector('label')?.id);
			expect(group.getAttribute('aria-describedby')).toBe(scope.querySelector('p')?.id);
		});
	});

	it('disables the date segments and trigger when the field is disabled', () => {
		const scope = field(
			render(WidgetFields, { props: { disabled: true } }).container,
			'date-field'
		);

		expect(scope.querySelector('[data-segment="day"]')?.getAttribute('aria-disabled')).toBe('true');
		expect(scope.querySelector('button')?.disabled, 'trigger disabled').toBe(true);
	});

	it('names a date range field by its label and describes it by its hint', async () => {
		const scope = field(render(WidgetFields).container, 'daterange-field');
		const group = scope.querySelector('[role="group"]')!;

		await vi.waitFor(() => {
			expect(group.getAttribute('aria-labelledby')).toBe(scope.querySelector('label')?.id);
			expect(group.getAttribute('aria-describedby')).toBe(scope.querySelector('p')?.id);
		});
	});

	it('disables both date range ends and the trigger when the field is disabled', () => {
		const scope = field(
			render(WidgetFields, { props: { disabled: true } }).container,
			'daterange-field'
		);

		expect(
			[...scope.querySelectorAll('[data-segment="day"]')].map((day) =>
				day.getAttribute('aria-disabled')
			)
		).toEqual(['true', 'true']);
		expect(scope.querySelector('button')?.disabled, 'trigger disabled').toBe(true);
	});

	it('wires a switch', async () => {
		const scope = field(render(WidgetFields).container, 'switch-field');
		const control = scope.querySelector('[role="switch"]')!;

		expect(scope.querySelector('label')?.getAttribute('for')).toBe(control.id);
		await vi.waitFor(() => {
			expect(control.getAttribute('aria-describedby')).toBe(scope.querySelector('p')?.id);
		});
	});

	it('marks the switch required when the field is required', () => {
		const scope = field(
			render(WidgetFields, { props: { required: true } }).container,
			'switch-field'
		);

		expect(scope.querySelector('[role="switch"]')?.getAttribute('aria-required')).toBe('true');
	});

	it('names a toggle group by its label and describes it by its hint', async () => {
		const scope = field(render(WidgetFields).container, 'toggle-field');
		const group = scope.querySelector('[role="radiogroup"]')!;

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

	it.each([
		{ widget: 'checkbox', testId: 'checkbox-field', expected: [false] },
		{ widget: 'radio', testId: 'radio-field', expected: [false, false] },
		{ widget: 'switch', testId: 'switch-field', expected: [false] },
		{ widget: 'toggle', testId: 'toggle-field', expected: [false, false] }
	] as const)(
		'lets disabled={false} on the $widget override a disabled field',
		({ widget, testId, expected }) => {
			const { container } = render(WidgetFields, {
				props: { disabled: true, [widget]: { disabled: false } }
			});

			expect(
				[...field(container, testId).querySelectorAll('button')].map((button) => button.disabled)
			).toEqual(expected);
		}
	);

	it.each([
		{ widget: 'checkbox', testId: 'checkbox-field', control: '[role="checkbox"]' },
		{ widget: 'radio', testId: 'radio-field', control: '[role="radiogroup"]' },
		{ widget: 'switch', testId: 'switch-field', control: '[role="switch"]' },
		{ widget: 'toggle', testId: 'toggle-field', control: '[role="radiogroup"]' }
	] as const)(
		'lets state="none" on the $widget override an error field',
		({ widget, testId, control }) => {
			const { container } = render(WidgetFields, {
				props: { state: 'error', [widget]: { state: 'none' } }
			});

			expect(field(container, testId).querySelector(control)?.getAttribute('aria-invalid')).toBe(
				null
			);
		}
	);

	it('cascades the error state to every widget as aria-invalid', () => {
		const { container } = render(WidgetFields, { props: { state: 'error' } });

		expect(
			[
				field(container, 'checkbox-field').querySelector('[role="checkbox"]'),
				field(container, 'radio-field').querySelector('[role="radiogroup"]'),
				field(container, 'select-field').querySelector('button'),
				field(container, 'combobox-field').querySelector('[role="combobox"]'),
				field(container, 'date-field').querySelector('[role="group"]'),
				field(container, 'daterange-field').querySelector('[role="group"]'),
				field(container, 'switch-field').querySelector('[role="switch"]'),
				field(container, 'toggle-field').querySelector('[role="radiogroup"]')
			].map((control) => control?.getAttribute('aria-invalid'))
		).toEqual(['true', 'true', 'true', 'true', 'true', 'true', 'true', 'true']);
	});
});

describe('Field name', () => {
	const named = (container: Element) => ({
		wrapper: container.querySelector('[data-testid="field"]')!,
		label: container.querySelector('label'),
		input: container.querySelector('input')!
	});

	it('requires a name by type', () => {
		// @ts-expect-error a Field requires a name
		const unnamed: ComponentProps<typeof Field> = {};
		// @ts-expect-error a Field takes one name, not two
		const twice: ComponentProps<typeof Field> = { label: 'Email', 'aria-label': 'Email' };
		const labeled: ComponentProps<typeof Field> = { label: 'Email' };
		const ariaLabeled: ComponentProps<typeof Field> = { 'aria-label': 'Email' };
		const labelledBy: ComponentProps<typeof Field> = { 'aria-labelledby': 'heading' };

		expect([unnamed, twice, labeled, ariaLabeled, labelledBy]).toHaveLength(5);
	});

	it('renders the field label in a Label with no children', () => {
		const { label } = named(
			render(NamedField, { props: { name: { label: 'Email' }, placeLabel: true } }).container
		);

		expect(label?.textContent?.trim()).toBe('Email');
	});

	it.each([
		{ name: { label: 'Email' }, ariaLabel: 'Email', labelledBy: null },
		{ name: { 'aria-label': 'Work email' }, ariaLabel: 'Work email', labelledBy: null },
		{ name: { 'aria-labelledby': 'heading' }, ariaLabel: null, labelledBy: 'heading' }
	] as const)(
		'names the control from $name with no Label placed',
		async ({ name, ariaLabel, labelledBy }) => {
			const { input } = named(render(NamedField, { props: { name } }).container);

			await vi.waitFor(() => {
				expect({
					ariaLabel: input.getAttribute('aria-label'),
					labelledBy: input.getAttribute('aria-labelledby')
				}).toEqual({ ariaLabel, labelledBy });
			});
		}
	);

	it('names the control by aria-labelledby when a Label is placed', async () => {
		const { label, input } = named(
			render(NamedField, { props: { name: { label: 'Email' }, placeLabel: true } }).container
		);

		await vi.waitFor(() => {
			expect(input.getAttribute('aria-labelledby')).toBe(label?.id);
			expect(input.getAttribute('aria-label')).toBeNull();
		});
	});

	it('lets an aria-label on the control win over the field name', async () => {
		const { input } = named(
			render(NamedField, {
				props: { name: { label: 'Email' }, placeLabel: true, inputLabel: 'Billing email' }
			}).container
		);

		await vi.waitFor(() => {
			expect({
				ariaLabel: input.getAttribute('aria-label'),
				labelledBy: input.getAttribute('aria-labelledby')
			}).toEqual({ ariaLabel: 'Billing email', labelledBy: null });
		});
	});

	it('keeps the name off the wrapper', () => {
		const { wrapper } = named(
			render(NamedField, { props: { name: { 'aria-label': 'Work email' } } }).container
		);

		expect([
			wrapper.getAttribute('label'),
			wrapper.getAttribute('aria-label'),
			wrapper.getAttribute('aria-labelledby')
		]).toEqual([null, null, null]);
	});
});
