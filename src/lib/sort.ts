/* eslint-disable unicorn/prefer-regexp-test */
export const addSpecialCharacterEscapes = (value: string) => {
  // This function takes a value and adds backslashes for special chars 
  // so that it doesn't treat it as a special character in a
  let newValue = '';

  for (const element of value) {
    newValue += /[^\dA-Za-z]/.test(element) ? `\\${element}` : element;
  }
  return newValue
};

export const searchSort = (data: string[], searchTerm: string, reduce: boolean) => {
  const results: Record<string, string[]> = {};
  const termCopy = addSpecialCharacterEscapes(searchTerm);

  const initialCharacterMatch = new RegExp(`^${termCopy}`, 'i');
  const anyMatch = new RegExp(termCopy, 'gi');

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
      if (Number.parseInt(key, 10) !== -1) {
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
