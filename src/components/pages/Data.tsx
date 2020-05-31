import React from "react";
import { Tab } from "semantic-ui-react";
import './static.css';
import { useMediaQuery } from "react-responsive";
import { mobileDeviceOrTabletWidth } from "../../constants";
import Translate from "../../utils/translate/translateService";

export default function Data() {
    const isMobileDeviceOrTablet = useMediaQuery({ maxDeviceWidth: mobileDeviceOrTabletWidth })
    const renderPane = (src: string) => {
        return <Tab.Pane className="col-12 p-0">
            <iframe
                title="airtable-embed"
                className="airtable-embed col-12 p-0"
                src={src}
                width="85%"
                height="650"
            /></Tab.Pane>
    }

    const panes = [{
        menuItem: isMobileDeviceOrTablet ? Translate('Serosurveys') : Translate('SerosurveysReportingPrevalence'),
        render: () => renderPane('https://airtable.com/embed/shraXWPJ9Yu7ybowM?backgroundColor=blue&viewControls=on')
    },
    {
        menuItem: Translate('PlannedSerosurveys'),
        render: () => renderPane('https://airtable.com/embed/shr85cDHzwETbjgdu?backgroundColor=blue&viewControls=on')
    }];

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
                    {Translate('MethodsText', ['SecondParagraphPartOne'])} <a target="_blank" rel="noopener noreferrer" href="https://docs.google.com/document/d/1NYpszkr-u__aZspFDFa_fa4VBzjAAAAxNxM1rZ1txWU/edit?usp=sharing">{Translate('Here').toLocaleLowerCase()}.</a> {Translate('MethodsText', ['SecondParagraphPartTwo'])} <a rel="noopener noreferrer" target="_blank" href="https://forms.gle/XWHQ7QPjQnzQMXSz8">{Translate('ThisForm').toLowerCase()}</a>.
                </p>
                <h1>
                    {Translate('Paper')}
                </h1>
                <p>
                    {Translate('PaperText', null, null, [false, true])}<a target="_blank" rel="noopener noreferrer" href="https://www.medrxiv.org/content/10.1101/2020.05.10.20097451v1">medRxiv</a>.
                </p>
                <h1>
                    {Translate('OurData')}
                </h1>
                <p>
                    {Translate('OurDataText', ['Text'])}
                </p>
                <ul>
                    <li>
                        <p>
                            <b>{Translate('SerosurveysReportingPrevalence')}</b>{Translate('OurDataText', ['PointOne'], null, [true, false])}
                        </p>
                    </li>
                    <li>
                        <p>
                            <b>{Translate('PlannedSerosurveys')}</b>{Translate('OurDataText', ['PointTwo'], null, [true, false])}
                        </p>
                    </li>
                </ul>
            </div>
            <Tab className="col-10 p-0 airtable-embed vertical-spacer" panes={panes} />
        </div>
    )
}
