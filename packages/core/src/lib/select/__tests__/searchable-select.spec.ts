import { describe, expect, it, vi } from 'vitest';
import { act, render, screen, within } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import type { ComponentProps } from 'svelte';

import { SearchableSelect as Subject, InputStates } from '$lib';

const onChange = vi.fn();
const onMultiChange = vi.fn();
const onFocus = vi.fn();
const onBlur = vi.fn();

const renderSubject = (props: Partial<ComponentProps<Subject>> = {}) => {
  return render(Subject, {
    options: ['hello from', 'the other side'],
    onChange,
    onMultiChange,
    onFocus,
    onBlur,
    ...props,
  });
};

const getResults = (): {
  search: HTMLElement;
  button: HTMLElement;
  list: HTMLElement;
  options: HTMLElement[];
} => {
  const search = screen.getByRole('combobox');
  const button = screen.getByRole('button');
  const list = screen.getByRole('listbox');
  const options = within(list).queryAllByRole('option');

  return { search, button, list, options };
};

describe('SearchableSelect', () => {
  it('is a combobox that controls a listbox', () => {
    renderSubject();

    const { search, button, list } = getResults();

    expect(list).toHaveAttribute('id', expect.any(String));
    expect(button).toHaveAttribute('aria-controls', list.id);
    expect(search).toHaveAttribute('aria-controls', list.id);
    expect(search).toHaveAttribute('aria-autocomplete', 'list');
    expect(search).not.toHaveAttribute('aria-multiselectable');
  });

  it('has a placeholder', () => {
    renderSubject({ placeholder: "It's me" });

    expect(getResults().search).toBe(screen.getByPlaceholderText("It's me"));
  });

  it.each([
    {
      state: InputStates.NONE,
      disabled: false,
      classNames: ['border-light', 'bg-white', 'focus:border-gray-9'],
    },
    {
      state: InputStates.WARN,
      disabled: false,
      classNames: [
        'border-warning-bright',
        'bg-white',
        'focus:outline-warning-bright',
      ],
    },
    {
      state: InputStates.ERROR,
      disabled: false,
      classNames: [
        'border-danger-dark',
        'bg-white',
        'focus:outline-danger-dark',
      ],
    },
    {
      state: InputStates.NONE,
      disabled: true,
      classNames: [
        'cursor-not-allowed',
        'border-disabled-light',
        'bg-disabled-light',
        'focus:border-disabled-dark',
      ],
    },
  ])(
    'displays state=$state, disabled=$disabled',
    ({ state, disabled, classNames }) => {
      renderSubject({ state, disabled });

      expect(getResults().search).toHaveClass(...classNames);
    }
  );

  it('expands the listbox on focus', async () => {
    const user = userEvent.setup();
    renderSubject();

    const { search, button, list } = getResults();

    expect(list).toHaveClass('hidden');
    expect(search).toHaveAttribute('aria-expanded', 'false');
    expect(button).toHaveAttribute('aria-expanded', 'false');

    await user.keyboard('{Tab}');

    expect(onFocus).toHaveBeenCalledOnce();
    expect(search).toHaveFocus();
    expect(list).not.toHaveClass('hidden');
    expect(button).toHaveAttribute('aria-expanded', 'true');
    expect(search).toHaveAttribute('aria-expanded', 'true');
  });

  it('expands the listbox on button click', async () => {
    renderSubject();

    const { search, button } = getResults();

    // TODO(mc, 2024-02-03): replace button.click with userEvent
    // https://github.com/testing-library/user-event/issues/1119
    await act(() => button.click());

    expect(search).toHaveFocus();
    expect(search).toHaveAttribute('aria-expanded', 'true');
  });

  it('does not expand the listbox if disabled', async () => {
    const user = userEvent.setup();
    renderSubject({ disabled: true });

    const { search } = getResults();
    await user.keyboard('{Tab}');

    expect(onFocus).toHaveBeenCalledOnce();
    expect(search).toHaveFocus();
    expect(search).toHaveAttribute('aria-expanded', 'false');
  });

  it('closes the listbox if no options', async () => {
    const user = userEvent.setup();
    renderSubject({ exclusive: true, sort: 'reduce' });

    const { search } = getResults();
    await user.type(search, 'asdf');

    expect(search).toHaveFocus();
    expect(search).toHaveAttribute('aria-expanded', 'false');
  });

  it('closes the listbox on second button click', async () => {
    renderSubject();

    const { search, button } = getResults();

    // TODO(mc, 2024-02-03): replace button.click with userEvent
    // https://github.com/testing-library/user-event/issues/1119
    await act(() => button.click());
    await act(() => button.click());

    expect(search).toHaveFocus();
    expect(search).toHaveAttribute('aria-expanded', 'false');
  });

  it('collapses the listbox on blur', async () => {
    const user = userEvent.setup();
    renderSubject();

    const { search } = getResults();

    await user.keyboard('{Tab}{Tab}');

    expect(onBlur).toHaveBeenCalledOnce();
    expect(search).not.toHaveFocus();
    expect(search).toHaveAttribute('aria-expanded', 'false');
  });

  it('has options', () => {
    renderSubject();

    const { search, options } = getResults();

    expect(options).toHaveLength(2);
    expect(options[0]).toHaveAccessibleName('hello from');
    expect(options[0]).toHaveAttribute('aria-selected', 'false');
    expect(options[1]).toHaveAccessibleName('the other side');
    expect(options[1]).toHaveAttribute('aria-selected', 'false');
    expect(search).not.toHaveAttribute('aria-activedescendant');
  });

  it('selects a clicked option', async () => {
    const user = userEvent.setup();
    renderSubject();

    const { search, options } = getResults();

    await user.click(search);
    // TODO(mc, 2024-02-03): replace .click with userEvent
    // https://github.com/testing-library/user-event/issues/1119
    await act(() => options[0]?.click());

    expect(search).toHaveFocus();
    expect(onChange).toHaveBeenCalledWith('hello from');
    expect(search).toHaveValue('hello from');
    expect(search).toHaveAttribute('aria-expanded', 'false');
    expect(search).not.toHaveAttribute('aria-activedescendant');
  });

  it('auto-selects search result on Enter', async () => {
    const user = userEvent.setup();
    renderSubject();

    const { search } = getResults();
    await user.type(search, 'the other');
    const { options } = getResults();

    expect(options[0]).toHaveAccessibleName('the other side');
    expect(options[0]).toHaveAttribute('aria-selected', 'true');
    expect(options[0]).toHaveAttribute('id', expect.any(String));
    expect(options[1]).toHaveAccessibleName('hello from');
    expect(options[1]).toHaveAttribute('aria-selected', 'false');
    expect(options[1]).not.toHaveAttribute('id', options[0]?.id);
    expect(search).toHaveAttribute('aria-activedescendant', options[0]?.id);

    await user.keyboard('{Enter}');

    expect(onChange).toHaveBeenCalledWith('the other side');
    expect(search).toHaveValue('the other side');
    expect(search).toHaveAttribute('aria-expanded', 'false');
    expect(options[0]).toHaveAttribute('aria-selected', 'false');
    expect(options[1]).toHaveAttribute('aria-selected', 'false');
    expect(search).not.toHaveAttribute('aria-activedescendant');
  });

  it('auto-selects search result on blur', async () => {
    const user = userEvent.setup();
    renderSubject();

    const { search } = getResults();
    await user.type(search, 'the other');
    await user.keyboard('{Tab}');

    expect(onChange).toHaveBeenCalledWith('the other side');
  });

  it('does not send multiple change events on blur', async () => {
    const user = userEvent.setup();
    renderSubject();

    await user.keyboard('{Tab}hello{Enter}{Tab}');

    expect(onChange).toHaveBeenCalledOnce();
  });

  it('keeps input value if menu closed on blur', async () => {
    const user = userEvent.setup();
    renderSubject();

    const { search } = getResults();
    await user.type(search, 'the other');
    await user.keyboard('{Escape}{Tab}');

    expect(onChange).toHaveBeenCalledWith('the other');
  });

  it('has an "other" option when not exclusive', async () => {
    const user = userEvent.setup();
    renderSubject();

    const { search } = getResults();
    await user.type(search, 'hello');
    const { options } = getResults();

    expect(options).toHaveLength(3);
    expect(options[0]).toHaveAccessibleName('hello from');
    expect(options[1]).toHaveAccessibleName('the other side');
    expect(options[2]).toHaveAccessibleName('hello');
    expect(options[2]).toHaveAttribute('aria-selected', 'false');
  });

  it('sets an "other" option as active when no search matches', async () => {
    const user = userEvent.setup();
    renderSubject();

    const { search } = getResults();
    await user.type(search, 'asdf');
    const { options } = getResults();

    expect(options[2]).toHaveAccessibleName('asdf');
    expect(options[2]).toHaveAttribute('aria-selected', 'true');
    expect(search).toHaveAttribute('aria-activedescendant', options[2]?.id);
  });

  it('has no "other" option when value empty', () => {
    renderSubject();

    const { options } = getResults();

    expect(options).toHaveLength(2);
  });

  it('has no "other" option when value matches', async () => {
    const user = userEvent.setup();
    renderSubject();

    const { search } = getResults();
    await user.type(search, 'hello from');
    const { options } = getResults();

    expect(options).toHaveLength(2);
  });

  it('has no "other" option when exclusive', async () => {
    const user = userEvent.setup();
    renderSubject({ exclusive: true });

    const { search } = getResults();
    await user.type(search, 'hello');
    const { options } = getResults();

    expect(options).toHaveLength(2);
  });

  it('has an "other" option when value matches exclusivity function', async () => {
    const user = userEvent.setup();
    renderSubject({ exclusive: (value: string) => value === 'hello' });

    const { search } = getResults();
    await user.type(search, 'hello');
    const { options } = getResults();

    expect(options).toHaveLength(3);
  });

  it('adds a prefix to the "other" option display text', async () => {
    const user = userEvent.setup();
    renderSubject({ otherOptionPrefix: 'You said:' });

    const { search } = getResults();
    await user.type(search, 'hello');
    const { options } = getResults();

    expect(options[2]).toHaveAccessibleName('You said: hello');
  });

  it('empties input value if closed and exclusive', async () => {
    const user = userEvent.setup();
    renderSubject({ exclusive: true });

    const { search } = getResults();
    await user.type(search, 'hello');
    await user.keyboard('{Escape}{Tab}');

    expect(onChange).toHaveBeenCalledWith('');
  });

  it('closes listbox on escape', async () => {
    const user = userEvent.setup();
    renderSubject();

    const { search } = getResults();
    await user.type(search, 'the other');
    await user.keyboard('{Escape}');

    expect(search).toHaveAttribute('aria-expanded', 'false');
    expect(search).toHaveValue('the other');
  });

  it('resets input after closing on escape', async () => {
    const user = userEvent.setup();
    renderSubject();

    const { search } = getResults();

    await user.type(search, 'the other');
    await user.keyboard('{Escape}{Escape}');

    expect(search).toHaveValue('');
  });

  it('reopens listbox on more typing', async () => {
    const user = userEvent.setup();
    renderSubject();

    const { search, options } = getResults();

    await user.type(search, 'the other');
    await user.keyboard('{Escape} side');

    expect(search).toHaveAttribute('aria-expanded', 'true');
    expect(search).toHaveAttribute('aria-activedescendant', options[1]?.id);
    expect(options[0]).toHaveAttribute('aria-selected', 'false');
    expect(options[1]).toHaveAttribute('aria-selected', 'true');
  });

  it('moves visual focus to options on arrow keys', async () => {
    const user = userEvent.setup();
    renderSubject();

    const { search, options } = getResults();
    await user.keyboard('{Tab}');

    await user.keyboard('{ArrowDown}');
    expect(search).toHaveAttribute('aria-activedescendant', options[0]?.id);
    expect(options[0]).toHaveAttribute('aria-selected', 'true');
    expect(options[1]).toHaveAttribute('aria-selected', 'false');

    await user.keyboard('{ArrowDown}');
    expect(search).toHaveAttribute('aria-activedescendant', options[1]?.id);
    expect(options[0]).toHaveAttribute('aria-selected', 'false');
    expect(options[1]).toHaveAttribute('aria-selected', 'true');

    await user.keyboard('{ArrowDown}');
    expect(options[0]).toHaveAttribute('aria-selected', 'true');

    await user.keyboard('{ArrowUp}');
    expect(options[1]).toHaveAttribute('aria-selected', 'true');

    await user.keyboard('{ArrowUp}');
    expect(options[0]).toHaveAttribute('aria-selected', 'true');
  });

  it('selects visually focused option with space', async () => {
    const user = userEvent.setup();
    renderSubject();

    const { search } = getResults();
    await user.click(search);
    await user.keyboard('{ArrowDown} ');

    expect(onChange).toHaveBeenCalledWith('hello from');
    expect(search).toHaveValue('hello from');
    expect(search).toHaveAttribute('aria-expanded', 'false');
  });

  it('types with space when visual focus on search', async () => {
    const user = userEvent.setup();
    renderSubject();

    const { search } = getResults();
    await user.click(search);
    await user.keyboard(' ');

    expect(onChange).not.toHaveBeenCalled();
    expect(search).toHaveValue(' ');
  });

  it('sets cursor with home and end', async () => {
    const user = userEvent.setup();
    renderSubject();

    const { search } = getResults();
    await user.type(search, 'e');
    await user.keyboard('{Home}h');

    expect(search).toHaveValue('he');

    await user.keyboard('{End}llo');
    expect(search).toHaveValue('hello');
  });

  it('opens listbox with alt+down arrow without changing selected state', async () => {
    const user = userEvent.setup();
    renderSubject();

    const { search, options } = getResults();
    await user.keyboard('{Tab}{Alt>}{ArrowDown}{/Alt}');

    expect(search).toHaveAttribute('aria-expanded', 'true');
    expect(options[0]).toHaveAttribute('aria-selected', 'false');
    expect(options[1]).toHaveAttribute('aria-selected', 'false');
  });

  it.each(['{Home}', '{End}', '{ArrowRight}', '{ArrowLeft}'])(
    'moves visual focus to input and resets highlight with %s',
    async (key) => {
      const user = userEvent.setup();
      renderSubject();

      const { search, options } = getResults();
      await user.type(search, 'hello');
      await user.keyboard(`{ArrowDown}${key}`);

      expect(options[0]).toHaveAttribute('aria-selected', 'true');
    }
  );

  it('resets selected item on close', async () => {
    const user = userEvent.setup();
    renderSubject();

    const { search, options } = getResults();
    await user.type(search, 'hello');
    await user.keyboard('{Escape}{ArrowDown}');

    expect(options[0]).toHaveAttribute('aria-selected', 'true');
  });

  describe('multiple mode', () => {
    it('can select multiple options without closing', async () => {
      const user = userEvent.setup();
      renderSubject({ multiple: true });

      const { search, options } = getResults();

      expect(search).toHaveAttribute('aria-multiselectable', 'true');

      await user.click(search);

      // TODO(mc, 2024-02-03): replace .click with userEvent
      // https://github.com/testing-library/user-event/issues/1119
      await act(() => options[0]?.click());
      expect(onMultiChange).toHaveBeenCalledWith(['hello from']);
      expect(search).toHaveFocus();
      expect(search).toHaveValue('');
      expect(search).toHaveAttribute('aria-expanded', 'true');
      expect(options[0]).toHaveAttribute('aria-checked', 'true');
      expect(options[1]).toHaveAttribute('aria-checked', 'false');

      await act(() => options[1]?.click());
      expect(onMultiChange).toHaveBeenCalledWith([
        'hello from',
        'the other side',
      ]);
      expect(search).toHaveFocus();
      expect(search).toHaveValue('');
      expect(search).toHaveAttribute('aria-expanded', 'true');
      expect(options[0]).toHaveAttribute('aria-checked', 'true');
      expect(options[1]).toHaveAttribute('aria-checked', 'true');
    });

    it('can select unselect with the mouse', async () => {
      const user = userEvent.setup();
      renderSubject({ multiple: true });

      const { search, options } = getResults();

      await user.click(search);

      // TODO(mc, 2024-02-03): replace .click with userEvent
      // https://github.com/testing-library/user-event/issues/1119
      await act(() => options[0]?.click());
      expect(onMultiChange).toHaveBeenCalledWith(['hello from']);
      await act(() => options[0]?.click());
      expect(onMultiChange).toHaveBeenCalledWith([]);
    });

    it('resets search input on select', async () => {
      const user = userEvent.setup();
      renderSubject({ multiple: true });

      const { search } = getResults();
      await user.click(search);

      await user.type(search, 'hello{Enter}');

      expect(onMultiChange).toHaveBeenCalledWith(['hello from']);
      expect(search).toHaveValue('');
    });

    it('closes menu on blur', async () => {
      const user = userEvent.setup();
      renderSubject({ multiple: true });

      const { search } = getResults();
      await user.click(search);
      await user.keyboard('{Tab}');

      expect(search).toHaveAttribute('aria-expanded', 'false');
    });
  });
});
