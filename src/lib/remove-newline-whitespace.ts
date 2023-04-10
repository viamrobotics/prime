const NEWLINE_WHITESPACE_REGEX = /\s+|\r?\n|\r/g;

export const removeNewlineWhitespace = (value: string) =>
  value.replaceAll(NEWLINE_WHITESPACE_REGEX, '');
