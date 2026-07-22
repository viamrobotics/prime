import type { ValueOf } from 'type-fest';

export const InputStates = {
	None: 'none',
	Info: 'info',
	Warn: 'warn',
	Error: 'error'
} as const;

/** Contextual state shared by text and number inputs. */
export type InputState = ValueOf<typeof InputStates>;

/** Trailing status icon + color per non-default state. */
export const stateIcon = {
	info: { icon: 'information', class: 'text-info-dark' },
	warn: { icon: 'alert', class: 'text-warning-bright' },
	error: { icon: 'alert-circle', class: 'text-danger-dark' }
} as const;

interface FrameOptions {
	disabled?: boolean | null;
	readonly?: boolean | null;
}

const background = ({ disabled, readonly }: FrameOptions): string => {
	if (disabled) return 'cursor-not-allowed bg-disabled-light';
	if (readonly) return 'bg-light';
	return 'bg-white';
};

const border = (state: InputState, { disabled, readonly }: FrameOptions): string => {
	if (disabled || readonly) return 'border-transparent';
	if (state === InputStates.Error) return 'border-danger-dark focus-within:border-danger-dark';
	if (state === InputStates.Warn) return 'border-warning-bright focus-within:border-warning-bright';
	return 'border-light hover:border-gray-6 focus-within:border-gray-9';
};

/**
 * Tailwind classes for the shared bordered input frame, driven by `state` plus
 * the disabled/readonly flags.
 *
 * @example frameClasses(InputStates.Error, { disabled: false }) // [...border-danger-dark...]
 */
export const inputClasses = (state: InputState, options: FrameOptions = {}): string[] => [
	'flex w-full items-center gap-1 rounded border px-2 py-1.5 text-sm transition-colors',
	background(options),
	border(state, options)
];
