import { describe, it, expect, afterEach } from 'vitest';
import { act, fireEvent, render, screen } from '@testing-library/svelte';
import { NotificationContainer, notify } from '$lib';

describe('notify', () => {
  afterEach(async () => {
    // close the notification
    await fireEvent.click(screen.getByLabelText('Dismiss notification'));
  });

  it('Renders banner with danger style if the using danger', async () => {
    const { container } = render(NotificationContainer);

    await act(() =>
      notify.danger('This is the title.', 'This is the message.')
    );

    expect(container.querySelector('.bg-danger-dark')).toBeVisible();
    expect(container.querySelector('.text-danger-dark')).toBeVisible();
  });

  it('Renders banner with warning style if using warn', async () => {
    const { container } = render(NotificationContainer);

    await act(() => notify.warn('This is the title.', 'This is the message.'));

    expect(container.querySelector('.bg-warning-bright')).toBeVisible();
    expect(container.querySelector('.text-warning-bright')).toBeVisible();
  });

  it('Renders banner with success style if using success', async () => {
    const { container } = render(NotificationContainer);

    await act(() =>
      notify.success('This is the title.', 'This is the message.')
    );

    expect(container.querySelector('.bg-success-dark')).toBeVisible();
    expect(container.querySelector('.text-success-dark')).toBeVisible();
  });

  it('Renders banner with info style if using info', async () => {
    const { container } = render(NotificationContainer);

    await act(() => notify.info('This is the title.', 'This is the message.'));

    expect(container.querySelector('.bg-info-dark')).toBeVisible();
    expect(container.querySelector('.text-info-dark')).toBeVisible();
  });
});
