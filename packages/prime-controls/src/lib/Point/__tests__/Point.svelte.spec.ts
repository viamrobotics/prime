import type { ComponentProps } from 'svelte';

import { describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { commands, page, userEvent } from 'vitest/browser';

import '../../../../test/tailwind.css';
import Point from '../Point.svelte';
import type { PointValue } from '../point.ts';
import BoundPoint from './BoundPoint.svelte';
import ControlledPoint from './ControlledPoint.svelte';

const owner = (container: Element) =>
	JSON.parse(container.querySelector('[data-testid="owner"]')!.textContent!) as PointValue;
const spinbutton = (name: string) => page.getByRole('spinbutton', { name, exact: true });

const axisLabel = (text: string) =>
	[...document.querySelectorAll('label')].find((label) => label.textContent?.trim() === text)!;
const boundingRectangles = (name: string) => ({
	label: axisLabel(name).getBoundingClientRect(),
	box: spinbutton(name).element().getBoundingClientRect()
});

const MIN_TARGET_PX = 24;
const MAX_LETTER_WIDTH_PX = 32;
const RGB_LABELS = { x: 'R', y: 'G', z: 'B' };
const INSET_CASES = [
	{ name: 'X', labels: undefined },
	{ name: 'Y', labels: undefined },
	{ name: 'Z', labels: undefined },
	{ name: 'R', labels: RGB_LABELS },
	{ name: 'B', labels: RGB_LABELS }
];

const PRESS_X = 5;
const MIDDLE = '50%';

async function scrubLabel(text: string, offsets: number[]) {
	const selector = `label:text-is("${text}")`;
	await commands.mouseMove(selector, { x: PRESS_X, y: MIDDLE });
	await commands.mouseDown();
	for (const offset of offsets) {
		await commands.mouseMove(selector, { x: PRESS_X + offset, y: MIDDLE });
	}
	await commands.mouseUp();
}

function renderControlled(props: Partial<ComponentProps<typeof ControlledPoint>> = {}) {
	const record = vi.fn<(next: PointValue) => void>();
	const screen = render(ControlledPoint, {
		props: { initial: { x: 1, y: 2, z: 3 }, label: 'Position', accept: true, record, ...props }
	});
	return { ...screen, values: () => record.mock.calls.map(([next]) => next) };
}

describe('Point', () => {
	it('names the group from a visible label', async () => {
		render(BoundPoint, { props: { initial: { x: 0, y: 0 }, label: 'Position' } });

		await expect.element(page.getByRole('group', { name: 'Position' })).toBeInTheDocument();
	});

	it('styles the group label as subtle text', () => {
		render(BoundPoint, { props: { initial: { x: 0, y: 0 }, label: 'Position' } });

		const labelId = page.getByRole('group').element().getAttribute('aria-labelledby')!;
		expect(document.getElementById(labelId)).toHaveClass('text-subtle-1');
	});

	it('points aria-labelledby at the visible label', () => {
		render(BoundPoint, { props: { initial: { x: 0, y: 0 }, label: 'Position' } });

		const group = page.getByRole('group').element();
		const labelId = group.getAttribute('aria-labelledby')!;
		expect(document.getElementById(labelId)?.textContent).toBe('Position');
		expect(group.hasAttribute('aria-label')).toBe(false);
	});

	it('names the group from aria-label without a label', async () => {
		render(BoundPoint, { props: { initial: { x: 0, y: 0 }, 'aria-label': 'Offset' } });

		await expect.element(page.getByRole('group', { name: 'Offset' })).toBeInTheDocument();
	});

	it.each([
		{ initial: { x: 1, y: 2 }, names: ['X', 'Y'] },
		{ initial: { x: 1, y: 2, z: 3 }, names: ['X', 'Y', 'Z'] },
		{ initial: { x: 1, y: 2, z: 3, w: 4 }, names: ['X', 'Y', 'Z', 'W'] }
	])('renders $names.length fields for $names', async ({ initial, names }) => {
		render(BoundPoint, { props: { initial, label: 'Position' } });

		for (const name of names) {
			await expect.element(spinbutton(name)).toBeInTheDocument();
		}
		expect(page.getByRole('spinbutton').elements()).toHaveLength(names.length);
	});

	it('renames the fields from labels', async () => {
		render(BoundPoint, {
			props: {
				initial: { x: 1, y: 2, z: 3 },
				label: 'Color',
				labels: { x: 'R', y: 'G', z: 'B' }
			}
		});

		for (const name of ['R', 'G', 'B']) {
			await expect.element(spinbutton(name)).toBeInTheDocument();
		}
		expect(page.getByRole('spinbutton').elements()).toHaveLength(3);
	});

	it('steps only y on ArrowUp and adds no z to a 2D value', async () => {
		const { container } = render(BoundPoint, {
			props: { initial: { x: 1, y: 2 }, label: 'Position' }
		});

		spinbutton('Y').element().focus();
		await userEvent.keyboard('{ArrowUp}');

		expect(owner(container)).toEqual({ x: 1, y: 3 });
		expect('z' in owner(container)).toBe(false);
	});

	it('keeps x and z when y steps on a 3D value', async () => {
		const { container } = render(BoundPoint, {
			props: { initial: { x: 1, y: 2, z: 3 }, label: 'Position' }
		});

		spinbutton('Y').element().focus();
		await userEvent.keyboard('{ArrowUp}');

		expect(owner(container)).toEqual({ x: 1, y: 3, z: 3 });
	});

	it('writes only z when typing into Z', async () => {
		const { container } = render(BoundPoint, {
			props: { initial: { x: 1, y: 2, z: 3 }, label: 'Position' }
		});

		await userEvent.fill(spinbutton('Z'), '9');

		expect(owner(container)).toEqual({ x: 1, y: 2, z: 9 });
	});

	it('writes nothing when an axis is cleared', async () => {
		const { container, values } = renderControlled();

		await userEvent.clear(spinbutton('Y'));

		expect(values()).toEqual([]);
		expect(owner(container)).toEqual({ x: 1, y: 2, z: 3 });
	});

	it('records one whole object per scrub move with the other axes unchanged', async () => {
		const { values } = renderControlled({ initial: { x: 1, y: 10, z: 3 } });

		await scrubLabel('Y', [6, 7, 8]);

		expect(values()).toEqual([
			{ x: 1, y: 16, z: 3 },
			{ x: 1, y: 17, z: 3 },
			{ x: 1, y: 18, z: 3 }
		]);
	});

	it.each(INSET_CASES)('draws the $name label inside its input box', ({ name, labels }) => {
		render(BoundPoint, { props: { initial: { x: 1, y: 2, z: 3 }, label: 'Position', labels } });

		const { label, box } = boundingRectangles(name);

		expect(label.left, 'left edge').toBeGreaterThanOrEqual(box.left);
		expect(label.right, 'right edge').toBeLessThanOrEqual(box.right);
		expect(label.top, 'top edge').toBeGreaterThanOrEqual(box.top);
		expect(label.bottom, 'bottom edge').toBeLessThanOrEqual(box.bottom);
	});

	it.each(INSET_CASES)(
		'gives the $name label a target between 24 and 32 pixels wide and at least 24 tall',
		({ name, labels }) => {
			render(BoundPoint, {
				props: { initial: { x: 1, y: 2, z: 3 }, label: 'Position', labels }
			});

			const { label } = boundingRectangles(name);

			expect(label.width, 'width').toBeGreaterThanOrEqual(MIN_TARGET_PX);
			expect(label.width, 'width').toBeLessThanOrEqual(MAX_LETTER_WIDTH_PX);
			expect(label.height, 'height').toBeGreaterThanOrEqual(MIN_TARGET_PX);
		}
	);

	it('scrubs a custom axis label drawn inside its box', async () => {
		const { values } = renderControlled({ labels: RGB_LABELS });

		await scrubLabel('B', [6]);

		expect(values()).toEqual([{ x: 1, y: 2, z: 9 }]);
	});

	it('focuses the axis spinbutton on a click on its letter', async () => {
		render(BoundPoint, { props: { initial: { x: 1, y: 2, z: 3 }, label: 'Position' } });

		await commands.mouseMove('label:text-is("Z")');
		await commands.mouseDown();
		await commands.mouseUp();

		await expect.element(spinbutton('Z')).toHaveFocus();
	});

	it('applies min, max, and step to every axis', async () => {
		const { container } = render(BoundPoint, {
			props: { initial: { x: 5, y: 5, z: 5 }, label: 'Position', min: 0, max: 6, step: 2 }
		});

		for (const name of ['X', 'Y', 'Z']) {
			const field = spinbutton(name).element() as HTMLInputElement;
			expect([field.min, field.max, field.step]).toEqual(['0', '6', '2']);
		}

		spinbutton('X').element().focus();
		await userEvent.keyboard('{ArrowUp}');
		spinbutton('Z').element().focus();
		await userEvent.keyboard('{ArrowDown}');

		expect(owner(container)).toEqual({ x: 6, y: 5, z: 3 });
	});

	it('leaves the owner and the fields unchanged when the binding vetoes', async () => {
		const { container, values } = renderControlled({ accept: false });

		spinbutton('Y').element().focus();
		await userEvent.keyboard('{ArrowUp}');

		expect(values()).toEqual([{ x: 1, y: 3, z: 3 }]);
		expect(owner(container)).toEqual({ x: 1, y: 2, z: 3 });
		expect((spinbutton('Y').element() as HTMLInputElement).value).toBe('2');
	});

	it('disables every axis', async () => {
		render(BoundPoint, {
			props: { initial: { x: 1, y: 2, z: 3, w: 4 }, label: 'Position', disabled: true }
		});

		for (const field of page.getByRole('spinbutton').elements()) {
			expect((field as HTMLInputElement).disabled).toBe(true);
		}
	});

	it('requires an accessible name', () => {
		// @ts-expect-error no label, aria-label, or aria-labelledby
		const props: ComponentProps<typeof Point> = { value: { x: 0, y: 0 } };
		expect(props).toBeDefined();
	});
});
