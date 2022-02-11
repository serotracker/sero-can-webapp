import React from "react";
import { AirtableRecord } from "types";
import Translate, { TranslateDate, getLanguageType } from 'utils/translate/translateService';
import {getGeography} from 'utils/utils';

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

function riskTag(riskLevel: string) {
    return(
        <div className={"popup-risk-tag popup-risk-" + riskLevel}>
            {Translate("RiskOfBiasOptions", [riskLevel])} {Translate("RiskOfBias")}
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

export default function StudyPopup(record: AirtableRecord, popGroupOptions: Record<string, string>[]) {
    return (
        <div className="popup-content pt-2" >
            {/*Header section*/}
            <div className={"popup-section"}>
                <div className="popup-title">
                    {Translate(`${record.estimate_grade}StudyDetails`)}
                </div>
                <div className="popup-subtitle">
                    {record.url ? <a href={record.url} target="_blank" rel="noopener noreferrer">{record.source_name}</a> : record.source_name}
                </div>
            </div>
            {/*SeroPrev section*/}
            <div className={"popup-seroprev-level popup-section"}>
                <div className={"popup-heading"}>
                    {Translate("BestSeroprevalenceEstimate")}: <b> {record.serum_pos_prevalence ? `${(record.serum_pos_prevalence * 100).toFixed(1)}%` : "N/A"}</b>
                </div>
                <div className={"popup-text"}>
                    {(record.sampling_start_date && record.sampling_end_date) && (
                        <>
                            {`${TranslateDate(record.sampling_start_date)} → ${TranslateDate(record.sampling_end_date)}`}
                        </>)
                    }
                </div>
            </div>
            {/*Content section*/}
            <div className={"popup-section"}>
                {row(Translate("PopulationGroup"), record.population_group ? getTranslatedPopulationGroup(popGroupOptions, record.population_group) : Translate("NotReported"))}
                {row(Translate("Location"), getGeography(record.city, record.state, record.country))}
                {row(Translate("SampleSize"), record.denominator_value?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, Translate(",")))}
                {row(Translate("AntibodyTarget"), record.antibody_target && record.antibody_target.length > 0 ? (record.antibody_target.length === 2 ? record.antibody_target.join(", ") : record.antibody_target) : "N/A")}
                {row(Translate("PositiveCases"), (record.cases_per_hundred ? record.cases_per_hundred.toFixed(1) + Translate("Per100") : "N/A"))}
                {row(Translate("Vaccinations"), (record.full_vaccinations_per_hundred ? record.full_vaccinations_per_hundred.toFixed(1) + Translate("Per100") : "N/A"))}
            </div>
            {/*RiskTag section*/}
            {riskTag(`${record.overall_risk_of_bias}`)}
        </div>)
}
