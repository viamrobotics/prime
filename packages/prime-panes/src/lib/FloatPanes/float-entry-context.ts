import { getContext, setContext } from 'svelte';

const FLOAT_ENTRY_KEY = Symbol('float-entry');

export function provideFloatEntryId(entryId: string) {
	setContext(FLOAT_ENTRY_KEY, entryId);
}

export function useFloatEntryId(): string | undefined {
	return getContext<string | undefined>(FLOAT_ENTRY_KEY);
}
