import { describe, expect, it, onTestFinished } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { commands, page, userEvent } from 'vitest/browser';

import NestedPanes from '../../../../test/fixtures/NestedPanes.svelte';

const outerRoot = () => page.getByTestId('outer-root');
const innerRoot = () => page.getByTestId('inner-root');
const grip = (id: string) => page.getByRole('button', { name: `Move ${id}`, exact: true });
const content = (id: string) => page.getByPaneContent(id);
const status = (rootTestId: string) => page.getByRootStatus(rootTestId);
const statusText = (rootTestId: string) => status(rootTestId).element().textContent;

const CENTER = { x: '50%', y: '50%' } as const;
const PLAIN_AREA = { x: '50%', y: '30%' } as const;
const OUTER_B_AREA = { x: '50%', y: '50%' } as const;

const pressAndMoveTo = async (
	from: { selector: string },
	fromAt: { x: number | `${number}%`; y: number | `${number}%` },
	to: { selector: string },
	toAt: { x: number | `${number}%`; y: number | `${number}%` }
) => {
	onTestFinished(() => commands.mouseUp());
	await commands.mouseMove(from.selector, fromAt);
	await commands.mouseDown();
	await commands.mouseMove(to.selector, toAt);
};

const startMoveWithKeyboard = async (id: string) => {
	grip(id).element().focus();
	await userEvent.keyboard('{Enter}');
};

describe('nested Panes roots: drag isolation', () => {
	it('keeps data-dragging off the outer root while an inner trigger drags', async () => {
		render(NestedPanes);

		await pressAndMoveTo(grip('inner-a'), CENTER, content('inner-b'), CENTER);

		await expect.element(innerRoot()).toHaveAttribute('data-dragging');
		await expect.element(outerRoot()).not.toHaveAttribute('data-dragging');
		await commands.mouseUp();
	});

	it('changes the inner layout and leaves the outer layout unchanged when an inner trigger drag drops on another inner pane', async () => {
		const { component } = render(NestedPanes);
		const outerBefore = component.getOuterLayout();
		const innerBefore = component.getInnerLayout();

		await pressAndMoveTo(grip('inner-a'), CENTER, content('inner-b'), CENTER);
		await commands.mouseUp();

		await expect.poll(() => component.getInnerLayout()).not.toEqual(innerBefore);
		expect(component.getOuterLayout()).toEqual(outerBefore);
	});

	it('keeps data-dragging off the outer root when a press and move starts on an inner pane plain area', async () => {
		render(NestedPanes);

		await pressAndMoveTo(content('inner-a'), PLAIN_AREA, content('outer-b'), OUTER_B_AREA);

		await expect.element(outerRoot()).not.toHaveAttribute('data-dragging');
		await commands.mouseUp();
	});

	it('leaves the outer layout unchanged when a press on an inner pane plain area is released over another outer pane', async () => {
		const { component } = render(NestedPanes);
		const outerBefore = component.getOuterLayout();

		await pressAndMoveTo(content('inner-a'), PLAIN_AREA, content('outer-b'), OUTER_B_AREA);
		await commands.mouseUp();

		expect(component.getOuterLayout()).toEqual(outerBefore);
	});

	it('keeps data-dragging off the inner root and the inner layout unchanged when the outer pane holding it drags', async () => {
		const { component } = render(NestedPanes);
		const innerBefore = component.getInnerLayout();

		await pressAndMoveTo(grip('outer-a'), CENTER, content('outer-b'), OUTER_B_AREA);
		await expect.element(outerRoot()).toHaveAttribute('data-dragging');
		await expect.element(innerRoot()).not.toHaveAttribute('data-dragging');
		await commands.mouseUp();

		await expect.poll(() => component.getOuterLayout()).toMatchObject({ first: { id: 'outer-b' } });
		expect(component.getInnerLayout()).toEqual(innerBefore);
	});
});

describe('nested Panes roots: focus isolation', () => {
	it('ends outer move mode when a click moves focus to an inner control', async () => {
		render(NestedPanes);
		await startMoveWithKeyboard('outer-a');
		await expect.element(outerRoot()).toHaveAttribute('data-move-mode');

		await userEvent.click(grip('inner-a'));

		await expect.element(outerRoot()).not.toHaveAttribute('data-move-mode');
	});

	it('ends outer move mode when focus moves into the inner root', async () => {
		render(NestedPanes);
		await startMoveWithKeyboard('outer-a');
		await expect.element(outerRoot()).toHaveAttribute('data-move-mode');

		grip('inner-a').element().focus();

		await expect.element(outerRoot()).not.toHaveAttribute('data-move-mode');
	});
});

describe('nested Panes roots: move mode isolation', () => {
	it('keeps data-move-mode off the outer root during inner move mode', async () => {
		render(NestedPanes);

		await startMoveWithKeyboard('inner-a');

		await expect.element(innerRoot()).toHaveAttribute('data-move-mode');
		await expect.element(outerRoot()).not.toHaveAttribute('data-move-mode');
	});

	it('keeps data-move-mode off the inner root during outer move mode', async () => {
		render(NestedPanes);

		await startMoveWithKeyboard('outer-b');

		await expect.element(outerRoot()).toHaveAttribute('data-move-mode');
		await expect.element(innerRoot()).not.toHaveAttribute('data-move-mode');
	});
});

describe('nested Panes roots: announcements', () => {
	it('announces a move completed in the inner root in the inner status only', async () => {
		const { component } = render(NestedPanes);
		const innerBefore = component.getInnerLayout();
		const outerStatusBefore = statusText('outer-root');
		await startMoveWithKeyboard('inner-a');
		await userEvent.keyboard('{Tab}{Tab}');

		await userEvent.keyboard('{Enter}');

		await expect.poll(() => component.getInnerLayout()).not.toEqual(innerBefore);
		expect(statusText('inner-root')).not.toBe('');
		expect(statusText('outer-root')).toBe(outerStatusBefore);
	});
});
