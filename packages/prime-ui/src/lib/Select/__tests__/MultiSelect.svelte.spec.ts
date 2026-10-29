import { afterEach, describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { userEvent } from 'vitest/browser';

import BoundMultiSelect from './BoundMultiSelect.svelte';
import ControlledMultiSelect from './ControlledMultiSelect.svelte';

const trigger = (container: Element) => container.querySelector('button')!;
const owner = (container: Element) => container.querySelector('[data-testid="owner"]')?.textContent;
const listbox = () => document.querySelector('[role="listbox"]');

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

afterEach(async () => {
	if (listbox()) await userEvent.keyboard('{Escape}');
});

describe('MultiSelect', () => {
	it('shows the bound values joined on the closed trigger', () => {
		const { container } = render(BoundMultiSelect);

		expect(trigger(container).textContent).toContain('Small');
	});

	it('two-way: picking a second option adds it and keeps the list open', async () => {
		const { container } = render(BoundMultiSelect);
		await userEvent.click(trigger(container));

		await userEvent.click(await optionLabeled('Medium'));

		await vi.waitFor(() => expect(owner(container)).toBe('sm,md'));
		expect(listbox(), 'list stays open after a pick').toBeTruthy();
	});

	it('two-way: picking a selected option again removes it', async () => {
		const { container } = render(BoundMultiSelect);
		await userEvent.click(trigger(container));

		await userEvent.click(await optionLabeled('Small'));

		await vi.waitFor(() => expect(owner(container)).toBe(''));
	});

	it('shows every selected label on the closed trigger after the list closes', async () => {
		const { container } = render(BoundMultiSelect);
		await userEvent.click(trigger(container));
		await userEvent.click(await optionLabeled('Medium'));

		await userEvent.keyboard('{Escape}');

		await vi.waitFor(() => expect(listbox()).toBeNull());
		expect(trigger(container).textContent).toContain('Small, Medium');
	});

	it('two-way: ArrowDown opens, ArrowDown highlights the next option, Enter toggles it', async () => {
		const { container } = render(BoundMultiSelect);
		trigger(container).focus();

		await userEvent.keyboard('{ArrowDown}');
		await vi.waitFor(() => expect(listbox(), 'list opened').toBeTruthy());
		await userEvent.keyboard('{ArrowDown}{Enter}');

		await vi.waitFor(() => expect(owner(container)).toBe('sm,md'));
	});

	it('renders one hidden form input per selected value when given a name', () => {
		const { container } = render(BoundMultiSelect, { props: { name: 'sizes' } });

		const inputs = [...container.querySelectorAll<HTMLInputElement>('input[name="sizes"]')];
		expect(inputs.map((input) => input.value)).toEqual(['sm']);
	});

	it('controlled: a function-binding setter can veto the change', async () => {
		const { container } = render(ControlledMultiSelect, { props: { accept: false } });
		await userEvent.click(trigger(container));

		await userEvent.click(await optionLabeled('Medium'));

		await vi.waitFor(() => expect(owner(container)).toBe('sm'));
	});
});
