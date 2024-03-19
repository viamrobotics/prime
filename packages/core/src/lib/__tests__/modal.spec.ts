import { describe, it, expect, vi } from 'vitest';
import { render, screen, within } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import type { ComponentProps } from 'svelte';
import Modal from '../modal.svelte';
import ModelOneSlot from './modal-one-slot.spec.svelte';
import ModalTwoSlots from './modal-two-slots.spec.svelte';

describe('Modal', () => {
  const onClose = vi.fn();

  const renderSubject = (props: ComponentProps<Modal>) => {
    const { component } = render(Modal, props);
    component.$on('close', onClose);
  };

  it('should be visible if open is true', () => {
    renderSubject({ isOpen: true });

    const modal = screen.queryByRole('alertdialog');

    expect(modal).toBeInTheDocument();
    expect(modal).toHaveAttribute('aria-modal', 'true');
    expect(onClose).not.toHaveBeenCalled();
  });

  it('should not be visible if open is false', () => {
    renderSubject({ isOpen: false });

    const modal = screen.queryByRole('alertdialog');

    expect(modal).not.toBeInTheDocument();
    expect(onClose).not.toHaveBeenCalled();
  });

  it('should close modal when close icon button is clicked', async () => {
    const user = userEvent.setup();
    renderSubject({ isOpen: true });

    const modal = screen.getByRole('alertdialog');
    const closeButton = within(modal).getByRole('button', { name: /close/iu });

    await user.click(closeButton);
    expect(onClose).toHaveBeenCalledOnce();
  });

  it('should close modal when clicked outside the modal', async () => {
    const user = userEvent.setup();
    renderSubject({ isOpen: true });

    const modal = screen.getByRole('alertdialog');
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

  it('should focus on only button element on mount with one slot', () => {
    render(ModelOneSlot, { isOpen: true });

    const modal = screen.getByRole('alertdialog');
    const button = within(modal).getByRole('button', { name: /primary/iu });

    expect(button).toHaveFocus();
  });

  it('should focus on secondary button element on mount with two slots', () => {
    render(ModalTwoSlots, { isOpen: true });

    const modal = screen.getByRole('alertdialog');
    const secondaryButton = within(modal).getByRole('button', {
      name: /secondary/iu,
    });

    expect(secondaryButton).toHaveFocus();
  });

  it('should focus on primary button element on mount with two slots and focusPrimaryElement true', () => {
    render(ModalTwoSlots, { isOpen: true, focusPrimaryElement: true });

    const modal = screen.getByRole('alertdialog');
    const primaryButton = within(modal).getByRole('button', {
      name: /primary/iu,
    });

    expect(primaryButton).toHaveFocus();
  });
});
