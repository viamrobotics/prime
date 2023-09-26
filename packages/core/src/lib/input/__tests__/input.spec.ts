import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import { Input } from '$lib';
import { cxTestArguments, cxTestResults } from '$lib/__tests__/cx-test';

describe('Input', () => {
  it('Renders the input', () => {
    render(Input, { placeholder: 'Enter your name' });

    const input = screen.getByPlaceholderText('Enter your name');

    expect(input).toHaveClass(
      'h-[30px] w-full appearance-none border px-2 py-1.5 text-xs leading-tight outline-none'
    );

    expect(input).not.toHaveClass(
      'bg-disabled-light text-disabled-dark border-disabled-light cursor-not-allowed'
    );
  });

  it('Renders the input as disabled', () => {
    render(Input, { placeholder: 'Enter your name', disabled: true });

    const input = screen.getByPlaceholderText('Enter your name');

    expect(input).toHaveClass(
      'h-[30px] w-full appearance-none border px-2 py-1.5 text-xs leading-tight outline-none'
    );

    expect(input).toHaveClass(
      'bg-disabled-light text-disabled-dark border-disabled-light cursor-not-allowed'
    );

    expect(input).toHaveAttribute('aria-disabled', 'true');
  });

  it('Renders the input as readonly', () => {
    render(Input, { placeholder: 'Enter your name', readonly: true });

    const input = screen.getByPlaceholderText('Enter your name');

    expect(input).toHaveClass(
      'h-[30px] w-full appearance-none border px-2 py-1.5 text-xs leading-tight outline-none'
    );

    expect(input).toHaveClass('bg-light border-transparent');
    expect(input).not.toHaveAttribute('aria-disabled');
  });

  it('Renders the input in the info state', () => {
    const { container } = render(Input, {
      placeholder: 'Enter your name',
      state: 'info',
    });
    const svg = container.querySelector('svg');

    expect(svg).toBeInTheDocument();
    expect(svg).toHaveClass('text-info-dark');
  });

  it('Renders the input in the warn state', () => {
    const { container } = render(Input, {
      placeholder: 'Enter your name',
      state: 'warn',
    });
    const svg = container.querySelector('svg');

    expect(svg).toBeInTheDocument();
    expect(svg).toHaveClass('text-warning-bright');
  });

  it('Renders the input in the error state', () => {
    const { container } = render(Input, {
      placeholder: 'Enter your name',
      state: 'error',
    });
    const svg = container.querySelector('svg');

    expect(svg).toBeInTheDocument();
    expect(svg).toHaveClass('text-danger-dark');
  });

  it('Renders with the passed cx classes', () => {
    render(Input, { placeholder: 'Enter your name', cx: cxTestArguments });
    expect(screen.getByPlaceholderText('Enter your name')).toHaveClass(
      cxTestResults
    );
  });
});
