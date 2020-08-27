import React from "react";
import { useMediaQuery } from "react-responsive";
import { mobileDeviceOrTabletWidth } from "../../constants";
import { sendAnalyticsEvent } from "../../utils/analyticsUtils";
import Translate from "../../utils/translate/translateService";
import ReferencesTable from "../charts/ReferencesTable";
import './static.css';

export default function Data() {
    const isMobileDeviceOrTablet = useMediaQuery({ maxDeviceWidth: mobileDeviceOrTabletWidth })
    const renderAirtable = (src: string) => {
        return <div className="col-10 p-0 airtable-embed vertical-spacer">
            <iframe
                title="airtable-embed"
                className="airtable-embed col-12 p-0"
                src={src}
                width="85%"
                height="100%"
            /></div>
    }

    const clickLink = (link: string) => {
        sendAnalyticsEvent({
            category: 'Data Link Click',
            action: 'click',
            label: link
        })
    }

    return (
        <div className="col-12 page">
            <div className={isMobileDeviceOrTablet ? "pb-2" : "static-content pb-2"}>
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
                <ReferencesTable />
            </div>
        </div>
    )
}
