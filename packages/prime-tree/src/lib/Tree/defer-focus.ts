import type { HTMLAttributes } from 'svelte/elements';

type FocusInHandler = NonNullable<HTMLAttributes<HTMLElement>['onfocusin']>;

// zag focuses a row from inside its keydown transition. The synchronous focusin re-enters the machine,
// so Shift+Arrow reads the newly focused row's id. Still open in @zag-js/tree-view 1.48.0.
export function deferFocus<TProps extends { onfocusin?: FocusInHandler | null | undefined }>(
	props: TProps
): TProps {
	const { onfocusin } = props;
	if (!onfocusin) return props;

	const deferred: FocusInHandler = (event) => queueMicrotask(() => onfocusin(event));
	return { ...props, onfocusin: deferred };
}
