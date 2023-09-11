import cx from 'classnames';

export const cxTestArguments = [
  'cx-class',
  // eslint-disable-next-line no-constant-binary-expression
  1 + 1 === 2 && 'conditional-class',
  { 'object-class': true },
];

export const cxTestResults = cx(cxTestArguments);
