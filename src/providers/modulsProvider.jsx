import React from 'react';

const ModulsContext = React.createContext();

function useModuls() {
  const context = React.useContext(ModulsContext);

  if (!context) {
    throw new Error(`useModuls must be used within a ModulsProvider`);
  }
  return context;
}
function ModulsProvider(props) {
  const [moduls, setModuls] = React.useState([]);
  const value = React.useMemo(() => [moduls, setModuls], [moduls]);
  return <ModulsContext.Provider value={value} {...props} />;
}
export { ModulsProvider, useModuls };
