import { describe, it, expect, beforeEach } from 'vitest';
import { act, render, screen, within } from '@testing-library/svelte';

import { createToastContext, type ToastContext } from '../context';
import ToastSpec from './toast.spec.svelte';

describe('toast', () => {
  let context: ToastContext;

  beforeEach(() => {
    context = createToastContext();

    render(ToastSpec, { toastContext: context });
  });

  it('should have an alert live region', () => {
    screen.getByRole('alert', { name: 'Toasts' });
  });

  it('should display dismissible notifications', async () => {
    await act(() => {
      context.toast.neutral('Hello, world');
    });

    const status = screen.getByRole('alert');
    const toast = within(status).getByRole('listitem');

    within(toast).getByRole('button', { name: /dismiss/iu });
    expect(toast).toHaveTextContent(/hello, world/iu);
  });

  it('should display proper toast with style for upload variant', async () => {
    await act(() => {
      context.toast.upload('def');
    });

    const status = screen.getByRole('alert');
    const toast = within(status).getByRole('listitem');

    within(toast).getByRole('button', { name: /perform action/iu });
    expect(status.querySelector('svg')).toBeVisible();
    expect(toast).toHaveTextContent(/def/iu);
  });

  it('should display proper toast with style for success variant that is closeable', async () => {
    await act(() => {
      context.toast.success('abc', true);
    });

    const status = screen.getByRole('alert');
    const toast = within(status).getByRole('listitem');

    within(toast).getByRole('button', { name: /dismiss/iu });
    expect(status.querySelector('svg')).toBeVisible();
    expect(toast).toHaveTextContent(/abc/iu);
  });
});
