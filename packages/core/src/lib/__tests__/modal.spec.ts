import { describe, it, expect, vi } from 'vitest';
import { render, fireEvent } from '@testing-library/svelte';
import Modal from '../modal.svelte';

describe('Modal', () => {
  it('should emit close event when close icon button is clicked', async () => {
    const { getByTitle, component } = render(Modal, {
      open: true,
    });

    const closeButton = getByTitle('Close modal');
    const onClose = vi.fn();
    component.$on('close', onClose);
    await fireEvent.click(closeButton);

    expect(onClose).toBeCalledWith(expect.objectContaining({ detail: true }));
  });

  it('should emit close event when clicked outside the modal', async () => {
    const { container, component } = render(Modal, {
      open: true,
    });

    const onClose = vi.fn();
    component.$on('close', onClose);

    const modal = container.querySelector('.relative.max-w-lg');
    if (!modal) {
      return;
    }

    await fireEvent.click(modal.parentElement!);

    expect(onClose).toHaveBeenLastCalledWith(
      expect.objectContaining({ detail: true })
    );
  });

  it('if open is true, modal should be visible', () => {
    const { container } = render(Modal, {
      open: true,
    });
    const modal = container.querySelector('[role="dialog"]');
    expect(modal).not.toHaveClass('invisible');
  });

  it('if open is false, modal should not be visible', () => {
    const { container } = render(Modal, {
      open: false,
    });
    const modal = container.querySelector('[role="dialog"]');
    expect(modal).toHaveClass('invisible');
  });
});
