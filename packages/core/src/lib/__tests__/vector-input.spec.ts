import { describe, it, expect, vi } from 'vitest';
import { render, fireEvent, screen } from '@testing-library/svelte';
import VectorInput from '../vector-input.svelte';

describe('VectorInput', () => {
  it('should render correct labels', () => {
    const { getByText } = render(VectorInput, {
      labels: ['a', 'b', 'c'],
    });
    expect(getByText('a')).toBeInTheDocument();
    expect(getByText('b')).toBeInTheDocument();
    expect(getByText('c')).toBeInTheDocument();
  });

  it('should set initial values correctly', () => {
    const { getByDisplayValue } = render(VectorInput, {
      values: {
        x: 10,
        y: 20,
        z: 30,
      },
    });

    expect(getByDisplayValue('10')).toBeInTheDocument();
    expect(getByDisplayValue('20')).toBeInTheDocument();
    expect(getByDisplayValue('30')).toBeInTheDocument();
  });

  it('should render three number inputs', () => {
    const { getByPlaceholderText } = render(VectorInput, {
      placeholders: {
        x: '0',
        y: '1',
        z: '2',
      },
    });

    expect(getByPlaceholderText('0')).toBeInTheDocument();
    expect(getByPlaceholderText('0')).toBeInTheDocument();
    expect(getByPlaceholderText('0')).toBeInTheDocument();
  });

  it('should update input values on input', async () => {
    const { getByDisplayValue } = render(VectorInput, {
      values: {
        x: 0,
        y: 1,
        z: 2,
      },
    });

    const xInput = getByDisplayValue(0);
    await fireEvent.input(xInput, { target: { valueAsNumber: 10 } });

    expect(getByDisplayValue(10)).toBeInTheDocument();
  });

  it('should make inputs readonly when readonly is set', () => {
    const { getByDisplayValue } = render(VectorInput, {
      readonly: true,
      values: {
        x: 0,
        y: 1,
        z: 2,
      },
    });
    const xInput = getByDisplayValue(0) as HTMLInputElement;
    expect(xInput.readOnly).toBeTruthy();
  });

  it('should emit the input event when the slider moves', async () => {
    const { component } = render(VectorInput);
    const onInput = vi.fn();
    component.$on('input', onInput);

    const [slider] = screen.getAllByRole('button', { hidden: true });

    if (!slider) {
      throw new Error('No slider found!');
    }

    await fireEvent.pointerDown(slider, { clientX: 0 });
    await fireEvent.pointerMove(document, { clientX: 200 });

    expect(onInput).toHaveBeenCalledTimes(1);

    await fireEvent.pointerDown(slider, { clientX: 0 });
    await fireEvent.pointerMove(document, { clientX: -300 });

    expect(onInput).toHaveBeenCalledTimes(2);
  });

  it('Emits the input and change events when the input is changed', async () => {
    const { component } = render(VectorInput, {
      placeholders: { x: '0', y: '1', z: '2' },
    });

    const onChange = vi.fn();

    component.$on('change', onChange);

    const input: HTMLInputElement = screen.getByPlaceholderText('0');

    await fireEvent.change(input, { target: { value: 20 } });

    expect(onChange).toHaveBeenCalled();
  });
});
