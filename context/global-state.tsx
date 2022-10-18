import React, { useState } from "react";
import { GlobalStateInterface } from "../interfaces/global-state-types";

const AppContext = React.createContext({
  appState: {} as Partial<GlobalStateInterface>,
  setAppState: {} as React.Dispatch<React.SetStateAction<Partial<GlobalStateInterface>>>,
});

interface Props {
  children: React.ReactNode;
}

const GlobalState = ({ children }: Props) => {
  const initialState = {};

  const [appState, setAppState] = useState(initialState);

  const providerValue = {
    appState,
    setAppState,
  };

  return (<AppContext.Provider value={providerValue}>
    {children}
  </AppContext.Provider>);
};

export const useGlobalStateContext = () => React.useContext(AppContext);

export default GlobalState;
