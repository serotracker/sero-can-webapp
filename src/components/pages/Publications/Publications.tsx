import React from "react";
import { useMediaQuery } from "react-responsive";
import { mobileDeviceOrTabletWidth } from "../../../constants";
import { PublicationsCard } from "./PublicationsCard";
import { PublicationsInfo } from "./PublicationsConstants";
import './styles.scss';
import Translate from "../../../utils/translate/translateService";
import Slider from "react-slick";
import {PublicationsItem} from "./PublicationsItem";

export type PublicationsType = 'articles' | 'reports' | 'media' | 'biblioDigests';

export default function Publications() {
  const isMobileDeviceOrTablet = useMediaQuery({ maxDeviceWidth: mobileDeviceOrTabletWidth })

  return (
    <div className="col-12 page pb-4">
      <div className={isMobileDeviceOrTablet ? "pb-2 policy-container" : "policy-container static-content"}>
        <h1 className="col-12 p-0 fit">
          {Translate('Publications')}
        </h1>
        <h3 className="normal">
          {Translate('ResearchArticles')}
        </h3>
        { PublicationsInfo["articles"].map((publicationsProps) => {
          return <PublicationsItem
              day={publicationsProps.day ?? ""}
              month={publicationsProps.month}
              year={publicationsProps.year}
              img={publicationsProps.img}
              titleKey1={publicationsProps.titleKey1}
              titleKey2={publicationsProps.titleKey2}
              url={publicationsProps.url}
              description={"missing"}/>
        }) }
        <h3 className="normal">
          {Translate('BiblioDigests')}
        </h3>
        { PublicationsInfo["biblioDigests"].map((publicationsProps) => {
          return <PublicationsItem
              day={publicationsProps.day ?? ""}
              month={publicationsProps.month}
              year={publicationsProps.year}
              img={publicationsProps.img}
              titleKey1={publicationsProps.titleKey1}
              titleKey2={publicationsProps.titleKey2}
              url={publicationsProps.url}
              description={"missing"}/>
        }) }
        <h3 className="normal">
          {Translate('PrivateSectorReports')}
        </h3>
        { PublicationsInfo["reports"].map((publicationsProps) => {
          return <PublicationsItem
              day={publicationsProps.day ?? ""}
              month={publicationsProps.month}
              year={publicationsProps.year}
              img={publicationsProps.img}
              titleKey1={publicationsProps.titleKey1}
              titleKey2={publicationsProps.titleKey2}
              url={publicationsProps.url}
              description={"missing"}/>
        }) }
        <h3 className="normal">
          {Translate('MediaMentions')}
        </h3>
        { getPublications("media") }
      </div>
    </div>
  )
}


function getPublications(type: PublicationsType) {
  PublicationsInfo[type].map((publicationsProps) => {
    return <PublicationsItem
        day={publicationsProps.day ?? ""}
        month={publicationsProps.month}
        year={publicationsProps.year}
        img={publicationsProps.img}
        titleKey1={publicationsProps.titleKey1}
        titleKey2={publicationsProps.titleKey2}
        url={publicationsProps.url}
        description={"missing"}/>
  })
}




