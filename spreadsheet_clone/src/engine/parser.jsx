
export const parseCellReferences = (formula) => {
  const matches = formula.match(/[A-J]([1-9]|10)/g);
  return matches ? [...new Set(matches)] : [];
};