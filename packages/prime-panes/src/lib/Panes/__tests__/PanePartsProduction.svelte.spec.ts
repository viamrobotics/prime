import { describe, expect, it, onTestFinished, vi } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { commands, page } from 'vitest/browser';

import { ids } from '../../../../test/layouts.ts';
import PanePartsPanes from '../../../../test/fixtures/PanePartsPanes.svelte';

vi.mock('esm-env', () => ({ DEV: false, BROWSER: true }));

const CAMERA_RIGHT_OF_TIME_SERIES = {
	id: ids.innerSplit,
	first: { first: { id: ids.mytimeseries }, second: { id: ids.mycam } }
};

describe('Panes.MoveTrigger: a production build', () => {
	it('logs no warning when a pane with no Panes.MoveTrigger is dragged', async () => {
		const warn = vi.spyOn(console, 'warn').mockImplementation(() => undefined);
		onTestFinished(() => warn.mockRestore());
		const { component } = render(PanePartsPanes, { props: { variant: 'drag-only' } });

		await commands.mouseMove(page.getByPaneHeader('Camera').selector);
		await commands.mouseDown();
		await commands.mouseMove(page.getByPane(ids.mytimeseries).selector, { x: '90%', y: '50%' });
		await commands.mouseUp();

		expect(component.getLayout()).toMatchObject(CAMERA_RIGHT_OF_TIME_SERIES);
		expect(warn).not.toHaveBeenCalled();
	});
});
