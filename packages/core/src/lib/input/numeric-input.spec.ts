import { describe, it, expect } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/svelte';
import Input from './numeric-input.svelte';

describe('Numeric Input', () => {
  it('Renders the input', () => {
    render(Input, { placeholder: 'Enter a number' });
    expect(screen.getByPlaceholderText('Enter a number')).toHaveAttribute(
      'type',
      'number'
    );
  });

  it('Should increment by one on arrowup keydown', async () => {
    render(Input, { placeholder: 'Enter a number' });

    const input: HTMLInputElement =
      screen.getByPlaceholderText('Enter a number');

    expect(input.value).toBe('');

    await fireEvent.keyDown(input, { key: 'arrowup' });
    expect(input.value).toBe('1');

    await fireEvent.keyDown(input, { key: 'arrowup' });
    expect(input.value).toBe('2');
  });

  it('Should decrement by two on arrowdown keydown', async () => {
    render(Input, { placeholder: 'Enter a number', step: 2 });

    const input: HTMLInputElement =
      screen.getByPlaceholderText('Enter a number');

    expect(input.value).toBe('');

    await fireEvent.keyDown(input, { key: 'arrowdown' });
    expect(input.value).toBe('-2');

    await fireEvent.keyDown(input, { key: 'arrowdown' });
    expect(input.value).toBe('-4');
  });

  it('Strips decimal values when type is integer', async () => {
    render(Input, { placeholder: 'Enter a number', type: 'integer' });

    const input: HTMLInputElement =
      screen.getByPlaceholderText('Enter a number');

    await fireEvent.input(input, { target: { value: '12.34' } });
    expect(input.value).toBe('12');
  });
});
