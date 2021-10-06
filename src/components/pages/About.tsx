import { faLinkedin, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useMediaQuery } from "react-responsive";
import { mobileDeviceOrTabletWidth, PAGE_HASHES } from "../../constants";
import Translate from "../../utils/translate/translateService";
import WhoLogo from "components/shared/WhoLogo";
import "./static.css";
import { sendAnalyticsEvent } from "../../utils/analyticsUtils";
import HealthAgencyLogo from "../../assets/images/public-health-agency.png";
import UcalgaryLogo from "../../assets/images/University-Of-Calgary-Logo.png";

export default function About() {
  const isMobileDeviceOrTablet = useMediaQuery({
    maxWidth: mobileDeviceOrTabletWidth,
  });

  const selectItem = (label: string, name: string) => {
    sendAnalyticsEvent({
      category: "Social Media Link",
      action: "click",
      label: `${label} - ${name}`,
    });
  };

  const selectLink = (link: string) => {
    sendAnalyticsEvent({
      category: "About Page Link",
      action: "click",
      label: link,
    });
  };

  function renderBioBlock(
    name: string,
    description: string[],
    linkedIn: string | null = null,
    email: string | null = null,
    twitter: string | null = null
  ) {
    return (
      <div>
        <b>{name}</b>
        <br />
        {description.map((line) => {
          return (
            <div key={line}>
              {line}
              <br />
            </div>
          );
        })}
        {linkedIn ? (
          <a href={linkedIn} onClick={() => selectItem("LinkedIn", name)} target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faLinkedin} className="mr-2 linked-in" />
          </a>
        ) : null}
        {twitter ? (
          <a href={twitter} onClick={() => selectItem("Twitter", name)} target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faTwitter} className="mr-2 twitter" />
          </a>
        ) : null}
        {email ? (
          <a href={`mailto:${email}`} onClick={() => selectItem("Email", name)}>
            <FontAwesomeIcon icon={faEnvelope} className="mr-2 email" />
          </a>
        ) : null}
      </div>
    );
  }
  return (
    <div className="page col-12">
      <div className={isMobileDeviceOrTablet ? "pb-2 static-mobile" : "static-content pb-2"}>
        <h1>{Translate("AboutPage", ["Headers", "AboutSeroTracker"])}</h1>
        <p>
        <b>{Translate("AboutPage", ["AboutSection", "PartOne"])}</b>
          {Translate("AboutPage", ["AboutSection", "PartTwo"], null, [true, false])}
        </p>
        <p>
          <a
            href="https://www.covid19immunitytaskforce.ca/"
            className="pr-2"
            target="__blank"
            rel="noopener noreferrer"
          >
            <img
              src="https://www.covid19immunitytaskforce.ca/wp-content/themes/pena-lite-child/CITF_logo_ENG.svg"
              alt="COVID-19 Immunity Task Force Logo"
              height="45"
            ></img>
          </a>
          <a
            href="https://www.canada.ca/en/public-health.html/"
            className="px-2"
            target="__blank"
            rel="noopener noreferrer"
          >
            <img src={HealthAgencyLogo} alt="Public Health Agency Logo" height="45"></img>
          </a>
          <a
            href="https://cumming.ucalgary.ca/centres/centre-health-informatics"
            className="px-2"
            target="__blank"
            rel="noopener noreferrer"
          >
            <img src={UcalgaryLogo} alt="Centre for Health Informatics" height="40"></img>
          </a>
          <a href="https://www.who.int/" className="px-2" target="__blank" rel="noopener noreferrer">
            <WhoLogo height="50"/>
          </a>
        </p>
        <p>
          {Translate("AboutPage", ["AboutSection", "SupportedBy"])}
          <a onClick={() => selectLink("Public Health Agency")} href="https://www.canada.ca/en/public-health.html">
            {Translate("AboutPage", ["AboutSection", "PublicHealthAgency"], null, [true, true])}
          </a>
          {Translate("AboutPage", ["AboutSection", "ThroughThe"])}
          <a onClick={() => selectLink("ITF Website")} href="https://www.covid19immunitytaskforce.ca/">
            {Translate("AboutPage", ["AboutSection", "Covid19ImmunityTaskForce"], null, [true, true])}
          </a>
          {Translate("AboutPage", ["AboutSection", "HostedAt"])}
          <a
            onClick={() => selectLink("Centre for Health Informatics")}
            href="https://cumming.ucalgary.ca/centres/centre-health-informatics"
          >
            {Translate("AboutPage", ["AboutSection", "HealthInformatics"], null, [true, true])}
          </a>
        </p>
        <p>
          {Translate("AboutPage", ["AboutSection", "WHO1"])}
          <a onClick={() => selectLink("WorldHealthOrganization")} href="https://www.who.int/">
            {Translate("AboutPage", ["AboutSection", "WorldHealthOrganization"], null, [true, true])}
          </a>
          {Translate("AboutPage", ["AboutSection", "WHO2"])}
          <a onClick={() => selectLink("UnityStudies")} href="https://www.who.int/emergencies/diseases/novel-coronavirus-2019/technical-guidance/early-investigations">
            {Translate("AboutPage", ["AboutSection", "UnityStudies"], null, [true, false])}
          </a>
          {Translate("AboutPage", ["AboutSection", "WHO3"], null, [true, true])}
        </p>
        <p>
          <a onClick={() => selectLink("Mapbox")} href="https://www.mapbox.com/">
            Mapbox
          </a>{" "}
          {Translate("AboutPage", ["Mapbox"])}
        </p>
        <h2 id={PAGE_HASHES.About.Contact}>{Translate("AboutPage", ["Headers","ContactUs"])}</h2>
        <div>
          <p>
            {Translate("AboutPage", ["ContactSection", "BulletPointOne", "PartOne"], null, [true, true])}
            <a href="mailto:rahul.arora@balliol.ox.ac.uk">rahul.arora@balliol.ox.ac.uk</a>
            {Translate("AboutPage", ["ContactSection", "BulletPointOne", "PartTwo"], null, [true, true])}
            <a href="mailto:tingting.yan@mail.utoronto.ca">tingting.yan@mail.utoronto.ca</a>.
            {Translate("AboutPage", ["ContactSection", "BulletPointOne", "PartThree"], null, [true, true])}
            <a href="mailto:media@covid19immunitytaskforce.ca">media@covid19immunitytaskforce.ca</a>
            {Translate("AboutPage", ["ContactSection", "BulletPointOne", "PartFour"], null, [true, true])}
            <a href="mailto:kelly.johnston2@ucalgary.ca">kelly.johnston2@ucalgary.ca</a>.
          </p>
          <p>
            {Translate("AboutPage", ["ContactSection", "BulletPointFive", "PartOne"])}
            <b>{Translate("AboutPage", ["ContactSection", "BulletPointFive", "PartTwo"], null, [true, false])}</b>
            {Translate("AboutPage", ["ContactSection", "BulletPointFive", "PartThree"], null, [true, true])}
            <a
              onClick={() => selectLink("Form Open")}
              rel="noopener noreferrer"
              target="_blank"
              href="https://forms.gle/XWHQ7QPjQnzQMXSz8"
            >
              {Translate("ThisForm").toLowerCase()}
            </a>
            .
          </p>
        </div>
        <h1 id={PAGE_HASHES.About.Team}>{Translate("AboutPage", ["Headers","OurTeam"])}</h1>
        <h2 className="team-name-text">{Translate("AboutPage", ["SubHeaders", "TeamLead"])}</h2>
        <div className="bio-grid-container">
          {renderBioBlock(
            "Rahul Arora",
            [Translate("UniversityOf", null, { NAME: "Oxford" }), Translate("UniversityOf", null, { NAME: "Calgary" })],
            "https://www.linkedin.com/in/rahularorayyc/",
            "rahularoradfs@gmail.com"
          )}
          {renderBioBlock(
            "Tingting Yan",
            [Translate("UniversityOf", null, { NAME: "Toronto" })],
            "https://www.linkedin.com/in/tingting-yan/",
            "",
            "https://twitter.com/TingtingYan_"
          )}
        </div>
        <h2 className="team-name-text">{Translate("AboutPage", ["SubHeaders", "ResearchTeam"])}</h2>
        <div className="bio-grid-container">
          {renderBioBlock(
            "Niklas Bobrovitz ",
            [Translate("UniversityOf", null, { NAME: "Oxford" }), Translate("UniversityOf", null, { NAME: "Toronto" })],
            "https://www.linkedin.com/in/nik-bobrovitz-19a117179/",
            "niklas.bobrovitz@mail.utoronto.ca",
            "https://twitter.com/nikbobrovitz"
          )}
          {renderBioBlock(
            "Emily Boucher",
            [Translate("SchoolName", ["Cumming"]), Translate("UniversityOf", null, { NAME: "Calgary" })],
            null,
            "emily.boucher@ucalgary.ca"
          )}
          {renderBioBlock(
            "Hannah Rahim",
            [Translate("UniversityOf", null, { NAME: "Calgary" })],
            "https://www.linkedin.com/in/hannah-rahim/",
            "hannahrahim2@gmail.com",
            "https://twitter.com/Hannah_Rahim1"
          )}
          {renderBioBlock(
            "Christian Cao",
            [Translate("UniversityOf", null, { NAME: "Calgary" })],
            "https://ca.linkedin.com/in/christian-cao-275b78190",
            "ccao.canada@gmail.com"
          )}
          {renderBioBlock(
            "Claire Donnici",
            [Translate("UniversityOf", null, { NAME: "Calgary" })],
            null,
            "claire.donnici@ucalgary.ca",
            "https://twitter.com/ClaireDonnici"
          )}
          {renderBioBlock(
            "Natasha Ilincic",
            [Translate("UniversityOf", null, { NAME: "Toronto" }), Translate("UniversityOf", null, { NAME: "Guelph" })],
            "https://www.linkedin.com/in/natasha-ilincic/",
            "natasha.ilincic@gmail.com"
          )}
          {renderBioBlock(
            "Michael Liu",
            [
              Translate("UniversityOf", null, { NAME: "Oxford" }),
              Translate("BlankUniversity", null, { NAME: "Harvard" }),
            ],
            "https://www.linkedin.com/in/michael-liu-8728249a/",
            "liu.michael222@gmail.com",
            "https://twitter.com/mliu_canada"
          )}
          {renderBioBlock(
            "Mitchell Segal",
            [Translate("UniversityOf", null, { NAME: "Toronto" })],
            null,
            "mitchell.segal@mail.utoronto.ca"
          )}
          {renderBioBlock(
            "Lucas Penny",
            [Translate("UniversityOf", null, { NAME: "Toronto" })],
            "https://www.linkedin.com/in/lucaspenny/",
            "lucas.penny@mail.utoronto.ca",
            "https://twitter.com/lucasjpenny"
          )}
          {renderBioBlock(
            "Mairéad Whelan",
            [Translate("UniversityOf", null, { NAME: "Oxford" }), Translate("UniversityOf", null, { NAME: "Calgary" })],
            "https://www.linkedin.com/in/mairead-whelan",
            "mairead.whelan@ucalgary.ca",
            "https://twitter.com/Mairead_GWhelan"
          )}
          {renderBioBlock(
            "Judy Chen",
            [Translate("BlankUniversity", null, { NAME: "McGill" })],
            null,
            "judy.chen@mail.mcgill.ca"
          )}
          {renderBioBlock(
            "Mercedes Yanes",
            [Translate("BlankUniversity", null, { NAME: "McGill" }), "Universidad Autonoma de San Luis Potosi"],
            "https://www.linkedin.com/in/mercedes-yanes-lane-64b25a19b",
            "mercedes.yaneslane@mcgill.ca",
            null
          )}
          {renderBioBlock(
            "Sara Perlman-Arrow",
            [Translate("BlankUniversity", null, { NAME: "McGill" })],
            "https://www.linkedin.com/in/sara-perlman-arrow-5075421b6/",
            "sara.perlman-arrow@mail.mcgill.ca"
          )}
          {renderBioBlock(
            "Lucia Otera Varela",
            [Translate("UniversityOf", null, { NAME: "Calgary" })],
            "https://www.linkedin.com/in/lucia-ov/",
            "lucia.oterovarela@ucalgary.ca",
            "https://twitter.com/loterovarela"
          )}
          {renderBioBlock(
            "Divine Tanyingoh",
            [Translate("UniversityOf", null, { NAME: "Calgary" })],
            null,
            "dtanyin@ucalgary.ca"
          )}
          {renderBioBlock(
              "Kim Noël",
              [Translate("BlankUniversity", null, { NAME: "McGill" })],
              "https://www.linkedin.com/in/kim-noel-aa27821b8",
              "kim.noel@mail.mcgill.ca"
            )}
          {renderBioBlock(
              "Gabriel Deeaux",
              [Translate("MemorialUniversityOfNewfoundland")],
              "https://www.linkedin.com/in/grdeveaux/",
              "grdeveaux@mun.ca"
          )}
          {renderBioBlock(
              "Caseng Zhang",
              [Translate("BlankUniversity", null, { NAME: "McMaster" })],
              "www.linkedin.com/in/caseng",
              "zhangcaseng@gmail.com"
          )}
          {renderBioBlock(
              "Xiaomeng Ma",
              [Translate("UniversityOf", null, { NAME: "Toronto" })],
              "https://www.linkedin.com/in/xiaomeng-simone-ma-6a8156b9/",
              "xiaomeng.ma@mail.utoronto.ca"
          )}
          {renderBioBlock(
              "Anabel Selemon",
              [Translate("UniversityOf", null, { NAME: "Calgary" })],
              null,
              "anabel.selemon@ucalgary.ca"
          )}
          {renderBioBlock(
              "Dayoung Kim",
              [Translate("UniversityOf", null, { NAME: "Calgary" })],
              "https://www.linkedin.com/in/dayoung-kim-448425198/",
              "dayoung.kim1@ucalgary.ca"
          )}
          {renderBioBlock(
              "Emma Loeschnik",
              [Translate("BlankUniversity", null, {NAME: "Western"}), Translate("BlankUniversity", null, { NAME: "Brock" })],
              "https://www.linkedin.com/in/emma-loeschnik-97bb48220",
              "eloeschn@uwo.ca",
              "https://twitter.com/emma_loeschnik"
          )}
          {renderBioBlock(
              "Zihan Li",
              [Translate("UniversityOf", null, {NAME: "Waterloo"})],
              "https://www.linkedin.com/in/zihanli/",
              "zihan.li@uwaterloo.ca",
              "https://twitter.com/emma_loeschnik"
          )}
        </div>
        <h2 className="team-name-text">{Translate("AboutPage", ["SubHeaders", "WHOUnityTeam"])}</h2>
        <div className="bio-grid-container">
          {renderBioBlock(
              "Harriet Ware",
              [Translate("UniversityOf", null, { NAME: "Toronto" }), Translate("BlankUniversity", null, { NAME: "Queen's"})],
              null,
              "ware.harriet@gmail.com"
          )}
          {renderBioBlock(
              "Mairéad Whelan",
              [Translate("UniversityOf", null, { NAME: "Oxford" }), Translate("UniversityOf", null, { NAME: "Calgary" })],
              "https://www.linkedin.com/in/mairead-whelan",
              "mairead.whelan@ucalgary.ca",
              "https://twitter.com/Mairead_GWhelan"
          )}
        </div>
        <h2 className="team-name-text">{Translate("AboutPage", ["SubHeaders", "DevelopmentTeam"])}</h2>
        <div className="bio-grid-container">
          {renderBioBlock(
            "Austin Atmaja",
            [Translate("UniversityOf", null, { NAME: "Waterloo" })],
            "https://www.linkedin.com/in/austinatmaja",
            "atatmaja@uwaterloo.ca",
            "https://twitter.com/atatmaja_"
          )}
          {renderBioBlock(
            "Abel Joseph ",
            [Translate("UniversityOf", null, { NAME: "Waterloo" })],
            "https://www.linkedin.com/in/abel-joseph/",
            "abel.joseph@uwaterloo.ca"
          )}
          {renderBioBlock(
            "Ewan May",
            [Translate("SchoolName", ["Schulich"]), Translate("UniversityOf", null, { NAME: "Calgary" })],
            "https://www.linkedin.com/in/ewan-may",
            "ewan.may@ucalgary.ca"
          )}
          {renderBioBlock(
            "Brett Dziedzic",
            [Translate("UniversityOf", null, { NAME: "Lethbridge" })],
            "https://www.linkedin.com/in/brett-dziedzic/",
            "brettdziedzic@gmail.com"
          )}
          {renderBioBlock(
            "Simona Rocco",
            [Translate("UniversityOf", null, { NAME: "Waterloo" })],
            "https://www.linkedin.com/in/simona-rocco/",
            "serocco@uwaterloo.ca"
          )}
          {renderBioBlock(
            "Jordan Van Wyk",
            [Translate("UniversityOf", null, { NAME: "Waterloo" })],
            "https://www.linkedin.com/in/jordanvanwyk/",
            "jordanvanwyk@outlook.com",
            "https://twitter.com/jordanvw_"
          )}
          {renderBioBlock(
            "Prannoy Lal",
            [Translate("UniversityOf", null, { NAME: "Waterloo" })],
            "https://www.linkedin.com/in/prannoylal/",
            "p4lal@uwaterloo.ca"
          )}
          {renderBioBlock(
            "Noel Loo",
            [Translate("UniversityOf", null, { NAME: "Cambridge" })],
            null,
            "noel.loo.188@gmail.com"
          )}
          {renderBioBlock(
              "Himanshu Ranka",
              [Translate("BlankUniversity", null, { NAME: "McGill" })],
              "https://www.linkedin.com/in/himanshu-ranka-635a02181/",
              "himanshu.ranka@mail.mcgill.ca"
          )}
          {renderBioBlock(
              "Flora Guo",
              [Translate("UniversityOf", null, { NAME: "Waterloo" })],
              "https://www.linkedin.com/in/floraguolr/",
              "floraguolr@gmail.com"
          )}
        </div>
        <h2 className="team-name-text">{Translate("AboutPage", ["SubHeaders", "PrivateSectorMonitoringTeam"])}</h2>
        <div className="bio-grid-container">
          {renderBioBlock(
            "Nathan Duarte",
            [Translate("BlankUniversity", null, { NAME: "McGill"}), Translate("UniversityOf", null, { NAME: "Waterloo" })],
            "https://www.linkedin.com/in/duartenathan/",
            "nathanduarte1@gmail.com",
            "https://twitter.com/niduarte_canada"
          )}
          {renderBioBlock(
            "Abhinav Pillai	",
            [Translate("UniversityOf", null, { NAME: "Calgary" })],
            null,
            "abhinav.arunpillai@ucalgary.ca"
          )}
          {renderBioBlock("Natalie Duarte", [], null, "natalieaduarte@gmail.com")}
          {renderBioBlock(
            "Sean D'Mello",
            [Translate("UniversityOf", null, { NAME: "Waterloo" })],
            "https://www.linkedin.com/in/dmellosean/",
            "sean.dmello@uwaterloo.ca",
            "https://twitter.com/SeanDMello1"
          )}
        </div>
        <h2 className="team-name-text">{Translate("AboutPage", ["SubHeaders", "ScientificAdvisorsAndCollaborators"])}</h2>
        <div className="bio-grid-container">
          {renderBioBlock("Tim Evans", [
            Translate("Biographies", ["Tim", "PartOne"]),
            Translate("Biographies", ["Tim", "PartTwo"]),
          ])}
          {renderBioBlock("Tyler Williamson", [
            Translate("Biographies", ["Tyler", "PartOne"]),
            Translate("Biographies", ["Tyler", "PartTwo"]),
          ])}
          {renderBioBlock("Matthew Cheng", [
            Translate("Biographies", ["Matthew", "PartOne"]),
            Translate("Biographies", ["Matthew", "PartTwo"]),
          ])}
          {renderBioBlock("David Naylor", [
            Translate("Biographies", ["DavidN", "PartOne"]),
            Translate("Biographies", ["DavidN", "PartTwo"]),
          ])}
          {renderBioBlock("David Buckeridge", [
            Translate("Biographies", ["DavidB", "PartOne"]),
            Translate("Biographies", ["DavidB", "PartTwo"]),
          ])}
          {renderBioBlock("Bruce Mazer", [
            Translate("Biographies", ["BruceM", "PartOne"]),
            Translate("Biographies", ["BruceM", "PartTwo"]),
          ])}
          {renderBioBlock("Jesse Papenburg", [
            Translate("Biographies", ["Jesse", "PartOne"]),
            Translate("Biographies", ["Jesse", "PartTwo"]),
          ])}
          {renderBioBlock("Jonathan Chevrier", [
            Translate("Biographies", ["Jonathan", "PartOne"]),
            Translate("Biographies", ["Jonathan", "PartTwo"]),
          ])}
          {renderBioBlock("Catherine Hankins", [
            Translate("Biographies", ["CatherineH", "PartOne"]),
            Translate("Biographies", ["CatherineH", "PartTwo"]),
          ])}
          {renderBioBlock("Erin O'Connor", [
            Translate("Biographies", ["ErinO", "PartOne"]),
            Translate("Biographies", ["ErinO", "PartTwo"]),
          ])}
          {renderBioBlock("Catherine Eastwood", [
            Translate("Biographies", ["CatherineE", "PartOne"]),
            Translate("Biographies", ["CatherineE", "PartTwo"]),
          ])}
        </div>
      </div>
    </div>
  );
}
