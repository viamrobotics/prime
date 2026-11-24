import { getContext, setContext } from 'svelte';

const TOGGLE_BUTTONS_KEY = Symbol('ToggleButtons');

interface ToggleButtonsContext {
	readonly hasEnabledSelection: boolean;
	reportSelected: (disabled: boolean) => void;
}

export const provideToggleButtons = (options: {
	hasSelection: () => boolean;
}): ToggleButtonsContext => {
	let selectedDisabled = $state(false);

	return setContext<ToggleButtonsContext>(TOGGLE_BUTTONS_KEY, {
		get hasEnabledSelection() {
			return options.hasSelection() && !selectedDisabled;
		},
		reportSelected: (disabled) => {
			selectedDisabled = disabled;
		}
	});
};

export const useToggleButtons = (): ToggleButtonsContext | undefined =>
	getContext<ToggleButtonsContext | undefined>(TOGGLE_BUTTONS_KEY);
