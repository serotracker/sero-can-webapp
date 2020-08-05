import React, { useContext, useEffect, useState } from "react";
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
import { Modal } from "semantic-ui-react";

function App() {

  const [{ language }, dispatch] = useContext(AppContext);
  const [showModal, toggleModal] = useState(true);
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

  const closeModal = () => toggleModal(false);

  const MobileInfoModal = () => (
    <Modal className="modal" open={showModal} onClose={closeModal} closeIcon={{ style: { top: '1.0535rem', right: '1rem' }, color: 'black', name: 'close' }}>
      <Modal.Content className="modal-content">
          <p>"Welcome to SeroTracker... this is what we do... here are some caveats to keep in mind"</p>
      </Modal.Content>
    </Modal>
  )

  // ROUTING TABS
  return (
    <div className="App">
      <NavBar />
      <CookieBanner />
      <MobileInfoModal/>
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
