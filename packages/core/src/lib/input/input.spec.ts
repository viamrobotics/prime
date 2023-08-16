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

    expect(input).toHaveClass('bg-light border-none');
    expect(input).not.toHaveAttribute('aria-disabled');
  });

  it('Renders the input in the info state', () => {
    const { container } = render(Input, {
      placeholder: 'Enter your name',
      state: 'info',
    });
    const svg = container.querySelector('svg');

    expect(svg).toBeInTheDocument();
    expect(svg?.parentElement).toHaveClass('text-info-dark');
  });

  it('Renders the input in the warn state', () => {
    const { container } = render(Input, {
      placeholder: 'Enter your name',
      state: 'warn',
    });
    const svg = container.querySelector('svg');

    expect(svg).toBeInTheDocument();
    expect(svg?.parentElement).toHaveClass('text-warning-bright');
  });

  it('Renders the input in the error state', () => {
    const { container } = render(Input, {
      placeholder: 'Enter your name',
      state: 'error',
    });
    const svg = container.querySelector('svg');

    expect(svg).toBeInTheDocument();
    expect(svg?.parentElement).toHaveClass('text-danger-dark');
  });
});
