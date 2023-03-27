const newlineWhitespaceRegex = /\s+|\r?\n|\r/g;

export const removeNewlineWhitespace = (value: string) =>
  value.replaceAll(newlineWhitespaceRegex, '');
