import React from "react";
import './static.css';

export default function Home() {
    return (
        <div className="static-page">
            <div className="static-content">
                <h1>
                    About the Global Serosurveillance Project
                </h1>
                <h4>
                    The world is shifting towards building a long-term recovery strategy from the COVID-19 pandemic.
                </h4>
                <p>
                    Antibody (also known as serology) tests are blood-based tests that provide evidence of previous exposure to the virus, regardless of whether someone has developed symptoms. Antibody testing may provide insights to levels of background community immunity, which can help support policy decisions around reopening the economy and returning to normal life.
                </p>
                <h4>
                    We aim to provide up-to-date synthesis of the results of SARS-CoV-2 sero-surveys from around the world.
                </h4>
                <p>
                In early April, we noticed the accelerating momentum behind antibody testing. To capture information from these serosurveillance projects, we developed a ‘living’ rapid review, creating the infrastructure to extract serology testing data from governments, research institutions, and corporations as it was released. Given the wide range in sampling strategy, we developed a system to critically appraise the population immunity estimates from news sources, grey literature, and scientific articles. We soon plan to visualize these estimates through an interactive world map.
                </p>
                <h1>
                    Our Methods (in a nutshell)
                </h1>
                <ol>
                    <li>
                        We are conducting an abbreviated systematic review, informed by Cochrane guidance, to capture all proposed, on-going, or completed cross-sectional SARS-CoV-2 serosurveys around the world.                 
                    </li>
                    <li>
                        <div>
                            We searched electronic data sources from December 1, 2019 - May 1, 2020:
                            <ol type="a">
                                <li>
                                    <div>
                                        Academic literature databases: 
                                        <ol type="i">
                                            <li>
                                                Published: PubMed, high-impact journals (BMJ, JAMA, NEJM, The Lancet, Annals of Internal Medicine)
                                            </li>
                                            <li>
                                                Unpublished: MedRXIV, BioRXIV
                                            </li>
                                        </ol>
                                    </div>
                                </li>
                                <li>
                                    <div>
                                        Grey literature: 
                                        <ol type="i">
                                            <li>
                                                Reports: WHO, NIH, CDC, ECDC
                                            </li>
                                            <li>
                                                Media: Google News
                                            </li>
                                        </ol>
                                    </div>
                                </li>
                            </ol>
                        </div>
                    </li>
                    <li>
                        We continually updated evidence by subscribing to automatic email updates from all sources.
                    </li>
                    <li>
                        We critically appraised evidence based on the Joanna Briggs Institute Critical Appraisal Checklist for Studies Reporting Prevalence Data
                    </li>
                </ol>
                <p>
                    Our full methods can be found at:
                </p>
                <h1>
                    Our Results
                </h1>
            </div>
            <iframe
                title="airtable-embed"
                className="airtable-embed col-10 p-0" 
                src="https://airtable.com/embed/shrtxrrlZkOgzEl7O?backgroundColor=blue&viewControls=on" 
                width="85%"
                height="650"
            />
        </div>
    )
}