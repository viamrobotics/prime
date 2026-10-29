import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { page, userEvent } from 'vitest/browser';

import KeyboardTree from '../../../../test/fixtures/KeyboardTree.svelte';

const itemOf = (name: string) => page.getByRole('treeitem', { name, exact: true });
const controlOf = (name: string) => itemOf(name).getByRole('button').first();

const renderFocusedOnDocs = async (selectionMode?: 'single' | 'multiple') => {
	const screen = render(KeyboardTree, { selectionMode });
	(controlOf('Docs').element() as HTMLElement).focus();
	await expect.element(controlOf('Docs')).toHaveFocus();
	return screen;
};

const expandDocs = async () => {
	await userEvent.keyboard('{ArrowRight}');
	await expect.element(itemOf('Docs')).toHaveAttribute('aria-expanded', 'true');
};

describe('Tree keyboard', () => {
	it('moves focus to the next visible row on ArrowDown, skipping collapsed children', async () => {
		await renderFocusedOnDocs();

		await userEvent.keyboard('{ArrowDown}');

		await expect.element(controlOf('Apps')).toHaveFocus();
	});

	it('moves focus to the previous visible row on ArrowUp', async () => {
		await renderFocusedOnDocs();
		await userEvent.keyboard('{ArrowDown}');

		await userEvent.keyboard('{ArrowUp}');

		await expect.element(controlOf('Docs')).toHaveFocus();
	});

	it('enters an expanded branch on ArrowDown', async () => {
		await renderFocusedOnDocs();
		await expandDocs();

		await userEvent.keyboard('{ArrowDown}');

		await expect.element(itemOf('Readme')).toHaveFocus();
	});

	it('expands a collapsed branch on ArrowRight and keeps focus on it', async () => {
		await renderFocusedOnDocs();

		await userEvent.keyboard('{ArrowRight}');

		await expect.element(itemOf('Docs')).toHaveAttribute('aria-expanded', 'true');
		await expect.element(controlOf('Docs')).toHaveFocus();
	});

	it('moves focus to the first child on ArrowRight over an expanded branch', async () => {
		await renderFocusedOnDocs();
		await expandDocs();

		await userEvent.keyboard('{ArrowRight}');

		await expect.element(itemOf('Readme')).toHaveFocus();
	});

	it('collapses an expanded branch on ArrowLeft', async () => {
		await renderFocusedOnDocs();
		await expandDocs();

		await userEvent.keyboard('{ArrowLeft}');

		await expect.element(itemOf('Docs')).toHaveAttribute('aria-expanded', 'false');
		await expect.element(itemOf('Readme')).not.toBeInTheDocument();
	});

	it('moves focus to the parent on ArrowLeft over a leaf', async () => {
		await renderFocusedOnDocs();
		await expandDocs();
		await userEvent.keyboard('{ArrowDown}');
		await expect.element(itemOf('Readme')).toHaveFocus();

		await userEvent.keyboard('{ArrowLeft}');

		await expect.element(controlOf('Docs')).toHaveFocus();
	});

	it('moves focus to the parent on ArrowLeft over a collapsed branch', async () => {
		await renderFocusedOnDocs();
		await expandDocs();
		await userEvent.keyboard('{ArrowDown}{ArrowDown}');
		await expect.element(controlOf('Guides')).toHaveFocus();

		await userEvent.keyboard('{ArrowLeft}');

		await expect.element(controlOf('Docs')).toHaveFocus();
	});

	it('moves focus to the last visible row on End', async () => {
		await renderFocusedOnDocs();

		await userEvent.keyboard('{End}');

		await expect.element(itemOf('Notes')).toHaveFocus();
	});

	it('moves focus to the first visible row on Home', async () => {
		await renderFocusedOnDocs();
		await userEvent.keyboard('{End}');
		await expect.element(itemOf('Notes')).toHaveFocus();

		await userEvent.keyboard('{Home}');

		await expect.element(controlOf('Docs')).toHaveFocus();
	});

	it('selects the focused row on Enter', async () => {
		const screen = await renderFocusedOnDocs();
		await userEvent.keyboard('{End}');

		await userEvent.keyboard('{Enter}');

		await expect.element(itemOf('Notes')).toHaveAttribute('aria-selected', 'true');
		await expect.poll(() => screen.component.getSelected()).toEqual(['notes']);
	});

	it('selects the focused row on Space', async () => {
		const screen = await renderFocusedOnDocs();
		await userEvent.keyboard('{End}');

		await userEvent.keyboard(' ');

		await expect.element(itemOf('Notes')).toHaveAttribute('aria-selected', 'true');
		await expect.poll(() => screen.component.getSelected()).toEqual(['notes']);
	});

	it('extends the selection to the next row on Shift+ArrowDown in multiple mode', async () => {
		const screen = await renderFocusedOnDocs('multiple');
		await expandDocs();
		await userEvent.keyboard('{ArrowDown}{Enter}');
		await expect.poll(() => screen.component.getSelected()).toEqual(['readme']);

		await userEvent.keyboard('{Shift>}{ArrowDown}{/Shift}');

		await expect.poll(() => screen.component.getSelected()).toEqual(['readme', 'guides']);
	});

	it('expands every sibling branch on *', async () => {
		const screen = await renderFocusedOnDocs();

		await userEvent.keyboard('*');

		await expect
			.poll(() => [...screen.component.getExpanded()].sort())
			.toEqual(['apps', 'docs', 'zoo']);
		await expect.element(itemOf('Zebra')).toBeVisible();
	});

	it('moves focus to the next row whose text starts with the typed character', async () => {
		await renderFocusedOnDocs();

		await userEvent.keyboard('n');

		await expect.element(itemOf('Notes')).toHaveFocus();
	});

	it('gives exactly one row tabindex 0 and moves it with focus on ArrowDown', async () => {
		await renderFocusedOnDocs();

		await userEvent.keyboard('{ArrowDown}');

		await expect.element(controlOf('Apps')).toHaveAttribute('tabindex', '0');
		await expect.element(controlOf('Docs')).toHaveAttribute('tabindex', '-1');
		await expect
			.poll(() => document.querySelectorAll('[role="tree"] [tabindex="0"]').length)
			.toBe(1);
	});
});
