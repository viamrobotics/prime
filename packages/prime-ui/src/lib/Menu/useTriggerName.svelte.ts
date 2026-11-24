import { getContext, setContext } from 'svelte';

const TRIGGER_NAME_KEY = Symbol('MenuTriggerName');

/** The id of a menu's trigger, which its panel names itself by. */
export interface TriggerName {
	id: string;
}

export const provideTriggerName = (initialId: string): TriggerName => {
	const name = $state({ id: initialId });
	setContext(TRIGGER_NAME_KEY, name);
	return name;
};

export const useTriggerName = (): TriggerName | undefined =>
	getContext<TriggerName | undefined>(TRIGGER_NAME_KEY);
