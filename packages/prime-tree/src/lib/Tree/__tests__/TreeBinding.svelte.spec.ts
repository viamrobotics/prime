import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { page } from 'vitest/browser';

import BoundTree from '../../../../test/fixtures/BoundTree.svelte';
import ControlledTree from '../../../../test/fixtures/ControlledTree.svelte';

const itemOf = (name: string) => page.getByRole('treeitem', { name, exact: true });
const attempts = () => page.getByTestId('attempts');

describe('Tree binding', () => {
	it('expands a branch when expanded is assigned from outside', async () => {
		render(BoundTree);

		await page.getByRole('button', { name: 'Expand Docs' }).click();

		await expect.element(itemOf('Docs')).toHaveAttribute('aria-expanded', 'true');
		await expect.element(itemOf('Readme')).toBeVisible();
	});

	it('marks a row selected when selected is assigned from outside', async () => {
		render(BoundTree);

		await page.getByRole('button', { name: 'Select Notes' }).click();

		await expect.element(itemOf('Notes')).toHaveAttribute('aria-selected', 'true');
	});

	it('writes a user expansion back to the bound array', async () => {
		const screen = render(BoundTree);

		await itemOf('Docs').getByText('Docs').click();

		await expect.poll(() => screen.component.getExpanded()).toEqual(['docs']);
	});

	it('leaves a branch collapsed when the function binding refuses the expansion', async () => {
		const screen = render(ControlledTree, { allowExpand: false });

		await itemOf('Docs').getByText('>').first().click();

		await expect.element(attempts()).toHaveTextContent('1');
		await expect.element(itemOf('Docs')).toHaveAttribute('aria-expanded', 'false');
		expect(screen.component.getExpanded()).toEqual([]);
	});

	it('leaves a row unselected when the function binding refuses the selection', async () => {
		const screen = render(ControlledTree, { allowSelect: false });

		await itemOf('Notes').click();

		await expect.element(attempts()).toHaveTextContent('1');
		await expect.element(itemOf('Notes')).toHaveAttribute('aria-selected', 'false');
		expect(screen.component.getSelected()).toEqual([]);
	});

	it('expands a branch when the function binding accepts the expansion', async () => {
		const screen = render(ControlledTree, { allowExpand: true });

		await itemOf('Docs').getByText('Docs').click();

		await expect.element(itemOf('Docs')).toHaveAttribute('aria-expanded', 'true');
		expect(screen.component.getExpanded()).toEqual(['docs']);
	});
});
