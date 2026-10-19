import { FieldStates, type FieldState } from '../Field/state.ts';

export interface FrameOptions {
	disabled?: boolean | null;
	readonly?: boolean | null;
}

const background = ({ disabled, readonly }: FrameOptions): string => {
	if (disabled) return 'cursor-not-allowed bg-disabled-light';
	if (readonly) return 'bg-light';
	return 'bg-white';
};

/**
 * Border classes for a bordered control by state. Shared by `Input` and `Select.Trigger` so the
 * two never drift. `Input.Group` mirrors these through `has-` variants and cannot import them, so
 * a change here needs the matching change to the `has-[...]` classes in `InputGroup.svelte`.
 */
export const frameBorder = (
	state: FieldState,
	{ disabled, readonly }: FrameOptions = {}
): string => {
	if (disabled || readonly) return 'border-transparent';
	if (state === FieldStates.Error) return 'border-danger-dark';
	if (state === FieldStates.Warn) return 'border-warning-bright';
	return 'border-light hover:border-gray-6';
};

/**
 * Tailwind classes for the bordered frame of a standalone input, driven by `state` plus the
 * disabled/readonly flags. It sets no width, so the consumer owns it.
 */
export const inputClasses = (state: FieldState, options: FrameOptions = {}): string[] => [
	'rounded-sm border px-2 py-1.5 text-sm transition-colors',
	background(options),
	frameBorder(state, options)
];
