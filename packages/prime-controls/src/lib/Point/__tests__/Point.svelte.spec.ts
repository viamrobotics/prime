import type { ComponentProps } from 'svelte';

import { describe, expect, it, onTestFinished, vi } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { commands, page, userEvent } from 'vitest/browser';

import '../../../../test/tailwind.css';
import Point from '../Point.svelte';
import type { PointValue } from '../point.ts';
import BoundPoint from './fixtures/BoundPoint.svelte';
import ControlledPoint from './fixtures/ControlledPoint.svelte';
import PointWithDetails from './fixtures/PointWithDetails.svelte';
import PointWithTrailing from './fixtures/PointWithTrailing.svelte';

const owner = (container: Element) =>
	JSON.parse(container.querySelector('[data-testid="owner"]')!.textContent!) as PointValue;
const spinbutton = (name: string) => page.getByRole('spinbutton', { name, exact: true });

const axisLabels = () =>
	[...document.querySelectorAll('label')].map((label) => label.textContent?.trim());
const axisLabel = (text: string) =>
	[...document.querySelectorAll('label')].find((label) => label.textContent?.trim() === text)!;
const frame = (name: string) => spinbutton(name).element().parentElement!;

const boundingRectangles = (name: string) => ({
	label: axisLabel(name).getBoundingClientRect(),
	box: frame(name).getBoundingClientRect()
});

function probeStyle(className: string, read: (style: CSSStyleDeclaration) => string) {
	const probe = document.createElement('span');
	probe.className = className;
	document.body.append(probe);
	const value = read(getComputedStyle(probe));
	probe.remove();
	return value;
}

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

function addExternalLabel(text: string) {
	const element = document.createElement('span');
	element.id = 'external-label';
	element.textContent = text;
	document.body.append(element);
	onTestFinished(() => element.remove());
	return element.id;
}

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

type ControlledOptions = Pick<ComponentProps<typeof Point>, 'labels'> & {
	initial?: PointValue;
	shouldAccept?: boolean;
};

function renderControlled(props: ControlledOptions = {}) {
	const record = vi.fn<(next: PointValue) => void>();
	const screen = render(ControlledPoint, {
		props: {
			initial: { x: 1, y: 2, z: 3 },
			label: 'Position',
			shouldAccept: true,
			record,
			...props
		}
	});
	return { ...screen, values: () => record.mock.calls.map(([next]) => next) };
}

describe('Point', () => {
	it('names the group from a visible label', async () => {
		render(BoundPoint, { props: { initial: { x: 0, y: 0 }, label: 'Position' } });

		await expect.element(page.getByRole('group', { name: 'Position' })).toBeInTheDocument();
	});

	it('points aria-labelledby at the visible label', () => {
		render(BoundPoint, { props: { initial: { x: 0, y: 0 }, label: 'Position' } });

		const group = page.getByRole('group').element();
		const labelId = group.getAttribute('aria-labelledby')!;
		expect(document.getElementById(labelId)?.textContent).toBe('Position');
		expect(group.hasAttribute('aria-label'), 'aria-label is not set beside a label').toBe(false);
	});

	it('names the group from aria-labelledby without a label', async () => {
		const labelledby = addExternalLabel('Offset');
		render(BoundPoint, { props: { initial: { x: 0, y: 0 }, 'aria-labelledby': labelledby } });

		await expect.element(page.getByRole('group', { name: 'Offset' })).toBeInTheDocument();
	});

	it('names the group from aria-label without a label', async () => {
		render(BoundPoint, { props: { initial: { x: 0, y: 0 }, 'aria-label': 'Offset' } });

		await expect.element(page.getByRole('group', { name: 'Offset' })).toBeInTheDocument();
	});

	it.each([
		{ initial: { x: 1, y: 2 }, names: ['X', 'Y'] },
		{ initial: { x: 1, y: 2, z: 3 }, names: ['X', 'Y', 'Z'] },
		{ initial: { x: 1, y: 2, z: 3, w: 4 }, names: ['X', 'Y', 'Z', 'W'] }
	])('renders one field per defined axis, labeled $names', ({ initial, names }) => {
		render(BoundPoint, { props: { initial, label: 'Position' } });

		expect(axisLabels()).toEqual(names);
		expect(page.getByRole('spinbutton').elements(), 'one spinbutton per label').toHaveLength(
			names.length
		);
	});

	it('renames the fields from labels', () => {
		render(BoundPoint, {
			props: {
				initial: { x: 1, y: 2, z: 3 },
				label: 'Color',
				labels: { x: 'R', y: 'G', z: 'B' }
			}
		});

		expect(axisLabels()).toEqual(['R', 'G', 'B']);
	});

	it('keeps the uppercase axis name for an axis that labels does not rename', () => {
		render(BoundPoint, {
			props: { initial: { x: 1, y: 2, z: 3 }, label: 'Position', labels: { y: 'Height' } }
		});

		expect(axisLabels()).toEqual(['X', 'Height', 'Z']);
	});

	it('steps only y on ArrowUp of a 2D value', async () => {
		const { container } = render(BoundPoint, {
			props: { initial: { x: 1, y: 2 }, label: 'Position' }
		});

		spinbutton('Y').element().focus();
		await userEvent.keyboard('{ArrowUp}');

		expect(owner(container)).toEqual({ x: 1, y: 3 });
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

	it('leaves a cleared axis empty while it has focus', async () => {
		const { container } = render(BoundPoint, {
			props: { initial: { x: 1, y: 2, z: 3 }, label: 'Position' }
		});

		await userEvent.clear(spinbutton('Y'));

		await expect.element(spinbutton('Y')).toHaveFocus();
		expect((spinbutton('Y').element() as HTMLInputElement).value).toBe('');
		expect(owner(container)).toEqual({ x: 1, y: 2, z: 3 });
	});

	it('takes a negative number typed into a cleared axis', async () => {
		const { container } = render(BoundPoint, {
			props: { initial: { x: 1, y: 2, z: 3 }, label: 'Position' }
		});

		await userEvent.clear(spinbutton('X'));
		await userEvent.keyboard('-5');

		expect(owner(container)).toEqual({ x: -5, y: 2, z: 3 });
		expect((spinbutton('X').element() as HTMLInputElement).value).toBe('-5');
	});

	it('shows the axis number again when a cleared axis loses focus', async () => {
		const { container } = render(BoundPoint, {
			props: { initial: { x: 1, y: 2, z: 3 }, label: 'Position' }
		});

		await userEvent.clear(spinbutton('Y'));
		await userEvent.tab();

		await expect.element(spinbutton('Y')).toHaveValue(2);
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

	it.each(INSET_CASES)('draws the $name label inside its frame', ({ name, labels }) => {
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

	it('gives every axis the min, max, and step', () => {
		render(BoundPoint, {
			props: { initial: { x: 5, y: 5, z: 5 }, label: 'Position', min: 0, max: 6, step: 2 }
		});

		const limits = ['X', 'Y', 'Z'].map((name) => {
			const field = spinbutton(name).element() as HTMLInputElement;
			return [field.min, field.max, field.step];
		});

		expect(limits).toEqual([
			['0', '6', '2'],
			['0', '6', '2'],
			['0', '6', '2']
		]);
	});

	it('steps each axis by the step and stops at the max', async () => {
		const { container } = render(BoundPoint, {
			props: { initial: { x: 5, y: 5, z: 5 }, label: 'Position', min: 0, max: 6, step: 2 }
		});

		spinbutton('X').element().focus();
		await userEvent.keyboard('{ArrowUp}');
		spinbutton('Z').element().focus();
		await userEvent.keyboard('{ArrowDown}');

		expect(owner(container)).toEqual({ x: 6, y: 5, z: 3 });
	});

	it('leaves the owner and the fields unchanged when the binding vetoes', async () => {
		const { container, values } = renderControlled({ shouldAccept: false });

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

		const disabled = page
			.getByRole('spinbutton')
			.elements()
			.map((field) => (field as HTMLInputElement).disabled);

		expect(disabled, 'disabled flag of x, y, z, w').toEqual([true, true, true, true]);
	});

	it('disables the hint button', async () => {
		render(Point, {
			props: { label: 'Position', hint: 'Help', disabled: true, value: { x: 1, y: 2 } }
		});

		await expect.element(page.getByRole('button', { name: 'About Position' })).toBeDisabled();
	});

	it('requires an accessible name', () => {
		// @ts-expect-error no label, aria-label, or aria-labelledby
		const props: ComponentProps<typeof Point> = { value: { x: 0, y: 0 } };
		expect(props).toBeDefined();
	});

	it('refuses a hint without a visible label', () => {
		// @ts-expect-error a hint needs a visible label
		const props: ComponentProps<typeof Point> = {
			value: { x: 0, y: 0 },
			hint: 'Help',
			'aria-label': 'Offset'
		};
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

		expect(page.getByRole('tooltip').query(), 'tooltip is closed').toBeNull();
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

		expect(
			page.getByRole('button', { name: 'About Position' }).query(),
			'no hint button'
		).toBeNull();
		await expect
			.element(page.getByRole('group', { name: 'Position' }))
			.not.toHaveAttribute('aria-describedby');
	});

	it('gives the axis fields no hint of their own', async () => {
		render(Point, { props: { label: 'Position', hint: HINT, value: { x: 1, y: 2 } } });

		expect(page.getByRole('button').elements(), 'only the group hint button').toHaveLength(1);
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

	it.each(['X', 'Y'])('forwards a warn to the %s axis without aria-invalid', async (axis) => {
		render(Point, { props: { label: 'Position', state: 'warn', value: { x: 1, y: 2 } } });

		await expect.element(spinbutton(axis)).toHaveAttribute('data-field-state', 'warn');
		await expect.element(spinbutton(axis)).not.toHaveAttribute('aria-invalid');
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

	it.each(['x', 'y', 'z'])(
		"draws details under the %s field, at that field's width",
		async (axis) => {
			render(PointWithDetails, { props: { label: 'Position', value: position } });

			const button = page.getByRole('button', { name: `Reset ${axis}` });
			await expect.element(button).toBeInTheDocument();

			const field = frame(axis.toUpperCase()).getBoundingClientRect();
			const column = button.element().parentElement!.getBoundingClientRect();
			expect(
				button.element().getBoundingClientRect().top,
				'button is below the field'
			).toBeGreaterThanOrEqual(field.bottom);
			expect(column.left, 'column left edge').toBe(field.left);
			expect(column.width, 'column width').toBe(field.width);
		}
	);

	it.each([
		{ width: 352, columns: 3 },
		{ width: 351, columns: 1 }
	])('lays three axes out in $columns column(s) in a $width px box', ({ width, columns }) => {
		const { container } = render(Point, { props: { label: 'Position', value: position } });
		const root = container.querySelector<HTMLElement>('[role="group"]')!;
		root.style.width = `${width}px`;

		const axes = container.querySelector('[data-point-axes]')!;
		const lefts = new Set([...axes.children].map((child) => child.getBoundingClientRect().left));
		expect(lefts.size).toBe(columns);
	});

	it.each(['x', 'y', 'z'])("draws trailing content inside the %s field's frame", async (axis) => {
		render(PointWithTrailing, { props: { label: 'Position', value: position } });

		const button = page.getByRole('button', { name: `Reset ${axis}` });
		await expect.element(button).toBeInTheDocument();

		const field = spinbutton(axis.toUpperCase()).element();
		expect(button.element().parentElement).toBe(field.parentElement);
		expect(field.parentElement).toHaveClass('input');
	});

	it('keeps the axis fields within one pixel of the same width with details, since grid tracks land on fractions', () => {
		render(PointWithDetails, { props: { label: 'Position', messageAxis: 'y', value: position } });

		const widths = ['X', 'Y', 'Z'].map(
			(name) => spinbutton(name).element().getBoundingClientRect().width
		);

		expect(Math.max(...widths) - Math.min(...widths), 'width spread').toBeLessThan(1);
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

	describe('with one axis of its own', () => {
		const renderOrientation = () =>
			render(BoundPoint, {
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

		it('draws its own suffix on that axis only', async () => {
			renderOrientation();

			await expect.element(spinbutton('Theta')).toHaveAccessibleDescription('deg');
			await expect.element(spinbutton('X')).not.toHaveAccessibleDescription();
		});

		it('gives that axis its own min and max', async () => {
			renderOrientation();

			await expect.element(spinbutton('Theta')).toHaveAttribute('min', '-180');
			await expect.element(spinbutton('Theta')).toHaveAttribute('max', '180');
		});

		it('leaves the other axes on the control min and max', async () => {
			renderOrientation();

			await expect.element(spinbutton('Z')).toHaveAttribute('min', '-1');
			await expect.element(spinbutton('Z')).toHaveAttribute('max', '1');
		});

		it('steps that axis by its own step', async () => {
			const { container } = renderOrientation();

			await userEvent.click(spinbutton('Theta'));
			await userEvent.keyboard('{ArrowUp}');

			expect(owner(container)).toEqual({ x: 0, y: 0, z: 1, w: 95 });
		});

		it('steps the other axes by the control step', async () => {
			const { container } = renderOrientation();

			await userEvent.click(spinbutton('X'));
			await userEvent.keyboard('{ArrowUp}');

			expect(owner(container)).toEqual({ x: 0.01, y: 0, z: 1, w: 90 });
		});
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

describe('Point root and naming', () => {
	const value = { x: 1, y: 2 };

	it('passes an id and a data attribute to the root', () => {
		const { container } = render(Point, {
			props: { label: 'Position', value, id: 'position-root', 'data-extra': 'yes' }
		});

		const root = container.querySelector('[role="group"]')!;
		expect(root).toHaveAttribute('id', 'position-root');
		expect(root).toHaveAttribute('data-extra', 'yes');
	});

	it('draws the label at 12 px in the subtle-1 text color', () => {
		const { container } = render(Point, { props: { label: 'Position', value } });

		const style = getComputedStyle(container.querySelector('[role="group"] > span')!);

		expect(style.fontSize).toBe('12px');
		expect(style.color).toBe(probeStyle('text-subtle-1', (probe) => probe.color));
	});

	it.each<{ by: string; props: ComponentProps<typeof Point> }>([
		{ by: 'label', props: { label: 'Speed', value: { x: 1, y: 2 } } },
		{ by: 'aria-label', props: { 'aria-label': 'Speed', value: { x: 1, y: 2 } } },
		{ by: 'aria-labelledby', props: { 'aria-labelledby': 'speed-name', value: { x: 1, y: 2 } } }
	])('renders named by $by without a console warning', ({ props }) => {
		const warn = vi.spyOn(console, 'warn');
		onTestFinished(() => warn.mockRestore());

		render(Point, { props });

		expect(warn).not.toHaveBeenCalled();
	});

	it('requires an accessible name', () => {
		// @ts-expect-error no label, aria-label, or aria-labelledby
		const props: ComponentProps<typeof Point> = { value: { x: 1, y: 2 } };
		expect(props).toBeDefined();
	});

	it('requires a visible label for a hint', () => {
		const value = { x: 1, y: 2 };
		// @ts-expect-error hint with aria-label and no visible label
		const props: ComponentProps<typeof Point> = { 'aria-label': 'Speed', hint: 'Tip', value };
		expect(props).toBeDefined();
	});
});
