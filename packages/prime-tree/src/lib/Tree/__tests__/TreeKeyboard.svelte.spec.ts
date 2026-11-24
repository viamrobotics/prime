import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { page, userEvent } from 'vitest/browser';

import BasicTree from '../../../../test/fixtures/BasicTree.svelte';
import KeyboardTree from '../../../../test/fixtures/KeyboardTree.svelte';
import SelectionTree from '../../../../test/fixtures/SelectionTree.svelte';

const itemOf = (name: string) => page.getByRole('treeitem', { name, exact: true });
const controlOf = (name: string) => itemOf(name).getByRole('button').first();

const tabStopsInTree = () =>
	[...document.querySelectorAll<HTMLElement>('[role="tree"] [tabindex="0"]')].map(
		(row) => row.dataset.value
	);

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

	it('expands a collapsed branch on ArrowRight', async () => {
		await renderFocusedOnDocs();

		await userEvent.keyboard('{ArrowRight}');

		await expect.element(itemOf('Readme')).toBeVisible();
	});

	it('keeps focus on a collapsed branch that ArrowRight expands', async () => {
		await renderFocusedOnDocs();

		await userEvent.keyboard('{ArrowRight}');

		await expect.element(itemOf('Readme')).toBeVisible();
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

	it.each([
		{ key: 'Enter', keys: '{Enter}' },
		{ key: 'Space', keys: ' ' }
	])('selects the focused leaf on $key', async ({ keys }) => {
		const screen = await renderFocusedOnDocs();
		await userEvent.keyboard('{End}');

		await userEvent.keyboard(keys);

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

	it('extends the selection to the previous row on Shift+ArrowUp in multiple mode', async () => {
		const screen = await renderFocusedOnDocs('multiple');
		await userEvent.keyboard('{End}{Enter}');
		await expect.poll(() => screen.component.getSelected()).toEqual(['notes']);

		await userEvent.keyboard('{Shift>}{ArrowUp}{/Shift}');

		await expect.poll(() => screen.component.getSelected()).toEqual(['notes', 'zoo']);
	});

	it('skips a disabled row when Shift+ArrowUp extends the selection in multiple mode', async () => {
		const screen = render(SelectionTree, { selectionMode: 'multiple' });
		await itemOf('Notes').click();
		await expect.element(itemOf('Notes')).toHaveFocus();

		await userEvent.keyboard('{Shift>}{ArrowUp}{/Shift}');

		await expect.poll(() => screen.component.getSelected()).toEqual(['notes', 'empty']);
	});

	it('leaves a disabled row out of the range Shift+End selects in multiple mode', async () => {
		const screen = render(SelectionTree, { selectionMode: 'multiple', branchClick: 'select' });
		await itemOf('Docs').getByText('Docs').click();
		await expect.poll(() => screen.component.getSelected()).toEqual(['docs']);

		await userEvent.keyboard('{Shift>}{End}{/Shift}');

		await expect
			.poll(() => screen.component.getSelected().toSorted())
			.toEqual(['docs', 'empty', 'notes']);
	});

	it.each(['Control', 'Meta'])(
		'selects every enabled node, collapsed ones included, on %s+A in multiple mode',
		async (modifier) => {
			const screen = render(SelectionTree, { selectionMode: 'multiple' });
			await itemOf('Notes').click();

			await userEvent.keyboard(`{${modifier}>}a{/${modifier}}`);

			await expect
				.poll(() => screen.component.getSelected().toSorted())
				.toEqual(['advanced', 'docs', 'empty', 'guides', 'intro', 'notes', 'readme']);
		}
	);

	it.each(['Control', 'Meta'])('selects nothing new on %s+A in single mode', async (modifier) => {
		const screen = render(SelectionTree, { selectionMode: 'single' });
		await itemOf('Notes').click();
		await expect.poll(() => screen.component.getSelected()).toEqual(['notes']);

		await userEvent.keyboard(`{${modifier}>}a{/${modifier}}`);

		await expect.element(itemOf('Notes')).toHaveFocus();
		expect(screen.component.getSelected()).toEqual(['notes']);
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

	it('gives exactly one row of the tree tabindex 0', async () => {
		render(KeyboardTree);

		await expect.poll(() => tabStopsInTree()).toEqual(['docs']);
	});

	it('moves tabindex 0 to the row ArrowDown focuses', async () => {
		await renderFocusedOnDocs();

		await userEvent.keyboard('{ArrowDown}');

		await expect.poll(() => tabStopsInTree()).toEqual(['apps']);
	});

	it('puts the tab stop on the first row before the tree takes focus', async () => {
		render(BasicTree);
		(page.getByRole('button', { name: 'Append to Docs' }).element() as HTMLElement).focus();

		await userEvent.tab();

		await expect.element(itemOf('Docs').getByRole('button').first()).toHaveFocus();
	});
});
