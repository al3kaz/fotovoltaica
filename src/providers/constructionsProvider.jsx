import React from 'react';

const ConstructionsContext = React.createContext();

function useConstructions() {
  const context = React.useContext(ConstructionsContext);

  if (!context) {
    throw new Error(`useModuls must be used within a ModulsProvider`);
  }
  return context;
}
function ConstructionsProvider(props) {
  const [constructions, setConstructions] = React.useState([]);
  const value = React.useMemo(() => [constructions, setConstructions], [
    constructions,
  ]);
  return <ConstructionsContext.Provider value={value} {...props} />;
}
export { ConstructionsProvider, useConstructions };
