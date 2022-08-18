import React, {Dispatch, useContext, useState, SetStateAction} from "react";
import Translate, { TranslateDate } from "utils/translate/translateService";
import TotalStats from "./TotalStats";
import { Divider, Button } from "semantic-ui-react";
import DownloadButton from "components/shared/DownloadButton";
import { PAGE_HASHES } from "../../../constants";
import { IconName } from "../../../types";
import "../sidebar.scss";
import { AppContext } from "../../../context";
import { useMediaQuery } from "react-responsive";
import { mobileDeviceOrTabletWidth } from "../../../constants";

interface SideBarProps {
  page: string;
    toggleSidebar: () => void;
}

const UpdatedAt = ({ updatedAt }: { updatedAt: string }) => {
  // only renders 'last updated' when we have a valid date
  console.log("updatedAt", updatedAt);
  return updatedAt ? (
    <span className="pr-2">
      {Translate("Footer", ["LastUpdated"])}:{" "}
      <b className="updated-at-bold">{TranslateDate(updatedAt)}</b>
    </span>
  ) : null;
};

const lancetId =
  "https://www.thelancet.com/journals/laninf/article/PIIS1473-3099(20)30631-9/fulltext#%20";

const Citation = () => (
  <span className="text-right">
    {Translate("Footer", ["CiteAs"])}
    <a
      href={lancetId}
      target="__blank"
      rel="noopener noreferrer"
      className="cite-link"
    >
      <i>{Translate("Footer", ["LancetInfDis"])}</i>{" "}
      {Translate("Footer", ["Article"])}
    </a>
  </span>
);

export default function LeftSidebar({ page, toggleSidebar }: SideBarProps) {
  const [{ updatedAt }] = useContext(AppContext);

  const airtableDownloadProps = {
    buttonLabelKey: "DownloadCsv",
    downloadLink:
      "https://airtable.com/shraXWPJ9Yu7ybowM/tbljN2mhRVfSlZv2d?backgroundColor=blue&viewControls=on",
    formLink:
      "https://docs.google.com/forms/d/e/1FAIpQLSdGd_wlq8YSyVPs2AOi1VfvxuLzxA8Ye5I3HkQwW_9yrumsCg/viewform",
    iconName: IconName.airtable,
    popupText: "DownloadAirtable",
  };

  const githubDownloadProps = {
    buttonLabelKey: "AccessGithub",
    downloadLink: "https://github.com/serotracker/sars-cov-2-data",
    formLink:
      "https://docs.google.com/forms/d/e/1FAIpQLSdGd_wlq8YSyVPs2AOi1VfvxuLzxA8Ye5I3HkQwW_9yrumsCg/viewform",
    iconName: IconName.github,
    popupText: "DownloadGithub",
  };

  return (
    <>
      <TotalStats page={page} />
      <Divider />
      <div className="mt-3 mb-2 center subheading">
        <p>{Translate("Welcome")}</p>
      </div>
      <div>
        <p>{Translate("ExploreBlurb", ["FirstParagraph"])}</p>
        {"\n"}
        <p>{Translate("ExploreBlurb", ["SecondParagraph"])}</p>
      </div>

      <div className="d-flex justify-content-center mt-3">
        <span style={{ margin: "0" }}>
          <DownloadButton {...airtableDownloadProps} />
        </span>
      </div>

      <div className="d-flex justify-content-center mt-1 full-width-button">
        <span style={{ margin: "0" }} id={PAGE_HASHES.Explore.AccessGithub}>
          <DownloadButton {...githubDownloadProps} />
        </span>
      </div>

      <Divider />
      <div>
        <p>
          <Citation /> 
        </p>
        <p>
          <UpdatedAt updatedAt={updatedAt} />
        </p>
      </div>
    </>
  );
}
