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

	it('places the label outside the input box by default', () => {
		const { container } = render(NumberField, { props: { label: 'Speed' } });

		const labelRight = container.querySelector('label')!.getBoundingClientRect().right;
		const boxLeft = input(container).getBoundingClientRect().left;

		expect(labelRight).toBeLessThanOrEqual(boxLeft);
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

describe('NumberField hint', () => {
	const HINT = 'Shown beside the label';

	it('names an info button after the label', async () => {
		render(NumberField, { props: { label: 'Speed', hint: HINT, value: 1 } });

		await expect.element(page.getByRole('button', { name: 'About Speed' })).toBeInTheDocument();
	});

	it('describes the control by the hint while the tooltip is closed', async () => {
		render(NumberField, { props: { label: 'Speed', hint: HINT, value: 1 } });

		expect(page.getByRole('tooltip').query()).toBeNull();
		await expect
			.element(page.getByRole('spinbutton', { name: 'Speed' }))
			.toHaveAccessibleDescription(HINT);
	});

	it('shows the hint in a tooltip when the button takes focus', async () => {
		render(NumberField, { props: { label: 'Speed', hint: HINT, value: 1 } });

		await userEvent.tab();
		await expect.element(page.getByRole('button', { name: 'About Speed' })).toHaveFocus();
		await expect.element(page.getByRole('tooltip')).toHaveTextContent(HINT);
	});

	it('renders no button and no description without a hint', async () => {
		render(NumberField, { props: { label: 'Speed', value: 1 } });

		expect(page.getByRole('button', { name: 'About Speed' }).query()).toBeNull();
		await expect
			.element(page.getByRole('spinbutton', { name: 'Speed' }))
			.not.toHaveAttribute('aria-describedby');
	});

	it('describes an inset field by the hint and puts the button after the input', async () => {
		const { container } = render(NumberField, {
			props: { label: 'X', labelPlacement: 'inset', hint: HINT, value: 1 }
		});

		await expect
			.element(page.getByRole('spinbutton', { name: 'X' }))
			.toHaveAccessibleDescription(HINT);
		const inputRight = container.querySelector('input')!.getBoundingClientRect().right;
		const buttonLeft = page
			.getByRole('button', { name: 'About X' })
			.element()
			.getBoundingClientRect().left;
		expect(buttonLeft).toBeGreaterThanOrEqual(inputRight);
	});

	it('keeps the existing description next to the hint', async () => {
		render(NumberField, {
			props: { label: 'Speed', hint: HINT, value: 1, 'aria-describedby': 'note' }
		});

		await expect
			.element(page.getByRole('spinbutton', { name: 'Speed' }))
			.toHaveAttribute('aria-describedby', expect.stringContaining('note'));
	});

	it('does not scrub when a drag starts on the hint button', async () => {
		const { container } = render(BoundNumberField, {
			props: { label: 'Speed', hint: HINT, initial: 5 }
		});
		const selector = 'button[aria-label="About Speed"]';

		await commands.mouseMove(selector, { x: 5, y: MIDDLE });
		await commands.mouseDown();
		await commands.mouseMove(selector, { x: 5 + 40, y: MIDDLE });
		await commands.mouseUp();

		expect(owner(container)).toBe('5');
		expect(input(container).value).toBe('5');
	});
});

describe('NumberField suffix', () => {
	it('renders the suffix text and describes the input by it', async () => {
		render(NumberField, { props: { label: 'Length', suffix: 'mm', value: 1 } });

		await expect.element(page.getByText('mm', { exact: true })).toBeInTheDocument();
		await expect
			.element(page.getByRole('spinbutton', { name: 'Length' }))
			.toHaveAccessibleDescription('mm');
	});

	it('puts the suffix after the input, inside a group that wears the frame', () => {
		const { container } = render(NumberField, {
			props: { label: 'Length', suffix: 'mm', value: 1 }
		});
		const field = input(container);
		const group = field.parentElement!;

		expect(group.classList.contains('input')).toBe(true);
		expect(field.getBoundingClientRect().right).toBeLessThanOrEqual(
			page.getByText('mm', { exact: true }).element().getBoundingClientRect().left
		);
		expect(getComputedStyle(field).borderTopWidth).toBe('0px');
	});

	it('keeps typing writing the value', async () => {
		const { container } = render(BoundNumberField, {
			props: { label: 'Length', suffix: 'mm', initial: 1 }
		});

		await page.getByRole('spinbutton', { name: 'Length' }).fill('42');

		expect(owner(container)).toBe('42');
	});

	it('keeps a label scrub writing the value', async () => {
		const { container } = render(BoundNumberField, {
			props: { label: 'Length', suffix: 'mm', initial: 5 }
		});

		await scrub([10, 20, 30]);

		expect(owner(container)).toBe('35');
	});

	it('merges the hint, the suffix, and a consumer description', async () => {
		render(NumberField, {
			props: {
				label: 'Length',
				hint: 'Tip length',
				suffix: 'mm',
				value: 1,
				'aria-describedby': 'note'
			}
		});

		const field = page.getByRole('spinbutton', { name: 'Length' });
		const describedBy = field.element().getAttribute('aria-describedby')!.split(' ');
		expect(describedBy).toHaveLength(3);
		expect(describedBy[0]).toBe('note');
		await expect.element(field).toHaveAccessibleDescription(expect.stringContaining('Tip length'));
		await expect.element(field).toHaveAccessibleDescription(expect.stringContaining('mm'));
	});

	it('gives an inset group the left padding the input took', () => {
		const { container } = render(NumberField, {
			props: { label: 'X', labelPlacement: 'inset', suffix: 'mm', value: 1 }
		});
		const group = input(container).parentElement!;

		expect(parseFloat(getComputedStyle(group).paddingLeft)).toBeGreaterThanOrEqual(28);
	});
});

describe('NumberField state', () => {
	it('sets aria-invalid and data-field-state on an error', async () => {
		render(NumberField, { props: { label: 'Speed', state: 'error', value: 1 } });

		const field = page.getByRole('spinbutton', { name: 'Speed' });
		await expect.element(field).toHaveAttribute('aria-invalid', 'true');
		await expect.element(field).toHaveAttribute('data-field-state', 'error');
	});

	it('marks a warn without aria-invalid', async () => {
		render(NumberField, { props: { label: 'Speed', state: 'warn', value: 1 } });

		const field = page.getByRole('spinbutton', { name: 'Speed' });
		await expect.element(field).not.toHaveAttribute('aria-invalid');
		await expect.element(field).toHaveAttribute('data-field-state', 'warn');
	});

	it('sets neither attribute without a state', async () => {
		render(NumberField, { props: { label: 'Speed', value: 1 } });

		const field = page.getByRole('spinbutton', { name: 'Speed' });
		await expect.element(field).not.toHaveAttribute('aria-invalid');
		await expect.element(field).not.toHaveAttribute('data-field-state');
	});

	it('draws the warn and error borders on the bare input', () => {
		const warn = render(NumberField, { props: { label: 'Speed', state: 'warn', value: 1 } });
		const warnColor = getComputedStyle(input(warn.container)).borderTopColor;
		warn.unmount();
		const error = render(NumberField, { props: { label: 'Speed', state: 'error', value: 1 } });
		const errorColor = getComputedStyle(input(error.container)).borderTopColor;
		error.unmount();
		const none = render(NumberField, { props: { label: 'Speed', value: 1 } });
		const noneColor = getComputedStyle(input(none.container)).borderTopColor;

		expect(warnColor).not.toBe(noneColor);
		expect(errorColor).not.toBe(noneColor);
		expect(warnColor).not.toBe(errorColor);
	});

	it('draws the border on the group when a suffix is set', () => {
		const plain = render(NumberField, { props: { label: 'Speed', suffix: 'm', value: 1 } });
		const plainColor = getComputedStyle(input(plain.container).parentElement!).borderTopColor;
		plain.unmount();
		const error = render(NumberField, {
			props: { label: 'Speed', suffix: 'm', state: 'error', value: 1 }
		});
		const group = input(error.container).parentElement!;

		expect(getComputedStyle(group).borderTopColor).not.toBe(plainColor);
		expect(input(error.container).getAttribute('aria-invalid')).toBe('true');
	});
});
