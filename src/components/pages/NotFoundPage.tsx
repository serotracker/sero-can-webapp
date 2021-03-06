import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBiohazard } from "@fortawesome/free-solid-svg-icons";
import { Button } from 'semantic-ui-react'
import React, { useContext } from "react";
import { AppContext } from "../../context";
import { useMediaQuery } from "react-responsive";
import { mobileDeviceOrTabletWidth } from "../../constants";
import Translate from "../../utils/translate/translateService";
import "./static.css";
import { useHistory } from 'react-router-dom';
import BrokenAb from '../../assets/images/BrokenAb.gif'

export default function NotFoundPage(){
  const isMobileDeviceOrTablet = useMediaQuery({
    maxWidth: mobileDeviceOrTabletWidth,
  });

  const history = useHistory();

  const [{ language }, _] = useContext(AppContext);

  return (
    <div className="page col-12">
      <div className="center-container">
        <img src={BrokenAb} height={"30%"} alt="" />
        <p className="not-found-subheader">{Translate("NotFound", ["PartOne"])}</p>
        <p>{Translate("NotFound", ["PartTwo"])}</p>
        <Button 
          className="not-found-button"
          onClick={() => history.push(`/${language}/Explore`)}>
            {Translate("NotFound", ["Button"])}
        </Button>
      </div>
    </div>
  );
}