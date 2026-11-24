import type { HTMLAttributes } from 'svelte/elements';

type KeydownHandler = NonNullable<HTMLAttributes<HTMLElement>['onkeydown']>;

// zag reads `disabled` off the node object, so a node disabled through `isDisabled` alone gets its state here.
export function markDisabled<TProps extends object>(props: TProps, disabled: boolean): TProps {
	if (!disabled) return props;
	return { ...props, 'data-disabled': '' };
}

export function disableRow<TProps extends object>(props: TProps, disabled: boolean): TProps {
	if (!disabled) return props;
	return { ...markDisabled(props, disabled), 'aria-disabled': 'true', 'aria-selected': undefined };
}

const ignoreActivation: KeydownHandler = (event) => {
	if (event.key !== 'Enter' && event.key !== ' ') return;
	event.preventDefault();
	event.stopPropagation();
};

export function disableActivation<TProps extends object>(props: TProps, disabled: boolean): TProps {
	if (!disabled) return props;
	return { ...disableRow(props, disabled), onclick: undefined, onkeydown: ignoreActivation };
}
