import React from "react";
import Translate from "utils/translate/translateService";
import TotalStats from "./TotalStats";
import { Divider } from 'semantic-ui-react'
import DownloadButton from "components/shared/DownloadButton";
import "../sidebar.scss";

interface SideBarProps {
  page: string
}

export default function LeftSidebar({ page }: SideBarProps) {


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
        <DownloadButton />
      </div>
    </div>
  )
}
