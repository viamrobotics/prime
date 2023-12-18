import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  act,
  fireEvent,
  render,
  screen,
  within,
} from '@testing-library/svelte';

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
    const icon = screen.getByRole('img', { name: /success/iu });

    within(toast).getByRole('button', { name: /dismiss/iu });
    expect(toast).toHaveTextContent(/This is a success toast message/iu);
    expect(icon).toHaveClass('text-success-dark');
  });

  it('should display a toast with an action button when action is provided', async () => {
    const actionHandler = vi.fn();
    await act(() => {
      context.toast({
        message: 'This is a success toast message',
        variant: ToastVariant.Success,
        action: {
          text: 'Action text',
          handler: actionHandler,
        },
      });
    });

    const status = screen.getByRole('status');
    const toast = within(status).getByRole('listitem');
    const actionButton = screen.getByRole('button', {
      name: /perform action/iu,
    });
    await fireEvent.click(actionButton);

    expect(toast).toHaveTextContent(/action text/iu);
    expect(actionHandler).toHaveBeenCalled();
  });
});
