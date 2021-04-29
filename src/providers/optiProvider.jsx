import React from 'react';

const OptiContext = React.createContext();

function useOpti() {
  const context = React.useContext(OptiContext);

  if (!context) {
    throw new Error(`useOpti must be used within a OptiProvider`);
  }
  return context;
}
function OptiProvider(props) {
  const [opti, setOpti] = React.useState([]);
  const value = React.useMemo(() => [opti, setOpti], [opti]);
  return <OptiContext.Provider value={value} {...props} />;
}
export { OptiProvider, useOpti };