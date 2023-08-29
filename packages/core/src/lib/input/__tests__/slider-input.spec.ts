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

    const slider = screen.getByRole('button', { hidden: true });

    console.log('hi', slider);

    await fireEvent.pointerDown(slider, { clientX: 0 });
    await fireEvent.pointerMove(document, { clientX: 200 });
    await fireEvent.pointerUp(document);

    expect(input.valueAsNumber).toBeGreaterThan(0);

    await fireEvent.pointerDown(slider, { clientX: 0 });
    await fireEvent.pointerMove(document, { clientX: -300 });
    await fireEvent.pointerUp(document);

    expect(input.valueAsNumber).toBe(0);
  });

  it('It should not allow sliding above max', async () => {
    render(SliderInput, { placeholder: 'Enter a number', max: 50 });

    const input: HTMLInputElement =
      screen.getByPlaceholderText('Enter a number');

    const slider = screen.getByRole('button', { hidden: true });

    await fireEvent.pointerDown(slider, { clientX: 0 });
    await fireEvent.pointerMove(document, { clientX: 200 });
    await fireEvent.pointerUp(document);

    expect(input.valueAsNumber).toBeGreaterThan(0);
    expect(input.valueAsNumber).toBeLessThanOrEqual(50);

    await fireEvent.pointerDown(slider);
    await fireEvent.pointerMove(document, { clientX: 1000 });
    await fireEvent.pointerUp(document);

    expect(input.valueAsNumber).toBe(50);
  });

  it('It slide in increments of step', async () => {
    render(SliderInput, { placeholder: 'Enter a number', step: 10 });

    const input: HTMLInputElement =
      screen.getByPlaceholderText('Enter a number');

    const slider = screen.getByRole('button', { hidden: true });

    await fireEvent.pointerDown(slider, { clientX: 0 });
    await fireEvent.pointerMove(document, { clientX: 200 });
    await fireEvent.pointerUp(document);

    expect(input.valueAsNumber).toBeGreaterThan(0);
    expect(input.valueAsNumber % 10).toBe(0);

    await fireEvent.pointerDown(slider, { clientX: 0 });
    await fireEvent.pointerMove(document, { clientX: 250 });
    await fireEvent.pointerUp(document);

    expect(input.valueAsNumber % 10).toBe(0);

    await fireEvent.pointerDown(slider, { clientX: 0 });
    await fireEvent.pointerMove(document, { clientX: 383 });
    await fireEvent.pointerUp(document);

    expect(input.valueAsNumber % 10).toBe(0);
  });
});
