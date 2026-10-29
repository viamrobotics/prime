import { beforeEach, describe, expect, it, onTestFinished } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { commands, page, userEvent } from 'vitest/browser';

import FloatDragPanes from '../../../../test/fixtures/FloatDragPanes.svelte';
import {
	createFloatLayout,
	createNestedFloatLayout,
	expectFloat,
	floatIds,
	nestedFloatIds,
	pane
} from '../../../../test/layouts.ts';
import type { PaneData } from '../../../../test/layouts.ts';
import '../../../../test/panes-queries.ts';
import type { FloatRect, LayoutNode } from '../../layout.ts';

const OTHER: FloatRect = { x: 450, y: 20, width: 200, height: 150 };
const WINDOW: FloatRect = { x: 450, y: 300, width: 240, height: 160 };
const FLOATED_BASE_LEFT: FloatRect = { x: 10, y: 10, width: 400, height: 600 };

interface WindowProps {
	layout?: LayoutNode<PaneData>;
	vetoesWrites?: boolean;
	floatingMoveTarget?: 'pane' | 'stack' | 'float';
}

function renderWindows({ layout: custom, ...props }: WindowProps = {}) {
	const layout = expectFloat(custom ?? createFloatLayout());
	const rects = [OTHER, WINDOW];
	const initial = {
		...layout,
		floats: layout.floats.map((entry, index) => ({ ...entry, rect: rects[index] ?? WINDOW }))
	};
	return render(FloatDragPanes, { props: { floatingMoveTarget: 'pane', ...props, initial } })
		.component;
}

type WindowsComponent = ReturnType<typeof renderWindows>;

const entriesOf = (component: WindowsComponent) => {
	const layout = component.getLayout();
	return layout?.type === 'float' ? layout.floats : [];
};

const trigger = (label: string) => page.getByRole('button', { name: `Move ${label}`, exact: true });
const floatChoice = (label: string) =>
	page.getByRole('button', { name: `Float ${label}`, exact: true });
const anyFloatChoice = () => page.getByRole('button', { name: /^Float / });
const mark = (name: string) => page.getByRole('button', { name, exact: true });
const announcement = () => page.getByRole('status').element().textContent;

const focusMark = async (name: string) => {
	mark(name).element().focus();
	await expect.element(mark(name)).toHaveFocus();
};

const startMove = async (label: string) => {
	trigger(label).element().focus();
	await userEvent.keyboard('{Enter}');
	await expect.element(page.getByMovingPane()).toHaveFocus();
};

describe('FloatKeyboard: floating the moving base pane', () => {
	it('offers Float on the moving base pane, and floats it in place offset by one step', async () => {
		const component = renderWindows();
		await startMove(floatIds.baseLeft);

		await userEvent.keyboard('{Shift>}{Tab}{/Shift}');
		await expect.element(floatChoice(floatIds.baseLeft)).toHaveFocus();
		await userEvent.keyboard('{Enter}');

		await expect.poll(() => entriesOf(component)).toHaveLength(3);
		const floated = entriesOf(component).at(-1)!;
		expect(floated.content).toEqual(pane(floatIds.baseLeft, floatIds.baseLeft));
		expect(floated.rect).toEqual(FLOATED_BASE_LEFT);
		expect(expectFloat(component.getLayout()).base).toEqual(
			pane(floatIds.baseRight, floatIds.baseRight)
		);
		expect(announcement()).toBe(`Floated ${floatIds.baseLeft}.`);
	});

	it('returns focus to the floated pane', async () => {
		renderWindows();
		await startMove(floatIds.baseLeft);

		await userEvent.keyboard('{Shift>}{Tab}{/Shift}{Enter}');

		await expect.element(trigger(floatIds.baseLeft)).toHaveFocus();
	});

	it('offers no Float to a pane that is already in a window', async () => {
		renderWindows();
		await startMove(floatIds.baseLeft);
		await expect.element(anyFloatChoice()).toBeInTheDocument();
		await userEvent.keyboard('{Escape}');
		await expect.element(page.getByMovingPane()).not.toBeInTheDocument();

		await startMove(floatIds.paneB);

		await expect.element(anyFloatChoice()).not.toBeInTheDocument();
	});

	it('reports a float the layout binding vetoed as not moved', async () => {
		const component = renderWindows({ vetoesWrites: true });
		const before = component.getLayout();
		await startMove(floatIds.baseLeft);

		await userEvent.keyboard('{Shift>}{Tab}{/Shift}{Enter}');

		await expect.poll(announcement).toBe(`${floatIds.baseLeft} was not moved.`);
		expect(component.getLayout()).toBe(before);
	});
});

describe('FloatKeyboard: docking the moving window pane', () => {
	it('docks onto a base destination and drops the emptied window', async () => {
		const component = renderWindows();
		await startMove(floatIds.paneB);

		await focusMark(`Swap ${floatIds.paneB} with ${floatIds.baseRight}`);
		await userEvent.keyboard('{ArrowRight}{Enter}');

		await expect
			.poll(() => entriesOf(component).map((entry) => entry.id))
			.toEqual([floatIds.entryA]);
		expect(expectFloat(component.getLayout()).base).toEqual({
			type: 'split',
			id: floatIds.base,
			direction: 'row',
			ratio: 0.5,
			first: pane(floatIds.baseLeft, floatIds.baseLeft),
			second: {
				type: 'split',
				id: expect.any(String),
				direction: 'row',
				ratio: 0.5,
				first: pane(floatIds.baseRight, floatIds.baseRight),
				second: pane(floatIds.paneB, floatIds.paneB)
			}
		});
		expect(announcement()).toBe(`Docked ${floatIds.paneB} right of ${floatIds.baseRight}.`);
	});

	it('moves focus to the docked pane', async () => {
		renderWindows();
		await startMove(floatIds.paneB);

		await focusMark(`Swap ${floatIds.paneB} with ${floatIds.baseRight}`);
		await userEvent.keyboard('{ArrowRight}{Enter}');

		await expect.element(trigger(floatIds.paneB)).toHaveFocus();
	});

	it('offers the panes of other windows as destinations, and calls a landing in one a placement', async () => {
		const component = renderWindows();
		await startMove(floatIds.paneB);

		await focusMark(`Swap ${floatIds.paneB} with ${floatIds.paneA}`);
		await userEvent.keyboard('{ArrowRight}{Enter}');

		await expect
			.poll(() => entriesOf(component).map((entry) => entry.id))
			.toEqual([floatIds.entryA]);
		expect(entriesOf(component)[0]!.content).toEqual({
			type: 'split',
			id: expect.any(String),
			direction: 'row',
			ratio: 0.5,
			first: pane(floatIds.paneA, floatIds.paneA),
			second: pane(floatIds.paneB, floatIds.paneB)
		});
		expect(announcement()).toBe(`${floatIds.paneB} placed right of ${floatIds.paneA}.`);
	});
});

describe('FloatKeyboard: MoveTrigger with target="float"', () => {
	const STACK_LABEL = `${nestedFloatIds.stackFirst} and ${nestedFloatIds.stackSecond}`;

	const renderStackWindow = () => {
		const nested = expectFloat(createNestedFloatLayout());
		const layout = { ...nested, floats: [nested.floats[1]!] };
		return renderWindows({ layout, floatingMoveTarget: 'float' });
	};

	it('moves the whole stack of the window and reports it as pressed', async () => {
		renderStackWindow();
		await expect
			.element(trigger(nestedFloatIds.stackFirst))
			.toHaveAttribute('aria-pressed', 'false');

		await startMove(nestedFloatIds.stackFirst);

		await expect
			.element(trigger(nestedFloatIds.stackFirst))
			.toHaveAttribute('aria-pressed', 'true');
		expect(announcement()).toContain(`Moving ${STACK_LABEL}.`);
	});

	it('docks the stack whole, leaving no window', async () => {
		const component = renderStackWindow();
		await startMove(nestedFloatIds.stackFirst);

		await focusMark(`Swap ${STACK_LABEL} with ${floatIds.baseRight}`);
		await userEvent.keyboard('{ArrowRight}{Enter}');

		await expect.poll(() => component.getLayout()?.type).toBe('split');
		expect(component.getLayout()).toEqual({
			type: 'split',
			id: floatIds.base,
			direction: 'row',
			ratio: 0.5,
			first: pane(floatIds.baseLeft, floatIds.baseLeft),
			second: {
				type: 'split',
				id: expect.any(String),
				direction: 'row',
				ratio: 0.5,
				first: pane(floatIds.baseRight, floatIds.baseRight),
				second: {
					type: 'stack',
					id: 'nested-stack',
					panes: [
						pane(nestedFloatIds.stackFirst, nestedFloatIds.stackFirst),
						pane(nestedFloatIds.stackSecond, nestedFloatIds.stackSecond)
					],
					activeId: nestedFloatIds.stackFirst
				}
			}
		});
		expect(announcement()).toBe(`Docked ${STACK_LABEL} right of ${floatIds.baseRight}.`);
	});
});

describe('FloatKeyboard: move-mode navigation per layer', () => {
	const OUTSIDE_EVERY_FIXTURE = { x: '99%', y: '99%' } as const;

	beforeEach(() => commands.mouseMove('html', OUTSIDE_EVERY_FIXTURE));

	const renderLayers = () => renderWindows({ layout: createNestedFloatLayout() });

	const recordDefaultPrevented = () => {
		const results: boolean[] = [];
		const controller = new AbortController();
		onTestFinished(() => controller.abort());
		window.addEventListener('keydown', (event) => results.push(event.defaultPrevented), {
			signal: controller.signal
		});
		return results;
	};

	it('keeps an arrow from a base pane out of the windows it points at', async () => {
		renderLayers();
		await startMove(floatIds.baseRight);
		await focusMark(`Place ${floatIds.baseRight} right of ${floatIds.baseLeft}`);
		const prevented = recordDefaultPrevented();

		await userEvent.keyboard('{ArrowRight}');

		await expect
			.element(mark(`Place ${floatIds.baseRight} right of ${floatIds.baseLeft}`))
			.toHaveFocus();
		expect(prevented).toEqual([false]);
	});

	it('moves between the panes of a window and never into another window', async () => {
		renderLayers();
		await startMove(floatIds.baseLeft);
		await focusMark(`Place ${floatIds.baseLeft} right of ${nestedFloatIds.splitFirst}`);

		await userEvent.keyboard('{ArrowRight}');
		await expect
			.element(mark(`Place ${floatIds.baseLeft} left of ${nestedFloatIds.splitSecond}`))
			.toHaveFocus();
		await focusMark(`Place ${floatIds.baseLeft} below ${nestedFloatIds.splitSecond}`);
		const prevented = recordDefaultPrevented();

		await userEvent.keyboard('{ArrowDown}');

		await expect
			.element(mark(`Place ${floatIds.baseLeft} below ${nestedFloatIds.splitSecond}`))
			.toHaveFocus();
		expect(prevented).toEqual([false]);
	});

	it('crosses to each window in DOM order with F6, then wraps to the base', async () => {
		renderLayers();
		await startMove(floatIds.baseLeft);
		const prevented = recordDefaultPrevented();

		await userEvent.keyboard('{F6}');
		await expect
			.element(mark(`Swap ${floatIds.baseLeft} with ${nestedFloatIds.splitFirst}`))
			.toHaveFocus();
		await userEvent.keyboard('{F6}');
		await expect
			.element(mark(`Swap ${floatIds.baseLeft} with ${nestedFloatIds.stackFirst}`))
			.toHaveFocus();
		await userEvent.keyboard('{F6}');
		await expect
			.element(mark(`Swap ${floatIds.baseLeft} with ${floatIds.baseRight}`))
			.toHaveFocus();
		expect(prevented).toEqual([true, true, true]);
	});

	it('crosses the layers in reverse with Shift+F6', async () => {
		renderLayers();
		await startMove(floatIds.baseLeft);

		await userEvent.keyboard('{Shift>}{F6}{/Shift}');
		await expect
			.element(mark(`Swap ${floatIds.baseLeft} with ${nestedFloatIds.stackFirst}`))
			.toHaveFocus();
		await userEvent.keyboard('{Shift>}{F6}{/Shift}');
		await expect
			.element(mark(`Swap ${floatIds.baseLeft} with ${nestedFloatIds.splitFirst}`))
			.toHaveFocus();
		await userEvent.keyboard('{Shift>}{F6}{/Shift}');
		await expect
			.element(mark(`Swap ${floatIds.baseLeft} with ${floatIds.baseRight}`))
			.toHaveFocus();
	});

	it('leaves F6 to the browser outside move mode', async () => {
		renderLayers();
		trigger(floatIds.baseLeft).element().focus();
		const prevented = recordDefaultPrevented();

		await userEvent.keyboard('{F6}');

		expect(prevented).toEqual([false]);
		await expect.element(page.getByPanesInMoveMode()).not.toBeInTheDocument();
	});
});
