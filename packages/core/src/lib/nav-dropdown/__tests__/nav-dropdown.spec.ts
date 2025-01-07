import { describe, expect, it, vi } from 'vitest';
import { render, screen, within } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import { goto } from '$app/navigation';
import { NavDropdown as Subject } from '$lib';

vi.mock('$app/navigation', () => ({
  goto: vi.fn(),
}));

const versionOptions = [
  {
    label: 'Version 1',
    timeAgo: '1 day ago',
    description: 'stable',
    href: '/v1',
  },
  {
    label: 'Version 2',
    timeAgo: '5 hours ago',
    description: 'latest',
    href: '/v2',
  },
];

describe('NavDropdown', () => {
  it('renders a button that controls a menu', () => {
    render(Subject, { props: { options: versionOptions } });

    const button = screen.getByRole('button');

    expect(button).toHaveAttribute('aria-haspopup', 'menu');
    expect(button).toHaveAttribute('aria-expanded', 'false');
  });

  it('expands the menu on click', async () => {
    const user = userEvent.setup();
    render(Subject, { props: { options: versionOptions } });

    const button = screen.getByRole('button');
    await user.click(button);

    const menu = screen.getByRole('menu');

    expect(menu).toBeInTheDocument();
    expect(button).toHaveAttribute('aria-expanded', 'true');
  });

  it('displays option details', async () => {
    const user = userEvent.setup();
    render(Subject, { props: { options: versionOptions } });

    const button = screen.getByRole('button');
    await user.click(button);

    const menuitem = screen.getByRole('menuitem', { name: /Version 1/u });
    expect(within(menuitem).getByText(/1 day ago/u)).toBeInTheDocument();
    expect(within(menuitem).getByText('stable')).toBeInTheDocument();
  });

  it('navigates when option is clicked', async () => {
    const user = userEvent.setup();
    render(Subject, { props: { options: versionOptions } });

    const button = screen.getByRole('button');
    await user.click(button);
    const menuitem = screen.getByRole('menuitem', { name: /Version 1/u });
    await user.click(menuitem);

    expect(goto).toHaveBeenCalledWith('/v1');
  });

  it('supports keyboard navigation', async () => {
    const user = userEvent.setup();
    render(Subject, { props: { options: versionOptions } });

    // Open menu with Enter
    await user.keyboard('{Tab}{Enter}');
    const menu = screen.getByRole('menu');
    const options = screen.getAllByRole('menuitem');

    expect(menu).toBeInTheDocument();
    expect(options[0]).toHaveAttribute('aria-current', 'false');

    // Navigate with arrow keys
    await user.keyboard('{ArrowDown}');
    expect(options[0]).toHaveAttribute('aria-current', 'true');

    await user.keyboard('{ArrowDown}');
    expect(options[0]).toHaveAttribute('aria-current', 'false');
    expect(options[1]).toHaveAttribute('aria-current', 'true');

    // Select with Enter
    await user.keyboard('{Enter}');
    expect(goto).toHaveBeenCalledWith('/v2');
  });

  it('shows the selected option in the button', async () => {
    const user = userEvent.setup();
    render(Subject, {
      props: {
        options: versionOptions,
        selectedOption: 'Version 2',
      },
    });

    const button = screen.getByRole('button');
    expect(button).toHaveTextContent('Version 2');

    await user.click(button);
  });
});
