import React, { useContext, useEffect } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
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
import { PageStateEnum } from "./types";
import { initializeData } from "./utils/stateUpdateUtils";
import { setLanguageType } from "./utils/translate/translateService";

function App() {
  const [{ language, explore, analyze }, dispatch] = useContext(AppContext);
  setLanguageType(language);

  useEffect(() => {
    const api = new httpClient()
    initializeData(dispatch, explore.filters,true, PageStateEnum.explore)
    initializeData(dispatch, analyze.filters,false, PageStateEnum.analyze)
    const allFilterOptions = async () => {
      const { options, updatedAt, maxDate, minDate } = await api.getAllFilterOptions();
      dispatch({
        type: 'GET_ALL_FILTER_OPTIONS',
        payload: options
      })

      dispatch({
        type: "UPDATED_AT",
        payload: updatedAt
      })

      dispatch({
        type: "MAX_MIN_DATES",
        payload: { maxDate, minDate }
      })
    }
    
    allFilterOptions();
    // We only want this to run once so we pass no dependencies. Do not remove this
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // pulls from ISO api to get standardized country names, codes and translations
  useEffect(() => {    
    const updateCountriesJson = async () => {
      const api = new httpClient()
      // TODO: Figure out a better place to put this so we don't keep updating this either 
      const countriesJson = await api.getCountries();
      dispatch({
        type: 'UPDATE_COUNTRIES_JSON',
        payload: countriesJson
      });
    }
    updateCountriesJson();
  }, [dispatch])

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