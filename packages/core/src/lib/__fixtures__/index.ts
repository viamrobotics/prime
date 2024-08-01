/** prime-core test fixtures. */
import { readable, writable } from 'svelte/store';
import { noop } from 'lodash-es';

// NOTE: imported directly from `$lib/toast/context` to avoid
// exporting implementation details in `$lib/toast/index`
import {
  ToastContextKey,
  type ToastContext,
  type Toast,
} from '$lib/toast/context';

/**
 * Create a no-op toast context.
 *
 * @param toast - The `toast` function to return from `useToast` (defaults to `noop`)
 *
 * @example
 * ```ts
 * import { vi } from 'vitest';
 * import { render } from '@testing-library/svelte';
 *
 * import { createNoopToastContext } from '@viamrobotics/prime-core/__fixtures__';
 *
 * import Subject from '../cool-component.svelte';
 *
 * const toast = vi.fn();
 * const renderSubject = () => {
 *   const toastContext = createNoopToastContext(toast)
 *   return render(Subject, { props: {}, context: new Map([toastContext]) });
 * }
 * ```
 */
export const createNoopToastContext = (toast?: Toast): [unknown, unknown] => [
  ToastContextKey,
  {
    state: { toasts: readable([]), pageIsVisible: writable(false) },
    toast: toast ?? noop,
  } satisfies ToastContext,
];
