import React, { useState } from "react";
import { useMediaQuery } from "react-responsive";
import { Link } from "react-router-dom";
import { Segment, Button, Accordion, Icon, AccordionTitleProps, SemanticICONS } from "semantic-ui-react";
import { isMaintenanceMode, mobileDeviceOrTabletWidth, PAGE_HASHES } from "../../constants";
import { sendAnalyticsEvent } from "../../utils/analyticsUtils";
import Translate, { TranslateObject } from "../../utils/translate/translateService";
import "./static.css";
import MaintenanceModal from "../shared/MaintenanceModal";
import DownloadButton from "../shared/DownloadButton";
interface DropdownQuestion {
  Question: string;
  Answer: string | object;
  Links?: { [index: string]: string };
  LinkTexts?: { [index: string]: string };
}

const clickLink = (link: string) => {
  sendAnalyticsEvent({
    category: "Data Link Click",
    action: "click",
    label: link,
  });
};

function DataButtons() {
  const dataButtons: { label: string; link: string; id?: string }[] = [
    {
      label: "OurProtocol",
      link: "https://docs.google.com/document/d/1NYpszkr-u__aZspFDFa_fa4VBzjAAAAxNxM1rZ1txWU/edit",
    },
    {
      label: "DataDictionary",
      link: "https://docs.google.com/spreadsheets/d/1KQbp5T9Cq_HnNpmBTWY1iKs6Etu1-qJcnhdJ5eyw7N8/edit?usp=sharing",
      id: PAGE_HASHES.Data.DataDictionary,
    },
    {
      label: "ChangeLog",
      link: "https://airtable.com/shrxpAlF6v0LeRYkA",
      id: PAGE_HASHES.Data.ChangeLog,
    },
    {
      label: "SubmitSource",
      link: "https://docs.google.com/forms/d/e/1FAIpQLSdvNJReektutfMT-5bOTjfnvaY_pMAy8mImpQBAW-3v7_B2Bg/viewform",
      id: PAGE_HASHES.Data.SubmitSource,
    },
  ];
  const buttons = dataButtons.map((b, index) => (
    <Button key={index} color="blue" size="large" className="mb-2 mr-2" id={b?.id}>
      <a onClick={() => clickLink(b.label)} target="_blank" rel="noopener noreferrer" href={b.link}>
        <p className="button-text"> {Translate(b.label)}</p>
      </a>
    </Button>
  ));


  const airtableDownloadProps = {
    buttonLabelKey: "DownloadCsv", 
    downloadLink: "https://airtable.com/shraXWPJ9Yu7ybowM/tbljN2mhRVfSlZv2d?backgroundColor=blue&viewControls=on" ,
    formLink: "https://docs.google.com/forms/d/e/1FAIpQLSdGd_wlq8YSyVPs2AOi1VfvxuLzxA8Ye5I3HkQwW_9yrumsCg/viewform" ,
    iconName: "",
    popupText: "DownloadAirtable"
  }

  const githubDownloadProps = {
    buttonLabelKey: "AccessGithub", 
    downloadLink: "https://airtable.com/shraXWPJ9Yu7ybowM/tbljN2mhRVfSlZv2d?backgroundColor=blue&viewControls=on" ,
    formLink: "https://docs.google.com/forms/d/e/1FAIpQLSdGd_wlq8YSyVPs2AOi1VfvxuLzxA8Ye5I3HkQwW_9yrumsCg/viewform" ,
    iconName: "github",
    popupText: "DownloadGithub"
  }

  return (
    <div>
      {buttons}
      <span id={PAGE_HASHES.Data.DownloadData}>
        <DownloadButton
        {...airtableDownloadProps}
        />
        <DownloadButton
        {...githubDownloadProps}
        />
      </span>
    </div>
  );
}

function DataDropdowns() {
  const [activeIndex, setActiveIndex] = useState(-1);
  const handleClick = (e: any, data: AccordionTitleProps) => {
    const { index, titleText } = data;
    const newIndex = activeIndex === index ? -1 : index;
    setActiveIndex(newIndex as number);
    if(newIndex != -1){
      // Only send event if question was opened, not closed
      sendAnalyticsEvent({
        category: "Data FAQ",
        action: "open",
        label: titleText,
      });
    } 
  };

  const dropdownContent = Object.entries(TranslateObject("DropdownQuestions")).map(
    (dropdownQuestion: [string, DropdownQuestion], index: number) => (
      <Accordion key={index} fluid styled>
        <Accordion.Title active={activeIndex === index} index={index} onClick={handleClick} className="accordion-title">
          <Icon name="dropdown" /> {dropdownQuestion[1]["Question"]}
        </Accordion.Title>
        <Accordion.Content active={activeIndex === index}>
          {dropdownQuestion[1]["Links"] ? (
            <div>
              {Object.entries(dropdownQuestion[1]["Answer"]).map((answer, index) => (
                <p className="no-space">
                  {" "}
                  {answer[1]}{" "}
                  <a
                    href={dropdownQuestion[1]["Links"]?.[`Link${index + 1}`]}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {dropdownQuestion[1]["LinkTexts"]?.[`LinkText${index + 1}`]}
                  </a>
                </p>
              ))}
            </div>
          ) : (
            <p>{dropdownQuestion[1]["Answer"]}</p>
          )}
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

  return (
    <>
      <div className="col-12 page pb-5">
        <div className={isMobileDeviceOrTablet ? "static-mobile py-2" : "static-content py-2"}>
          <div className={isMobileDeviceOrTablet ? "pt-3" : "pt-0"}>
            <h1>{Translate("OurData")}</h1>
            <p>{Translate("WhatWeDoText", ["FirstParagraph"])}</p>
            <p>{Translate("WhatWeDoText", ["SecondParagraph"])}</p>
            <DataButtons />
          </div>

          <div className={isMobileDeviceOrTablet ? "pt-3" : "pt-0"} id={PAGE_HASHES.Data.FAQ}>
            <h1 >{Translate("FrequentlyAskedQuestions")}</h1>
            <DataDropdowns />
          </div>

          <div className={isMobileDeviceOrTablet ? "pb-3 pt-3" : "pt-0 pb-0"} id={PAGE_HASHES.Data.References}>
            <h1>{Translate("ReferencesTable")}</h1>
            <p>
              <span>{Translate("UseOfData", null, null, [false, true])}</span>
              <Link to="/TermsOfUse">{Translate("TermsOfUse")}</Link>.
            </p>
            <Segment>
              <iframe
                title="References Table"
                className="iframe-style"
                src={
                  isMobileDeviceOrTablet
                    ? "https://airtable.com/embed/shrtuN7F8x4bdkdDA?backgroundColor=cyan&layout=card&viewControls=on"
                    : "https://airtable.com/embed/shrtuN7F8x4bdkdDA?backgroundColor=cyan&viewControls=on"
                }
              ></iframe>
            </Segment>
          </div>
        </div>
      </div>
      <MaintenanceModal isOpen={isMaintenanceMode} headerText={"Data"} />
    </>
  );
}
