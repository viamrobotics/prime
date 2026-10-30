import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { userEvent } from 'vitest/browser';

import { backgroundColor } from '../../__tests__/computed-style.ts';
import BoundToggleButtons from './BoundToggleButtons.svelte';
import ControlledToggleButtons from './ControlledToggleButtons.svelte';
import UndefinedToggleButtons from './UndefinedToggleButtons.svelte';

const items = [
	{ value: 'sm', label: 'Small' },
	{ value: 'md', label: 'Medium' },
	{ value: 'lg', label: 'Large' }
];

const group = (container: Element) => container.querySelector<HTMLElement>('[role="group"]')!;
const radios = (container: Element) => [
	...container.querySelectorAll<HTMLButtonElement>('[role="radio"]')
];
const radio = (container: Element, label: string) =>
	radios(container).find((item) => item.textContent?.includes(label))!;
const owner = (container: Element) => container.querySelector('[data-testid="owner"]')?.textContent;

describe('ToggleButtons', () => {
	it('renders one radio per item inside a group', () => {
		const { container } = render(BoundToggleButtons, { props: { items } });

		expect(group(container)).not.toBeNull();
		expect(radios(container).map((item) => item.textContent?.trim())).toEqual([
			'Small',
			'Medium',
			'Large'
		]);
	});

	it('renders one radio per Item child inside a group', () => {
		const { container } = render(BoundToggleButtons);

		expect(group(container)).not.toBeNull();
		expect(radios(container).map((item) => item.textContent?.trim())).toEqual([
			'Small',
			'Medium',
			'Large'
		]);
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

	it('disables an item alone when it is disabled itself', () => {
		const { container } = render(BoundToggleButtons, { props: { itemDisabled: true } });

		expect(radios(container).map((item) => item.disabled)).toEqual([false, true, false]);
	});

	it('is invalid in the error state', () => {
		const { container } = render(BoundToggleButtons, { props: { state: 'error' } });

		expect(group(container).getAttribute('aria-invalid')).toBe('true');
	});

	it('passes aria-labelledby and aria-describedby to the group', () => {
		const { container } = render(BoundToggleButtons, {
			props: { 'aria-labelledby': 'label-id', 'aria-describedby': 'hint-id' }
		});

		expect(group(container).getAttribute('aria-labelledby')).toBe('label-id');
		expect(group(container).getAttribute('aria-describedby')).toBe('hint-id');
	});

	it('paints the selected item differently from an unselected one', () => {
		const { container } = render(BoundToggleButtons);

		expect(backgroundColor(radio(container, 'Small'))).not.toBe(
			backgroundColor(radio(container, 'Medium'))
		);
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
