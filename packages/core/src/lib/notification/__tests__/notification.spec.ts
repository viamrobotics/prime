import { describe, it, expect, beforeEach } from 'vitest';
import { act, render, screen, within } from '@testing-library/svelte';

import { createNotifyContext, type NotifyContext } from '../context';
import NotificationSpec from './notification.spec.svelte';

describe('notify', () => {
  let context: NotifyContext;

  beforeEach(() => {
    context = createNotifyContext();

    render(NotificationSpec, { notifyContext: context });
  });

  it('should have an alert live region', () => {
    screen.getByRole('alert', { name: 'Notifications' });
  });

  it('should display dismissible notifications', async () => {
    await act(() => {
      context.notify.info('Hello', 'world');
    });

    const status = screen.getByRole('alert');
    const notification = within(status).getByRole('listitem');

    /*
     * NOTE(mc, 2023-09-15): Svelte animation makes notification removal
     * prohibitively difficult to test in a Node.js environment.
     * Instead, we only check for the presence of the dismiss button
     * which will only appear if we correctly pass a dismissal function
     */
    within(notification).getByRole('button', { name: /dismiss/iu });

    expect(notification).toHaveTextContent(/hello world/iu);
  });

  it('should display multiple notifications with different styles', async () => {
    await act(() => {
      context.notify.info('abc', 'def');
      context.notify.warn('ghi', 'jkl');
      context.notify.danger('mno', 'pqr');
      context.notify.success('cool beans');
    });

    const status = screen.getByRole('alert');
    const items = within(status).getAllByRole('listitem');

    const info = items
      .flatMap((li) => [...li.querySelectorAll('.bg-info-light')])
      .at(0);

    const warning = items
      .flatMap((li) => [...li.querySelectorAll('.bg-warning-light')])
      .at(0);

    const danger = items
      .flatMap((li) => [...li.querySelectorAll('.bg-danger-light')])
      .at(0);

    const success = items
      .flatMap((li) => [...li.querySelectorAll('.bg-success-light')])
      .at(0);

    expect(info).toHaveTextContent(/abc def/iu);
    expect(warning).toHaveTextContent(/ghi jkl/iu);
    expect(danger).toHaveTextContent(/mno pqr/iu);
    expect(success).toHaveTextContent(/cool beans/iu);
  });
});
