import { mdiRadioboxBlank, mdiRadioboxMarked } from '@mdi/js';
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { userEvent } from 'vitest/browser';

import { colorOf, textColor } from '../../__tests__/computed-style.ts';
import BoundRadioGroup from './BoundRadioGroup.svelte';
import ControlledRadioGroup from './ControlledRadioGroup.svelte';
import DisabledRadioGroup from './DisabledRadioGroup.svelte';
import ErrorRadioGroup from './ErrorRadioGroup.svelte';
import IndicatorRadioGroup from './IndicatorRadioGroup.svelte';
import UndefinedRadioGroup from './UndefinedRadioGroup.svelte';

const radio = (container: Element, label: string) =>
	[...container.querySelectorAll('[role="radio"]')].find((r) => r.textContent?.includes(label))!;

describe('RadioGroup', () => {
	it('renders a radiogroup with the selected value marked', () => {
		const { container } = render(BoundRadioGroup, { props: {} });
		expect(container.querySelector('[role="radiogroup"]')).toBeTruthy();
		expect(container.querySelectorAll('[role="radio"]').length).toBe(3);
		expect(
			[...container.querySelectorAll('svg path')].filter(
				(path) => path.getAttribute('d') === mdiRadioboxMarked
			).length
		).toBe(1);
		expect(
			[...container.querySelectorAll('svg path')].filter(
				(path) => path.getAttribute('d') === mdiRadioboxBlank
			).length
		).toBe(2);
	});

	it('gives each item the shared focus ring', () => {
		const { container } = render(BoundRadioGroup, { props: {} });
		expect(radio(container, 'Small').classList.contains('focus-visible:outline-2')).toBe(true);
	});

	it('renders a passed indicator with the checked state instead of the radio icon', () => {
		const { container } = render(IndicatorRadioGroup, { props: {} });

		expect(container.querySelector('[data-testid="indicator"]')?.textContent).toBe('on');
		expect(
			[...container.querySelectorAll('svg path')].filter(
				(path) => path.getAttribute('d') === mdiRadioboxMarked
			).length
		).toBe(0);
		expect(
			[...container.querySelectorAll('svg path')].filter(
				(path) => path.getAttribute('d') === mdiRadioboxBlank
			).length
		).toBe(1);
	});

	it('two-way: bind:value keeps the owner in sync', async () => {
		const { container, getByText } = render(BoundRadioGroup, { props: {} });
		expect(container.querySelector('[data-testid="owner"]')?.textContent).toBe('sm');
		await userEvent.click(getByText('Large'));
		expect(container.querySelector('[data-testid="owner"]')?.textContent).toBe('lg');
	});

	it('controlled: a function-binding setter can veto the selection', async () => {
		const { container, getByText } = render(ControlledRadioGroup, { props: { accept: false } });
		await userEvent.click(getByText('Large'));
		expect(container.querySelector('[data-testid="owner"]')?.textContent).toBe('sm');
		expect(radio(container, 'Large').getAttribute('aria-checked')).toBe('false');
	});

	it('renders an undefined initial binding with nothing checked and writes the clicked value', async () => {
		const { container, getByText } = render(UndefinedRadioGroup, { props: {} });
		expect(container.querySelector('[aria-checked="true"]')).toBeNull();
		expect(container.querySelector('[data-testid="owner"]')?.textContent).toBe('undefined');
		await userEvent.click(getByText('Medium'));
		expect(container.querySelector('[data-testid="owner"]')?.textContent).toBe('md');
	});

	it('marks every item disabled when the group is disabled', () => {
		const { container } = render(DisabledRadioGroup, { props: {} });
		const items = [...container.querySelectorAll('[role="radio"]')];
		const enabled = items.filter(
			(item) => !item.hasAttribute('data-disabled') || !item.hasAttribute('disabled')
		);
		expect(items.length).toBe(2);
		expect(enabled.length).toBe(0);
	});

	it('is invalid and colors each item icon as an error inside an error field', () => {
		const { container } = render(ErrorRadioGroup);
		expect(container.querySelector('[role="radiogroup"]')?.getAttribute('aria-invalid')).toBe(
			'true'
		);
		const colors = [...container.querySelectorAll('[role="radio"] svg')].map(textColor);
		expect(colors).toEqual([
			colorOf('text-danger-dark', 'color'),
			colorOf('text-danger-dark', 'color')
		]);
	});
});
