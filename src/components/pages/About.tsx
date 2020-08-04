import { faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useMediaQuery } from "react-responsive";
import { mobileDeviceOrTabletWidth } from "../../constants";
import Translate from "../../utils/translate/translateService";
import './static.css';
import { sendAnalyticsEvent } from '../../utils/analyticsUtils';
import HealthAgencyLogo from '../../assets/images/public-health-agency.png';
import Innovations from '../../assets/images/innovation.png';

export default function About() {
    const isMobileDeviceOrTablet = useMediaQuery({ maxWidth: mobileDeviceOrTabletWidth })

    const selectItem = (label: string, name: string) => {
        sendAnalyticsEvent({
            category: 'Social Media Link',
            action: 'click',
            label: `${label} - ${name}`
        })
    }

    const selectLink = (link: string) => {
        sendAnalyticsEvent({
            category: 'About Page Link',
            action: 'click',
            label: link
        })
    }

    function renderBioBlock(name: string,
        description: string[],
        linkedIn: string | null = null,
        email: string | null = null,
        twitter: string | null = null) {
        return (
            <div>
                <b>
                    {name}
                </b>
                <br />
                {description.map((line) => {
                    return (
                        <div key={line}>
                            {line}
                            <br />
                        </div>
                    )
                })}
                {linkedIn ? <a href={linkedIn} onClick={() => selectItem('LinkedIn', name)} target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faLinkedin} className="mr-1 linked-in" /></a> : null}
                {twitter ? <a href={twitter} onClick={() => selectItem('Twitter', name)} target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faTwitter} className="mx-1 twitter" /></a> : null}
                {email ? <a href={`mailto:${email}`} onClick={() => selectItem('Email', name)}><FontAwesomeIcon icon={faEnvelope} className="ml-1 email" /></a> : null}
            </div>
        )
    }
    return (
        <div className="page col-12">
            <div className={isMobileDeviceOrTablet ? "pb-2" : "static-content pb-2"}>
                <h1>
                    {Translate('AboutSeroTracker')}
                </h1>
                <p>
                    {Translate('AboutPage', ['AboutSection', 'PartOne'])}<b>{Translate('AboutPage', ['AboutSection', 'PartTwo'], null, [true, false])}</b>
                </p>
                <p>
                    <a href="https://www.covid19immunitytaskforce.ca/" className="pr-2" target="__blank" rel="noopener noreferrer">
                        <img src="https://www.covid19immunitytaskforce.ca/wp-content/themes/pena-lite-child/CITF_logo_ENG.svg" alt="COVID-19 Immunity Task Force Logo" height="45"></img>
                    </a>
                    <a href="https://www.canada.ca/en/public-health.html/" className="px-2" target="__blank" rel="noopener noreferrer">
                        <img src={HealthAgencyLogo} alt="Public Health Agency Logo" height="45"></img>
                    </a>
                </p>
                <p> 
                    {Translate('AboutPage', ['AboutSection', 'SupportedBy'])}
                    <a onClick={() => selectLink('Public Health Agency')} href="https://www.canada.ca/en/public-health.html">{Translate('AboutPage', ['AboutSection', 'PublicHealthAgency'], null, [true, true])}</a>
                    {Translate('AboutPage', ['AboutSection', 'HostedAt'])}                    
                    <a onClick={() => selectLink('Centre for Health Informatics')} href="https://cumming.ucalgary.ca/centres/centre-health-informatics">{Translate('AboutPage', ['AboutSection', 'HealthInformatics'], null, [true, true])}</a>
                </p>
                <p>
                    {Translate('AboutPage', ['AboutSection', 'OurWorkIs'])}
                    <a onClick={() => selectLink('ITF Website')} href="https://www.covid19immunitytaskforce.ca/">{Translate('AboutPage', ['AboutSection', 'Covid19ImmunityTaskForce'], null, [true, true])}</a>
                     {Translate('AboutPage', ['AboutSection', 'WhichIsMapping'], null, [true, false])}
                    <a onClick={() => selectLink('Serological Hub')} href="https://www.covid19immunitytaskforce.ca/research/global-serological-knowledge-hub/">{Translate('AboutPage', ['AboutSection', 'GlobalSerologicalKnowledgeHub'], null, [true, false])}</a>.
                </p>
                <p>
                    <a onClick={() => selectLink('Mapbox')} href="https://www.mapbox.com/">Mapbox</a> {Translate('AboutPage', ['Mapbox'])}
                </p>
                <h2>
                    {Translate('ContactUs')}
                </h2>
                <div>
                    <p>
                        {Translate('AboutPage', ['ContactSection', 'BulletPointOne', 'PartOne'], null, [true, true])}
                        <a href="mailto:rahul.arora@balliol.ox.ac.uk">rahul.arora@balliol.ox.ac.uk</a>
                        {Translate('AboutPage', ['ContactSection', 'BulletPointOne', 'PartTwo'], null, [true, true])}
                        <a href="mailto:tingting.yan@mail.utoronto.ca">tingting.yan@mail.utoronto.ca</a>.
                    </p>
                    <p>
                        {Translate('AboutPage', ['ContactSection', 'BulletPointFive', 'PartOne'])}
                        <b>{Translate('AboutPage', ['ContactSection', 'BulletPointFive', 'PartTwo'], null, [true, false])}</b>
                        {Translate('AboutPage', ['ContactSection', 'BulletPointFive', 'PartThree'], null, [true, true])}
                        <a onClick={() => selectLink('Form Open')} rel="noopener noreferrer" target="_blank" href="https://forms.gle/XWHQ7QPjQnzQMXSz8">{Translate('ThisForm').toLowerCase()}</a>.
                    </p>
                </div>
                <h1>
                    {Translate('OurTeam')}
                </h1>
                <h2 className="team-name-text">
                    {Translate('TeamLead')}
                </h2>
                <div className="bio-grid-container">
                    {renderBioBlock('Rahul Arora', [Translate('UniversityOf', null, { "NAME": "Oxford" }), Translate('UniversityOf', null, { "NAME": "Calgary" })], 'https://www.linkedin.com/in/rahularorayyc/', 'rahularoradfs@gmail.com', 'https://mobile.twitter.com/RahulAroraAB')}
                    {renderBioBlock('Tingting Yan', [Translate('UniversityOf', null, { "NAME": "Toronto" })], 'https://www.linkedin.com/in/tingting-yan/', '', 'https://twitter.com/TingtingYan_')}
                </div>
                <h2 className="team-name-text">
                    {Translate('ResearchTeam')}
                </h2>
                <div className="bio-grid-container">
                    {renderBioBlock('Niklas Bobrovitz ', [Translate('UniversityOf', null, { "NAME": "Oxford" }), Translate('UniversityOf', null, { "NAME": "Toronto" })], 'https://www.linkedin.com/in/nik-bobrovitz-19a117179/', 'niklas.bobrovitz@mail.utoronto.ca', 'https://twitter.com/nikbobrovitz')}
                    {renderBioBlock('Emily Boucher', [Translate('SchoolName', ['Cumming']), Translate('UniversityOf', null, { "NAME": "Calgary" })], null, 'emily.boucher@ucalgary.ca')}
                    {renderBioBlock('Hannah Rahim', [Translate('UniversityOf', null, { "NAME": "Calgary" })], 'https://www.linkedin.com/in/hannah-rahim/', 'hannahrahim2@gmail.com', 'https://twitter.com/Hannah_Rahim1')}
                    {renderBioBlock('Christian Cao', [Translate('UniversityOf', null, { "NAME": "Calgary" })], 'https://ca.linkedin.com/in/christian-cao-275b78190', 'ccao.canada@gmail.com')}
                    {renderBioBlock('Claire Donnici', [Translate('UniversityOf', null, { "NAME": "Calgary" })], null, 'claire.donnici@ucalgary.ca', 'https://twitter.com/ClaireDonnici')}
                    {renderBioBlock('Natasha Ilincic', [Translate('UniversityOf', null, { "NAME": "Guelph" })], 'https://www.linkedin.com/in/natasha-ilincic/', 'natasha.ilincic@gmail.com')}
                    {renderBioBlock('Michael Liu', [Translate('UniversityOf', null, { "NAME": "Oxford" }), Translate('BlankUniversity', null, { "NAME": "Harvard" })], 'https://www.linkedin.com/in/michael-liu-8728249a/', 'liu.michael222@gmail.com', 'https://twitter.com/mliu_canada')}
                    {renderBioBlock('Mitchell Segal', [Translate('UniversityOf', null, { "NAME": "Toronto" })], null, 'mitchell.segal@mail.utoronto.ca')}
                    {renderBioBlock('Lucas Penny', [Translate('UniversityOf', null, { "NAME": "Toronto" })], 'https://www.linkedin.com/in/lucaspenny/', 'lucas.penny@mail.utoronto.ca', 'https://twitter.com/lucasjpenny')}
                </div>
                <h2 className="team-name-text">
                    Development Team
                </h2>
                <div className="bio-grid-container">
                    {renderBioBlock('Austin Atmaja', [Translate('UniversityOf', null, { "NAME": "Waterloo" })], 'https://www.linkedin.com/in/austinatmaja', 'atatmaja@uwaterloo.ca', 'https://twitter.com/atatmaja_')}
                    {renderBioBlock('Abel Joseph ', [Translate('UniversityOf', null, { "NAME": "Waterloo" })], 'https://www.linkedin.com/in/abel-joseph/', 'abel.joseph@uwaterloo.ca')}
                    {renderBioBlock('Ewan May', [Translate('SchoolName', ['Schulich']), Translate('UniversityOf', null, { "NAME": "Calgary" })], 'https://www.linkedin.com/in/ewan-may', 'ewan.may@ucalgary.ca')}
                    {renderBioBlock('Brett Dziedzic', [Translate('UniversityOf', null, { "NAME": "Lethbridge" })], 'https://www.linkedin.com/in/brett-dziedzic/', 'brettdziedzic@gmail.com')}
                    {renderBioBlock('Simona Rocco', [Translate('UniversityOf', null, { "NAME": "Waterloo" })], 'https://www.linkedin.com/in/simona-rocco/', 'serocco@uwaterloo.ca')}
                    {renderBioBlock('Jordan Van Wyk', [Translate('UniversityOf', null, { "NAME": "Waterloo" })], 'https://www.linkedin.com/in/jordanvanwyk/', 'jordanvanwyk@outlook.com', 'https://twitter.com/jordanvw_')}
                    {renderBioBlock('Joanna Chen', [Translate('UniversityOf', null, { "NAME": "Waterloo" })], 'https://www.linkedin.com/in/linkjoannachen/', 'sl5chen@uwaterloo.ca', 'https://twitter.com/thejoannachen')}
                </div>
                <h2 className="team-name-text">
                    {Translate('PrivateSectorMonitoringTeam')}
                </h2>
                <div className="bio-grid-container">
                    {renderBioBlock('Nathan Duarte', [Translate('UniversityOf', null, { "NAME": "Waterloo" })], 'https://www.linkedin.com/in/duartenathan/', 'nathanduarte1@gmail.com', 'https://twitter.com/_nathan_duarte_')}
                    {renderBioBlock('Abhinav Pillai	', [Translate('UniversityOf', null, { "NAME": "Calgary" })], null, 'abhinav.arunpillai@ucalgary.ca')}
                    {renderBioBlock('Natalie Duarte', [], null, 'natalieaduarte@gmail.com')}
                    {renderBioBlock('Madeleine Rocco', [Translate('BlankUniversity', null, { "NAME": "Western" })], 'https://www.linkedin.com/in/madeleine-rocco/', 'madeleinerocco@gmail.com')}
                    {renderBioBlock('Jamie Chen', [Translate('BlankUniversity', null, { "NAME": "Johns Hopkins" })], 'https://www.linkedin.com/in/jamieechen/', 'jamieevelynchen@gmail.com')}
                </div>
                <h2 className="team-name-text">
                    {Translate('ScientificAdvisorsAndCollaborators')}
                </h2>
                <div className="bio-grid-container">
                    {renderBioBlock('Tim Evans', [Translate('Biographies', ['Tim', 'PartOne']), Translate('Biographies', ['Tim', 'PartTwo'])])}
                    {renderBioBlock('Tyler Williamson', [Translate('Biographies', ['Tyler', 'PartOne']), Translate('Biographies', ['Tyler', 'PartTwo'])])}
                    {renderBioBlock('Matthew Cheng', [Translate('Biographies', ['Matthew', 'PartOne']), Translate('Biographies', ['Matthew', 'PartTwo'])])}
                    {renderBioBlock('David Naylor', [Translate('Biographies', ['DavidN', 'PartOne']), Translate('Biographies', ['DavidN', 'PartTwo'])])}
                    {renderBioBlock('David Buckeridge', [Translate('Biographies', ['DavidB', 'PartOne']), Translate('Biographies', ['DavidB', 'PartTwo'])])}
                    {renderBioBlock('Jesse Papenburg', [Translate('Biographies', ['Jesse', 'PartOne']), Translate('Biographies', ['Jesse', 'PartTwo'])])}
                    {renderBioBlock('Jonathan Chevrier', [Translate('Biographies', ['Jonathan', 'PartOne']), Translate('Biographies', ['Jonathan', 'PartTwo'])])}
                </div>
            </div>
        </div>
    )
}
