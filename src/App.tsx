import React, { useContext, useEffect, useState } from "react";
import { Link, Route, Switch, useLocation, Redirect } from "react-router-dom";
import './App.css';
import Icon from './assets/images/two-tone-light.svg';
import Dashboard from "./components/pages/Data";
import About from './components/static/About';
import Auth from './components/static/Auth/Auth';
import Data from './components/static/Home';
import { AppContext } from "./context";
import httpClient from "./httpClient";

function App() {
  const [tab, setTab] = useState("");
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
  const usePageViews = () => {
    let location = useLocation();
    useEffect(() => {
      setTab(location.pathname)
    }, [location]);
  }
  
  usePageViews()

  const getTabClass = (tabName: string) => {
    return tabName === tab ? 'bold center' : 'regular center'
  }

  // AUTHENTICATION
  let authStatus = false;

  if (localStorage.hasOwnProperty('authenticated')) {
    authStatus = localStorage.getItem('authenticated') !== null;
  }
  const [auth, setAuth] = useState(authStatus);


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
          <div className="col-12 p-0 flex">
            <header className="App-header col-12 px-3">
              <div className="App-title py-3 flex center-item">
                <Link to="/" className="flex">
                  <img src={Icon} width={23} height={23} alt="" />
                  <div className="col-auto px-2" >SeroTracker</div>
                </Link>
              </div>
              <div className="App-tabs col-sm-5 col-lg-3">
                <Link className={getTabClass('/Dashboard')} to="/Dashboard">Dashboard</Link>
                <Link className={getTabClass('/Data')} to="/Data">Data</Link>
                <Link className={getTabClass('/About')} to="/About">About</Link>
              </div>
            </header>

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
