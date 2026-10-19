import { getContext, setContext } from 'svelte';

const key = Symbol('InputGroup');

/** What an `Input.Group` tells the inputs inside it. */
export interface InputGroupContext {
	readonly grouped: true;
}

export const provideInputGroup = (): InputGroupContext =>
	setContext<InputGroupContext>(key, { grouped: true });

/** The enclosing `Input.Group`, or `undefined` when the input stands alone. */
export const useInputGroup = (): InputGroupContext | undefined =>
	getContext<InputGroupContext | undefined>(key);
