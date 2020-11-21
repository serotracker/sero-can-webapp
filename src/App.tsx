import { Location, LocationListener } from 'history';
import React, { useContext, useEffect } from "react";
import { Redirect, Route, Switch, useHistory } from "react-router-dom";
import './App.css';
import About from './components/pages/About';
import CookiePolicy from "./components/pages/CookiePolicy";
import Analyze from "./components/pages/Dashboard/Analyze";
import Explore from "./components/pages/Dashboard/Explore";
import Data from './components/pages/Data';
import Insights from "./components/pages/insights/Insights";
import PrivacyPolicy from './components/pages/PrivacyPolicy';
import TermsOfUse from "./components/pages/TermsOfUse";
import { CookieBanner } from "./components/shared/CookieBanner";
import { NavBar } from "./components/shared/NavBar";
import { AppContext } from "./context";
import httpClient from "./httpClient";
import { setLanguageType } from "./utils/translate/translateService";

function App() {
  const [{ language, analyze, explore }, dispatch] = useContext(AppContext);
  const history = useHistory();
  setLanguageType(language);

  useEffect(() => {
    const toggleFilters: LocationListener = ({ pathname }: Location): void => {
      if (pathname === "/Analyze") {
        dispatch({
          type: 'MAKE_INITIAL_ROUTE',
          payload: false
        })
      }
      else if (pathname === "/Explore") {
        dispatch({
          type: 'MAKE_INITIAL_ROUTE',
          payload: true
        })
      }
    }
    const allFilterOptions = async () => {
      const api = new httpClient();
      const response = await api.getAllFilterOptions();
      dispatch({
        type: 'GET_ALL_FILTER_OPTIONS',
        payload: response
      })
    }

    history.listen(toggleFilters);
    toggleFilters(history.location, 'REPLACE')
    allFilterOptions();
  })

  useEffect(() => {
    const getAirtableRecords = async () => {
      const api = new httpClient()
      const analyzeRecords = await api.getAirtableRecords(analyze.filters)
      const exploreRecords = await api.getAirtableRecords(explore.filters)
      dispatch({
        type: 'GET_AIRTABLE_RECORDS',
        payload:  { analyzeRecords, exploreRecords }
      });
    }
    getAirtableRecords()
  })

  useEffect(() => {
    const alreadyAcceptedCookes = localStorage.getItem('acceptedCookies');
    if (alreadyAcceptedCookes) {
      dispatch({
        type: 'ACCEPT_COOKIES'
      });
    }
    const handleResize = () => {
      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    }
    window.addEventListener('resize', handleResize)

    handleResize();
  }, [dispatch])

  // ROUTING TABS
  return (
    <div className="App">
      <NavBar />
      <CookieBanner />
      <Switch >
        <Route path="/About">
          <About />
        </Route>
        <Route path="/Explore">
          <Explore />
        </Route>
        <Route path="/Dashboard">
          <Redirect to="/Explore" />
        </Route>
        <Route path="/Analyze">
          <Analyze />
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
        <Redirect exact from="/" to="/Explore" />
      </Switch>
    </div>
  );
}

export default App;
