import React, { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { Link } from "react-router-dom";
import {
  Loader,
  Segment,
  Button,
  Accordion,
  Icon,
  Container,
} from "semantic-ui-react";
import { isMaintenanceMode, mobileDeviceOrTabletWidth } from "../../constants";
import { getEmptyFilters } from "../../context";
import httpClient from "../../httpClient";
import { sendAnalyticsEvent } from "../../utils/analyticsUtils";
import Translate from "../../utils/translate/translateService";
import StudiesTable from "../shared/references/StudiesTable";
import "./static.css";
import MaintenanceModal from "../shared/MaintenanceModal";

function DataButtons() {
  const buttonLabels = [
    "OurProtocol",
    "DataDictionary",
    "DownloadCsv",
    "SubmitASource",
    "ChangeLog",
  ];
  const buttons = buttonLabels.map((buttonLabel) => (
    <Button key={buttonLabel} color="blue" size="large" className="mb-5">
      {Translate(buttonLabel)}
    </Button>
  ));

  return <Container>{buttons}</Container>;
}

function DataDropdowns() {
  const [activeIndex, setActiveIndex] = useState(0);
  const handleClick = (e: any, titleProps: any) => {
    const { index } = titleProps;
    const newIndex = activeIndex === index ? -1 : index;
    setActiveIndex(newIndex);
  };
  const dropdownContent = Object.entries(Translate("DropdownQuestions")).map(
    (dropdownQuestion: any, index) => (
      <Accordion key={index} fluid styled>
        <Accordion.Title
          active={activeIndex === index}
          index={index}
          onClick={handleClick}
        >
          <Icon name="dropdown" /> {dropdownQuestion[1]["Question"]}
        </Accordion.Title>
        <Accordion.Content active={activeIndex === index}>
          <p>{dropdownQuestion[1]["Answer"]}</p>
        </Accordion.Content>
      </Accordion>
    )
  );
  return <div className="mb-5">{dropdownContent}</div>;
}

export default function Data() {
  const isMobileDeviceOrTablet = useMediaQuery({
    maxDeviceWidth: mobileDeviceOrTabletWidth,
  });
  const [allRecords, setAllRecords] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // note: using IIFE here so that we can
    // have async/await behaviour in useEffect
    (async () => {
      await getAllRecords();
      setIsLoading(false);
    })();
  }, []);

  const clickLink = (link: string) => {
    sendAnalyticsEvent({
      category: "Data Link Click",
      action: "click",
      label: link,
    });
  };

  const getAllRecords = async () => {
    const api = new httpClient();
    // TODO: Figure out a better place to put this so we don't keep updating this either
    const res = await api.getAirtableRecords(getEmptyFilters());
    setAllRecords(res);
  };

  return (
    <>
      <div className="col-12 page">
        <div className={isMobileDeviceOrTablet ? "" : "static-content"}>
          <h1>{Translate("WhatWeDo")}</h1>
          <p>{Translate("WhatWeDoText", ["FirstParagraph"])}</p>
          <p>{Translate("WhatWeDoText", ["SecondParagraph"])}</p>
          <br />
          <DataButtons />
          <DataDropdowns />
        </div>

        <div
          className={
            isMobileDeviceOrTablet ? "pb-3 pt-3" : "pb-3 pt-3 reference-table"
          }
        >
          <Segment>
            <Loader indeterminate active={isLoading} />
            <StudiesTable
              dataRecords={allRecords}
              showAllStudies={false}
            ></StudiesTable>
          </Segment>
        </div>

        <div
          className={isMobileDeviceOrTablet ? "pb-5" : "static-content pb-5"}
        >
          <div className="d-flex d-flex justify-content-center">
            <span>{Translate("UseOfData", null, null, [false, true])}</span>
            <Link className="px-1" to="/TermsOfUse">
              {Translate("TermsOfUse")}
            </Link>
          </div>
        </div>
      </div>
      <MaintenanceModal isOpen={isMaintenanceMode} headerText={"Data"} />
    </>
  );
}
