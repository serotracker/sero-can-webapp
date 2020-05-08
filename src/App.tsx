import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import './App.css';
import Icon from './assets/images/two-tone-light.svg';
import Data from "./components/pages/Data";
import About from './components/static/About';
import Auth from './components/static/Auth/Auth';
import Home from './components/static/Home';
import { AppContext, AppContextProvider } from "./context";
import httpClient from "./httpClient";

function App() {
  const [tab, setTab] = useState("Home");
  const [state, dispatch] = useContext(AppContext);

  useEffect(() => {
    const api = new httpClient()
    const getAirtableRecords = async () => {
      const airtable_records = await api.getAirtableRecords()
      dispatch({
        type: 'GET_AIRTABLE_RECORDS',
        payload: airtable_records
      })
    }
    getAirtableRecords();
  }, [dispatch])

  const getTabClass = (tabName: string) => {
    return tabName === tab ? 'bold' : 'regular'
  }
  
  let authStatus = false;

  if (localStorage.hasOwnProperty('authenticated')) {
    authStatus = localStorage.getItem('authenticated') !== null;
  }
  const [auth, setAuth] = useState(authStatus);

  function setActiveTab(tab: string) {
    setTab(tab)
  }

  function authenticate() {
    setAuth(true);
    // Workaround because only string values can be saved to localStorage
    localStorage.setItem('authenticated', 'true');
  }

  return (
    <div className="App-container">
      {auth === false ? (
        <Auth authenticate={authenticate} />
      ) : (
          <Router>
            <div className="col-12 p-0 flex">
              <header className="App-header col-12 px-3">
                <div className="App-title py-3 flex center-item">
                  <Link to="/Home" className="fx">
                    <img src={Icon} width={23} height={23} alt="" />
                    <div className="col-auto px-2" >SeroTracker</div>
                  </Link>
                </div>
                <div className="App-tabs">
                  <Link className={getTabClass('Home')} to="/Home">Home</Link>
                  <Link className={getTabClass('Data')} to="/Data">Data</Link>
                  <Link className={getTabClass('About')} to="/About">About</Link>
                </div>
              </header>

              <Switch>
                <Route path="/About">
                  <About />
                </Route>
                <Route path="/Data">
                  <Data />
                </Route>
                <Route path="/">
                  <Home />
                </Route>
              </Switch>
            </div>
          </Router>
        )
      }
    </div >
  );
}

export default App;
