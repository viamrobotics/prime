import { describe, it, expect, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/svelte';
import { cxTestArguments, cxTestResults } from '$lib/__tests__/cx-test';
import { RangeInput } from '$lib';

describe('Range Input', () => {
  it('Renders the inputs', () => {
    render(RangeInput);
    expect(screen.getByRole('spinbutton')).toHaveAttribute('type', 'number');
    expect(screen.getByRole('slider')).toHaveAttribute('type', 'range');
  });

  it('Renders the inputs as readonly', () => {
    render(RangeInput, { readonly: true });

    const input = screen.getByRole('spinbutton');
    const slider = screen.getByRole('slider');

    expect(input).toHaveClass(
      'h-7.5 w-full appearance-none border px-2 py-1.5 text-xs leading-tight outline-none'
    );

    expect(input).toHaveClass('bg-light border-transparent');
    expect(input).not.toHaveAttribute('aria-disabled');

    expect(slider).toHaveClass(
      'slider-track-disabled-light slider-track-cursor-not-allowed slider-thumb-cursor-not-allowed cursor-not-allowed'
    );

    expect(slider).not.toHaveAttribute('aria-disabled');
  });

  it('Renders the inputs as disabled', () => {
    render(RangeInput, { disabled: true });

    const input = screen.getByRole('spinbutton');
    const slider = screen.getByRole('slider');

    expect(input).toHaveClass(
      'h-7.5 w-full appearance-none border px-2 py-1.5 text-xs leading-tight outline-none'
    );

    expect(input).toHaveClass(
      'bg-disabled-light text-disabled-dark border-disabled-light cursor-not-allowed'
    );

    expect(input).toHaveAttribute('aria-disabled', 'true');

    expect(slider).toHaveClass(
      'slider-track-disabled-light slider-track-cursor-not-allowed slider-thumb-cursor-not-allowed cursor-not-allowed'
    );

    expect(slider).toHaveAttribute('aria-disabled');
  });

  it('Renders the pips', () => {
    render(RangeInput);

    const slider = screen.getByRole<HTMLInputElement>('slider');

    expect(slider.list?.children.length).toBe(21);
  });

  it('It should not allow sliding below min', async () => {
    render(RangeInput, {
      min: 0,
    });

    const slider = screen.getByRole<HTMLInputElement>('slider');

    await fireEvent.change(slider, { target: { value: 50 } });

    expect(slider.valueAsNumber).toBe(50);

    await fireEvent.change(slider, { target: { value: -50 } });

    expect(slider.valueAsNumber).toBe(0);
  });

  it('It should not allow sliding above max', async () => {
    render(RangeInput, {
      max: 100,
    });

    const slider = screen.getByRole<HTMLInputElement>('slider');

    await fireEvent.change(slider, { target: { value: 150 } });

    expect(slider.valueAsNumber).toBe(100);
  });

  /**
   * TODO (DTCurrie): It is difficult to test step values since we can really only directly
   * set the value of range inputs using a change call. Range and numeric inputs do not support
   * changing values with arrow keys, which would be the ideal solution for testing these. Once
   * those are supported, we should be able to uncomment these tests.
   *
   * See:
   * https://github.com/testing-library/user-event/issues/1066
   * https://github.com/testing-library/user-event/issues/1067
   */
  it.skip('It should slide at increments of step', async () => {
    render(RangeInput, {
      max: 100,
      step: 5,
    });

    const slider = screen.getByRole<HTMLInputElement>('slider');

    await fireEvent.keyDown(slider, { key: 'ArrowRight' });

    expect(slider.valueAsNumber).toBe(5);

    await fireEvent.keyDown(slider, { key: 'ArrowUp' });

    expect(slider.valueAsNumber).toBe(10);
  });

  it('Emits the input and change events when the input is changed', async () => {
    const { component } = render(RangeInput);

    const onInput = vi.fn();
    const onChange = vi.fn();

    component.$on('input', onInput);
    component.$on('change', onChange);

    const input: HTMLInputElement = screen.getByRole('spinbutton');

    await fireEvent.input(input, { target: { value: 1 } });

    expect(onInput).toHaveBeenCalledTimes(1);

    await fireEvent.change(input, { target: { value: 2 } });

    expect(onChange).toHaveBeenCalledTimes(1);

    const slider: HTMLInputElement = screen.getByRole('slider');

    await fireEvent.input(slider, { target: { value: 3 } });

    expect(onInput).toHaveBeenCalledTimes(2);

    await fireEvent.change(slider, { target: { value: 4 } });

    expect(onChange).toHaveBeenCalledTimes(2);
  });

  it('Does not emit the input and change events when the input is disabled', async () => {
    const { component } = render(RangeInput, { disabled: true });

    const onInput = vi.fn();
    const onChange = vi.fn();

    component.$on('input', onInput);
    component.$on('change', onChange);

    const input: HTMLInputElement = screen.getByRole('spinbutton');

    await fireEvent.input(input, { target: { value: 1 } });

    expect(onInput).toHaveBeenCalledTimes(0);

    await fireEvent.change(input, { target: { value: 2 } });

    expect(onChange).toHaveBeenCalledTimes(0);

    const slider: HTMLInputElement = screen.getByRole('slider');

    await fireEvent.input(slider, { target: { value: 3 } });

    expect(onInput).toHaveBeenCalledTimes(0);

    await fireEvent.change(slider, { target: { value: 4 } });

    expect(onChange).toHaveBeenCalledTimes(0);
  });

  it('Renders with the passed cx classes', () => {
    render(RangeInput, {
      cx: cxTestArguments,
    });

    const container =
      screen.getByRole('spinbutton').parentElement?.parentElement;

    expect(container).toHaveClass(cxTestResults);
  });
});
