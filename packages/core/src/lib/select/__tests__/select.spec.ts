import { describe, it, expect } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/svelte';
import Select from '../select.svelte';
import SelectSpec from './select.spec.svelte';

describe('Select', () => {
  it('Renders the select', () => {
    render(Select, { placeholder: 'Select an option' });

    const select = screen.getByPlaceholderText('Select an option');

    expect(select).toHaveClass(
      'h-[30px] w-full appearance-none border px-2 py-1.5 text-xs leading-tight outline-none'
    );

    expect(select).not.toHaveClass(
      'bg-disabled-light text-disabled-dark border-disabled-light pointer-events-none'
    );
  });

  it('Selects an option', async () => {
    render(SelectSpec, { placeholder: 'Select an option' });

    const select: HTMLSelectElement =
      screen.getByPlaceholderText('Select an option');

    await fireEvent.select(select, { target: { value: 'Option 2' } });

    expect(select.value).toBe('Option 2');
  });

  it('Renders the select as disabled', () => {
    render(Select, { placeholder: 'Select an option', disabled: true });

    const select = screen.getByPlaceholderText('Select an option');

    expect(select).toHaveClass(
      'h-[30px] w-full appearance-none border px-2 py-1.5 text-xs leading-tight outline-none'
    );

    expect(select).toHaveClass(
      'bg-disabled-light text-disabled-dark border-disabled-light cursor-not-allowed'
    );

    expect(select).toHaveAttribute('aria-disabled', 'true');
  });

  it('Renders the select in the warn state', () => {
    render(Select, {
      placeholder: 'Select an option',
      state: 'warn',
    });

    const select = screen.getByPlaceholderText('Select an option');

    expect(select).toHaveClass(
      'border-warning-bright focus:outline-warning-bright focus:outline-[1.5px] focus:-outline-offset-1'
    );
  });

  it('Renders the select in the error state', () => {
    render(Select, {
      placeholder: 'Select an option',
      state: 'error',
    });

    const select = screen.getByPlaceholderText('Select an option');

    expect(select).toHaveClass(
      'border-danger-dark focus:outline-danger-dark focus:outline-[1.5px] focus:-outline-offset-1'
    );
  });
});
