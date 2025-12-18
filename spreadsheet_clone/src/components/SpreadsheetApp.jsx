import React, { useReducer, useCallback } from 'react';
import '../styles/spreadsheet.css';  
import Grid from './Grid';
import { spreadsheetReducer } from '../state/spreadsheetReducer';
import { initializeCells } from '../utils/constants';

const SpreadsheetApp = () => {
  const [state, dispatch] = useReducer(spreadsheetReducer, {
    cells: initializeCells(),
    dependencies: {},
    dependents: {}
  });
  
  const handleCellUpdate = useCallback((cellId, rawInput) => {
    dispatch({ type: 'UPDATE_CELL', payload: { cellId, rawInput } });
  }, []);
  
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ marginBottom: '20px', fontSize: '24px' }}>
        React Spreadsheet Engine
      </h1>
      
      <div style={{ marginBottom: '15px', fontSize: '14px', color: '#666' }}>
        <p style={{ margin: '5px 0' }}>
          <strong>Instructions:</strong> Click any cell to edit. Use formulas starting with <code>=</code>
        </p>
        <p style={{ margin: '5px 0' }}>
          <strong>Examples:</strong> <code>=A1+B2</code>, <code>=A1*2</code>, <code>=(C1+D1)/3</code>
        </p>
        <p style={{ margin: '5px 0' }}>
          <strong>Errors:</strong> <code>#ERROR</code> for invalid formulas, <code>#CIRCULAR</code> for circular references
        </p>
      </div>
      
      <Grid cells={state.cells} onCellUpdate={handleCellUpdate} />
    </div>
  );
};

export default SpreadsheetApp;