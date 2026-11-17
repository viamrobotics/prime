import type { ComponentProps } from 'svelte';

import { describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { commands, page, userEvent } from 'vitest/browser';

import '../../../../test/tailwind.css';
import Point from '../Point.svelte';
import type { PointValue } from '../point.ts';
import BoundPoint from './BoundPoint.svelte';
import ControlledPoint from './ControlledPoint.svelte';
import PointWithDetails from './PointWithDetails.svelte';

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

describe('Point hint', () => {
	const HINT = 'Shown beside the label';

	it('names an info button after the label', async () => {
		render(Point, { props: { label: 'Position', hint: HINT, value: { x: 1, y: 2 } } });

		await expect.element(page.getByRole('button', { name: 'About Position' })).toBeInTheDocument();
	});

	it('describes the control by the hint while the tooltip is closed', async () => {
		render(Point, { props: { label: 'Position', hint: HINT, value: { x: 1, y: 2 } } });

		expect(page.getByRole('tooltip').query()).toBeNull();
		await expect
			.element(page.getByRole('group', { name: 'Position' }))
			.toHaveAccessibleDescription(HINT);
	});

	it('shows the hint in a tooltip when the button takes focus', async () => {
		render(Point, { props: { label: 'Position', hint: HINT, value: { x: 1, y: 2 } } });

		await userEvent.tab();
		await expect.element(page.getByRole('button', { name: 'About Position' })).toHaveFocus();
		await expect.element(page.getByRole('tooltip')).toHaveTextContent(HINT);
	});

	it('renders no button and no description without a hint', async () => {
		render(Point, { props: { label: 'Position', value: { x: 1, y: 2 } } });

		expect(page.getByRole('button', { name: 'About Position' }).query()).toBeNull();
		await expect
			.element(page.getByRole('group', { name: 'Position' }))
			.not.toHaveAttribute('aria-describedby');
	});

	it('gives the axis fields no hint of their own', async () => {
		render(Point, { props: { label: 'Position', hint: HINT, value: { x: 1, y: 2 } } });

		expect(page.getByRole('button').elements()).toHaveLength(1);
		await expect
			.element(page.getByRole('spinbutton', { name: 'X' }))
			.not.toHaveAttribute('aria-describedby');
	});
});

describe('Point suffix and state', () => {
	it('draws the suffix on every axis and describes each field by it', async () => {
		render(Point, { props: { label: 'Position', suffix: 'mm', value: { x: 1, y: 2, z: 3 } } });

		expect(page.getByText('mm', { exact: true }).elements()).toHaveLength(3);
		await expect.element(spinbutton('X')).toHaveAccessibleDescription('mm');
		await expect.element(spinbutton('Z')).toHaveAccessibleDescription('mm');
	});

	it('keeps typing writing the axis with a suffix', async () => {
		const { container } = render(BoundPoint, {
			props: { label: 'Position', suffix: 'mm', initial: { x: 1, y: 2 } }
		});

		await spinbutton('Y').fill('9');

		expect(owner(container)).toEqual({ x: 1, y: 9 });
	});

	it('forwards an error to every axis', async () => {
		render(Point, { props: { label: 'Position', state: 'error', value: { x: 1, y: 2 } } });

		await expect.element(spinbutton('X')).toHaveAttribute('aria-invalid', 'true');
		await expect.element(spinbutton('Y')).toHaveAttribute('aria-invalid', 'true');
	});

	it('forwards a warn to every axis without aria-invalid', async () => {
		render(Point, { props: { label: 'Position', state: 'warn', value: { x: 1, y: 2 } } });

		for (const axis of ['X', 'Y']) {
			await expect.element(spinbutton(axis)).toHaveAttribute('data-field-state', 'warn');
			await expect.element(spinbutton(axis)).not.toHaveAttribute('aria-invalid');
		}
	});
});

describe('Point per axis', () => {
	const position = { x: 1, y: 2, z: 3 };

	it('sets a state on one axis and leaves the others alone', async () => {
		render(Point, {
			props: { label: 'Position', axes: { y: { state: 'warn' } }, value: position }
		});

		await expect.element(spinbutton('Y')).toHaveAttribute('data-field-state', 'warn');
		await expect.element(spinbutton('X')).not.toHaveAttribute('data-field-state');
		await expect.element(spinbutton('Z')).not.toHaveAttribute('data-field-state');
	});

	it('lets an axis state take the place of the control state', async () => {
		render(Point, {
			props: { label: 'Position', state: 'error', axes: { y: { state: 'warn' } }, value: position }
		});

		await expect.element(spinbutton('X')).toHaveAttribute('aria-invalid', 'true');
		await expect.element(spinbutton('Y')).toHaveAttribute('data-field-state', 'warn');
		await expect.element(spinbutton('Y')).not.toHaveAttribute('aria-invalid');
	});

	it("draws details under each axis field, at that field's width", async () => {
		render(PointWithDetails, { props: { label: 'Position', value: position } });

		for (const axis of ['x', 'y', 'z']) {
			const button = page.getByRole('button', { name: `Reset ${axis}` });
			await expect.element(button).toBeInTheDocument();

			const field = spinbutton(axis.toUpperCase()).element().getBoundingClientRect();
			const column = button.element().parentElement!.getBoundingClientRect();
			expect(button.element().getBoundingClientRect().top).toBeGreaterThanOrEqual(field.bottom);
			expect(column.left).toBe(field.left);
			expect(column.width).toBe(field.width);
		}
	});

	it('keeps the axis fields the same width with details', () => {
		render(PointWithDetails, { props: { label: 'Position', messageAxis: 'y', value: position } });

		const widths = ['X', 'Y', 'Z'].map(
			(name) => spinbutton(name).element().getBoundingClientRect().width
		);

		// Grid tracks land on fractions of a pixel, so the widths agree to within one.
		expect(Math.max(...widths) - Math.min(...widths)).toBeLessThan(1);
	});

	it('describes one axis by the element its id names', async () => {
		render(PointWithDetails, { props: { label: 'Position', messageAxis: 'y', value: position } });

		await expect.element(spinbutton('Y')).toHaveAccessibleDescription('Moved since your edit');
		await expect.element(spinbutton('X')).not.toHaveAccessibleDescription();
	});

	it('lists the axis description before the suffix', async () => {
		render(PointWithDetails, {
			props: { label: 'Position', suffix: 'mm', messageAxis: 'y', value: position }
		});

		await expect.element(spinbutton('Y')).toHaveAccessibleDescription('Moved since your edit mm');
		await expect.element(spinbutton('X')).toHaveAccessibleDescription('mm');
	});

	it('gives one axis its own suffix, step, and range', async () => {
		const { container } = render(BoundPoint, {
			props: {
				label: 'Orientation',
				step: 0.01,
				min: -1,
				max: 1,
				labels: { w: 'Theta' },
				axes: { w: { step: 5, min: -180, max: 180, suffix: 'deg' } },
				initial: { x: 0, y: 0, z: 1, w: 90 }
			}
		});

		await expect.element(spinbutton('Theta')).toHaveAccessibleDescription('deg');
		await expect.element(spinbutton('X')).not.toHaveAccessibleDescription();
		await expect.element(spinbutton('Theta')).toHaveAttribute('max', '180');
		await expect.element(spinbutton('Z')).toHaveAttribute('max', '1');

		await userEvent.click(spinbutton('Theta'));
		await userEvent.keyboard('{ArrowUp}');
		expect(owner(container)).toEqual({ x: 0, y: 0, z: 1, w: 95 });

		await userEvent.click(spinbutton('X'));
		await userEvent.keyboard('{ArrowUp}');
		expect(owner(container)).toEqual({ x: 0.01, y: 0, z: 1, w: 95 });
	});

	it('draws no suffix on an axis whose own suffix is empty', async () => {
		render(Point, {
			props: {
				label: 'Mixed',
				suffix: 'mm',
				axes: { y: { suffix: '' } },
				value: { x: 1, y: 2 }
			}
		});

		await expect.element(spinbutton('X')).toHaveAccessibleDescription('mm');
		await expect.element(spinbutton('Y')).not.toHaveAccessibleDescription();
	});
});
