import React, { useState } from "react";
import { useMediaQuery } from "react-responsive";
import { Link } from "react-router-dom";
import { Segment, Button, Accordion, Icon } from "semantic-ui-react";
import { isMaintenanceMode, mobileDeviceOrTabletWidth } from "../../constants";
import { sendAnalyticsEvent } from "../../utils/analyticsUtils";
import Translate from "../../utils/translate/translateService";
import "./static.css";
import MaintenanceModal from "../shared/MaintenanceModal";

const clickLink = (link: string) => {
  sendAnalyticsEvent({
    category: "Data Link Click",
    action: "click",
    label: link,
  });
};

function DataButtons() {
  const buttonLabels = [
    {
      label: "OurProtocol",
      link:
        "https://docs.google.com/document/d/1NYpszkr-u__aZspFDFa_fa4VBzjAAAAxNxM1rZ1txWU/edit",
    },
    {
      label: "DataDictionary",
      link:
        "https://docs.google.com/spreadsheets/d/1KQbp5T9Cq_HnNpmBTWY1iKs6Etu1-qJcnhdJ5eyw7N8/edit?usp=sharing",
    },
    {
      label: "DownloadCsv",
      link:
        "https://docs.google.com/forms/d/e/1FAIpQLSdGd_wlq8YSyVPs2AOi1VfvxuLzxA8Ye5I3HkQwW_9yrumsCg/viewform",
    },
    {
      label: "SubmitASource",
      link:
        "https://docs.google.com/forms/d/e/1FAIpQLSdvNJReektutfMT-5bOTjfnvaY_pMAy8mImpQBAW-3v7_B2Bg/viewform",
    },
    {
      label: "ChangeLog",
      link: "https://airtable.com/shrxpAlF6v0LeRYkA",
    },
  ];
  const buttons = buttonLabels.map((buttonLabel, index) => (
    <Button key={index} color="blue" size="large" className="mb-2 mr-2">
      <a
        onClick={() => clickLink(buttonLabel.label)}
        target="_blank"
        rel="noreferrer"
        href={buttonLabel.link}
      >
        <p className="button-text"> {Translate(buttonLabel.label)}</p>
      </a>
    </Button>
  ));

  return <div>{buttons}</div>;
}

function DataDropdowns() {
  const [activeIndex, setActiveIndex] = useState(-1);
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
  return <div>{dropdownContent}</div>;
}

export default function Data() {
  const isMobileDeviceOrTablet = useMediaQuery({
    maxDeviceWidth: mobileDeviceOrTabletWidth,
  });

  const iframeStyle = {
    background: "transparent",
    border: "1px solid #ccc",
  };

  return (
    <>
      <div className="col-12 page">
        <div className={isMobileDeviceOrTablet ? "" : "static-content"}>
          <h1>{Translate("WhatWeDo")}</h1>
          <p>{Translate("WhatWeDoText", ["FirstParagraph"])}</p>
          <p>{Translate("WhatWeDoText", ["SecondParagraph"])}</p>
          <br></br>
          <DataButtons />
          <br></br>
          <DataDropdowns />
        </div>
        <br></br>
        <div
          className={
            isMobileDeviceOrTablet ? "pb-3 pt-3" : "pb-3 pt-3 reference-table"
          }
        >
          <Segment>
            <iframe
              title="References Table"
              className="airtable-embed"
              src="https://airtable.com/embed/shraXWPJ9Yu7ybowM?backgroundColor=cyan&viewControls=on"
              frameBorder="0"
              width="100%"
              height="533"
              style={iframeStyle}
            ></iframe>
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
