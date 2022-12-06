/* eslint-disable unicorn/prefer-regexp-test */
export const searchSort = (data: string[], searchTerm: string, reduce: boolean) => {
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
      if (Number(key) !== -1) {
        const sorted = (results[key] || []);
        finalResults.push(...sorted);
      }
    }
  } else {
    for (const key of Object.keys(results)) {
      const sorted = (results[key] || []);
      finalResults.push(...sorted);
    }
  }

  return finalResults;
};
