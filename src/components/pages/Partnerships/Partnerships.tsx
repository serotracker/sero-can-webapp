import React, { useContext, useEffect, useState } from "react";
import { Redirect, useParams } from "react-router-dom";
import { AirtableRecord, EstimateGradePrevalence, Partnership, State } from "types";
import { isMaintenanceMode } from "../../../constants";
import { useMediaQuery } from 'react-responsive'
import { AppContext } from "../../../context";
import MaintenanceModal from "../../shared/MaintenanceModal";
import { mobileDeviceOrTabletWidth } from '../../../constants'
import TableauEmbed from "components/shared/TableauEmbed";
import PartnershipsConfig from "PartnershipsConfig";
import Translate, { getCountryName } from "utils/translate/translateService";
import { Loader } from "semantic-ui-react";
import Legend from "components/map/Legend";
import MapboxMap from "components/map/MapboxMap";
import httpClient from 'httpClient';

const desktopMap = (config: Partnership, state: State, estimateGradePrevalence: EstimateGradePrevalence | undefined, records: AirtableRecord[]) => {
  return (
    <div style={{ height: "70vh" }} className="row">
    <div className="col-10">
      <Loader indeterminate active={state.explore.isLoading}></Loader>
      <MapboxMap
        mapConfig={config.mapboxMapOptions}
        countriesConfig={{
          estimateGradePrevalences: estimateGradePrevalence ? [estimateGradePrevalence] : undefined,
          countryFocus: config?.iso3
        }}
        studyPinsConfig={{
          records: records
        }}
      />
    </div>
    <div className="col-2">
      <Legend hideLayers/>
      <div className="mt-5">{Translate("PartnershipsView", ["MapNote1"])}</div>
      <div className="mt-3">
        {Translate("PartnershipsView", ["MapNote2"], {
          WEBSITE: "ourworldindata.org",
        })}
      </div>
    </div>
  </div>)
}

const mobileMap = (config: Partnership, state: State, estimateGradePrevalence: EstimateGradePrevalence | undefined, records: AirtableRecord[]) => {
  return (
  <div style={{ height: "50vh" }} className="row">
  <Loader indeterminate active={state.explore.isLoading}></Loader>
  <MapboxMap
    mapConfig={config.mapboxMapOptions}
    countriesConfig={{
      estimateGradePrevalences: estimateGradePrevalence ? [estimateGradePrevalence] : undefined,
      countryFocus: config?.iso3
    }}
    studyPinsConfig={{
      records: records
    }}
  />
</div>)
}

export default function Partnerships() {
  const [state] = useContext(AppContext);
  const [records, setRecords] = useState<AirtableRecord[]>([]);
  const [estimateGradePrevalence, setEstimateGradePrevalence] = useState<EstimateGradePrevalence | undefined>();
  const { name } = useParams<{ name: string }>();
  const config = PartnershipsConfig.find(x => x.routeName === name);

  useEffect(() => {
    const api = new httpClient();
    const getPartnershipsRecords = async () => {
      setRecords(await api.getAirtableRecordsForCountry({country: [config?.routeName]}));
    }
    getPartnershipsRecords()
    setEstimateGradePrevalence(state.explore.estimateGradePrevalences.find(x => x.alpha3Code === config?.iso3));
  }, [config, state.explore.estimateGradePrevalences])
  const isMobileDeviceOrTablet = useMediaQuery({ maxDeviceWidth: mobileDeviceOrTabletWidth })
  return (
    <>
      {config !== undefined ? (
        <>
          <div className="col-12 page pb-6">
            <div className="col-10">
              <h1 className="mt-5">
                {Translate("PartnershipsPageTitle", [config?.routeName])}
              </h1>
              <p>
                {Translate("PartnershipsPageDescription", [config?.routeName])}
              </p>
              <div className="mt-5 mb-1">
                <h3>
                  {Translate("SeroprevalenceEstimatesInRegion", null, {
                    NAME: getCountryName(config.routeName, state.language, "CountryOptions"),
                  })}
                </h3>
              </div>
              { isMobileDeviceOrTablet ?  mobileMap(config, state, estimateGradePrevalence, records) : desktopMap(config, state, estimateGradePrevalence, records) }
              <div className="row">
                <TableauEmbed
                  url={config.tableauUrl}
                  key={config.tableauKey}
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
