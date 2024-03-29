import React, { useContext, useEffect } from "react";
import { Redirect, Route, Switch, useHistory } from "react-router-dom";
import 'sass/app.scss';
import About from './components/pages/About';
import NotFoundPage from './components/pages/NotFoundPage';
import CookiePolicy from "./components/pages/CookiePolicy";
import Explore from "./components/pages/Explore/Explore";
import Data from './components/pages/Data';
import Publications from "./components/pages/Publications/Publications";
import PrivacyPolicy from './components/pages/PrivacyPolicy';
import TermsOfUse from "./components/pages/TermsOfUse";
import { CookieBanner } from "./components/shared/CookieBanner";
import { Header } from "./components/shared/Header";
import { Footer } from "./components/shared/Footer/Footer";
import Analyze from "./components/pages/Analyze"
import { AppContext, getEmptyFilters } from "./context";
import httpClient from "./httpClient";
import { LanguageType } from "./types";
import { setLanguageType } from "./utils/translate/translateService";
import Partnerships from "components/pages/Partnerships/Partnerships";
import NewsletterPopup from "./components/shared/NewsletterPopup";

function App() {
  const [{ language, explore }, dispatch] = useContext(AppContext);
  setLanguageType(language);

  // General call that happens once at the start of everything.
  useEffect(() => {
    const api = new httpClient()
    const allFilterOptions = async () => {
      const { options, lastUpdated, maxDate, minDate, mostRecentPubDate } = await api.getAllFilterOptions();

      dispatch({
        type: 'GET_ALL_FILTER_OPTIONS',
        payload: options
      })

      dispatch({
        type: "LAST_UPDATED",
        payload: lastUpdated
      })

      dispatch({
        type: "MOST_RECENT_PUB",
        payload: mostRecentPubDate
      })

      dispatch({
        type: "MAX_MIN_DATES",
        payload: { maxDate, minDate }
      })
    }

    allFilterOptions();

    //track if user is a return user or not. if returnUser does not exist this is the users first time
    if(!localStorage.getItem("returnUser")) {
      localStorage.setItem("returnUser", "true")
    }

    // We only want this to run once so we pass no dependencies. Do not remove this
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Cookie managing
  useEffect(() => {
    const alreadyAcceptedCookes = localStorage.getItem('acceptedCookies');
    if (alreadyAcceptedCookes) {
      dispatch({
        type: 'ACCEPT_COOKIES'
      });
    }
    const handleResize = () => {
      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    }
    window.addEventListener('resize', handleResize)

    handleResize();
  }, [dispatch])

  const listenForUrlLanguage = (pathname: string) => {
    if (pathname.includes("/en/") && language !== LanguageType.english) {
      dispatch({
        type: "SELECT_LANGUAGE",
        payload: LanguageType.english
      })
    } else if (pathname.includes("/fr/") && language !== LanguageType.french) {
      dispatch({
        type: "SELECT_LANGUAGE",
        payload: LanguageType.french
      })
    } else if (pathname.includes("/de/") && language !== LanguageType.german) {
      dispatch({
        type: "SELECT_LANGUAGE",
        payload: LanguageType.german
      })
    }
  }

  const history = useHistory()
  listenForUrlLanguage(history.location.pathname);

  let unityInitialFilters = getEmptyFilters();
  unityInitialFilters.unity_aligned_only = true;

  return (
    <div className="App">
      <Header />
      <CookieBanner />
      <NewsletterPopup />
      <Switch>
        <Route path="/:language/About">
          <About />
        </Route>
        <Route path="/:language/Explore">
          <Explore key="Explore"/>
        </Route>
        <Route path="/:language/Dashboard">
          <Redirect to="/:language/Explore" />
        </Route>
        <Route path="/:language/Analyze">
          <Analyze />
        </Route>
        <Route path="/:language/Partnerships/:name">
          <Partnerships />
        </Route>
        <Route path="/:language/Data">
          <Data />
        </Route>
        <Route path="/:language/PrivacyPolicy">
          <PrivacyPolicy />
        </Route>
        <Route path="/:language/CookiePolicy">
          <CookiePolicy />
        </Route>
        <Route path="/:language/TermsOfUse">
          <TermsOfUse />
        </Route>
        <Route path="/:language/Publications">
          <Publications />
        </Route>
        <Route path="/:language/Unity">
          {/*Key added to differentiate Unity view from Explore view and force a rerender*/}
          <Explore initialFilters={unityInitialFilters} key="Unity"/>
        </Route>
        <Redirect exact from="/" to={`/${language}/Explore`} />
        {language && ["About", "Explore", "Analyze", "Data", "PrivacyPolicy", "CookiePolicy", "TermsOfUse", "Publications", "Canada"].map(route =>
          <Redirect from={`/${route}`} to={`${language}/${route}`}></Redirect>)}
        <Route>
          <NotFoundPage/>
        </Route>
      </Switch>
      <Footer />
    </div>
  );
}

export default App;