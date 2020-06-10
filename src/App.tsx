import React, { useContext, useEffect, useState } from "react";
import { Link, Redirect, Route, Switch, useLocation } from "react-router-dom";
import './App.css';
import Icon from './assets/images/two-tone-light.svg';
import Dashboard from "./components/pages/Data";
import About from './components/static/About';
import Data from './components/static/Home';
import { AppContext } from "./context";
import httpClient from "./httpClient";
import { Modal, Image } from "semantic-ui-react";

function App() {
  const [tab, setTab] = useState("");
  const [showModal, toggleModal] = useState(true);
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

  const closeModal = () => toggleModal(false);

  const BLMModal = () => (
    <Modal className="modal" open={showModal} onClose={closeModal} closeIcon>
      <Modal.Content className="modal-content">
          <p>The SeroTracker team stands in solidarity with the Black community in the fight against racism, injustice and systemic discrimination. On Wednesday, June 10, SeroTracker is recognizing #ShutDownSTEM. Our dashboard remains available for researchers who rely upon it for their urgent work against COVID-19. s.</p>
          <p>This pandemic has highlighted and magnified existing health disparities for communities facing systemic discrimination, emphasizing the need to advocate for racial justice. We commit to educate ourselves about this critical issue, to listen, to speak out against racial injustice, and to challenge our own implicit biases.</p>
          <p>For more information on #ShutDownSTEM, please visit <a href="https://www.shutdownstem.com/">https://www.shutdownstem.com</a>. We are living in a time where “silence is betrayal” (Martin Luther King Jr). </p>
          <div>
            <Image className="blm-img" src='https://images.squarespace-cdn.com/content/v1/5ed6c369f19ebe008aeff12e/1591340053331-0GWA2PR4F4ZN7SI4E2JH/ke17ZwdGBToddI8pDm48kJK4Mm1kch8SFO9ZNkN1NT97gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QHyNOqBUUEtDDsRWrJLTmN9YSRtfoTLg6dUq-6F17A0FFZK5fArcnK1IqGweyunyWChwIwkIJ_P7MaZif-uMs/%23ShutDownSTEM2.png?format=300w'/>
          </div>
      </Modal.Content>
    </Modal>
  )

  // AUTHENTICATION
  // let authStatus = false;

  // if (localStorage.hasOwnProperty('authenticated')) {
  //   authStatus = localStorage.getItem('authenticated') !== null;
  // }
  // const [auth, setAuth] = useState(authStatus);


  // function authenticate() {
  //   setAuth(true);
  //   // Workaround because only string values can be saved to localStorage
  //   localStorage.setItem('authenticated', 'true');
  // }

  return (
    <div className="App-container">
      {/* {auth === false ? (
        <Auth authenticate={authenticate} />
      ) : ( */}
          <div className="col-12 p-0">
            <header className="App-header col-12 px-sm-2">
              <div className="App-title col-auto py-3 px-0 flex left ">
                <Link to="/" className="flex">
                  <img src={Icon} width={23} height={23} alt="" />
                  <div className="col-auto px-2" >SeroTracker</div>
                </Link>
              </div>
              <div className="App-tabs p-0 col-sm-8 col-lg-3">
                <Link className={getTabClass('/Dashboard')} to="/Dashboard">Dashboard</Link>
                <Link className={getTabClass('/Data')} to="/Data">Data</Link>
                <Link className={getTabClass('/About')} to="/About">About</Link>
              </div>
              <BLMModal/>
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
