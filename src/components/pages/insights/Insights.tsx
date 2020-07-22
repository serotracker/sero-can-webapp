import React from "react";
import { useMediaQuery } from "react-responsive";
import { mobileDeviceOrTabletWidth } from "../../../constants";
import InsightsCard from "./InsightsCard";
import './styles.scss';
import Translate from "../../../utils/translate/translateService";
import July2020Update from '../../../assets/images/IndustryUpdateJune10_2020.png'
import May2020Update from '../../../assets/images/IndustryUpdateMay_2020.png'
import PreprintUpdate from '../../../assets/images/IndustryUpdatePre_2020.png'
import MedRxiv from '../../../assets/images/Prepublication.png'

export default function Insights() {
  const isMobileDeviceOrTablet = useMediaQuery({ maxDeviceWidth: mobileDeviceOrTabletWidth })

  return (
    <div className="col-12 page">
      <div className={isMobileDeviceOrTablet ? "pb-2 policy-container" : "policy-container static-content"}>
        <h1 className="col-12 p-0 fit">
          {Translate('Insights')}
        </h1>
        <h3 className="normal">
          {Translate('ReportsAndArticles').toUpperCase()}
        </h3>
        <div className="flex insights-article-container">
          <div className="col-sm-12 col-lg-6 py-2">
            <InsightsCard
              identifier={Translate("Report")}
              date={"July 10, 2020"}
              img={July2020Update}
              title="June Report - COVID-19 Screening & Testing in Canada’s Private Sector"
              url="https://drive.google.com/file/d/1h8QSrnyA3LfBbwWpqMHNgXsoMyngAw13/view" />
          </div>
          <div className="col-sm-12 col-lg-6 py-2">
            <InsightsCard
              identifier={Translate("Report")}
              date={"June 9, 2020"}
              img={May2020Update}
              title="May Report - COVID-19 Screening & Testing in Canada’s Private Sector"
              url="https://drive.google.com/file/d/1qGTwpm7sKlcJ09vd2vzmJTBKXguYYrS-/view?usp=sharing" />
          </div>
          <div className="col-sm-12 col-lg-6 py-2">
            <InsightsCard
              identifier={Translate("Report")}
              date={"May 19, 2020"}
              img={PreprintUpdate}
              title="Preliminary Report - COVID-19 Screening & Testing in Canada’s Private Sector"
              url="https://drive.google.com/file/d/1I1gY1lZndwp4_eUqoZviU8L2_izmkmQP/view?usp=sharing" />
          </div>
          <div className="col-sm-12 col-lg-6 py-2">
            <InsightsCard
              identifier={Translate("PreprintPublication")}
              date={"May 14, 2020"}
              img={MedRxiv}
              title="Lessons from a rapid systematic review of early SARS-CoV-2 serosurveys"
              url="https://www.medrxiv.org/content/10.1101/2020.05.10.20097451v1" />
          </div>
        </div>
      </div>
    </div>
  )
}