import { mdiCheckboxBlankOutline, mdiCheckboxIntermediate, mdiCheckboxMarked } from '@mdi/js';
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { userEvent } from 'vitest/browser';

import Checkbox from '../Checkbox.svelte';
import BoundCheckbox from './BoundCheckbox.svelte';
import ControlledCheckbox from './ControlledCheckbox.svelte';
import ErrorCheckbox from './ErrorCheckbox.svelte';
import UndefinedCheckbox from './UndefinedCheckbox.svelte';

describe('Checkbox', () => {
	it('renders an accessible, unchecked checkbox by default', () => {
		const { container } = render(Checkbox, { props: {} });
		const box = container.querySelector('[role="checkbox"]');
		expect(box).toBeTruthy();
		expect(box?.getAttribute('aria-checked')).toBe('false');
		expect(container.querySelector('svg path')?.getAttribute('d')).toBe(mdiCheckboxBlankOutline);
	});

	it('uses the shared focus ring and token radius', () => {
		const { container } = render(Checkbox, { props: {} });
		const classes = container.querySelector('[role="checkbox"]')!.classList;
		expect(classes.contains('focus-visible:outline-2')).toBe(true);
		expect(classes.contains('rounded-sm')).toBe(true);
	});

	it('reflects the checked prop', () => {
		const { container } = render(Checkbox, { props: { checked: true } });
		expect(container.querySelector('[role="checkbox"]')?.getAttribute('aria-checked')).toBe('true');
		expect(container.querySelector('svg path')?.getAttribute('d')).toBe(mdiCheckboxMarked);
	});

	it('reflects the indeterminate state as mixed', () => {
		const { container } = render(Checkbox, { props: { indeterminate: true } });
		expect(container.querySelector('[role="checkbox"]')?.getAttribute('aria-checked')).toBe(
			'mixed'
		);
		expect(container.querySelector('svg path')?.getAttribute('d')).toBe(mdiCheckboxIntermediate);
	});

	it('renders as non-interactive when disabled', () => {
		const { container } = render(Checkbox, { props: { disabled: true } });
		const box = container.querySelector('[role="checkbox"]')!;
		expect(box.hasAttribute('disabled') || box.getAttribute('aria-disabled') === 'true').toBe(true);
	});

	it('two-way: bind:checked keeps the owner in sync', async () => {
		const { container } = render(BoundCheckbox, { props: {} });
		const box = container.querySelector('[role="checkbox"]') as HTMLElement;
		const owner = container.querySelector('[data-testid="owner"]')!;
		expect(owner.textContent).toBe('false');
		await userEvent.click(box);
		expect(box.getAttribute('aria-checked')).toBe('true');
		expect(owner.textContent).toBe('true');
	});

	it('renders when the bound state starts undefined', () => {
		const { container } = render(UndefinedCheckbox, { props: {} });
		expect(container.querySelector('[role="checkbox"]')?.getAttribute('aria-checked')).toBe(
			'false'
		);
		expect(container.querySelector('[data-testid="owner"]')?.textContent).toBe('undefined');
	});

	it('writes a boolean back to undefined state on click', async () => {
		const { container } = render(UndefinedCheckbox, { props: {} });
		const box = container.querySelector('[role="checkbox"]') as HTMLElement;
		await userEvent.click(box);
		expect(box.getAttribute('aria-checked')).toBe('true');
		expect(container.querySelector('[data-testid="owner"]')?.textContent).toBe('true');
	});

	it('controlled: a function-binding setter can veto the change', async () => {
		const { container } = render(ControlledCheckbox, { props: { accept: false } });
		const box = container.querySelector('[role="checkbox"]') as HTMLElement;
		await userEvent.click(box);
		expect(box.getAttribute('aria-checked')).toBe('false');
		expect(container.querySelector('[data-testid="owner"]')?.textContent).toBe('false');
	});

	it('controlled: a function-binding setter can accept the change', async () => {
		const { container } = render(ControlledCheckbox, { props: { accept: true } });
		const box = container.querySelector('[role="checkbox"]') as HTMLElement;
		await userEvent.click(box);
		expect(box.getAttribute('aria-checked')).toBe('true');
		expect(container.querySelector('[data-testid="owner"]')?.textContent).toBe('true');
	});

	it('is invalid and colors the icon as an error inside an error field', () => {
		const { container } = render(ErrorCheckbox);
		expect(container.querySelector('[role="checkbox"]')?.getAttribute('aria-invalid')).toBe('true');
		expect(container.querySelector('svg')?.classList.contains('text-danger-dark')).toBe(true);
	});

	it('is invalid with a direct error state and no field', () => {
		const { container } = render(Checkbox, { props: { state: 'error' } });
		expect(container.querySelector('[role="checkbox"]')?.getAttribute('aria-invalid')).toBe('true');
		expect(container.querySelector('svg')?.classList.contains('text-danger-dark')).toBe(true);
	});

	it('sets no aria-invalid for the none state', () => {
		const { container } = render(Checkbox, { props: { state: 'none' } });
		expect(container.querySelector('[role="checkbox"]')?.hasAttribute('aria-invalid')).toBe(false);
	});
});
