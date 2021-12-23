import YearInReview2020 from '../../../assets/images/YearInReview2020.png'
import PreprintUpdate from '../../../assets/images/IndustryUpdatePre_2020.png'
import BloodBank from '../../../assets/images/SeroTrackerBloodBank_July_2020.png'
import MedRxiv from '../../../assets/images/Prepublication.png'
import LancetId from '../../../assets/images/LancetIDArticle.png'
import InsuringTheEconomy from '../../../assets/images/InsuringTheEconomy.png'
import PlosOnePub from '../../../assets/images/PlosOnePub.png'
import InventoryEvidenceSynthesis from '../../../assets/images/InventoryEvidenceSynthesis.png'
import theEconomist from '../../../assets/images/PubMedia/1200px-The_Economist_Logo.svg.png'
import newScientist from '../../../assets/images/PubMedia/3622.1582633003.png'
import bloomberg from '../../../assets/images/PubMedia/Bloomberg_Logo.jpg'
import chi from '../../../assets/images/PubMedia/chi_logo_89px.png'
import cision from '../../../assets/images/PubMedia/cision_logo.svg'
import CITF from '../../../assets/images/PubMedia/CITF-logo-BIL-700.png'
import taz from '../../../assets/images/PubMedia/download.png'
import forbes from '../../../assets/images/PubMedia/Forbes-logo.png'
import HIMSS from '../../../assets/images/PubMedia/HIMSSlogo_Hfullcolor_RGB.png'
import joule from '../../../assets/images/PubMedia/joule.png'
import journalQuebec from '../../../assets/images/PubMedia/JournalQuebec_Logo2013-.png'
import marcia from '../../../assets/images/PubMedia/marcia news.png'
import mars from '../../../assets/images/PubMedia/mars.jpg'
import mcgill from '../../../assets/images/PubMedia/mcgill-university-logo-png-transparent-cropped.png'
import mckinsey from '../../../assets/images/PubMedia/mckinsey_logo.png'
import NYT from '../../../assets/images/PubMedia/New-York-Times-Logo8x6_0.png'
import oxford from '../../../assets/images/PubMedia/oxford.jpg'
import UCalgary from '../../../assets/images/PubMedia/UCalgary.svg'
import waterloo from '../../../assets/images/PubMedia/waterloo.png'

export interface PublicationProps {
    day?: string,
    month?: string,
    year?: string,
    titleKey1: string,
    titleKey2: string[],
    publicationName?: string,
    img?: string,
    url: string,
    authors?: string,
    italicize?: string
  }

const listOfReports: PublicationProps[] = [
    {
        day: "29",
        month: "June",
        year: "2021",
        img: InventoryEvidenceSynthesis,
        titleKey1: 'IndustryReportTitles',
        titleKey2: ['InventoryEvidenceSynthesis'],
        url: "https://www.mcmasterforum.org/networks/covid-end/resources-to-support-decision-makers/Inventory-of-best-evidence-syntheses/public-health-measures",
    },
    {
        day: "15",
        month: "January",
        year: "2021",
        img: YearInReview2020,
        titleKey1: 'IndustryReportTitles',
        titleKey2: ['YearInReview2020'],
        url: "https://drive.google.com/file/d/14u0GroEadFQ__Gdvoe104HI-y0LWDwSu/view?usp=sharing",
    },
    {           
        day: "20",
        month: "August",
        year: "2020",
        img: InsuringTheEconomy,
        titleKey1: 'IndustryReportTitles',
        titleKey2: ['InsuringTheEconomy'],
        url: "https://drive.google.com/file/d/1kEl6xv54yPGoDXZoPq9h2q4SqYnL2OU-/view?usp=sharing"
    },
    {           
        day: "22",
        month: "July",
        year: "2020",
        img: BloodBank,
        titleKey1: 'IndustryReportTitles',
        titleKey2: ['BloodBank'],
        url: "https://drive.google.com/file/d/1It2CzAwEfTcQ1zIC6z2fO7i7XEfmWfom/view?usp=sharing"
    },
    {           
        day: "19",
        month: "May",
        year: "2020",
        img: PreprintUpdate,
        titleKey1: 'IndustryReportTitles',
        titleKey2: ['PreliminaryReport'],
        url: "https://drive.google.com/file/d/1I1gY1lZndwp4_eUqoZviU8L2_izmkmQP/view?usp=sharing"
    },
]

const listOfResearchArticles: PublicationProps[] = [
    {
        day: "23",
        month: "June",
        year: "2021",
        img: PlosOnePub,
        titleKey1: 'ResearchArticleTitles',
        titleKey2: ['PlosOnePub'],
        publicationName: "Plos One",
        authors: "Niklas Bobrovitz, Rahul Krishan Arora, Christian Cao et al.",
        url: "https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0252617"
    },
    {           
        day: "14",
        month: "August",
        year: "2020",
        img: LancetId,
        titleKey1: "ResearchArticleTitles",
        titleKey2: ['LancetID'],
        publicationName: "The Lancet: Infectious Diseases",
        authors: "Rahul K Arora, Abel Joseph, Jordan Van Wyk et al.",
        url: "https://www.thelancet.com/journals/laninf/article/PIIS1473-3099(20)30631-9/fulltext#%20"
    },
    {           
        day: "14",
        month: "May",
        year: "2020",
        img: MedRxiv,
        titleKey1: "ResearchArticleTitles",
        titleKey2: ['PrePrint'],
        publicationName: "medRxiv",
        authors: "Niklas Bobrovitz, Rahul Krishan Arora, Tingting Yan et al.",
        url: "https://www.medrxiv.org/content/10.1101/2020.05.10.20097451v1"
    },
]

const listOfMediaPublicationsProps: PublicationProps[] = [
    {
        day: "25",
        month: "June",
        year: "2021",
        titleKey1: 'IndustryMediaTitles',
        titleKey2: ['StillVulnerable'],
        publicationName: "Le Journal de Quebec",
        img: journalQuebec,
        authors: "",
        url: "https://www.journaldequebec.com/2021/06/25/la-population-mondiale-toujours-vulnerable-a-la-covid-19",
    },
    {
        day: "25",
        month: "May",
        year: "2021",
        titleKey1: 'IndustryMediaTitles',
        titleKey2: ['NYTIndia'],
        publicationName: "The New York Times",
        authors: "",
        url: "https://www.nytimes.com/interactive/2021/05/25/world/asia/india-covid-death-estimates.html",
        img: NYT
    },
    {
        day: "13",
        month: "May",
        year: "2021",
        titleKey1: 'IndustryMediaTitles',
        titleKey2: ['EconomistDeathToll'],
        publicationName: "The Economist",
        authors: "",
        url: "https://www.economist.com/graphic-detail/2021/05/13/how-we-estimated-the-true-death-toll-of-the-pandemic",
        img: theEconomist
    },
    {
        day: "23",
        month: "January",
        year: "2021",
        titleKey1: 'IndustryMediaTitles',
        titleKey2: ['JouleAnnounce'],
        publicationName: "Cision",
        authors: "",
        url: "https://www.newswire.ca/news-releases/joule-announces-2020-innovation-grant-recipients-867798355.html",
        img: cision
    },
    {
        day: "20",
        month: "January",
        year: "2021",
        titleKey1: 'IndustryMediaTitles',
        titleKey2: ['WhenEnd'],
        publicationName: "McKinsey & Company",
        authors: "",
        url: "https://www.mckinsey.com/industries/healthcare-systems-and-services/our-insights/when-will-the-covid-19-pandemic-end",
        img: mckinsey
    },
    {
        day: "15",
        month: "January",
        year: "2021",
        titleKey1: 'IndustryMediaTitles',
        titleKey2: ['JouleInnovation'],
        publicationName: "AMC Joule",
        authors: "",
        url: "https://joulecma.ca/innovate/grants/serotracker ",
        img: joule
    },
    {
        day: "14",
        month: "January",
        year: "2021",
        titleKey1: 'IndustryMediaTitles',
        titleKey2: ['JouleRecipients'],
        publicationName: "Markets Insider",
        authors: "",
        url: "https://markets.businessinsider.com/amp/news/joule-announces-2020-innovation-grant-recipients-1029968953",
        img: joule
    },
    {
        month: "January",
        year: "2021",
        titleKey1: 'IndustryMediaTitles',
        titleKey2: ['McKinseyHealthcare'],
        publicationName: "McKinsey & Company",
        authors: "",
        url: "https://www.mckinsey.com/~/media/McKinsey/Industries/Healthcare%20Systems%20and%20Services/Our%20Insights/McKinsey%20on%20Healthcare%202020%20Year%20in%20Review/McKinsey-on-Healthcare-2020-Year-in-Review.pdf",
        img: mckinsey
    },
    {
        day: "24",
        month: "November",
        year: "2020",
        titleKey1: 'IndustryMediaTitles',
        titleKey2: ['InfectionRate'],
        publicationName: "taz",
        authors: "",
        url: "https://taz.de/Studie-zu-globaler-Corona-Infektionsrate/!5730030/",
        img: taz
    },
    {
        day: "23",
        month: "November",
        year: "2020",
        titleKey1: 'IndustryMediaTitles',
        titleKey2: ['AlumniAndStudents'],
        publicationName: "University of Calgary",
        authors: "",
        url: "https://cumming.ucalgary.ca/news/serotracker",
        img: UCalgary
    },
    {
        day: "10",
        month: "November",
        year: "2020",
        titleKey1: 'IndustryMediaTitles',
        titleKey2: ['Webinar'],
        publicationName: "HIMSS",
        authors: "",
        url: "http://www.himsschapter.org/event/serotracker-covid-19-journey-himss-canadian-prairies-chapter-webinar",
        img: HIMSS
    },
    {
        day: "17",
        month: "August",
        year: "2020",
        titleKey1: 'IndustryMediaTitles',
        titleKey2: ['HomeTests'],
        publicationName: "Forbes",
        authors: "",
        url: "https://www.forbes.com/sites/williamhaseltine/2020/08/17/cheap-daily-home-tests-are-the-first-step-to-containing-the-pandemic/?sh=677d47d14ad4",
        img: forbes
    },
    {
        day: "3",
        month: "August",
        year: "2020",
        titleKey1: 'IndustryMediaTitles',
        titleKey2: ['Lecturership'],
        publicationName: "Computational Health Informatics",
        authors: "",
        url: "https://eng.ox.ac.uk/chi/news/adjunct-lecturership-for-rahul/",
        img: chi
    },
    {
        day: "22",
        month: "July",
        year: "2020",
        titleKey1: 'IndustryMediaTitles',
        titleKey2: ['HowMany'],
        publicationName: "NewScientist",
        authors: "",
        url: "https://www.newscientist.com/article/mg24632873-000-how-many-of-us-are-likely-to-have-caught-the-coronavirus-so-far/",
        img: newScientist
    },
    {
        day: "7",
        month: "July",
        year: "2020",
        titleKey1: 'IndustryMediaTitles',
        titleKey2: ['CovidRadar'],
        publicationName: "M1 Marica News",
        authors: "",
        url: "https://m1newstv.com/subnotificacao-no-brasil-e-na-rocinha-e-a-media-mundial/",
        img: marcia
    },
    {
        day: "11",
        month: "June",
        year: "2020",
        titleKey1: 'IndustryMediaTitles',
        titleKey2: ['VeteranDoctor'],
        publicationName: "MaRS",
        authors: "",
        url: "https://www.marsdd.com/magazine/what-if-there-is-no-covid-19-vaccine/",
        img: mars
    },
    {
        day: "2",
        month: "June",
        year: "2020",
        titleKey1: 'IndustryMediaTitles',
        titleKey2: ['NewlyLaunched'],
        publicationName: "McGill Publications",
        authors: "",
        url: "https://publications.mcgill.ca/medenews/2020/06/16/newly-launched-serotracker-will-monitor-global-antibody-testing-efforts/",
        img: mcgill
    },
    {
        day: "2",
        month: "June",
        year: "2020",
        titleKey1: 'IndustryMediaTitles',
        titleKey2: ['StudentsBuild'],
        publicationName: "University of Waterloo",
        authors: "",
        url: "https://uwaterloo.ca/stories/engineering-students/students-build-online-dashboard-track-covid-19-antibody",
        img: waterloo
    },
    {
        day: "28",
        month: "May",
        year: "2020",
        titleKey1: 'IndustryMediaTitles',
        titleKey2: ['GlobalLaunch'],
        publicationName: "Covid-19 Immunity Task Force",
        authors: "",
        url: "https://www.covid19immunitytaskforce.ca/global-launch-of-serotracker-a-covid-19-antibody-testing-hub-in-partnership-with-canadas-covid-19-immunity-task-force/",
        img: CITF
    },
    {
        day: "24",
        month: "May",
        year: "2020",
        titleKey1: 'IndustryMediaTitles',
        titleKey2: ['KnowledgeHub'],
        publicationName: "University of Oxford",
        authors: "",
        url: "https://www.research.ox.ac.uk/Article/2020-05-28-knowledge-hub-developed-to-track-sars-cov-antibody-studies",
        img: oxford
    },
    {
        day: "23",
        month: "May",
        year: "2020",
        titleKey1: 'IndustryMediaTitles',
        titleKey2: ['UnderstandingVirus'],
        publicationName: "Bloomberg",
        authors: "",
        url: "https://www.bloomberg.com/news/articles/2020-05-06/understanding-the-virus-and-its-unanswered-questions-quicktake",
        img: bloomberg
    }
]

const listOfBiblioDigests: PublicationProps[] = [
    {
        titleKey1: 'BiblioDigestTitles',
        titleKey2: ['December'],
        url: "https://drive.google.com/file/d/1u2g7tmbP9kD0oi0syLgapmoBP4BCV0NF/view?usp=sharing"
    },
    {
        titleKey1: 'BiblioDigestTitles',
        titleKey2: ['November'],
        url: "https://drive.google.com/file/d/1kwMjD6w2onk9lh-sCOgAcEBH-I1DrW7_/view"
    },
    {
        titleKey1: 'BiblioDigestTitles',
        titleKey2: ['LateOctober'],
        url: "https://drive.google.com/file/d/11JHvvKtR9_s2HQHeHmp6j-hx8Y1sIF-O/view?usp=sharing"
    },
    {
        titleKey1: 'BiblioDigestTitles',
        titleKey2: ['October'],
        url: "https://drive.google.com/file/d/1uOhhQ8ToNYbXYcQ8acqVljHTksH8v-em/view?usp=sharing"
    },
    {
        titleKey1: 'BiblioDigestTitles',
        titleKey2: ['September'],
        url: "https://drive.google.com/file/d/16Bi6Si2Ph0wwCSkDR15l-gNYzB91aOei/view?usp=sharing"
    },
    {
        titleKey1: 'BiblioDigestTitles',
        titleKey2: ['August'],
        url: "https://drive.google.com/file/d/1c7OWeVdGwL2Hix-RIHs8y-EZHdKGv8kV/view?usp=sharing"
    },
    {           
        titleKey1: "BiblioDigestTitles",
        titleKey2: ['July'],
        url: "https://drive.google.com/file/d/1u6mix47HTUwSLraj4eMcD1rvGj7N7Z4g/view?usp=sharing"
    },
    {           
        titleKey1: "BiblioDigestTitles",
        titleKey2: ['June'],
        url: "https://drive.google.com/file/d/1qxAa3xnqEQzFwsph75wI4_zBj84iJ2FZ/view?usp=sharing"
    },
]

const listOfMonthlyReports: PublicationProps[] = [
    {
        titleKey1: 'IndustryReportTitles',
        titleKey2: ["OctoberReport"],
        url: "https://drive.google.com/file/d/1aCgxzxv9J5Zvh4EVyI5REmSVgWLQ_Ip3/view?usp=sharing"
    },
    {
        titleKey1: 'IndustryReportTitles',
        titleKey2: ['SeptemberReport'],
        url: "https://drive.google.com/file/d/1CjMcs7UZzu4_E_QFJVYZdv0QhyfoNMAe/view?usp=sharing"
    },
    {
        titleKey1: 'IndustryReportTitles',
        titleKey2: ['AugustReport'],
        url: "https://drive.google.com/file/d/1m7BlfUKCYs32_D1jnFUEQHPr3Qjg5Eyt/view?usp=sharing"
    },
    {
        titleKey1: 'IndustryReportTitles',
        titleKey2: ['JulyReport'],
        url: "https://drive.google.com/file/d/1Rx3i_Sy01suu-ZZYV7LRpo2KEclbXCNN/view?usp=sharing"
    },
    {
        titleKey1: 'IndustryReportTitles',
        titleKey2: ['JuneReport'],
        url: "https://drive.google.com/file/d/1HO--VWYdyEqd5Dc3xcZBwERXWDBjCfxN/view"
    },
    {
        titleKey1: 'IndustryReportTitles',
        titleKey2: ['MayReport'],
        url: "https://drive.google.com/file/d/16pCR-zh1UiWjQFhTDxW_2adSGuq0pCgz/view?usp=sharing"
    },
]

interface PublicationsInfoInterface {
    media: PublicationProps[],
    articles: PublicationProps[],
    reports: PublicationProps[],
    biblioDigests: PublicationProps[],
    monthlyReports: PublicationProps[]
}

export const PublicationsInfo: PublicationsInfoInterface = {
    media: listOfMediaPublicationsProps,
    articles: listOfResearchArticles,
    reports: listOfReports,
    biblioDigests: listOfBiblioDigests,
    monthlyReports: listOfMonthlyReports,
}