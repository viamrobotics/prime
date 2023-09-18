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

    const background = container.querySelector('div[role="button"]');
    if (!background) {
      throw new Error('Background not found');
    }

    await fireEvent.click(background);

    expect(onClose).toHaveBeenLastCalledWith(
      expect.objectContaining({ detail: true })
    );
  });
});
