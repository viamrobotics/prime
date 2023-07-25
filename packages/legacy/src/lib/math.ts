export const clamp = (val: number, minVal: number, maxVal: number): number => {
  return val <= minVal ? minVal : val >= maxVal ? maxVal : val;
};

/**
 * take in a value, and then calculate that value's percentage
 * of the overall range (min-max)
 **/
export const percentOf = (
  val: number,
  min: number,
  max: number,
  precision: number
): number => {
  const perc = ((val - min) / (max - min)) * 100;
  if (Number.isNaN(perc) || perc <= 0) {
    return 0;
  } else if (perc >= 100) {
    return 100;
  } else {
    return Number.parseFloat(perc.toFixed(precision));
  }
};

export const hashCode = (str: string) => {
  let hash = 0;
  let chr = 0;

  if (str.length === 0) {
    return hash;
  }

  for (let index = 0; index < str.length; index += 1) {
    chr = str.codePointAt(index)!;
    // eslint-disable-next-line no-bitwise
    hash = (hash << 5) - hash + chr;
    hash = Math.trunc(hash); // Convert to 32bit integer
  }

  return hash;
};
