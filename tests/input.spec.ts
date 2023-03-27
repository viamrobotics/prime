import { test, expect } from '@playwright/test';
import {
  hexToRGB,
  getCustomEventParam,
  waitForCustomEventTimeout,
  waitForCustomEventWithParam,
} from './lib/helper.ts';

test.beforeEach(async ({ page }) => {
  await page.goto('/input-test.html');
});

test('Given type text, renders text input', async ({ page }) => {
  const inputText = await page.getByTestId('input-text');
  await expect(inputText).toBeVisible();
  await expect(inputText.locator('input').first()).toHaveAttribute(
    'type',
    'text'
  );
});

test('Given no type, renders text input', async ({ page }) => {
  const inputDefault = await page.getByTestId('input-default');
  await expect(inputDefault).toBeVisible();
  await expect(inputDefault.locator('input').first()).toHaveAttribute(
    'type',
    'text'
  );
});

test('Given value attribute, initializes with given value as input value', async ({
  page,
}) => {
  const inputText = await page.getByTestId('input-text');
  await expect(inputText).toBeVisible();
  await expect(inputText.locator('input').first()).toHaveValue('value');
});

test('Displays "*" next to the label if required', async ({ page }) => {
  const inputRequired = await page.getByTestId('input-required');
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
  expect(asterisk.color).toBe(hexToRGB('danger-fg'));
});

test('Displays label on top of input by default', async ({ page }) => {
  const inputDefault = await page.getByTestId('input-default');
  await expect(inputDefault.getByText('default')).toBeVisible();
  await expect(
    await inputDefault.locator("input:below(:text('default'))").first()
  ).toBeVisible();
});

test('Displays label on top of input with labelposition top', async ({
  page,
}) => {
  const inputLabelTop = await page.getByTestId('input-label-top');
  await expect(inputLabelTop.getByText(':D')).toBeVisible();
  await expect(
    await inputLabelTop.locator("input:below(:text(':D'))").first()
  ).toBeVisible();
});

test('Displays label to left of input with labelposition left', async ({
  page,
}) => {
  const inputLabelLeft = await page.getByTestId('input-label-left');
  await expect(inputLabelLeft.getByText('D:')).toBeVisible();
  await expect(
    await inputLabelLeft.locator("input:right-of(:text('D:'))").first()
  ).toBeVisible();
});

test('Given type number, initializes with given number value', async ({
  page,
}) => {
  const inputNumber = await page.getByTestId('input-number');
  await expect(inputNumber).toBeVisible();
  await expect(inputNumber.locator('input').first()).toHaveValue('3.14159');
});

test('Given type number, only allows number-related characters ([0-9eE+-.]) to be input', async ({
  page,
}) => {
  const inputNumber = await page.getByTestId('input-number');
  const input = await inputNumber.locator('input').first();

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
  const inputNumber = await page.getByTestId('input-number');
  const input = await inputNumber.locator('input').first();

  await input.fill('eeeEEE');
  await input.blur();
  await expect(input).toHaveCSS('border-color', hexToRGB('danger-fg'));
});

test('Given type number, responds to up and down keys according to step value', async ({
  page,
}) => {
  // default step 1
  const inputNumber = await page.getByTestId('input-number');
  const inputBoxNumber = await inputNumber.locator('input').first();
  await inputBoxNumber.fill('0');
  await inputBoxNumber.press('ArrowUp');
  await expect(Number.parseFloat(await inputBoxNumber.inputValue())).toBe(1);
  await inputBoxNumber.press('ArrowDown');
  await expect(Number.parseFloat(await inputBoxNumber.inputValue())).toBe(0);

  const inputStep = await page.getByTestId('input-step');
  const inputBoxStep = await inputStep.locator('input').first();
  await inputBoxStep.press('ArrowUp');
  await expect(Number.parseFloat(await inputBoxStep.inputValue())).toBe(0.5);
  await inputBoxStep.press('ArrowDown');
  await expect(Number.parseFloat(await inputBoxStep.inputValue())).toBe(0);
});

test('Given type number, limits input to range within max and min values with slider', async ({
  page,
}) => {
  const inputSlider = await page.getByTestId('input-slider');
  const input = await inputSlider.locator('input').first();
  const slider = await inputSlider.locator('div.cursor-pointer').first();
  await slider.dragTo(slider, {
    targetPosition: { x: 200, y: 0 },
    force: true,
  });
  expect(Number.parseFloat(await input.inputValue())).toBeGreaterThan(0);
  expect(Number.parseFloat(await input.inputValue())).toBeLessThan(50); // don't slide to max yet

  // test max
  await slider.dragTo(slider, {
    targetPosition: { x: 1000, y: 0 },
    force: true,
  });
  await expect(Number.parseFloat(await input.inputValue())).toBe(50);

  // test min
  await slider.dragTo(slider, {
    targetPosition: { x: -1000, y: 0 },
    force: true,
  });
  await expect(Number.parseFloat(await input.inputValue())).toBe(-50);
});

test('Given type number and no step value, defaults step to 1', async ({
  page,
}) => {
  const inputNumber = await page.getByTestId('input-number');
  await expect(inputNumber).toBeVisible();
  await expect(inputNumber.locator('input').first()).toHaveJSProperty(
    'step',
    '1'
  );
});

test('Given type integer, renders number input and initializes with given value', async ({
  page,
}) => {
  const inputInteger = await page.getByTestId('input-integer');
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
  const inputInteger = await page.getByTestId('input-integer');
  const input = await inputInteger.locator('input').first();
  await input.press('ArrowUp');
  expect(await input.inputValue()).toBe('30');
  await input.press('ArrowDown');
  expect(await input.inputValue()).toBe('20');

  const slider = await inputInteger.locator('div.cursor-pointer').first();
  await slider.dragTo(slider, {
    targetPosition: { x: 500, y: 0 },
    force: true,
  });
  expect((await input.inputValue()).includes('.')).toBe(false);
  expect(Number.parseInt(await input.inputValue()) % 10).toBe(0);
});

test('Displays placeholder', async ({ page }) => {
  const inputPlaceholder = await page.getByTestId('input-placeholder');
  await expect(inputPlaceholder).toBeVisible();
  await expect(inputPlaceholder.locator('input').first()).toHaveAttribute(
    'placeholder',
    'waka waka'
  );
});

test('Given type date, renders date input', async ({ page }) => {
  const inputDate = await page.getByTestId('input-date');
  await expect(inputDate).toBeVisible();
  await expect(inputDate.locator('input').first()).toHaveAttribute(
    'type',
    'date'
  );
});

test('Given type time, renders time input', async ({ page }) => {
  const inputTime = await page.getByTestId('input-time');
  await expect(inputTime).toBeVisible();
  await expect(inputTime.locator('input').first()).toHaveAttribute(
    'type',
    'time'
  );
});

test('Given type datetime-local, renders datetime-local input', async ({
  page,
}) => {
  const inputDatetime = await page.getByTestId('input-datetimelocal');
  await expect(inputDatetime).toBeVisible();
  await expect(inputDatetime.locator('input').first()).toHaveAttribute(
    'type',
    'datetime-local'
  );
});

test('Given type email, renders email input', async ({ page }) => {
  const inputEmail = await page.getByTestId('input-email');
  await expect(inputEmail).toBeVisible();
  await expect(inputEmail.locator('input').first()).toHaveAttribute(
    'type',
    'email'
  );
});

test('Renders without label if not given a label', async ({ page }) => {
  const inputText = await page.getByTestId('input-text');
  await expect(
    await inputText.locator(':above(input)').first().textContent()
  ).toBe(' ');
});

test('Given attribute tooltip with no state, render info icon above the input', async ({
  page,
}) => {
  const inputTooltip = page.getByTestId('input-tooltip-default');
  await expect(inputTooltip.locator('v-tooltip > div').first()).toHaveClass(
    /icon-info-outline/
  );
});

test('Given attribute tooltip with info state, render info icon above the input', async ({
  page,
}) => {
  const inputInfoTooltip = page.getByTestId('input-tooltip-info');
  await expect(inputInfoTooltip.locator('v-tooltip > div').first()).toHaveClass(
    /icon-info-outline/
  );
});

test('Given attribute tooltip with warn state, render warn icon above the input', async ({
  page,
}) => {
  const inputWarnTooltip = page.getByTestId('input-tooltip-warn');
  await expect(inputWarnTooltip.locator('v-tooltip > div').first()).toHaveClass(
    /icon-error-outline text-warning-bright/
  );
});

test('Given attribute tooltip with error state, render error icon above the input', async ({
  page,
}) => {
  const inputErrorTooltip = page.getByTestId('input-tooltip-error');
  await expect(
    inputErrorTooltip.locator('v-tooltip > div').first()
  ).toHaveClass(/icon-error-outline text-danger-fg/);
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
    /bg-disabled-bg text-disabled-fg border-disabled-bg/
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
    /text-red-600/
  );
  await expect(
    inputMessageError.locator('input:above(:text("fell off the cliiimb"))')
  ).toBeVisible();
});

test('Given type number, only dispatches valid and new number values', async ({
  page,
}) => {
  const inputNumber = await page.getByTestId('input-number');
  const input = await inputNumber.locator('input').first();

  const noInputEvent1 = await waitForCustomEventTimeout(page, 'input');
  await input.fill('NaN');
  await noInputEvent1;

  const isInputEventEmitted = await waitForCustomEventWithParam(
    page,
    'input',
    'value'
  );
  await input.fill('1');
  expect(await getCustomEventParam(page, 'input', 'value')).toBe('1');

  const noInputEvent2 = await waitForCustomEventTimeout(page, 'input');
  await input.type('.');
  await noInputEvent2;
});

test('Fires input event with value on input', async ({ page }) => {
  const input = page.getByTestId('input-default').locator('input').first();
  const isInputEventEmitted = await waitForCustomEventWithParam(
    page,
    'input',
    'value'
  );
  await input.fill('asdfJKL;123');
  expect(isInputEventEmitted).toBeTruthy();
  expect(await getCustomEventParam(page, 'input', 'value')).toBe('asdfJKL;123');
});
