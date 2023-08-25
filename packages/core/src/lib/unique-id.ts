let counter = 0;

export const useUniqueId = () => {
  counter += 1;
  return `uid-${counter}-${Date.now()}`;
};
