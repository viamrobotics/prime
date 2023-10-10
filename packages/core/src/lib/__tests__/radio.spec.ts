import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import Radio from './radio.spec.svelte';
import userEvent from '@testing-library/user-event';

describe('Radio', () => {
  const common = {
    name: 'Test radios',
    options: ['Option 1', 'Option 2', 'Option 3'],
    selected: 'Option 1',
  };

  it('Renders radio options correctly', () => {
    render(Radio, common);
    expect(screen.getByLabelText('Option 1')).toBeVisible();
    expect(screen.getByLabelText('Option 2')).toBeVisible();
    expect(screen.getByLabelText('Option 3')).toBeVisible();
  });

  it('Marks the selected option correctly', () => {
    render(Radio, common);
    expect(
      screen.getByLabelText('Option 1').parentElement?.parentElement
    ).toHaveClass('font-semibold text-default');
  });

  it('Marks the selected option as disabled if a disabled attribute of true has been specified', () => {
    render(Radio, {
      ...common,
      disabled: true,
    });

    expect(
      screen.getByLabelText('Option 1').parentElement?.parentElement
    ).toHaveClass('font-semibold text-disabled-dark cursor-not-allowed');
  });

  it('Allows option input if not disabled', async () => {
    const { component } = render(Radio, common);
    const onInput = vi.fn();
    component.$on('input', onInput);

    const option: HTMLInputElement = screen.getByLabelText('Option 2');

    await userEvent.click(option);

    expect(onInput).toHaveBeenCalled();
    expect(option.checked).toBe(true);
  });

  it('Prevents option input if disabled', async () => {
    const { component } = render(Radio, {
      ...common,
      disabled: true,
    });
    const onInput = vi.fn();
    component.$on('input', onInput);

    const option: HTMLInputElement = screen.getByLabelText('Option 2');

    await userEvent.click(option);

    expect(onInput).not.toHaveBeenCalled();
    expect(option.checked).toBe(false);
  });

  it('Renders the legend correctly', () => {
    render(Radio, common);
    expect(screen.getByText('Test radio options')).toBeVisible();
  });

  it('Renders the legend correctly when disabled', () => {
    render(Radio, { ...common, disabled: true });

    const legend = screen.getByText('Test radio options');
    expect(legend).toHaveClass('text-disabled-dark cursor-not-allowed');
  });

  it('Renders the legend correctly when required', () => {
    render(Radio, { ...common, required: true });

    const legend = screen.getByText('Test radio options');
    expect(legend).toHaveClass('after:ml-1 after:text-danger-dark after:content-["*"]');
  });

  it('Renders in a row if specified', () => {
    render(Radio, { ...common, direction: 'row' });
    expect(
      screen.getByText('Test radio options').nextElementSibling
    ).toHaveClass('flex-row gap-2');
  });

  it('Renders in a column if specified', () => {
    render(Radio, { ...common, direction: 'col' });
    expect(
      screen.getByText('Test radio options').nextElementSibling
    ).toHaveClass('flex-col');
  });

  it('Renders in a column if no direction specififed', () => {
    render(Radio, common);
    expect(
      screen.getByText('Test radio options').nextElementSibling
    ).toHaveClass('flex-col');
  });
});
