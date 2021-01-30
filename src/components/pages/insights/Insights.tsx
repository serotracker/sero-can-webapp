import React from "react";
import { useMediaQuery } from "react-responsive";
import { mobileDeviceOrTabletWidth } from "../../../constants";
import InsightsCard, { getCarouselOfMediaInsightCards } from "./InsightsCard";
import './styles.scss';
import Translate from "../../../utils/translate/translateService";
import October2020Update from '../../../assets/images/October2020Update.png';
import September2020Update from '../../../assets/images/September2020Update.png'
import MedRxivPub from '../../../assets/images/MedRXIV.jpg'
import July2020Update from '../../../assets/images/IndustryUpdateJuly_2020.png'
import June2020Update from '../../../assets/images/IndustryUpdateJune_2020.png'
import August2020Update from '../../../assets/images/August2020Update.png'
import May2020Update from '../../../assets/images/IndustryUpdateMay_2020.png'
import PreprintUpdate from '../../../assets/images/IndustryUpdatePre_2020.png'
import BloodBank from '../../../assets/images/SeroTrackerBloodBank_July_2020.png'
import MedRxiv from '../../../assets/images/Prepublication.png'
import LancetId from '../../../assets/images/LancetIDArticle.png'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

export default function Insights() {
  const isMobileDeviceOrTablet = useMediaQuery({ maxDeviceWidth: mobileDeviceOrTabletWidth })

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 3 // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2 // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1 // optional, default to 1.
    }
  };

  return (
    <div className="col-12 page">
      <div className={isMobileDeviceOrTablet ? "pb-2 policy-container" : "policy-container static-content"}>
        <h1 className="col-12 p-0 fit">
          {Translate('Insights')}
        </h1>
        <h3 className="normal">
          {Translate('ReportsAndArticles').toUpperCase()}
        </h3>
        <Carousel
          swipeable={false}
          draggable={false}
          showDots={true}
          responsive={responsive}
          ssr={true} // means to render carousel on server-side.
          infinite={true}
          keyBoardControl={true}
          customTransition="all .5"
          transitionDuration={500}
          containerClass="carousel-container"
          removeArrowOnDeviceType={["tablet", "mobile"]}
          dotListClass="custom-dot-list-style"
          itemClass="carousel-item-padding-40-px"
        >
          <InsightsCard
            identifier={Translate("ResearchArticle")}
            date={"November 18, 2020"}
            img={MedRxivPub}
            title={Translate('IndustryReportTitles', ['MedRxivPub'])}
            url="https://www.medrxiv.org/content/10.1101/2020.11.17.20233460v2.full"/>
          <InsightsCard
            identifier={Translate("Report")}
            date={"November 13, 2020"}
            img={October2020Update}
            title={Translate('IndustryReportTitles', ['OctoberReport'])}
            url="https://drive.google.com/file/d/1aCgxzxv9J5Zvh4EVyI5REmSVgWLQ_Ip3/view?usp=sharing" />
            <InsightsCard
              identifier={Translate("Report")}
              date={"October 12, 2020"}
              img={September2020Update}
              title={Translate('IndustryReportTitles', ['SeptemberReport'])}
              url="https://drive.google.com/file/d/1CjMcs7UZzu4_E_QFJVYZdv0QhyfoNMAe/view?usp=sharing"/>
            <InsightsCard
              identifier={Translate("Report")}
              date={"September 9, 2020"}
              img={August2020Update}
              title={Translate('IndustryReportTitles', ['AugustReport'])}
              url="https://drive.google.com/file/d/1m7BlfUKCYs32_D1jnFUEQHPr3Qjg5Eyt/view?usp=sharing"/>
            <InsightsCard
              identifier={Translate("Report")}
              date={"August 7, 2020"}
              img={July2020Update}
              title={Translate('IndustryReportTitles', ['JulyReport'])}
              url="https://drive.google.com/file/d/1Rx3i_Sy01suu-ZZYV7LRpo2KEclbXCNN/view?usp=sharing"/>
            <InsightsCard
              identifier={Translate("ResearchArticle")}
              date={"August 4, 2020"}
              img={LancetId}
              italicize="Lancet ID"
              title={Translate('IndustryReportTitles', ['LancetID'])}
              url="https://www.thelancet.com/journals/laninf/article/PIIS1473-3099(20)30631-9/fulltext#%20" />
            <InsightsCard
              identifier={Translate("Report")}
              date={"July 22, 2020"}
              img={BloodBank}
              title={Translate('IndustryReportTitles', ['BloodBank'])}
              url="https://drive.google.com/file/d/1It2CzAwEfTcQ1zIC6z2fO7i7XEfmWfom/view?usp=sharing" />
            <InsightsCard
              identifier={Translate("Report")}
              date={"July 12, 2020"}
              img={June2020Update}
              title={Translate('IndustryReportTitles', ['JuneReport'])}
              url="https://drive.google.com/file/d/1h8QSrnyA3LfBbwWpqMHNgXsoMyngAw13/view" />
            <InsightsCard
              identifier={Translate("Report")}
              date={"June 10, 2020"}
              img={May2020Update}
              title={Translate('IndustryReportTitles', ['MayReport'])}
              url="https://drive.google.com/file/d/16pCR-zh1UiWjQFhTDxW_2adSGuq0pCgz/view?usp=sharing" />
            <InsightsCard
              identifier={Translate("Report")}
              date={"May 19, 2020"}
              img={PreprintUpdate}
              title={Translate('IndustryReportTitles', ['PreliminaryReport'])}
              url="https://drive.google.com/file/d/1I1gY1lZndwp4_eUqoZviU8L2_izmkmQP/view?usp=sharing" />
            <InsightsCard
              identifier={Translate("ResearchArticle")}
              date={"May 14, 2020"}
              img={MedRxiv}
              title={Translate('IndustryReportTitles', ['PrePrint'])}
              url="https://www.medrxiv.org/content/10.1101/2020.05.10.20097451v1" />
        </Carousel>
        <h3 className="normal">
          {Translate('Media').toUpperCase()}
        </h3>
        { getCarouselOfMediaInsightCards() }
      </div>
    </div>
  )
}
