import type { ClassValue } from 'svelte/elements';

import { FieldStates, type FieldState } from '../Field/state.ts';
import { useField } from '../Field/useField.svelte.ts';
import { FOCUS_RING } from '../focus-ring.ts';
import { inputClasses } from './frame.ts';
import { useInputGroup } from './useInputGroup.svelte.ts';

type Maybe<TValue> = TValue | null | undefined;

interface InputControlOptions {
	id: () => Maybe<string>;
	disabled: () => Maybe<boolean>;
	required: () => Maybe<boolean>;
	readonly: () => Maybe<boolean>;
	state: () => FieldState | undefined;
	describedBy: () => Maybe<string>;
	extraClasses: () => Maybe<ClassValue>;
}

const groupedClasses = 'min-w-0 flex-1 border-0 bg-transparent p-0';

/**
 * What a native `<input>` takes from its enclosing `Field` and `Input.Group`. A prop passed
 * directly wins over the field. Bind each returned value to the matching attribute on the element so `Input` and
 * `NumberInput` stay in step.
 */
export const useInputControl = (options: InputControlOptions) => {
	const field = useField();
	const isGrouped = useInputGroup() !== undefined;

	const id = $derived(options.id() ?? field?.controlId);
	const disabled = $derived(options.disabled() ?? field?.disabled ?? false);
	const required = $derived(options.required() ?? field?.required ?? false);
	const state = $derived(options.state() ?? field?.state ?? FieldStates.None);
	const describedBy = $derived(options.describedBy() ?? field?.describedBy);

	const classes = $derived([
		isGrouped ? groupedClasses : inputClasses(state, { disabled, readonly: options.readonly() }),
		isGrouped ? 'outline-none' : FOCUS_RING,
		'placeholder:text-subtle-2',
		disabled ? 'cursor-not-allowed text-disabled-dark' : 'text-default',
		options.extraClasses()
	]);

	return {
		get id() {
			return id;
		},
		get disabled() {
			return disabled;
		},
		get required() {
			return required;
		},
		get describedBy() {
			return describedBy;
		},
		get invalid() {
			return state === FieldStates.Error || undefined;
		},
		get dataState() {
			return state === FieldStates.None ? undefined : state;
		},
		get classes() {
			return classes;
		}
	};
};
