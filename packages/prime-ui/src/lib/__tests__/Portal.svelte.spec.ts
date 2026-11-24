import { afterEach, describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { userEvent } from 'vitest/browser';

import type { PortalTarget } from '../portal.ts';

import PortalPanel, { PANEL_KINDS, type PanelKind } from './fixtures/PortalPanel.svelte';

const TARGET_SELECTOR = '[data-testid="target"]';
const OPENED_BY_PRESS: ReadonlySet<PanelKind> = new Set(['context-menu', 'menubar', 'select']);

const panel = () => document.querySelector<HTMLElement>('[data-testid="panel"]');

const openPanel = async (kind: PanelKind, portal?: PortalTarget) => {
	const { container } = render(PortalPanel, { kind, portal });
	if (OPENED_BY_PRESS.has(kind)) {
		const opener = container.querySelector<HTMLElement>('[data-testid="opener"]')!;
		await userEvent.click(opener, kind === 'context-menu' ? { button: 'right' } : undefined);
	}
	await vi.waitFor(() => expect(panel()).toBeTruthy());
	return {
		host: container.querySelector('[data-testid="host"]')!,
		target: container.querySelector(TARGET_SELECTOR)!
	};
};

afterEach(async () => {
	if (panel()) await userEvent.keyboard('{Escape}');
});

describe.each(PANEL_KINDS)('the %s panel', (kind) => {
	it('moves out of its parent by default', async () => {
		const { host, target } = await openPanel(kind);

		expect(host.contains(panel()), 'panel is inside its parent').toBe(false);
		expect(target.contains(panel()), 'panel is inside the selector target').toBe(false);
	});

	it('stays inside its parent when portal is false', async () => {
		const { host } = await openPanel(kind, false);

		expect(host.contains(panel()), 'panel is inside its parent').toBe(true);
	});

	it('moves into the element a selector names', async () => {
		const { host, target } = await openPanel(kind, TARGET_SELECTOR);

		expect(target.contains(panel()), 'panel is inside the selector target').toBe(true);
		expect(host.contains(panel()), 'panel is inside its parent').toBe(false);
	});
});
