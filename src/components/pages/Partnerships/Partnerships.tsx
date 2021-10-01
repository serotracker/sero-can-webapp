import React from "react";
import { Redirect, useParams } from "react-router-dom";
import { isMaintenanceMode } from "../../../constants";
import MaintenanceModal from "../../shared/MaintenanceModal";
import PartnershipsConfig from "PartnershipsConfig";
import CanadaPartnership from 'components/pages/Partnerships/CanadaPartnership'

export default function Partnerships() {
  const {name} = useParams<{ name: string }>();
  const config = PartnershipsConfig.find(x => x.routeName === name);

  return (
    <>
      {config !== undefined ? (
        <>
          <div className="col-12 page pb-6">
            <div className="col-10">
              <CanadaPartnership partnershipConfig={config}/>
            </div>
          </div>
          <MaintenanceModal isOpen={isMaintenanceMode} headerText={""} />
        </>
      ) : (
        <Redirect to="/404" />
      )}
    </>
  );
}
