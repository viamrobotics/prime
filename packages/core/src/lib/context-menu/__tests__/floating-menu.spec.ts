import { beforeEach, describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';

import Subject from './floating-menu.spec.svelte';

describe('<FloatingMenu> component', () => {
  let user: ReturnType<typeof userEvent.setup>;

  beforeEach(() => {
    user = userEvent.setup();
  });

  it('should open and close a menu when the control is clicked', async () => {
    render(Subject);

    const control = screen.getByRole('button', { name: /open/iu });
    let menu = screen.queryByRole('menu');
    let item = screen.queryByRole('menuitem');

    expect(menu).not.toBeInTheDocument();
    expect(item).not.toBeInTheDocument();

    await user.click(control);

    menu = screen.queryByRole('menu');
    item = screen.queryByRole('menuitem');

    expect(menu).toBeInTheDocument();
    expect(item).toBeInTheDocument();

    await user.click(control);

    menu = screen.queryByRole('menu');
    item = screen.queryByRole('menuitem');

    expect(menu).not.toBeInTheDocument();
    expect(item).not.toBeInTheDocument();
  });

  it('should pass aria props to the control', async () => {
    render(Subject);

    const control = screen.getByRole('button', { name: /open/iu });

    expect(control).toHaveAttribute('aria-haspopup', 'menu');
    expect(control).toHaveAttribute('aria-expanded', 'false');

    await user.click(control);
    const menu = screen.getByRole('menu');

    expect(menu).toHaveAttribute('id', expect.any(String));
    expect(control).toHaveAttribute('aria-controls', menu.id);
    expect(control).toHaveAttribute('aria-expanded', 'true');
  });

  it('should close the menu if escape is pressed', async () => {
    render(Subject);

    const control = screen.getByRole('button', { name: /open/iu });

    await user.click(control);
    await user.keyboard('{Escape}');

    const menu = screen.queryByRole('menu');
    expect(menu).not.toBeInTheDocument();
  });

  it('should close the menu on click outside', async () => {
    render(Subject);

    const control = screen.getByRole('button', { name: /open/iu });
    const outside = screen.getByTestId('outside-element');

    await user.click(control);
    await user.click(outside);

    const menu = screen.queryByRole('menu');
    expect(menu).not.toBeInTheDocument();
  });
});
