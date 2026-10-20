import { describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { userEvent } from 'vitest/browser';

import { borderColor, colorOf } from '../../__tests__/computed-style.ts';
import BoundSelect from './BoundSelect.svelte';
import ControlledSelect from './ControlledSelect.svelte';
import ErrorSelect from './ErrorSelect.svelte';
import IndicatorSelect from './IndicatorSelect.svelte';
import UndefinedSelect from './UndefinedSelect.svelte';

const openAndPick = async (trigger: HTMLElement, label: string) => {
	await userEvent.click(trigger);
	let option: Element | undefined;
	await vi.waitFor(() => {
		option = [...document.querySelectorAll('[role="option"]')].find((o) =>
			o.textContent?.includes(label)
		);
		expect(option).toBeTruthy();
	});
	await userEvent.click(option!);
};

describe('Select', () => {
	it('renders a trigger showing the current selection', () => {
		const { container } = render(BoundSelect);
		expect(container.querySelector('button')?.textContent).toContain('Small');
	});

	it('renders a passed trigger indicator instead of the chevron', () => {
		const { container } = render(IndicatorSelect);

		expect(container.querySelector('[data-testid="indicator"]')?.textContent).toBe('v');
		expect(container.querySelector('svg')).toBeNull();
	});

	it('opens on click and lists the options', async () => {
		const { container } = render(BoundSelect);
		await userEvent.click(container.querySelector('button')!);
		await vi.waitFor(() => {
			const options = [...document.querySelectorAll('[role="option"]')];
			expect(options.map((o) => o.textContent?.trim())).toEqual(
				expect.arrayContaining(['Small', 'Medium', 'Large'])
			);
		});
	});

	it('two-way: bind:value keeps the owner in sync', async () => {
		const { container } = render(BoundSelect);
		await openAndPick(container.querySelector('button')!, 'Medium');
		await vi.waitFor(() =>
			expect(container.querySelector('[data-testid="owner"]')?.textContent).toBe('md')
		);
	});

	it('renders when the bound state starts undefined', () => {
		const { container } = render(UndefinedSelect);

		expect(container.querySelector('button')?.textContent).toContain('Pick a size');
		expect(container.querySelector('[data-testid="owner"]')?.textContent).toBe('undefined');
	});

	it('writes the picked value back to undefined state', async () => {
		const { container } = render(UndefinedSelect);
		const trigger = container.querySelector('button')!;

		await openAndPick(trigger, 'Medium');

		await vi.waitFor(() =>
			expect(container.querySelector('[data-testid="owner"]')?.textContent).toBe('md')
		);
		expect(trigger.textContent).toContain('Medium');
	});

	it('controlled: a function-binding setter can veto the selection', async () => {
		const { container } = render(ControlledSelect, { props: { accept: false } });
		const trigger = container.querySelector('button')!;
		await openAndPick(trigger, 'Medium');
		await vi.waitFor(() =>
			expect(container.querySelector('[data-testid="owner"]')?.textContent).toBe('sm')
		);
		expect(trigger.textContent).toContain('Small');
	});

	it('is invalid with an error border inside an error field', () => {
		const { container } = render(ErrorSelect);
		const trigger = container.querySelector('button')!;
		expect(trigger.getAttribute('aria-invalid')).toBe('true');
		expect(trigger.classList.contains('border-danger-dark')).toBe(true);
	});

	it('wears the focus ring and leaves width to the consumer', () => {
		const { container } = render(BoundSelect);
		const classes = container.querySelector('button')!.classList;
		expect(classes.contains('focus-visible:outline-2')).toBe(true);
		expect(classes.contains('w-full')).toBe(false);
	});

	it('keeps the error border on an open trigger', async () => {
		const { container } = render(ErrorSelect);
		const trigger = container.querySelector('button')!;
		await userEvent.click(trigger);
		await vi.waitFor(() => expect(trigger.getAttribute('data-state')).toBe('open'));
		expect(trigger.classList.contains('border-danger-dark')).toBe(true);
		expect(trigger.classList.contains('data-[state=open]:border-gray-9')).toBe(false);
	});

	it('turns the border transparent when disabled, even on hover, like a disabled Input', async () => {
		const { container } = render(BoundSelect, { props: { disabled: true } });
		const trigger = container.querySelector('button')!;

		await userEvent.hover(trigger);

		expect(trigger.disabled).toBe(true);
		expect(borderColor(trigger)).toBe(colorOf('border-transparent', 'borderTopColor'));
	});

	it('darkens the border on hover when enabled', async () => {
		const { container } = render(BoundSelect);
		const trigger = container.querySelector('button')!;

		await userEvent.hover(trigger);

		expect(borderColor(trigger)).toBe(colorOf('border-gray-6', 'borderTopColor'));
	});
});
