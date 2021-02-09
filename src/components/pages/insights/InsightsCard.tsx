import { faFile } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import Carousel from "react-multi-carousel";
import Translate from "../../../utils/translate/translateService";

import October2020Update from '../../../assets/images/October2020Update.png';
import September2020Update from '../../../assets/images/September2020Update.png'
import MedRxivPub from '../../../assets/images/MedRXIV.jpg'
import July2020Update from '../../../assets/images/IndustryUpdateJuly_2020.png'
import June2020Update from '../../../assets/images/IndustryUpdateJune_2020.png'
import August2020Update from '../../../assets/images/August2020Update.png'
import May2020Update from '../../../assets/images/IndustryUpdateMay_2020.png'
import PreprintUpdate from '../../../assets/images/IndustryUpdatePre_2020.png'
import BloodBank from '../../../assets/images/SeroTrackerBloodBank_July_2020.png'
import MedRxiv from '../../../assets/images/Prepublication.png'
import LancetId from '../../../assets/images/LancetIDArticle.png'

interface InsightsCardProps {
  identifier: string,
  date: string,
  title: string,
  img: string,
  url: string,
  italicize?: string
}

export default function InsightsCard(props: InsightsCardProps) {
  return (
    <div className="flex card column insights-card">
      <div className="flex space-between pb-1">
        <div className="section-title insights-card-identifier">
          {props.identifier.toUpperCase()}
        </div>
        <div className="insights-card-date">
          {props.date}
        </div>
      </div>
      <div className="flex center-item insights-card-image">
        <img src={props.img} alt="" className="fit insights-card-image"></img>
        <a href={props.url}
          target="_blank"
          rel="noopener noreferrer"
          className="overlay flex">
          <div className="insights-card-image-overlay flex fill center-item column">
            <div>{Translate('ViewFile')}</div>
            <div className="flex center-item">
              <FontAwesomeIcon
                icon={faFile}
                className={'icon'}
                color={'white'}
                size={"lg"} />

            </div>
          </div>
        </a>
      </div>
      <div className="fit insights-card-title">
        <a href={props.url} target="_blank" rel="noopener noreferrer" className="">
          {props.italicize ? <i>{props.italicize}&nbsp;</i> : null}{props.title}
        </a>
      </div>
    </div>
  )
}

const listOfReports: InsightsCardProps[] = [
  {         
    identifier: Translate("Report"),
    date: "November 13, 2020",
    img: October2020Update,
    title: Translate('IndustryReportTitles', ['OctoberReport']),
    url: "https://drive.google.com/file/d/1aCgxzxv9J5Zvh4EVyI5REmSVgWLQ_Ip3/view?usp=sharing"
  },
  {           
    identifier: Translate("Report"),
    date: "October 12, 2020",
    img: September2020Update,
    title: Translate('IndustryReportTitles', ['SeptemberReport']),
    url: "https://drive.google.com/file/d/1CjMcs7UZzu4_E_QFJVYZdv0QhyfoNMAe/view?usp=sharing"
  },
  {           
    identifier: Translate("Report"),
    date: "September 9, 2020",
    img: August2020Update,
    title: Translate('IndustryReportTitles', ['AugustReport']),
    url: "https://drive.google.com/file/d/1m7BlfUKCYs32_D1jnFUEQHPr3Qjg5Eyt/view?usp=sharing"
  },
  {           
    identifier: Translate("Report"),
    date: "August 7, 2020",
    img: July2020Update,
    title: Translate('IndustryReportTitles', ['JulyReport']),
    url: "https://drive.google.com/file/d/1Rx3i_Sy01suu-ZZYV7LRpo2KEclbXCNN/view?usp=sharing"
  },
  {           
    identifier: Translate("Report"),
    date: "July 22, 2020",
    img: BloodBank,
    title: Translate('IndustryReportTitles', ['BloodBank']),
    url: "https://drive.google.com/file/d/1It2CzAwEfTcQ1zIC6z2fO7i7XEfmWfom/view?usp=sharing"
  },
  {           
    identifier: Translate("Report"),
    date: "July 12, 2020",
    img: June2020Update,
    title: Translate('IndustryReportTitles', ['JuneReport']),
    url: "https://drive.google.com/file/d/1h8QSrnyA3LfBbwWpqMHNgXsoMyngAw13/vie/"
  },
  {           
    identifier: Translate("Report"),
    date: "June 10, 2020",
    img: May2020Update,
    title: Translate('IndustryReportTitles', ['MayReport']),
    url: "https://drive.google.com/file/d/16pCR-zh1UiWjQFhTDxW_2adSGuq0pCgz/view?usp=sharing"
  },
  {           
    identifier: Translate("Report"),
    date: "May 19, 2020",
    img: PreprintUpdate,
    title: Translate('IndustryReportTitles', ['PreliminaryReport']),
    url: "https://drive.google.com/file/d/1I1gY1lZndwp4_eUqoZviU8L2_izmkmQP/view?usp=sharing"
  },
]

const listOfResearchArticles: InsightsCardProps[] = [
  {
    identifier: Translate("ResearchArticle"),
    date: "November 18, 2020",
    img: MedRxivPub,
    title: Translate('IndustryReportTitles', ['MedRxivPub']),
    url: "https://www.medrxiv.org/content/10.1101/2020.11.17.20233460v2.ful"
  },
  {           
    identifier: Translate("ResearchArticle"),
    date: "August 4, 2020",
    img: LancetId,
    italicize: "Lancet ID",
    title: Translate('IndustryReportTitles', ['LancetID']),
    url: "https://www.thelancet.com/journals/laninf/article/PIIS1473-3099(20)30631-9/fulltext#%20"
  },
  {           
    identifier: Translate("ResearchArticle"),
    date: "May 14, 2020",
    img: MedRxiv,
    title: Translate('IndustryReportTitles', ['PrePrint']),
    url: "https://www.medrxiv.org/content/10.1101/2020.05.10.20097451v1"
  },
]

const listOfMediaInsightProps: InsightsCardProps[] = [
  {
    identifier: Translate("Media"),
    date: "May 23, 2020",
    title: Translate('IndustryMediaTitles', ['UnderstandingVirus']),
    img: "",
    url: "https://www.bloomberg.com/news/articles/2020-05-06/understanding-the-virus-and-its-unanswered-questions-quicktake",
  },
  {
    identifier: Translate("Media"),
    date: "May 24, 2020",
    title: Translate('IndustryMediaTitles', ['KnowledgeHub']),
    img: "",
    url: "https://www.research.ox.ac.uk/Article/2020-05-28-knowledge-hub-developed-to-track-sars-cov-antibody-studies",
  },
  {
    identifier: Translate("Media"),
    date: "May 28, 2020",
    title: Translate('IndustryMediaTitles', ['GlobalLaunch']),
    img: "",
    url: "https://www.covid19immunitytaskforce.ca/global-launch-of-serotracker-a-covid-19-antibody-testing-hub-in-partnership-with-canadas-covid-19-immunity-task-force/",
  },
  {
    identifier: Translate("Media"),
    date: "June 2, 2020",
    title: Translate('IndustryMediaTitles', ['StudentsBuild']),
    img: "",
    url: "https://uwaterloo.ca/stories/engineering-students/students-build-online-dashboard-track-covid-19-antibody",
  },
  {
    identifier: Translate("Media"),
    date: "June 2, 2020",
    title: Translate('IndustryMediaTitles', ['NewlyLaunched']),
    img: "",
    url: "https://publications.mcgill.ca/medenews/2020/06/16/newly-launched-serotracker-will-monitor-global-antibody-testing-efforts/",
  },
  {
    identifier: Translate("Media"),
    date: "June 11, 2020",
    title: Translate('IndustryMediaTitles', ['VeteranDoctor']),
    img: "",
    url: "https://www.marsdd.com/magazine/what-if-there-is-no-covid-19-vaccine/",
  },
  {
    identifier: Translate("Media"),
    date: "July 7, 2020",
    title: Translate('IndustryMediaTitles', ['CovidRadar']),
    img: "",
    url: "https://m1newstv.com/subnotificacao-no-brasil-e-na-rocinha-e-a-media-mundial/",
  },
  {
    identifier: Translate("Media"),
    date: "July 22, 2020",
    title: Translate('IndustryMediaTitles', ['HowMany']),
    img: "",
    url: "https://www.newscientist.com/article/mg24632873-000-how-many-of-us-are-likely-to-have-caught-the-coronavirus-so-far/",
  },
  {
    identifier: Translate("Media"),
    date: "August 3, 2020",
    title: Translate('IndustryMediaTitles', ['Lecturership']),
    img: "",
    url: "https://eng.ox.ac.uk/chi/news/adjunct-lecturership-for-rahul/",
  },
  {
    identifier: Translate("Media"),
    date: "August 17, 2020",
    title: Translate('IndustryMediaTitles', ['HomeTests']),
    img: "",
    url: "https://www.forbes.com/sites/williamhaseltine/2020/08/17/cheap-daily-home-tests-are-the-first-step-to-containing-the-pandemic/?sh=677d47d14ad4",
  },
  {
    identifier: Translate("Media"),
    date: "November 10, 2020",
    title: Translate('IndustryMediaTitles', ['Webinar']),
    img: "",
    url: "http://www.himsschapter.org/event/serotracker-covid-19-journey-himss-canadian-prairies-chapter-webinar",
  },
  {
    identifier: Translate("Media"),
    date: "November 23, 2020",
    title: Translate('IndustryMediaTitles', ['AlumniAndStudents']),
    img: "",
    url: "https://cumming.ucalgary.ca/news/serotracker",
  },
  {
    identifier: Translate("Media"),
    date: "November 24, 2020",
    title: Translate('IndustryMediaTitles', ['InfectionRate']),
    img: "",
    url: "https://taz.de/Studie-zu-globaler-Corona-Infektionsrate/!5730030/",
  },
  {
    identifier: Translate("Media"),
    date: "January 2021",
    title: Translate('IndustryMediaTitles', ['McKinseyHealthcare']),
    img: "",
    url: "https://www.mckinsey.com/~/media/McKinsey/Industries/Healthcare%20Systems%20and%20Services/Our%20Insights/McKinsey%20on%20Healthcare%202020%20Year%20in%20Review/McKinsey-on-Healthcare-2020-Year-in-Review.pdf",
  },
  {
    identifier: Translate("Media"),
    date: "January 14, 2021",
    title: Translate('IndustryMediaTitles', ['JouleRecipients']),
    img: "",
    url: "https://markets.businessinsider.com/amp/news/joule-announces-2020-innovation-grant-recipients-1029968953",
  },
  {
    identifier: Translate("Media"),
    date: "January 15, 2021",
    title: Translate('IndustryMediaTitles', ['JouleInnovation']),
    img: "",
    url: "https://joulecma.ca/innovate/grants/serotracker ",
  },
  {
    identifier: Translate("Media"),
    date: "January 20, 2021",
    title: Translate('IndustryMediaTitles', ['WhenEnd']),
    img: "",
    url: "https://www.mckinsey.com/industries/healthcare-systems-and-services/our-insights/when-will-the-covid-19-pandemic-end",
  },
  {
    identifier: Translate("Media"),
    date: "January 23, 2021",
    title: Translate('IndustryMediaTitles', ['JouleAnnounce']),
    img: "",
    url: "https://www.newswire.ca/news-releases/joule-announces-2020-innovation-grant-recipients-867798355.html",
  },
]

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    slidesToSlide: 3 // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    slidesToSlide: 2 // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1 // optional, default to 1.
  }
};

const getCarouselOfInsightCards = (listOfInsightCardProps: InsightsCardProps[]) => {
  return (
    <Carousel 
      swipeable={false}
      draggable={false}
      showDots={true}
      responsive={responsive}
      ssr={true} // means to render carousel on server-side.
      infinite={true}
      keyBoardControl={true}
      customTransition="all .5"
      transitionDuration={500}
      containerClass="carousel-container"
      removeArrowOnDeviceType={["tablet", "mobile"]}
      dotListClass="custom-dot-list-style"
      itemClass="carousel-item-padding-40-px"
    >
    {
      listOfInsightCardProps.map((insightProps, idx) => {
      return <InsightsCard
        identifier={insightProps.identifier}
        date={insightProps.date}
        img={insightProps.img}
        title={insightProps.title}
        url={insightProps.url} />
      })
    }
    </Carousel>
  )
}

export const getCarouselOfMedia = () => { 
  return getCarouselOfInsightCards(listOfMediaInsightProps);
}

export const getCarouselOfResearchArticles = () => { 
  return getCarouselOfInsightCards(listOfResearchArticles);
}

export const getCarouselOfReports = () => { 
  return getCarouselOfInsightCards(listOfReports);
}
