import { faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useMediaQuery } from "react-responsive";
import { mobileDeviceOrTabletWidth } from "../../constants";
import Translate from "../../utils/translate/translateService";
import './static.css';
import ReactGA from 'react-ga';

export default function About() {
    const isMobileDeviceOrTablet = useMediaQuery({ maxWidth: mobileDeviceOrTabletWidth })

    const selectItem = (label: string, name: string) => {
        ReactGA.event({
            category: 'Social Media Link',
            action: 'click',
            label: `${label} - ${name}`
        })
    }

    const selectLink = (link: string) => {
        ReactGA.event({
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
                    <a href="https://www.covid19immunitytaskforce.ca/">
                        <img src="https://www.covid19immunitytaskforce.ca/wp-content/themes/pena-lite-child/CITF_logo_ENG.svg" alt="COVID-19 Immunity Task Force Logo" height="45"></img>
                    </a>
                </p>
                <p>
                    {Translate('AboutPage', ['AboutSection', 'PartThree'])}
                    <a onClick={() => selectLink('ITF Website')} href="https://www.covid19immunitytaskforce.ca/">{Translate('AboutPage', ['AboutSection', 'PartFour'], null, [true, true])}</a>
                    {Translate('AboutPage', ['AboutSection', 'PartFive'])}
                    <a onClick={() => selectLink('McGill Website')} href="https://www.mcgill.ca/spgh/">{Translate('AboutPage', ['AboutSection', 'PartSix'], null, [true, false])}</a>.
                     {Translate('AboutPage', ['AboutSection', 'PartSeven'], null, [true, false])}
                    <a onClick={() => selectLink('Serological Hub')} href="https://www.covid19immunitytaskforce.ca/research/global-serological-knowledge-hub/">{Translate('AboutPage', ['AboutSection', 'PartEight'], null, [true, false])}</a>.
                </p>
                <p>
                    <a onClick={() => selectLink('Mapbox')} href="https://www.mapbox.com/">Mapbox</a> {Translate('AboutPage', ['Mapbox'])}.
                </p>
                <h2>
                    {Translate('ContactUs')}
                </h2>
                <p>

                    {Translate('AboutPage', ['ContactSection', 'SectionOne'])}
                </p>
                <ul>
                    <li>
                        {Translate('AboutPage', ['ContactSection', 'BulletPointOne', 'PartOne'], null, [true, true])}
                        <b>{Translate('AboutPage', ['ContactSection', 'BulletPointOne', 'PartTwo'])}</b>,
                        {Translate('AboutPage', ['ContactSection', 'BulletPointOne', 'PartThree'], null, [true, true])}
                        <a href="mailto:rahul.arora@balliol.ox.ac.uk">rahul.arora@balliol.ox.ac.uk</a>
                        {Translate('AboutPage', ['ContactSection', 'BulletPointOne', 'PartFour'], null, [true, true])}
                        <a href="mailto:tingting.yan@mail.utoronto.ca">tingting.yan@mail.utoronto.ca</a>.
                    </li>
                    <li>
                        {Translate('For')}<b>{Translate('AboutPage', ['ContactSection', 'BulletPointTwo', 'PartOne'], null, [true, false])}</b>,
                        {Translate('AboutPage', ['ContactSection', 'BulletPointTwo', 'PartTwo'], null, [true, true])}
                        <a href="mailto:niklas.bobrovitz@mail.utoronto.ca">niklas.bobrovitz@mail.utoronto.ca</a>.
                    </li>
                    <li>
                        {Translate('For')}<b>{Translate('AboutPage', ['ContactSection', 'BulletPointThree', 'PartOne'], null, [true, false])}</b>,
                         {Translate('AboutPage', ['ContactSection', 'BulletPointThree', 'PartTwo'], null, [true, true])}
                        <a href="mailto:niduarte@uwaterloo.ca"> niduarte@uwaterloo.ca</a>.
                    </li>
                    <li>
                        {Translate('For')} <b>{Translate('AboutPage', ['ContactSection', 'BulletPointFour', 'PartOne'], null, [true, false])}</b>,
                         {Translate('AboutPage', ['ContactSection', 'BulletPointFour', 'PartTwo'], null, [true, true])}
                        <a href="mailto:jordan.vanwyk@uwaterloo.ca"> jordan.vanwyk@uwaterloo.ca</a>.
                    </li>
                    <li>
                        {Translate('AboutPage', ['ContactSection', 'BulletPointFive', 'PartOne'])}
                        <b>{Translate('AboutPage', ['ContactSection', 'BulletPointFive', 'PartTwo'], null, [true, false])}</b>
                        {Translate('AboutPage', ['ContactSection', 'BulletPointFive', 'PartThree'], null, [true, true])}
                        <a onClick={() => selectLink('Form Open')} rel="noopener noreferrer" target="_blank" href="https://forms.gle/XWHQ7QPjQnzQMXSz8">{Translate('ThisForm').toLowerCase()}</a>.
                    </li>
                </ul>
                <h1>
                    {Translate('OurTeam')}
                </h1>
                <h2 className="team-name-text">
                    {Translate('ScientificLead')}
                </h2>
                <div>
                    {renderBioBlock('Tim Evans', [Translate('TimBiography', ['PartOne']), Translate('TimBiography', ['PartTwo'])])}
                </div>
                <h2 className="team-name-text">
                    {Translate('TeamLead')}
                </h2>
                <div className="bio-grid-container">
                    {renderBioBlock('Rahul Arora', [Translate('UniversityOf', null, { "NAME": "Oxford" })], 'https://www.linkedin.com/in/rahularorayyc/', 'rahularoradfs@gmail.com', 'https://mobile.twitter.com/RahulAroraAB')}
                    {renderBioBlock('Tingting Yan', [Translate('UniversityOf', null, { "NAME": "Toronto" })], 'https://www.linkedin.com/in/tingting-yan/', '', 'https://twitter.com/TingtingYan_')}
                </div>
                <h2 className="team-name-text">
                    {Translate('ResearchTeam')}
                </h2>
                <div className="bio-grid-container">
                    {renderBioBlock('Niklas Bobrovitz ', [Translate('UniversityOf', null, { "NAME": "Oxford" }), Translate('UniversityOf', null, { "NAME": "Toronto" })], 'https://www.linkedin.com/in/nik-bobrovitz-19a117179/', null, 'https://twitter.com/nikbobrovitz')}
                    {renderBioBlock('Emily Boucher', [Translate('UniversityOf', null, { "NAME": "Calgary" })], null, 'emily.boucher@ucalgary.ca')}
                    {renderBioBlock('Nathan Duarte', [Translate('UniversityOf', null, { "NAME": "Waterloo" })], 'https://www.linkedin.com/in/duartenathan/', 'nathanduarte1@gmail.com', 'https://twitter.com/_nathan_duarte_')}
                    {renderBioBlock('Hannah Rahim', [Translate('UniversityOf', null, { "NAME": "Calgary" })], 'https://www.linkedin.com/in/hannah-rahim/', null, 'https://twitter.com/Hannah_Rahim1')}
                    {renderBioBlock('Christian Cao', [Translate('UniversityOf', null, { "NAME": "Calgary" })], 'https://ca.linkedin.com/in/christian-cao-275b78190', 'ccao.canada@gmail.com')}
                    {renderBioBlock('Claire Donnici', [Translate('UniversityOf', null, { "NAME": "Calgary" })], null, 'claire.donnici@ucalgary.ca', 'https://twitter.com/ClaireDonnici')}
                    {renderBioBlock('Natasha Ilincic', [Translate('UniversityOf', null, { "NAME": "Guelph" })], null, 'natasha.ilincic@gmail.com')}
                    {renderBioBlock('Michael Liu', [Translate('UniversityOf', null, { "NAME": "Oxford" }), Translate('BlankUniversity', null, { "NAME": "Harvard" })], 'https://www.linkedin.com/in/michael-liu-8728249a/', 'liu.michael222@gmail.com', 'https://twitter.com/mliu_canada')}
                    {renderBioBlock('Brianna Rosgen', [Translate('UniversityOf', null, { "NAME": "Calgary" })], 'https://ca.linkedin.com/in/brianna-rosgen-b12136134', 'Brianna.rosgen@ucalgary.ca', 'https://twitter.com/briannarosgen')}
                    {renderBioBlock('Mitchell Segal', [Translate('UniversityOf', null, { "NAME": "Toronto" })], null, 'mitchell.segal@mail.utoronto.ca')}
                </div>
                <h2 className="team-name-text">
                    Development Team
                </h2>
                <div className="bio-grid-container">
                    {renderBioBlock('Austin Atmaja', [Translate('UniversityOf', null, { "NAME": "Waterloo" })], 'https://www.linkedin.com/in/austinatmaja', null, null)}
                    {renderBioBlock('Abel Joseph ', [Translate('UniversityOf', null, { "NAME": "Waterloo" })], 'https://www.linkedin.com/in/abel-joseph/', 'abel.joseph@uwaterloo.ca')}
                    {renderBioBlock('Ewan May', [Translate('SchoolName', ['Schulich']), Translate('UniversityOf', null, { "NAME": "Calgary" })], 'https://www.linkedin.com/in/ewan-may', 'ewan.may@ucalgary.ca')}
                    {renderBioBlock('Simona Rocco', [Translate('UniversityOf', null, { "NAME": "Waterloo" })], 'https://www.linkedin.com/in/simona-rocco/', 'serocco@uwaterloo.ca')}
                    {renderBioBlock('Jordan Van Wyk', [Translate('UniversityOf', null, { "NAME": "Waterloo" })], 'https://www.linkedin.com/in/jordanvanwyk/', 'jordanvanwyk@outlook.com', 'https://twitter.com/jordanvw_')}
                    {renderBioBlock('Abhinav Pillai	', [Translate('UniversityOf', null, { "NAME": "Calgary" })], null, 'abhinav.arunpillai@ucalgary.ca')}
                </div>
                <h2 className="team-name-text">
                    Economics Team
                </h2>
                <div className="bio-grid-container">
                    {renderBioBlock('Ruby Zhang', ['Harvard University'], 'https://www.linkedin.com/in/ruby-zhang-022821ab')}
                    {renderBioBlock('Sahil Bablani ', ['CPP Investment Board'])}
                </div>
            </div>
        </div>
    )
}
