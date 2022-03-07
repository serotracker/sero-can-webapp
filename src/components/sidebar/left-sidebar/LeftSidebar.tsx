import React from "react";
import Translate from "utils/translate/translateService";
import TotalStats from "./TotalStats";
import { Divider } from 'semantic-ui-react'
import DownloadButton from "components/shared/DownloadButton";
import { PAGE_HASHES } from "../../../constants";
import {ButtonIconName} from "../../../types";
import "../sidebar.scss";

interface SideBarProps {
  page: string
}

export default function LeftSidebar({ page }: SideBarProps) {

  const airtableDownloadProps = {
    buttonLabelKey: "DownloadCsv", 
    downloadLink: "https://airtable.com/shraXWPJ9Yu7ybowM/tbljN2mhRVfSlZv2d?backgroundColor=blue&viewControls=on" ,
    formLink: "https://docs.google.com/forms/d/e/1FAIpQLSdGd_wlq8YSyVPs2AOi1VfvxuLzxA8Ye5I3HkQwW_9yrumsCg/viewform" ,
    iconName: ButtonIconName.airtable,
    popupText: "DownloadAirtable"
  }

  const githubDownloadProps = {
    buttonLabelKey: "AccessGithub", 
    downloadLink: "https://github.com/serotracker/sars-cov-2-data" ,
    formLink: "https://docs.google.com/forms/d/e/1FAIpQLSdGd_wlq8YSyVPs2AOi1VfvxuLzxA8Ye5I3HkQwW_9yrumsCg/viewform" ,
    iconName: ButtonIconName.github,
    popupText: "DownloadGithub"
  }

  return (
    <div className="sidebar-container flex left-sidebar">
      <TotalStats page={page} />
      <Divider/>
      <div>
        <p>{Translate('ExploreBlurb', ['FirstParagraph'])}</p>
        {"\n"}
        <p>{Translate('ExploreBlurb', ['SecondParagraph'])}</p>
        {"\n"}
        <p>{Translate('ExploreBlurb', ['ThirdParagraph'])}</p>
      </div>
      <div className="d-flex justify-content-center mt-3">
      <span style={{margin: "0"}} >
        <DownloadButton
        {...airtableDownloadProps}
        />
  
      </span>
      </div>
      <div className="d-flex justify-content-center mt-1">
      <span style={{margin: "0"}} id={PAGE_HASHES.Explore.AccessGithub}>
        <DownloadButton
        {...githubDownloadProps}
        />
      </span>
      </div>
    </div>
  )
}
