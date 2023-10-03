import { describe, it, expect } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/svelte';
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
    render(ListBox, { ...defaultProps });
    const leftValue = screen.getByText('leftText2');
    await fireEvent.click(leftValue);
    const leftValue2 = screen.getByText('leftText2');
    expect(leftValue2).toHaveClass('bg-focus/highlight');

    const moveRightButton = screen.getByTestId('move-right');
    await fireEvent.click(moveRightButton);

    const movedValue = screen.getByText('leftText2');
    expect(leftValue).not.toBeVisible();
    expect(movedValue).toBeVisible();
  });
  it('Renders left options and does not move when move left button is clicked', async () => {
    render(ListBox, { ...defaultProps });
    const leftValue = screen.getByText('leftText2');
    await fireEvent.click(leftValue);

    const moveLeftButton = screen.getByTestId('move-left');
    await fireEvent.click(moveLeftButton);

    expect(leftValue).toBeVisible();
  });

  it('Renders right options and does not move when move right button is clicked', async () => {
    render(ListBox, { ...defaultProps });
    const rightValue = screen.getByText('rightText2');
    await fireEvent.click(rightValue);

    const moveRightButton = screen.getByTestId('move-right');
    await fireEvent.click(moveRightButton);

    expect(rightValue).toBeVisible();
  });

  it('Only selected options move in the specified direction', async () => {
    const leftValue1 = screen.getByText('leftText1');
    const leftValue2 = screen.getByText('leftText2');
    const leftValue3 = screen.getByText('leftText3');
    const rightValue1 = screen.getByText('rightText1');

    expect(leftValue1).toBeVisible();
    expect(leftValue2).toBeVisible();
    expect(leftValue3).toBeVisible();
    expect(rightValue1).toBeVisible();

    await fireEvent.click(leftValue2);

    const moveRightButton = screen.getByTestId('move-right');
    await fireEvent.click(moveRightButton);

    expect(leftValue1).toBeVisible();
    expect(leftValue2).not.toBeVisible();
    expect(leftValue1).toBeVisible();
    expect(rightValue1).toBeVisible();
  });
  it('Displays the left empty state', async () => {
    render(ListBoxSlot);
    await fireEvent.click(screen.getByText('leftText1'));
    await fireEvent.click(screen.getByText('leftText2'));
    await fireEvent.click(screen.getByText('leftText3'));

    await fireEvent.click(screen.getByTestId('move-right'));

    expect(screen.getByText('Your left box is empty')).toBeVisible();
  });
  it('Displays the right empty state', async () => {
    render(ListBoxSlot);

    await fireEvent.click(screen.getByText('rightText1'));
    await fireEvent.click(screen.getByText('rightText2'));
    await fireEvent.click(screen.getByText('rightText3'));

    await fireEvent.click(screen.getByTestId('move-left'));

    expect(screen.getByText('Your right box is empty')).toBeVisible();
  });
});
