import { getContext, setContext } from 'svelte';

const INPUT_GROUP_KEY = Symbol('Input.Group');

// Each `add*` counts one child until the function it returns runs, so the group knows whether a
// `NumberInput` it holds still needs the stepper the group renders last.
export interface InputGroupContext {
	addNumberInput: () => () => void;
	addStepper: () => () => void;
}

export const provideInputGroup = (context: InputGroupContext): void => {
	setContext(INPUT_GROUP_KEY, context);
};

export const useInputGroup = (): InputGroupContext | undefined =>
	getContext<InputGroupContext | undefined>(INPUT_GROUP_KEY);
