import { describe, expect, it } from 'vitest';
import { render, screen, within } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import { NavDropdown as Subject } from '$lib';

const versionOptions = [
  {
    label: 'Version 1',
    detail: '1 day ago',
    description: 'stable',
    href: '/v1',
  },
  {
    label: 'Version 2',
    detail: '5 hours ago',
    description: 'latest',
    href: '/v2',
  },
];

describe('NavDropdown', () => {
  it('renders a button that controls a menu', () => {
    render(Subject, {
      props: { options: versionOptions, selectedHref: '/v1' },
    });

    const button = screen.getByRole('button');

    expect(button).toHaveAttribute('aria-haspopup', 'menu');
    expect(button).toHaveAttribute('aria-expanded', 'false');
  });

  it('expands the menu on click', async () => {
    const user = userEvent.setup();
    render(Subject, {
      props: { options: versionOptions, selectedHref: '/v1' },
    });

    const button = screen.getByRole('button');
    await user.click(button);

    const menu = screen.getByRole('menu');

    expect(menu).toBeInTheDocument();
    expect(button).toHaveAttribute('aria-expanded', 'true');
  });

  it('displays option details', async () => {
    const user = userEvent.setup();
    render(Subject, {
      props: { options: versionOptions, selectedHref: '/v1' },
    });

    const button = screen.getByRole('button');
    await user.click(button);

    const menuitem = screen.getByRole('menuitem', { name: /Version 1/u });
    expect(within(menuitem).getByText(/1 day ago/u)).toBeInTheDocument();
    expect(within(menuitem).getByText('stable')).toBeInTheDocument();
  });

  describe('keyboard navigation', () => {
    it('opens menu with Enter or Space', async () => {
      const user = userEvent.setup();
      render(Subject, {
        props: { options: versionOptions, selectedHref: '/v1' },
      });

      const button = screen.getByRole('button');
      await user.click(button);

      await user.keyboard('{Enter}');
      expect(screen.getByRole('menu')).toBeInTheDocument();
      expect(button).toHaveAttribute('aria-expanded', 'true');

      await user.keyboard('{Escape}');
      expect(screen.queryByRole('menu')).not.toBeInTheDocument();

      await user.keyboard(' ');
      expect(screen.getByRole('menu')).toBeInTheDocument();
    });

    it('navigates options with arrow keys', async () => {
      const user = userEvent.setup();
      render(Subject, {
        props: { options: versionOptions, selectedHref: '/v1' },
      });

      const button = screen.getByRole('button');
      await user.click(button);

      const options = screen.getAllByRole('menuitem');

      expect(options[0]).toHaveAttribute('aria-current', 'false');
      expect(options[1]).toHaveAttribute('aria-current', 'false');

      await user.keyboard('{ArrowDown}');
      expect(options[0]).toHaveAttribute('aria-current', 'page');
      expect(options[1]).toHaveAttribute('aria-current', 'false');

      await user.keyboard('{ArrowDown}');
      expect(options[0]).toHaveAttribute('aria-current', 'false');
      expect(options[1]).toHaveAttribute('aria-current', 'page');

      await user.keyboard('{ArrowUp}');
      expect(options[0]).toHaveAttribute('aria-current', 'page');
      expect(options[1]).toHaveAttribute('aria-current', 'false');
    });

    it('closes menu with Escape', async () => {
      const user = userEvent.setup();
      render(Subject, {
        props: { options: versionOptions, selectedHref: '/v1' },
      });

      const button = screen.getByRole('button');
      await user.click(button);
      expect(screen.getByRole('menu')).toBeInTheDocument();

      await user.keyboard('{Escape}');
      expect(screen.queryByRole('menu')).not.toBeInTheDocument();
    });

    it('closes menu when pressing Enter on highlighted option', async () => {
      const user = userEvent.setup();
      render(Subject, {
        props: { options: versionOptions, selectedHref: '/v1' },
      });

      const button = screen.getByRole('button');
      await user.click(button);

      await user.keyboard('{ArrowDown}');
      await user.keyboard('{Enter}');

      expect(screen.queryByRole('menu')).not.toBeInTheDocument();
    });
  });
});
