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

    const handleResize = () => {
      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    }

    window.addEventListener('resize', handleResize)
    getAirtableRecords();
    handleResize();
  }, [dispatch])

  // ROUTING TABS
  return (
    <div className="col-12 p-0 App">
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
