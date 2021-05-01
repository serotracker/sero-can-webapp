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
  ];
  const buttons = buttonLabels.map((buttonLabel) => (
    <Button color="blue" size="large">
      {Translate(buttonLabel)}
    </Button>
  ));

  return <div>{buttons}</div>;
}

function DataDropdowns() {
  const [activeIndex, setActiveIndex] = useState(0);
  const dropdownContents = [
    {
      title: "Where does our data come from?",
      content:
        "We collect data from published peer reviewed research articles, preprints, reports, and media (unpublished grey literature). The sources included in our dashboard to date are in the table below.",
    },
    {
      title: "How do we collect our data?",
      content:
        "We conduct regular searches of several databases including Medline, EMBASE, Web of Science, and Europe PMC and targeted google searches. In addition, anyone can submit sources for us to screen and include in our review using this form.",
    },
    {
      title: "How do we extract our data from our sources?",
      content:
        "We have an extensive research team trained in health sciences and epidemiology who manually review articles and records seroprevalence estimates into AirTable, our database managing software. The processes and rules we follow to extract data is available in our study protocol document and AirTable data dictionary.",
    },
    {
      title: "How does our data show up on the map?",
      content:
        "Data inputted into Airtable is automatically run through a software pipeline that cleans it and computes additional information (e.g. a study’s geographic coordinates). The outputs of the pipeline are then stored in a separate database, which is queried by serotracker.com to serve the Explore tab.",
    },
    {
      title: "Can I download SeroTracker's data for my own analysis?",
      content:
        "Yes, our data is open-source and free for anyone to use. You can download our complete .csv file here. You will first be asked to fill out a form indicating your role, affiliation (if relevant), and type of research you’re conducting - This helps us create datasets that are most useful to you.",
    },
    {
      title: "Do I need to be an AirTable user to use your data?",
      content:
        "No. Although our data is presented in an AirTable file, you can export this easily to Excel or other formats.",
    },
    {
      title: "How do I interpret the variables in your data set?",
      content:
        "Please see our Data Dictionary for explanations of our variables, data types, and descriptions as well as insight into how our data is collected by our research team. It is structured to help interpret our downloadable data set.",
    },
    {
      title: "How has your data been used by others or researchers?",
      content:
        "SeroTracker data is used by many public health professionals and health agencies such as the World Health Organization and Public Health Agency of Canada, among others. The ‘Insights’ tab has links to internal reports, publications we have produced, and features of SeroTracker data and work in the media. Our most recent publication analyzes global seroprevalence from January - December, 2020.",
    },
  ];
  const handleClick = (e: any, titleProps: any) => {
    const { index } = titleProps;
    const newIndex = activeIndex === index ? -1 : index;
    setActiveIndex(newIndex);
  };

  const dropdownContentsAccordion = dropdownContents.map(
    (dropdownContent) => {}
  );

  <Accordion styled>
    <Accordion.Title active={activeIndex === 0} index={0} onClick={handleClick}>
      <Icon name="dropdown" />
      What is a dog?
    </Accordion.Title>
    <Accordion.Content active={activeIndex === 0}>
      A dog is a type of domesticated animal. Known for its loyalty and
      faithfulness, it can be found as a welcome guest in many households across
      the world.
    </Accordion.Content>
  </Accordion>;

  return <div></div>;
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
