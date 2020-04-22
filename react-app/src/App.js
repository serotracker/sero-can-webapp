import React from 'react';
import { AppContextProvider } from "./context";
import Component from "./components/Component"

function App() {
  return (
    <AppContextProvider>
      <Component></Component>
    </AppContextProvider>
  );
}

export default App;
