import { getContext, setContext } from 'svelte';

import type { TabsMove } from './move.ts';

const TABS_TRIGGER_KEY = Symbol('TabsTrigger');

export interface TabsTriggerContext {
	readonly move: TabsMove;
	// The id of the span holding the tab's visible label, which names the tab's own controls.
	readonly labelId: string;
}

export const provideTabsTrigger = (context: TabsTriggerContext): TabsTriggerContext =>
	setContext<TabsTriggerContext>(TABS_TRIGGER_KEY, context);

export const useTabsTrigger = (): TabsTriggerContext | undefined =>
	getContext<TabsTriggerContext | undefined>(TABS_TRIGGER_KEY);
