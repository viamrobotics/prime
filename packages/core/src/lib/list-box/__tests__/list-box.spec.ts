import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event'
import { ListBox } from '$lib';
import { default as ListBoxSlot } from '../list-box-slot.svelte';

const defaultProps = {
  disabled: false,
  left: 'leftText1,leftText2,leftText3',
  right: 'rightText1,rightText2,rightText3',
  leftlabel: 'Left',
  rightlabel: 'Right',
  height: '200px',
  suffix: false,
};

describe('ListBox', () => {
  it('Renders left options and can move them to the right', async () => {
    const user = userEvent.setup()
    render(ListBoxSlot, { ...defaultProps });

    await user.click(screen.getByText('leftText1'));
    await user.click(screen.getByText('leftText2'));
    await user.click(screen.getByText('leftText3'));

    const moveRightButton = screen.getByTestId('move-right');
    await user.click(moveRightButton);

    expect(screen.getByText('leftText1')).toBeVisible();
    expect(screen.getByText('leftText2')).toBeVisible();
    expect(screen.getByText('leftText3')).toBeVisible();
    expect(screen.getByText('Your left box is empty')).toBeVisible();
  });

  it('Renders left options and does not move when move left button is clicked', async () => {
    const user = userEvent.setup()

    render(ListBoxSlot, { right: '' });

    const leftValue = screen.getByText('leftText2');
    await user.click(leftValue);

    const moveLeftButton = screen.getByTestId('move-left');
    await user.click(moveLeftButton);

    expect(leftValue).toBeVisible();
    expect(screen.getByText('Your right box is empty')).toBeVisible();
  });

  it('Renders right options and does not move when move right button is clicked', async () => {
    const user = userEvent.setup()

    render(ListBoxSlot, { left: '' });
    const rightValue = screen.getByText('rightText2');
    await user.click(rightValue);

    const moveRightButton = screen.getByTestId('move-right');
    await user.click(moveRightButton);

    expect(rightValue).toBeVisible();
    expect(screen.getByText('Your left box is empty')).toBeVisible();
  });

  it('Only selected options move in the specified direction', async () => {
    const user = userEvent.setup()

    render(ListBox, { ...defaultProps });
    const leftValue1 = screen.getByText('leftText1');
    const leftValue2 = screen.getByText('leftText2');
    const leftValue3 = screen.getByText('leftText3');
    const rightValue1 = screen.getByText('rightText1');

    expect(leftValue1).toBeVisible();
    expect(leftValue2).toBeVisible();
    expect(leftValue3).toBeVisible();
    expect(rightValue1).toBeVisible();

    await user.click(leftValue2);

    const moveRightButton = screen.getByTestId('move-right');
    await user.click(moveRightButton);

    expect(leftValue1).toBeVisible();
    expect(leftValue1).toBeVisible();
    expect(rightValue1).toBeVisible();
  });

  it('Displays the left empty state', async () => {
    const user = userEvent.setup()

    render(ListBoxSlot);
    await user.click(screen.getByText('leftText1'));
    await user.click(screen.getByText('leftText2'));
    await user.click(screen.getByText('leftText3'));

    await user.click(screen.getByTestId('move-right'));

    expect(screen.getByText('Your left box is empty')).toBeVisible();
  });
  it('Displays the right empty state', async () => {
    const user = userEvent.setup()
    render(ListBoxSlot);

    await user.click(screen.getByText('rightText1'));
    await user.click(screen.getByText('rightText2'));
    await user.click(screen.getByText('rightText3'));

    await user.click(screen.getByTestId('move-left'));

    expect(screen.getByText('Your right box is empty')).toBeVisible();
  });
});
