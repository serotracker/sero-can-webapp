import React, { useState } from "react";
import About from './components/static/About';
import Home from './components/static/Home';
import Dashboard from './components/static/Dashboard';
import Auth from './components/static/Auth/Auth';
import Map from './components/map/Map';
import Icon from './assets/images/two-tone-light.svg';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useLocation
} from "react-router-dom";
import './App.css';
import { AppContextProvider } from "./context";
    
function usePageViews() {
  // let location = useLocation();
  
}

function App() {
  const [tab, setTab] = useState("Home");

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


  const getTabClass = (tabName: string) => {
    return tabName === tab ? 'bold' : 'regular'
  }

  usePageViews();
  return (
    <div className="App-container">
      {auth === false ? (
        <Auth authenticate={authenticate} />
      ) : (
          <AppContextProvider>
            <Router>
              <div className="col-12 p-0 flex">
                <header className="App-header col-12 px-3">
                  <div className="App-title py-3 flex center-item">
                    <Link to="/Home" className="flex">
                      <img src={Icon} width={23} height={23} alt="" />
                      <div className="col-auto px-2" >SeroTracker</div>
                    </Link>
                  </div>
                  <div className="App-tabs">
                    <Link className={getTabClass('Home')} to="/Home">Home</Link>
                    <Link className={getTabClass('About')} to="/About">About</Link>
                    <Link className={getTabClass('FAQ')} to="/FAQ">FAQ</Link>
                  </div>
                </header>

                <Switch>
                  <Route path="/About">
                    <About />
                  </Route>
                  <Route path="/FAQ">
                    <FAQ />
                  </Route>
                  <Route path="/">
                    <Home />
                  </Route>
                </Switch>
              </div>
            </Router>
          </AppContextProvider>
        )
      }
    </div >
  );
}

export default App;
