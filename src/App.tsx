import React, { useContext, useEffect } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import './App.css';
import About from './components/pages/About';
import Dashboard from "./components/pages/Dashboard/Dashboard";
import Data from './components/pages/Data';
import { NavBar } from "./components/shared/NavBar";
import { AppContext } from "./context";
import httpClient from "./httpClient";
import ReactGA from 'react-ga';
import { setLanguageType } from "./utils/translate/translateService";

function App() {
  ReactGA.initialize('UA-168119924-1');
  
  const [{ language }, dispatch] = useContext(AppContext);
  // DATA
  useEffect(() => {
    const api = new httpClient()
    const getAirtableRecords = async () => {
      const response = await api.getAirtableRecords()
      dispatch({
        type: 'GET_AIRTABLE_RECORDS',
        payload: response
      });
    }
    getAirtableRecords();
    setLanguageType(language);
  }, [dispatch, language])

  // ROUTING TABS
  return (
    <div className="App">
      <NavBar />
      <Switch>
        <Route path="/About">
          <About />
        </Route>
        <Route path="/Dashboard">
          <Dashboard />
        </Route>
        <Route path="/Data">
          <Data />
        </Route>
        <Redirect exact from="/" to="/Dashboard" />
      </Switch>
    </div>
  );
}

export default App;
