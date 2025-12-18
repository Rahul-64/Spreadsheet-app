export const COLS = 'ABCDEFGHIJ'.split('');
export const ROWS = Array.from({ length: 10 }, (_, i) => i + 1);

export const initializeCells = () => {
  const cells = {};
  COLS.forEach(col => {
    ROWS.forEach(row => {
      cells[`${col}${row}`] = { raw: '', value: '', error: null };
    });
  });
  return cells;
};