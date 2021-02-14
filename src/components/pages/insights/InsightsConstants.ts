import YearInReview2020 from '../../../assets/images/YearInReview2020.png'
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
import Translate from "../../../utils/translate/translateService";

import { InsightsCardProps } from "./InsightsCard";

const listOfReports: InsightsCardProps[] = [
    {
        date: "January 15, 2021",
        img: YearInReview2020,
        title: Translate('IndustryReportTitles', ['YearInReview2020']),
        url: "https://drive.google.com/file/d/14u0GroEadFQ__Gdvoe104HI-y0LWDwSu/view?usp=sharing",
    },
    {         
        date: "November 13, 2020",
        img: October2020Update,
        title: Translate('IndustryReportTitles', ['OctoberReport']),
        url: "https://drive.google.com/file/d/1aCgxzxv9J5Zvh4EVyI5REmSVgWLQ_Ip3/view?usp=sharing"
    },
    {           
        date: "October 12, 2020",
        img: September2020Update,
        title: Translate('IndustryReportTitles', ['SeptemberReport']),
        url: "https://drive.google.com/file/d/1CjMcs7UZzu4_E_QFJVYZdv0QhyfoNMAe/view?usp=sharing"
    },
    {           
        date: "September 9, 2020",
        img: August2020Update,
        title: Translate('IndustryReportTitles', ['AugustReport']),
        url: "https://drive.google.com/file/d/1m7BlfUKCYs32_D1jnFUEQHPr3Qjg5Eyt/view?usp=sharing"
    },
    {           
        date: "August 7, 2020",
        img: July2020Update,
        title: Translate('IndustryReportTitles', ['JulyReport']),
        url: "https://drive.google.com/file/d/1Rx3i_Sy01suu-ZZYV7LRpo2KEclbXCNN/view?usp=sharing"
    },
    {           
        date: "July 22, 2020",
        img: BloodBank,
        title: Translate('IndustryReportTitles', ['BloodBank']),
        url: "https://drive.google.com/file/d/1It2CzAwEfTcQ1zIC6z2fO7i7XEfmWfom/view?usp=sharing"
    },
    {           
        date: "July 12, 2020",
        img: June2020Update,
        title: Translate('IndustryReportTitles', ['JuneReport']),
        url: "https://drive.google.com/file/d/1h8QSrnyA3LfBbwWpqMHNgXsoMyngAw13/vie/"
    },
    {           
        date: "June 10, 2020",
        img: May2020Update,
        title: Translate('IndustryReportTitles', ['MayReport']),
        url: "https://drive.google.com/file/d/16pCR-zh1UiWjQFhTDxW_2adSGuq0pCgz/view?usp=sharing"
    },
    {           
        date: "May 19, 2020",
        img: PreprintUpdate,
        title: Translate('IndustryReportTitles', ['PreliminaryReport']),
        url: "https://drive.google.com/file/d/1I1gY1lZndwp4_eUqoZviU8L2_izmkmQP/view?usp=sharing"
    },
]

const listOfResearchArticles: InsightsCardProps[] = [
    {
        date: "November 18, 2020",
        img: MedRxivPub,
        title: Translate('IndustryReportTitles', ['MedRxivPub']),
        url: "https://www.medrxiv.org/content/10.1101/2020.11.17.20233460v2.ful"
    },
    {           
        date: "August 4, 2020",
        img: LancetId,
        italicize: "Lancet ID",
        title: Translate('IndustryReportTitles', ['LancetID']),
        url: "https://www.thelancet.com/journals/laninf/article/PIIS1473-3099(20)30631-9/fulltext#%20"
    },
    {           
        date: "May 14, 2020",
        img: MedRxiv,
        title: Translate('IndustryReportTitles', ['PrePrint']),
        url: "https://www.medrxiv.org/content/10.1101/2020.05.10.20097451v1"
    },
]

const listOfMediaInsightProps: InsightsCardProps[] = [
    {
        date: "January 23, 2021",
        title: Translate('IndustryMediaTitles', ['JouleAnnounce']),
        url: "https://www.newswire.ca/news-releases/joule-announces-2020-innovation-grant-recipients-867798355.html",
    },
    {
        date: "January 20, 2021",
        title: Translate('IndustryMediaTitles', ['WhenEnd']),
        url: "https://www.mckinsey.com/industries/healthcare-systems-and-services/our-insights/when-will-the-covid-19-pandemic-end",
    },
    {
        date: "January 15, 2021",
        title: Translate('IndustryMediaTitles', ['JouleInnovation']),
        url: "https://joulecma.ca/innovate/grants/serotracker ",
    },
    {
        date: "January 14, 2021",
        title: Translate('IndustryMediaTitles', ['JouleRecipients']),
        url: "https://markets.businessinsider.com/amp/news/joule-announces-2020-innovation-grant-recipients-1029968953",
    },
    {
        date: "January 2021",
        title: Translate('IndustryMediaTitles', ['McKinseyHealthcare']),
        url: "https://www.mckinsey.com/~/media/McKinsey/Industries/Healthcare%20Systems%20and%20Services/Our%20Insights/McKinsey%20on%20Healthcare%202020%20Year%20in%20Review/McKinsey-on-Healthcare-2020-Year-in-Review.pdf",
    },
    {
        date: "November 24, 2020",
        title: Translate('IndustryMediaTitles', ['InfectionRate']),
        url: "https://taz.de/Studie-zu-globaler-Corona-Infektionsrate/!5730030/",
    },
    {
        date: "November 23, 2020",
        title: Translate('IndustryMediaTitles', ['AlumniAndStudents']),
        url: "https://cumming.ucalgary.ca/news/serotracker",
    },
    {
        date: "November 10, 2020",
        title: Translate('IndustryMediaTitles', ['Webinar']),
        url: "http://www.himsschapter.org/event/serotracker-covid-19-journey-himss-canadian-prairies-chapter-webinar",
    },
    {
        date: "August 17, 2020",
        title: Translate('IndustryMediaTitles', ['HomeTests']),
        url: "https://www.forbes.com/sites/williamhaseltine/2020/08/17/cheap-daily-home-tests-are-the-first-step-to-containing-the-pandemic/?sh=677d47d14ad4",
    },
    {
        date: "August 3, 2020",
        title: Translate('IndustryMediaTitles', ['Lecturership']),
        url: "https://eng.ox.ac.uk/chi/news/adjunct-lecturership-for-rahul/",
    },
    {
        date: "July 22, 2020",
        title: Translate('IndustryMediaTitles', ['HowMany']),
        url: "https://www.newscientist.com/article/mg24632873-000-how-many-of-us-are-likely-to-have-caught-the-coronavirus-so-far/",
    },
    {
        date: "July 7, 2020",
        title: Translate('IndustryMediaTitles', ['CovidRadar']),
        url: "https://m1newstv.com/subnotificacao-no-brasil-e-na-rocinha-e-a-media-mundial/",
    },
    {
        date: "June 11, 2020",
        title: Translate('IndustryMediaTitles', ['VeteranDoctor']),
        url: "https://www.marsdd.com/magazine/what-if-there-is-no-covid-19-vaccine/",
    },
    {
        date: "June 2, 2020",
        title: Translate('IndustryMediaTitles', ['NewlyLaunched']),
        url: "https://publications.mcgill.ca/medenews/2020/06/16/newly-launched-serotracker-will-monitor-global-antibody-testing-efforts/",
    },
    {
        date: "June 2, 2020",
        title: Translate('IndustryMediaTitles', ['StudentsBuild']),
        url: "https://uwaterloo.ca/stories/engineering-students/students-build-online-dashboard-track-covid-19-antibody",
    },
    {
        date: "May 28, 2020",
        title: Translate('IndustryMediaTitles', ['GlobalLaunch']),
        url: "https://www.covid19immunitytaskforce.ca/global-launch-of-serotracker-a-covid-19-antibody-testing-hub-in-partnership-with-canadas-covid-19-immunity-task-force/",
    },
    {
        date: "May 24, 2020",
        title: Translate('IndustryMediaTitles', ['KnowledgeHub']),
        url: "https://www.research.ox.ac.uk/Article/2020-05-28-knowledge-hub-developed-to-track-sars-cov-antibody-studies",
    },
    {
        date: "May 23, 2020",
        title: Translate('IndustryMediaTitles', ['UnderstandingVirus']),
        url: "https://www.bloomberg.com/news/articles/2020-05-06/understanding-the-virus-and-its-unanswered-questions-quicktake",
    }
]

interface insightsInfoInterface {
    media: InsightsCardProps[],
    articles: InsightsCardProps[],
    reports: InsightsCardProps[],
}

export const insightsInfo: insightsInfoInterface = {
    media: listOfMediaInsightProps,
    articles: listOfResearchArticles,
    reports: listOfReports
}