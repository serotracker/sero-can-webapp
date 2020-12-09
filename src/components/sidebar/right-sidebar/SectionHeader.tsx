import React from "react";
import "react-datepicker/dist/react-datepicker.css";
import InformationIcon from "../../shared/InformationIcon";

interface SectionHeaderProps {
    header_text: string,
    tooltip_text?: string | React.ReactNode,
    tooltip_header?: string
}

export default function SectionHeader({header_text, tooltip_text, tooltip_header}: SectionHeaderProps){
    return (
        <div className="pb-2 flex">
        <div className="filter-section-header">{header_text}</div>
        {tooltip_text && (
            <div className="tooltip-vert-adj">
            <InformationIcon
                offset={10}
                position="bottom right"
                color="#455a64"
                tooltipHeader={tooltip_header ? tooltip_header : header_text}
                popupSize="small"
                size="sm"
                tooltip={tooltip_text} />
            </div>
        )}
        </div>
    )
}