import { describe, it, expect } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/svelte';
import SearchableSelect from '../searchable-select.svelte';

describe('SearchableSelect', () => {
  const options = [
    'First Option',
    'Option 2',
    'C.) Option',
    'Something Else',
    'With A Whole Lot Of Parts',
  ];

  const common = { placeholder: 'Select an option', options };

  it('Renders the select input', () => {
    render(SearchableSelect, common);

    const select = screen.getByPlaceholderText('Select an option');

    expect(select).toHaveClass(
      'h-[30px] w-full grow appearance-none border py-1.5 pl-2 pr-1 text-xs leading-tight outline-none'
    );
  });

  it('Renders the select as disabled', () => {
    render(SearchableSelect, {
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
    render(SearchableSelect, {
      ...common,
      state: 'warn',
    });

    const select = screen.getByPlaceholderText('Select an option');

    expect(select).toHaveClass(
      'border-warning-bright focus:outline-warning-bright focus:outline-[1.5px] focus:-outline-offset-1'
    );
  });

  it('Renders the select in the error state', () => {
    render(SearchableSelect, {
      ...common,
      state: 'error',
    });

    const select = screen.getByPlaceholderText('Select an option');

    expect(select).toHaveClass(
      'border-danger-dark focus:outline-danger-dark focus:outline-[1.5px] focus:-outline-offset-1'
    );
  });

  it('Renders the select heading', () => {
    render(SearchableSelect, {
      ...common,
      heading: 'Test Heading',
    });

    const heading = screen.getByText('Test Heading');

    expect(heading).toHaveClass(
      'text-default flex flex-wrap py-1 pl-2 text-xs'
    );
  });

  it('Renders the select button', () => {
    render(SearchableSelect, {
      ...common,
      button: { text: 'Test Button', icon: 'alert' },
    });

    const button = screen.getByText('Test Button');

    expect(button).toHaveClass('pl-1.5');
    expect(button.parentElement).toHaveClass(
      'hover:bg-light border-light flex h-[30px] w-full items-center border-t px-2 py-1 text-xs'
    );
  });

  it('Sorts results with a match at the start of a word', async () => {
    render(SearchableSelect, common);

    const select: HTMLInputElement =
      screen.getByPlaceholderText('Select an option');
    const menu = screen.getByRole('menu');

    await fireEvent.focus(select);
    await fireEvent.input(select, { target: { value: 'C.)' } });

    expect(menu.children[0]?.textContent?.trim()).toBe('C.)  Option');

    await fireEvent.input(select, { target: { value: 'Opt' } });

    expect(menu.children[0]?.textContent?.trim()).toBe('First  Opt ion');
  });

  it('Sorts results with a match below matches at a start of the word', async () => {
    render(SearchableSelect, common);

    const select: HTMLInputElement =
      screen.getByPlaceholderText('Select an option');
    const menu = screen.getByRole('menu');

    await fireEvent.focus(select);
    await fireEvent.input(select, { target: { value: 'l' } });

    expect(menu.children[0]?.textContent?.trim()).toBe(
      'With A Whole  L ot Of Parts'
    );

    expect(menu.children[1]?.textContent?.trim()).toBe('Something E l se');
  });

  it('Filters out options without a match when reduce is true', async () => {
    render(SearchableSelect, { ...common, sort: 'reduce' });

    const select: HTMLInputElement =
      screen.getByPlaceholderText('Select an option');
    const menu = screen.getByRole('menu');

    await fireEvent.focus(select);
    await fireEvent.input(select, { target: { value: 'C.)' } });

    expect(menu.children[0]?.textContent?.trim()).toBe('C.)  Option');
    expect(menu.children.length).toBe(1);
  });

  it('Just highlights but does not filter or sort when sort is off', async () => {
    render(SearchableSelect, { ...common, sort: 'off' });

    const select: HTMLInputElement =
      screen.getByPlaceholderText('Select an option');
    const menu = screen.getByRole('menu');

    await fireEvent.focus(select);
    await fireEvent.input(select, { target: { value: 'C.)' } });

    expect(menu.children[0]?.textContent?.trim()).toBe('First Option');
    expect(menu.children[1]?.textContent?.trim()).toBe('Option 2');
    expect(menu.children[2]?.textContent?.trim()).toBe('C.)  Option');
    expect(menu.children.length).toBe(5);
  });

  it('Selects an option with click', async () => {
    render(SearchableSelect, common);

    const select: HTMLInputElement =
      screen.getByPlaceholderText('Select an option');

    await fireEvent.focus(select);
    await fireEvent.click(screen.getAllByRole('menuitem')[2]!);

    expect(select.value).toBe('C.) Option');
  });

  it('Navigates to and selects an option with enter', async () => {
    render(SearchableSelect, common);

    const select: HTMLInputElement =
      screen.getByPlaceholderText('Select an option');

    await fireEvent.focus(select);
    await fireEvent.keyDown(select, { key: 'ArrowDown' });
    await fireEvent.keyDown(select, { key: 'ArrowDown' });
    await fireEvent.keyDown(select, { key: 'ArrowDown' });
    await fireEvent.keyDown(select, { key: 'Enter' });

    expect(select.value).toBe('C.) Option');
  });

  it('Navigates through the list', async () => {
    render(SearchableSelect, common);

    const select: HTMLInputElement =
      screen.getByPlaceholderText('Select an option');
    const menuItems = screen.getAllByRole('menuitem');

    await fireEvent.focus(select);
    await fireEvent.keyDown(select, { key: 'ArrowDown' });

    expect(menuItems[0]).toHaveClass('bg-light');

    await fireEvent.keyDown(select, { key: 'ArrowDown' });
    await fireEvent.keyDown(select, { key: 'ArrowDown' });

    expect(menuItems[2]).toHaveClass('bg-light');

    await fireEvent.keyDown(select, { key: 'ArrowDown' });
    await fireEvent.keyDown(select, { key: 'ArrowDown' });

    expect(menuItems[4]).toHaveClass('bg-light');

    await fireEvent.keyDown(select, { key: 'ArrowDown' });

    expect(menuItems[0]).toHaveClass('bg-light');

    await fireEvent.keyDown(select, { key: 'ArrowUp' });

    expect(menuItems[4]).toHaveClass('bg-light');

    await fireEvent.keyDown(select, { key: 'ArrowUp' });
    await fireEvent.keyDown(select, { key: 'ArrowUp' });
    await fireEvent.keyDown(select, { key: 'Enter' });

    expect(select.value).toBe('C.) Option');
  });

  it('Closes the menu on escape', async () => {
    render(SearchableSelect, common);

    const select: HTMLInputElement =
      screen.getByPlaceholderText('Select an option');
    const menu = screen.getByRole('menu');
    const menuItems = screen.getAllByRole('menuitem');

    expect(menu.parentElement).toHaveClass('invisible');

    await fireEvent.focus(select);

    expect(menu.parentElement).not.toHaveClass('invisible');

    await fireEvent.keyDown(select, { key: 'ArrowDown' });

    expect(menuItems[0]).toHaveClass('bg-light');

    await fireEvent.keyDown(select, { key: 'Escape' });

    expect(menu.parentElement).toHaveClass('invisible');
  });

  it('Closes the menu on tab', async () => {
    render(SearchableSelect, common);

    const select: HTMLInputElement =
      screen.getByPlaceholderText('Select an option');
    const menu = screen.getByRole('menu');
    const menuItems = screen.getAllByRole('menuitem');

    expect(menu.parentElement).toHaveClass('invisible');

    await fireEvent.focus(select);

    expect(menu.parentElement).not.toHaveClass('invisible');

    await fireEvent.keyDown(select, { key: 'ArrowDown' });

    expect(menuItems[0]).toHaveClass('bg-light');

    await fireEvent.keyDown(select, { key: 'Tab' });

    expect(menu.parentElement).toHaveClass('invisible');
  });
});
