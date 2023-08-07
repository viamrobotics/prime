import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/svelte';
import Radio from './radio.svelte';

describe('Radio', () => {
  it('Renders radio options correctly', () => {
    render(Radio, { options: ['Option1', 'Option2'], selected: 'Option1' });
    expect(screen.getByText('Option1')).toBeVisible();
    expect(screen.getByText('Option2')).toBeVisible();
  });

  it('Marks the selected option correctly', () => {
    render(Radio, { options: ['Option1', 'Option2'], selected: 'Option1' });
    expect(screen.getByText('Option1')).toHaveClass(
      'bg-light border-gray-6 text-default font-semibold'
    );
  });

  it('Marks the selected option as readonly if a readonly attribute of true has been specified', () => {
    render(Radio, {
      options: ['Option1', 'Option2'],
      selected: 'Option1',
      readonly: true,
    });
    expect(screen.getByText('Option1')).toHaveClass(
      'bg-light border-medium text-disabled-dark font-semibold'
    );
  });

  it('Allows option click if not readonly', async () => {
    const { component } = render(Radio, {
      options: ['Option1', 'Option2'],
      selected: 'Option1',
    });
    const onInput = vi.fn();
    component.$on('input', onInput);
    await fireEvent.click(screen.getByText('Option2'));
    expect(onInput).toHaveBeenCalledOnce();
  });

  it('Prevents option click if readonly', async () => {
    const { component } = render(Radio, {
      options: ['Option1', 'Option2'],
      selected: 'Option1',
      readonly: true,
    });
    const onInput = vi.fn();
    component.$on('input', onInput);
    await fireEvent.click(screen.getByText('Option2'));
    expect(onInput).not.toHaveBeenCalled();
  });

  it('Renders label correctly', () => {
    render(Radio, { label: 'Test Label' });
    expect(screen.getByText('Test Label')).toBeVisible();
  });

  it('Displays tooltip when specified', () => {
    render(Radio, { tooltip: 'Tooltip Text' });
    // How to mimic hover behavior??  Look at how Devin's doing it in the PR he merged for tooltip.
    // Also need to update this to use the migrated tooltip.
    expect(screen.getByText('Tooltip Text')).toBeVisible();
  });

  it('Applies correct icon for info state', () => {
    render(Radio, { state: 'info' });
    expect(
      screen.getByRole('img', { name: 'information-outline' })
    ).toBeVisible();
  });

  it('Applies correct icon for warn state', () => {
    render(Radio, { state: 'warn' });
    expect(
      screen.getByRole('img', { name: 'alert-circle-outline' })
    ).toBeVisible();
  });

  it('Applies correct icon for error state', () => {
    render(Radio, { state: 'error' });
    expect(
      screen.getByRole('img', { name: 'alert-circle-outline' })
    ).toBeVisible();
  });

  it('Renders with full width if specified', () => {
    render(Radio, { width: 'full', options: ['Opt1', 'Opt2', 'Opt3'] });
    const button1 = screen.getByText('Opt1');
    const button2 = screen.getByText('Opt2');
    const button3 = screen.getByText('Opt3');
    expect(button1).toHaveClass('w-full');
    expect(button2).toHaveClass('w-full');
    expect(button3).toHaveClass('w-full');
  });

  it('Renders with default width if specified', () => {
    render(Radio, { width: 'default', options: ['Opt1', 'Opt2', 'Opt3'] });
    const button1 = screen.getByText('Opt1');
    const button2 = screen.getByText('Opt2');
    const button3 = screen.getByText('Opt3');
    expect(button1).not.toHaveClass('w-full');
    expect(button2).not.toHaveClass('w-full');
    expect(button3).not.toHaveClass('w-full');
  });
});