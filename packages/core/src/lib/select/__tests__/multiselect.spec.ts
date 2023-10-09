import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import Multiselect from '../multiselect.svelte';
import { cxTestArguments, cxTestResults } from '$lib/__tests__/cx-test';
import userEvent from '@testing-library/user-event';

describe('Multiselect', () => {
  const options = [
    'First Option',
    'Option 2',
    'C.) Option',
    'Something Else',
    'With A Whole Lot Of Parts',
  ];

  const common = { placeholder: 'Select an option', options };

  it('Renders the select input', () => {
    render(Multiselect, common);

    const select = screen.getByPlaceholderText('Select an option');

    expect(select).toHaveClass(
      'h-7.5 w-full grow appearance-none border py-1.5 pl-2 pr-1 text-xs leading-tight outline-none'
    );
  });

  it('Renders the select as disabled', () => {
    render(Multiselect, {
      ...common,
      disabled: true,
    });

    const select = screen.getByPlaceholderText('Select an option');

    expect(select).toHaveClass(
      'bg-disabled-light text-disabled-dark border-disabled-light cursor-not-allowed'
    );

    expect(select).toHaveAttribute('aria-disabled', 'true');
  });

  it('Renders the select in the warn state', () => {
    render(Multiselect, {
      ...common,
      state: 'warn',
    });

    const select = screen.getByPlaceholderText('Select an option');

    expect(select).toHaveClass(
      'border-warning-bright group-focus:outline-warning-bright group-focus:outline-[1.5px] group-focus:-outline-offset-1'
    );
  });

  it('Renders the select in the error state', () => {
    render(Multiselect, {
      ...common,
      state: 'error',
    });

    const select = screen.getByPlaceholderText('Select an option');

    expect(select).toHaveClass(
      'border-danger-dark group-focus:outline-danger-dark group-focus:outline-[1.5px] group-focus:-outline-offset-1'
    );
  });

  it('Renders the select heading', () => {
    render(Multiselect, {
      ...common,
      heading: 'Test Heading',
    });

    const heading = screen.getByText('Test Heading');

    expect(heading).toHaveClass(
      'text-default flex flex-wrap py-1 pl-2 text-xs'
    );
  });

  it('Renders the select button', async () => {
    const onButtonClick = vi.fn();
    const { component } = render(Multiselect, {
      ...common,
      button: { text: 'Test Button', icon: 'alert' },
    });

    component.$on('buttonclick', onButtonClick);

    const button = screen.getByText('Test Button');

    expect(button).toHaveClass('pl-1.5');
    expect(button.parentElement).toHaveClass(
      'hover:bg-light border-light flex h-7.5 w-full items-center border-t px-2 py-1 text-xs'
    );

    await userEvent.click(button);

    expect(onButtonClick).toHaveBeenCalled();
  });

  it('Sorts results with a match at the start of a word', async () => {
    render(Multiselect, common);

    const select: HTMLInputElement =
      screen.getByPlaceholderText('Select an option');
    const menu = screen.getByRole('menu');

    select.focus();
    await userEvent.type(select, 'C.)');

    expect(menu.children[0]?.textContent?.trim()).toBe('C.)  Option');

    await userEvent.type(select, 'Opt');

    expect(menu.children[0]?.textContent?.trim()).toBe('First Option');
  });

  it('Sorts results with a match below matches at a start of the word', async () => {
    render(Multiselect, common);

    const select: HTMLInputElement =
      screen.getByPlaceholderText('Select an option');
    const menu = screen.getByRole('menu');

    select.focus();
    await userEvent.type(select, 'l');

    expect(menu.children[0]?.textContent?.trim()).toBe(
      'With A Whole  L ot Of Parts'
    );

    expect(menu.children[1]?.textContent?.trim()).toBe('Something E l se');
  });

  it('Filters out options without a match when reduce is true', async () => {
    render(Multiselect, { ...common, sort: 'reduce' });

    const select: HTMLInputElement =
      screen.getByPlaceholderText('Select an option');
    const menu = screen.getByRole('menu');

    select.focus();
    await userEvent.type(select, 'C.)');

    expect(menu.children[0]?.textContent?.trim()).toBe('C.)  Option');
    expect(menu.children.length).toBe(1);
  });

  it('Just highlights but does not filter or sort when sort is off', async () => {
    render(Multiselect, { ...common, sort: 'off' });

    const select: HTMLInputElement =
      screen.getByPlaceholderText('Select an option');
    const menu = screen.getByRole('menu');

    await userEvent.type(select, 'C.)');

    expect(menu.children[0]?.textContent?.trim()).toBe('First Option');
    expect(menu.children[1]?.textContent?.trim()).toBe('Option 2');
    expect(menu.children[2]?.textContent?.trim()).toBe('C.)  Option');
    expect(menu.children.length).toBe(5);
  });

  it('Selects an option with click', async () => {
    render(Multiselect, common);

    const select: HTMLInputElement =
      screen.getByPlaceholderText('Select an option');
    const menuItem = screen.getAllByRole(
      'menuitemcheckbox'
    )[2]! as HTMLInputElement;

    select.focus();
    await userEvent.click(menuItem);

    expect(menuItem.checked).toBe(true);
    expect(screen.getByLabelText('Remove C.) Option')).toBeInTheDocument();
  });

  it('Navigates to and selects an option with enter', async () => {
    render(Multiselect, common);

    const select: HTMLInputElement =
      screen.getByPlaceholderText('Select an option');
    const menuItem = screen.getAllByRole(
      'menuitemcheckbox'
    )[2]! as HTMLInputElement;

    select.focus();
    await userEvent.keyboard('[ArrowDown]');
    await userEvent.keyboard('[ArrowDown]');
    await userEvent.keyboard('[ArrowDown]');

    expect(menuItem.parentElement).toHaveClass('bg-light');

    await userEvent.keyboard('[Enter]');

    expect(menuItem.checked).toBe(true);
  });

  it('Navigates through the list', async () => {
    render(Multiselect, common);

    const select: HTMLInputElement =
      screen.getByPlaceholderText('Select an option');
    const menuItems = screen.getAllByRole('menuitemcheckbox');

    select.focus();
    await userEvent.keyboard('[ArrowDown]');

    expect(menuItems[0]?.parentElement).toHaveClass('bg-light');

    await userEvent.keyboard('[ArrowDown]');
    await userEvent.keyboard('[ArrowDown]');

    expect(menuItems[2]?.parentElement).toHaveClass('bg-light');

    await userEvent.keyboard('[ArrowDown]');
    await userEvent.keyboard('[ArrowDown]');

    expect(menuItems[4]?.parentElement).toHaveClass('bg-light');

    await userEvent.keyboard('[ArrowDown]');

    expect(menuItems[0]?.parentElement).toHaveClass('bg-light');

    await userEvent.keyboard('[ArrowUp]');

    expect(menuItems[4]?.parentElement).toHaveClass('bg-light');

    await userEvent.keyboard('[ArrowUp]');
    await userEvent.keyboard('[ArrowUp]');
    await userEvent.keyboard('[Enter]');

    expect((menuItems[2] as HTMLInputElement).checked).toBe(true);
  });

  it('Closes the menu on escape', async () => {
    render(Multiselect, common);

    const select: HTMLInputElement =
      screen.getByPlaceholderText('Select an option');
    const menu = screen.getByRole('menu');
    const menuItems = screen.getAllByRole('menuitemcheckbox');

    expect(menu.parentElement).toHaveClass('invisible');

    select.focus();
    await userEvent.keyboard('[ArrowDown]');

    expect(menuItems[0]?.parentElement).toHaveClass('bg-light');

    await userEvent.keyboard('[Escape]');

    expect(menu.parentElement).toHaveClass('invisible');
  });

  it('Closes the menu on tab', async () => {
    render(Multiselect, common);

    const select: HTMLInputElement =
      screen.getByPlaceholderText('Select an option');
    const menu = screen.getByRole('menu');
    const menuItems = screen.getAllByRole('menuitemcheckbox');

    expect(menu.parentElement).toHaveClass('invisible');

    select.focus();
    await userEvent.keyboard('[ArrowDown]');

    expect(menuItems[0]?.parentElement).toHaveClass('bg-light');

    await userEvent.keyboard('[Tab]');

    expect(menu.parentElement).toHaveClass('invisible');
  });

  it('Clears selections when clear all is clicked', async () => {
    render(Multiselect, { ...common, clearable: true });

    const select: HTMLInputElement =
      screen.getByPlaceholderText('Select an option');
    const first = screen.getAllByRole(
      'menuitemcheckbox'
    )[0]! as HTMLInputElement;
    const second = screen.getAllByRole(
      'menuitemcheckbox'
    )[1]! as HTMLInputElement;
    const third = screen.getAllByRole(
      'menuitemcheckbox'
    )[2]! as HTMLInputElement;
    const clear = screen.getByText('Clear all');

    select.focus();
    await userEvent.keyboard('[ArrowDown]');
    await userEvent.keyboard('[Enter]');

    expect(first.checked).toBe(true);

    await userEvent.keyboard('[ArrowDown]');
    await userEvent.keyboard('[Enter]');

    expect(second.checked).toBe(true);

    await userEvent.keyboard('[ArrowDown]');
    await userEvent.keyboard('[Enter]');

    expect(third.checked).toBe(true);

    await userEvent.click(clear);

    expect(first.checked).toBe(false);
    expect(second.checked).toBe(false);
    expect(third.checked).toBe(false);
  });

  it('Should hide pills when showPills is false', async () => {
    render(Multiselect, { ...common, showPills: false });

    const select: HTMLInputElement =
      screen.getByPlaceholderText('Select an option');
    const menuItem = screen.getAllByRole(
      'menuitemcheckbox'
    )[2]! as HTMLInputElement;

    select.focus();
    await userEvent.click(menuItem);

    expect(menuItem.checked).toBe(true);
    expect(screen.queryByLabelText('Remove C.) Option')).toBeNull();
  });

  it('Should show pills as readonly when disabled', () => {
    render(Multiselect, {
      ...common,
      selected: ['C.) Option'],
      disabled: true,
    });

    expect(screen.queryByLabelText('Remove C.) Option')).toBeNull();
    expect(screen.getByText('C.) Option')).toBeInTheDocument();
  });

  it('Removes an option with pill click', async () => {
    render(Multiselect, common);

    const select: HTMLInputElement =
      screen.getByPlaceholderText('Select an option');
    const menuItem = screen.getAllByRole(
      'menuitemcheckbox'
    )[2]! as HTMLInputElement;

    select.focus();
    await userEvent.click(menuItem);

    expect(menuItem.checked).toBe(true);
    expect(screen.getByLabelText('Remove C.) Option')).toBeInTheDocument();

    await userEvent.click(screen.getByLabelText('Remove C.) Option'));

    expect(menuItem.checked).toBe(false);
    expect(
      screen.queryByLabelText('Remove C.) Option')
    ).not.toBeInTheDocument();
  });

  it('Renders with the passed cx classes', () => {
    render(Multiselect, {
      ...common,
      cx: cxTestArguments,
    });

    expect(
      screen.getByPlaceholderText('Select an option').parentElement
        ?.parentElement?.parentElement
    ).toHaveClass(cxTestResults);
  });
});
