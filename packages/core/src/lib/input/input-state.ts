export const InputStates = {
  INFO: 'info',
  WARN: 'warn',
  ERROR: 'error',
  NONE: 'none',
};

export type InputState = (typeof InputStates)[keyof typeof InputStates];
