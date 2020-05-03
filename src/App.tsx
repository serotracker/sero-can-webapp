import React, { useState } from "react";
import About from './components/static/About';
import Home from './components/static/Home';
import FAQ from './components/static/FAQ';
import Auth from './components/static/Auth/Auth';
import './App.css';

function App() {
  const [tab, setTab] = useState("Home");
  const [auth, setAuth] = useState(false);

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
  
  return (
    <div>
      {auth == false ? (
        <Auth setAuth={setAuth}/>
      ) : (
        <div className="App">
          <header className="App-header">
            <p>
              SeroTracker
            </p>
            <div className="App-tabs">
              <a className={tab == 'Home' ? 'bold' : undefined} onClick={(e) => setActiveTab(e, "Home")}>
                Home
              </a>
              <a className={tab == 'About' ? 'bold' : undefined} onClick={(e) => setActiveTab(e, "About")}>
                About
              </a>
              <a className={tab == 'FAQ' ? 'bold' : undefined} onClick={(e) => setActiveTab(e, "FAQ")}>
                FAQ
              </a>
            </div>
          </header>
          {renderContent()}
        </div>
      )}
    </div>
  );
}

export default App;
