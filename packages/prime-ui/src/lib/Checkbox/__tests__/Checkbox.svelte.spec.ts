import { mdiCheckboxBlankOutline, mdiCheckboxIntermediate, mdiCheckboxMarked } from '@mdi/js';
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { userEvent } from 'vitest/browser';

import { colorOf, textColor } from '../../__tests__/computed-style.ts';
import Checkbox from '../Checkbox.svelte';
import BoundCheckbox from './BoundCheckbox.svelte';
import ControlledCheckbox from './ControlledCheckbox.svelte';
import UndefinedCheckbox from './UndefinedCheckbox.svelte';

const box = (container: Element) =>
	container.querySelector<HTMLButtonElement>('[role="checkbox"]')!;
const iconPath = (container: Element) => container.querySelector('svg path')?.getAttribute('d');
const owner = (container: Element) => container.querySelector('[data-testid="owner"]')?.textContent;

describe('Checkbox', () => {
	it('renders an unchecked, valid checkbox by default', () => {
		const { container } = render(Checkbox);

		expect(box(container).getAttribute('aria-checked')).toBe('false');
		expect(box(container).getAttribute('aria-invalid')).toBeNull();
		expect(iconPath(container)).toBe(mdiCheckboxBlankOutline);
	});

	it.each([
		{ props: { checked: true }, ariaChecked: 'true', icon: mdiCheckboxMarked },
		{ props: { indeterminate: true }, ariaChecked: 'mixed', icon: mdiCheckboxIntermediate }
	])(
		'reflects $props as aria-checked $ariaChecked with the matching icon',
		({ props, ariaChecked, icon }) => {
			const { container } = render(Checkbox, { props });

			expect(box(container).getAttribute('aria-checked')).toBe(ariaChecked);
			expect(iconPath(container)).toBe(icon);
		}
	);

	it('disables the button when disabled', () => {
		const { container } = render(Checkbox, { props: { disabled: true } });

		expect(box(container).disabled, 'native disabled attribute').toBe(true);
	});

	it('wears the shared focus ring', () => {
		const { container } = render(Checkbox);

		expect(box(container).classList.contains('focus-ring'), 'focus-ring utility').toBe(true);
	});

	it('is invalid and colors the icon danger in the error state', () => {
		const { container } = render(Checkbox, { props: { state: 'error' } });

		expect(box(container).getAttribute('aria-invalid')).toBe('true');
		expect(textColor(container.querySelector('svg')!)).toBe(colorOf('text-danger-dark', 'color'));
	});

	it('renders a hidden form input carrying name and value when given a name', () => {
		const { container } = render(Checkbox, {
			props: { name: 'terms', value: 'yes', checked: true }
		});

		const hidden = container.querySelector<HTMLInputElement>('input[name="terms"]')!;
		expect(hidden.value).toBe('yes');
		expect(hidden.checked, 'hidden input mirrors checked').toBe(true);
	});

	it('two-way: bind:checked keeps the owner in sync', async () => {
		const { container } = render(BoundCheckbox);

		await userEvent.click(box(container));

		expect(box(container).getAttribute('aria-checked')).toBe('true');
		expect(owner(container)).toBe('true');
	});

	it('two-way: renders unchecked from undefined state and writes a boolean back', async () => {
		const { container } = render(UndefinedCheckbox);
		expect(box(container).getAttribute('aria-checked')).toBe('false');
		expect(owner(container)).toBe('undefined');

		await userEvent.click(box(container));

		expect(owner(container)).toBe('true');
	});

	it.each([
		{ accept: true, result: 'true' },
		{ accept: false, result: 'false' }
	])(
		'controlled: a function-binding setter with accept=$accept leaves the owner $result',
		async ({ accept, result }) => {
			const { container } = render(ControlledCheckbox, { props: { accept } });

			await userEvent.click(box(container));

			expect(box(container).getAttribute('aria-checked')).toBe(result);
			expect(owner(container)).toBe(result);
		}
	);
});
