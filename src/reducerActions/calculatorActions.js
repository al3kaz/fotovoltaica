export function reducer(state, action) {
  switch (action.type) {
    case 'setRequestedPower':
      return { ...state, requestedPower: action.payload };
    case 'setModuleIndex':
      return { ...state, moduleIndex: action.payload };
    case 'setModulePower':
      return { ...state, modulePower: action.payload };
    case 'setClientInfo':
      return { ...state, clientInfo: action.payload };
    case 'setPhase':
      return { ...state, phase: action.payload };
    case 'setInverterProducent':
      return { ...state, inverterProducent: action.payload };
    case 'setCorrectInverterModelId':
      return { ...state, correctInverterModelId: action.payload };
    case 'setTypeOfRoof':
      return { ...state, typeOfRoof: action.payload };
    case 'setMargins':
      return { ...state, margins: action.payload };
    case 'setModuleCount':
      return { ...state, moduleCount: action.payload };
    case 'setOptiCount':
      return { ...state, optiCount: action.payload };
    case 'setOptiCheck':
      return { ...state, optiCheck: action.payload };
    case 'setOptiIndex':
      return { ...state, optiIndex: action.payload };
    default:
      throw new Error(`invalid aciotn type: ${action.type}`);
  }
}
