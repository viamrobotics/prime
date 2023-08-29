import { describe, it, expect } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/svelte';
import { SliderInput } from '$lib';

describe('Slider Input', () => {
  it('Renders the input', () => {
    render(SliderInput, { placeholder: 'Enter a number' });
    expect(screen.getByPlaceholderText('Enter a number')).toHaveAttribute(
      'type',
      'number'
    );
  });

  it('It should not allow sliding below min', async () => {
    render(SliderInput, { placeholder: 'Enter a number', min: 0 });

    const input: HTMLInputElement =
      screen.getByPlaceholderText('Enter a number');

    const slider = input.parentElement?.nextElementSibling;

    await fireEvent.pointerDown(slider!, { clientX: 0 });
    await fireEvent.pointerMove(window!, { clientX: 200 });
    await fireEvent.pointerUp(window!);

    expect(input.valueAsNumber).toBeGreaterThanOrEqual(0);

    await fireEvent.pointerDown(slider!, { clientX: 0 });
    await fireEvent.pointerMove(window!, { clientX: -300 });
    await fireEvent.pointerUp(window!);

    expect(input.valueAsNumber).toBe(0);
  });

  it('It should not allow sliding above max', async () => {
    const results = render(SliderInput, { placeholder: 'Enter a number', max: 50 });

    const input: HTMLInputElement =
      screen.getByPlaceholderText('Enter a number');

    console.log(results.container)

    const slider = input.parentElement?.nextElementSibling;

    await fireEvent.pointerDown(slider!, { clientX: 0 });
    await fireEvent.pointerMove(window!, { clientX: 200 });
    await fireEvent.pointerUp(window!);

    expect(input.valueAsNumber).toBeGreaterThanOrEqual(0);
    expect(input.valueAsNumber).toBeLessThanOrEqual(50);

    await fireEvent.pointerDown(slider!, { clientX: 0 });
    await fireEvent.pointerMove(window!, { clientX: 1000 });
    await fireEvent.pointerUp(window!);

    expect(input.valueAsNumber).toBe(50);
  });

  it('It slide in increments of step', async () => {
    render(SliderInput, { placeholder: 'Enter a number', step: 10 });

    const input: HTMLInputElement =
      screen.getByPlaceholderText('Enter a number');

    const slider = input.parentElement?.nextElementSibling;

    await fireEvent.pointerDown(slider!, { clientX: 0 });
    await fireEvent.pointerMove(window!, { clientX: 200 });
    await fireEvent.pointerUp(window!);

    expect(input.valueAsNumber).toBeGreaterThanOrEqual(0);
    expect(input.valueAsNumber % 10).toBe(0);

    await fireEvent.pointerDown(slider!, { clientX: 0 });
    await fireEvent.pointerMove(window!, { clientX: 250 });
    await fireEvent.pointerUp(window!);

    expect(input.valueAsNumber % 10).toBe(0);

    await fireEvent.pointerDown(slider!, { clientX: 0 });
    await fireEvent.pointerMove(window!, { clientX: 383 });
    await fireEvent.pointerUp(window!);

    expect(input.valueAsNumber % 10).toBe(0);
  });
});
