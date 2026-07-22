import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { userEvent } from 'vitest/browser';

import Checkbox from '../Checkbox.svelte';
import BoundCheckbox from './BoundCheckbox.svelte';
import ControlledCheckbox from './ControlledCheckbox.svelte';

describe('Checkbox', () => {
	it('renders an accessible, unchecked checkbox by default', () => {
		const { container } = render(Checkbox, { props: {} });
		const box = container.querySelector('[role="checkbox"]');
		expect(box).toBeTruthy();
		expect(box?.getAttribute('aria-checked')).toBe('false');
		expect(container.querySelector('[data-testid="icon-checkbox-blank-outline"]')).toBeTruthy();
	});

	it('reflects the checked prop', () => {
		const { container } = render(Checkbox, { props: { checked: true } });
		expect(container.querySelector('[role="checkbox"]')?.getAttribute('aria-checked')).toBe('true');
		expect(container.querySelector('[data-testid="icon-checkbox-marked"]')).toBeTruthy();
	});

	it('reflects the indeterminate state as mixed', () => {
		const { container } = render(Checkbox, { props: { indeterminate: true } });
		expect(container.querySelector('[role="checkbox"]')?.getAttribute('aria-checked')).toBe(
			'mixed'
		);
		expect(container.querySelector('[data-testid="icon-checkbox-indeterminate"]')).toBeTruthy();
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
});
