import type { ComponentProps } from 'svelte';

import { describe, expect, it, onTestFinished, vi } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { commands, page, userEvent } from 'vitest/browser';

import '../../../../test/tailwind.css';
import Slider from '../Slider.svelte';
import BoundSlider from './fixtures/BoundSlider.svelte';
import ControlledSlider from './fixtures/ControlledSlider.svelte';
import SliderInPanel from './fixtures/SliderInPanel.svelte';
import SliderWithTrailing from './fixtures/SliderWithTrailing.svelte';

const range = (container: Element) =>
	container.querySelector<HTMLInputElement>('input[type=range]')!;
const readout = (container: Element) =>
	container.querySelector<HTMLInputElement>('input[type=number]')!;
const owner = (container: Element) => container.querySelector('[data-testid="owner"]')?.textContent;

function probeStyle(className: string, read: (style: CSSStyleDeclaration) => string) {
	const probe = document.createElement('span');
	probe.className = className;
	document.body.append(probe);
	const value = read(getComputedStyle(probe));
	probe.remove();
	return value;
}

const SLIDER_MAX = 100;
const THUMB_CENTER_AT_ZERO_X = 6;
const MOVES = [10, 20, 30, 40, 50];
const MIDDLE = '50%';
const READOUT_MIN_WIDTH_PX = 64;

async function drag(container: Element, fractions: number[]) {
	const width = range(container).getBoundingClientRect().width;
	await commands.mouseMove('input[type=range]', { x: THUMB_CENTER_AT_ZERO_X, y: MIDDLE });
	await commands.mouseDown();
	for (const fraction of fractions) {
		await commands.mouseMove('input[type=range]', { x: fraction * width, y: MIDDLE });
	}
	await commands.mouseUp();
}

type ControlledOptions = Pick<ComponentProps<typeof Slider>, 'disabled'> & {
	initial?: number;
	shouldAccept?: boolean;
};

function renderControlled(
	Component: typeof ControlledSlider | typeof SliderInPanel,
	props: ControlledOptions = {}
) {
	const record = vi.fn<(next: number) => void>();
	const screen = render(Component, {
		props: {
			label: 'Opacity',
			min: 0,
			max: SLIDER_MAX,
			step: 1,
			shouldAccept: true,
			record,
			...props
		}
	});
	return { ...screen, values: () => record.mock.calls.map(([next]) => next) };
}

function addExternalLabel(text: string) {
	const element = document.createElement('span');
	element.id = 'external-label';
	element.textContent = text;
	document.body.append(element);
	onTestFinished(() => element.remove());
	return element.id;
}

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
		expect(container.querySelector('label'), 'no label element').toBeNull();
	});

	it.each([
		{ keys: '{ArrowRight}', expected: '55' },
		{ keys: '{ArrowLeft}{ArrowLeft}', expected: '40' },
		{ keys: '{Home}', expected: '0' },
		{ keys: '{End}', expected: '100' }
	])('moves the range, readout, and owner to $expected on $keys', async ({ keys, expected }) => {
		const { container } = render(BoundSlider, {
			props: { label: 'Opacity', initial: 50, min: 0, max: 100, step: 5 }
		});

		range(container).focus();
		await userEvent.keyboard(keys);

		expect([range(container).value, readout(container).value, owner(container)]).toEqual([
			expected,
			expected,
			expected
		]);
	});

	it('defaults the range to 0 through 100 in steps of 1', () => {
		const { container } = render(Slider, { props: { label: 'Opacity', value: 5 } });

		const field = range(container);

		expect([field.min, field.max, field.step]).toEqual(['0', '100', '1']);
	});

	it('gives the readout the min, max, and step of the range', () => {
		const { container } = render(Slider, {
			props: { label: 'Opacity', min: 10, max: 20, step: 2, value: 12 }
		});

		const field = readout(container);

		expect([field.min, field.max, field.step]).toEqual(['10', '20', '2']);
	});

	it('names the range and the readout from aria-labelledby without a label', async () => {
		const labelledby = addExternalLabel('Opacity');
		render(Slider, { props: { 'aria-labelledby': labelledby, value: 5 } });

		await expect.element(page.getByRole('slider', { name: 'Opacity' })).toBeInTheDocument();
		await expect.element(page.getByRole('spinbutton', { name: 'Opacity' })).toBeInTheDocument();
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
		expect(writes, 'one write per move, none on the press').toHaveLength(MOVES.length);
		expect(
			writes.every((write) => write >= 0 && write <= SLIDER_MAX),
			'every write is inside the range'
		).toBe(true);
		expect(
			writes.every((write, index) => index === 0 || write > writes[index - 1]!),
			'writes rise with the pointer'
		).toBe(true);
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

		expect(values()).toHaveLength(MOVES.length);
		expect(page.getByRole('group', { name: 'Scene' }).element()).toBe(before.group);
		expect(range(container)).toBe(before.range);
		expect(readout(container)).toBe(before.readout);
		expect(container.querySelector('[data-testid="sibling"]')).toBe(before.sibling);
		expect(
			Object.values(before).every((node) => node.isConnected),
			'every node is still connected'
		).toBe(true);
	});

	it('keeps the original value when the binding vetoes a drag', async () => {
		const { container, values } = renderControlled(ControlledSlider, {
			initial: 30,
			shouldAccept: false
		});

		await drag(container, FRACTIONS);

		expect(values(), 'the binding saw every move').toHaveLength(MOVES.length);
		expect([range(container).value, readout(container).value, owner(container)]).toEqual([
			'30',
			'30',
			'30'
		]);
	});

	it('keeps the original value when the binding vetoes a key press', async () => {
		const { container, values } = renderControlled(ControlledSlider, {
			initial: 30,
			shouldAccept: false
		});

		range(container).focus();
		await userEvent.keyboard('{ArrowRight}');

		expect(values()).toEqual([31]);
		expect([range(container).value, readout(container).value, owner(container)]).toEqual([
			'30',
			'30',
			'30'
		]);
	});

	it('blocks the range and the readout when disabled', async () => {
		const { container, values } = renderControlled(ControlledSlider, {
			initial: 30,
			disabled: true
		});

		expect(range(container).disabled, 'range is disabled').toBe(true);
		expect(readout(container).disabled, 'readout is disabled').toBe(true);

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

	it('refuses a hint without a visible label', () => {
		// @ts-expect-error a hint needs a visible label
		const props: ComponentProps<typeof Slider> = {
			value: 0,
			hint: 'Help',
			'aria-label': 'Opacity'
		};
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

		expect(page.getByRole('tooltip').query(), 'tooltip is closed').toBeNull();
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

		expect(
			page.getByRole('button', { name: 'About Opacity' }).query(),
			'no hint button'
		).toBeNull();
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

describe('Slider trailing', () => {
	it("draws trailing content inside the readout's frame", async () => {
		render(SliderWithTrailing, { props: { label: 'Opacity', suffix: '%', value: 50 } });

		const button = page.getByRole('button', { name: 'Reset' });
		await expect.element(button).toBeInTheDocument();

		const readout = page.getByRole('spinbutton', { name: 'Opacity' }).element();
		expect(button.element().parentElement).toBe(readout.parentElement);
		expect(readout.parentElement).toHaveClass('input');
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

	it.each([
		{ state: 'warn', color: 'rgb(184, 138, 9)', token: '--color-warning-dark' },
		{ state: 'error', color: 'rgb(190, 53, 54)', token: '--color-danger-dark' }
	] as const)('draws the $state border on the readout', ({ state, color, token }) => {
		const { container } = render(Slider, { props: { label: 'Opacity', state, value: 50 } });

		expect(getComputedStyle(readout(container)).borderTopColor, token).toBe(color);
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

	function spareWidthAfterValue(field: HTMLInputElement) {
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

			expect(frame.getBoundingClientRect().width).toBe(READOUT_MIN_WIDTH_PX);
		}
	);

	it('widens the readout past 64 px when the range needs it', () => {
		const { container } = render(Slider, {
			props: { label: 'Joint 1', suffix: '°', min: -180, max: 180, step: 0.1, value: 0 }
		});
		const frame = readout(container).closest('div')!;

		expect(frame.getBoundingClientRect().width).toBeGreaterThan(READOUT_MIN_WIDTH_PX);
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
		expect(
			spareWidthAfterValue(readout(container)),
			'negative width is clipped text'
		).toBeGreaterThanOrEqual(0);
	});

	it('fits the longest value without a suffix', () => {
		const { container } = render(Slider, {
			props: { label: 'Offset', min: -10000, max: 10000, step: 0.01, value: -9999.99 }
		});

		expect(
			spareWidthAfterValue(readout(container)),
			'negative width is clipped text'
		).toBeGreaterThanOrEqual(0);
	});
});

describe('Slider root and style', () => {
	it('passes an id and a data attribute to the root', () => {
		const { container } = render(Slider, {
			props: { label: 'Opacity', value: 50, id: 'opacity-root', 'data-extra': 'yes' }
		});

		const root = container.firstElementChild!;
		expect(root).toHaveAttribute('id', 'opacity-root');
		expect(root).toHaveAttribute('data-extra', 'yes');
		expect(range(container)).not.toHaveAttribute('id', 'opacity-root');
	});

	it('draws the label at 12 px in the subtle-1 text color', () => {
		const { container } = render(Slider, { props: { label: 'Opacity', value: 50 } });

		const style = getComputedStyle(container.querySelector('label')!);

		expect(style.fontSize).toBe('12px');
		expect(style.color).toBe(probeStyle('text-subtle-1', (probe) => probe.color));
	});

	it('paints a disabled track and thumb with the disabled colors at full opacity', () => {
		const { container } = render(Slider, {
			props: { label: 'Opacity', value: 50, disabled: true }
		});

		const input = range(container);
		const track = getComputedStyle(input, '::-webkit-slider-runnable-track');
		const thumb = getComputedStyle(input, '::-webkit-slider-thumb');

		expect(getComputedStyle(input).opacity).toBe('1');
		expect(track.backgroundColor).toBe(
			probeStyle('bg-disabled-light', (probe) => probe.backgroundColor)
		);
		expect(thumb.backgroundColor).toBe(
			probeStyle('bg-disabled-dark', (probe) => probe.backgroundColor)
		);
	});

	it('paints the track of an error slider danger-dark, unlike one with no state', () => {
		const error = render(Slider, { props: { label: 'Opacity', value: 50, state: 'error' } });
		const errorTrack = getComputedStyle(
			range(error.container),
			'::-webkit-slider-runnable-track'
		).backgroundColor;
		const plain = render(Slider, { props: { label: 'Opacity', value: 50 } });
		const plainTrack = getComputedStyle(
			range(plain.container),
			'::-webkit-slider-runnable-track'
		).backgroundColor;

		expect(errorTrack).toBe(probeStyle('bg-danger-dark', (probe) => probe.backgroundColor));
		expect(plainTrack).not.toBe(errorTrack);
	});

	it.each<{ by: string; props: ComponentProps<typeof Slider> }>([
		{ by: 'label', props: { label: 'Speed', value: 50 } },
		{ by: 'aria-label', props: { 'aria-label': 'Speed', value: 50 } },
		{ by: 'aria-labelledby', props: { 'aria-labelledby': 'speed-name', value: 50 } }
	])('renders named by $by without a console warning', ({ props }) => {
		const warn = vi.spyOn(console, 'warn');
		onTestFinished(() => warn.mockRestore());

		render(Slider, { props });

		expect(warn).not.toHaveBeenCalled();
	});

	it('requires an accessible name', () => {
		// @ts-expect-error no label, aria-label, or aria-labelledby
		const props: ComponentProps<typeof Slider> = { value: 50 };
		expect(props).toBeDefined();
	});

	it('requires a visible label for a hint', () => {
		// @ts-expect-error hint with aria-label and no visible label
		const props: ComponentProps<typeof Slider> = { 'aria-label': 'Speed', hint: 'Tip', value: 50 };
		expect(props).toBeDefined();
	});
});
