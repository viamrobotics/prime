export const clamp = (val: number, minVal: number, maxVal: number): number => {
  return val <= minVal ? minVal : (val >= maxVal ? maxVal : val)
}

/**
   * take in a value, and then calculate that value's percentage
   * of the overall range (min-max)
   **/
export const percentOf = (val: number, min: number, max: number, precision: number): number => {
  const perc = ((val - min) / (max - min)) * 100
  if (Number.isNaN(perc) || perc <= 0) {
    return 0
  } else if (perc >= 100) {
    return 100
  } else {
    return Number.parseFloat(perc.toFixed(precision))
  }
}
