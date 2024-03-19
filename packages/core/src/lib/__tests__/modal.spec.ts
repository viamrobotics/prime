import { describe, it, expect, vi } from 'vitest';
import { render, screen, within } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import type { ComponentProps } from 'svelte';
import Modal from '../modal.svelte';

describe('Modal', () => {
  const onClose = vi.fn();

  const renderSubject = (props: ComponentProps<Modal>) => {
    const { component } = render(Modal, props);
    component.$on('close', onClose);
  };

  it('should be visible if open is true', () => {
    renderSubject({ isOpen: true });

    const modal = screen.queryByRole('dialog');

    expect(modal).toBeInTheDocument();
    expect(modal).toHaveAttribute('aria-modal', 'true');
    expect(onClose).not.toHaveBeenCalled();
  });

  it('should not be visible if open is false', () => {
    renderSubject({ isOpen: false });

    const modal = screen.queryByRole('dialog');

    expect(modal).not.toBeInTheDocument();
    expect(onClose).not.toHaveBeenCalled();
  });

  it('should close modal when close icon button is clicked', async () => {
    const user = userEvent.setup();
    renderSubject({ isOpen: true });

    const modal = screen.getByRole('dialog');
    const closeButton = within(modal).getByRole('button', { name: /close/iu });

    await user.click(closeButton);
    expect(onClose).toHaveBeenCalledOnce();
  });

  it('should close modal when clicked outside the modal', async () => {
    const user = userEvent.setup();
    renderSubject({ isOpen: true });

    const modal = screen.getByRole('dialog');
    await user.click(modal.parentElement!);

    expect(onClose).toHaveBeenCalledOnce();
  });

  it('should close modal when escape key is pressed', async () => {
    const user = userEvent.setup();
    renderSubject({ isOpen: true });

    await user.keyboard('{Escape}');

    expect(onClose).toHaveBeenCalledOnce();
  });

  it('should not emit close events on escape if the modal is closed', async () => {
    const user = userEvent.setup();
    renderSubject({ isOpen: false });

    await user.keyboard('{Escape}');

    expect(onClose).not.toHaveBeenCalled();
  });

  it('should change role to alertdialog when role is passed', () => {
    renderSubject({ isOpen: true, role:"alertdialog" });

    const modal = screen.getByRole('alertdialog');

    expect(modal).toBeInTheDocument()
  });
});
