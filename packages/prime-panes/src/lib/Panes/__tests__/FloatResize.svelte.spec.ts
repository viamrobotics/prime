import { describe, expect, it, onTestFinished } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { commands, page } from 'vitest/browser';

import FloatingPanes from '../../../../test/fixtures/FloatingPanes.svelte';
import { createFloatLayout, expectFloat, floatIds } from '../../../../test/layouts.ts';
import '../../../../test/panes-queries.ts';
import type { Point } from '../../../../test/input-commands.ts';
import type { FloatRect } from '../../layout.ts';

const FRAME_VIEWPORT = { width: 1000, height: 1400 };

const RECT: FloatRect = { x: 200, y: 150, width: 300, height: 200 };

interface FloatingProps {
	floatMinSize?: () => { width: number; height: number };
	usesPackageMinSize?: boolean;
	vetoesWrites?: boolean;
}

interface FloatingComponent {
	getLayout: () => never;
	getWrites: () => number;
}

function renderWindow(rect: FloatRect, props: FloatingProps = {}) {
	const layout = expectFloat(createFloatLayout());
	const initial = { ...layout, floats: [{ ...layout.floats[0]!, rect }] };
	const screen = render(FloatingPanes, { props: { initial, ...props } });
	return screen.component as unknown as FloatingComponent;
}

const storedRect = (component: FloatingComponent) =>
	expectFloat(component.getLayout()).floats[0]!.rect;

const windowElement = () => page.getByFloatEntry(floatIds.entryA);

const toStyle = (rect: FloatRect) => ({
	left: `${rect.x}px`,
	top: `${rect.y}px`,
	width: `${rect.width}px`,
	height: `${rect.height}px`
});

const pressWindowAt = async (at: Point) => {
	await commands.mouseMove(windowElement().selector, at);
	await commands.mouseDown();
};

const nextFrame = () => new Promise((resolve) => requestAnimationFrame(resolve));

const moveInBox = (at: Point) => commands.mouseMove(page.getByFloat(floatIds.float).selector, at);

describe('FloatResize', () => {
	it.each(['n', 'e', 's', 'w', 'ne', 'nw', 'se', 'sw'])(
		'renders a %s resize handle on a window',
		async (axis) => {
			renderWindow(RECT);

			await expect.element(page.getByFloatResize(floatIds.entryA, axis)).toBeInTheDocument();
		}
	);

	it('resizes from a corner with one write on release', async () => {
		const component = renderWindow(RECT);

		await pressWindowAt({ x: 299, y: 199 });
		await moveInBox({ x: 600, y: 450 });

		await expect
			.element(windowElement())
			.toHaveStyle(toStyle({ ...RECT, width: 401, height: 301 }));
		expect(component.getWrites()).toBe(0);
		expect(storedRect(component)).toEqual(RECT);

		await commands.mouseUp();

		await expect.poll(() => storedRect(component)).toEqual({ ...RECT, width: 401, height: 301 });
		expect(component.getWrites()).toBe(1);
	});

	it('resizes from an edge that moves the position with one write on release', async () => {
		const component = renderWindow(RECT);

		await pressWindowAt({ x: 1, y: 100 });
		await moveInBox({ x: 101, y: 260 });
		await commands.mouseUp();

		await expect
			.poll(() => storedRect(component))
			.toEqual({ x: 100, y: 150, width: 400, height: 200 });
		expect(component.getWrites()).toBe(1);
	});

	it('writes nothing for a press on a handle that never moves', async () => {
		const component = renderWindow(RECT);

		await pressWindowAt({ x: 299, y: 199 });
		await commands.mouseUp();

		expect(component.getWrites()).toBe(0);
		await expect.element(windowElement()).toHaveStyle(toStyle(RECT));
	});

	it('writes nothing when the pointer returns to where the press began', async () => {
		const component = renderWindow(RECT);

		await pressWindowAt({ x: 299, y: 199 });
		await moveInBox({ x: 600, y: 450 });
		await expect
			.element(windowElement())
			.toHaveStyle(toStyle({ ...RECT, width: 401, height: 301 }));
		await moveInBox({ x: 499, y: 349 });
		await commands.mouseUp();

		await expect.element(windowElement()).toHaveStyle(toStyle(RECT));
		expect(component.getWrites()).toBe(0);
	});

	it('stops an edge at the edge of the box', async () => {
		const component = renderWindow(RECT);

		await pressWindowAt({ x: 299, y: 100 });
		await moveInBox({ x: 900, y: 250 });
		await commands.mouseUp();

		await expect
			.poll(() => storedRect(component))
			.toEqual({ x: 200, y: 150, width: 600, height: 200 });
	});

	describe('minimum size', () => {
		const MINIMUM = { width: 120, height: 90 };

		it.each([
			{
				handle: 'se',
				press: { x: 299, y: 199 },
				release: { x: 20, y: 20 },
				expected: { x: 200, y: 150, width: 120, height: 90 }
			},
			{
				handle: 'nw',
				press: { x: 1, y: 1 },
				release: { x: 790, y: 590 },
				expected: { x: 380, y: 260, width: 120, height: 90 }
			},
			{
				handle: 'w',
				press: { x: 1, y: 100 },
				release: { x: 790, y: 250 },
				expected: { x: 380, y: 150, width: 120, height: 200 }
			},
			{
				handle: 'n',
				press: { x: 150, y: 1 },
				release: { x: 350, y: 590 },
				expected: { x: 200, y: 260, width: 300, height: 90 }
			}
		])(
			'stops a resize from $handle at the minimum and keeps the opposite edges',
			async ({ press, release, expected }) => {
				const component = renderWindow(RECT, { floatMinSize: () => MINIMUM });

				await pressWindowAt(press);
				await moveInBox(release);
				await expect.element(windowElement()).toHaveStyle(toStyle(expected));
				await commands.mouseUp();

				await expect.poll(() => storedRect(component)).toEqual(expected);
				expect(component.getWrites()).toBe(1);
			}
		);

		it('draws a rect smaller than the minimum at the minimum and keeps the stored rect', async () => {
			const small = { x: 100, y: 100, width: 100, height: 80 };
			const component = renderWindow(small, { floatMinSize: () => ({ width: 200, height: 150 }) });

			await expect
				.element(windowElement())
				.toHaveStyle(toStyle({ x: 100, y: 100, width: 200, height: 150 }));
			expect(storedRect(component)).toEqual(small);
			expect(component.getWrites()).toBe(0);
		});

		it('defaults the minimum to 160 by 120', async () => {
			renderWindow({ x: 100, y: 100, width: 100, height: 80 }, { usesPackageMinSize: true });

			await expect
				.element(windowElement())
				.toHaveStyle(toStyle({ x: 100, y: 100, width: 160, height: 120 }));
		});

		it('draws no larger than the box when the minimum is larger than the box', async () => {
			renderWindow(RECT, { floatMinSize: () => ({ width: 1000, height: 700 }) });

			await expect
				.element(windowElement())
				.toHaveStyle(toStyle({ x: 0, y: 0, width: 800, height: 600 }));
		});
	});

	it('snaps the window back when the binding vetoes the write', async () => {
		const component = renderWindow(RECT, { vetoesWrites: true });

		await pressWindowAt({ x: 299, y: 199 });
		await moveInBox({ x: 600, y: 450 });
		await expect
			.element(windowElement())
			.toHaveStyle(toStyle({ ...RECT, width: 401, height: 301 }));
		await commands.mouseUp();

		await expect.element(windowElement()).toHaveStyle(toStyle(RECT));
		expect(component.getWrites()).toBe(1);
		expect(storedRect(component)).toEqual(RECT);
	});

	describe('when the page changes size', () => {
		it('redraws the window clamped to a shrunken frame and writes nothing', async () => {
			const component = renderWindow({ x: 300, y: 200, width: 300, height: 200 });
			const frame = page.getByTestId('frame').element();

			frame.style.width = '500px';
			frame.style.height = '400px';

			await expect
				.element(windowElement())
				.toHaveStyle(toStyle({ x: 200, y: 200, width: 300, height: 200 }));
			expect(component.getWrites()).toBe(0);
			expect(storedRect(component)).toEqual({ x: 300, y: 200, width: 300, height: 200 });
		});

		it('leaves the window alone when the viewport shrinks past it and writes nothing', async () => {
			const wide = { x: 100, y: 100, width: 700, height: 500 };
			const component = renderWindow(wide);
			onTestFinished(() => page.viewport(FRAME_VIEWPORT.width, FRAME_VIEWPORT.height));

			await page.viewport(600, 500);
			await expect.poll(() => window.innerWidth).toBe(600);
			await nextFrame();

			await expect.element(windowElement()).toHaveStyle(toStyle(wide));
			expect(component.getWrites()).toBe(0);
			expect(storedRect(component)).toEqual(wide);
		});
	});
});
