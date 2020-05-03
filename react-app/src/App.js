import React from 'react';
import { AppContextProvider } from "./context";
import Component from "./components/Component"
import Map from "./components/map/Map";

function App() {
  return (
    <AppContextProvider>
      <Component></Component>
      <Map></Map>
    </AppContextProvider>
  );
}

export default App;
