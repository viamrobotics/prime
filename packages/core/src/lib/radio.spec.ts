import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/svelte';
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

  it('Displays tooltip when specified', async () => {
    render(Radio, { tooltip: 'Tooltip Text' });
    const target = screen.getByRole('button')
    await fireEvent.mouseEnter(target);
    await waitFor(() => {
      expect(screen.getByText('Tooltip Text')).toBeVisible();
    })
  });

  it('Applies correct icon for info state', () => {
    render(Radio, { state: 'info', tooltip: 'For your information' });
    const iconButton = screen.getByRole('button');
    expect(iconButton).toBeVisible();
    const svg = screen.getByRole('img', { name: 'information-outline icon' });
    expect(svg).toBeVisible();
    const pathElem = svg.querySelector('path');
    expect(pathElem).toHaveAttribute('fill', 'currentColor'); 
});

  it('Applies correct color for warn state', () => {
    render(Radio, { state: 'warn', tooltip: 'Strong warning' });
    const icon = screen.getByRole('button');
    expect(icon.firstChild).toHaveClass('text-warning-bright');
    const svg = screen.getByRole('img', { name: 'alert-circle-outline icon' });
    expect(svg).toBeVisible();
  });

  it('Applies correct color for error state', () => {
    render(Radio, { state: 'error', tooltip: 'Ahhhhh error!' });
    const icon = screen.getByRole('button');
    expect(icon.firstChild).toHaveClass('text-danger-dark');
    const svg = screen.getByRole('img', { name: 'alert-circle-outline icon' });
    expect(svg).toBeVisible();
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
