export const createName = (
  existingNames: string[],
  template: string,
  index: number
) => {
  let i = index;
  let name = `${template}-${i}`;

  while (existingNames.includes(name)) {
    i += 1;
    name = `${template}-${i}`;
  }

  return name;
};
