import { describe, it, expect, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/svelte';
import { SliderInput } from '$lib';
import { cxTestArguments, cxTestResults } from '$lib/__tests__/cx-test';

describe('Slider Input', () => {
  it('Renders the input', () => {
    render(SliderInput, { placeholder: 'Enter a number' });
    expect(screen.getByPlaceholderText('Enter a number')).toHaveAttribute(
      'type',
      'number'
    );
  });

  it('It should not allow sliding below min', async () => {
    render(SliderInput, {
      placeholder: 'Enter a number',
      min: 0,
    });

    const input: HTMLInputElement =
      screen.getByPlaceholderText('Enter a number');

    const slider = screen.getByRole('button', { hidden: true });

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

  it('It slides in increments of step', async () => {
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

  it('Emits the input event when the slider moves', async () => {
    const { component } = render(SliderInput, {
      placeholder: 'Enter a number',
    });
    const onInput = vi.fn();
    component.$on('input', onInput);

    const slider = screen.getByRole('button', { hidden: true });

    await fireEvent.pointerDown(slider, { clientX: 0 });
    await fireEvent.pointerMove(document, { clientX: 200 });

    expect(onInput).toHaveBeenCalledTimes(1);

    await fireEvent.pointerDown(slider, { clientX: 0 });
    await fireEvent.pointerMove(document, { clientX: -300 });

    expect(onInput).toHaveBeenCalledTimes(2);
  });

  it('Emits the change event when the slider is released', async () => {
    const { component } = render(SliderInput, {
      placeholder: 'Enter a number',
    });
    const onChange = vi.fn();
    component.$on('change', onChange);

    const slider = screen.getByRole('button', { hidden: true });

    await fireEvent.pointerDown(slider, { clientX: 0 });
    await fireEvent.pointerMove(document, { clientX: 200 });

    expect(onChange).toHaveBeenCalledTimes(0);

    await fireEvent.pointerDown(slider, { clientX: 0 });
    await fireEvent.pointerMove(document, { clientX: -300 });

    expect(onChange).toHaveBeenCalledTimes(0);

    await fireEvent.pointerUp(document);

    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('Emits the input and change events when the input is changed', async () => {
    const { component } = render(SliderInput, {
      placeholder: 'Enter a number',
    });

    const onInput = vi.fn();
    const onChange = vi.fn();

    component.$on('input', onInput);
    component.$on('change', onChange);

    const input: HTMLInputElement =
      screen.getByPlaceholderText('Enter a number');

    await fireEvent.change(input, { target: { value: 20 } });

    expect(onInput).toHaveBeenCalled();
    expect(onChange).toHaveBeenCalled();
  });

  it('Renders with the passed cx classes', () => {
    render(SliderInput, {
      placeholder: 'Enter a number',
      cx: cxTestArguments,
    });

    expect(
      screen.getByPlaceholderText('Enter a number').parentElement?.parentElement
    ).toHaveClass(cxTestResults);
  });
});
