import { mdiRadioboxBlank, mdiRadioboxMarked } from '@mdi/js';
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { userEvent } from 'vitest/browser';

import { colorOf, textColor } from '../../__tests__/computed-style.ts';
import BoundRadioGroup from './BoundRadioGroup.svelte';
import ControlledRadioGroup from './ControlledRadioGroup.svelte';
import IndicatorRadioGroup from './IndicatorRadioGroup.svelte';
import UndefinedRadioGroup from './UndefinedRadioGroup.svelte';

const group = (container: Element) => container.querySelector<HTMLElement>('[role="radiogroup"]')!;
const radios = (container: Element) => [
	...container.querySelectorAll<HTMLButtonElement>('[role="radio"]')
];
const radio = (container: Element, label: string) =>
	radios(container).find((item) => item.textContent?.includes(label))!;
const iconPaths = (container: Element) =>
	[...container.querySelectorAll('svg path')].map((path) => path.getAttribute('d'));
const owner = (container: Element) => container.querySelector('[data-testid="owner"]')?.textContent;

describe('RadioGroup', () => {
	it('renders one radio per item with only the bound value marked', () => {
		const { container } = render(BoundRadioGroup);

		expect(radios(container).map((item) => item.getAttribute('aria-checked'))).toEqual([
			'true',
			'false',
			'false'
		]);
		expect(iconPaths(container)).toEqual([mdiRadioboxMarked, mdiRadioboxBlank, mdiRadioboxBlank]);
	});

	it('wears the shared focus ring on each item', () => {
		const { container } = render(BoundRadioGroup);

		expect(radio(container, 'Small').classList.contains('focus-ring'), 'focus-ring utility').toBe(
			true
		);
	});

	it('renders a passed indicator with the checked state instead of the radio icon', () => {
		const { container } = render(IndicatorRadioGroup);

		expect(container.querySelector('[data-testid="indicator"]')?.textContent).toBe('on');
		expect(iconPaths(container)).toEqual([mdiRadioboxBlank]);
	});

	it.each([
		{ orientation: undefined, direction: 'column', attribute: 'vertical' },
		{ orientation: 'horizontal', direction: 'row', attribute: 'horizontal' }
	] as const)(
		'lays items out in a $direction for orientation $orientation',
		({ orientation, direction, attribute }) => {
			const { container } = render(BoundRadioGroup, { props: { orientation } });

			expect(group(container).dataset.orientation).toBe(attribute);
			expect(getComputedStyle(group(container)).flexDirection).toBe(direction);
		}
	);

	it('marks every item disabled when the group is disabled', () => {
		const { container } = render(BoundRadioGroup, { props: { disabled: true } });

		expect(radios(container).map((item) => item.disabled)).toEqual([true, true, true]);
		expect(radios(container).map((item) => item.dataset.disabled)).toEqual(['', '', '']);
	});

	it('is invalid and colors every icon danger in the error state', () => {
		const { container } = render(BoundRadioGroup, { props: { state: 'error' } });

		expect(group(container).getAttribute('aria-invalid')).toBe('true');
		const danger = colorOf('text-danger-dark', 'color');
		expect([...container.querySelectorAll('[role="radio"] svg')].map(textColor)).toEqual([
			danger,
			danger,
			danger
		]);
	});

	it('renders a hidden form input carrying the value when given a name', () => {
		const { container } = render(BoundRadioGroup, { props: { name: 'size' } });

		expect(container.querySelector<HTMLInputElement>('input[name="size"]')?.value).toBe('sm');
	});

	it('two-way: clicking an item writes its value to the owner', async () => {
		const { container } = render(BoundRadioGroup);

		await userEvent.click(radio(container, 'Large'));

		expect(owner(container)).toBe('lg');
	});

	it('two-way: ArrowDown moves focus to the next item and selects it', async () => {
		const { container } = render(BoundRadioGroup);
		await userEvent.click(radio(container, 'Small'));

		await userEvent.keyboard('{ArrowDown}');

		expect(document.activeElement).toBe(radio(container, 'Medium'));
		expect(owner(container)).toBe('md');
	});

	it('two-way: renders nothing checked from undefined state and writes the clicked value', async () => {
		const { container } = render(UndefinedRadioGroup);
		expect(container.querySelector('[aria-checked="true"]')).toBeNull();
		expect(owner(container)).toBe('undefined');

		await userEvent.click(radio(container, 'Medium'));

		expect(owner(container)).toBe('md');
	});

	it('controlled: a function-binding setter can veto the selection', async () => {
		const { container } = render(ControlledRadioGroup, { props: { accept: false } });

		await userEvent.click(radio(container, 'Large'));

		expect(owner(container)).toBe('sm');
		expect(radio(container, 'Large').getAttribute('aria-checked')).toBe('false');
	});
});
