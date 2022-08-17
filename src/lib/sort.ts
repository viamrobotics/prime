/* eslint-disable unicorn/prefer-regexp-test */
const optionLocaleCompare = (a: string, b: string) => {
  return a.localeCompare(b);
};

export const searchSort = (data: string[], searchTerm: string) => {
  const results: Record<string, string[]> = {};

  const initialCharacterMatch = new RegExp(`^${searchTerm}`, 'i');
  const anyMatch = new RegExp(searchTerm, 'gi');

  for (const datum of data) {
    let index = -1;
    const words = datum.split(' ');

    // eslint-disable-next-line unicorn/no-for-loop
    for (let i = 0; i < words.length; i++) {
      const word = words[i]!;

      if (word.match(initialCharacterMatch)) {
        index = 0;
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

  for (const key of Object.keys(results)) {
    const sorted = (results[key] || []).sort(optionLocaleCompare);
    
    finalResults.push(...sorted);
  }

  return finalResults;
};
