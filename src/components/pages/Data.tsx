import React, { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { Link } from "react-router-dom";
import { Loader, Segment } from "semantic-ui-react";
import { isMaintenanceMode, mobileDeviceOrTabletWidth } from "../../constants";
import { getEmptyFilters } from "../../context";
import httpClient from "../../httpClient";
import { sendAnalyticsEvent } from "../../utils/analyticsUtils";
import Translate from "../../utils/translate/translateService";
import StudiesTable from "../shared/StudiesTable";
import './static.css';
import MaintenanceModal from "../shared/MaintenanceModal";

export default function Data() {
    const isMobileDeviceOrTablet = useMediaQuery({ maxDeviceWidth: mobileDeviceOrTabletWidth })
    const [allRecords, setAllRecords] = useState([])
    const[isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        // note: using IIFE here so that we can 
        // have async/await behaviour in useEffect
        (async () => {
            await getAllRecords();
            setIsLoading(false);
        })()
    }, [])

    const clickLink = (link: string) => {
        sendAnalyticsEvent({
            category: 'Data Link Click',
            action: 'click',
            label: link
        })
    }

    const getAllRecords = async () => {
        const api = new httpClient()
        // TODO: Figure out a better place to put this so we don't keep updating this either 
        const res = await api.getAirtableRecords(getEmptyFilters());
        setAllRecords(res)
    }

    return (
        <>
            <div className="col-12 page">
                <div className={isMobileDeviceOrTablet ? "" : "static-content"}>
                    <h1>
                        {Translate('Methods')}
                    </h1>
                    <p>
                        {Translate('MethodsText', ['FirstParagraph'])}
                    </p>
                    <p>
                        {Translate('MethodsText', ['SecondParagraphPartOne'])}
                        <a target="_blank" onClick={() => clickLink('Methods')} rel="noopener noreferrer" href="https://docs.google.com/document/d/1NYpszkr-u__aZspFDFa_fa4VBzjAAAAxNxM1rZ1txWU/edit?usp=sharing">{Translate('Here', null, null, [true, false]).toLocaleLowerCase()}.</a>
                        {Translate('MethodsText', ['SecondParagraphPartTwo'], null, [true, false])}
                        <a rel="noopener noreferrer" onClick={() => clickLink('Study Submission')} target="_blank" href="https://forms.gle/XWHQ7QPjQnzQMXSz8">{Translate('ThisForm', null, null, [true, false]).toLowerCase()}</a>.
                    </p>
                    <h1>
                        {Translate('ManuscriptAndPreprint')}
                    </h1>
                    <p>
                        {Translate('PaperText', null, null, [false, true])}<a target="_blank" onClick={() => clickLink('MedRXIV')} rel="noopener noreferrer" href="https://www.medrxiv.org/content/10.1101/2020.05.10.20097451v1">medRxiv</a>.
                    </p>
                    <p>
                        {Translate('PaperTextTwo', null, null, [false, true])}<a target="_blank" onClick={() => clickLink('LancetID')} rel="noopener noreferrer" href="https://www.thelancet.com/journals/laninf/article/PIIS1473-3099(20)30631-9/fulltext#%20"><i>{Translate('LancetID')}</i></a>.
                    </p>
                    <h1>
                        {Translate('OurData')}
                    </h1>
                    <p>
                        {Translate('OurDataText', ['Text'])}
                    </p>
                </div>

                <div className={isMobileDeviceOrTablet ? "pb-3 pt-3" : "pb-3 pt-3 reference-table"}>
                    <Segment>
                        <Loader indeterminate active={isLoading}/>
                        <StudiesTable dataRecords={allRecords} showAllStudies={false}></StudiesTable>
                    </Segment>
                </div>

                <div className={isMobileDeviceOrTablet ? "pb-5" : "static-content pb-5"}>
                    <div className="d-flex d-flex justify-content-center">
                        <span>{Translate('UseOfData', null, null, [false, true])}</span>
                        <Link className="px-1" to="/TermsOfUse">{Translate('TermsOfUse')}</Link>
                    </div>
                </div>
            </div>
            <MaintenanceModal isOpen={isMaintenanceMode} headerText={"Data"} />
        </>
    )
}
