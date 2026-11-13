import type { ComponentProps } from 'svelte';

import { describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { commands, page, userEvent } from 'vitest/browser';

import '../../../../test/tailwind.css';
import NumberField from '../NumberField.svelte';
import BoundNumberField from './BoundNumberField.svelte';
import ControlledNumberField from './ControlledNumberField.svelte';

const input = (container: Element) => container.querySelector('input')!;
const owner = (container: Element) => container.querySelector('[data-testid="owner"]')?.textContent;

const PRESS_X = 5;
const MIDDLE = '50%';

async function scrub(offsets: number[], modifier?: 'Alt' | 'Shift') {
	await commands.mouseMove('label', { x: PRESS_X, y: MIDDLE });
	if (modifier) await commands.keyDown(modifier);
	await commands.mouseDown();
	for (const offset of offsets) {
		await commands.mouseMove('label', { x: PRESS_X + offset, y: MIDDLE });
	}
	await commands.mouseUp();
	if (modifier) await commands.keyUp(modifier);
}

function renderControlled(props: Partial<ComponentProps<typeof ControlledNumberField>> = {}) {
	const record = vi.fn<(next: number | undefined) => void>();
	const screen = render(ControlledNumberField, {
		props: { label: 'Speed', accept: true, record, ...props }
	});
	return { ...screen, values: () => record.mock.calls.map(([next]) => next) };
}

describe('NumberField', () => {
	it('takes its accessible name from label', async () => {
		render(NumberField, { props: { label: 'Speed', value: 1 } });

		await expect.element(page.getByRole('spinbutton', { name: 'Speed' })).toBeInTheDocument();
	});

	it('styles the label as subtle text', () => {
		const { container } = render(NumberField, { props: { label: 'Speed', value: 1 } });

		expect(container.querySelector('label')).toHaveClass('text-subtle-1');
	});

	it('takes its accessible name from aria-label without a label', async () => {
		const { container } = render(NumberField, { props: { 'aria-label': 'Speed', value: 1 } });

		await expect.element(page.getByRole('spinbutton', { name: 'Speed' })).toBeInTheDocument();
		expect(container.querySelector('label')).toBeNull();
	});

	it('keeps the input-compact class on the input', () => {
		const { container } = render(NumberField, { props: { label: 'Speed' } });

		expect(input(container).classList.contains('input-compact')).toBe(true);
	});

	it.each([
		{ key: '{ArrowUp}', keys: 'ArrowUp', expected: 6 },
		{ key: '{ArrowDown}', keys: 'ArrowDown', expected: 4 },
		{ key: '{Shift>}{ArrowUp}{/Shift}', keys: 'Shift+ArrowUp', expected: 15 },
		{ key: '{Shift>}{ArrowDown}{/Shift}', keys: 'Shift+ArrowDown', expected: -5 },
		{ key: '{Alt>}{ArrowUp}{/Alt}', keys: 'Alt+ArrowUp', expected: 5.1 },
		{ key: '{Alt>}{ArrowDown}{/Alt}', keys: 'Alt+ArrowDown', expected: 4.9 }
	])('$keys from 5 with step 1 writes $expected', async ({ key, expected }) => {
		const { container } = render(BoundNumberField, { props: { label: 'Speed', initial: 5 } });

		await userEvent.click(input(container));
		await userEvent.keyboard(key);

		expect(owner(container)).toBe(String(expected));
		expect(input(container).value).toBe(String(expected));
	});

	it('rounds to the step, so 0.2 plus 0.1 is exactly 0.3', async () => {
		const { container, values } = renderControlled({ initial: 0.2, step: 0.1 });

		await userEvent.click(input(container));
		await userEvent.keyboard('{ArrowUp}');

		expect(values()).toEqual([0.3]);
		expect(owner(container)).toBe('0.3');
	});

	it('clamps a key press at max', async () => {
		const { container } = render(BoundNumberField, {
			props: { label: 'Speed', initial: 8, max: 10 }
		});

		await userEvent.click(input(container));
		await userEvent.keyboard('{Shift>}{ArrowUp}{/Shift}');

		expect(owner(container)).toBe('10');
	});

	it('clamps a key press at min', async () => {
		const { container } = render(BoundNumberField, {
			props: { label: 'Speed', initial: 2, min: 0 }
		});

		await userEvent.click(input(container));
		await userEvent.keyboard('{Shift>}{ArrowDown}{/Shift}');

		expect(owner(container)).toBe('0');
	});

	it('steps an empty field from min', async () => {
		const { container } = render(BoundNumberField, { props: { label: 'Speed', min: 3 } });

		await userEvent.click(input(container));
		await userEvent.keyboard('{ArrowUp}');

		expect(owner(container)).toBe('4');
	});

	it('skips its own step when a consumer onkeydown prevents default', async () => {
		const { container, values } = renderControlled({
			initial: 5,
			onkeydown: (event) => event.preventDefault()
		});

		await userEvent.click(input(container));
		await userEvent.keyboard('{ArrowUp}');

		expect(values()).toEqual([]);
		expect(input(container).value).toBe('5');
	});

	it('leaves typing native and unclamped', async () => {
		const { container } = render(BoundNumberField, { props: { label: 'Speed', max: 10 } });

		await userEvent.click(input(container));
		await userEvent.keyboard('42');

		expect(owner(container)).toBe('42');
	});

	it('writes once per move after the threshold, each value larger, ending at start plus px times step', async () => {
		const { container, values } = renderControlled({ initial: 2, step: 0.5 });

		await scrub([10, 20, 30, 40]);

		expect(values(), 'four 10px moves at 0.5 per px from 2').toEqual([7, 12, 17, 22]);
		expect(owner(container)).toBe('22');
	});

	it('moves an Alt scrub by a tenth of the step per px', async () => {
		const { container, values } = renderControlled({ initial: 0 });

		await scrub([10, 20, 30], 'Alt');

		expect(values().at(-1)).toBe(3);
		expect(owner(container)).toBe('3');
	});

	it('moves a Shift scrub by ten steps per px', async () => {
		const { values } = renderControlled({ initial: 0 });

		await scrub([10], 'Shift');

		expect(values()).toEqual([100]);
	});

	it('clamps a scrub at max', async () => {
		const { container, values } = renderControlled({ initial: 0, max: 5 });

		await scrub([10, 20, 30]);

		expect(values()).toEqual([5]);
		expect(owner(container)).toBe('5');
	});

	it('writes nothing for a press under the threshold, and focuses the input', async () => {
		const { container, values } = renderControlled({ initial: 1 });

		await scrub([3]);

		expect(values()).toEqual([]);
		expect(document.activeElement).toBe(input(container));
	});

	it('keeps the original value and text when the binding vetoes a scrub and a key press', async () => {
		const { container, values } = renderControlled({ initial: 3, accept: false });

		await scrub([10, 20]);

		expect(values().length).toBeGreaterThan(0);
		expect(owner(container)).toBe('3');
		expect(input(container).value).toBe('3');

		await userEvent.click(input(container));
		await userEvent.keyboard('{ArrowUp}');

		expect(values().at(-1)).toBe(4);
		expect(owner(container)).toBe('3');
		expect(input(container).value).toBe('3');
	});

	it.each([{ disabled: true }, { readonly: true }])(
		'neither scrubs nor steps with %o',
		async (props) => {
			const { container, values } = renderControlled({ initial: 3, ...props });

			await scrub([10, 20]);
			input(container).focus();
			await userEvent.keyboard('{ArrowUp}');

			expect(values()).toEqual([]);
			expect(input(container).value).toBe('3');
			expect(container.querySelector('label')!.classList.contains('cursor-ew-resize')).toBe(false);
		}
	);

	it('marks a scrubbable label with the resize cursor', () => {
		const { container } = render(NumberField, { props: { label: 'Speed' } });

		const label = container.querySelector('label')!;
		expect(label.classList.contains('cursor-ew-resize')).toBe(true);
		expect(label.classList.contains('select-none')).toBe(true);
		expect(getComputedStyle(label).touchAction).toBe('none');
	});

	it('two-way: the parent reflects a scrub', async () => {
		const { container } = render(BoundNumberField, { props: { label: 'Speed', initial: 1 } });

		await scrub([10, 20]);

		expect(owner(container)).toBe('21');
		expect(input(container).value).toBe('21');
	});

	it('requires an accessible name', () => {
		// @ts-expect-error no label, aria-label, or aria-labelledby
		const props: ComponentProps<typeof NumberField> = { value: 0 };
		expect(props).toBeDefined();
	});
});
