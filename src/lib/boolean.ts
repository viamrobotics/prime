export const htmlToBoolean = (value: string | undefined, key: string) => {
  return value === '' || value === 'true' || value === key;
};
