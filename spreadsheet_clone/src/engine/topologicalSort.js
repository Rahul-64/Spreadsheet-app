
export const topologicalSort = (startCell, dependencies) => {
  const sorted = [];
  const visited = new Set();
  
  const visit = (cellId) => {
    if (visited.has(cellId)) return;
    visited.add(cellId);
    
    const dependents = dependencies[cellId] || [];
    dependents.forEach(visit);
    sorted.push(cellId);
  };
  
  visit(startCell);
  return sorted.reverse();
};                                                          