import { describe, expect, it, onTestFinished } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { page, userEvent } from 'vitest/browser';

import FloatingPanes from '../../../../test/fixtures/FloatingPanes.svelte';
import {
	createFloatLayout,
	createNestedFloatLayout,
	expectFloat,
	floatIds,
	nestedFloatIds
} from '../../../../test/layouts.ts';
import '../../../../test/panes-queries.ts';
import { FLOAT_RESIZE_AXES } from '../../FloatPanes/float-resize.ts';
import type { FloatRect, LayoutNode } from '../../layout.ts';
import type { PaneData } from '../../../../test/layouts.ts';

const RECT: FloatRect = { x: 200, y: 150, width: 300, height: 200 };

const MINIMUM = { width: 120, height: 90 };

const PAGE_FRAME_WIDTH = 800;
const PAGE_FRAME_HEIGHT = 600;

interface FloatingProps {
	initial?: LayoutNode<PaneData>;
	floatMinSize?: () => { width: number; height: number };
	vetoesWrites?: boolean;
	withFields?: boolean;
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

const focusWindow = async () => {
	await expect.element(windowElement()).toBeInTheDocument();
	(windowElement().element() as HTMLElement).focus();
};

const press = (key: string) => userEvent.keyboard(`{${key}}`);

const pressWith = (modifiers: string[], key: string) => {
	const down = modifiers.map((modifier) => `{${modifier}>}`).join('');
	const up = [...modifiers]
		.reverse()
		.map((modifier) => `{/${modifier}}`)
		.join('');
	return userEvent.keyboard(`${down}{${key}}${up}`);
};

describe('FloatWindowKeys', () => {
	describe('dialog', () => {
		it.each([
			{ name: floatIds.paneA, entry: floatIds.entryA },
			{ name: floatIds.paneB, entry: floatIds.entryB }
		])('names a window holding one pane by its label, $name', async ({ name, entry }) => {
			render(FloatingPanes);

			const dialog = page.getByRole('dialog', { name, exact: true });
			await expect.element(dialog).toHaveAttribute('data-float-entry', entry);
		});

		it('names a window holding a split by the labels of both panes', async () => {
			render(FloatingPanes, { props: { initial: createNestedFloatLayout() } });

			const name = `${nestedFloatIds.splitFirst} and ${nestedFloatIds.splitSecond}`;
			await expect
				.element(page.getByRole('dialog', { name, exact: true }))
				.toHaveAttribute('data-float-entry', floatIds.entryA);
		});

		it('names a window holding a stack by the labels of every tab', async () => {
			render(FloatingPanes, { props: { initial: createNestedFloatLayout() } });

			const name = `${nestedFloatIds.stackFirst} and ${nestedFloatIds.stackSecond}`;
			await expect
				.element(page.getByRole('dialog', { name, exact: true }))
				.toHaveAttribute('data-float-entry', floatIds.entryB);
		});

		it('is not modal', async () => {
			render(FloatingPanes);

			const dialog = page.getByRole('dialog', { name: floatIds.paneA, exact: true });
			await expect.element(dialog).not.toHaveAttribute('aria-modal');
		});

		it('carries no zag stacking attribute on any window after a raise', async () => {
			const screen = render(FloatingPanes);
			const component = screen.component as unknown as FloatingComponent;
			await userEvent.click(page.getByPaneContent(floatIds.paneA));
			await expect
				.poll(() => expectFloat(component.getLayout()).floats.map((entry) => entry.id))
				.toEqual([floatIds.entryB, floatIds.entryA]);

			const stackingAttributes = [floatIds.entryA, floatIds.entryB].flatMap((entryId) =>
				['data-topmost', 'data-behind']
					.filter((name) => page.getByFloatEntry(entryId).element().hasAttribute(name))
					.map((name) => `${entryId} ${name}`)
			);

			expect(stackingAttributes).toEqual([]);
		});

		it('is a tab stop that Shift+Tab reaches from inside its pane', async () => {
			renderWindow(RECT);
			await userEvent.click(page.getByPaneContent(floatIds.paneA));

			await userEvent.tab({ shift: true });

			await expect.element(windowElement()).toHaveFocus();
		});
	});

	describe('moving with the arrow keys', () => {
		it.each([
			{ key: 'ArrowRight', expected: { ...RECT, x: 210 } },
			{ key: 'ArrowLeft', expected: { ...RECT, x: 190 } },
			{ key: 'ArrowDown', expected: { ...RECT, y: 160 } },
			{ key: 'ArrowUp', expected: { ...RECT, y: 140 } }
		])('moves 10 pixels on $key with one write', async ({ key, expected }) => {
			const component = renderWindow(RECT);
			await focusWindow();

			await press(key);

			await expect.element(windowElement()).toHaveStyle(toStyle(expected));
			expect(storedRect(component)).toEqual(expected);
			expect(component.getWrites()).toBe(1);
		});

		it.each([
			{ key: 'ArrowRight', expected: { ...RECT, x: 300 } },
			{ key: 'ArrowLeft', expected: { ...RECT, x: 100 } },
			{ key: 'ArrowDown', expected: { ...RECT, y: 250 } },
			{ key: 'ArrowUp', expected: { ...RECT, y: 50 } }
		])('moves 100 pixels on Shift+$key with one write', async ({ key, expected }) => {
			const component = renderWindow(RECT);
			await focusWindow();

			await pressWith(['Shift'], key);

			await expect.element(windowElement()).toHaveStyle(toStyle(expected));
			expect(storedRect(component)).toEqual(expected);
			expect(component.getWrites()).toBe(1);
		});

		it('writes once per key and steps from the rect the key before left', async () => {
			const component = renderWindow(RECT);
			await focusWindow();

			await press('ArrowRight');
			await press('ArrowRight');
			await press('ArrowDown');

			await expect.element(windowElement()).toHaveStyle(toStyle({ ...RECT, x: 220, y: 160 }));
			expect(storedRect(component)).toEqual({ ...RECT, x: 220, y: 160 });
			expect(component.getWrites()).toBe(3);
		});

		it('stops at the edge of the box and writes nothing once there', async () => {
			const component = renderWindow({ ...RECT, x: 5 });
			await focusWindow();

			await press('ArrowLeft');
			await press('ArrowLeft');

			await expect.element(windowElement()).toHaveStyle(toStyle({ ...RECT, x: 0 }));
			expect(component.getWrites()).toBe(1);
		});

		it('leaves a Ctrl+Arrow alone', async () => {
			const component = renderWindow(RECT);
			await focusWindow();

			await pressWith(['Control'], 'ArrowRight');

			await expect.element(windowElement()).toHaveStyle(toStyle(RECT));
			expect(component.getWrites()).toBe(0);
		});

		it('moves nothing while the window is not focused', async () => {
			const component = renderWindow(RECT);
			await expect.element(windowElement()).toBeInTheDocument();

			await press('ArrowRight');

			await expect.element(windowElement()).toHaveStyle(toStyle(RECT));
			expect(component.getWrites()).toBe(0);
		});
	});

	describe('resizing with Alt and the arrow keys', () => {
		it.each([
			{ key: 'ArrowRight', expected: { ...RECT, width: 310 } },
			{ key: 'ArrowLeft', expected: { ...RECT, width: 290 } },
			{ key: 'ArrowDown', expected: { ...RECT, height: 210 } },
			{ key: 'ArrowUp', expected: { ...RECT, height: 190 } }
		])('moves the east or south edge 10 pixels on Alt+$key with one write', async (testCase) => {
			const component = renderWindow(RECT);
			await focusWindow();

			await pressWith(['Alt'], testCase.key);

			await expect.element(windowElement()).toHaveStyle(toStyle(testCase.expected));
			expect(storedRect(component)).toEqual(testCase.expected);
			expect(component.getWrites()).toBe(1);
		});

		it.each([
			{ key: 'ArrowRight', expected: { ...RECT, width: 400 } },
			{ key: 'ArrowLeft', expected: { ...RECT, width: 200 } },
			{ key: 'ArrowDown', expected: { ...RECT, height: 300 } },
			{ key: 'ArrowUp', expected: { ...RECT, height: 100 } }
		])('moves the edge 100 pixels on Shift+Alt+$key with one write', async (testCase) => {
			const component = renderWindow(RECT);
			await focusWindow();

			await pressWith(['Shift', 'Alt'], testCase.key);

			await expect.element(windowElement()).toHaveStyle(toStyle(testCase.expected));
			expect(storedRect(component)).toEqual(testCase.expected);
			expect(component.getWrites()).toBe(1);
		});

		it('stops shrinking the width at the minimum and writes nothing once there', async () => {
			const component = renderWindow(RECT, { floatMinSize: () => MINIMUM });
			await focusWindow();

			await pressWith(['Shift', 'Alt'], 'ArrowLeft');
			await pressWith(['Shift', 'Alt'], 'ArrowLeft');
			await pressWith(['Shift', 'Alt'], 'ArrowLeft');

			await expect.element(windowElement()).toHaveStyle(toStyle({ ...RECT, width: MINIMUM.width }));
			expect(component.getWrites()).toBe(2);
		});

		it('stops shrinking the height at the minimum', async () => {
			const component = renderWindow(RECT, { floatMinSize: () => MINIMUM });
			await focusWindow();

			await pressWith(['Shift', 'Alt'], 'ArrowUp');
			await pressWith(['Shift', 'Alt'], 'ArrowUp');

			await expect
				.element(windowElement())
				.toHaveStyle(toStyle({ ...RECT, height: MINIMUM.height }));
			expect(storedRect(component).height).toBe(MINIMUM.height);
		});

		it('stops growing the width at the east edge of the box', async () => {
			const component = renderWindow(RECT);
			await focusWindow();

			await pressWith(['Shift', 'Alt'], 'ArrowRight');
			await pressWith(['Shift', 'Alt'], 'ArrowRight');
			await pressWith(['Shift', 'Alt'], 'ArrowRight');
			await pressWith(['Shift', 'Alt'], 'ArrowRight');

			const widthToEdge = PAGE_FRAME_WIDTH - RECT.x;
			await expect.element(windowElement()).toHaveStyle(toStyle({ ...RECT, width: widthToEdge }));
			expect(component.getWrites()).toBe(3);
		});

		it('stops growing the height at the south edge of the box', async () => {
			const component = renderWindow(RECT);
			await focusWindow();

			await pressWith(['Shift', 'Alt'], 'ArrowDown');
			await pressWith(['Shift', 'Alt'], 'ArrowDown');
			await pressWith(['Shift', 'Alt'], 'ArrowDown');

			const heightToEdge = PAGE_FRAME_HEIGHT - RECT.y;
			await expect.element(windowElement()).toHaveStyle(toStyle({ ...RECT, height: heightToEdge }));
			expect(storedRect(component).height).toBe(heightToEdge);
		});

		it('does not navigate the page on Alt+ArrowLeft', async () => {
			renderWindow(RECT);
			await focusWindow();
			history.pushState(null, '', '#before-alt-arrow');
			const urlBefore = location.href;
			onTestFinished(() => history.replaceState(null, '', location.pathname + location.search));
			const defaultPreventedByKey: boolean[] = [];
			const record = (event: KeyboardEvent) => {
				if (event.key === 'ArrowLeft') defaultPreventedByKey.push(event.defaultPrevented);
			};
			window.addEventListener('keydown', record);
			onTestFinished(() => window.removeEventListener('keydown', record));

			await pressWith(['Alt'], 'ArrowLeft');

			expect(location.href).toBe(urlBefore);
			expect(defaultPreventedByKey).toEqual([true]);
		});
	});

	describe('a text field inside the window', () => {
		const noteField = () => page.getByRole('textbox', { name: `Notes for ${floatIds.paneA}` });

		it('keeps its arrows, so none moves the window', async () => {
			const component = renderWindow(RECT, { withFields: true });
			await noteField().fill('abc');

			await press('ArrowLeft');
			await pressWith(['Shift'], 'ArrowRight');
			await pressWith(['Alt'], 'ArrowLeft');

			await expect.element(windowElement()).toHaveStyle(toStyle(RECT));
			expect(component.getWrites()).toBe(0);
		});

		it('moves its caret on an arrow key', async () => {
			renderWindow(RECT, { withFields: true });
			await noteField().fill('abc');

			await press('ArrowLeft');

			expect((noteField().element() as HTMLInputElement).selectionStart).toBe(2);
		});
	});

	describe('resize handles', () => {
		it('carry no role, tabindex, or accessible name', async () => {
			renderWindow(RECT);
			await expect.element(page.getByFloatResize(floatIds.entryA, 'se')).toBeInTheDocument();

			const handleAttributes = FLOAT_RESIZE_AXES.flatMap((axis) =>
				['role', 'tabindex', 'aria-label', 'aria-labelledby']
					.filter((name) =>
						page.getByFloatResize(floatIds.entryA, axis).element().hasAttribute(name)
					)
					.map((name) => `${axis} ${name}`)
			);

			expect(handleAttributes).toEqual([]);
		});

		it('are skipped by Tab', async () => {
			renderWindow(RECT, { withFields: true });
			await focusWindow();
			const reached: Element[] = [];

			for (let tabs = 0; tabs < 5; tabs += 1) {
				await userEvent.tab();
				reached.push(document.activeElement!);
			}

			const reachedHandles = reached.filter((element) => element.hasAttribute('data-float-resize'));
			const reachedNames = reached.map((element) => element.getAttribute('aria-label'));
			expect(reachedHandles).toEqual([]);
			expect(reachedNames).toContain(`Notes for ${floatIds.paneA}`);
			expect(reachedNames).toContain(`Close ${floatIds.paneA}`);
		});
	});

	describe('a binding that vetoes the write', () => {
		it('leaves the window in place after an arrow key', async () => {
			const component = renderWindow(RECT, { vetoesWrites: true });
			await focusWindow();

			await press('ArrowRight');

			await expect.element(windowElement()).toHaveStyle(toStyle(RECT));
			expect(storedRect(component)).toEqual(RECT);
			expect(component.getWrites()).toBe(1);
		});

		it('leaves the window the same size after an Alt+Arrow key', async () => {
			const component = renderWindow(RECT, { vetoesWrites: true });
			await focusWindow();

			await pressWith(['Alt'], 'ArrowRight');

			await expect.element(windowElement()).toHaveStyle(toStyle(RECT));
			expect(storedRect(component)).toEqual(RECT);
			expect(component.getWrites()).toBe(1);
		});
	});
});
