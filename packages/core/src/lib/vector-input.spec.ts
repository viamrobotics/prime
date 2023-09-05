import { describe, it, expect } from 'vitest';
import { render, fireEvent } from '@testing-library/svelte';
import VectorInput from './vector-input.svelte';

describe('VectorInput', () => {
  it('should render correct labels', () => {
    const { getByText } = render(VectorInput, {
      labels: ['a', 'b', 'c']
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
        z: 30
      }
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
        z: '2'
      }
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
        z: 2
      }
    });

    const xInput = getByDisplayValue(0);
    await fireEvent.input(xInput, { target: { valueAsNumber: 10 } });

    expect(getByDisplayValue(10)).toBeInTheDocument();
  });

  it('should make inputs readonly when readonly is set', () => {
    const { getByDisplayValue} = render(VectorInput, {
      readonly: true,
      values: {
        x: 0,
        y: 1,
        z: 2
      }
    });
    const xInput = getByDisplayValue(0) as HTMLInputElement;
    expect(xInput.readOnly).toBeTruthy();
  });
});
