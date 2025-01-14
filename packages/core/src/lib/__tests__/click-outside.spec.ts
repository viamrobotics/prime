import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';

import Subject from './click-outside.spec.svelte';

describe('use:clickOutside', () => {
  const onClickOutside = vi.fn();

  it('should trigger a callback only when clicked outside', async () => {
    const user = userEvent.setup();

    render(Subject, { onClickOutside });

    const subject = screen.getByTestId('subject');
    const insideButton = screen.getByTestId('inside');
    const outsideButton = screen.getByTestId('outside');

    await user.click(subject);
    await user.click(insideButton);

    expect(onClickOutside).not.toHaveBeenCalled();

    await user.click(outsideButton);

    expect(onClickOutside).toHaveBeenCalledWith(outsideButton);
  });

  it('should not trigger if clicked element gets removed from the DOM', async () => {
    const user = userEvent.setup();
    render(Subject, { onClickOutside });

    const insideButton = screen.getByTestId('inside');

    insideButton.addEventListener('click', () => {
      insideButton.remove();
    });

    await user.click(insideButton);

    expect(onClickOutside).not.toHaveBeenCalled();
  });

  it('should not trigger if click starts inside element and moves out', async () => {
    const user = userEvent.setup();
    render(Subject, { onClickOutside });

    const insideButton = screen.getByTestId('inside');
    const outsideButton = screen.getByTestId('outside');

    // 1. press the left mouse button on the inside button
    // 2. release the left mouse button on the outside button
    await user.pointer([
      { keys: '[MouseLeft>]', target: insideButton },
      { keys: '[/MouseLeft]', target: outsideButton },
    ]);

    expect(onClickOutside).not.toHaveBeenCalled();
  });

  it('should not trigger if click starts outside element and moves in', async () => {
    const user = userEvent.setup();
    render(Subject, { onClickOutside });

    const insideButton = screen.getByTestId('inside');
    const outsideButton = screen.getByTestId('outside');

    // 1. press the left mouse button on the inside button
    // 2. release the left mouse button on the outside button
    await user.pointer([
      { keys: '[MouseLeft>]', target: outsideButton },
      { keys: '[/MouseLeft]', target: insideButton },
    ]);

    expect(onClickOutside).not.toHaveBeenCalled();
  });
});
