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

import { InsightsCardProps } from "./InsightsCard";

const listOfReports: InsightsCardProps[] = [
    {
        date: "January 15, 2021",
        img: YearInReview2020,
        titleKey1: 'IndustryReportTitles',
        titleKey2: ['YearInReview2020'],
        url: "https://drive.google.com/file/d/14u0GroEadFQ__Gdvoe104HI-y0LWDwSu/view?usp=sharing",
    },
    {         
        date: "November 13, 2020",
        img: October2020Update,
        titleKey1: 'IndustryReportTitles',
        titleKey2: ['OctoberReport'],
        url: "https://drive.google.com/file/d/1aCgxzxv9J5Zvh4EVyI5REmSVgWLQ_Ip3/view?usp=sharing"
    },
    {           
        date: "October 12, 2020",
        img: September2020Update,
        titleKey1: 'IndustryReportTitles',
        titleKey2: ['SeptemberReport'],
        url: "https://drive.google.com/file/d/1CjMcs7UZzu4_E_QFJVYZdv0QhyfoNMAe/view?usp=sharing"
    },
    {           
        date: "September 9, 2020",
        img: August2020Update,
        titleKey1: 'IndustryReportTitles',
        titleKey2: ['AugustReport'],
        url: "https://drive.google.com/file/d/1m7BlfUKCYs32_D1jnFUEQHPr3Qjg5Eyt/view?usp=sharing"
    },
    {           
        date: "August 7, 2020",
        img: July2020Update,
        titleKey1: 'IndustryReportTitles',
        titleKey2: ['JulyReport'],
        url: "https://drive.google.com/file/d/1Rx3i_Sy01suu-ZZYV7LRpo2KEclbXCNN/view?usp=sharing"
    },
    {           
        date: "July 22, 2020",
        img: BloodBank,
        titleKey1: 'IndustryReportTitles',
        titleKey2: ['BloodBank'],
        url: "https://drive.google.com/file/d/1It2CzAwEfTcQ1zIC6z2fO7i7XEfmWfom/view?usp=sharing"
    },
    {           
        date: "July 12, 2020",
        img: June2020Update,
        titleKey1: 'IndustryReportTitles',
        titleKey2: ['JuneReport'],
        url: "https://drive.google.com/file/d/1HO--VWYdyEqd5Dc3xcZBwERXWDBjCfxN/view"
    },
    {           
        date: "June 10, 2020",
        img: May2020Update,
        titleKey1: 'IndustryReportTitles',
        titleKey2: ['MayReport'],
        url: "https://drive.google.com/file/d/16pCR-zh1UiWjQFhTDxW_2adSGuq0pCgz/view?usp=sharing"
    },
    {           
        date: "May 19, 2020",
        img: PreprintUpdate,
        titleKey1: 'IndustryReportTitles',
        titleKey2: ['PreliminaryReport'],
        url: "https://drive.google.com/file/d/1I1gY1lZndwp4_eUqoZviU8L2_izmkmQP/view?usp=sharing"
    },
]

const listOfResearchArticles: InsightsCardProps[] = [
    {
        date: "November 18, 2020",
        img: MedRxivPub,
        titleKey1: 'ResearchArticleTitles',
        titleKey2: ['MedRxivPub'],
        url: "https://www.medrxiv.org/content/10.1101/2020.11.17.20233460v2"
    },
    {           
        date: "August 4, 2020",
        img: LancetId,
        titleKey1: "ResearchArticleTitles",
        titleKey2: ['LancetID'],
        url: "https://www.thelancet.com/journals/laninf/article/PIIS1473-3099(20)30631-9/fulltext#%20"
    },
    {           
        date: "May 14, 2020",
        img: MedRxiv,
        titleKey1: "ResearchArticleTitles",
        titleKey2: ['PrePrint'],
        url: "https://www.medrxiv.org/content/10.1101/2020.05.10.20097451v1"
    },
]

const listOfMediaInsightProps: InsightsCardProps[] = [
    {
        date: "January 23, 2021",
        titleKey1: 'IndustryMediaTitles',
        titleKey2: ['JouleAnnounce'],
        url: "https://www.newswire.ca/news-releases/joule-announces-2020-innovation-grant-recipients-867798355.html",
    },
    {
        date: "January 20, 2021",
        titleKey1: 'IndustryMediaTitles',
        titleKey2: ['WhenEnd'],
        url: "https://www.mckinsey.com/industries/healthcare-systems-and-services/our-insights/when-will-the-covid-19-pandemic-end",
    },
    {
        date: "January 15, 2021",
        titleKey1: 'IndustryMediaTitles',
        titleKey2: ['JouleInnovation'],
        url: "https://joulecma.ca/innovate/grants/serotracker ",
    },
    {
        date: "January 14, 2021",
        titleKey1: 'IndustryMediaTitles',
        titleKey2: ['JouleRecipients'],
        url: "https://markets.businessinsider.com/amp/news/joule-announces-2020-innovation-grant-recipients-1029968953",
    },
    {
        date: "January 2021",
        titleKey1: 'IndustryMediaTitles',
        titleKey2: ['McKinseyHealthcare'],
        url: "https://www.mckinsey.com/~/media/McKinsey/Industries/Healthcare%20Systems%20and%20Services/Our%20Insights/McKinsey%20on%20Healthcare%202020%20Year%20in%20Review/McKinsey-on-Healthcare-2020-Year-in-Review.pdf",
    },
    {
        date: "November 24, 2020",
        titleKey1: 'IndustryMediaTitles',
        titleKey2: ['InfectionRate'],
        url: "https://taz.de/Studie-zu-globaler-Corona-Infektionsrate/!5730030/",
    },
    {
        date: "November 23, 2020",
        titleKey1: 'IndustryMediaTitles',
        titleKey2: ['AlumniAndStudents'],
        url: "https://cumming.ucalgary.ca/news/serotracker",
    },
    {
        date: "November 10, 2020",
        titleKey1: 'IndustryMediaTitles',
        titleKey2: ['Webinar'],
        url: "http://www.himsschapter.org/event/serotracker-covid-19-journey-himss-canadian-prairies-chapter-webinar",
    },
    {
        date: "August 17, 2020",
        titleKey1: 'IndustryMediaTitles',
        titleKey2: ['HomeTests'],
        url: "https://www.forbes.com/sites/williamhaseltine/2020/08/17/cheap-daily-home-tests-are-the-first-step-to-containing-the-pandemic/?sh=677d47d14ad4",
    },
    {
        date: "August 3, 2020",
        titleKey1: 'IndustryMediaTitles',
        titleKey2: ['Lecturership'],
        url: "https://eng.ox.ac.uk/chi/news/adjunct-lecturership-for-rahul/",
    },
    {
        date: "July 22, 2020",
        titleKey1: 'IndustryMediaTitles',
        titleKey2: ['HowMany'],
        url: "https://www.newscientist.com/article/mg24632873-000-how-many-of-us-are-likely-to-have-caught-the-coronavirus-so-far/",
    },
    {
        date: "July 7, 2020",
        titleKey1: 'IndustryMediaTitles',
        titleKey2: ['CovidRadar'],
        url: "https://m1newstv.com/subnotificacao-no-brasil-e-na-rocinha-e-a-media-mundial/",
    },
    {
        date: "June 11, 2020",
        titleKey1: 'IndustryMediaTitles',
        titleKey2: ['VeteranDoctor'],
        url: "https://www.marsdd.com/magazine/what-if-there-is-no-covid-19-vaccine/",
    },
    {
        date: "June 2, 2020",
        titleKey1: 'IndustryMediaTitles',
        titleKey2: ['NewlyLaunched'],
        url: "https://publications.mcgill.ca/medenews/2020/06/16/newly-launched-serotracker-will-monitor-global-antibody-testing-efforts/",
    },
    {
        date: "June 2, 2020",
        titleKey1: 'IndustryMediaTitles',
        titleKey2: ['StudentsBuild'],
        url: "https://uwaterloo.ca/stories/engineering-students/students-build-online-dashboard-track-covid-19-antibody",
    },
    {
        date: "May 28, 2020",
        titleKey1: 'IndustryMediaTitles',
        titleKey2: ['GlobalLaunch'],
        url: "https://www.covid19immunitytaskforce.ca/global-launch-of-serotracker-a-covid-19-antibody-testing-hub-in-partnership-with-canadas-covid-19-immunity-task-force/",
    },
    {
        date: "May 24, 2020",
        titleKey1: 'IndustryMediaTitles',
        titleKey2: ['KnowledgeHub'],
        url: "https://www.research.ox.ac.uk/Article/2020-05-28-knowledge-hub-developed-to-track-sars-cov-antibody-studies",
    },
    {
        date: "May 23, 2020",
        titleKey1: 'IndustryMediaTitles',
        titleKey2: ['UnderstandingVirus'],
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