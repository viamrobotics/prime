import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import PreventHandler from './prevent-handler.spec.svelte';

describe('preventHandler', () => {
  it('Emits the click event', async () => {
    const onClick = vi.fn();
    const { component } = render(PreventHandler);

    component.$on('click', onClick);

    const button = screen.getByText('Prevented');

    await userEvent.click(button);

    expect(onClick).toHaveBeenCalledOnce();
  });

  it('Does not emit the change event when prevent is true', async () => {
    const onClick = vi.fn();
    const { component } = render(PreventHandler, { prevent: true });

    component.$on('click', onClick);

    const button = screen.getByText('Prevented');

    await userEvent.click(button);

    expect(onClick).toHaveBeenCalledTimes(0);
  });

  it('Emits the keydown event', async () => {
    const onKeydown = vi.fn();
    const { component } = render(PreventHandler);

    component.$on('keydown', onKeydown);

    const button: HTMLButtonElement = screen.getByText('Prevented');
    button.focus();

    await userEvent.keyboard('[Enter]');

    expect(onKeydown).toHaveBeenCalledOnce();
  });

  it('Does not emit the keydown event when prevent is true', async () => {
    const onKeydown = vi.fn();
    const { component } = render(PreventHandler, { prevent: true });

    component.$on('keydown', onKeydown);

    const button: HTMLButtonElement = screen.getByText('Prevented');
    button.focus();

    await userEvent.keyboard('[Enter]');

    expect(onKeydown).toHaveBeenCalledTimes(0);
  });

  it('Does not emit the keydown event when prevent is true if code is tab', async () => {
    const onKeydown = vi.fn();
    const { component } = render(PreventHandler);

    component.$on('keydown', onKeydown);

    const button: HTMLButtonElement = screen.getByText('Prevented');
    button.focus();

    await userEvent.keyboard('[Tab]');

    expect(onKeydown).toHaveBeenCalledOnce();
  });

  it('Does not emit the keydown event when prevent is true if code is in allowedCodes', async () => {
    const onKeydown = vi.fn();
    const { component } = render(PreventHandler, {
      prevent: true,
      allowedCodes: ['Space'],
    });

    component.$on('keydown', onKeydown);

    const button: HTMLButtonElement = screen.getByText('Prevented');
    button.focus();

    await userEvent.keyboard('[Space]');

    expect(onKeydown).toHaveBeenCalledOnce();
  });
});
