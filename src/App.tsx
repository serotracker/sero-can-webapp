import React, { useState } from "react";
import About from './components/static/About';
import Home from './components/static/Home';
import FAQ from './components/static/FAQ';
import Auth from './components/static/Auth/Auth';
import './App.css';

function App() {
  const [tab, setTab] = useState("Home");

  let authStatus = false;
  if (localStorage.hasOwnProperty('authenticated')){
    authStatus = localStorage.getItem('authenticated') !== null;
  }
  const [auth, setAuth] = useState(authStatus);

  function renderContent() {
    switch (tab) {
      case 'About':
        return <About/>
      case 'FAQ':
        return <FAQ/>
      case 'Home':
        return <Home/>
      default: 
        return <div/>
    }
  }

  function setActiveTab(e: any, tab: string){
    e.preventDefault()
    setTab(tab)
  }

  function authenticate(){
    setAuth(true);
    // Workaround because only string values can be saved to localStorage
    localStorage.setItem('authenticated', 'true');
  }

  const getTabClass = (tabName: string) => {
    return tabName === tab ? 'bold' : 'regular'
  }
  
  return (
    <div className="App-container">
      {auth === false ? (
        <Auth authenticate={authenticate}/>
      ) : (
        <div className="App col-12 p-0">
          <header className="App-header col-12 px-3">
            <div className="App-title py-3">
              SeroTracker
            </div>
            <div className="App-tabs">
              <div className={getTabClass('Home')} onClick={(e) => setActiveTab(e, "Home")}>
                Home
              </div>
              <div className={getTabClass('About')} onClick={(e) => setActiveTab(e, "About")}>
                About
              </div>
              <div className={getTabClass('FAQ')} onClick={(e) => setActiveTab(e, "FAQ")}>
                FAQ
              </div>
            </div>
          </header>
          {renderContent()}
        </div>
      )}
    </div>
  );
}

export default App;
