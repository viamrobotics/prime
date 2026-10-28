import { describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { commands, page } from 'vitest/browser';

import { ids, layoutRoot } from '../../../../test/layouts.ts';
import PanePartsPanes from '../../../../test/fixtures/PanePartsPanes.svelte';

vi.mock('esm-env', () => ({ DEV: false, BROWSER: true }));

describe('Panes.MoveTrigger: a production build', () => {
	it('logs no warning when a pane with no Panes.MoveTrigger is dragged', async () => {
		const warn = vi.spyOn(console, 'warn').mockImplementation(() => undefined);
		const { component } = render(PanePartsPanes, { props: { variant: 'drag-only' } });

		await commands.mouseMove(page.getByPaneHeader('Camera').selector);
		await commands.mouseDown();
		await commands.mouseMove(page.getByPane(ids.mytimeseries).selector, { x: '90%', y: '50%' });
		await commands.mouseUp();

		expect(component.getLayout()).not.toEqual(layoutRoot);
		expect(warn).not.toHaveBeenCalled();
	});
});
