import React, { createContext } from "react";

export interface SarsCov2DataContextType {
  estimates: Array<unknown> | undefined;
}

const initialSarsCov2DataContext = {
  estimates: [],
};

export const SarsCov2DataContext = createContext<
  SarsCov2DataContextType
>(initialSarsCov2DataContext);

interface SarsCov2DataProviderProps {
  children: React.ReactNode;
}

export const SarsCov2DataProvider = (props: SarsCov2DataProviderProps) => {
  return (
    <SarsCov2DataContext.Provider
      value={{
        estimates: [],
      }}
    >
      {props.children}
    </SarsCov2DataContext.Provider>
  );
}