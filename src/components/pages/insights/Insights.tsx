import React from "react";
import { useMediaQuery } from "react-responsive";
import { mobileDeviceOrTabletWidth } from "../../../constants";
import { InsightsCard } from "./InsightsCard";
import { insightsInfo } from "./InsightsConstants";
import './styles.scss';
import Translate from "../../../utils/translate/translateService";
import Slider from "react-slick";

export default function Insights() {
  const isMobileDeviceOrTablet = useMediaQuery({ maxDeviceWidth: mobileDeviceOrTabletWidth })

  return (
    <div className="col-12 page pb-6">
      <div className={isMobileDeviceOrTablet ? "pb-2 policy-container" : "policy-container static-content"}>
        <h1 className="col-12 p-0 fit">
          {Translate('Publications')}
        </h1>
        <h3 className="normal">
          {Translate('ResearchArticles')}
        </h3>
        { getCarouselOfInsightCards("articles") }
        <h3 className="normal">
          {Translate('Reports')}
        </h3>
        { getCarouselOfInsightCards("reports") }
        <h3 className="normal">
          {Translate('MediaMentions')}
        </h3>
        { getCarouselOfInsightCards("media") }
      </div>
    </div>
  )
}

const sliderSettings = {
  dots: true,
  infinite: true,
  arrows: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 3,
  responsive: [
    {
      breakpoint: 1048,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        infinite: true,
        dots: true
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
        dots: true
      }
    }
  ]
};

export type InsightsType = 'articles' | 'reports' | 'media';

const getCarouselOfInsightCards = (type: InsightsType) => {
  return (
    <div className="slider-container">
      <Slider 
        {...sliderSettings}
      >
          {
            insightsInfo[type].map((insightProps, idx) => {
              return <InsightsCard
                date={insightProps.date}
                img={insightProps.img}
                titleKey1={insightProps.titleKey1}
                titleKey2={insightProps.titleKey2}
                url={insightProps.url} />
              })
          }
      </Slider>
    </div>
  )
}
