import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { userEvent } from 'vitest/browser';

import {
	backgroundColor,
	borderColor,
	colorOf,
	textColor
} from '../../../../test/computed-style.ts';
import BoundToggleButtons from './fixtures/BoundToggleButtons.svelte';
import ControlledToggleButtons from './fixtures/ControlledToggleButtons.svelte';
import UndefinedToggleButtons from './fixtures/UndefinedToggleButtons.svelte';

const items = [
	{ value: 'sm', label: 'Small' },
	{ value: 'md', label: 'Medium' },
	{ value: 'lg', label: 'Large' }
];

const group = (container: Element) => container.querySelector<HTMLElement>('[role="radiogroup"]')!;
const radios = (container: Element) => [
	...container.querySelectorAll<HTMLButtonElement>('[role="radio"]')
];
const radio = (container: Element, label: string) =>
	radios(container).find((item) => item.textContent?.includes(label))!;
const owner = (container: Element) => container.querySelector('[data-testid="owner"]')?.textContent;

describe('ToggleButtons', () => {
	it.each([
		{
			source: 'items',
			props: {
				items: [
					{ value: 'xs', label: 'Tiny' },
					{ value: 'xl', label: 'Huge' }
				]
			},
			labels: ['Tiny', 'Huge']
		},
		{ source: 'Item children', props: {}, labels: ['Small', 'Medium', 'Large'] }
	])('renders one radio per option from $source inside the group', ({ props, labels }) => {
		const { container } = render(BoundToggleButtons, { props });

		expect(
			[...group(container).querySelectorAll('[role="radio"]')].map((item) =>
				item.textContent?.trim()
			)
		).toEqual(labels);
	});

	it('marks only the bound value checked', () => {
		const { container } = render(BoundToggleButtons, { props: { items } });

		expect(radios(container).map((item) => item.getAttribute('aria-checked'))).toEqual([
			'true',
			'false',
			'false'
		]);
	});

	it('two-way: clicking an item writes its value to the owner and checks it alone', async () => {
		const { container } = render(BoundToggleButtons, { props: { items } });

		await userEvent.click(radio(container, 'Large'));

		expect(owner(container)).toBe('lg');
		expect(radios(container).map((item) => item.getAttribute('aria-checked'))).toEqual([
			'false',
			'false',
			'true'
		]);
	});

	it('two-way: starts from undefined without throwing and writes the clicked value', async () => {
		const { container } = render(UndefinedToggleButtons);
		expect(container.querySelector('[aria-checked="true"]')).toBeNull();
		expect(owner(container)).toBe('undefined');

		await userEvent.click(radio(container, 'Medium'));

		expect(owner(container)).toBe('md');
	});

	it.each([
		{ accept: true, expected: 'lg', checked: 'true' },
		{ accept: false, expected: 'sm', checked: 'false' }
	])(
		'controlled: a setter that accepts is $accept updates the owner to $expected',
		async ({ accept, expected, checked }) => {
			const { container } = render(ControlledToggleButtons, { props: { accept } });

			await userEvent.click(radio(container, 'Large'));

			expect(owner(container)).toBe(expected);
			expect(radio(container, 'Large').getAttribute('aria-checked')).toBe(checked);
		}
	);

	it('disables every item when the group is disabled', () => {
		const { container } = render(BoundToggleButtons, { props: { disabled: true } });

		expect(radios(container).map((item) => item.disabled)).toEqual([true, true, true]);
	});

	it('paints every unselected item disabled when the group is disabled', () => {
		const { container } = render(BoundToggleButtons, { props: { disabled: true } });
		const unselected = [radio(container, 'Medium'), radio(container, 'Large')];
		const background = colorOf('bg-disabled-light', 'backgroundColor');
		const text = colorOf('text-disabled-dark', 'color');

		expect(unselected.map(backgroundColor)).toEqual([background, background]);
		expect(unselected.map(textColor)).toEqual([text, text]);
	});

	it('paints the selected item of a disabled group disabled and darker than the others', () => {
		const { container } = render(BoundToggleButtons, { props: { disabled: true } });
		const selected = radio(container, 'Small');
		const other = radio(container, 'Medium');

		expect(backgroundColor(selected)).toBe(colorOf('bg-gray-4', 'backgroundColor'));
		expect(backgroundColor(selected)).not.toBe(backgroundColor(other));
		expect(textColor(selected)).toBe(colorOf('text-disabled-dark', 'color'));
	});

	it('disables an item alone when it is disabled itself', () => {
		const { container } = render(BoundToggleButtons, { props: { itemDisabled: true } });

		expect(radios(container).map((item) => item.disabled)).toEqual([false, true, false]);
	});

	it('is invalid in the error state', () => {
		const { container } = render(BoundToggleButtons, { props: { state: 'error' } });

		expect(group(container).getAttribute('aria-invalid')).toBe('true');
	});

	it('is a radiogroup and not a plain group', () => {
		const { container } = render(BoundToggleButtons);

		expect(container.querySelectorAll('[role="radiogroup"]')).toHaveLength(1);
		expect(container.querySelector('[role="group"]')).toBeNull();
	});

	it.each([
		{ state: 'error', color: 'border-danger-dark' },
		{ state: 'none', color: 'border-gray-6' }
	] as const)('draws every item border $color in the $state state', ({ state, color }) => {
		const { container } = render(BoundToggleButtons, { props: { state } });
		const expected = colorOf(color, 'borderTopColor');

		expect(radios(container).map(borderColor)).toEqual([expected, expected, expected]);
	});

	it('keeps the disabled border over the error border', () => {
		const { container } = render(BoundToggleButtons, { props: { state: 'error', disabled: true } });

		expect(borderColor(radio(container, 'Medium'))).toBe(
			colorOf('border-disabled-light', 'borderTopColor')
		);
	});

	it('makes the selected option the only Tab stop', () => {
		const { container } = render(BoundToggleButtons, { props: { initial: 'md' } });

		expect(radios(container).map((item) => item.tabIndex)).toEqual([-1, 0, -1]);
	});

	it('Tab from before the group focuses the selected option', async () => {
		const { container } = render(BoundToggleButtons, { props: { initial: 'lg' } });

		await userEvent.tab();

		expect(document.activeElement).toBe(radio(container, 'Large'));
	});

	it('keeps a Tab stop when the selected option is disabled', async () => {
		const { container } = render(BoundToggleButtons, {
			props: { initial: 'md', itemDisabled: true }
		});

		await userEvent.tab();

		expect(radio(container, 'Medium').disabled).toBe(true);
		expect(document.activeElement).toBe(radio(container, 'Small'));
	});

	it('moves the Tab stop to an option when it is clicked', async () => {
		const { container } = render(BoundToggleButtons, { props: { initial: 'md' } });

		await userEvent.click(radio(container, 'Large'));

		expect(radios(container).map((item) => item.tabIndex)).toEqual([-1, -1, 0]);
	});

	it('leaves the Tab stop on the first option when nothing is selected', () => {
		const { container } = render(UndefinedToggleButtons);

		expect(radios(container).map((item) => item.tabIndex)).toEqual([0, -1, -1]);
	});

	it('passes aria-labelledby and aria-describedby to the group', () => {
		const { container } = render(BoundToggleButtons, {
			props: { 'aria-labelledby': 'label-id', 'aria-describedby': 'hint-id' }
		});

		expect(group(container).getAttribute('aria-labelledby')).toBe('label-id');
		expect(group(container).getAttribute('aria-describedby')).toBe('hint-id');
	});

	it('paints the selected item light and default, and the others medium and subtle', () => {
		const { container } = render(BoundToggleButtons);
		const selected = colorOf('bg-light', 'backgroundColor');
		const unselected = colorOf('bg-medium', 'backgroundColor');
		const selectedText = colorOf('text-default', 'color');
		const unselectedText = colorOf('text-subtle-1', 'color');

		expect(radios(container).map(backgroundColor)).toEqual([selected, unselected, unselected]);
		expect(radios(container).map(textColor)).toEqual([
			selectedText,
			unselectedText,
			unselectedText
		]);
	});

	it('ArrowRight moves focus to the next item without changing the selection', async () => {
		const { container } = render(BoundToggleButtons);
		radio(container, 'Small').focus();

		await userEvent.keyboard('{ArrowRight}');

		expect(document.activeElement).toBe(radio(container, 'Medium'));
		expect(owner(container)).toBe('sm');
	});

	it('clicking the selected item keeps it selected', async () => {
		const { container } = render(BoundToggleButtons);

		await userEvent.click(radio(container, 'Small'));

		expect(radio(container, 'Small').getAttribute('aria-checked')).toBe('true');
		expect(owner(container)).toBe('sm');
	});

	it('ArrowRight wraps from the last item to the first', async () => {
		const { container } = render(BoundToggleButtons);
		radio(container, 'Large').focus();

		await userEvent.keyboard('{ArrowRight}');

		expect(document.activeElement).toBe(radio(container, 'Small'));
	});
});
