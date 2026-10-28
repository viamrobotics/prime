import type { HTMLAttributes } from 'svelte/elements';

type FocusInHandler = NonNullable<HTMLAttributes<HTMLElement>['onfocusin']>;

export function deferFocus<TProps extends { onfocusin?: FocusInHandler | null | undefined }>(
	props: TProps
): TProps {
	const { onfocusin } = props;
	if (!onfocusin) return props;

	const deferred: FocusInHandler = (event) => queueMicrotask(() => onfocusin(event));
	return { ...props, onfocusin: deferred };
}
