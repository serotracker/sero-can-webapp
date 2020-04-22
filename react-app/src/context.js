import React, { useReducer, createContext } from "react";

export const AppContext = createContext();

const initialState = {
    healthcheck: ''
};

const reducer = (state, action) => {
  switch (action.type) {
    case "HEALTHCHECK":
      return {
        healthcheck: action.payload
      };
    default:
      return state
  }
};

export const AppContextProvider = props => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppContext.Provider value={[state, dispatch]}>
      {props.children}
    </AppContext.Provider>
  );
};