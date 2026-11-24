import { describe, expect, it } from 'vitest';
import type { ComponentProps } from 'svelte';

import type MoveTrigger from '../MoveTrigger.svelte';
import type TabList from '../TabList.svelte';

describe('required accessible names', () => {
	it('rejects an unnamed Panes.TabList and accepts a named one', () => {
		// @ts-expect-error a name is required
		const unnamed: ComponentProps<typeof TabList<unknown>> = {};
		const named: ComponentProps<typeof TabList<unknown>> = { 'aria-label': 'Tabs' };
		const labelledBy: ComponentProps<typeof TabList<unknown>> = { 'aria-labelledby': 'heading' };

		expect([unnamed, named, labelledBy]).toHaveLength(3);
	});

	it('rejects an unnamed Panes.MoveTrigger and accepts a named one', () => {
		// @ts-expect-error a name is required
		const unnamed: ComponentProps<typeof MoveTrigger> = {};
		const named: ComponentProps<typeof MoveTrigger> = { 'aria-label': 'Move pane' };
		const labelledBy: ComponentProps<typeof MoveTrigger> = { 'aria-labelledby': 'heading' };

		expect([unnamed, named, labelledBy]).toHaveLength(3);
	});
});
