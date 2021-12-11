import React, { useContext, useEffect, useState } from "react";
import { AirtableRecord, EstimateGradePrevalence, Partnership } from "types";
import { useMediaQuery } from "react-responsive";
import { AppContext } from "context";
import { mobileDeviceOrTabletWidth } from "../../constants";
import Translate from "utils/translate/translateService";
import { Loader } from "semantic-ui-react";
import Legend from "components/map/Legend";
import MapboxMap from "components/map/MapboxMap";
import httpClient from "httpClient";

type PartnerShipsMapProps = {
  partnershipconfig?: Partnership;
};

// Not a priority to implement loader here because mobile is deprecated anyways
const mobileMap = (
  partnershipconfig: Partnership,
  estimateGradePrevalence: EstimateGradePrevalence | undefined,
  records: AirtableRecord[]
) => {
  return (
      <MapboxMap
        mapConfig={partnershipconfig.mapboxMapOptions}
        countriesConfig={{
          estimateGradePrevalences: estimateGradePrevalence ? [estimateGradePrevalence] : undefined,
          countryFocus: partnershipconfig?.iso3,
        }}
        studyPinsConfig={{
          records: records,
        }}
      />
  );
};


const desktopMap = (
  partnershipconfig: Partnership,
  estimateGradePrevalence: EstimateGradePrevalence | undefined,
  records: AirtableRecord[],
  isLoading: boolean
) => {
  return (
    <>
      <div className="col-9 h-100">
        <Loader indeterminate active={isLoading}/>
        <MapboxMap
          mapConfig={partnershipconfig.mapboxMapOptions}
          countriesConfig={{
            estimateGradePrevalences: estimateGradePrevalence ? [estimateGradePrevalence] : undefined,
            countryFocus: partnershipconfig?.iso3,
          }}
          studyPinsConfig={{
            records: records,
          }}
        />
      </div>
      <div className="col-3 h-100">
        <Legend hideLayers />
          <div className="mt-1">{Translate("PartnershipsView", ["MapNote1"])}</div>
          <div className="mt-1">
              {Translate("PartnershipsView", ["MapNote2"], {
                  WEBSITE: "ourworldindata.org",
              })}
          </div>
      </div>
    </>
  );
};

export default function PartnerShipsMap({ partnershipconfig }: PartnerShipsMapProps) {
  const [state] = useContext(AppContext);
  const [records, setRecords] = useState<AirtableRecord[]>([]);
  const [estimateGradePrevalence, setEstimateGradePrevalence] = useState<EstimateGradePrevalence | undefined>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const api = new httpClient();
    const getPartnershipsData = async () => {
      setIsLoading(true);
      const { records, estimateGradePrevalences } = await api.getCountryPartnershipData({country: [partnershipconfig?.routeName]});
      setRecords(records);
      setEstimateGradePrevalence(estimateGradePrevalences[0]);
      setIsLoading(false);
    }
    getPartnershipsData();
  }, [partnershipconfig, state.explore.estimateGradePrevalences])
  const isMobileDeviceOrTablet = useMediaQuery({ maxDeviceWidth: mobileDeviceOrTabletWidth })

  if (partnershipconfig === undefined) {
    return <></>;
  }
  
  // Note: Loading spinner doesn't work very well on mobile

  const Map = isMobileDeviceOrTablet ? mobileMap(partnershipconfig, estimateGradePrevalence, records) : desktopMap(partnershipconfig, estimateGradePrevalence, records, isLoading)
  const mapHeight = isMobileDeviceOrTablet ? "50vw" : "70vh"
  return (
    <div style={{ height: mapHeight }} className="row">
      {Map}
    </div>
  );
}
