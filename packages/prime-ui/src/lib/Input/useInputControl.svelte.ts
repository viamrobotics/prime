import { FieldStates, type FieldState } from '../Field/state.ts';
import { useField } from '../Field/useField.svelte.ts';

type Maybe<TValue> = TValue | null | undefined;

interface InputControlOptions {
	id: () => Maybe<string>;
	disabled: () => Maybe<boolean>;
	required: () => Maybe<boolean>;
	state: () => FieldState | undefined;
	describedBy: () => Maybe<string>;
}

/**
 * What a native `<input>` takes from its enclosing `Field`. A prop passed directly wins over the
 * field. Bind each returned value to the matching attribute on the element so `Input` and
 * `NumberInput` stay in step. Styling is the `input` class from `@viamrobotics/tailwind-config`, which reads these attributes.
 */
export const useInputControl = (options: InputControlOptions) => {
	const field = useField();

	const id = $derived(options.id() ?? field?.controlId);
	const disabled = $derived(options.disabled() ?? field?.disabled ?? false);
	const required = $derived(options.required() ?? field?.required ?? false);
	const state = $derived(options.state() ?? field?.state ?? FieldStates.None);
	const describedBy = $derived(options.describedBy() ?? field?.describedBy);

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
		get fieldState() {
			return state === FieldStates.None ? undefined : state;
		}
	};
};
