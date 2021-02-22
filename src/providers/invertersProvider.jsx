import React from 'react';

const InvertersContext = React.createContext();

function useInverters() {
  const context = React.useContext(InvertersContext);

  if (!context) {
    throw new Error(`useModuls must be used within a ModulsProvider`);
  }
  return context;
}
function InvertersProvider(props) {
  const [inverters, setInverters] = React.useState([]);
  const value = React.useMemo(() => [inverters, setInverters], [inverters]);
  return <InvertersContext.Provider value={value} {...props} />;
}
export { InvertersProvider, useInverters };
