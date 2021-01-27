import React from "react";
import Translate from '../../utils/translate/translateService';
import { getGeography, getPossibleNullDateString } from '../../utils/utils';
import { Popup } from "react-leaflet";
import { AirtableRecord } from "../../types";

interface PinModalProps {
    record: AirtableRecord,
}

export default function PinModal(props: PinModalProps) {
    const record = props.record;

    return (
        <Popup autoClose={false} className="pin-popup">
            {props.record && (
                <>
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
                </>
            )}
        </Popup>
    )
}