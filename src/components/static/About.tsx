import React from "react";
import './static.css';
import { useMediaQuery } from "react-responsive";
import { mobileDeviceOrTabletWidth } from "../../constants";

export default function About() {
    
    const isMobileDeviceOrTablet = useMediaQuery({ maxDeviceWidth: mobileDeviceOrTabletWidth })
    function renderBioBlock(name: string, description: string[]){
        return (
            <div>
                <b>
                    {name}
                </b>
                <br/>
                {description.map((line) => {
                    return (
                        <div>
                            {line}
                            <br/>
                        </div>
                    )
                })}
            </div>
        )
    }
    return (
        <div className="page col-12">
            <div className={isMobileDeviceOrTablet ? "pb-2" : "static-content pb-2"}>
                <h1>
                    About SeroTracker
                </h1>
                <p>
                    As the acute phase of the COVID-19 pandemic passes its peak, many countries are accelerating their investments in serological (antibody) testing. Understanding population antibody patterns and potential immunity is of great interest to clinicians, public health officials, and policymakers alike. <b>SeroTracker is a knowledge hub that tracks and synthesizes findings from SARS-CoV-2 serosurveillance efforts worldwide.</b>
                </p>
                <p>
                    <a href="https://www.covid19immunitytaskforce.ca/"><img src="https://www.covid19immunitytaskforce.ca/wp-content/themes/pena-lite-child/CITF_logo_ENG.svg" alt="COVID-19 Immunity Task Force Logo" height="45"></img></a>
                </p>
                <p>
                    SeroTracker is supported by <a href="https://www.covid19immunitytaskforce.ca/">Canada's COVID-19 Immunity Task Force</a>, which brings together university, hospital and public health expertise to map the scope of coronavirus infection in Canada. The Task Force is funded by the Government of Canada and its secretariat is housed at <a href="https://www.mcgill.ca/spgh/">McGill University’s School of Population and Global Health</a>. SeroTracker also provides content for the Task Force's <a href = "https://www.covid19immunitytaskforce.ca/research/global-serological-knowledge-hub/">Global Serological Knowledge Hub</a>.
                </p>
                <h2>
                    Contact Us
                </h2>
                <p>
                    We are an interdisciplinary team of researchers and engineers at the University of Oxford, University of Toronto, University of Waterloo, University of Calgary, and Harvard University.
                </p>
                <ul>
                    <li>
                        If you would like to <b>support our efforts or collaborate with us</b>, please contact Rahul Arora at <a href="mailto:rahul.arora@balliol.ox.ac.uk">rahul.arora@balliol.ox.ac.uk</a> and Tingting Yan at <a href="mailto:tingting.yan@mail.utoronto.ca">tingting.yan@mail.utoronto.ca</a>.
                    </li>
                    <li>
                        For <b>research methods-related inquiries</b>, please contact Nik Bobrovitz at <a href="mailto:niklas.bobrovitz@mail.utoronto.ca">niklas.bobrovitz@mail.utoronto.ca</a>.
                    </li>
                    <li>
                        For <b>data and AirTable-related inquiries</b>, please contact Nathan Duarte at <a href="mailto:niduarte@uwaterloo.ca">niduarte@uwaterloo.ca</a>.    
                    </li>
                    <li>
                        For <b>dashboard-related inquiries</b>, please contact Jordan Van Wyk at <a href="mailto:jordan.vanwyk@uwaterloo.ca">jordan.vanwyk@uwaterloo.ca</a>.     
                    </li>
                    <li>
                        To make us aware of <b>new SARS-CoV-2 seroprevalence studies</b> or studies that we have not yet captured, please fill out <a rel="noopener noreferrer" target="_blank" href="https://forms.gle/XWHQ7QPjQnzQMXSz8">this form</a>. 
                    </li>
                </ul>
                <h1>
                    Our Team
                </h1>
                <h2 className="team-name-text">
                    Scientific Lead
                </h2>
                <div>
                    {renderBioBlock('Tim Evans', ['Director, School of Population and Global Health, McGill University', 'Executive Director, Canadian COVID-19 Immunity Task Force'])}
                </div>
                <h2 className="team-name-text">
                    Research Team
                </h2>
                <div className="bio-grid-container">
                    {renderBioBlock('Niklas Bobrovitz ', ['University of Oxford', 'University of Toronto'])}
                    {renderBioBlock('Emily Boucher', ['University of Calgary'])}
                    {renderBioBlock('Nathan Duarte', ['University of Waterloo'])}
                    {renderBioBlock('Hannah Rahim', ['University of Calgary'])}
                    {renderBioBlock('Tingting Yan', ['University of Toronto'])}
                    {renderBioBlock('Christian Cao', ['University of Calgary'])}
                    {renderBioBlock('Claire Donnici', ['University of Calgary'])}
                    {renderBioBlock('Natasha Ilincic', ['University of Guelph'])}
                    {renderBioBlock('Michael Liu', ['University of Oxford', 'Harvard University'])}
                    {renderBioBlock('Mitchell Segal', ['University of Toronto'])}
                </div>
                <h2 className="team-name-text">
                    Development Team
                </h2>
                <div className="bio-grid-container">
                    {renderBioBlock('Austin Atmaja', ['University of Waterloo'])}
                    {renderBioBlock('Rahul Arora', ['University of Oxford'])}
                    {renderBioBlock('Abel Joseph ', ['University of Waterloo'])}
                    {renderBioBlock('Ewan May', ['University of Calgary'])}
                    {renderBioBlock('Simona Rocco', ['University of Waterloo'])}
                    {renderBioBlock('Jordan Van Wyk', ['University of Waterloo'])}
                    {renderBioBlock('Abhinav Pillai	', ['University of Calgary'])}
                </div>
                <h2 className="team-name-text">
                    Economics Team
                </h2>
                <div className="bio-grid-container">
                    {renderBioBlock('Ruby Zhang', ['Harvard University'])}
                    {renderBioBlock('Sahil Bablani ', ['CPP Investment Board'])}
                </div>
            </div>
        </div>
    )
}
