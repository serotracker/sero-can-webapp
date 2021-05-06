import React, { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { Link } from "react-router-dom";
import { Loader, Segment, Button, Accordion, Icon } from "semantic-ui-react";
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
    <Button color="blue" size="large" className="mb-5">
      {Translate(buttonLabel)}
    </Button>
  ));

  return <div>{buttons}</div>;
}

function DataDropdowns() {
  const [activeIndex, setActiveIndex] = useState(0);
  const handleClick = (e: any, titleProps: any) => {
    const { index } = titleProps;
    const newIndex = activeIndex === index ? -1 : index;
    setActiveIndex(newIndex);
  };
  let dropdownContent = [];
  // 8 is the number of data dropdown questions
  for (let i = 0; i < 8; ++i) {
    dropdownContent.push(
      <Accordion fluid styled>
        <Accordion.Title
          active={activeIndex === i}
          index={i}
          onClick={handleClick}
        >
          <Icon name="dropdown" />
          {Translate("DropdownQuestions", [`Question${i + 1}`, "Question"])}
        </Accordion.Title>
        <Accordion.Content active={activeIndex === i}>
          {Translate("DropdownQuestions", [`Question${i + 1}`, "Answer"])}
        </Accordion.Content>
      </Accordion>
    );
  }
  return <div>{dropdownContent}</div>;
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
          <h1>{Translate("ManuscriptAndPreprint")}</h1>
          <p>
            {Translate("PaperText", null, null, [false, true])}
            <a
              target="_blank"
              onClick={() => clickLink("MedRXIV")}
              rel="noopener noreferrer"
              href="https://www.medrxiv.org/content/10.1101/2020.05.10.20097451v1"
            >
              medRxiv
            </a>
            .
          </p>
          <p>
            {Translate("PaperTextTwo", null, null, [false, true])}
            <a
              target="_blank"
              onClick={() => clickLink("LancetID")}
              rel="noopener noreferrer"
              href="https://www.thelancet.com/journals/laninf/article/PIIS1473-3099(20)30631-9/fulltext#%20"
            >
              <i>{Translate("LancetID")}</i>
            </a>
            .
          </p>
          <h1>{Translate("OurData")}</h1>
          <p>{Translate("OurDataText", ["Text"])}</p>
          <p>
            {Translate("DataDictionaryText", ["FirstParagraph"], null, [
              false,
              true,
            ])}
            <a
              rel="noopener noreferrer"
              onClick={() => clickLink("Manuscript Appendix")}
              target="_blank"
              href="https://drive.google.com/file/d/1d8-U0NgjVBTDzdj3rbAYfZyYVp0HRhgj/view?usp=sharing"
            >
              {Translate("ManuscriptAppendixText", ["FirstParagraph"], null, [
                false,
                true,
              ])}
            </a>
            {Translate("ManuscriptAppendixText", ["SecondParagraph"], null, [
              false,
              true,
            ])}
            {Translate("DataDictionaryText", ["SecondParagraph"], null, [
              false,
              true,
            ])}
            <a
              rel="noopener noreferrer"
              onClick={() => clickLink("Data Dictionary")}
              target="_blank"
              href="https://docs.google.com/spreadsheets/d/1KQbp5T9Cq_HnNpmBTWY1iKs6Etu1-qJcnhdJ5eyw7N8/edit?usp=sharing"
            >
              {Translate("DataDictionary")}
            </a>
            .
          </p>
          <p>
            {Translate("DataDownload", null, null, [false, true])}
            <Link to="/About">{Translate("SeroTrackerTeam")}</Link>.
          </p>
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
