import { describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { userEvent } from 'vitest/browser';

import BoundSelect from './BoundSelect.svelte';
import ControlledSelect from './ControlledSelect.svelte';

const openAndPick = async (trigger: HTMLElement, label: string) => {
	await userEvent.click(trigger);
	let option: Element | undefined;
	await vi.waitFor(() => {
		option = [...document.querySelectorAll('[role="option"]')].find((o) =>
			o.textContent?.includes(label)
		);
		expect(option).toBeTruthy();
	});
	await userEvent.click(option!);
};

describe('Select', () => {
	it('renders a trigger showing the current selection', () => {
		const { container } = render(BoundSelect);
		expect(container.querySelector('button')?.textContent).toContain('Small');
	});

	it('opens on click and lists the options', async () => {
		const { container } = render(BoundSelect);
		await userEvent.click(container.querySelector('button')!);
		await vi.waitFor(() => {
			const options = [...document.querySelectorAll('[role="option"]')];
			expect(options.map((o) => o.textContent?.trim())).toEqual(
				expect.arrayContaining(['Small', 'Medium', 'Large'])
			);
		});
	});

	it('two-way: bind:value keeps the owner in sync', async () => {
		const { container } = render(BoundSelect);
		await openAndPick(container.querySelector('button')!, 'Medium');
		await vi.waitFor(() =>
			expect(container.querySelector('[data-testid="owner"]')?.textContent).toBe('md')
		);
	});

	it('controlled: a function-binding setter can veto the selection', async () => {
		const { container } = render(ControlledSelect, { props: { accept: false } });
		const trigger = container.querySelector('button')!;
		await openAndPick(trigger, 'Medium');
		await vi.waitFor(() =>
			expect(container.querySelector('[data-testid="owner"]')?.textContent).toBe('sm')
		);
		expect(trigger.textContent).toContain('Small');
	});
});
