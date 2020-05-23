import React from "react";
import './static.css';
import { Tab } from "semantic-ui-react";
import { useMediaQuery } from "react-responsive";

export default function Data() {

    
  const isTabletOrMobileDevice = useMediaQuery({ maxDeviceWidth: 600 })
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
        menuItem: isTabletOrMobileDevice ? 'Serosurveys' : 'Serosurveys Reporting Prevalence',
        render: () => renderPane('https://airtable.com/embed/shraXWPJ9Yu7ybowM?backgroundColor=blue&viewControls=on')
    },
    {
        menuItem: 'Planned Serosurveys',
        render: () => renderPane('https://airtable.com/embed/shr85cDHzwETbjgdu?backgroundColor=blue&viewControls=on')
    }];

    return (
        <div className="page">
            <div className="static-content">
                <h1>
                    Methods
                </h1>
                <p>
                    SeroTracker provides an up-to-date systematic synthesis of SARS-CoV-2 serosurveillance projects globally. We screened peer-reviewed articles, preprints, government reports, and media articles to identify the prevalence estimates reported below. Our data is updated daily with all new reports of seroprevalence findings that were captured in our search. 
                </p>
                <p>
                You can view our full methods <a target="_blank" href="https://docs.google.com/document/d/1NYpszkr-u__aZspFDFa_fa4VBzjAAAAxNxM1rZ1txWU/edit?usp=sharing">here.</a> To submit a SARS-CoV-2 seroprevalence study that we have not yet captured below, use <a target="_blank" href="https://forms.gle/XWHQ7QPjQnzQMXSz8">this form</a>.
                </p>
                <h1>
                    Paper
                </h1>
                <p>
                    Our first manuscript, describing lessons from serosurveys up to May 1, can be found on <a target="_blank" href="https://www.medrxiv.org/content/10.1101/2020.05.10.20097451v1">medRxiv</a>.
                </p>
                <h1>
                    Our Data
                </h1>
                <p>
                    The tables below describe our findings, including detailed information about each study, each prevalence estimate, and the associated risk of bias.  
                </p>
                <ul>
                    <li>
                        <p>
                            <b>Serosurveys Reporting Prevalence</b> captures all studies reporting prevalence estimates
                        </p>
                    </li>
                    <li>
                        <p>
                            <b>Planned Serosurveys</b> describes studies that have not yet reported seroprevalence estimates
                        </p>
                    </li>
                </ul>
            </div>
            <Tab className="col-10 p-0 airtable-embed vertical-spacer" panes={panes} />
        </div>
    )
}
