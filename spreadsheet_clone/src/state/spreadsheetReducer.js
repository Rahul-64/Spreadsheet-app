import { parseCellReferences } from '../engine/parser';
import { evaluateFormula } from '../engine/evaluator';
import { detectCircular, updateDependencies } from '../engine/dependencyGraph';
import { topologicalSort } from '../engine/topologicalSort';

export const spreadsheetReducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_CELL': {
      const { cellId, rawInput } = action.payload;
      const newCells = { ...state.cells };
      let newDependencies = { ...state.dependencies };
      let newDependents = { ...state.dependents };
      
     
      const oldDeps = newDependents[cellId] || [];
      oldDeps.forEach(dep => {
        if (newDependencies[dep]) {
          newDependencies[dep] = newDependencies[dep].filter(d => d !== cellId);
        }
      });
      newDependents[cellId] = [];
      
    
      if (rawInput.startsWith('=')) {
        const refs = parseCellReferences(rawInput);
        newDependents[cellId] = refs;
        
        refs.forEach(ref => {
          if (!newDependencies[ref]) newDependencies[ref] = [];
          if (!newDependencies[ref].includes(cellId)) {
            newDependencies[ref].push(cellId);
          }
        });
      }
     
      if (detectCircular(cellId, newDependents)) {
        newCells[cellId] = {
          raw: rawInput,
          value: '#CIRCULAR',
          error: 'Circular reference detected'
        };
        return { ...state, cells: newCells, dependencies: newDependencies, dependents: newDependents };
      }
      
     
      if (rawInput.startsWith('=')) {
        const cellValues = {};
        Object.keys(newCells).forEach(id => {
          cellValues[id] = newCells[id].value;
        });
        const result = evaluateFormula(rawInput, cellValues);
        newCells[cellId] = { raw: rawInput, ...result };
      } else {
        const numValue = parseFloat(rawInput);
        newCells[cellId] = {
          raw: rawInput,
          value: isNaN(numValue) ? rawInput : numValue,
          error: null
        };
      }
      
 
      const toRecalc = topologicalSort(cellId, newDependencies);
      toRecalc.forEach(id => {
        if (id === cellId) return;
        
        const cell = newCells[id];
        if (cell.raw.startsWith('=')) {
          if (detectCircular(id, newDependents)) {
            newCells[id] = {
              ...cell,
              value: '#CIRCULAR',
              error: 'Circular reference detected'
            };
            return;
          }
          
          const cellValues = {};
          Object.keys(newCells).forEach(cid => {
            cellValues[cid] = newCells[cid].value;
          });
          const result = evaluateFormula(cell.raw, cellValues);
          newCells[id] = { ...cell, ...result };
        }
      });
      
      return { ...state, cells: newCells, dependencies: newDependencies, dependents: newDependents };
    }
    default:
      return state;
  }
};