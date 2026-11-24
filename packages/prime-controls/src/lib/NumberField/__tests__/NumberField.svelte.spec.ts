import type { ComponentProps } from 'svelte';

import { describe, expect, it, onTestFinished, vi } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { commands, page, userEvent } from 'vitest/browser';

import '../../../../test/tailwind.css';
import NumberField from '../NumberField.svelte';
import BoundNumberField from './fixtures/BoundNumberField.svelte';
import ControlledNumberField from './fixtures/ControlledNumberField.svelte';
import FieldsetNumberField from './fixtures/FieldsetNumberField.svelte';
import NumberFieldWithTrailing from './fixtures/NumberFieldWithTrailing.svelte';
import TallTrailingNumberField from './fixtures/TallTrailingNumberField.svelte';

const input = (container: Element) => container.querySelector('input')!;
const frame = (container: Element) => input(container).parentElement!;
const owner = (container: Element) => container.querySelector('[data-testid="owner"]')?.textContent;

function subtleTextColor() {
	const probe = document.createElement('span');
	probe.className = 'text-subtle-1';
	document.body.append(probe);
	const color = getComputedStyle(probe).color;
	probe.remove();
	return color;
}

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

type ControlledOptions = Pick<
	ComponentProps<typeof NumberField>,
	'max' | 'step' | 'disabled' | 'readonly' | 'onkeydown'
> & { initial?: number; shouldAccept?: boolean };

function renderControlled(props: ControlledOptions = {}) {
	const record = vi.fn<(next: number | undefined) => void>();
	const screen = render(ControlledNumberField, {
		props: { label: 'Speed', shouldAccept: true, record, ...props }
	});
	return { ...screen, values: () => record.mock.calls.map(([next]) => next) };
}

describe('NumberField', () => {
	it('takes its accessible name from label', async () => {
		render(NumberField, { props: { label: 'Speed', value: 1 } });

		await expect.element(page.getByRole('spinbutton', { name: 'Speed' })).toBeInTheDocument();
	});

	it.each<{ labelPlacement: 'outside' | 'inset' }>([
		{ labelPlacement: 'outside' },
		{ labelPlacement: 'inset' }
	])('draws an $labelPlacement label at 12 px in the subtle-1 text color', ({ labelPlacement }) => {
		const { container } = render(NumberField, {
			props: { label: 'Speed', labelPlacement, value: 1 }
		});

		const style = getComputedStyle(container.querySelector('label')!);

		expect(style.fontSize).toBe('12px');
		expect(style.color).toBe(subtleTextColor());
	});

	it('takes its accessible name from aria-label without a label', async () => {
		const { container } = render(NumberField, { props: { 'aria-label': 'Speed', value: 1 } });

		await expect.element(page.getByRole('spinbutton', { name: 'Speed' })).toBeInTheDocument();
		expect(container.querySelector('label')).toBeNull();
	});

	it('places the label outside the input box by default', () => {
		const { container } = render(NumberField, { props: { label: 'Speed' } });

		const labelRight = container.querySelector('label')!.getBoundingClientRect().right;
		const boxLeft = frame(container).getBoundingClientRect().left;

		expect(labelRight).toBeLessThanOrEqual(boxLeft);
	});

	it('keeps the input-compact class on the group that wears the frame', () => {
		const { container } = render(NumberField, { props: { label: 'Speed' } });

		expect(frame(container)).toHaveClass('input-compact');
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

	it('starts writing on a 5 px move, the first whole pixel past the 4 px threshold', async () => {
		const { values } = renderControlled({ initial: 1 });

		await scrub([5]);

		expect(values()).toEqual([6]);
	});

	it('keeps focus off the input after a scrub releases on the label', async () => {
		const { container } = renderControlled({ initial: 1 });

		await scrub([10]);

		expect(document.activeElement).not.toBe(input(container));
	});

	it('lets a label click focus the input after a scrub released off the label', async () => {
		const { container } = renderControlled({ initial: 1 });
		await scrub([200]);

		await userEvent.click(container.querySelector('label')!);

		expect(document.activeElement).toBe(input(container));
	});

	it('keeps the original value and text when the binding vetoes a scrub', async () => {
		const { container, values } = renderControlled({ initial: 3, shouldAccept: false });

		await scrub([10, 20]);

		expect(values(), 'each move offered from the scrub start, not from the vetoed value').toEqual([
			13, 23
		]);
		expect(owner(container)).toBe('3');
		expect(input(container).value).toBe('3');
	});

	it('keeps the original value and text when the binding vetoes a key press', async () => {
		const { container, values } = renderControlled({ initial: 3, shouldAccept: false });

		await userEvent.click(input(container));
		await userEvent.keyboard('{ArrowUp}');

		expect(values()).toEqual([4]);
		expect(owner(container)).toBe('3');
		expect(input(container).value).toBe('3');
	});

	it.each([{ disabled: true }, { readonly: true }])('does not scrub with %o', async (props) => {
		const { container, values } = renderControlled({ initial: 3, ...props });

		await scrub([10, 20]);

		expect(values()).toEqual([]);
		expect(input(container).value).toBe('3');
	});

	it.each([{ disabled: true }, { readonly: true }])('does not step with %o', async (props) => {
		const { container, values } = renderControlled({ initial: 3, ...props });
		input(container).focus();

		await userEvent.keyboard('{ArrowUp}');

		expect(values()).toEqual([]);
		expect(input(container).value).toBe('3');
	});

	it.each([{ disabled: true }, { readonly: true }])('drops the resize cursor with %o', (props) => {
		const { container } = renderControlled({ initial: 3, ...props });

		expect(container.querySelector('label')).not.toHaveClass('cursor-ew-resize');
	});

	it('marks a scrubbable label with the resize cursor', () => {
		const { container } = render(NumberField, { props: { label: 'Speed' } });

		const label = container.querySelector('label')!;
		expect(label).toHaveClass('cursor-ew-resize', 'select-none');
		expect(getComputedStyle(label).touchAction).toBe('none');
	});

	it('reflects a scrub in a two-way bound parent', async () => {
		const { container } = render(BoundNumberField, { props: { label: 'Speed', initial: 1 } });

		await scrub([10, 20]);

		expect(owner(container)).toBe('21');
		expect(input(container).value).toBe('21');
	});

	it.each<{ by: string; props: ComponentProps<typeof NumberField> }>([
		{ by: 'label', props: { label: 'Speed' } },
		{ by: 'aria-label', props: { 'aria-label': 'Speed' } },
		{ by: 'aria-labelledby', props: { 'aria-labelledby': 'speed-name' } }
	])('renders named by $by without a console warning', ({ props }) => {
		const warn = vi.spyOn(console, 'warn');
		onTestFinished(() => warn.mockRestore());

		render(NumberField, { props });

		expect(warn).not.toHaveBeenCalled();
	});

	it('requires an accessible name', () => {
		// @ts-expect-error no label, aria-label, or aria-labelledby
		const props: ComponentProps<typeof NumberField> = { value: 0 };
		expect(props).toBeDefined();
	});

	it('requires a visible label for a hint', () => {
		// @ts-expect-error hint with aria-label and no visible label
		const props: ComponentProps<typeof NumberField> = { 'aria-label': 'Speed', hint: 'Tip' };
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

	it('describes an inset field by the hint and puts the button after the frame', async () => {
		const { container } = render(NumberField, {
			props: { label: 'X', labelPlacement: 'inset', hint: HINT, value: 1 }
		});

		await expect
			.element(page.getByRole('spinbutton', { name: 'X' }))
			.toHaveAccessibleDescription(HINT);
		const frameRight = frame(container).getBoundingClientRect().right;
		const buttonLeft = page
			.getByRole('button', { name: 'About X' })
			.element()
			.getBoundingClientRect().left;
		expect(buttonLeft).toBeGreaterThanOrEqual(frameRight);
	});

	it('lists the consumer description before the hint', async () => {
		render(NumberField, {
			props: { label: 'Speed', hint: HINT, value: 1, id: 'speed', 'aria-describedby': 'note' }
		});

		await expect
			.element(page.getByRole('spinbutton', { name: 'Speed' }))
			.toHaveAttribute('aria-describedby', 'note speed-hint');
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

		expect(group).toHaveClass('input');
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

	it('lists the consumer description, then the hint, then the suffix', async () => {
		render(NumberField, {
			props: {
				label: 'Length',
				hint: 'Tip length',
				suffix: 'mm',
				value: 1,
				id: 'length',
				'aria-describedby': 'note'
			}
		});

		await expect
			.element(page.getByRole('spinbutton', { name: 'Length' }))
			.toHaveAttribute('aria-describedby', 'note length-hint length-suffix');
	});

	it('gives an inset group the left padding the input took', () => {
		const { container } = render(NumberField, {
			props: { label: 'X', labelPlacement: 'inset', suffix: 'mm', value: 1 }
		});
		const group = input(container).parentElement!;

		expect(getComputedStyle(group).paddingLeft).toBe('28px');
	});
});

const stepButton = (container: Element, direction: 'up' | 'down') =>
	container.querySelector<HTMLButtonElement>(`[data-step="${direction}"]`)!;

function hold(button: HTMLButtonElement) {
	button.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true, button: 0 }));
}

function press(button: HTMLButtonElement) {
	hold(button);
	window.dispatchEvent(new PointerEvent('pointerup'));
}

function stepperInset(container: Element) {
	const group = frame(container);
	const border = Number.parseFloat(getComputedStyle(group).borderTopWidth);
	const outer = group.getBoundingClientRect();
	const box = container.querySelector('[data-number-stepper]')!.getBoundingClientRect();
	return {
		right: outer.right - border - box.right,
		top: box.top - outer.top - border,
		bottom: outer.bottom - border - box.bottom
	};
}

function renderInDisabledFieldset() {
	const record = vi.fn<(next: number | undefined) => void>();
	const screen = render(FieldsetNumberField, {
		props: { label: 'Speed', initial: 5, shouldAccept: true, record }
	});
	return { ...screen, values: () => record.mock.calls.map(([next]) => next) };
}

function useFakeTimers() {
	vi.useFakeTimers();
	onTestFinished(() => {
		vi.useRealTimers();
	});
}

describe('NumberField stepper', () => {
	it('steps up by step on a press of the up button', () => {
		const { container, values } = renderControlled({ initial: 5, step: 0.5 });

		press(stepButton(container, 'up'));

		expect(values()).toEqual([5.5]);
	});

	it('steps down by step on a press of the down button', () => {
		const { container, values } = renderControlled({ initial: 5, step: 0.5 });

		press(stepButton(container, 'down'));

		expect(values()).toEqual([4.5]);
	});

	it('clamps a press to max', () => {
		const { container, values } = renderControlled({ initial: 9.5, max: 10 });

		press(stepButton(container, 'up'));

		expect(values()).toEqual([10]);
	});

	it('writes nothing on a press while disabled', () => {
		const { container, values } = renderControlled({ initial: 5, disabled: true });

		press(stepButton(container, 'up'));

		expect(values()).toEqual([]);
	});

	it('writes nothing on a press inside a disabled fieldset', () => {
		const { container, values } = renderInDisabledFieldset();

		press(stepButton(container, 'up'));

		expect(values()).toEqual([]);
	});

	it('hides the stepper inside a disabled fieldset', () => {
		const { container } = renderInDisabledFieldset();

		const stepper = container.querySelector('[data-number-stepper]')!;

		expect(getComputedStyle(stepper).visibility).toBe('hidden');
	});

	it('fills the compact frame inside its border, flush right and full height', () => {
		const { container } = render(NumberField, { props: { label: 'Length', value: 1 } });

		expect(stepperInset(container)).toEqual({ right: 0, top: 0, bottom: 0 });
	});

	it('fills a frame that trailing content makes taller, flush right and full height', () => {
		const { container } = render(TallTrailingNumberField);

		expect(stepperInset(container)).toEqual({ right: 0, top: 0, bottom: 0 });
	});

	it('repeats every 60 ms once a press is held past 400 ms', () => {
		useFakeTimers();
		const { container, values } = renderControlled({ initial: 5 });

		hold(stepButton(container, 'up'));
		vi.advanceTimersByTime(520);

		expect(values(), 'one step on press, then repeats at 460 and 520 ms').toEqual([6, 7, 8]);
	});

	it('stops repeating once the press is released', () => {
		useFakeTimers();
		const { container, values } = renderControlled({ initial: 5 });
		hold(stepButton(container, 'up'));
		vi.advanceTimersByTime(460);

		window.dispatchEvent(new PointerEvent('pointerup'));
		vi.advanceTimersByTime(1000);

		expect(values()).toEqual([6, 7]);
	});

	it('draws the stepper last in the frame, right of a suffix and trailing content', async () => {
		const { container } = render(NumberFieldWithTrailing, {
			props: { label: 'Length', suffix: 'mm', value: 1 }
		});
		const reset = page.getByRole('button', { name: 'Reset' });
		await expect.element(reset).toBeInTheDocument();

		const stepper = container.querySelector('[data-number-stepper]')!;
		expect(stepper.parentElement!.lastElementChild).toBe(stepper);
		expect(reset.element().getBoundingClientRect().right).toBeLessThanOrEqual(
			stepper.getBoundingClientRect().left
		);
	});

	it('keeps the stepper out of the tab order and hidden from assistive technology', () => {
		const { container } = render(NumberField, { props: { label: 'Length', value: 1 } });

		expect(stepButton(container, 'up').tabIndex).toBe(-1);
		expect(container.querySelector('[data-number-stepper]')).toHaveAttribute('aria-hidden', 'true');
	});
});

describe('NumberField trailing', () => {
	it('draws trailing content after the suffix, inside the group that wears the frame', async () => {
		const { container } = render(NumberFieldWithTrailing, {
			props: { label: 'Length', suffix: 'mm', value: 1 }
		});
		const button = page.getByRole('button', { name: 'Reset' });
		await expect.element(button).toBeInTheDocument();

		const group = input(container).parentElement!;
		expect(group).toHaveClass('input');
		expect(button.element().parentElement).toBe(group);
		expect(
			page.getByText('mm', { exact: true }).element().getBoundingClientRect().right
		).toBeLessThanOrEqual(button.element().getBoundingClientRect().left);
	});

	it('groups the input for trailing content alone, with no suffix', async () => {
		const { container } = render(NumberFieldWithTrailing, {
			props: { label: 'Length', value: 1 }
		});
		const field = input(container);

		await expect.element(page.getByRole('button', { name: 'Reset' })).toBeInTheDocument();
		expect(field.parentElement).toHaveClass('input');
		expect(getComputedStyle(field).borderTopWidth).toBe('0px');
		expect(field).not.toHaveAttribute('aria-describedby');
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

	it.each<{ field: string; suffix?: string }>([
		{ field: 'a bare field', suffix: undefined },
		{ field: 'a suffixed field', suffix: 'm' }
	])('draws distinct warn and error borders on the frame of $field', ({ suffix }) => {
		function frameBorderColor(state: ComponentProps<typeof NumberField>['state']) {
			const screen = render(NumberField, { props: { label: 'Speed', suffix, state, value: 1 } });
			const color = getComputedStyle(frame(screen.container)).borderTopColor;
			screen.unmount();
			return color;
		}

		const warnColor = frameBorderColor('warn');
		const errorColor = frameBorderColor('error');
		const noneColor = frameBorderColor(undefined);

		expect(warnColor).not.toBe(noneColor);
		expect(errorColor).not.toBe(noneColor);
		expect(warnColor).not.toBe(errorColor);
	});
});

describe('NumberField label gap', () => {
	it('leaves 8 px between the label and the frame, so the focus ring clears the label', () => {
		const { container } = render(NumberField, { props: { label: 'Speed', value: 1 } });
		const labelRight = container.querySelector('label')!.getBoundingClientRect().right;
		const frameLeft = frame(container).getBoundingClientRect().left;

		expect(frameLeft - labelRight).toBe(8);
	});
});

describe('NumberField suffix size', () => {
	it("draws a suffixed field's frame at the bare field's frame height and text size", () => {
		const bare = render(NumberField, { props: { label: 'Speed', value: 1 } });
		const bareHeight = frame(bare.container).getBoundingClientRect().height;
		const bareFontSize = getComputedStyle(input(bare.container)).fontSize;
		bare.unmount();

		const suffixed = render(NumberField, { props: { label: 'Speed', suffix: 'mm', value: 1 } });

		expect(frame(suffixed.container).getBoundingClientRect().height).toBe(bareHeight);
		expect(getComputedStyle(input(suffixed.container)).fontSize).toBe(bareFontSize);
	});
});

describe('NumberField cleared', () => {
	it('stays empty and writes nothing when cleared', async () => {
		const { container, values } = renderControlled({ initial: 20 });

		await userEvent.clear(input(container));

		await expect.element(input(container)).toHaveFocus();
		expect(input(container).value).toBe('');
		expect(values()).toEqual([]);
		expect(owner(container)).toBe('20');
	});

	it('never writes undefined into a plain binding', async () => {
		const { container } = render(BoundNumberField, { props: { label: 'Speed', initial: 20 } });

		await userEvent.clear(input(container));

		expect(owner(container)).toBe('20');
		expect(input(container).value).toBe('');
	});

	it('writes the typed number after a clear, not the old number with digits appended', async () => {
		const { container, values } = renderControlled({ initial: 20 });

		await userEvent.clear(input(container));
		await userEvent.keyboard('35');

		expect(values()).toEqual([3, 35]);
		expect(owner(container)).toBe('35');
		expect(input(container).value).toBe('35');
	});

	it('shows the bound value again when an empty field loses focus', async () => {
		const { container } = render(BoundNumberField, { props: { label: 'Speed', initial: 20 } });

		await userEvent.clear(input(container));
		await userEvent.tab();

		expect(input(container).value).toBe('20');
		expect(owner(container)).toBe('20');
	});

	it('shows the stepped number when an arrow key follows a clear', async () => {
		const { container } = render(BoundNumberField, { props: { label: 'Speed', initial: 20 } });

		await userEvent.clear(input(container));
		await userEvent.keyboard('{ArrowUp}');

		expect(owner(container)).toBe('21');
		expect(input(container).value).toBe('21');
	});
});
