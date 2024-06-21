import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import { NumericInput } from '$lib';
import { cxTestArguments, cxTestResults } from '$lib/__tests__/cx-test';

describe('Numeric Input', () => {
  it('Renders the input', () => {
    render(NumericInput, { placeholder: 'Enter a number' });
    expect(screen.getByPlaceholderText('Enter a number')).toHaveAttribute(
      'type',
      'number'
    );
  });

  it('Should set the input value', () => {
    render(NumericInput, { placeholder: 'Enter a number', value: 3.4 });

    const input =
      screen.getByPlaceholderText<HTMLInputElement>('Enter a number');

    // valueAsNumber should be used to retrieve input type=number values
    expect(input.valueAsNumber).toBe(3.4);
  });

  it('Is invalid type is integer and value is decimal', () => {
    render(NumericInput, {
      placeholder: 'Enter a number',
      type: 'integer',
      value: 12.34,
    });

    const input =
      screen.getByPlaceholderText<HTMLInputElement>('Enter a number');

    expect(input.checkValidity()).toBe(false);
  });

  it('Does not accept negative numbers when disallowed', () => {
    render(NumericInput, {
      placeholder: 'Enter a number',
      type: 'number',
      acceptNegative: false,
      value: -12.34,
    });

    const input =
      screen.getByPlaceholderText<HTMLInputElement>('Enter a number');

    expect(input.checkValidity()).toBe(false);
  });

  it('Renders with the passed cx classes', () => {
    render(NumericInput, {
      placeholder: 'Enter a number',
      cx: cxTestArguments,
    });

    expect(screen.getByPlaceholderText('Enter a number')).toHaveClass(
      cxTestResults
    );
  });
});
