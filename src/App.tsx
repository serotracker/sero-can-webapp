import React, { useContext, useEffect } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import './App.css';
import About from './components/pages/About';
import Dashboard from "./components/pages/Dashboard/Dashboard";
import Data from './components/pages/Data';
import PrivacyPolicy from './components/pages/PrivacyPolicy';
import { NavBar } from "./components/shared/NavBar";
import { AppContext } from "./context";
import httpClient from "./httpClient";
import { setLanguageType } from "./utils/translate/translateService";
import CookiePolicy from "./components/pages/CookiePolicy";
import TermsOfUse from "./components/pages/TermsOfUse";
import Insights from "./components/pages/insights/Insights";
import { CookieBanner } from "./components/shared/CookieBanner";

function App() {

  const [{ language }, dispatch] = useContext(AppContext);
  // DATA
  useEffect(() => {
    const api = new httpClient()
    const alreadyAcceptedCookes = localStorage.getItem('acceptedCookies');
    if (alreadyAcceptedCookes) {
      dispatch({
        type: 'ACCEPT_COOKIES'
      });
    }
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

    setLanguageType(language);
  }, [dispatch, language])

  // ROUTING TABS
  return (
    <div className="App">
      <NavBar />
      <CookieBanner />
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
        <Route path="/PrivacyPolicy">
          <PrivacyPolicy />
        </Route>
        <Route path="/CookiePolicy">
          <CookiePolicy />
        </Route>
        <Route path="/TermsOfUse">
          <TermsOfUse />
        </Route>
        <Route path="/Insights">
          <Insights />
        </Route>
        <Redirect exact from="/" to="/Dashboard" />
      </Switch>
    </div>
  );
}

export default App;
