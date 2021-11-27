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

const desktopMap = (
  partnershipconfig: Partnership,
  estimateGradePrevalence: EstimateGradePrevalence | undefined,
  records: AirtableRecord[]
) => {
  return (
    <>
      <div className="col-9 h-100">
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

export default function PartnerShipsMap({ partnershipconfig }: PartnerShipsMapProps) {
  const [state] = useContext(AppContext);
  const [records, setRecords] = useState<AirtableRecord[]>([]);
  const [estimateGradePrevalence, setEstimateGradePrevalence] = useState<EstimateGradePrevalence | undefined>();

  useEffect(() => {
    const api = new httpClient();
    const getPartnershipsData = async () => {
      const { records, estimateGradePrevalences } = await api.getCountryPartnershipData({country: [partnershipconfig?.routeName]});
      setRecords(records);
      setEstimateGradePrevalence(estimateGradePrevalences[0]);
    }
    getPartnershipsData()
  }, [partnershipconfig, state.explore.estimateGradePrevalences])
  const isMobileDeviceOrTablet = useMediaQuery({ maxDeviceWidth: mobileDeviceOrTabletWidth })

  if (partnershipconfig === undefined) {
    return <></>;
  }

  const Map = isMobileDeviceOrTablet ? mobileMap(partnershipconfig, estimateGradePrevalence, records): desktopMap(partnershipconfig, estimateGradePrevalence, records)
  const mapHeight = isMobileDeviceOrTablet ? "50vw" : "70vh"
  return (
    <div style={{ height: mapHeight }} className="row">
    <Loader indeterminate active={state.explore.isLoading} />
      {Map}
    </div>
  );
}
