/* eslint-disable sonarjs/cognitive-complexity */
/* eslint-disable unicorn/prefer-regexp-test */

/*
 * Escape special characters so a string can be used in a RegEx constructor.
 *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions#escaping
 */
export const addSpecialCharacterEscapes = (value: string) => {
  return value.replaceAll(/[.*+?^${}()|[\]\\]/gu, '\\$&');
};

export const searchSort = (
  data: string[],
  searchTerm: string,
  reduce: boolean
) => {
  const results: Record<string, string[]> = {};
  const termCopy = addSpecialCharacterEscapes(searchTerm);

  const initialCharacterMatch = new RegExp(`^${termCopy}`, 'iu');
  const anyMatch = new RegExp(termCopy, 'giu');

  for (const datum of data) {
    let index = -1;
    const words = datum.split(' ');

    // eslint-disable-next-line unicorn/no-for-loop
    for (let i = 0; i < words.length; i += 1) {
      const word = words[i]!;

      if (word.match(initialCharacterMatch)) {
        index = 0;
        break;
      } else if (word.match(anyMatch)) {
        index = i + 1;
      }
    }

    if (results[index]) {
      results[index]!.push(datum);
    } else {
      results[index] = [datum];
    }
  }

  const finalResults: string[] = [];

  if (reduce) {
    for (const key of Object.keys(results)) {
      if (Number.parseInt(key, 10) !== -1) {
        const sorted = results[key] || [];
        finalResults.push(...sorted);
      }
    }
  } else {
    for (const key of Object.keys(results)) {
      const sorted = results[key] || [];
      finalResults.push(...sorted);
    }
  }

  return finalResults;
};
