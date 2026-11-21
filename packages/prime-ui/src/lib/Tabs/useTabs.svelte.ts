import { getContext, setContext, untrack } from 'svelte';

import type { TabsVariant } from './variant.ts';

const key = Symbol('Tabs');

interface TabsOptions {
	value: () => string | undefined;
	variant: () => TabsVariant;
}

export interface TabsContext {
	// The bound value while its tab exists, otherwise the first tab's.
	readonly value: string | undefined;
	readonly variant: TabsVariant;
	// In mount order, which is the order a list with an unset `order` starts from.
	readonly triggers: readonly string[];
	register: (value: string) => () => void;
	registerPanel: (value: string) => () => void;
}

const createRegistry = () => {
	let values = $state<string[]>([]);
	return {
		get values() {
			return values;
		},
		add: (value: string) => {
			untrack(() => (values = [...values, value]));
			return () => {
				values = values.filter((existing) => existing !== value);
			};
		}
	};
};

export const provideTabs = (options: TabsOptions): TabsContext => {
	const triggers = createRegistry();
	const panels = createRegistry();

	// A strip hidden behind the consumer's `{#if}` mounts no trigger, so the panels decide then.
	const selected = $derived.by(() => {
		const candidates = triggers.values.length > 0 ? triggers.values : panels.values;
		const bound = options.value();
		return bound !== undefined && candidates.includes(bound) ? bound : candidates[0];
	});

	return setContext<TabsContext>(key, {
		get value() {
			return selected;
		},
		get variant() {
			return options.variant();
		},
		get triggers() {
			return triggers.values;
		},
		register: triggers.add,
		registerPanel: panels.add
	});
};

export const useTabs = (): TabsContext | undefined => getContext<TabsContext | undefined>(key);
