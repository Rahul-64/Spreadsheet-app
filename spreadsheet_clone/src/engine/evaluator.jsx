import { parseCellReferences } from './parser';


export const evaluateFormula = (formula, cellValues) => {
  try {
    let expression = formula.slice(1); 
    
    
    const cellRefs = parseCellReferences(formula);
    for (const ref of cellRefs) {
      const cellValue = cellValues[ref];
      if (cellValue === undefined || cellValue === '' || cellValue === null) {
        return { value: '#ERROR', error: 'Invalid reference' };
      }
      if (typeof cellValue === 'string' && cellValue.startsWith('#')) {
        return { value: '#ERROR', error: 'Reference error' };
      }
      expression = expression.replace(new RegExp(ref, 'g'), cellValue);
    }
    
    
    const result = Function('"use strict"; return (' + expression + ')')();
    
    if (!isFinite(result)) {
      return { value: '#ERROR', error: 'Invalid calculation' };
    }
    
    return { value: result, error: null };
  } catch (e) {
    return { value: '#ERROR', error: 'Invalid formula' };
  }
};