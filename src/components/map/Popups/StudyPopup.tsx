import React from "react";
import { AirtableRecord } from "types";
import Translate from 'utils/translate/translateService';
import { getGeography, getPossibleNullDateString } from 'utils/utils';

/**
 * @param title: left column of study modal: title of content
 * @param content: right content of study modal: the actual content for this record
 */
function row(title: string, content: JSX.Element | string | null | undefined) {
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

export default function StudyPopup(record: AirtableRecord) {

    return (
        <div className="popup-content" >
            <div className={"d-flex justify-content-between mb-1"}>
                <div className="popup-title">
                    {Translate(`${record.estimate_grade}StudyDetails`)}:
                </div>
                <div className="popup-subtitle">
                    {getGeography(record.city, record.state, record.country)}
                </div>
            </div>
            {row(Translate("StudyName"), record.url ? <a href={record.url} target="_blank" rel="noopener noreferrer">{record.source_name}</a> : record.source_name)}
            {row(Translate("BestSeroprevalenceEstimate"), record.serum_pos_prevalence ? `${(record.serum_pos_prevalence * 100).toFixed(1)}%` : "N/A")}
            {(record.sampling_start_date && record.sampling_end_date) && (
                <>
                    {row(Translate("SamplingDates"), `${getPossibleNullDateString(record.sampling_start_date)} → ${getPossibleNullDateString(record.sampling_end_date)}`)}
                </>)
            }
            {row(Translate("SampleSize"), record.denominator_value?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, Translate(",")))}
            {row(Translate("PositiveCases"), ("Missing"))}
            {row(Translate("Vaccinations"), ("Missing"))}
            {row(Translate("PopulationGroup"), record.population_group ?? Translate("NotReported"))}
            {riskTag(`${record.overall_risk_of_bias}`)}
        </div>)
}
// hello `${record.denominator_value}`