import { describe, it, expect, vi } from "vitest";
import { render, fireEvent} from '@testing-library/svelte';
import VectorInput from "./vector-input.svelte";

describe('VectorInput', () => {
  it('Renders the VectorInput label and placeholders', () => {
    const { getByText, getAllByPlaceholderText } = render(VectorInput, {
      label: 'Position',
      placeholders: ['x', 'y', 'z', 'w'],
    });

    expect(getByText('Position')).toBeVisible();
    const placeholders = ['x', 'y', 'z', 'w'];
    const inputPlaceholders = getAllByPlaceholderText(/[w-z]/iu);
    for (const [index, input] of inputPlaceholders.entries()) {
      const inputEl = input as HTMLInputElement;
      expect(inputEl).toHaveAttribute('placeholder', placeholders[index]);
    }
  });

  it('Updates input values correctly on user input', async () => {
    const { getAllByPlaceholderText } = render(VectorInput, {
      placeholders: ['x', 'y', 'z'],
    });

    const inputPlaceholders = getAllByPlaceholderText(/[x-z]/iu);
    await fireEvent.input(inputPlaceholders[0] as HTMLInputElement, { target: { value: '1' } });
    await fireEvent.input(inputPlaceholders[1] as HTMLInputElement, { target: { value: '2' } });
    await fireEvent.input(inputPlaceholders[2] as HTMLInputElement, { target: { value: '3' } });

    expect(inputPlaceholders[0]).toHaveValue(1);
    expect(inputPlaceholders[1]).toHaveValue(2);
    expect(inputPlaceholders[2]).toHaveValue(3);
  });

  it('Emits input event with correct values', async () => {
    const { getAllByPlaceholderText, component } = render(VectorInput, {
      placeholders: ['x', 'y', 'z'],
    });

    const onInput = vi.fn();
    component.$on('input', onInput);

    const inputPlaceholders = getAllByPlaceholderText(/[x-z]/iu);
    await fireEvent.input(inputPlaceholders[0] as HTMLInputElement, { target: { value: '1' } });
    await fireEvent.input(inputPlaceholders[1] as HTMLInputElement, { target: { value: '2' } });
    await fireEvent.input(inputPlaceholders[2] as HTMLInputElement, { target: { value: '3' } });

    expect(onInput).toHaveBeenCalled();
    expect(onInput).toHaveBeenCalledWith(
      expect.objectContaining({ detail: { value: [1, 2, 3] } })
    );
  });
});
