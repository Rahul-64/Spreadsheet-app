import React, { useState, memo } from 'react';

const Cell = memo(({ cellId, cellData, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [localValue, setLocalValue] = useState(cellData.raw);
  
  const handleClick = () => {
    setIsEditing(true);
    setLocalValue(cellData.raw);
  };
  
  const handleBlur = () => {
    setIsEditing(false);
    if (localValue !== cellData.raw) {
      onUpdate(cellId, localValue);
    }
  };
  
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.target.blur();
    }
    if (e.key === 'Escape') {
      setLocalValue(cellData.raw);
      setIsEditing(false);
    }
  };
  
  const displayValue = cellData.value === '' ? '' : String(cellData.value);
  const isError = cellData.error !== null;
  
  return (
    <td
      style={{
        border: '1px solid #ddd',
        padding: '4px',
        minWidth: '80px',
        height: '32px',
        backgroundColor: isError ? '#ffebee' : isEditing ? '#e3f2fd' : 'white',
        cursor: 'pointer'
      }}
      onClick={!isEditing ? handleClick : undefined}
    >
      {isEditing ? (
        <input
          autoFocus
          value={localValue}
          onChange={(e) => setLocalValue(e.target.value)}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          style={{
            width: '100%',
            border: 'none',
            outline: 'none',
            fontFamily: 'monospace',
            fontSize: '13px',
            padding: 0,
            backgroundColor: 'transparent'
          }}
        />
      ) : (
        <div style={{
          fontFamily: 'monospace',
          fontSize: '13px',
          color: isError ? '#c62828' : '#000',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap'
        }}>
          {displayValue}
        </div>
      )}
    </td>
  );
});

export default Cell;