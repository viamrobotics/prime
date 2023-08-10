import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import Input from './input.svelte';

describe('Input', () => {
  it('Renders the input', () => {
    render(Input, { placeholder: 'Enter your name' });

    const input = screen.getByPlaceholderText('Enter your name');

    expect(input).toHaveClass(
      'h-[30px] w-full appearance-none border px-2 py-1.5 text-xs leading-tight outline-none'
    );

    expect(input).not.toHaveClass(
      'bg-disabled-light text-disabled-dark border-disabled-light pointer-events-none'
    );
  });

  it('Renders the input as disabled', () => {
    render(Input, { placeholder: 'Enter your name', disabled: true });

    const input = screen.getByPlaceholderText('Enter your name');

    expect(input).toHaveClass(
      'h-[30px] w-full appearance-none border px-2 py-1.5 text-xs leading-tight outline-none'
    );

    expect(input).toHaveClass(
      'bg-disabled-light text-disabled-dark border-disabled-light pointer-events-none'
    );

    expect(input).toHaveAttribute('aria-disabled', 'true');
  });

  it('Renders the input as readonly', () => {
    render(Input, { placeholder: 'Enter your name', readonly: true });

    const input = screen.getByPlaceholderText('Enter your name');

    expect(input).toHaveClass(
      'h-[30px] w-full appearance-none border px-2 py-1.5 text-xs leading-tight outline-none'
    );

    expect(input).toHaveClass(
      'bg-disabled-light text-disabled-dark border-disabled-light'
    );

    expect(input).not.toHaveAttribute('aria-disabled');
  });
});
