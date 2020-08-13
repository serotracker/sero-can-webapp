import React, { useState } from "react"
import Translate from "../../utils/translate/translateService"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronDown, faChevronRight } from "@fortawesome/free-solid-svg-icons"
import StudiesTable from "../shared/StudiesTable"
import { AirtableRecord } from "../../types"

interface StudyDisplaySectionProps {
    studies: AirtableRecord[],
    title: string
}

export const StudyDisplaySection = ({title, studies}: StudyDisplaySectionProps) => {
    const [showOpen, updateShowOpen] = useState(true);
    return (
        <div className="fit flex">
            <div onClick={() => updateShowOpen(!showOpen)}
                className="p-2 fill flex space-between center study-display-section-bar">
                <h4 className="m-0">
                    {title}
                </h4>
                <FontAwesomeIcon
                    icon={showOpen ? faChevronDown : faChevronRight}
                    color={'#455a64'}
                    size={"lg"} />
            </div>
            {showOpen ? <StudiesTable smallView={true} dataRecords={studies} showAllStudies={false}></StudiesTable> : null}
        </div>)
}