import React from "react";
import AnalysisMethods from "./AnalysisMethods";
import Translate from "utils/translate/translateService";
import TotalStats from "./TotalStats";
import HealthAgencyLogo from 'assets/images/public-health-agency.png';
import UcalgaryLogo from 'assets/images/University-Of-Calgary-Logo.png';
import { sendAnalyticsEvent } from "../../../utils/analyticsUtils";
import WhoLogo from "components/shared/WhoLogo"
import { Button, Icon } from "semantic-ui-react";
import "../sidebar.css";

interface SideBarProps {
  page: string
}

const clickLink = (link: string) => {
  sendAnalyticsEvent({
    category: "Data Link Click",
    action: "click",
    label: link,
  });
};

export default function LeftSidebar({ page }: SideBarProps) {

  const ExploreText = () => (
    <div className="analysis-methods">
      <p className="py-4">
        {Translate('ExploreBlurb', ['FirstParagraph'])}
      </p>
      <div className="d-flex justify-content-center">
        <Button size="large" className="mx-auto download-data-btn">
          <a
            onClick={() => clickLink("DownloadCsv")}
            target="_blank"
            rel="noreferrer"
            href={"https://docs.google.com/forms/d/e/1FAIpQLSdGd_wlq8YSyVPs2AOi1VfvxuLzxA8Ye5I3HkQwW_9yrumsCg/viewform"}
          >
            {Translate("DownloadData")}
            <Icon 
             name='download'
             className='ml-2'
             />
          </a>
        </Button>
      </div>
    </div>
  )

  return (
    <div className="sidebar-container flex left-sidebar">
      <TotalStats page={page} />
      {page === "explore" ? (
        <ExploreText />
      ) : (
          <AnalysisMethods />
        )
      }
    </div>
  )
}
