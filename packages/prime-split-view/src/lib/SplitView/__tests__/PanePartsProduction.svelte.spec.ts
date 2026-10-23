import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { page, userEvent } from 'vitest/browser';

import { ids } from '../../__tests__/layout-fixture.ts';
import PanePartsSplitView from './PanePartsSplitView.svelte';

vi.mock('esm-env', () => ({ DEV: false, BROWSER: true }));

const WIDE_VIEWPORT = { width: 1000, height: 1400 };
const DEFAULT_VIEWPORT = { width: 414, height: 896 };

beforeAll(() => page.viewport(WIDE_VIEWPORT.width, WIDE_VIEWPORT.height));

afterAll(() => page.viewport(DEFAULT_VIEWPORT.width, DEFAULT_VIEWPORT.height));

describe('SplitView.MoveTrigger: a production build', () => {
	it('logs no warning when a pane with no SplitView.MoveTrigger is dragged', async () => {
		const warn = vi.spyOn(console, 'warn').mockImplementation(() => undefined);
		const { container } = render(PanePartsSplitView, { props: { variant: 'drag-only' } });
		const target = container.querySelector<HTMLElement>(`[data-pane-id="${ids.mytimeseries}"]`)!;
		const rect = target.getBoundingClientRect();

		await userEvent.dragAndDrop(
			container.querySelector<HTMLElement>('[data-header-text="Camera"]')!,
			target,
			{ targetPosition: { x: rect.width * 0.9, y: rect.height * 0.5 } }
		);

		expect(warn).not.toHaveBeenCalled();
	});
});
