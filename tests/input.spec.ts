import { test, expect } from '@playwright/test';
import { hexToRGB, waitForCustomEvent } from './lib/helper.js';

test.beforeEach(async ({ page }) => {
  await page.goto('/playground/input-test.html');
});

test('Given type text, renders text input', async ({ page }) => {
  const inputText = page.getByTestId('input-text');
  await expect(inputText).toBeVisible();
  await expect(inputText.locator('input').first()).toHaveAttribute(
    'type',
    'text'
  );
});

test('Given no type, renders text input', async ({ page }) => {
  const inputDefault = page.getByTestId('input-default');
  await expect(inputDefault).toBeVisible();
  await expect(inputDefault.locator('input').first()).toHaveAttribute(
    'type',
    'text'
  );
});

test('Given value attribute, initializes with given value as input value', async ({
  page,
}) => {
  const inputText = page.getByTestId('input-text');
  await expect(inputText).toBeVisible();
  await expect(inputText.locator('input').first()).toHaveValue('value');
});

test('Displays "*" next to the label if required', async ({ page }) => {
  const inputRequired = page.getByTestId('input-required');
  await expect(inputRequired).toBeVisible();
  await expect(inputRequired.locator('input[required]').first()).toBeVisible();
  const asterisk = await inputRequired.getByText('>:)').evaluate((e1) => {
    return {
      content: window
        .getComputedStyle(e1, ':after')
        .getPropertyValue('content'),
      color: window.getComputedStyle(e1, ':after').color,
    };
  });
  expect(asterisk.content).toContain('*');
  expect(asterisk.color).toBe(hexToRGB('colors', 'danger-dark'));
});

test('Displays label on top of input by default', async ({ page }) => {
  const inputDefault = page.getByTestId('input-default');
  await expect(inputDefault.getByText('default')).toBeVisible();
  await expect(
    inputDefault.locator("input:below(:text('default'))").first()
  ).toBeVisible();
});

test('Displays label on top of input with labelposition top', async ({
  page,
}) => {
  const inputLabelTop = page.getByTestId('input-label-top');
  await expect(inputLabelTop.getByText(':D')).toBeVisible();
  await expect(
    inputLabelTop.locator("input:below(:text(':D'))").first()
  ).toBeVisible();
});

test('Displays label to left of input with labelposition left', async ({
  page,
}) => {
  const inputLabelLeft = page.getByTestId('input-label-left');
  await expect(inputLabelLeft.getByText('D:')).toBeVisible();
  await expect(
    inputLabelLeft.locator("input:right-of(:text('D:'))").first()
  ).toBeVisible();
});

test('Given type number, initializes with given number value', async ({
  page,
}) => {
  const inputNumber = page.getByTestId('input-number');
  await expect(inputNumber).toBeVisible();
  await expect(inputNumber.locator('input').first()).toHaveValue('3.14159');
});

test('Given type number, only allows number-related characters ([0-9eE+-.]) to be input', async ({
  page,
}) => {
  const inputNumber = page.getByTestId('input-number');
  const input = inputNumber.locator('input').first();

  await input.fill('NaN!!!');
  await expect(input).toHaveValue('');

  await input.fill('101');
  await expect(input).toHaveValue('101');

  await input.fill('3.14');
  await expect(input).toHaveValue('3.14');

  await input.fill('3.141e2');
  await expect(input).toHaveValue('3.141e2');

  await input.fill('-3.141e+2');
  await expect(input).toHaveValue('-3.141e+2');

  await input.fill('3aBc!.+-e');
  await expect(input).toHaveValue('3.+-e');
});

test('Given type number, displays error state if number if invalid on blur', async ({
  page,
}) => {
  const inputNumber = page.getByTestId('input-number');
  const input = inputNumber.locator('input').first();

  await input.fill('eeeEEE');
  await input.blur();
  await expect(input).toHaveCSS(
    'border-color',
    hexToRGB('colors', 'danger-dark')
  );
});

test('Given type number, responds to up and down keys according to step value', async ({
  page,
}) => {
  // default step 1
  const inputNumber = page.getByTestId('input-number');
  const inputBoxNumber = inputNumber.locator('input').first();
  await inputBoxNumber.fill('0');
  await inputBoxNumber.press('ArrowUp');
  expect(Number.parseFloat(await inputBoxNumber.inputValue())).toBe(1);
  await inputBoxNumber.press('ArrowDown');
  expect(Number.parseFloat(await inputBoxNumber.inputValue())).toBe(0);

  const inputStep = page.getByTestId('input-step');
  const inputBoxStep = inputStep.locator('input').first();
  await inputBoxStep.press('ArrowUp');
  expect(Number.parseFloat(await inputBoxStep.inputValue())).toBe(0.5);
  await inputBoxStep.press('ArrowDown');
  expect(Number.parseFloat(await inputBoxStep.inputValue())).toBe(0);
});

test('Given type number, limits input to range within max and min values with slider', async ({
  page,
}) => {
  const inputSlider = page.getByTestId('input-slider');
  const input = inputSlider.locator('input').first();
  const slider = inputSlider.locator('div.cursor-pointer').first();
  await slider.dragTo(slider, {
    targetPosition: { x: 200, y: 0 },
    force: true,
  });
  expect(Number.parseFloat(await input.inputValue())).toBeGreaterThan(0);
  expect(Number.parseFloat(await input.inputValue())).toBeLessThan(50);

  // test max
  await slider.dragTo(slider, {
    targetPosition: { x: 1000, y: 0 },
    force: true,
  });
  expect(Number.parseFloat(await input.inputValue())).toBe(50);

  // test min
  await slider.dragTo(slider, {
    targetPosition: { x: -1000, y: 0 },
    force: true,
  });
  expect(Number.parseFloat(await input.inputValue())).toBe(-50);
});

test('Given type number and no step value, defaults step to 1', async ({
  page,
}) => {
  const inputNumber = page.getByTestId('input-number');
  await expect(inputNumber).toBeVisible();
  await expect(inputNumber.locator('input').first()).toHaveJSProperty(
    'step',
    '1'
  );
});

test('Given type integer, renders number input and initializes with given value', async ({
  page,
}) => {
  const inputInteger = page.getByTestId('input-integer');
  await expect(inputInteger).toBeVisible();
  await expect(inputInteger.locator('input').first()).toHaveAttribute(
    'type',
    'number'
  );
  await expect(inputInteger.locator('input').first()).toHaveValue('20');
});

test('Given type integer, responds to up and down keys and slider with integers according to step value', async ({
  page,
}) => {
  const inputInteger = page.getByTestId('input-integer');
  const input = inputInteger.locator('input').first();
  await input.press('ArrowUp');
  expect(await input.inputValue()).toBe('30');
  await input.press('ArrowDown');
  expect(await input.inputValue()).toBe('20');

  const slider = inputInteger.locator('div.cursor-pointer').first();
  await slider.dragTo(slider, {
    targetPosition: { x: 500, y: 0 },
    force: true,
  });
  const inputValue = await input.inputValue();

  expect(inputValue.includes('.')).toBe(false);
  expect(Number(inputValue) % 10).toBe(0);
});

test('Displays placeholder', async ({ page }) => {
  const inputPlaceholder = page.getByTestId('input-placeholder');
  await expect(inputPlaceholder).toBeVisible();
  await expect(inputPlaceholder.locator('input').first()).toHaveAttribute(
    'placeholder',
    'waka waka'
  );
});

test('Given type date, renders date input', async ({ page }) => {
  const inputDate = page.getByTestId('input-date');
  await expect(inputDate).toBeVisible();
  await expect(inputDate.locator('input').first()).toHaveAttribute(
    'type',
    'date'
  );
});

test('Given type time, renders time input', async ({ page }) => {
  const inputTime = page.getByTestId('input-time');
  await expect(inputTime).toBeVisible();
  await expect(inputTime.locator('input').first()).toHaveAttribute(
    'type',
    'time'
  );
});

test('Given type datetime-local, renders datetime-local input', async ({
  page,
}) => {
  const inputDatetime = page.getByTestId('input-datetimelocal');
  await expect(inputDatetime).toBeVisible();
  await expect(inputDatetime.locator('input').first()).toHaveAttribute(
    'type',
    'datetime-local'
  );
});

test('Given type email, renders email input', async ({ page }) => {
  const inputEmail = page.getByTestId('input-email');
  await expect(inputEmail).toBeVisible();
  await expect(inputEmail.locator('input').first()).toHaveAttribute(
    'type',
    'email'
  );
});

test('Renders without label if not given a label', async ({ page }) => {
  const inputText = page.getByTestId('input-text');
  expect(await inputText.locator(':above(input)').first().textContent()).toBe(
    ' '
  );
});

test('Given attribute tooltip with no state, render info icon above the input', async ({
  page,
}) => {
  const inputTooltip = page.getByTestId('input-tooltip-default');
  await expect(inputTooltip.locator('v-tooltip > div').first()).toHaveClass(
    /icon-info-outline/u
  );
});

test('Given attribute tooltip with info state, render info icon above the input', async ({
  page,
}) => {
  const inputInfoTooltip = page.getByTestId('input-tooltip-info');
  await expect(inputInfoTooltip.locator('v-tooltip > div').first()).toHaveClass(
    /icon-info-outline/u
  );
});

test('Given attribute tooltip with warn state, render warn icon above the input', async ({
  page,
}) => {
  const inputWarnTooltip = page.getByTestId('input-tooltip-warn');
  await expect(inputWarnTooltip.locator('v-tooltip > div').first()).toHaveClass(
    /icon-error-outline text-warning-bright/u
  );
});

test('Given attribute tooltip with error state, render error icon above the input', async ({
  page,
}) => {
  const inputErrorTooltip = page.getByTestId('input-tooltip-error');
  await expect(
    inputErrorTooltip.locator('v-tooltip > div').first()
  ).toHaveClass(/icon-error-outline text-danger-dark/u);
});

test('Given a readonly attribute, renders readonly input', async ({ page }) => {
  const inputReadonly = page.getByTestId('input-readonly');
  await expect(inputReadonly).toBeVisible();
  await expect(inputReadonly.locator('input').first()).toHaveAttribute(
    'readonly',
    ''
  );
  await expect(inputReadonly.locator('input').first()).toHaveValue('teehee');
});

test('Given a disabled attribute, renders disabled input', async ({ page }) => {
  const inputDisabled = page.getByTestId('input-disabled');
  await expect(inputDisabled).toBeVisible();
  await expect(inputDisabled.locator('input').first()).toBeDisabled();
  await expect(inputDisabled.locator('input').first()).toHaveClass(
    /bg-disabled-light text-disabled-dark border-disabled-light/u
  );
});

test('Displays message below input box', async ({ page }) => {
  const inputMessage = page.getByTestId('input-message');
  await expect(inputMessage).toBeVisible();
  await expect(inputMessage.getByText("it's the cliiimb")).toBeVisible();
  await expect(
    inputMessage.locator('input:above(:text("it\'s the cliiimb"))')
  ).toBeVisible();
});

test('With error state, displays message below input box in red', async ({
  page,
}) => {
  const inputMessageError = page.getByTestId('input-message-error');
  await expect(inputMessageError.getByText('fell off the cliiimb')).toHaveClass(
    /text-red-600/u
  );
  await expect(
    inputMessageError.locator('input:above(:text("fell off the cliiimb"))')
  ).toBeVisible();
});

test('Given type number, only dispatches valid and new number values', async ({
  page,
}) => {
  const inputNumber = page.getByTestId('input-number');
  const input = inputNumber.locator('input').first();

  // fires an event after clearing initial value from value property
  const blankInputEvent = waitForCustomEvent(inputNumber, 'input');
  await input.fill('invalid Ch@rs!');
  expect(await input.inputValue()).toBe('');
  await expect(blankInputEvent.detail()).resolves.toEqual({ value: '' });

  const noInputEvent1 = waitForCustomEvent(inputNumber, 'input');
  await input.type('ee more invalid chars');
  expect(await input.inputValue()).toBe('eee');
  await expect(noInputEvent1.didNotOccur()).resolves.toBe(true);

  const validInputEvent = waitForCustomEvent(inputNumber, 'input');
  await input.fill('1');
  expect(await input.inputValue()).toBe('1');
  await expect(validInputEvent.detail()).resolves.toEqual({ value: '1' });

  const noInputEvent2 = waitForCustomEvent(inputNumber, 'input');
  await input.type('.');
  expect(await input.inputValue()).toBe('1.');
  await expect(noInputEvent2.didNotOccur()).resolves.toBe(true);
});

test('Fires input event with value on input', async ({ page }) => {
  const inputDefault = page.getByTestId('input-default');
  const input = inputDefault.locator('input').first();
  const isInputEventEmitted = waitForCustomEvent(inputDefault, 'input');

  await input.fill('asdfJKL;123');
  await expect(isInputEventEmitted.detail()).resolves.toEqual({
    value: 'asdfJKL;123',
  });
});
