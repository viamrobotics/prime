import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { page } from 'vitest/browser';

import EmptyingPanes from '../../../../test/fixtures/EmptyingPanes.svelte';

describe('Panes empty state', () => {
	it('renders the empty snippet and no pane when the owner clears the layout', async () => {
		render(EmptyingPanes);
		await expect.poll(() => page.getByTestId('pane').elements()).toHaveLength(4);

		await page.getByRole('button', { name: 'Clear layout' }).click();

		await expect.element(page.getByTestId('empty')).toHaveTextContent('No panes');
		await expect.poll(() => page.getByTestId('pane').elements()).toHaveLength(0);
	});

	it('renders only the status region in the root when there is no empty snippet', async () => {
		render(EmptyingPanes, { props: { withEmpty: false } });

		await page.getByRole('button', { name: 'Clear layout' }).click();

		await expect.poll(() => page.getByTestId('pane').elements()).toHaveLength(0);
		const rootChildren = [...page.getByTestId('root').element().children];
		expect(rootChildren.map((child) => child.getAttribute('role'))).toEqual(['status']);
	});
});
