import React from "react";

import {useMediaQuery} from "react-responsive";
import {mobileDeviceOrTabletWidth, PAGE_HASHES} from "../../../constants";
import {PublicationsCard} from "./PublicationsCard";
import {PublicationsInfo} from "./PublicationsConstants";
import './styles.scss';
import Translate from "../../../utils/translate/translateService";
import {PublicationsItem} from "./PublicationsItem";
import Slider from "react-slick";

export type PublicationsType = 'articles' | 'reports' | 'media' | 'biblioDigests' | 'monthlyReports';

export default function Publications() {
    const isMobileDeviceOrTablet = useMediaQuery({maxDeviceWidth: mobileDeviceOrTabletWidth})
    return (
        <div className="col-12 page pb-4">
            <div className={isMobileDeviceOrTablet ? "pb-2 policy-container" : "policy-container static-content"}>
                <h1 className="col-12 p-0 fit">
                    {Translate('Publications')}
                </h1>
                <p>
                    {Translate("PublicationDescriptions", ["Publications"])}
                </p>
                <div className={"publication-menu"} style={{flexDirection: isMobileDeviceOrTablet ? "column" : "row"}}>
                    <p className={"pl-0 publication-menu-item"}>
                        <a className={"publication-link"} href={"#ResearchArticles"}>
                            {Translate("ResearchArticles")}
                        </a>
                    </p>
                    <p className={"publication-menu-item"}>
                        <a className={"publication-link"} href={"#BiblioDigests"}>
                            {Translate('BiblioDigests')}
                        </a>
                    </p>
                    <p className={"publication-menu-item"}>
                        <a className={"publication-link"} href={"#PrivateSectorReports"}>
                            {Translate('PrivateSectorReports')}
                        </a>
                    </p>
                    <p className={"publication-menu-item"}>
                        <a className={"publication-link"} href={"#MediaMentions"}>
                            {Translate('MediaMentions')}
                        </a>
                    </p>
                    <p className={"publication-menu-item"}>
                        <a className={"publication-link"} href={"#MonthlyReports"}>
                            Monthly Reports
                        </a>
                    </p>
                </div>

                <hr style={{borderTop: "2px solid #bbb", width: "100%"}}/>

                <h2 className="normal" id={PAGE_HASHES.Publications.ResearchArticles}>
                    {Translate('ResearchArticles')}
                </h2>
                <p>
                    {Translate("PublicationDescriptions", ["ResearchArticles"])}
                </p>
                {getPublications("articles")}

                <h2 className="normal" id={PAGE_HASHES.Publications.Reports}>
                    {Translate('PrivateSectorReports')}
                </h2>
                <p>
                    {Translate("PublicationDescriptions", ["PrivateSectorReports"])}
                </p>
                {getPublications("reports")}

                <h2 className="normal">
                    {Translate('BiblioDigests')}
                </h2>
                <p>
                    {Translate("PublicationDescriptions", ["LiteratureUpdateReports"])}
                </p>
                {getLinksOfPublications("biblioDigests")}

                <h2 className="normal" id={"MonthlyReports"}>
                    {"Monthly Reports"}
                </h2>
                <p>
                    {Translate("PublicationDescriptions", ["MonthlyReports"])}
                </p>
                {getLinksOfPublications("monthlyReports")}

                <h2 className="normal" id={PAGE_HASHES.Publications.MediaMentions}>
                    {Translate('MediaMentions')}
                </h2>
                <p>
                    {Translate("PublicationDescriptions", ["MediaMentions"])}
                </p>
                {getCarouselOfPublicationsCards("media")}
            </div>
        </div>
    )
}


const getPublications = (type: PublicationsType) => {
    return (
        PublicationsInfo[type].map((publicationsProps) => {
            return <PublicationsItem
                day={publicationsProps.day ?? ""}
                month={publicationsProps.month}
                year={publicationsProps.year}
                titleKey1={publicationsProps.titleKey1}
                titleKey2={publicationsProps.titleKey2}
                url={publicationsProps.url}
                authors={publicationsProps.authors}
                publicationName={publicationsProps.publicationName}/>
        }))
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

const getLinksOfPublications = (type: PublicationsType) => {
    return PublicationsInfo[type].map((publicationsProps) => {
        return <a className={"py-2 publication-link"} href={publicationsProps.url} target="_blank" rel="noopener noreferrer">
            {publicationsProps.italicize ?
                <i>{publicationsProps.italicize}&nbsp;</i> : null}{Translate(publicationsProps.titleKey1, publicationsProps.titleKey2)}
        </a>
    })
}

const getCarouselOfPublicationsCards = (type: PublicationsType) => {
    return (
        <div className="publications-slider-container pb-4">
            <Slider {...sliderSettings}>
                {
                    PublicationsInfo[type].map((publicationsProps, idx) => {
                        return <PublicationsCard
                            day={publicationsProps.day ?? ""}
                            month={publicationsProps.month}
                            year={publicationsProps.year}
                            titleKey1={publicationsProps.titleKey1}
                            titleKey2={publicationsProps.titleKey2}
                            url={publicationsProps.url}
                            authors={publicationsProps.authors}
                            publicationName={publicationsProps.publicationName}
                            img={publicationsProps.img}
                        />
                    })
                }
            </Slider>
        </div>
    )
}
