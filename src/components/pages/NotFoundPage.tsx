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
        <p className="not-found-header">404</p>
        <p className="not-found-subheader">{Translate("NotFound", ["PartOne"])}</p>
        <p>{Translate("NotFound", ["PartTwo"])}</p>
        <Button 
          className="not-found-button"
          onClick={() => history.push('/en/Explore')}>
            {Translate("NotFound", ["HomepageButton"])}
        </Button>
      </div>
    </div>
  );
}