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
});
