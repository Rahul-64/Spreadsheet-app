// Detect circular reference using DFS
export const detectCircular = (cellId, dependencies, visited = new Set(), recStack = new Set()) => {
  visited.add(cellId);
  recStack.add(cellId);
  
  const deps = dependencies[cellId] || [];
  for (const dep of deps) {
    if (!visited.has(dep)) {
      if (detectCircular(dep, dependencies, visited, recStack)) {
        return true;
      }
    } else if (recStack.has(dep)) {
      return true;
    }
  }
  
  recStack.delete(cellId);
  return false;
};


export const updateDependencies = (cellId, newRefs, dependencies, dependents) => {
  const newDependencies = { ...dependencies };
  const newDependents = { ...dependents };
  

  const oldDeps = newDependents[cellId] || [];
  oldDeps.forEach(dep => {
    if (newDependencies[dep]) {
      newDependencies[dep] = newDependencies[dep].filter(d => d !== cellId);
    }
  });
  
  
  newDependents[cellId] = newRefs;
  newRefs.forEach(ref => {
    if (!newDependencies[ref]) newDependencies[ref] = [];
    if (!newDependencies[ref].includes(cellId)) {
      newDependencies[ref].push(cellId);
    }
  });
  
  return { dependencies: newDependencies, dependents: newDependents };
};