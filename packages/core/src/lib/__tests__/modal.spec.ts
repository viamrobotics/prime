import { describe, it, expect, afterEach, beforeEach } from 'vitest';
import { render, fireEvent, screen } from '@testing-library/svelte';
import Modal from '../modal.svelte';
import { writable } from 'svelte/store';

describe('Modal', () => {
  let isOpen = writable(true);
  let currentValue = true;

  beforeEach(() => {
    isOpen = writable(true);
    currentValue = true;

    const unsubscribe = isOpen.subscribe((value) => {
      currentValue = value;
    });

    afterEach(() => {
      unsubscribe();
    });
  });

  it('should close modal when close icon button is clicked', async () => {
    render(Modal, { isOpen });

    const closeButton = screen.getByTitle('Close modal');
    await fireEvent.click(closeButton);

    expect(currentValue).toBe(false);
  });

  it('should close modal when clicked outside the modal', async () => {
    render(Modal, { isOpen });

    const modal = screen.getByRole('dialog');
    await fireEvent.click(modal.parentElement!);

    expect(currentValue).toBe(false);
  });

  it('if open is true, modal should be visible', () => {
    render(Modal, { isOpen });
    const modal = screen.getByRole('dialog');
    expect(modal).toBeTruthy();
  });

  it('if open is false, modal should not be visible', () => {
    isOpen.set(false);
    render(Modal, { isOpen });
    const modal = screen.queryByRole('dialog');
    expect(modal).toBeFalsy();
  });

  it('should close modal when escape key is pressed', async () => {
    render(Modal, { isOpen });

    await fireEvent.keyDown(window, { key: 'Escape' });
    expect(currentValue).toBe(false);
  });
});
