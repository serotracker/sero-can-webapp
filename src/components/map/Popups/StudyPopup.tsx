import React from "react";
import { AirtableRecord } from "types";
import Translate from 'utils/translate/translateService';
import { getGeography, getPossibleNullDateString } from 'utils/utils';

export default function StudyPopup(record: AirtableRecord) {
    return (<div className="popup-content" >
        <div className="popup-title">
            {Translate(`${record.estimate_grade}StudyDetails`)}
        </div>
        <div className="popup-heading">
            {Translate("StudyName")}
        </div>
        <div className="popup-text">
            {record.url ? <a href={record.url} target="_blank" rel="noopener noreferrer">{record.source_name}</a> : record.source_name}
        </div>
        <div className="popup-heading">
            {Translate("Location")}
        </div>
        <div className="popup-text">
            {getGeography(record.city, record.state, record.country)}
        </div>
        <div className="popup-heading">
            {Translate("PopulationGroup")}
        </div>
        <div className="popup-text">
            {record.population_group ?? Translate("NotReported")}
        </div>
        {(record.sampling_start_date && record.sampling_end_date) && (
            <>
                <div className="popup-heading">
                    {Translate("SamplingDates")}
                </div>
                <div className="popup-text">
                    {`${getPossibleNullDateString(record.sampling_start_date)} → ${getPossibleNullDateString(record.sampling_end_date)}`}
                </div>
            </>)
        }
        <div className="popup-heading">
            {Translate("BestSeroprevalenceEstimate")}
        </div>
        <div className="popup-text">
            {record.serum_pos_prevalence ? `${(record.serum_pos_prevalence * 100).toFixed(1)}%` : "N/A"}
        </div>
        <div className="popup-heading">
            {Translate("N")}
        </div>
        <div className="popup-text">
            {`${record.denominator_value}`}
        </div>
        <div className="popup-heading">
            {Translate("VaccineRolloutStatus")}
        </div>
        <div className="popup-text">
            {(record.vaccination_policy == 0) ? Translate("VaccinationPolicyLow") : (record.vaccination_policy == 1 || record.vaccination_policy == 2 || record.vaccination_policy == 3) ? Translate("VaccinationPolicyMed") : Translate("VaccinationPolicyHigh")}
        </div>
        <div className="popup-heading">
            {Translate("RiskOfBias")}
        </div>
        <div className="popup-text">
            {`${record.overall_risk_of_bias}`}
        </div>
    </div>)
}