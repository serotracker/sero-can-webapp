import React from "react";
import {useMediaQuery} from "react-responsive";
import {mobileDeviceOrTabletWidth} from "../../../constants";
import {PublicationsInfo} from "./PublicationsConstants";
import './styles.scss';
import Translate from "../../../utils/translate/translateService";
import {PublicationsItem} from "./PublicationsItem";

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
                <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                    <p>
                        <a href={"#ResearchArticles"}>
                            {Translate("ResearchArticles")}
                        </a>
                    </p>
                    <p>
                        <a href={"#BiblioDigests"}>
                            {Translate('BiblioDigests')}
                        </a>
                    </p>
                    <p>
                        <a href={"#PrivateSectorReports"}>
                            {Translate('PrivateSectorReports')}
                        </a>
                    </p>
                    <p>
                        <a href={"#MediaMentions"}>
                            {Translate('MediaMentions')}
                        </a>
                    </p>
                    <p>
                        <a href={"#MonthlyReports"}>
                            Monthly Reports
                        </a>
                    </p>
                </div>
                <hr style={{borderTop: "2px solid #bbb", width: "100%"}}/>
                <h2 className="normal" id={"ResearchArticles"}>
                    {Translate('ResearchArticles')}
                </h2>
                <p>
                    {Translate("PublicationDescriptions", ["ResearchArticles"])}
                </p>
                {getPublications("articles")}
                <h2 className="normal" id={"BiblioDigests"}>
                    {Translate('BiblioDigests')}
                </h2>
                <p>
                    {Translate("PublicationDescriptions", ["LiteratureUpdateReports"])}
                </p>
                {getPublications("biblioDigests")}
                <h2 className="normal" id={"PrivateSectorReports"}>
                    {Translate('PrivateSectorReports')}
                </h2>
                <p>
                    {Translate("PublicationDescriptions", ["PrivateSectorReports"])}
                </p>
                {getPublications("reports")}
                <h2 className="normal" id={"MediaMentions"}>
                    {Translate('MediaMentions')}
                </h2>
                <p>
                    {Translate("PublicationDescriptions", ["MediaMentions"])}
                </p>
                {getPublications("media")}
                <h2 className="normal" id={"MonthlyReports"}>
                    {"Monthly Reports"}
                </h2>
                {getPublications("monthlyReports")}
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

