import { describe, it, expect, beforeEach } from 'vitest';
import { act, render, screen, within } from '@testing-library/svelte';

import { createToastContext, type ToastContext } from '../context';
import ToastSpec from './toast.spec.svelte';
import { ToastVariant } from '../variants';

describe('toast', () => {
  let context: ToastContext;

  beforeEach(() => {
    context = createToastContext();

    render(ToastSpec, { toastContext: context });
  });

  it('should have a status live region', () => {
    screen.getByRole('status', { name: 'Toasts' });
  });

  it('should display a dismissible toast', async () => {
    await act(() => {
      context.toast({
        message: 'This is a success toast message',
        variant: ToastVariant.Success,
      });
    });

    const status = screen.getByRole('status');
    const toast = within(status).getByRole('listitem');

    within(toast).getByRole('button', { name: /dismiss/iu });
    expect(toast).toHaveTextContent(/This is a success toast message/iu);
  });

  it('should display proper toast with style for success variant', async () => {
    await act(() => {
      context.toast({
        message: 'abc',
        variant: ToastVariant.Success,
      });
    });

    const status = screen.getByRole('status');
    const toast = within(status).getByRole('listitem');

    within(toast).getByRole('button', { name: /dismiss/iu });
    expect(status.querySelector('svg')).toBeVisible();
    expect(toast).toHaveTextContent(/abc/iu);
  });
});
