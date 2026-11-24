import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { commands, page, userEvent } from 'vitest/browser';

import '../../../../test/tailwind.css';
import TextField from '../TextField.svelte';
import BoundTextField from './fixtures/BoundTextField.svelte';

const input = (container: Element) => container.querySelector('input')!;
const owner = (container: Element) => container.querySelector('[data-testid="owner"]')?.textContent;

const MIDDLE = '50%';
const HINT = 'Shown beside the label';

describe('TextField', () => {
	it('names the input by its label', async () => {
		const { container } = render(TextField, { props: { label: 'Motion name', value: 'a' } });

		await expect.element(page.getByRole('textbox', { name: 'Motion name' })).toBeInTheDocument();
		expect(container.querySelector('label')).toHaveClass('text-subtle-1');
	});

	it('takes its accessible name from aria-label without a label', async () => {
		const { container } = render(TextField, { props: { 'aria-label': 'Pin', value: '' } });

		await expect.element(page.getByRole('textbox', { name: 'Pin' })).toBeInTheDocument();
		expect(container.querySelector('label')).toBeNull();
	});

	it('writes typing through the binding and clears to the empty string', async () => {
		const { container } = render(BoundTextField, { props: { label: 'Pin' } });
		const field = page.getByRole('textbox', { name: 'Pin' });

		await field.fill('GPIO17');
		expect(owner(container)).toBe('"GPIO17"');

		await field.clear();
		expect(owner(container)).toBe('""');
		expect(input(container).value).toBe('');
	});

	it('shows a value written from outside', async () => {
		const { container } = render(BoundTextField, { props: { label: 'Pin', initial: 'a' } });

		await page.getByRole('button', { name: 'Write' }).click();

		expect(input(container).value).toBe('from outside');
	});

	it('shows the placeholder', async () => {
		render(TextField, { props: { label: 'Pin', placeholder: 'builtin' } });

		await expect.element(page.getByPlaceholder('builtin')).toBeInTheDocument();
	});

	it('does not change the value or the cursor when a drag crosses the label', async () => {
		const { container } = render(BoundTextField, { props: { label: 'Pin', initial: 'base-1' } });
		const label = container.querySelector('label')!;

		await commands.mouseMove('label', { x: 5, y: MIDDLE });
		await commands.mouseDown();
		await commands.mouseMove('label', { x: 45, y: MIDDLE });
		await commands.mouseUp();

		expect(owner(container)).toBe('"base-1"');
		expect(getComputedStyle(label).cursor).not.toBe('ew-resize');
	});

	it('uses a provided id for the input and its label', async () => {
		const { container } = render(TextField, {
			props: { id: 'pin-field', label: 'Pin', value: '' }
		});

		expect(input(container).id).toBe('pin-field');
		expect(container.querySelector('label')!.htmlFor).toBe('pin-field');
	});

	it('disables the input', async () => {
		render(TextField, { props: { label: 'Pin', disabled: true, value: '' } });

		await expect.element(page.getByRole('textbox', { name: 'Pin' })).toBeDisabled();
	});
});

describe('TextField hint', () => {
	it('names an info button after the label', async () => {
		render(TextField, { props: { label: 'Pin', hint: HINT, value: '' } });

		await expect.element(page.getByRole('button', { name: 'About Pin' })).toBeInTheDocument();
	});

	it('describes the input by the hint while the tooltip is closed', async () => {
		render(TextField, { props: { label: 'Pin', hint: HINT, value: '' } });

		expect(page.getByRole('tooltip').query()).toBeNull();
		await expect
			.element(page.getByRole('textbox', { name: 'Pin' }))
			.toHaveAccessibleDescription(HINT);
	});

	it('shows the hint in a tooltip when the button takes focus', async () => {
		render(TextField, { props: { label: 'Pin', hint: HINT, value: '' } });

		await userEvent.tab();
		await expect.element(page.getByRole('button', { name: 'About Pin' })).toHaveFocus();
		await expect.element(page.getByRole('tooltip')).toHaveTextContent(HINT);
	});

	it('disables the hint button with the input', async () => {
		render(TextField, { props: { label: 'Pin', hint: HINT, disabled: true, value: '' } });

		await expect.element(page.getByRole('button', { name: 'About Pin' })).toBeDisabled();
	});

	it('lists the consumer description before the hint', async () => {
		render(TextField, {
			props: { id: 'pin', label: 'Pin', hint: HINT, value: '', 'aria-describedby': 'note' }
		});

		await expect
			.element(page.getByRole('textbox', { name: 'Pin' }))
			.toHaveAttribute('aria-describedby', 'note pin-hint');
	});

	it('passes the consumer description through when there is no hint', async () => {
		render(TextField, { props: { label: 'Pin', value: '', 'aria-describedby': 'note' } });

		await expect
			.element(page.getByRole('textbox', { name: 'Pin' }))
			.toHaveAttribute('aria-describedby', 'note');
	});

	it('sets no aria-describedby without a description or a hint', async () => {
		render(TextField, { props: { label: 'Pin', value: '' } });

		await expect
			.element(page.getByRole('textbox', { name: 'Pin' }))
			.not.toHaveAttribute('aria-describedby');
	});
});

describe('TextField state', () => {
	it('sets aria-invalid and data-field-state on an error', async () => {
		render(TextField, { props: { label: 'Pin', state: 'error', value: '' } });

		const field = page.getByRole('textbox', { name: 'Pin' });
		await expect.element(field).toHaveAttribute('aria-invalid', 'true');
		await expect.element(field).toHaveAttribute('data-field-state', 'error');
	});

	it('marks a warn without aria-invalid', async () => {
		render(TextField, { props: { label: 'Pin', state: 'warn', value: '' } });

		const field = page.getByRole('textbox', { name: 'Pin' });
		await expect.element(field).not.toHaveAttribute('aria-invalid');
		await expect.element(field).toHaveAttribute('data-field-state', 'warn');
	});

	it('marks an info without aria-invalid', async () => {
		render(TextField, { props: { label: 'Pin', state: 'info', value: '' } });

		const field = page.getByRole('textbox', { name: 'Pin' });
		await expect.element(field).not.toHaveAttribute('aria-invalid');
		await expect.element(field).toHaveAttribute('data-field-state', 'info');
	});
});
