export type NumericInputTypes = 'number' | 'integer';

export const getDecimals = (value = '', decimalDigits = 0) => {
  return Math.max(
    value.includes('.') ? value.length - value.indexOf('.') - 1 : 0,
    decimalDigits
  );
};

export const parseNumericInputValue = (
  value = '',
  type: NumericInputTypes = 'number'
) =>
  type === 'number' ? Number.parseFloat(value) : Number.parseInt(value, 10);
