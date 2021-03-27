import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBiohazard } from "@fortawesome/free-solid-svg-icons";
import { Button } from 'semantic-ui-react'
import React from "react";
import { useMediaQuery } from "react-responsive";
import { mobileDeviceOrTabletWidth } from "../../constants";
import Translate from "../../utils/translate/translateService";
import "./static.css";
import { useHistory } from 'react-router-dom';

export default function NotFoundPage(){
  const isMobileDeviceOrTablet = useMediaQuery({
    maxWidth: mobileDeviceOrTabletWidth,
  });

  const history = useHistory();

  return (
    <div className="page col-12">
      <div className="center-container">
        <FontAwesomeIcon icon={faBiohazard} size="6x" />
        <h1 className="not-found-header">404</h1>
        <h1>Page Not Found</h1>
        <p>Uh oh, we couldn't find the page you're looking for! Please try another URL or visit our homepage to get back on track.</p>
        <Button 
          className="not-found-button"
          onClick={() => history.push('/en/Explore')}>
            Visit Homepage
        </Button>
      </div>
    </div>
  );
}