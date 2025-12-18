import React from 'react';
import Cell from './Cell';
import { COLS, ROWS } from '../utils/constants';

const Grid = ({ cells, onCellUpdate }) => {
  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={{ borderCollapse: 'collapse', backgroundColor: 'white' }}>
        <thead>
          <tr>
            <th style={{ 
              border: '1px solid #ddd', 
              padding: '8px', 
              backgroundColor: '#4a5568', 
              minWidth: '40px' 
            }}></th>
            {COLS.map(col => (
              <th key={col} style={{ 
                border: '1px solid #ddd', 
                padding: '8px', 
                backgroundColor: '#4a5568',
                fontWeight: 'bold',
                minWidth: '80px'
              }}>
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {ROWS.map(row => (
            <tr key={row}>
              <td style={{ 
                border: '1px solid #ddd', 
                padding: '8px', 
                backgroundColor: '#4a5568',
                fontWeight: 'bold',
                textAlign: 'center'
              }}>
                {row}
              </td>
              {COLS.map(col => {
                const cellId = `${col}${row}`;
                return (
                  <Cell
                    key={cellId}
                    cellId={cellId}
                    cellData={cells[cellId]}
                    onUpdate={onCellUpdate}
                  />
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Grid;
