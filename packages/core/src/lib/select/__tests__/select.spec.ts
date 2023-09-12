import { describe, it, expect, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/svelte';
import Select from '../select.svelte';
import SelectSpec from './select.spec.svelte';
import { cxTestArguments, cxTestResults } from '$lib/__tests__/cx-test';

describe('Select', () => {
  it('Renders the select', () => {
    render(Select, { placeholder: 'Select an option' });

    const select = screen.getByPlaceholderText('Select an option');

    expect(select).toHaveClass(
      'h-[30px] w-full appearance-none border px-2 py-1.5 text-xs leading-tight outline-none'
    );

    expect(select).not.toHaveClass(
      'bg-disabled-light text-disabled-dark border-disabled-light pointer-events-none'
    );
  });

  it('Selects an option', async () => {
    render(SelectSpec, { placeholder: 'Select an option' });

    const select: HTMLSelectElement =
      screen.getByPlaceholderText('Select an option');

    await fireEvent.change(select, { target: { value: 'Option 2' } });

    expect(select.value).toBe('Option 2');
  });

  it('Renders the select as disabled', () => {
    render(Select, { placeholder: 'Select an option', disabled: true });

    const select = screen.getByPlaceholderText('Select an option');

    expect(select).toHaveClass(
      'h-[30px] w-full appearance-none border px-2 py-1.5 text-xs leading-tight outline-none'
    );

    expect(select).toHaveClass(
      'bg-disabled-light text-disabled-dark border-disabled-light cursor-not-allowed'
    );

    expect(select).toHaveAttribute('aria-disabled', 'true');
  });

  it('Renders the select in the warn state', () => {
    render(Select, {
      placeholder: 'Select an option',
      state: 'warn',
    });

    const select = screen.getByPlaceholderText('Select an option');

    expect(select).toHaveClass(
      'border-warning-bright focus:outline-warning-bright focus:outline-[1.5px] focus:-outline-offset-1'
    );
  });

  it('Renders the select in the error state', () => {
    render(Select, {
      placeholder: 'Select an option',
      state: 'error',
    });

    const select = screen.getByPlaceholderText('Select an option');

    expect(select).toHaveClass(
      'border-danger-dark focus:outline-danger-dark focus:outline-[1.5px] focus:-outline-offset-1'
    );
  });

  it('Emits the change event', async () => {
    const onChange = vi.fn();
    const { component } = render(SelectSpec, {
      placeholder: 'Select an option',
    });

    component.$on('change', onChange);

    const select: HTMLSelectElement =
      screen.getByPlaceholderText('Select an option');

    await fireEvent.change(select, { target: { value: 'Option 2' } });

    expect(onChange).toHaveBeenCalledOnce();
  });

  it('Does not emit the change event when disabled', async () => {
    const onChange = vi.fn();
    const { component } = render(SelectSpec, {
      placeholder: 'Select an option',
      disabled: true,
    });

    component.$on('change', onChange);

    const select: HTMLSelectElement =
      screen.getByPlaceholderText('Select an option');

    await fireEvent.change(select, { target: { value: 'Option 2' } });

    expect(onChange).toHaveBeenCalledTimes(0);
  });

  it('Emits the mousedown event', async () => {
    const onMouseDown = vi.fn();
    const { component } = render(SelectSpec, {
      placeholder: 'Select an option',
    });

    component.$on('mousedown', onMouseDown);

    const select: HTMLSelectElement =
      screen.getByPlaceholderText('Select an option');

    await fireEvent.mouseDown(select);

    expect(onMouseDown).toHaveBeenCalledOnce();
  });

  it('Does not emit the mousedown event when disabled', async () => {
    const onMouseDown = vi.fn();
    const { component } = render(SelectSpec, {
      placeholder: 'Select an option',
      disabled: true,
    });

    component.$on('mousedown', onMouseDown);

    const select: HTMLSelectElement =
      screen.getByPlaceholderText('Select an option');

    await fireEvent.mouseDown(select);

    expect(onMouseDown).toHaveBeenCalledTimes(0);
  });

  it('Emits the keydown event', async () => {
    const onKeydown = vi.fn();
    const { component } = render(SelectSpec, {
      placeholder: 'Select an option',
    });

    component.$on('keydown', onKeydown);

    const select: HTMLSelectElement =
      screen.getByPlaceholderText('Select an option');

    await fireEvent.keyDown(select);

    expect(onKeydown).toHaveBeenCalledOnce();
  });

  it('Does not emit the keydown event when disabled', async () => {
    const onKeydown = vi.fn();
    const { component } = render(SelectSpec, {
      placeholder: 'Select an option',
      disabled: true,
    });

    component.$on('keydown', onKeydown);

    const select: HTMLSelectElement =
      screen.getByPlaceholderText('Select an option');

    await fireEvent.keyDown(select);

    expect(onKeydown).toHaveBeenCalledTimes(0);
  });

  it('Does not emit the keydown event when disabled if code is tab', async () => {
    const onKeydown = vi.fn();
    const { component } = render(SelectSpec, {
      placeholder: 'Select an option',
      disabled: true,
    });

    component.$on('keydown', onKeydown);

    const select: HTMLSelectElement =
      screen.getByPlaceholderText('Select an option');

    await fireEvent.keyDown(select, { code: 'Tab' });

    expect(onKeydown).toHaveBeenCalledOnce();
  });

  it('Renders with the passed cx classes', () => {
    render(Select, { placeholder: 'Enter your name', cx: cxTestArguments });
    expect(screen.getByPlaceholderText('Enter your name')).toHaveClass(
      cxTestResults
    );
  });
});
