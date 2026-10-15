import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { userEvent } from 'vitest/browser';

import BoundRadioGroup from './BoundRadioGroup.svelte';
import ControlledRadioGroup from './ControlledRadioGroup.svelte';
import IndicatorRadioGroup from './IndicatorRadioGroup.svelte';

const radio = (container: Element, label: string) =>
	[...container.querySelectorAll('[role="radio"]')].find((r) => r.textContent?.includes(label))!;

describe('RadioGroup', () => {
	it('renders a radiogroup with the selected value marked', () => {
		const { container } = render(BoundRadioGroup, { props: {} });
		expect(container.querySelector('[role="radiogroup"]')).toBeTruthy();
		expect(container.querySelectorAll('[role="radio"]').length).toBe(3);
		expect(container.querySelectorAll('[data-testid="icon-radiobox-marked"]').length).toBe(1);
		expect(container.querySelectorAll('[data-testid="icon-radiobox-blank"]').length).toBe(2);
	});

	it('renders a passed indicator with the checked state instead of the radio icon', () => {
		const { container } = render(IndicatorRadioGroup, { props: {} });

		expect(container.querySelector('[data-testid="indicator"]')?.textContent).toBe('on');
		expect(container.querySelectorAll('[data-testid="icon-radiobox-marked"]').length).toBe(0);
		expect(container.querySelectorAll('[data-testid="icon-radiobox-blank"]').length).toBe(1);
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
});
