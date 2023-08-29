import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';

import Subject from './click-outside.spec.svelte';

describe('use:clickOutside', () => {
  const onClickOutside = vi.fn();

  it('should trigger a callback only when clicked outside', async () => {
    render(Subject, { onClickOutside });

    const user = userEvent.setup();
    const subject = screen.getByTestId('subject');
    const insideButton = screen.getByTestId('inside');
    const outsideButton = screen.getByTestId('outside');

    await user.click(subject);
    await user.click(insideButton);

    expect(onClickOutside).not.toHaveBeenCalled();

    await user.click(outsideButton);

    expect(onClickOutside).toHaveBeenCalledOnce();
  });

  it('should not trigger if clicked element gets removed from the DOM', async () => {
    render(Subject, { onClickOutside });

    const user = userEvent.setup();
    const insideButton = screen.getByTestId('inside');

    insideButton.addEventListener('click', () => {
      insideButton.remove();
    });

    await user.click(insideButton);

    expect(onClickOutside).not.toHaveBeenCalled();
  });
});
