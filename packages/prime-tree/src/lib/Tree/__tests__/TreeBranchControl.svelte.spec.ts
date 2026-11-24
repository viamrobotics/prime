import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { page, userEvent } from 'vitest/browser';

import BasicTree from '../../../../test/fixtures/BasicTree.svelte';

const controlOf = (name: string) =>
	page.getByRole('treeitem', { name, exact: true }).getByRole('button').first();

describe('Tree.BranchControl', () => {
	it('states a collapsed branch on the focusable control', async () => {
		render(BasicTree);

		await expect.element(controlOf('Docs')).toHaveAttribute('aria-expanded', 'false');
	});

	it('states an expanded branch on the focusable control', async () => {
		render(BasicTree);

		await controlOf('Docs').click();

		await expect.element(controlOf('Docs')).toHaveAttribute('aria-expanded', 'true');
	});

	it('follows the keyboard when ArrowLeft collapses the branch', async () => {
		render(BasicTree, { initialExpanded: ['docs'] });
		(controlOf('Docs').element() as HTMLElement).focus();

		await userEvent.keyboard('{ArrowLeft}');

		await expect.element(controlOf('Docs')).toHaveAttribute('aria-expanded', 'false');
	});
});
