import React from "react";
import Translate from "utils/translate/translateService";
import TotalStats from "./TotalStats";
import { Divider } from 'semantic-ui-react'
import DownloadButton from "components/shared/DownloadButton";
import "../sidebar.css";

interface SideBarProps {
  page: string
}

export default function LeftSidebar({ page }: SideBarProps) {


  return (
    <div className="sidebar-container flex left-sidebar">
      <TotalStats page={page} />
      <Divider/>
      <div className='px-4'>
        <p>{Translate('ExploreBlurb', ['FirstParagraph'])}</p>
        <p>{Translate('ExploreBlurb', ['SecondParagraph'])}</p>
      </div>
      <Divider/>
      <div className="d-flex justify-content-center">
        <DownloadButton />
      </div>
    </div>
  )
}
