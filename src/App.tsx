import React, { useState } from "react";
import './App.css';

function App() {
  const [tab, setTab] = useState("About");

  // TODO: replace with components
  function renderContent() {
    switch (tab) {
      case 'About':
        return <div>
          About
        </div>
      case 'FAQ':
        return <div>
          FAQ
        </div>
      case 'Data':
        return <div>
          
        </div>
      default: 
        return <div/>
    }
  }

  function setActiveTab(e: any, tab: string){
    e.preventDefault()
    setTab(tab)
  }
  
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Serotracker
        </p>
        <div className="App-tabs">
          <a onClick={(e) => setActiveTab(e, "About")}>
            About
          </a>
          <a onClick={(e) => setActiveTab(e, "FAQ")}>
            FAQ
          </a>
          <a onClick={(e) => setActiveTab(e, "Data")}>
            Data
          </a>
        </div>
      </header>
      {renderContent()}
    </div>
  );
}

export default App;
