import { describe, it, expect, beforeEach, vi } from 'vitest';
import { act, render, screen, within } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';

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

  it('should display a toast with success variant with correct classes and label', async () => {
    await act(() => {
      context.toast({
        message: 'This is a success toast message',
        variant: ToastVariant.Success
      });
    });

    const status = screen.getByRole('status');
    const toast = within(status).getByRole('listitem');
    const icon = screen.getByRole('img', { name: /success/iu });

    within(toast).getByRole('button', { name: /dismiss/iu });
    expect(toast).toHaveTextContent(/This is a success toast message/iu);
    expect(icon).toHaveClass('text-success-dark');
  });

  it('should display a toast with info variant with correct classes and label', async () => {
    await act(() => {
      context.toast({
        message: 'This is a info toast message',
        variant: ToastVariant.Info
      });
    });

    const status = screen.getByRole('status');
    const toast = within(status).getByRole('listitem');
    const icon = screen.getByRole('img', { name: /info/iu });

    within(toast).getByRole('button', { name: /dismiss/iu });
    expect(toast).toHaveTextContent(/This is a info toast message/iu);
    expect(icon).toHaveClass('text-info-dark');
  });

  it('should display a toast with warning variant with correct classes and label', async () => {
    await act(() => {
      context.toast({
        message: 'This is a warning toast message',
        variant: ToastVariant.Warning
      });
    });

    const status = screen.getByRole('status');
    const toast = within(status).getByRole('listitem');
    const icon = screen.getByRole('img', { name: /warning/iu });

    within(toast).getByRole('button', { name: /dismiss/iu });
    expect(toast).toHaveTextContent(/This is a warning toast message/iu);
    expect(icon).toHaveClass('text-warning-bright');
  });

  it('should display a toast with danger variant with correct classes and label', async () => {
    await act(() => {
      context.toast({
        message: 'This is a danger toast message',
        variant: ToastVariant.Danger
      });
    });

    const status = screen.getByRole('status');
    const toast = within(status).getByRole('listitem');
    const icon = screen.getByRole('img', { name: /danger/iu });

    within(toast).getByRole('button', { name: /dismiss/iu });
    expect(toast).toHaveTextContent(/This is a danger toast message/iu);
    expect(icon).toHaveClass('text-danger-dark');
  });

  it('should display a toast with neutral variant with correct classes and label', async () => {
    await act(() => {
      context.toast({
        message: 'This is a neutral toast message',
        variant: ToastVariant.Neutral
      });
    });

    const status = screen.getByRole('status');
    const toast = within(status).getByRole('listitem');
    const icon = screen.getByRole('img', { name: /neutral/iu });

    within(toast).getByRole('button', { name: /dismiss/iu });
    expect(toast).toHaveTextContent(/This is a neutral toast message/iu);
    expect(icon).toHaveClass('text-gray-7');
  });

  it('should display a toast with an action button when action is provided', async () => {
    const actionHandler = vi.fn();
    const user = userEvent.setup();
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
      name: /action text/iu,
    });
    await user.click(actionButton);

    expect(toast).toHaveTextContent(/action text/iu);
    expect(actionHandler).toHaveBeenCalled();
  });
});
