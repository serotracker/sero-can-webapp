import React, { useContext } from "react";
import { Partnership } from "types";
import { AppContext } from "../../../context";
import TableauEmbed from "components/shared/TableauEmbed";
import Translate, { getCountryName } from "utils/translate/translateService";
import PartnerShipsMap from "components/partnerships/PartnershipsMap";

type CanadaPartnershipProps = {
    partnershipConfig: Partnership;
  };

export default function CanadaPartnership({partnershipConfig}:CanadaPartnershipProps) {
  const [state] = useContext(AppContext);

  return (
    <>
      <h1 className="mt-5">{Translate("PartnershipsPageTitle", [partnershipConfig.routeName])}</h1>
      <p>{Translate("PartnershipsPageDescription", [partnershipConfig.routeName])}</p>
      <div className="mt-5 mb-1">
        <h3>
          {Translate("SeroprevalenceEstimatesInRegion", null, {
            NAME: getCountryName(partnershipConfig.routeName, state.language, "CountryOptions"),
          })}
        </h3>
      </div>
      <PartnerShipsMap partnershipconfig={partnershipConfig} />
      <div className="row">
        <TableauEmbed
          url={partnershipConfig.tableauUrl}
          key={partnershipConfig.tableauKey}
          desktopOptions={{
            width: "83vw",
            height: "6000px",
          }}
          mobileOptions={{
            width: "90vw",
            height: "3000px",
          }}
        />
      </div>
    </>
  );
}
