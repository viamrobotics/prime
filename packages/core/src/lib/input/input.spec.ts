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
    render(Input, { placeholder: 'Enter your name', state: 'info' });

    const iconWrapper = screen.getByRole('img').parentElement;
    const iconTitle = screen.getByTitle('information icon');

    expect(iconWrapper).toHaveClass('text-info-dark');
    expect(iconTitle).toBeInTheDocument();
  });

  it('Renders the input in the warn state', () => {
    render(Input, { placeholder: 'Enter your name', state: 'warn' });

    const iconWrapper = screen.getByRole('img').parentElement;
    const iconTitle = screen.getByTitle('alert icon');

    expect(iconWrapper).toHaveClass('text-warning-bright');
    expect(iconTitle).toBeInTheDocument();
  });

  it('Renders the input in the error state', () => {
    render(Input, { placeholder: 'Enter your name', state: 'error' });

    const iconWrapper = screen.getByRole('img').parentElement;
    const iconTitle = screen.getByTitle('alert-circle icon');

    expect(iconWrapper).toHaveClass('text-danger-dark');
    expect(iconTitle).toBeInTheDocument();
  });
});
