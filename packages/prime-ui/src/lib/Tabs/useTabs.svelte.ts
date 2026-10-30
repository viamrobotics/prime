import { getContext, setContext, untrack } from 'svelte';

const key = Symbol('Tabs');

interface TabsOptions {
	value: () => string | undefined;
}

/** What a `Tabs` root shares with the parts inside it. */
export interface TabsContext {
	/** The selected tab's value: the bound value while its tab exists, otherwise the first tab's. */
	readonly value: string | undefined;
	/** Register a trigger's value, in mount order. Returns the unregister function. */
	register: (value: string) => () => void;
	/** Register a panel's value, in mount order. Returns the unregister function. */
	registerPanel: (value: string) => () => void;
}

const registry = () => {
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
	const triggers = registry();
	const panels = registry();

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
		register: triggers.add,
		registerPanel: panels.add
	});
};

/** The enclosing `Tabs`, or `undefined` when a part is rendered on its own. */
export const useTabs = (): TabsContext | undefined => getContext<TabsContext | undefined>(key);
