import React from "react";
import Translate, {TranslateDate} from "../../../utils/translate/translateService";
import { Card } from "semantic-ui-react";
import {BiblioDigestProps} from "./PublicationsConstants";
import "./biblioDigestStyles.scss";

export function BiblioDigestCard(props: BiblioDigestProps) {
  return (
    <div className="py-4 px-2 flex justify-content-center">
      <Card className={"biblio-digest-card"}>
        <Card.Content className="my-2 mx-4">
            <h4 className="biblio-digest-card-title pb-4">
                <a href={props.url} target="_blank" rel="noopener noreferrer" className="publication-link">
                {"Serotracker Key Insights from"} {TranslateDate(props.screeningStartDate + "T00:00:00")} - {TranslateDate(props.screeningEndDate + "T00:00:00")}
                </a>
            </h4>
            <div className="pb-3">
                <div className="biblio-digest-card-text">{"Published: "} {TranslateDate(props.publishDate + "T00:00:00")}</div>
            </div>
            <div className="biblio-digest-card-row pb-2">
                <div className="biblio-digest-card-text-bold">{"New serosurveys identified: "}</div>
                <div className="biblio-digest-card-text-bold">{props.serosurveysTotal}</div>
            </div>
            <div className="biblio-digest-card-row pl-3">
                <div className="biblio-digest-card-text">{"African: "}</div>
                <div className="biblio-digest-card-text">{props.serosurveysAFRO}</div>
            </div>
            <div className="biblio-digest-card-row pl-3">
                <div className="biblio-digest-card-text">{"Eastern Medditerranean: "}</div>
                <div className="biblio-digest-card-text">{props.serosurveysEMRO}</div>
            </div>
            <div className="biblio-digest-card-row pl-3">
                <div className="biblio-digest-card-text">{"European: "}</div>
                <div className="biblio-digest-card-text">{props.serosurveysEURO}</div>
            </div>
            <div className="biblio-digest-card-row pl-3">
                <div className="biblio-digest-card-text">{"Region of the Americas: "}</div>
                <div className="biblio-digest-card-text">{props.serosurveysPAHO}</div>
            </div>
            <div className="biblio-digest-card-row pl-3">
                <div className="biblio-digest-card-text">{"South-East Asia: "}</div>
                <div className="biblio-digest-card-text">{props.serosurveysSEARO}</div>
            </div>
            <div className="biblio-digest-card-row pl-3">
                <div className="biblio-digest-card-text">{"Western Pacific: "}</div>
                <div className="biblio-digest-card-text">{props.serosurveysWPRO}</div>
            </div>
            {(props.sourcesAdded) && (
                <div className="biblio-digest-card-row pt-2">
                    <div className="biblio-digest-card-text-bold">{"New sources added: "}</div>
                    <div className="biblio-digest-card-text-bold">{props.sourcesAdded}</div>
                </div>
            )}
        </Card.Content>
      </Card>
    </div>
  )
}
