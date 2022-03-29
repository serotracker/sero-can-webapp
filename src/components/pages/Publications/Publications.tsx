import React from "react";

import {useMediaQuery} from "react-responsive";
import {mobileDeviceOrTabletWidth, PAGE_HASHES} from "../../../constants";
import {MediaCard} from "./MediaCard";
import {BiblioDigestCard} from "./BiblioDigestCard";
import {
    listOfReports, 
    listOfBiblioDigests, 
    listOfMediaPublicationsProps, 
    listOfPrivateSectorReports, 
    listOfResearchArticles,
    PublicationProps
} from "./PublicationsConstants";
import './styles.scss';
import Translate from "../../../utils/translate/translateService";
import {PublicationsItem} from "./PublicationsItem";
import Slider from "react-slick";

export default function Publications() {
    const isMobileDeviceOrTablet = useMediaQuery({maxDeviceWidth: mobileDeviceOrTabletWidth})
    return (
        <div className="col-12 page pb-4">
            <div className={isMobileDeviceOrTablet ? "pb-2 policy-container static-content w-100" : "policy-container static-content"}>
                <h1 className="col-12 p-0 fit">
                    {Translate('Publications')}
                </h1>
                <p>
                    {Translate("PublicationDescriptions", ["Publications"])}
                </p>
                <div className={"publication-menu"} style={{flexDirection: isMobileDeviceOrTablet ? "column" : "row"}}>
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
                    <p className={"publication-menu-item"}>
                        <a className={"publication-link"} href={"#" + PAGE_HASHES.Publications.MediaMentions}>
                            {Translate('MediaMentions')}
                        </a>
                    </p>
                </div>

                <hr style={{borderTop: "2px solid #bbb", width: "100%"}}/>

                <h2 id={PAGE_HASHES.Publications.ResearchArticles}>
                    {Translate('ResearchArticles')}
                </h2>
                <p>
                    {Translate("PublicationDescriptions", ["ResearchArticles"])}
                </p>
                {getPublicationsItems(listOfResearchArticles)}
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
                {getBiblioDigestCarousel()}

                <h2 id={PAGE_HASHES.Publications.PrivateSectorReports}>
                    {Translate('PrivateSectorReports')}
                </h2>
                <p>
                    {Translate("PublicationDescriptions", ["PrivateSectorReports"])}
                </p>
                {getPublicationsLinks(listOfPrivateSectorReports)}

                <h2 id={PAGE_HASHES.Publications.MediaMentions}>
                    {Translate('MediaMentions')}
                </h2>
                <p>
                    {Translate("PublicationDescriptions", ["MediaMentions"])}
                </p>
                {getMediaCarousel()}
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

const getPublicationsLinks = (publications: PublicationProps[]) => {
    return publications.map((publicationsProps) => {
        return <a className={"py-2 publication-link"} href={publicationsProps.url} target="_blank" rel="noopener noreferrer">
            {publicationsProps.italicize ?
                <i>{publicationsProps.italicize}&nbsp;</i> : null}{Translate(publicationsProps.titleKey1, publicationsProps.titleKey2)}
        </a>
    })
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

const getMediaCarousel = () => {
    return (
        <div className="publications-slider-container pb-4">
            <Slider {...sliderSettings(3)}>
                {
                    listOfMediaPublicationsProps.map((publicationsProps) => {
                        return <MediaCard {...publicationsProps}/>
                    })
                }
            </Slider>
        </div>
    )
}

const getBiblioDigestCarousel = () => {
    return (
        <div className="publications-slider-container pb-4">
            <Slider {...sliderSettings(2)}>
                {
                    listOfBiblioDigests.map((publicationsProps) => {
                        return <BiblioDigestCard {...publicationsProps}/>
                    })
                }
            </Slider>
        </div>
    )
}
