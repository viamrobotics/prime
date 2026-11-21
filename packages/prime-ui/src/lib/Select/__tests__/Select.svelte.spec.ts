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

const CLOSE_SETTLE_MS = 400;

const addOutsideInput = () => {
	const input = document.createElement('input');
	input.setAttribute('aria-label', 'Outside');
	input.style.cssText = 'position: fixed; right: 0; bottom: 0';
	document.body.append(input);
	return input;
};

afterEach(() => {
	document.querySelectorAll('input[aria-label="Outside"]').forEach((input) => input.remove());
});

describe('Select', () => {
	it('closes on a press outside and focuses the pressed input', async () => {
		const { container } = render(BoundSelect);
		await userEvent.click(trigger(container));
		await optionLabeled('Small');
		const input = addOutsideInput();

		await userEvent.click(input);

		await vi.waitFor(() => expect(listbox(), 'list closed').toBeNull());
		await new Promise((resolve) => setTimeout(resolve, CLOSE_SETTLE_MS));
		expect(document.activeElement).toBe(input);
	});

	it('shows the label from items for the bound value on the closed trigger', () => {
		const { container } = render(BoundSelect);

		expect(trigger(container).textContent?.trim()).toBe('Small');
	});

	it('typing on the closed trigger selects the matching entry from items without opening', async () => {
		const { container } = render(BoundSelect);
		trigger(container).focus();

		await userEvent.keyboard('l');

		await vi.waitFor(() => expect(owner(container)).toBe('lg'));
		expect(listbox(), 'list stays closed').toBeNull();
	});

	it('renders a passed trigger indicator instead of the chevron', () => {
		const { container } = render(IndicatorSelect);

		expect(container.querySelector('[data-testid="indicator"]')?.textContent).toBe('v');
		expect(container.querySelector('svg'), 'no default chevron').toBeNull();
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

	it('wears the input class, which carries the shared focus ring', () => {
		const { container } = render(BoundSelect);

		expect(trigger(container).classList.contains('input'), 'input class').toBe(true);
	});

	it('takes its width from a consumer class', () => {
		const { container } = render(BoundSelect, { props: { class: 'w-32' } });

		expect(getComputedStyle(trigger(container)).width).toBe('128px');
	});

	it('renders a hidden form input carrying the value when given a name', () => {
		const { container } = render(BoundSelect, { props: { name: 'size' } });

		expect(container.querySelector<HTMLInputElement>('input[name="size"]')?.value).toBe('sm');
	});

	it('two-way: picking an option writes its value to the owner and the trigger', async () => {
		const { container } = render(BoundSelect);

		await openAndPick(container, 'Medium');

		await vi.waitFor(() => expect(owner(container)).toBe('md'));
		expect(trigger(container).textContent?.trim()).toBe('Medium');
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

		await vi.waitFor(() => expect(listbox(), 'list closed').toBeNull());
		expect(owner(container)).toBe('sm');
	});

	it('two-way: shows the placeholder while the owner state is undefined', () => {
		const { container } = render(UndefinedSelect);

		expect(trigger(container).textContent?.trim()).toBe('Pick a size');
		expect(owner(container)).toBe('undefined');
	});

	it('two-way: writes a pick back to owner state that starts undefined', async () => {
		const { container } = render(UndefinedSelect);

		await openAndPick(container, 'Medium');

		await vi.waitFor(() => expect(owner(container)).toBe('md'));
	});

	it.each([
		{ accept: false, expected: 'sm', label: 'Small' },
		{ accept: true, expected: 'md', label: 'Medium' }
	])(
		'controlled: a function-binding setter with accept=$accept leaves $expected',
		async ({ accept, expected, label }) => {
			const { container } = render(ControlledSelect, { props: { accept } });

			await openAndPick(container, 'Medium');

			await vi.waitFor(() => expect(owner(container)).toBe(expected));
			expect(trigger(container).textContent?.trim()).toBe(label);
		}
	);

	it.each([
		{ allowDeselect: false, expected: 'sm' },
		{ allowDeselect: true, expected: '' }
	])(
		'picking the selected option again with allowDeselect=$allowDeselect leaves "$expected"',
		async ({ allowDeselect, expected }) => {
			const { container } = render(BoundSelect, { props: { allowDeselect } });

			await openAndPick(container, 'Small');

			await vi.waitFor(() => expect(owner(container)).toBe(expected));
		}
	);

	describe('trigger border', () => {
		it('is light at rest and darkens on hover', async () => {
			const { container } = render(BoundSelect);
			expect(borderColor(trigger(container))).toBe(borderOf('border-light'));

			await userEvent.hover(trigger(container));

			expect(borderColor(trigger(container))).toBe(borderOf('border-gray-6'));
		});

		it('is gray-9 while the list is open', async () => {
			const { container } = render(BoundSelect);

			await userEvent.click(trigger(container));

			await vi.waitFor(() => expect(trigger(container).dataset.state).toBe('open'));
			expect(borderColor(trigger(container))).toBe(borderOf('border-gray-9'));
		});

		it.each([
			{ state: 'error', utility: 'border-danger-dark' },
			{ state: 'warn', utility: 'border-warning-dark' }
		] as const)('is $utility in the $state state', ({ state, utility }) => {
			const { container } = render(BoundSelect, { props: { state } });

			expect(borderColor(trigger(container))).toBe(borderOf(utility));
		});

		it('keeps the error border while the list is open', async () => {
			const { container } = render(BoundSelect, { props: { state: 'error' } });

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

	it.each([
		{ state: 'error', expected: 'true' },
		{ state: 'warn', expected: null },
		{ state: 'info', expected: null }
	] as const)('sets aria-invalid to $expected in the $state state', ({ state, expected }) => {
		const { container } = render(BoundSelect, { props: { state } });

		expect(trigger(container).getAttribute('aria-invalid')).toBe(expected);
	});
});
