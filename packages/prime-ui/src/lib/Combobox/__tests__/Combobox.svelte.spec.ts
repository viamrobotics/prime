import { afterEach, describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { userEvent } from 'vitest/browser';

import { borderColor, colorOf } from '../../__tests__/computed-style.ts';
import BoundCombobox from './BoundCombobox.svelte';
import ControlledCombobox from './ControlledCombobox.svelte';
import UndefinedCombobox from './UndefinedCombobox.svelte';

const input = (container: Element) =>
	container.querySelector<HTMLInputElement>('[role="combobox"]')!;
const trigger = (container: Element) => container.querySelector('button')!;
const owner = (container: Element) => container.querySelector('[data-testid="owner"]')?.textContent;
const listbox = () => document.querySelector('[role="listbox"]');
const optionLabels = () =>
	[...document.querySelectorAll('[role="option"]')].map((option) => option.textContent?.trim());
const borderOf = (utility: string) => colorOf(utility, 'borderTopColor');

const optionLabeled = async (label: string) => {
	let option: Element | undefined;
	await vi.waitFor(() => {
		option = [...document.querySelectorAll('[role="option"]')].find(
			(candidate) => candidate.textContent?.trim() === label
		);
		expect(option, `an option labeled ${label} is listed`).toBeTruthy();
	});
	return option!;
};

const typeInto = async (container: Element, text: string) => {
	input(container).focus();
	input(container).select();
	await userEvent.keyboard(text);
};

afterEach(async () => {
	if (listbox()) await userEvent.keyboard('{Escape}');
});

describe('Combobox', () => {
	it('shows the bound value as the selected label', () => {
		const { container } = render(BoundCombobox);

		expect(input(container).value).toBe('Small');
	});

	it('filters the list as the user types and binds the typed text', async () => {
		const { container } = render(BoundCombobox);

		await typeInto(container, 'ar');

		await vi.waitFor(() => expect(optionLabels()).toEqual(['Large']));
		expect(container.querySelector('[data-testid="query"]')?.textContent).toBe('ar');
	});

	it('shows the empty message and selects nothing when no option matches', async () => {
		const { container } = render(BoundCombobox);

		await typeInto(container, 'zz');

		await vi.waitFor(() => expect(listbox()?.textContent).toContain('No matching size'));
		expect(optionLabels()).toEqual([]);
		await userEvent.keyboard('{Enter}');
		expect(owner(container)).toBe('sm');
	});

	it.each([
		{ typed: 'me', status: '' },
		{ typed: 'zz', status: 'No matching size' }
	])('announces $status through a status region after typing $typed', async ({ typed, status }) => {
		const { container } = render(BoundCombobox);

		await typeInto(container, typed);

		await vi.waitFor(() => {
			expect(listbox()?.querySelector('[role="status"]')?.textContent?.trim()).toBe(status);
		});
	});

	it('two-way: ArrowDown and Enter pick an option and show its label', async () => {
		const { container } = render(BoundCombobox);
		input(container).focus();

		await userEvent.keyboard('{ArrowDown}');
		await optionLabeled('Medium');
		await userEvent.keyboard('{ArrowDown}{Enter}');

		await vi.waitFor(() => expect(owner(container)).toBe('md'));
		expect(input(container).value).toBe('Medium');
		expect(listbox(), 'list closed after Enter').toBeNull();
	});

	it('two-way: clicking an option picks it and shows its label', async () => {
		const { container } = render(BoundCombobox);

		await userEvent.click(trigger(container));
		await userEvent.click(await optionLabeled('Large'));

		await vi.waitFor(() => expect(owner(container)).toBe('lg'));
		expect(input(container).value).toBe('Large');
	});

	it('two-way: picks the first match of the typed text on Enter', async () => {
		const { container } = render(BoundCombobox);

		await typeInto(container, 'me');
		await optionLabeled('Medium');
		await userEvent.keyboard('{Enter}');

		await vi.waitFor(() => expect(owner(container)).toBe('md'));
		expect(input(container).value).toBe('Medium');
	});

	it.each([
		{ name: 'the selected label', initial: 'sm', shown: 'Small' },
		{ name: 'empty when nothing is selected', initial: '', shown: '' }
	])('restores $name when leaving with text that is not an option', async ({ initial, shown }) => {
		const { container } = render(BoundCombobox, { props: { initial } });

		await typeInto(container, 'zz');
		await vi.waitFor(() => expect(listbox()).toBeTruthy());
		await userEvent.tab();

		await vi.waitFor(() => expect(listbox()).toBeNull());
		expect(input(container).value).toBe(shown);
		expect(owner(container)).toBe(initial);
	});

	it('keeps showing the selected label once items no longer hold it', async () => {
		const { container, rerender } = render(BoundCombobox);
		await userEvent.click(trigger(container));
		await userEvent.click(await optionLabeled('Large'));
		await vi.waitFor(() => expect(owner(container)).toBe('lg'));

		await rerender({ items: [{ value: 'sm', label: 'Small' }] });

		expect(input(container).value).toBe('Large');
	});

	it('Escape closes the list without clearing the value', async () => {
		const { container } = render(BoundCombobox);

		await typeInto(container, 'La');
		await optionLabeled('Large');
		await userEvent.keyboard('{Escape}');

		await vi.waitFor(() => expect(listbox()).toBeNull());
		expect(owner(container)).toBe('sm');
		expect(input(container).value).toBe('Small');
		expect(container.querySelector('[data-testid="query"]')?.textContent).toBe('');
	});

	it('lists every option when reopened after a selection', async () => {
		const { container } = render(BoundCombobox);
		await typeInto(container, 'me');
		await optionLabeled('Medium');
		await userEvent.keyboard('{Enter}');
		await vi.waitFor(() => expect(listbox()).toBeNull());

		await userEvent.click(trigger(container));

		await vi.waitFor(() => expect(optionLabels()).toEqual(['Small', 'Medium', 'Large']));
	});

	it('toggles the list from the trigger and keeps focus in the input', async () => {
		const { container } = render(BoundCombobox);

		await userEvent.click(trigger(container));
		await vi.waitFor(() => expect(listbox()).toBeTruthy());
		expect(document.activeElement).toBe(input(container));

		await userEvent.click(trigger(container));
		await vi.waitFor(() => expect(listbox()).toBeNull());
	});

	it.each([
		{ accept: true, picked: 'md', shown: 'Medium' },
		{ accept: false, picked: 'sm', shown: 'Small' }
	])(
		'controlled: accept=$accept leaves the value $picked and the input showing $shown',
		async ({ accept, picked, shown }) => {
			const { container } = render(ControlledCombobox, { props: { accept } });

			await typeInto(container, 'med');
			await optionLabeled('Medium');
			await userEvent.keyboard('{Enter}');

			await vi.waitFor(() => expect(listbox()).toBeNull());
			expect(owner(container)).toBe(picked);
			expect(input(container).value).toBe(shown);
		}
	);

	it('controlled: a refused click leaves the input showing the old label', async () => {
		const { container } = render(ControlledCombobox, { props: { accept: false } });
		input(container).focus();
		await userEvent.keyboard('{ArrowDown}');

		await userEvent.click(await optionLabeled('Large'));

		await vi.waitFor(() => expect(listbox()).toBeNull());
		expect(owner(container)).toBe('sm');
		expect(input(container).value).toBe('Small');
	});

	it('two-way: starts empty from undefined state and writes the picked value back', async () => {
		const { container } = render(UndefinedCombobox);
		expect(input(container).value).toBe('');
		expect(owner(container)).toBe('undefined');

		await typeInto(container, 'lar');
		await optionLabeled('Large');
		await userEvent.keyboard('{Enter}');

		await vi.waitFor(() => expect(owner(container)).toBe('lg'));
		expect(input(container).value).toBe('Large');
	});

	it('renders a hidden form input carrying the value when given a name', () => {
		const { container } = render(BoundCombobox, { props: { name: 'size' } });

		expect(container.querySelector<HTMLInputElement>('input[name="size"]')?.value).toBe('sm');
	});

	it('wears the shared input frame, which carries the focus ring', () => {
		const { container } = render(ControlledCombobox);

		expect(input(container).classList.contains('input'), 'input class').toBe(true);
	});

	it('hands its frame to the enclosing input group', () => {
		const { container } = render(BoundCombobox);
		const group = container.querySelector('[data-testid="group"]')!;

		expect(getComputedStyle(group).borderTopWidth).toBe('1px');
		expect(getComputedStyle(input(container)).borderTopWidth).toBe('0px');
	});

	it('lines the panel up with the enclosing input group', async () => {
		const { container } = render(BoundCombobox);
		const group = container.querySelector('[data-testid="group"]')!.getBoundingClientRect();

		await userEvent.click(trigger(container));

		await vi.waitFor(() => {
			const panel = listbox()!.getBoundingClientRect();
			expect(
				{ left: Math.round(panel.left), width: Math.round(panel.width) },
				'panel edge and width'
			).toEqual({ left: Math.round(group.left), width: Math.round(group.width) });
		});
	});

	it('gives the trigger a 24px hit area without growing the group past a plain input', () => {
		const { container } = render(BoundCombobox);
		const button = trigger(container).getBoundingClientRect();
		const group = container.querySelector('[data-testid="group"]')!.getBoundingClientRect();
		const plain = container.querySelector('[data-testid="plain"]')!.getBoundingClientRect();

		expect({ width: button.width, height: button.height }, 'trigger box').toEqual({
			width: 24,
			height: 24
		});
		expect(group.height, 'group height').toBe(plain.height);
	});

	it('colors the group border danger and sets aria-invalid in the error state', () => {
		const { container } = render(BoundCombobox, { props: { state: 'error' } });
		const group = container.querySelector('[data-testid="group"]')!;

		expect(input(container).getAttribute('aria-invalid')).toBe('true');
		expect(borderColor(group)).toBe(borderOf('border-danger-dark'));
	});

	it('disables the input and the trigger when disabled', async () => {
		const { container } = render(BoundCombobox, { props: { disabled: true } });

		await userEvent.click(trigger(container), { force: true });

		expect(input(container).disabled).toBe(true);
		expect(trigger(container).disabled).toBe(true);
		expect(listbox()).toBeNull();
	});
});
