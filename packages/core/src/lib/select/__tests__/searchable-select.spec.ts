import { describe, expect, it, vi } from 'vitest';
import { act, render, screen, within } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import type { ComponentProps } from 'svelte';

import { SearchableSelect as Subject, InputStates } from '$lib';

const onChange = vi.fn();
const onMultiChange = vi.fn();
const onFocus = vi.fn();
const onBlur = vi.fn();
const detailedOptions = [
  {
    value: 'opt-1',
    label: 'Gale',
    description: 'Wizard',
    icon: 'viam-process' as const,
  },
  {
    value: 'opt-2',
    label: 'Karlach',
    description: 'Barbarian',
    icon: 'language-cpp' as const,
  },
];
const stringOptions = ['hello from', 'the other side'];

const renderSubject = (props: Partial<ComponentProps<Subject>> = {}) => {
  return render(Subject, {
    options: stringOptions,
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
  list: HTMLElement | null;
  options: HTMLElement[];
} => {
  const search = screen.getByRole('combobox');
  const button = screen.getByRole('button');
  const list = screen.queryByRole('listbox');
  const options = list ? within(list).queryAllByRole('option') : [];

  return { search, button, list, options };
};

describe('SearchableSelect', () => {
  it('is a combobox that controls a listbox', () => {
    renderSubject();

    const { search } = getResults();

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

    expect(list).not.toBeInTheDocument();
    expect(search).toHaveAttribute('aria-expanded', 'false');
    expect(button).toHaveAttribute('aria-expanded', 'false');

    await user.keyboard('{Tab}');

    const { list: expandedList } = getResults();

    expect(onFocus).toHaveBeenCalledOnce();
    expect(search).toHaveFocus();
    expect(expandedList).toHaveAttribute('id', expect.any(String));
    expect(button).toHaveAttribute('aria-controls', expandedList?.id);
    expect(search).toHaveAttribute('aria-controls', expandedList?.id);
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

  it('does not change the select when clicking and then blurring if disabled', async () => {
    const user = userEvent.setup();
    renderSubject({
      options: detailedOptions,
      value: 'opt-1',
      disabled: true,
    });

    const { search } = getResults();
    expect(search).toHaveValue('Gale');
    await user.click(search);
    await user.tab();
    expect(onChange).not.toHaveBeenCalled();
    expect(search).toHaveValue('Gale');
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
    expect(onChange).not.toHaveBeenCalled();
  });

  it('collapses the listbox on blur', async () => {
    const user = userEvent.setup();
    renderSubject();

    const { search } = getResults();

    await user.keyboard('{Tab}{Tab}');

    expect(onBlur).toHaveBeenCalledOnce();
    expect(search).not.toHaveFocus();
    expect(search).toHaveAttribute('aria-expanded', 'false');
    expect(onChange).not.toHaveBeenCalled();
  });

  it('has options', async () => {
    const user = userEvent.setup();
    renderSubject();

    const { search } = getResults();
    await user.click(search);
    const { options } = getResults();

    expect(options).toHaveLength(2);
    expect(options[0]).toHaveAccessibleName('hello from');
    expect(options[0]).toHaveAttribute('aria-selected', 'false');
    expect(options[1]).toHaveAccessibleName('the other side');
    expect(options[1]).toHaveAttribute('aria-selected', 'false');
    expect(search).not.toHaveAttribute('aria-activedescendant');
  });

  it('has options with labels descriptions and icons', async () => {
    const user = userEvent.setup();
    renderSubject({
      options: detailedOptions,
    });

    const { search } = getResults();
    await user.click(search);
    const { options } = getResults();

    expect(options).toHaveLength(2);
    const firstOption = screen.getByRole('option', { name: /gale/iu });
    const secondOption = screen.getByRole('option', { name: /karlach/iu });
    expect(firstOption).toHaveAttribute('aria-selected', 'false');
    expect(secondOption).toHaveAttribute('aria-selected', 'false');
    expect(search).not.toHaveAttribute('aria-activedescendant');
    // icons are rendered
    const firstOptionIcon = screen.getByTestId('icon-viam-process');
    const secondOptionIcon = screen.getByTestId('icon-language-cpp');
    expect(firstOptionIcon).toBeInTheDocument();
    expect(secondOptionIcon).toBeInTheDocument();
    // descriptions are rendered
    expect(firstOption).toHaveAccessibleDescription(/wizard/iu);
    expect(secondOption).toHaveAccessibleDescription(/barbarian/iu);
  });

  it('selects a clicked option', async () => {
    const user = userEvent.setup();
    renderSubject();

    const { search } = getResults();
    await user.click(search);
    const { options } = getResults();

    // TODO(mc, 2024-02-03): replace .click with userEvent
    // https://github.com/testing-library/user-event/issues/1119
    await act(() => options[0]?.click());

    expect(search).toHaveFocus();
    expect(onChange).toHaveBeenCalledWith('hello from');
    expect(search).toHaveValue('hello from');
    expect(search).toHaveAttribute('aria-expanded', 'false');
    expect(search).not.toHaveAttribute('aria-activedescendant');
  });

  it('subsequent blur after value reset does not trigger additional onChange', async () => {
    const user = userEvent.setup();
    const { component } = renderSubject({ value: 'hello from' });

    const { search } = getResults();

    // reset the value, click, and blur
    await act(() => {
      component.$set({ value: '' });
    });
    await user.click(search);
    await user.keyboard('{Tab}');

    expect(onChange).not.toHaveBeenCalled();
  });

  it('displays the correct icon and label on select', async () => {
    const user = userEvent.setup();
    renderSubject({ options: detailedOptions });

    const { search } = getResults();
    await user.click(search);
    const { options } = getResults();

    // TODO(mc, 2024-02-03): replace .click with userEvent
    // https://github.com/testing-library/user-event/issues/1119
    await act(() => options[0]?.click());

    const searchIcon = screen.getByTestId('icon-viam-process');

    expect(search).toHaveFocus();
    expect(onChange).toHaveBeenCalledWith('opt-1');
    expect(search).toHaveValue('Gale');
    expect(search).toHaveAttribute('aria-expanded', 'false');
    expect(search).not.toHaveAttribute('aria-activedescendant');
    expect(searchIcon).toBeInTheDocument();
  });

  it('renders the initial input value', () => {
    renderSubject({ options: detailedOptions, value: 'opt-2' });

    const { search } = getResults();
    const searchIcon = screen.getByTestId('icon-language-cpp');

    expect(search).toHaveValue('Karlach');
    expect(searchIcon).toBeInTheDocument();
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
    expect(search).not.toHaveAttribute('aria-activedescendant');
  });

  it('updates the rendered options when the options input field changes', async () => {
    const user = userEvent.setup();
    const { component } = renderSubject({ options: detailedOptions });

    const { search } = getResults();
    await user.click(search);

    // Verify initial options
    const { options } = getResults();
    expect(options).toHaveLength(stringOptions.length);
    expect(options[0]).toHaveAccessibleName(detailedOptions[0]?.label);
    expect(options[1]).toHaveAccessibleName(detailedOptions[1]?.label);
    expect(screen.getByTestId('icon-language-cpp')).toBeInTheDocument();

    // Define new options
    const newOptions = [
      { value: 'New Option 1' },
      { value: 'opt1', label: 'New Option 2' },
      { value: 'opt3', label: 'New Option 3', icon: 'apple' as const },
    ];

    // Update the options prop
    await act(() => {
      component.$set({ options: newOptions });
    });

    // Verify updated options
    const { options: nextOptions } = getResults();
    expect(nextOptions).toHaveLength(newOptions.length);
    expect(nextOptions[0]).toHaveAccessibleName('New Option 1');
    expect(nextOptions[1]).toHaveAccessibleName('New Option 2');
    expect(nextOptions[2]).toHaveAccessibleName('New Option 3');

    expect(screen.getByTestId('icon-apple')).toBeInTheDocument();
  });

  it('clears the input when extra text is added and Enter is pressed again in exclusive mode', async () => {
    const user = userEvent.setup();
    renderSubject({
      options: detailedOptions,
      exclusive: true,
    });

    const { search } = getResults();
    await user.click(search);
    await user.type(search, 'Gale');
    await user.keyboard('{Enter}');

    expect(onChange).toHaveBeenCalledWith('opt-1');
    expect(search).toHaveValue('Gale');

    await user.type(search, ' extra text');
    expect(search).toHaveValue('Gale extra text');

    await user.keyboard('{Enter}');

    // Verify that the onChange event is called with an empty string
    expect(onChange).toHaveBeenCalledWith('');
    expect(search).toHaveValue('');
  });

  it('does not set the field again on blur after the menu is closed', async () => {
    const user = userEvent.setup();
    renderSubject({
      options: detailedOptions,
      exclusive: true,
    });

    const { search } = getResults();
    await user.click(search);
    await user.type(search, 'Gale');
    await user.keyboard('{Enter}');

    expect(onChange).toHaveBeenCalledWith('opt-1');
    expect(search).toHaveValue('Gale');

    onChange.mockReset();

    // Simulate a blur event after the menu is CLOSED but still has focus
    await user.tab();

    // Verify that the onChange event is not called again after the blur event
    expect(onChange).not.toHaveBeenCalled();
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

  it('keeps input value if menu is closed with escape', async () => {
    const user = userEvent.setup();
    renderSubject();

    const { search } = getResults();
    await user.type(search, 'the other');
    await user.keyboard('{Escape}');
    expect(search).toHaveValue('the other');
    await user.keyboard('{Tab}');
    expect(search).toHaveValue('');
    expect(onChange).not.toHaveBeenCalled();
  });

  it('keeps last selected value if menu is closed with escape (non exclusive)', async () => {
    const user = userEvent.setup();
    renderSubject();

    const { search } = getResults();
    await user.type(search, 'testFoo{Enter}');
    expect(onChange).toHaveBeenCalledWith('testFoo');
    expect(search).toHaveValue('testFoo');
    onChange.mockReset();
    await user.type(search, 'ohNoIMeantToClickElsewhereOops{Escape}{Tab}');
    expect(search).toHaveValue('testFoo');
    expect(onChange).not.toHaveBeenCalled();
  });

  it('keeps last selected value if menu is closed with escape (exclusive)', async () => {
    const user = userEvent.setup();
    renderSubject({ exclusive: true });

    const { search } = getResults();
    await user.type(search, 'the other{Enter}');
    expect(onChange).toHaveBeenCalledWith('the other side');
    expect(search).toHaveValue('the other side');
    onChange.mockReset();
    await user.type(search, 'ohNoIMeantToClickElsewhereOops{Escape}{Tab}');
    expect(search).toHaveValue('the other side');
    expect(onChange).not.toHaveBeenCalled();
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

  it('has no "other" option when value empty', async () => {
    const user = userEvent.setup();
    renderSubject();

    const { search } = getResults();
    await user.click(search);
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

    const { search } = getResults();

    await user.type(search, 'the other');
    await user.keyboard('{Escape} side');

    const { options } = getResults();

    expect(search).toHaveAttribute('aria-expanded', 'true');
    expect(search).toHaveAttribute('aria-activedescendant', options[0]?.id);
    expect(options[0]).toHaveAttribute('aria-selected', 'true');
    expect(options[1]).toHaveAttribute('aria-selected', 'false');
  });

  it('moves visual focus to options on arrow keys', async () => {
    const user = userEvent.setup();
    renderSubject();

    const { search } = getResults();
    await user.keyboard('{Tab}');
    const { options } = getResults();

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

    const { search } = getResults();
    await user.keyboard('{Tab}{Alt>}{ArrowDown}{/Alt}');
    const { options } = getResults();

    expect(search).toHaveAttribute('aria-expanded', 'true');
    expect(options[0]).toHaveAttribute('aria-selected', 'false');
    expect(options[1]).toHaveAttribute('aria-selected', 'false');
  });

  it.each(['{Home}', '{End}', '{ArrowRight}', '{ArrowLeft}'])(
    'moves visual focus to input and resets highlight with %s',
    async (key) => {
      const user = userEvent.setup();
      renderSubject();

      const { search } = getResults();
      await user.type(search, 'hello');
      await user.keyboard(`{ArrowDown}${key}`);
      const { options } = getResults();

      expect(options[0]).toHaveAttribute('aria-selected', 'true');
    }
  );

  it('resets selected item on close', async () => {
    const user = userEvent.setup();
    renderSubject();

    const { search } = getResults();
    await user.type(search, 'hello');
    await user.keyboard('{Escape}{ArrowDown}');
    const { options } = getResults();

    expect(options[0]).toHaveAttribute('aria-selected', 'true');
  });

  it('renders the icon and does not change the contents of the select when Enter is pressed twice', async () => {
    const user = userEvent.setup();
    renderSubject({ options: detailedOptions });

    const { search } = getResults();
    await user.type(search, 'Gale{Enter}');
    const searchIcon = screen.getByTestId('icon-viam-process');

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith('opt-1');
    expect(search).toHaveValue('Gale');
    expect(searchIcon).toBeInTheDocument();

    await user.keyboard('{Enter}');

    // Verify that onChange is not called again
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(search).toHaveValue('Gale');
    expect(searchIcon).toBeInTheDocument();
  });

  it('closes menu on blur', async () => {
    const user = userEvent.setup();
    renderSubject({ multiple: true });

    const { search } = getResults();
    await user.click(search);
    await user.keyboard('{Tab}');

    expect(search).toHaveAttribute('aria-expanded', 'false');
  });

  describe('multiple mode', () => {
    it('can select multiple options without closing', async () => {
      const user = userEvent.setup();
      renderSubject({ multiple: true });

      const { search } = getResults();

      expect(search).toHaveAttribute('aria-multiselectable', 'true');

      await user.type(search, 'hello{Enter}');
      const { options } = getResults();

      expect(onMultiChange).toHaveBeenCalledWith(['hello from']);
      expect(search).toHaveFocus();
      expect(search).toHaveValue('');
      expect(search).toHaveAttribute('aria-expanded', 'true');
      expect(options[0]).toHaveAttribute('aria-checked', 'true');
      expect(options[1]).toHaveAttribute('aria-checked', 'false');

      await user.type(search, 'other{Enter}');

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

    it('can select and unselect with the mouse', async () => {
      const user = userEvent.setup();
      renderSubject({ multiple: true });

      const { search } = getResults();
      await user.click(search);
      const { options } = getResults();

      // TODO(mc, 2024-02-03): replace .click with userEvent
      // https://github.com/testing-library/user-event/issues/1119
      await act(() => options[0]?.click());
      expect(onMultiChange).toHaveBeenCalledWith(['hello from']);
      await act(() => options[0]?.click());
      expect(onMultiChange).toHaveBeenCalledWith([]);
    });
  });
});
