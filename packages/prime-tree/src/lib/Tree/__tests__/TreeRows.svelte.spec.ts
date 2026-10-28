import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { page, userEvent } from 'vitest/browser';

import CustomRowsTree from '../../../../test/fixtures/CustomRowsTree.svelte';

const itemOf = (name: string) => page.getByRole('treeitem', { name, exact: true });

describe('Tree custom rows', () => {
	it('renders the root rows through the children snippet', async () => {
		render(CustomRowsTree);

		await expect
			.poll(
				() =>
					document.querySelectorAll('[data-testid="root-rows"] [role="treeitem"][aria-level="1"]')
						.length
			)
			.toBe(4);
	});

	it('renders a branch through its children snippet in the order the snippet chose', async () => {
		render(CustomRowsTree);

		const rows = page.getByTestId('rows-docs').getByRole('treeitem');
		await expect.element(rows.first()).toHaveAccessibleName('Guides');
		await expect.element(rows.last()).toHaveAccessibleName('Readme');
	});

	it('keeps the ARIA position of a row placed by Tree.Row', async () => {
		render(CustomRowsTree);

		await expect.element(itemOf('Readme')).toHaveAttribute('aria-level', '2');
		await expect.element(itemOf('Readme')).toHaveAttribute('aria-posinset', '1');
		await expect.element(itemOf('Readme')).toHaveAttribute('aria-setsize', '2');
	});

	it('moves focus into custom rows with Arrow Down', async () => {
		render(CustomRowsTree);
		(
			document.querySelector('[data-part="branch-control"][data-value="docs"]') as HTMLElement
		).focus();

		await userEvent.keyboard('{ArrowDown}');

		await expect.element(itemOf('Readme')).toHaveFocus();
	});

	it('shows the snippet placeholder for a branch with no children', async () => {
		render(CustomRowsTree);

		await itemOf('Empty').getByText('>').first().click();

		await expect.element(page.getByTestId('placeholder-empty')).toHaveTextContent('Nothing here');
	});

	it('hides the indent guide from assistive technology and marks its depth', async () => {
		render(CustomRowsTree);

		await expect.element(page.getByTestId('guide-docs')).toHaveAttribute('aria-hidden', 'true');
		await expect.element(page.getByTestId('guide-docs')).toHaveAttribute('data-depth', '1');
	});
});
