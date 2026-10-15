import { getContext, setContext, untrack } from 'svelte';

import { InputStates, type InputState } from '../Input/state.ts';

const key = Symbol('Field');

interface FieldOptions {
	id: () => string;
	disabled: () => boolean;
	required: () => boolean;
	state: () => InputState | undefined;
}

/** What a `Field` shares with the label, control, and hints inside it. */
export interface FieldContext {
	/** Id for the control. `Label` points its `for` here. */
	readonly id: string;
	readonly disabled: boolean;
	readonly required: boolean;
	readonly state: InputState;
	/** Space-joined ids of the registered labels, for `aria-labelledby`. */
	readonly labelledBy: string | undefined;
	/** Space-joined ids of the registered hints, for `aria-describedby`. */
	readonly describedBy: string | undefined;
	/** Register a label by id. Returns the unregister function. */
	label: (id: string) => () => void;
	/** Register a hint by id. Returns the unregister function. */
	describe: (id: string) => () => void;
}

const createRegistry = () => {
	let ids = $state<string[]>([]);
	const joined = $derived(ids.length > 0 ? ids.join(' ') : undefined);

	// Parts register from an $effect. Reading `ids` there would make that effect depend
	// on the list it appends to and loop, so the write happens untracked.
	const register = (id: string) => {
		untrack(() => {
			ids = [...ids, id];
		});
		return () => {
			ids = ids.filter((existing) => existing !== id);
		};
	};

	return {
		get joined() {
			return joined;
		},
		register
	};
};

export const provideField = (options: FieldOptions): FieldContext => {
	const labels = createRegistry();
	const hints = createRegistry();
	const currentState = $derived(options.state() ?? InputStates.None);

	return setContext<FieldContext>(key, {
		get id() {
			return options.id();
		},
		get disabled() {
			return options.disabled();
		},
		get required() {
			return options.required();
		},
		get state() {
			return currentState;
		},
		get labelledBy() {
			return labels.joined;
		},
		get describedBy() {
			return hints.joined;
		},
		label: labels.register,
		describe: hints.register
	});
};

/** The enclosing `Field`, or `undefined` when the part is used on its own. */
export const useField = (): FieldContext | undefined => getContext<FieldContext | undefined>(key);
