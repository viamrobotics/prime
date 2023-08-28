import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';

import Subject from './click-outside.spec.svelte';

describe('use:clickOutside', () => {
  const onClickOutside = vi.fn();

  it('should trigger a callback only when clicked outside', async () => {
    render(Subject, { onClickOutside });

    const user = userEvent.setup();
    const outsideButton = screen.getByTestId('outside');
    const subject = screen.getByTestId('subject');

    await user.click(subject);

    expect(onClickOutside).not.toHaveBeenCalled();

    await user.click(outsideButton);

    expect(onClickOutside).toHaveBeenCalledOnce();
  });
});
