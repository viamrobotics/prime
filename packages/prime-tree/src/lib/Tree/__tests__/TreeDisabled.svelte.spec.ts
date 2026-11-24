import type { ComponentProps } from 'svelte';
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { page, userEvent } from 'vitest/browser';

import DisabledTree from '../../../../test/fixtures/DisabledTree.svelte';
import { bareTreeProps } from '../../../../test/tree-props.ts';
import type TreeRoot from '../Tree.svelte';

const itemOf = (name: string) => page.getByRole('treeitem', { name, exact: true });

describe('Tree with isDisabled on a node type without a disabled field', () => {
	it('rejects an isNodeDisabled prop in its type', async () => {
		const named = { ...bareTreeProps, 'aria-label': 'Stale' };
		// @ts-expect-error isNodeDisabled is not a Tree prop
		const stale: ComponentProps<typeof TreeRoot> = { ...named, isNodeDisabled: String };
		render(DisabledTree);

		expect(stale.nodes).toEqual([]);
		await expect.element(itemOf('Bravo')).toHaveAttribute('aria-disabled', 'true');
	});

	it('marks the node aria-disabled', async () => {
		render(DisabledTree);

		await expect.element(itemOf('Bravo')).toHaveAttribute('aria-disabled', 'true');
	});

	it('passes disabled to the node snippet state', async () => {
		render(DisabledTree);

		await expect.element(itemOf('Bravo')).toHaveAttribute('data-state-disabled', 'true');
	});

	it('does not select the node on click', async () => {
		const screen = render(DisabledTree);

		await itemOf('Bravo').click({ force: true });

		expect(screen.component.getSelected()).toEqual([]);
	});

	it('does not expand the branch on a control click', async () => {
		const screen = render(DisabledTree);

		await itemOf('Charlie').getByText('Charlie').click({ force: true });

		expect(screen.component.getExpanded()).toEqual([]);
	});
});

describe('Tree interaction with a node disabled through isDisabled', () => {
	it('marks the focusable control of a disabled branch aria-disabled', async () => {
		render(DisabledTree);

		await expect
			.element(itemOf('Charlie').getByRole('button').first())
			.toHaveAttribute('aria-disabled', 'true');
	});

	it('keeps the selection when a disabled leaf is clicked', async () => {
		const screen = render(DisabledTree);
		await itemOf('Alpha').click();
		await expect.poll(() => screen.component.getSelected()).toEqual(['alpha']);

		await itemOf('Bravo').click({ force: true });

		expect(screen.component.getSelected()).toEqual(['alpha']);
	});

	it.each([
		{ key: 'Enter', keys: '{Enter}' },
		{ key: 'Space', keys: ' ' }
	])('keeps the selection when $key lands on a focused disabled leaf', async ({ keys }) => {
		const screen = render(DisabledTree);
		await itemOf('Alpha').click();
		await expect.poll(() => screen.component.getSelected()).toEqual(['alpha']);
		(itemOf('Bravo').element() as HTMLElement).focus();
		await expect.element(itemOf('Bravo')).toHaveFocus();

		await userEvent.keyboard(keys);

		expect(screen.component.getSelected()).toEqual(['alpha']);
	});

	it('does not expand a disabled branch on a trigger click', async () => {
		const screen = render(DisabledTree);

		await page.getByRole('button', { name: 'Toggle Charlie', exact: true }).click({ force: true });

		expect(screen.component.getExpanded()).toEqual([]);
	});

	it('does not expand a focused disabled branch on ArrowRight', async () => {
		const screen = render(DisabledTree);
		const control = itemOf('Charlie').getByRole('button').first();
		(control.element() as HTMLElement).focus();
		await expect.element(control).toHaveFocus();

		await userEvent.keyboard('{ArrowRight}');

		expect(screen.component.getExpanded()).toEqual([]);
	});

	it('leaves a disabled sibling branch collapsed on *', async () => {
		const screen = render(DisabledTree);
		await itemOf('Alpha').click();

		await userEvent.keyboard('*');

		expect(screen.component.getExpanded()).toEqual([]);
	});

	it('selects no disabled node on Control+A in multiple mode', async () => {
		const screen = render(DisabledTree, { selectionMode: 'multiple' });
		await itemOf('Alpha').click();

		await userEvent.keyboard('{Control>}a{/Control}');

		await expect.poll(() => screen.component.getSelected().toSorted()).toEqual(['alpha', 'child']);
	});
});
