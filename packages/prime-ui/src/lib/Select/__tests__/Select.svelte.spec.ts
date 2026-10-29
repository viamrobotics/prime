import { afterEach, describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { userEvent } from 'vitest/browser';

import { borderColor, colorOf } from '../../__tests__/computed-style.ts';
import BoundSelect from './BoundSelect.svelte';
import ControlledSelect from './ControlledSelect.svelte';
import IndicatorSelect from './IndicatorSelect.svelte';
import UndefinedSelect from './UndefinedSelect.svelte';

const trigger = (container: Element) => container.querySelector('button')!;
const owner = (container: Element) => container.querySelector('[data-testid="owner"]')?.textContent;
const listbox = () => document.querySelector('[role="listbox"]');
const borderOf = (utility: string) => colorOf(utility, 'borderTopColor');

const optionLabeled = async (label: string) => {
	let option: Element | undefined;
	await vi.waitFor(() => {
		option = [...document.querySelectorAll('[role="option"]')].find((candidate) =>
			candidate.textContent?.includes(label)
		);
		expect(option, `an option labeled ${label} is listed`).toBeTruthy();
	});
	return option!;
};

const openAndPick = async (container: Element, label: string) => {
	await userEvent.click(trigger(container));
	await userEvent.click(await optionLabeled(label));
};

afterEach(async () => {
	if (listbox()) await userEvent.keyboard('{Escape}');
});

describe('Select', () => {
	it('shows the bound value on the closed trigger', () => {
		const { container } = render(BoundSelect);

		expect(trigger(container).textContent).toContain('Small');
	});

	it('renders a passed trigger indicator instead of the chevron', () => {
		const { container } = render(IndicatorSelect);

		expect(container.querySelector('[data-testid="indicator"]')?.textContent).toBe('v');
		expect(container.querySelector('svg')).toBeNull();
	});

	it('opens on click and lists the options in order', async () => {
		const { container } = render(BoundSelect);

		await userEvent.click(trigger(container));

		await vi.waitFor(() => {
			expect(
				[...document.querySelectorAll('[role="option"]')].map((o) => o.textContent?.trim())
			).toEqual(['Small', 'Medium', 'Large']);
		});
	});

	it('wears the shared focus ring and leaves width to the consumer', () => {
		const { container } = render(BoundSelect);

		expect(trigger(container).classList.contains('input'), 'input class').toBe(true);
		expect(trigger(container).classList.contains('w-full'), 'no built-in width').toBe(false);
	});

	it('renders a hidden form input carrying the value when given a name', () => {
		const { container } = render(BoundSelect, { props: { name: 'size' } });

		expect(container.querySelector<HTMLInputElement>('input[name="size"]')?.value).toBe('sm');
	});

	it('two-way: picking an option writes its value to the owner and the trigger', async () => {
		const { container } = render(BoundSelect);

		await openAndPick(container, 'Medium');

		await vi.waitFor(() => expect(owner(container)).toBe('md'));
		expect(trigger(container).textContent).toContain('Medium');
	});

	it('two-way: ArrowDown opens, ArrowDown highlights the next option, Enter selects it', async () => {
		const { container } = render(BoundSelect);
		trigger(container).focus();

		await userEvent.keyboard('{ArrowDown}');
		await vi.waitFor(() => expect(listbox(), 'list opened').toBeTruthy());
		await userEvent.keyboard('{ArrowDown}{Enter}');

		await vi.waitFor(() => expect(owner(container)).toBe('md'));
		expect(listbox(), 'list closed after Enter').toBeNull();
	});

	it('two-way: Escape closes without changing the value', async () => {
		const { container } = render(BoundSelect);
		await userEvent.click(trigger(container));
		await optionLabeled('Medium');

		await userEvent.keyboard('{ArrowDown}{Escape}');

		await vi.waitFor(() => expect(listbox()).toBeNull());
		expect(owner(container)).toBe('sm');
	});

	it('two-way: shows the placeholder from undefined state and writes the picked value back', async () => {
		const { container } = render(UndefinedSelect);
		expect(trigger(container).textContent).toContain('Pick a size');
		expect(owner(container)).toBe('undefined');

		await openAndPick(container, 'Medium');

		await vi.waitFor(() => expect(owner(container)).toBe('md'));
	});

	it('controlled: a function-binding setter can veto the selection', async () => {
		const { container } = render(ControlledSelect, { props: { accept: false } });

		await openAndPick(container, 'Medium');

		await vi.waitFor(() => expect(owner(container)).toBe('sm'));
		expect(trigger(container).textContent).toContain('Small');
	});

	it('stacks the panel on the popover layer', async () => {
		const { container } = render(BoundSelect);

		await userEvent.click(trigger(container));

		await vi.waitFor(() => expect(listbox()).toBeTruthy());
		expect(getComputedStyle(listbox()!).zIndex).toBe('1200');
	});

	describe('trigger border', () => {
		it('is light at rest and darkens on hover', async () => {
			const { container } = render(BoundSelect);
			expect(borderColor(trigger(container))).toBe(borderOf('border-light'));

			await userEvent.hover(trigger(container));

			expect(borderColor(trigger(container))).toBe(borderOf('border-gray-6'));
		});

		it('is danger and aria-invalid in the error state, closed or open', async () => {
			const { container } = render(BoundSelect, { props: { state: 'error' } });
			expect(trigger(container).getAttribute('aria-invalid')).toBe('true');
			expect(borderColor(trigger(container))).toBe(borderOf('border-danger-dark'));

			await userEvent.click(trigger(container));

			await vi.waitFor(() => expect(trigger(container).dataset.state).toBe('open'));
			expect(borderColor(trigger(container))).toBe(borderOf('border-danger-dark'));
		});

		it('is transparent when disabled, even on hover', async () => {
			const { container } = render(BoundSelect, { props: { disabled: true } });

			await userEvent.hover(trigger(container));

			expect(trigger(container).disabled, 'native disabled attribute').toBe(true);
			expect(borderColor(trigger(container))).toBe(borderOf('border-transparent'));
		});
	});
});
