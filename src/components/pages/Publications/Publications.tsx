import React from "react";

import {useMediaQuery} from "react-responsive";
import {mobileDeviceOrTabletWidth, PAGE_HASHES} from "../../../constants";
import {MediaCard} from "./MediaCard";
import {BiblioDigestCard} from "./BiblioDigestCard";
import {
    listOfReports, 
    listOfBiblioDigests, 
    listOfMediaPublications,
    listOfPrivateSectorReports, 
    listOfResearchArticles,
    PublicationProps
} from "./PublicationsConstants";
import './styles.scss';
import Translate from "../../../utils/translate/translateService";
import {PublicationsItem} from "./PublicationsItem";
import Slider from "react-slick";
import {PrivateReportsCard} from "./PrivateReportsCard";
import {publicationCarouselCollectionNames} from "../../../types";

export default function Publications() {
    const isMobileDeviceOrTablet = useMediaQuery({maxDeviceWidth: mobileDeviceOrTabletWidth})
    return (
        <div className="col-12 page pb-4">
            <div className={isMobileDeviceOrTablet ? "pb-2 policy-container static-content w-100" : "policy-container static-content"}>
                <h1 className="col-12 p-0 fit">
                    {Translate('PublicationsHeader')}
                </h1>
                <p>
                    {Translate("PublicationDescriptions", ["Publications"])}
                </p>
                <div className={"publication-menu"} style={{flexDirection: isMobileDeviceOrTablet ? "column" : "row"}}>
                    <p className={"publication-menu-item"}>
                        <a className={"publication-link"} href={"#" + PAGE_HASHES.Publications.MediaMentions}>
                            {Translate('MediaMentions')}
                        </a>
                    </p>
                    <p className={isMobileDeviceOrTablet ? "publication-menu-item" : "pl-0 publication-menu-item"}>
                        <a className={"publication-link"} href={"#" + PAGE_HASHES.Publications.ResearchArticles}>
                            {Translate("ResearchArticles")}
                        </a>
                    </p>
                    <p className={"publication-menu-item"}>
                        <a className={"publication-link"} href={"#" + PAGE_HASHES.Publications.GeneralSerotrackerCommunications}>
                            {Translate('GeneralSerotrackerCommunications')}
                        </a>
                    </p>
                    <p className={"publication-menu-item"}>
                        <a className={"publication-link"} href={"#" + PAGE_HASHES.Publications.BiblioDigests}>
                            {Translate('BiblioDigests')}
                        </a>
                    </p>
                    <p className={"publication-menu-item"}>
                        <a className={"publication-link"} href={"#" + PAGE_HASHES.Publications.PrivateSectorReports}>
                            {Translate('PrivateSectorReports')}
                        </a>
                    </p>
                </div>



                <hr style={{borderTop: "2px solid #bbb", width: "100%"}}/>

                <h2 id={PAGE_HASHES.Publications.MediaMentions}>
                    {Translate('MediaMentions')}
                </h2>
                <p>
                    {Translate("PublicationDescriptions", ["MediaMentions"])}
                </p>
                {getCarousel("Media", 3)}


                <h2 id={PAGE_HASHES.Publications.ResearchArticles}>
                    {Translate('ResearchArticles')}
                </h2>
                <p>
                    {Translate("PublicationDescriptions", ["ResearchArticles"])}
                </p>
                <div className={"research-article-scroll-container"}>
                    {getPublicationsItems(listOfResearchArticles)}
                </div>



                <h2 id={PAGE_HASHES.Publications.GeneralSerotrackerCommunications}>
                    {Translate('GeneralSerotrackerCommunications')}
                </h2>
                <p>
                    {Translate("PublicationDescriptions", ["GeneralSerotrackerCommunications"])}
                </p>
                {getPublicationsItems(listOfReports)}



                <h2 id={PAGE_HASHES.Publications.BiblioDigests}>
                    {Translate('BiblioDigests')}
                </h2>
                <p>
                    {Translate("PublicationDescriptions", ["LiteratureUpdateReports"])}
                </p>
                {getCarousel("BiblioDigest", 2)}



                <h2 id={PAGE_HASHES.Publications.PrivateSectorReports}>
                    {Translate('PrivateSectorReports')}
                </h2>
                <p>
                    {Translate("PublicationDescriptions", ["PrivateSectorReports"])}
                </p>
                {getCarousel("PrivateReports", 3)}

            </div>
        </div>
    )
}


const getPublicationsItems = (publications: PublicationProps[]) => {
    return (
        publications.map((publicationsProps) => {
            return <PublicationsItem {...publicationsProps}/>
        }))
}

const sliderSettings = (slidesToShow: number) =>{
    return {
        dots: true,
        infinite: true,
        arrows: true,
        speed: 500,
        slidesToShow: slidesToShow,
        slidesToScroll: slidesToShow,
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
} 

const renderCorrectCarousel = (pubCollectionName: publicationCarouselCollectionNames) => {
    switch (pubCollectionName) {
        case "Media":
            return (
                listOfMediaPublications.map((publicationsProps) => {
                    return <MediaCard {...publicationsProps}/>
                })
            )
        case "BiblioDigest":
            return (
                listOfBiblioDigests.map((publicationsProps) => {
                    return <BiblioDigestCard {...publicationsProps}/>
                })
            )
        case "PrivateReports":
            return (
                listOfPrivateSectorReports.map((publicationsProps) => {
                    return <PrivateReportsCard {...publicationsProps}/>
                })
            )
        default:
            return (
                <div>
                    Collections of this nature do not exist
                </div>
            )
    }
}

const getCarousel = (pubCollectionName: publicationCarouselCollectionNames, slidesToShow: number) => {
    return (
        <div className="publications-slider-container pb-4">
            <Slider {...sliderSettings(slidesToShow)}>
                {renderCorrectCarousel(pubCollectionName)}
            </Slider>
        </div>
    )
}