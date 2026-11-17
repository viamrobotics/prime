import type { ComponentProps } from 'svelte';

import { describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { commands, page, userEvent } from 'vitest/browser';

import '../../../../test/tailwind.css';
import Slider from '../Slider.svelte';
import BoundSlider from './BoundSlider.svelte';
import ControlledSlider from './ControlledSlider.svelte';
import SliderInPanel from './SliderInPanel.svelte';

const range = (container: Element) =>
	container.querySelector<HTMLInputElement>('input[type=range]')!;
const readout = (container: Element) =>
	container.querySelector<HTMLInputElement>('input[type=number]')!;
const owner = (container: Element) => container.querySelector('[data-testid="owner"]')?.textContent;

const SLIDER_MAX = 100;
// The thumb's center at the range's left edge, where the starting value 0 sits.
const THUMB_GRAB_X = 6;
const MOVES = [10, 20, 30, 40, 50];

async function drag(container: Element, fractions: number[]) {
	const width = range(container).getBoundingClientRect().width;
	await commands.mouseMove('input[type=range]', { x: THUMB_GRAB_X, y: '50%' });
	await commands.mouseDown();
	for (const fraction of fractions) {
		await commands.mouseMove('input[type=range]', { x: fraction * width, y: '50%' });
	}
	await commands.mouseUp();
}

function renderControlled(
	Component: typeof ControlledSlider | typeof SliderInPanel,
	props: Partial<ComponentProps<typeof ControlledSlider>> = {}
) {
	const record = vi.fn<(next: number) => void>();
	const screen = render(Component, {
		props: { label: 'Opacity', min: 0, max: SLIDER_MAX, step: 1, accept: true, record, ...props }
	});
	return { ...screen, values: () => record.mock.calls.map(([next]) => next) };
}

// The press grabs the thumb at its starting value 0, so only the moves write.
const PRESS_WRITES = 0;
const FRACTIONS = MOVES.map((move) => move / SLIDER_MAX);

describe('Slider', () => {
	it('names the range and the readout from label', async () => {
		render(Slider, { props: { label: 'Opacity', value: 5 } });

		await expect.element(page.getByRole('slider', { name: 'Opacity' })).toBeInTheDocument();
		await expect.element(page.getByRole('spinbutton', { name: 'Opacity' })).toBeInTheDocument();
	});

	it('names the range and the readout from aria-label without a label', async () => {
		const { container } = render(Slider, { props: { 'aria-label': 'Opacity', value: 5 } });

		await expect.element(page.getByRole('slider', { name: 'Opacity' })).toBeInTheDocument();
		await expect.element(page.getByRole('spinbutton', { name: 'Opacity' })).toBeInTheDocument();
		expect(container.querySelector('label')).toBeNull();
	});

	it('steps by keyboard and reaches min and max', async () => {
		const { container } = render(BoundSlider, {
			props: { label: 'Opacity', initial: 50, min: 0, max: 100, step: 5 }
		});

		range(container).focus();
		await userEvent.keyboard('{ArrowRight}');
		expect(range(container).value).toBe('55');
		expect(readout(container).value).toBe('55');

		await userEvent.keyboard('{ArrowLeft}{ArrowLeft}');
		expect(owner(container)).toBe('45');

		await userEvent.keyboard('{Home}');
		expect(owner(container)).toBe('0');

		await userEvent.keyboard('{End}');
		expect(owner(container)).toBe('100');
	});

	it('moves the range from ArrowUp in the readout', async () => {
		const { container } = render(BoundSlider, {
			props: { label: 'Opacity', initial: 50, step: 5 }
		});

		await userEvent.click(readout(container));
		await userEvent.keyboard('{ArrowUp}');

		expect(range(container).value).toBe('55');
		expect(owner(container)).toBe('55');
	});

	it('leaves typing in the readout unclamped', async () => {
		const { container } = render(BoundSlider, { props: { label: 'Opacity', initial: 50 } });

		await userEvent.fill(readout(container), '250');

		expect(owner(container)).toBe('250');
		expect(readout(container).value).toBe('250');
	});

	it('writes once per pointer move during a drag', async () => {
		const { container, values } = renderControlled(ControlledSlider);

		await drag(container, FRACTIONS);

		const writes = values();
		expect(writes).toHaveLength(PRESS_WRITES + MOVES.length);
		for (const [index, write] of writes.entries()) {
			expect(write).toBeGreaterThanOrEqual(0);
			expect(write).toBeLessThanOrEqual(SLIDER_MAX);
			if (index > 0) expect(write).toBeGreaterThan(writes[index - 1]!);
		}
		expect(owner(container)).toBe(String(writes.at(-1)));
	});

	it('keeps the panel and its controls in place during a drag', async () => {
		const { container, values } = renderControlled(SliderInPanel);
		const group = page.getByRole('group', { name: 'Scene' }).element();
		const before = {
			group,
			range: range(container),
			readout: readout(container),
			sibling: container.querySelector('[data-testid="sibling"]')!
		};

		await drag(container, FRACTIONS);

		expect(values()).toHaveLength(PRESS_WRITES + MOVES.length);
		expect(page.getByRole('group', { name: 'Scene' }).element()).toBe(before.group);
		expect(range(container)).toBe(before.range);
		expect(readout(container)).toBe(before.readout);
		expect(container.querySelector('[data-testid="sibling"]')).toBe(before.sibling);
		for (const node of Object.values(before)) expect(node.isConnected).toBe(true);
	});

	it('keeps the original value when the binding vetoes a drag and a key press', async () => {
		const { container, values } = renderControlled(ControlledSlider, {
			initial: 30,
			accept: false
		});

		await drag(container, FRACTIONS);
		expect(values().length).toBeGreaterThan(0);
		expect(range(container).value).toBe('30');
		expect(readout(container).value).toBe('30');

		range(container).focus();
		await userEvent.keyboard('{ArrowRight}');
		expect(values().at(-1)).toBe(31);
		expect(range(container).value).toBe('30');
		expect(readout(container).value).toBe('30');
		expect(owner(container)).toBe('30');
	});

	it('blocks the range and the readout when disabled', async () => {
		const { container, values } = renderControlled(ControlledSlider, {
			initial: 30,
			disabled: true
		});

		expect(range(container).disabled).toBe(true);
		expect(readout(container).disabled).toBe(true);

		await drag(container, FRACTIONS);
		range(container).focus();
		readout(container).focus();
		await userEvent.keyboard('{ArrowRight}{ArrowUp}');

		expect(values()).toEqual([]);
		expect(owner(container)).toBe('30');
	});

	it('requires an accessible name', () => {
		// @ts-expect-error no label, aria-label, or aria-labelledby
		const props: ComponentProps<typeof Slider> = { value: 0 };
		expect(props).toBeDefined();
	});
});

describe('Slider hint', () => {
	const HINT = 'Shown beside the label';

	it('names an info button after the label', async () => {
		render(Slider, { props: { label: 'Opacity', hint: HINT, value: 1 } });

		await expect.element(page.getByRole('button', { name: 'About Opacity' })).toBeInTheDocument();
	});

	it('describes the control by the hint while the tooltip is closed', async () => {
		render(Slider, { props: { label: 'Opacity', hint: HINT, value: 1 } });

		expect(page.getByRole('tooltip').query()).toBeNull();
		await expect
			.element(page.getByRole('slider', { name: 'Opacity' }))
			.toHaveAccessibleDescription(HINT);
	});

	it('shows the hint in a tooltip when the button takes focus', async () => {
		render(Slider, { props: { label: 'Opacity', hint: HINT, value: 1 } });

		await userEvent.tab();
		await expect.element(page.getByRole('button', { name: 'About Opacity' })).toHaveFocus();
		await expect.element(page.getByRole('tooltip')).toHaveTextContent(HINT);
	});

	it('renders no button and no description without a hint', async () => {
		render(Slider, { props: { label: 'Opacity', value: 1 } });

		expect(page.getByRole('button', { name: 'About Opacity' }).query()).toBeNull();
		await expect
			.element(page.getByRole('slider', { name: 'Opacity' }))
			.not.toHaveAttribute('aria-describedby');
	});

	it('describes the readout by the hint too', async () => {
		render(Slider, { props: { label: 'Opacity', hint: HINT, value: 1 } });

		await expect
			.element(page.getByRole('spinbutton', { name: 'Opacity' }))
			.toHaveAccessibleDescription(HINT);
	});
});

describe('Slider suffix', () => {
	it('draws the suffix beside the readout and describes the readout by it', async () => {
		const { container } = render(Slider, { props: { label: 'Opacity', suffix: '%', value: 50 } });

		await expect.element(page.getByText('%', { exact: true })).toBeInTheDocument();
		await expect.element(readout(container)).toHaveAccessibleDescription('%');
	});

	it('keeps the readout writing the value with a suffix', async () => {
		const { container } = render(BoundSlider, {
			props: { label: 'Opacity', suffix: '%', initial: 50 }
		});

		await page.getByRole('spinbutton', { name: 'Opacity' }).fill('70');

		expect(owner(container)).toBe('70');
	});
});

describe('Slider state', () => {
	it('gives an error to the readout and marks the range invalid', async () => {
		const { container } = render(Slider, {
			props: { label: 'Opacity', state: 'error', value: 50 }
		});

		await expect.element(readout(container)).toHaveAttribute('data-field-state', 'error');
		await expect.element(readout(container)).toHaveAttribute('aria-invalid', 'true');
		await expect.element(range(container)).toHaveAttribute('aria-invalid', 'true');
	});

	it('marks a warn on the readout without aria-invalid', async () => {
		const { container } = render(Slider, { props: { label: 'Opacity', state: 'warn', value: 50 } });

		await expect.element(readout(container)).toHaveAttribute('data-field-state', 'warn');
		await expect.element(readout(container)).not.toHaveAttribute('aria-invalid');
		await expect.element(range(container)).not.toHaveAttribute('aria-invalid');
	});

	it('sets neither attribute without a state', async () => {
		const { container } = render(Slider, { props: { label: 'Opacity', value: 50 } });

		await expect.element(readout(container)).not.toHaveAttribute('data-field-state');
		await expect.element(readout(container)).not.toHaveAttribute('aria-invalid');
		await expect.element(range(container)).not.toHaveAttribute('aria-invalid');
	});

	it('draws the warn and error borders on the readout', () => {
		const warn = render(Slider, { props: { label: 'Opacity', state: 'warn', value: 50 } });
		const warnColor = getComputedStyle(readout(warn.container)).borderTopColor;
		warn.unmount();
		const error = render(Slider, { props: { label: 'Opacity', state: 'error', value: 50 } });
		const errorColor = getComputedStyle(readout(error.container)).borderTopColor;
		error.unmount();
		const none = render(Slider, { props: { label: 'Opacity', value: 50 } });
		const noneColor = getComputedStyle(readout(none.container)).borderTopColor;

		expect(warnColor).not.toBe(noneColor);
		expect(errorColor).not.toBe(noneColor);
		expect(warnColor).not.toBe(errorColor);
	});
});

describe('Slider readout width', () => {
	const FONT_PROPERTIES = [
		'fontFamily',
		'fontSize',
		'fontWeight',
		'fontStyle',
		'fontVariantNumeric',
		'fontFeatureSettings',
		'letterSpacing'
	] as const;

	// The space left in the readout after its value, measured with the readout's own font. A
	// negative number is text the readout clips.
	function spareWidth(field: HTMLInputElement) {
		const style = getComputedStyle(field);
		const probe = document.createElement('span');
		for (const property of FONT_PROPERTIES) probe.style[property] = style[property];
		probe.style.whiteSpace = 'pre';
		probe.textContent = field.value;
		document.body.append(probe);
		const textWidth = probe.getBoundingClientRect().width;
		probe.remove();

		const frame = [
			style.paddingLeft,
			style.paddingRight,
			style.borderLeftWidth,
			style.borderRightWidth
		].reduce((total, length) => total + Number.parseFloat(length), 0);
		return field.getBoundingClientRect().width - frame - textWidth;
	}

	it.each([{ suffix: undefined }, { suffix: '%' }])(
		'keeps the 64 px readout when the range is short, with suffix $suffix',
		({ suffix }) => {
			const { container } = render(Slider, { props: { label: 'Opacity', suffix, value: 50 } });
			const frame = readout(container).closest('div')!;

			expect(frame.getBoundingClientRect().width).toBe(64);
		}
	);

	it('widens the readout past 64 px when the range needs it', () => {
		const { container } = render(Slider, {
			props: { label: 'Joint 1', suffix: '°', min: -180, max: 180, step: 0.1, value: 0 }
		});
		const frame = readout(container).closest('div')!;

		expect(frame.getBoundingClientRect().width).toBeGreaterThan(64);
	});

	it.each([
		{ step: 0.1, value: -179.9 },
		{ step: 0.01, value: -179.99 },
		{ step: 0.001, value: -179.999 }
	])('fits $value with a suffix', ({ step, value }) => {
		const { container } = render(Slider, {
			props: { label: 'Joint 1', suffix: '°', min: -180, max: 180, step, value }
		});

		expect(readout(container).value).toBe(String(value));
		expect(spareWidth(readout(container))).toBeGreaterThanOrEqual(0);
	});

	it('fits the longest value without a suffix', () => {
		const { container } = render(Slider, {
			props: { label: 'Offset', min: -10000, max: 10000, step: 0.01, value: -9999.99 }
		});

		expect(spareWidth(readout(container))).toBeGreaterThanOrEqual(0);
	});
});
