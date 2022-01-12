import React from "react";
import { Redirect, useParams } from "react-router-dom";
import { Partnership } from "types";
import PartnershipsConfig from "PartnershipsConfig";
import CanadaPartnership from 'components/pages/Partnerships/CanadaPartnership';
import PageBody from '../../shared/PageBody'

type PartnershipProps = {
  partnershipConfig: Partnership;
};

function RenderSelectedPartnershipComponent({partnershipConfig}: PartnershipProps){
  let partnership = undefined
  switch(partnershipConfig.routeName) {
    case 'Canada':
      partnership = <CanadaPartnership partnershipConfig={partnershipConfig}/>
      break;
    // Add more cases for new parnership components here.
  }

  return partnership
}

export default function Partnerships() {
  const {name} = useParams<{ name: string }>();
  const config = PartnershipsConfig.find(x => x.routeName === name);

  return (
    <>
      {config !== undefined ? (
        <PageBody includeMaintenanceModal>
          {RenderSelectedPartnershipComponent({partnershipConfig: config})}
        </PageBody>
      ) : (
        <Redirect to="/404" />
      )}
    </>
  );
}
