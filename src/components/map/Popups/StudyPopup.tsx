import React from "react";
import { AirtableRecord, LanguageType } from "types";
import Translate from 'utils/translate/translateService';
import { getGeography, getPossibleNullDateString } from 'utils/utils';
import {Divider} from "semantic-ui-react"

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

function riskTag(riskLevel: string | null | undefined) {
    return(
        <div className={"popup-risk-tag popup-risk-" + riskLevel}>
            {riskLevel} risk of bias
        </div>
    )
}

export default function StudyPopup(record: AirtableRecord, language: LanguageType) {
    return (
        <div className="popup-content" >
            <div className={"d-flex justify-content-between mb-1"}>
                <div className="popup-title">
                    {Translate(`${record.estimate_grade}StudyDetails`)}
                </div>
                <div className="popup-subtitle">
                    {getGeography(record.city, record.state, record.country)}
                </div>
            </div>
            <Divider />
            {row(Translate("StudyName"), record.url ? <a href={record.url} target="_blank" rel="noopener noreferrer">{record.source_name}</a> : record.source_name)}
            {/*{row("Scope", record.estimate_grade)}*/}
            {/*{row(Translate(`${record.estimate_grade}StudyDetails`), getGeography(record.city, record.state, record.country))}*/}
            {(record.sampling_start_date && record.sampling_end_date) && (
                <>
                    {row(Translate("SamplingDates"), `${getPossibleNullDateString(record.sampling_start_date, language)} → ${getPossibleNullDateString(record.sampling_end_date, language)}`)}
                </>)
            }
            {row(Translate("PopulationGroup"), record.population_group ?? Translate("NotReported"))}
            {row(Translate("BestSeroprevalenceEstimate"),record.serum_pos_prevalence ? `${(record.serum_pos_prevalence * 100).toFixed(1)}%` : "N/A")}
            {row(Translate("SampleSize"), record.denominator_value?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, Translate(",")))}
            {row(Translate("AntibodyTarget"), record.antibody_target && record.antibody_target.length > 0 ? (record.antibody_target.length === 2 ? record.antibody_target.join(", ") : record.antibody_target) : "N/A")}
            {row(Translate("PositiveCases"), (record.cases_per_hundred ? record.cases_per_hundred.toFixed(1) + " per 100" : "N/A"))}
            {row(Translate("Vaccinations"), (record.full_vaccinations_per_hundred ? record.full_vaccinations_per_hundred.toFixed(1) + " per 100" : "N/A"))}
            {riskTag(`${record.overall_risk_of_bias}`)}
        </div>)
}
