import React from 'react';

const ProtectionContext = React.createContext();

function useProtection() {
  const context = React.useContext(ProtectionContext);

  if (!context) {
    throw new Error(`useModuls must be used within a ModulsProvider`);
  }
  return context;
}
function ProtectionProvider(props) {
  const [protection, setProtection] = React.useState([]);
  const value = React.useMemo(() => [protection, setProtection], [protection]);
  return <ProtectionContext.Provider value={value} {...props} />;
}
export { ProtectionProvider, useProtection };
