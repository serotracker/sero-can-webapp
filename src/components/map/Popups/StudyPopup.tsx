import React from "react";
import { AirtableRecord } from "types";
import Translate from 'utils/translate/translateService';
import { getGeography, getPossibleNullDateString } from 'utils/utils';
import InformationIcon from "../../shared/InformationIcon";

export default function StudyPopup(record: AirtableRecord) {
    const getVaccinationIconText = (vaccinationPolicy: number) => {
        const vaccinationPolicyMapping: Record<number, string> = {0: "No availability",
        1: "Availability for ONE of following: key workers/ clinically vulnerable groups (non elderly) / elderly groups",
        2: "Availability for TWO of following: key workers/ clinically vulnerable groups (non elderly) / elderly groups",
        3: "Availability for ALL of following: key workers/ clinically vulnerable groups (non elderly) / elderly groups",
        4: "Availability for all three plus partial additional availability (select broad groups/ages)",
        5: "Universal availability"}

        return vaccinationPolicyMapping[vaccinationPolicy]
    }

    return (<React.Fragment>
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
            {record.seroprevalence ? `${(record.seroprevalence * 100).toFixed(1)}%` : "N/A"}
        </div>
        <div className="popup-heading">
            {Translate("VaccineRolloutStatus")}
        </div>
        <div className="popup-text">
            {(record.vaccination_policy == 0) ? "No vaccines available" : (record.vaccination_policy == 1 || record.vaccination_policy == 2 || record.vaccination_policy == 3) ? "Vaccines available to certain groups" : "Vaccines available to broader population"}
        </div>
        <div className="popup-heading">
            {Translate("N")}
        </div>
        <div className="popup-text">
            {`${record.denominator}`}
        </div>
        <div className="popup-heading">
            {Translate("PopulationGroup")}
        </div>
        <div className="popup-text">
            {record.population_group ? `${record.population_group}` : Translate("NotReported")}
        </div>
        <div className="popup-heading">
            {Translate("RiskOfBias")}
        </div>
        <div className="popup-text">
            {`${record.overall_risk_of_bias}`}
        </div>
    </React.Fragment>)
}