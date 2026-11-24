import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { page, userEvent } from 'vitest/browser';

import IsNodeDisabledTree from '../../../../test/fixtures/IsNodeDisabledTree.svelte';

const itemOf = (name: string) => page.getByRole('treeitem', { name, exact: true });

describe('Tree with isNodeDisabled on a node type without a disabled field', () => {
	it('marks the node aria-disabled', async () => {
		render(IsNodeDisabledTree);

		await expect.element(itemOf('Bravo')).toHaveAttribute('aria-disabled', 'true');
	});

	it('passes disabled to the node snippet state', async () => {
		render(IsNodeDisabledTree);

		await expect.element(itemOf('Bravo')).toHaveAttribute('data-state-disabled', 'true');
	});

	it('does not select the node on click', async () => {
		const screen = render(IsNodeDisabledTree);

		await itemOf('Bravo').click({ force: true });

		expect(screen.component.getSelected()).toEqual([]);
	});

	it('does not expand the branch on a control click', async () => {
		const screen = render(IsNodeDisabledTree);

		await itemOf('Charlie').getByText('Charlie').click({ force: true });

		expect(screen.component.getExpanded()).toEqual([]);
	});
});

describe('Tree interaction with a node disabled through isNodeDisabled', () => {
	it('marks the focusable control of a disabled branch aria-disabled', async () => {
		render(IsNodeDisabledTree);

		await expect
			.element(itemOf('Charlie').getByRole('button').first())
			.toHaveAttribute('aria-disabled', 'true');
	});

	it('keeps the selection when a disabled leaf is clicked', async () => {
		const screen = render(IsNodeDisabledTree);
		await itemOf('Alpha').click();
		await expect.poll(() => screen.component.getSelected()).toEqual(['alpha']);

		await itemOf('Bravo').click({ force: true });

		expect(screen.component.getSelected()).toEqual(['alpha']);
	});

	it.each([
		{ key: 'Enter', keys: '{Enter}' },
		{ key: 'Space', keys: ' ' }
	])('keeps the selection when $key lands on a focused disabled leaf', async ({ keys }) => {
		const screen = render(IsNodeDisabledTree);
		await itemOf('Alpha').click();
		await expect.poll(() => screen.component.getSelected()).toEqual(['alpha']);
		(itemOf('Bravo').element() as HTMLElement).focus();
		await expect.element(itemOf('Bravo')).toHaveFocus();

		await userEvent.keyboard(keys);

		expect(screen.component.getSelected()).toEqual(['alpha']);
	});

	it('does not expand a disabled branch on a trigger click', async () => {
		const screen = render(IsNodeDisabledTree);

		await page.getByRole('button', { name: 'Toggle Charlie', exact: true }).click({ force: true });

		expect(screen.component.getExpanded()).toEqual([]);
	});

	it('does not expand a focused disabled branch on ArrowRight', async () => {
		const screen = render(IsNodeDisabledTree);
		const control = itemOf('Charlie').getByRole('button').first();
		(control.element() as HTMLElement).focus();
		await expect.element(control).toHaveFocus();

		await userEvent.keyboard('{ArrowRight}');

		expect(screen.component.getExpanded()).toEqual([]);
	});

	it('leaves a disabled sibling branch collapsed on *', async () => {
		const screen = render(IsNodeDisabledTree);
		await itemOf('Alpha').click();

		await userEvent.keyboard('*');

		expect(screen.component.getExpanded()).toEqual([]);
	});

	it('selects no disabled node on Control+A in multiple mode', async () => {
		const screen = render(IsNodeDisabledTree, { selectionMode: 'multiple' });
		await itemOf('Alpha').click();

		await userEvent.keyboard('{Control>}a{/Control}');

		await expect.poll(() => screen.component.getSelected().toSorted()).toEqual(['alpha', 'child']);
	});
});
