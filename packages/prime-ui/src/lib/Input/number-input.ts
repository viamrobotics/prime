import Root from './NumberInput.svelte';
import Stepper from './NumberInputStepper.svelte';

export const NumberInput: typeof Root & { Stepper: typeof Stepper } = Object.assign(Root, {
	Stepper
});
