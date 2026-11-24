import { mdiCheck } from '@mdi/js';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { userEvent } from 'vitest/browser';

import type { ComboboxFilter } from '../filter.ts';

import { borderColor, colorOf } from '../../../../test/computed-style.ts';
import ComboboxEmpty from '../ComboboxEmpty.svelte';
import ComboboxInput from '../ComboboxInput.svelte';
import ComboboxItems from '../ComboboxItems.svelte';
import BoundCombobox from './fixtures/BoundCombobox.svelte';
import ControlledCombobox from './fixtures/ControlledCombobox.svelte';
import CustomItemsCombobox from './fixtures/CustomItemsCombobox.svelte';
import IndicatorCombobox from './fixtures/IndicatorCombobox.svelte';
import UndefinedCombobox from './fixtures/UndefinedCombobox.svelte';

const input = (container: Element) =>
	container.querySelector<HTMLInputElement>('[role="combobox"]')!;
const trigger = (container: Element) => container.querySelector('button')!;
const owner = (container: Element) => container.querySelector('[data-testid="owner"]')?.textContent;
const boundQuery = (container: Element) =>
	container.querySelector('[data-testid="query"]')?.textContent;
const group = (container: Element) => container.querySelector('[data-testid="group"]')!;
const listbox = () => document.querySelector('[role="listbox"]');
const statusRegion = (container: Element) =>
	container.querySelector<HTMLElement>('[role="status"]')!;
const options = () => [...document.querySelectorAll('[role="option"]')];
const optionLabels = () => options().map((option) => option.textContent?.trim());
const borderOf = (utility: string) => colorOf(utility, 'borderTopColor');

const optionLabeled = async (label: string) => {
	let option: Element | undefined;
	await vi.waitFor(() => {
		option = options().find((candidate) => candidate.textContent?.trim() === label);
		expect(option, `an option labeled ${label} is listed`).toBeTruthy();
	});
	return option!;
};

const typeInto = async (container: Element, text: string) => {
	input(container).focus();
	input(container).select();
	await userEvent.keyboard(text);
};

const openFromTrigger = async (container: Element) => {
	await userEvent.click(trigger(container));
	await vi.waitFor(() => expect(options().length, 'options rendered').toBeGreaterThan(0));
};

const innermostWithText = (root: Element | null, text: string) =>
	[...(root?.querySelectorAll('*') ?? [])]
		.filter((node) => node.textContent?.trim() === text)
		.at(-1);

const startsWithQuery: ComboboxFilter = (option, query) =>
	option.label.toLowerCase().startsWith(query.toLowerCase());

afterEach(async () => {
	if (listbox()) await userEvent.keyboard('{Escape}');
});

describe('Combobox', () => {
	it('shows the bound value as the selected label', () => {
		const { container } = render(BoundCombobox);

		expect(input(container).value).toBe('Small');
	});

	it('filters the list to the options whose label contains the typed text', async () => {
		const { container } = render(BoundCombobox);

		await typeInto(container, 'ar');

		await vi.waitFor(() => expect(optionLabels()).toEqual(['Large']));
	});

	it('binds the typed text to query', async () => {
		const { container } = render(BoundCombobox);

		await typeInto(container, 'ar');

		await vi.waitFor(() => expect(boundQuery(container)).toBe('ar'));
	});

	it('ignores case and surrounding spaces in the default filter', async () => {
		const { container } = render(BoundCombobox);

		await typeInto(container, ' LA ');

		await vi.waitFor(() => expect(optionLabels()).toEqual(['Large']));
	});

	it('keeps the options a custom filter accepts', async () => {
		const { container } = render(BoundCombobox, { props: { filter: startsWithQuery } });

		await typeInto(container, 'l');

		await vi.waitFor(() => expect(optionLabels()).toEqual(['Large']));
	});

	it('shows the empty message in the list when no option matches', async () => {
		const { container } = render(BoundCombobox);

		await typeInto(container, 'zz');

		await vi.waitFor(() => expect(listbox()?.textContent?.trim()).toBe('No matching size'));
		expect(optionLabels()).toEqual([]);
	});

	it('selects nothing on Enter when no option matches', async () => {
		const { container } = render(BoundCombobox);
		await typeInto(container, 'zz');
		await vi.waitFor(() => expect(listbox()?.textContent?.trim()).toBe('No matching size'));

		await userEvent.keyboard('{Enter}');

		expect(owner(container)).toBe('sm');
	});

	it.each([
		{ typed: 'me', status: '' },
		{ typed: 'zz', status: 'No matching size' }
	])(
		'announces $status through a status region outside the listbox after typing $typed',
		async ({ typed, status }) => {
			const { container } = render(BoundCombobox);

			await typeInto(container, typed);

			await vi.waitFor(() => {
				expect(statusRegion(container).textContent?.trim()).toBe(status);
			});
			expect(
				listbox()?.contains(statusRegion(container)),
				'status region sits outside the listbox'
			).toBe(false);
		}
	);

	it('keeps the status region mounted and empty while the list is closed', async () => {
		const { container } = render(BoundCombobox);

		expect(statusRegion(container).textContent?.trim(), 'before opening').toBe('');

		await typeInto(container, 'zz');

		await vi.waitFor(() =>
			expect(statusRegion(container).textContent?.trim(), 'while open with no match').toBe(
				'No matching size'
			)
		);

		await userEvent.keyboard('{Escape}');

		await vi.waitFor(() => expect(listbox(), 'list closed').toBeNull());
		expect(statusRegion(container).textContent?.trim(), 'after closing').toBe('');
	});

	it('hides the visible empty message from assistive technology', async () => {
		const { container } = render(BoundCombobox);

		await typeInto(container, 'zz');

		await vi.waitFor(() =>
			expect(innermostWithText(listbox(), 'No matching size')?.getAttribute('aria-hidden')).toBe(
				'true'
			)
		);
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
		{ allowDeselect: undefined, value: 'sm' },
		{ allowDeselect: true, value: '' }
	])(
		'clicking the selected option with allowDeselect=$allowDeselect leaves the value "$value"',
		async ({ allowDeselect, value }) => {
			const { container } = render(BoundCombobox, { props: { allowDeselect } });
			await openFromTrigger(container);

			await userEvent.click(await optionLabeled('Small'));

			await vi.waitFor(() => expect(owner(container)).toBe(value));
		}
	);

	it.each([
		{ name: 'the selected label', initial: 'sm', shown: 'Small' },
		{ name: 'empty when nothing is selected', initial: '', shown: '' }
	])('restores $name when leaving with text that is not an option', async ({ initial, shown }) => {
		const { container } = render(BoundCombobox, { props: { initial } });

		await typeInto(container, 'zz');
		await vi.waitFor(() => expect(listbox(), 'list opened').not.toBeNull());
		await userEvent.tab();

		await vi.waitFor(() => expect(listbox(), 'list closed').toBeNull());
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

		await vi.waitFor(() => expect(listbox(), 'list closed').toBeNull());
		expect(owner(container)).toBe('sm');
		expect(input(container).value).toBe('Small');
		expect(boundQuery(container)).toBe('');
	});

	it('lists every option when reopened after a selection', async () => {
		const { container } = render(BoundCombobox);
		await typeInto(container, 'me');
		await optionLabeled('Medium');
		await userEvent.keyboard('{Enter}');
		await vi.waitFor(() => expect(listbox(), 'list closed').toBeNull());

		await userEvent.click(trigger(container));

		await vi.waitFor(() => expect(optionLabels()).toEqual(['Small', 'Medium', 'Large']));
	});

	it('draws a check on the selected option only', async () => {
		const { container } = render(BoundCombobox);

		await openFromTrigger(container);

		expect(
			options().map((option) => option.querySelector('svg path')?.getAttribute('d') ?? null)
		).toEqual([mdiCheck, null, null]);
	});

	it('marks a disabled option for assistive technology', async () => {
		const { container } = render(BoundCombobox, {
			props: {
				items: [
					{ value: 'sm', label: 'Small' },
					{ value: 'md', label: 'Medium', disabled: true },
					{ value: 'lg', label: 'Large' }
				]
			}
		});

		await openFromTrigger(container);

		expect(options().map((option) => option.getAttribute('aria-disabled'))).toEqual([
			null,
			'true',
			null
		]);
	});

	it('renders a custom snippet for each matching option', async () => {
		const { container } = render(CustomItemsCombobox);
		input(container).focus();

		await userEvent.keyboard('{ArrowDown}');

		await vi.waitFor(() => expect(optionLabels()).toEqual(['SMALL (selected)', 'LARGE']));
	});

	it('opens the list from the trigger while focus stays in the input', async () => {
		const { container } = render(BoundCombobox);

		await userEvent.click(trigger(container));

		await vi.waitFor(() => expect(listbox(), 'list opened').not.toBeNull());
		expect(document.activeElement).toBe(input(container));
	});

	it('closes the open list when the trigger is pressed again', async () => {
		const { container } = render(BoundCombobox);
		await openFromTrigger(container);

		await userEvent.click(trigger(container));

		await vi.waitFor(() => expect(listbox(), 'list closed').toBeNull());
	});

	it('names the trigger Show options', () => {
		const { container } = render(BoundCombobox);

		expect(trigger(container).getAttribute('aria-label')).toBe('Show options');
	});

	it('keeps the trigger out of the tab order', () => {
		const { container } = render(BoundCombobox);

		expect(trigger(container).tabIndex).toBe(-1);
	});

	it('renders a passed trigger indicator instead of the chevron', () => {
		const { container } = render(IndicatorCombobox);

		expect(container.querySelector('[data-testid="indicator"]')?.textContent).toBe('v');
		expect(container.querySelector('svg'), 'no default chevron').toBeNull();
	});

	it.each([
		{ required: true, ariaRequired: 'true' },
		{ required: undefined, ariaRequired: null }
	])(
		'sets aria-required to $ariaRequired on the input when required is $required',
		({ required, ariaRequired }) => {
			const { container } = render(BoundCombobox, { props: { required } });

			expect(input(container).getAttribute('aria-required')).toBe(ariaRequired);
		}
	);

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

			await vi.waitFor(() => expect(listbox(), 'list closed').toBeNull());
			expect(owner(container)).toBe(picked);
			expect(input(container).value).toBe(shown);
		}
	);

	it('controlled: a refused click leaves the input showing the old label', async () => {
		const { container } = render(ControlledCombobox, { props: { accept: false } });
		input(container).focus();
		await userEvent.keyboard('{ArrowDown}');

		await userEvent.click(await optionLabeled('Large'));

		await vi.waitFor(() => expect(listbox(), 'list closed').toBeNull());
		expect(owner(container)).toBe('sm');
		expect(input(container).value).toBe('Small');
	});

	it('two-way: starts empty from undefined state and writes the picked value back', async () => {
		const { container } = render(UndefinedCombobox);

		expect(input(container).value, 'input before picking').toBe('');
		expect(owner(container), 'owner before picking').toBe('undefined');

		await typeInto(container, 'lar');
		await optionLabeled('Large');
		await userEvent.keyboard('{Enter}');

		await vi.waitFor(() => expect(owner(container), 'owner after picking').toBe('lg'));
		expect(input(container).value, 'input after picking').toBe('Large');
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

		expect(getComputedStyle(group(container)).borderTopWidth).toBe('1px');
		expect(getComputedStyle(input(container)).borderTopWidth).toBe('0px');
	});

	it('lines the panel up with the enclosing input group', async () => {
		const { container } = render(BoundCombobox);
		const frame = group(container).getBoundingClientRect();

		await userEvent.click(trigger(container));

		await vi.waitFor(() => {
			const panel = listbox()!.getBoundingClientRect();
			expect(
				{ left: Math.round(panel.left), width: Math.round(panel.width) },
				'panel edge and width'
			).toEqual({ left: Math.round(frame.left), width: Math.round(frame.width) });
		});
	});

	it('gives the trigger a 24px hit area without growing the group past a plain input', () => {
		const { container } = render(BoundCombobox);
		const button = trigger(container).getBoundingClientRect();
		const frame = group(container).getBoundingClientRect();
		const plain = container.querySelector('[data-testid="plain"]')!.getBoundingClientRect();

		expect({ width: button.width, height: button.height }, 'trigger box').toEqual({
			width: 24,
			height: 24
		});
		expect(frame.height, 'group height').toBe(plain.height);
	});

	it.each([
		{ state: 'error', border: 'border-danger-dark' },
		{ state: 'warn', border: 'border-warning-dark' }
	] as const)('colors the group $border in the $state state', ({ state, border }) => {
		const { container } = render(BoundCombobox, { props: { state } });

		expect(borderColor(group(container))).toBe(borderOf(border));
	});

	it.each([
		{ state: 'error', invalid: 'true' },
		{ state: 'warn', invalid: null }
	] as const)('sets aria-invalid to $invalid in the $state state', ({ state, invalid }) => {
		const { container } = render(BoundCombobox, { props: { state } });

		expect(input(container).getAttribute('aria-invalid')).toBe(invalid);
	});

	it('disables the input and the trigger when disabled', async () => {
		const { container } = render(BoundCombobox, { props: { disabled: true } });

		await userEvent.click(trigger(container), { force: true });

		expect(input(container).disabled, 'input disabled').toBe(true);
		expect(trigger(container).disabled, 'trigger disabled').toBe(true);
		expect(listbox(), 'list stays closed').toBeNull();
	});

	it.each([
		{ part: 'Combobox.Input', renderAlone: () => render(ComboboxInput) },
		{ part: 'Combobox.Items', renderAlone: () => render(ComboboxItems) },
		{ part: 'Combobox.Empty', renderAlone: () => render(ComboboxEmpty) }
	])('throws when $part is rendered outside a Combobox', ({ part, renderAlone }) => {
		expect(renderAlone).toThrow(`${part} must be rendered inside a Combobox.`);
	});
});
