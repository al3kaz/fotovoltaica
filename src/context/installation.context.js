import React from 'react';

const InstallationContext = React.createContext();

function useInstallation() {
  const context = React.useContext(InstallationContext);

  if (!context) {
    throw new Error(`useModuls must be used within a ModulsProvider`);
  }
  return context;
}
function InstallationProvider(props) {
  const [installation, setInstallation] = React.useState([]);
  const value = React.useMemo(() => [installation, setInstallation], [
    installation,
  ]);
  return <InstallationContext.Provider value={value} {...props} />;
}
export { InstallationProvider, useInstallation };
