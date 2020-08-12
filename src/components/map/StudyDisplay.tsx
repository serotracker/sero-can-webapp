import React, { useContext, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { mobileDeviceOrTabletWidth } from "../../constants";
import Translate from "../../utils/translate/translateService";
import { AppContext } from "../../context";
import "./StudyDisplay.css"
import StudiesTable from "../shared/StudiesTable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faChevronDown, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { StudyDisplaySection } from "./StudyDisplaySection";

export default function StudyDisplay() {
    const [state, dispatch] = useContext(AppContext)
    const filteredByCountry = state.filteredRecords.filter(o => o.country == state.selectedCountry);
    const sublocalStudies = filteredByCountry.filter(o => o.estimate_grade == 'Sublocal')
    const localStudies = filteredByCountry.filter(o => o.estimate_grade == 'Local')
    const regionalStudies = filteredByCountry.filter(o => o.estimate_grade == 'Regional')
    const nationalStudies = filteredByCountry.filter(o => o.estimate_grade == 'National')

    const closeModal = () => {
        dispatch({
            type: "CLOSE_MODAL"
        })
    }

    return (
        state.dataPageState.mapOpen && state.dataPageState.showStudiesModal ?
            <div className="study-display flex column">
                <div className="py-2 mx-2 my-0 flex space-between study-header">
                    <h3 className="m-0">
                        {Translate('Studies')} - {state.selectedCountry}
                    </h3>
                    <FontAwesomeIcon
                        icon={faTimes}
                        onClick={() => closeModal()}
                        className={'icon'}
                        color={'#455a64'}
                        style={{ fontWeight: 300, position: 'absolute', zIndex: 3000, top: 10, right: 20 }}
                        size={"lg"} />

                </div>
                <div className="study-display-modal fill">
                    {nationalStudies.length > 0 ? 
                    <StudyDisplaySection studies={nationalStudies} title={Translate('NationalStudies')}/>: null}
                    {regionalStudies.length > 0 ? 
                    <StudyDisplaySection studies={regionalStudies} title={Translate('RegionalStudies')}/>: null}
                    {localStudies.length > 0 ?                  
                    <StudyDisplaySection studies={localStudies} title={Translate('LocalStudies')}/>: null}
                    {sublocalStudies.length > 0 ? 
                    <StudyDisplaySection studies={sublocalStudies} title={Translate('SublocalStudies')}/>: null}
                </div>
            </div> : null
    )
}
