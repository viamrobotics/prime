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
    const { getByRole, component } = render(Modal, {
      open: true,
    });

    const onClose = vi.fn();
    component.$on('close', onClose);

    const modal = getByRole('dialog');

    await fireEvent.click(modal.parentElement!);

    expect(onClose).toHaveBeenLastCalledWith(
      expect.objectContaining({ detail: true })
    );
  });

  it('if open is true, modal should be visible', () => {
    const { getByRole } = render(Modal, {
      open: true,
    });
    const modal = getByRole('dialog');
    expect(modal).toBeTruthy();
  });

  it('if open is false, modal should not be visible', () => {
    const { queryByRole } = render(Modal, {
      open: false,
    });
    const modal = queryByRole('dialog');
    expect(modal).toBeNull();
  });

  it('should emit close event when escape key is pressed', async () => {
    const { component } = render(Modal, { open: true });

    const onClose = vi.fn();
    component.$on('close', onClose);

    await fireEvent.keyDown(window, { key: 'Escape' });
    expect(onClose).toHaveBeenCalled();
  });
});
