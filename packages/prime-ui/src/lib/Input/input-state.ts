import type { ValueOf } from 'type-fest';

export const InputStates = {
	INFO: 'info',
	WARN: 'warn',
	ERROR: 'error',
	NONE: 'none'
} as const;

export type InputState = ValueOf<typeof InputStates>;
