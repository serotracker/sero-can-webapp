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
                    Learn more about SeroTracker’s impact in research articles, summaries, and media mentions.
                </p>
                <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                    <p>
                        <a href={"#ResearchArticles"}>
                            Research Articles
                        </a>
                    </p>
                    <p>
                        <a href={"#BiblioDigests"}>
                            Literature Update Reports
                        </a>
                    </p>
                    <p>
                        <a href={"#PrivateSectorReports"}>
                            Private Sector Reports
                        </a>
                    </p>
                    <p>
                        <a href={"#MediaMentions"}>
                            Media Mentions
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
                    Peer-reviewed research papers published by the SeroTracker team.
                </p>
                {getPublications("articles")}
                <h2 className="normal" id={"BiblioDigests"}>
                    {Translate('BiblioDigests')}
                </h2>
                <p>
                    Monthly overviews and updates on trends in serosurvey literature and WHO-supplied metrics.
                </p>
                {getPublications("biblioDigests")}
                <h2 className="normal" id={"PrivateSectorReports"}>
                    {Translate('PrivateSectorReports')}
                </h2>
                <p>
                    Updates on COVID-19 Screening & Testing in Canada’s Private Sector.
                </p>
                {getPublications("reports")}
                <h2 className="normal" id={"MediaMentions"}>
                    {Translate('MediaMentions')}
                </h2>
                <p>
                    Worldwide media publications featuring SeroTracker.
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
                description={"missing"}/>
        }))
}

