import React from "react";
import { AirtableRecord } from "types";
import Translate, { TranslateDate, getLanguageType } from 'utils/translate/translateService';
import {getGeography, translateAntibodyTargets} from 'utils/utils';

/**
 * @param title: left column of study modal: title of content
 * @param content: right content of study modal: the actual content for this record
 */
function row(title: string, content: JSX.Element | string | string[] | null | undefined) {
    return (
        <div className={"d-flex justify-content-between mb-2"}>
            <div className={"popup-heading"}>
                {title}
            </div>
            <div className={"popup-text"}>
                {content}
            </div>
        </div>
    )
}

function riskTag(pathogen: string) {
    return(
        <div className={"popup-risk-tag popup-risk-low"}>
            Pathogen: {pathogen}
        </div>
    )
}

/**
 * @param popGroupOptions: List of population group options, each option being a dictionary with key = language and value = translated option string
 * @param englishPopGroup: English population group string
 */
function getTranslatedPopulationGroup(popGroupOptions: Record<string, string>[], englishPopGroup: string){
    let result = englishPopGroup;
    const popGroupWithTranslations = popGroupOptions.find(x => x.english === englishPopGroup)
    // TODO: refactor so that popGroupOptions keys directly map to languages on the frontend
    const languageTypeMapping = {
      'en': 'english',
      'fr': 'french',
      'de': 'german'
    }

    if(popGroupWithTranslations){
      const lang = languageTypeMapping[getLanguageType()]
      result = popGroupWithTranslations[lang]
    }
    return result
}

export default function ArboStudyPopup(record: any) {
    return (
        <div className="popup-content pt-2" >
            {/*Header section*/}
            <div className={"popup-section"}>
                <div className="popup-title">
                    Study Number {record.estimate_id}
                </div>
                <div className="popup-subtitle">
                    {record.url ? <a href={record.url} target="_blank" rel="noopener noreferrer"> PLACEHOLDER LINK </a> : "NO URL"}
                </div>
            </div>
            {/*SeroPrev section*/}
            <div className={"popup-seroprev-level popup-section"}>
                <div className={"popup-heading"}>
                    {Translate("BestSeroprevalenceEstimate")}: <b> {`${record.seroprevalence * 100}%`}</b>
                </div>
                <div className={"popup-text"}>
                    {(record.sample_start_date && record.sample_end_date) && (
                        <>
                            {`${TranslateDate(record.sample_start_date)} ${Translate("DateRangeTo")} ${TranslateDate(record.sample_end_date)}`}
                        </>)
                    }
                </div>
            </div>
            {/*Content section*/}
            <div className={"popup-section"}>
                {row("Inclusion Criteria", record.inclusion_criteria ? record.inclusion_criteria : Translate("NotReported"))}
                {row(Translate("Location"), getGeography(record.city, record.state, record.country))}
                {row(Translate("SampleSize"), record.sample_size?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, Translate(",")))}
                {row(Translate("AntibodyTarget"),  record.antibody)}
                {row("Antigen", record.antigen)}
                {row("Assay", record.assay)}
            </div>
            {/*RiskTag section*/}
            {riskTag(`${record.pathogen}`)}
        </div>)
}
