import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, within } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import Modal from '../modal.svelte';
import { writable, get } from 'svelte/store';

describe('Modal', () => {
  let isOpen = writable(true);

  beforeEach(() => {
    isOpen = writable(true);
  });

  it('should close modal when close icon button is clicked', async () => {
    render(Modal, { isOpen });
    const user = userEvent.setup();

    const modal = screen.getByRole('dialog');
    const closeButton = within(modal).getByRole('button', { name: /close/iu });

    await user.click(closeButton);

    expect(get(isOpen)).toBe(false);
  });

  it('should close modal when clicked outside the modal', async () => {
    render(Modal, { isOpen });
    const user = userEvent.setup();

    const modal = screen.getByRole('dialog');
    await user.click(modal.parentElement!);

    expect(get(isOpen)).toBe(false);
  });

  it('if open is true, modal should be visible', () => {
    render(Modal, { isOpen });
    const modal = screen.queryByRole('dialog');
    expect(modal).toBeInTheDocument();
    expect(modal).toHaveAttribute('aria-modal', 'true');
  });

  it('if open is false, modal should not be visible', () => {
    isOpen.set(false);
    render(Modal, { isOpen });
    const modal = screen.queryByRole('dialog');
    expect(modal).not.toBeInTheDocument();
  });

  it('should close modal when escape key is pressed', async () => {
    render(Modal, { isOpen });
    const user = userEvent.setup();
    await user.keyboard('{Escape}');
    expect(get(isOpen)).toBe(false);
  });

  it('should focus on heading element on mount', () => {
    render(Modal, { isOpen });
    const modal = screen.getByRole('dialog');
    const heading = within(modal).getByRole('heading');
    expect(heading).toHaveFocus();
  });
});
