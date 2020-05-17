import React from "react";
import './static.css';
import { Tab } from "semantic-ui-react";

export default function Data() {

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
        menuItem: 'Detailed Serosurvey Data (All)',
        render: () => renderPane('https://airtable.com/embed/shrtxrrlZkOgzEl7O?backgroundColor=blue&viewControls=on')
    },
    {
        menuItem: 'Serosurveys Reporting Prevalence',
        render: () => renderPane('https://airtable.com/embed/shraXWPJ9Yu7ybowM?backgroundColor=blue&viewControls=on')
    },
    {
        menuItem: 'Planned Serosurveys',
        render: () => renderPane('https://airtable.com/embed/shr85cDHzwETbjgdu?backgroundColor=blue&viewControls=on')
    }
    ]

    return (
        <div className="page">
            <div className="static-content">
                <h1>
                    About SeroTracker
                </h1>
                <p>
                    As the acute phase of the COVID-19 pandemic passes its peak, many countries are accelerating investment in serological testing. Understanding population antibody patterns and potential immunity to SARS-CoV-2 is of great interest to clinicians, public health officials, and policymakers alike. Despite this priority, there have been no published systematic efforts to track or synthesize findings from ongoing SARS-CoV-2 serosurveys. 
                </p>
                <p>
                SeroTracker provides the first systematic up-to-date synthesis of SARS-CoV-2 serosurveillance projects globally. We screened 1,845 peer-reviewed articles, preprints, government reports, and media articles, identifying 23 studies reporting 42 prevalence estimates from 14 countries and 50 studies yet to report. Our full methods can be found <a rel="noopener noreferrer" target="_blank" href="https://drive.google.com/file/d/1ckfyprYUoNZRkBPgzbFRfvf1IsXmxvRP/view?usp=sharing">here</a>.
                </p>

                <h1>
                    Our Data
                </h1>
                <p>
                    The tables below gather our findings, including detailed information about each study, prevalence estimate, and the associated risk of bias. 
                </p>
                <ul>
                    <li>
                        <p>
                            <b>Detailed Serosurvey Data (all)</b> provides thorough data on all prevalence estimates, including both reported estimates and intended studies
                        </p>
                    </li>
                    <li>
                        <p>
                            <b>Serosurveys Reporting Prevalence</b> mirrors Supplementary Table 1 in our manuscript, providing concise data on all reported seroprevalence estimates
                        </p>
                    </li>
                    <li>
                        <p>
                            <b>Planned Serosurveys</b> mirrors Supplementary Table 2 in our manuscript, summarizing intended serosurveys
                        </p>
                    </li>
                </ul>
            </div>
            <Tab className="col-10 p-0 airtable-embed vertical-spacer" panes={panes} />
        </div>
    )
}