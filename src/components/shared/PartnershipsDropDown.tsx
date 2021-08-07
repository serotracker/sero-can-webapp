import React from "react";
import PartnershipsConfig from "PartnershipsConfig";
import { Dropdown } from "semantic-ui-react";
import Translate from "utils/translate/translateService";
import { Link } from "react-router-dom";
import { withLocaleUrl } from "../../utils/utils";

export default function PartnershipsDropDown() {

  const renderPartnerships = () => {
    return PartnershipsConfig.map( p => (
        <Dropdown.Item>
          <Link to={withLocaleUrl(`Partnerships/${p.routeName}`)}>{Translate("PartnershipsList", [p.routeName])}</Link>
        </Dropdown.Item>
      ))
  };

  return (
    <Dropdown text={Translate("Partnerships")} className="dropdown">
      <Dropdown.Menu>{
        PartnershipsConfig.map( p => (
          <Dropdown.Item>
            <Link to={withLocaleUrl(`Partnerships/${p.routeName}`)}>{Translate("PartnershipsList", [p.routeName])}</Link>
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
}