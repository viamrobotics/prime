import { afterEach, describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { commands, page } from 'vitest/browser';

import { ids, layoutRoot } from '../../../../test/layouts.ts';
import PanePartsPanes from '../../../../test/fixtures/PanePartsPanes.svelte';

const RIGHT = { x: '90%', y: '50%' } as const;

const warningFor = (label: string) =>
	`Panes: a drag started in pane "${label}", which has no Panes.MoveTrigger. Dragging alone fails WCAG 2.5.7 (Dragging Movements), so render a Panes.MoveTrigger in the pane to move it without dragging. A Panes.MoveTrigger that mounts only on demand, such as inside a menu, still triggers this warning until it first mounts.`;

const cameraHeader = () => page.getByPaneHeader('Camera');
const cameraGrip = () => page.getByRole('button', { name: 'Move Camera', exact: true });
const cameraMenuItem = () => page.getByRole('menuitem', { name: 'Move Camera', exact: true });
const menuButton = () => page.getByRole('button', { name: 'Menu for Camera', exact: true });
const timeSeries = () => page.getByPane(ids.mytimeseries);
const sensor = () => page.getByPane(ids.mysensor);

const warnSpy = () => vi.spyOn(console, 'warn').mockImplementation(() => undefined);

afterEach(() => vi.restoreAllMocks());

describe('Panes.MoveTrigger: dragging a pane that has none', () => {
	it('logs no warning before any drag', async () => {
		const warn = warnSpy();

		render(PanePartsPanes, { props: { variant: 'drag-only' } });

		await expect.element(cameraHeader()).toBeInTheDocument();
		expect(warn).not.toHaveBeenCalled();
	});

	it('warns on the first drag, naming the pane label', async () => {
		const warn = warnSpy();
		render(PanePartsPanes, { props: { variant: 'drag-only' } });

		await commands.mouseMove(cameraHeader().selector);
		await commands.mouseDown();
		await commands.mouseMove(timeSeries().selector, RIGHT);
		await commands.mouseUp();

		expect(warn).toHaveBeenCalledWith(warningFor('Camera'));
	});

	it('warns for the dragged pane and no other', async () => {
		const warn = warnSpy();
		render(PanePartsPanes, { props: { variant: 'drag-only' } });

		await commands.mouseMove(cameraHeader().selector);
		await commands.mouseDown();
		await commands.mouseMove(timeSeries().selector, RIGHT);
		await commands.mouseUp();

		expect(warn).toHaveBeenCalledWith(warningFor('Camera'));
		expect(warn).not.toHaveBeenCalledWith(warningFor('Time series'));
	});

	it('does not warn again on a second drag from the same pane, even after it remounted', async () => {
		const warn = warnSpy();
		render(PanePartsPanes, { props: { variant: 'drag-only' } });
		await commands.mouseMove(cameraHeader().selector);
		await commands.mouseDown();
		await commands.mouseMove(timeSeries().selector, RIGHT);
		await commands.mouseUp();
		expect(warn, 'the first drag').toHaveBeenCalledTimes(1);

		await commands.mouseMove(cameraHeader().selector);
		await commands.mouseDown();
		await commands.mouseMove(sensor().selector, RIGHT);
		await commands.mouseUp();

		expect(warn, 'the second drag').toHaveBeenCalledTimes(1);
	});

	it('does not warn when the pane has a Panes.MoveTrigger', async () => {
		const warn = warnSpy();
		const { component } = render(PanePartsPanes, { props: { variant: 'header' } });

		await commands.mouseMove(cameraHeader().selector, { x: 10, y: 10 });
		await commands.mouseDown();
		await commands.mouseMove(timeSeries().selector, RIGHT);
		await commands.mouseUp();

		expect(component.getLayout()).not.toEqual(layoutRoot);
		expect(warn).not.toHaveBeenCalled();
	});

	it('does not warn when the Panes.MoveTrigger mounted and unmounted before the drag', async () => {
		const warn = warnSpy();
		const { component } = render(PanePartsPanes, { props: { variant: 'menu' } });
		await menuButton().click();
		await expect.element(cameraMenuItem()).toBeInTheDocument();
		await menuButton().click();
		await expect.element(cameraMenuItem()).not.toBeInTheDocument();

		await commands.mouseMove(cameraHeader().selector, { x: 10, y: 10 });
		await commands.mouseDown();
		await commands.mouseMove(timeSeries().selector, RIGHT);
		await commands.mouseUp();

		expect(component.getLayout()).not.toEqual(layoutRoot);
		expect(warn).not.toHaveBeenCalled();
	});
});

describe('Panes parts: a view that is not reorderable', () => {
	it('enters no move mode and reports no Panes.MoveTrigger as pressed when one is clicked', async () => {
		render(PanePartsPanes, { props: { variant: 'header', reorderable: false } });

		await cameraGrip().click();

		await expect.element(page.getByPanesInMoveMode()).not.toBeInTheDocument();
		await expect.element(cameraGrip()).toHaveAttribute('aria-pressed', 'false');
	});
});
