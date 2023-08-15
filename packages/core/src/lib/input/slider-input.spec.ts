import { describe, it, expect } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/svelte';
import Input from './slider-input.svelte';

describe('Slider Input', () => {
  it('Renders the input', () => {
    render(Input, { placeholder: 'Enter a number' });
    expect(screen.getByPlaceholderText('Enter a number')).toHaveAttribute(
      'type',
      'number'
    );
  });

  it('It should not allow sliding below min', async () => {
    render(Input, { placeholder: 'Enter a number', min: 0 });

    const input: HTMLInputElement =
      screen.getByPlaceholderText('Enter a number');

    const slider = input.parentElement?.nextElementSibling;

    await fireEvent.pointerDown(slider!, { clientX: 0 });
    await fireEvent.pointerMove(window!, { clientX: 200 });
    await fireEvent.pointerUp(window!);

    expect(Number.parseFloat(input.value)).toBeGreaterThan(0);

    await fireEvent.pointerDown(slider!, { clientX: 0 });
    await fireEvent.pointerMove(window!, { clientX: -300 });
    await fireEvent.pointerUp(window!);

    expect(Number.parseFloat(input.value)).toBe(0);
  });

  it('It should not allow sliding above max', async () => {
    render(Input, { placeholder: 'Enter a number', max: 50 });

    const input: HTMLInputElement =
      screen.getByPlaceholderText('Enter a number');

    const slider = input.parentElement?.nextElementSibling;

    await fireEvent.pointerDown(slider!, { clientX: 0 });
    await fireEvent.pointerMove(window!, { clientX: 200 });
    await fireEvent.pointerUp(window!);

    expect(Number.parseFloat(input.value)).toBeGreaterThan(0);
    expect(Number.parseFloat(input.value)).toBeLessThan(50);

    await fireEvent.pointerDown(slider!, { clientX: 0 });
    await fireEvent.pointerMove(window!, { clientX: 1000 });
    await fireEvent.pointerUp(window!);

    expect(Number.parseFloat(input.value)).toBe(50);
  });

  it('It slide in increments of step', async () => {
    render(Input, { placeholder: 'Enter a number', step: 10 });

    const input: HTMLInputElement =
      screen.getByPlaceholderText('Enter a number');

    const slider = input.parentElement?.nextElementSibling;

    await fireEvent.pointerDown(slider!, { clientX: 0 });
    await fireEvent.pointerMove(window!, { clientX: 200 });
    await fireEvent.pointerUp(window!);

    expect(Number.parseFloat(input.value)).toBeGreaterThan(0);
    expect(Number.parseFloat(input.value) % 10).toBe(0);

    await fireEvent.pointerDown(slider!, { clientX: 0 });
    await fireEvent.pointerMove(window!, { clientX: 250 });
    await fireEvent.pointerUp(window!);

    expect(Number.parseFloat(input.value) % 10).toBe(0);

    await fireEvent.pointerDown(slider!, { clientX: 0 });
    await fireEvent.pointerMove(window!, { clientX: 383 });
    await fireEvent.pointerUp(window!);

    expect(Number.parseFloat(input.value) % 10).toBe(0);
  });
});
