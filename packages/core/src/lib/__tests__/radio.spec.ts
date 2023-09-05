import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/svelte';
import { Radio } from '$lib';
import * as MDI from '@mdi/js';

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
    await fireEvent.click(screen.getByText('Option2'));
    expect(onInput).toHaveBeenCalledWith(
      expect.objectContaining({ detail: { value: 'Option2' } })
    );
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

  it('Displays tooltip when specified', async () => {
    render(Radio, { tooltip: 'Tooltip Text' });
    const target = screen.getByRole('button');
    await fireEvent.mouseEnter(target);
    await waitFor(() => {
      expect(screen.getByText('Tooltip Text')).toBeVisible();
    });
  });

  it('Applies correct icon for info state', () => {
    const { container } = render(Radio, {
      state: 'info',
      tooltip: 'For your information',
    });
    const iconButton = screen.getByRole('button');
    expect(iconButton).toBeVisible();

    const svg = container.querySelector('svg');
    expect(svg).toBeVisible();

    const path = svg?.querySelector('path');
    expect(path).toHaveAttribute('d', MDI.mdiInformationOutline);
    expect(path).toHaveAttribute('fill', 'currentColor');
  });

  it('Applies correct color for warn state', () => {
    const { container } = render(Radio, {
      state: 'warn',
      tooltip: 'Strong warning',
    });
    const icon = screen.getByRole('button');
    expect(icon.firstChild).toHaveClass('text-warning-bright');

    const svg = container.querySelector('svg');
    expect(svg).toBeVisible();

    const path = svg?.querySelector('path');
    expect(path).toHaveAttribute('d', MDI.mdiAlertCircleOutline);
  });

  it('Applies correct color for error state', () => {
    const { container } = render(Radio, {
      state: 'error',
      tooltip: 'Ahhhhh error!',
    });
    const icon = screen.getByRole('button');
    expect(icon.firstChild).toHaveClass('text-danger-dark');

    const svg = container.querySelector('svg');
    expect(svg).toBeVisible();

    const path = svg?.querySelector('path');
    expect(path).toHaveAttribute('d', MDI.mdiAlertCircleOutline);
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
