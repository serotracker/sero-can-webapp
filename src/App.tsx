import React, { useContext, useEffect, useState } from "react";
import { Link, Route, Switch, useLocation, Redirect } from "react-router-dom";
import './App.css';
import Icon from './assets/images/two-tone-light.svg';
import Data from "./components/pages/Data";
import About from './components/static/About';
import Auth from './components/static/Auth/Auth';
import Home from './components/static/Home';
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
    return tabName === tab ? 'bold col-4 center' : 'regular col-4 center'
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
                <Link to="/Home" className="flex">
                  <img src={Icon} width={23} height={23} alt="" />
                  <div className="col-auto px-2" >SeroTracker</div>
                </Link>
              </div>
              <div className="App-tabs col-sm-4 col-lg-2">
                <Link className={getTabClass('/Home')} to="/Home">Home</Link>
                <Link className={getTabClass('/Data')} to="/Data">Data</Link>
                <Link className={getTabClass('/About')} to="/About">About</Link>
              </div>
            </header>

            <Switch>
              <Route path="/About">
                <About />
              </Route>
              <Route path="/Data">
                <Data />
              </Route>
              <Route path="/Home">
                <Home />
              </Route>
              <Redirect exact from="/" to="home" />
            </Switch>
          </div>
        )
      }
    </div >
  );
}

export default App;
