import React from 'react';

const SettingsContext = React.createContext();

function useSettings() {
  const context = React.useContext(SettingsContext);

  if (!context) {
    throw new Error(`useSettings must be used within a SettingsProvider`);
  }
  return context;
}
function SettingsProvider(props) {
  const [settings, setSettings] = React.useState([]);
  const value = React.useMemo(() => [settings, setSettings], [settings]);
  return <SettingsContext.Provider value={value} {...props} />;
}
export { SettingsProvider, useSettings };