import React, { useContext, useEffect } from "react";
import { Redirect, Route, Switch, useLocation } from "react-router-dom";
import './App.css';
import About from './components/pages/About';
import Dashboard from "./components/pages/Dashboard/Dashboard";
import Data from './components/pages/Data';
import { AppContext } from "./context";
import httpClient from "./httpClient";
import { NavBar } from "./components/shared/NavBar";

function App() {
  const [, dispatch] = useContext(AppContext);

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
  }, [dispatch])

  // ROUTING TABS
  return (
    <div className="App-container">
      <div className="col-12 p-0">
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
  )
}
    </div >
  );
}

export default App;
