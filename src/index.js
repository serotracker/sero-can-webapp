import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'sass/index.scss';
import * as serviceWorker from './serviceWorker';
import { AppContextProvider } from './context'
import {Router} from 'react-router-dom';
import GAListener from "./utils/analyticsUtils";
import {createBrowserHistory} from 'history';
import ReactGA from 'react-ga';

// Initialize ReactGA
const isDev = process.env.NODE_ENV === "development";
ReactGA.initialize(process.env.REACT_APP_GA_TRACKERID, {
  titleCase: false,
  debug: isDev,
  gaOptions: {
    cookieDomain: isDev ? 'none' : 'auto'
  }
});

const history = createBrowserHistory()

ReactDOM.render(
  <React.StrictMode>
    <Router history={history}>
      <GAListener>
        <AppContextProvider>
          <App />
        </AppContextProvider>
      </GAListener>
    </Router>
  </React.StrictMode >,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
