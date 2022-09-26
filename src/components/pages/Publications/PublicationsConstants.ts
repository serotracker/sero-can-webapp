import YearInReview2020 from '../../../assets/images/YearInReview2020.png'
import PreprintUpdate from '../../../assets/images/IndustryUpdatePre_2020.png'
import BloodBank from '../../../assets/images/SeroTrackerBloodBank_July_2020.png'
import MedRxiv from '../../../assets/images/Prepublication.png'
import LancetId from '../../../assets/images/LancetIDArticle.png'
import InsuringTheEconomy from '../../../assets/images/InsuringTheEconomy.png'
import PlosOnePub from '../../../assets/images/PlosOnePub.png'
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
import covidend from '../../../assets/images/PubMedia/covidend-global-logo.png'
import reuters from '../../../assets/images/PubMedia/reuters-logo.png'


// Note: Dates should be strings in YYYY-MM-DD format
export interface PublicationProps {
    date?: string,
    titleKey1: string,
    titleKey2: string[],
    publicationName?: string,
    img?: string,
    url: string,
    authors?: string,
    italicize?: string
    collection?: string,
}



export interface BiblioDigestProps {
    url: string,
    sourcesAdded?: number,
    serosurveysTotal: number,
    serosurveysAFRO: number,
    serosurveysEMRO: number,
    serosurveysEURO: number,
    serosurveysPAHO: number,
    serosurveysSEARO: number,
    serosurveysWPRO: number,
    serosurveysNonMember: number,
    screeningStartDate: string,
    screeningEndDate: string,
    publishDate: string
}

export const listOfReports: PublicationProps[] = [
    {
        date: "2021-01-15",
        img: YearInReview2020,
        titleKey1: 'IndustryReportTitles',
        titleKey2: ['YearInReview2020'],
        url: "https://drive.google.com/file/d/14u0GroEadFQ__Gdvoe104HI-y0LWDwSu/view?usp=sharing",
    },
    {     
        date: "2020-08-20",      
        img: InsuringTheEconomy,
        titleKey1: 'IndustryReportTitles',
        titleKey2: ['InsuringTheEconomy'],
        url: "https://drive.google.com/file/d/1kEl6xv54yPGoDXZoPq9h2q4SqYnL2OU-/view?usp=sharing"
    },
    {      
        date: "2020-07-22",     
        img: BloodBank,
        titleKey1: 'IndustryReportTitles',
        titleKey2: ['BloodBank'],
        url: "https://drive.google.com/file/d/1It2CzAwEfTcQ1zIC6z2fO7i7XEfmWfom/view?usp=sharing"
    },
    {    
        date: "2020-05-19",       
        img: PreprintUpdate,
        titleKey1: 'IndustryReportTitles',
        titleKey2: ['PreliminaryReport'],
        url: "https://drive.google.com/file/d/1I1gY1lZndwp4_eUqoZviU8L2_izmkmQP/view?usp=sharing"
    },
]

export const listOfResearchArticles: PublicationProps[] = [
    {
        date: "2022-07-26",
        titleKey1: 'ResearchArticleTitles',
        titleKey2: ['MedRxivSero'],
        publicationName: "mexRxiv",
        authors: "Isabel Bergeri, Mairead Whelan, Harriet Ware et al.",
        url: "https://www.medrxiv.org/content/10.1101/2021.12.14.21267791v3.full"
    },
    {
        date: "2022-05-19",
        titleKey1: 'ResearchArticleTitles',
        titleKey2: ['NIH-UCES'],
        publicationName: "Frontiers in Research Metrics and Analytics",
        authors: "Tingting Yan and Rahul K Arora",
        url: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC9160358/"
    },
    {
        date: "2022-02-25",
        img: MedRxiv,
        titleKey1: 'ResearchArticleTitles',
        titleKey2: ['MedRxivNLP'],
        publicationName: "medRxiv",
        authors: "Sara Perlman-Arrow, Noel Loo, Niklas Bobrovitz et al.",
        url: "https://www.medrxiv.org/content/10.1101/2022.02.24.22268947v1"
    },
    {
        date: "2022-02-15",
        img: MedRxiv,
        titleKey1: 'ResearchArticleTitles',
        titleKey2: ['MedRxivAfr'],
        publicationName: "medRxiv",
        authors: "Hannah Lewis, Harriet Ware, Mairead Whelan, et al.",
        url: "https://www.medrxiv.org/content/10.1101/2022.02.14.22270934v1"
    },
    {
        date: "2021-12-15",
        img: MedRxiv,
        titleKey1: 'ResearchArticleTitles',
        titleKey2: ['MedRxivMeta'],
        publicationName: "medRxiv",
        authors: "Isabel Bergeri, Mairead Whelan, Harriet Ware et al.",
        url: "https://www.medrxiv.org/content/10.1101/2021.12.14.21267791v1"
    },
    {
        date: "2021-11-21",
        img: MedRxiv,
        titleKey1: 'ResearchArticleTitles',
        titleKey2: ['MedRxivROB'],
        publicationName: "medRxiv",
        authors: "Niklas Bobrovitz, Kim Noël, Zihan Li et al.",
        url: "https://www.medrxiv.org/content/10.1101/2021.11.17.21266471v1"
    },
    {
        date: "2021-07-03",
        img: MedRxiv,
        titleKey1: 'ResearchArticleTitles',
        titleKey2: ['MedRxivPrivate'],
        publicationName: "medRxiv",
        authors: "Nathan Duarte, Sean D'Mello, Nathalie A Duarte et al.",
        url: "https://www.medrxiv.org/content/10.1101/2021.06.29.21259730v1"
    },
    {
        date: "2021-06-23",
        img: PlosOnePub,
        titleKey1: 'ResearchArticleTitles',
        titleKey2: ['PlosOnePub'],
        publicationName: "Plos One",
        authors: "Niklas Bobrovitz, Rahul Krishan Arora, Christian Cao et al.",
        url: "https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0252617"
    },
    {   
        date: "2020-08-14",        
        img: LancetId,
        titleKey1: "ResearchArticleTitles",
        titleKey2: ['LancetID'],
        publicationName: "The Lancet: Infectious Diseases",
        authors: "Rahul K Arora, Abel Joseph, Jordan Van Wyk et al.",
        url: "https://www.thelancet.com/journals/laninf/article/PIIS1473-3099(20)30631-9/fulltext#%20"
    },
    {     
        date: "2020-05-14",      
        img: MedRxiv,
        titleKey1: "ResearchArticleTitles",
        titleKey2: ['PrePrint'],
        publicationName: "medRxiv",
        authors: "Niklas Bobrovitz, Rahul Krishan Arora, Tingting Yan et al.",
        url: "https://www.medrxiv.org/content/10.1101/2020.05.10.20097451v1"
    },
]

export const listOfMediaPublications: PublicationProps[] = [
    {
        date: "2022-04-07",
        titleKey1: 'IndustryMediaTitles',
        titleKey2: ['AfricaCovid2/3'],
        publicationName: "Reuters",
        img: reuters,
        authors: "",
        url: "https://www.reuters.com/world/africa/over-two-thirds-africans-infected-by-covid-virus-since-pandemic-began-who-2022-04-07",
    },
    {
        date: "2022-04-07",
        titleKey1: 'IndustryMediaTitles',
        titleKey2: ['AfricaCovidCount'],
        publicationName: "Bloomberg",
        img: bloomberg,
        authors: "Janice Kew",
        url: "https://www.bloomberg.com/news/articles/2022-04-07/eight-hundred-million-africans-may-have-had-covid-19-who-says",
    },
    {
        date: "2022-03-23",
        titleKey1: 'IndustryMediaTitles',
        titleKey2: ['AfricaLowDeathRate'],
        publicationName: "The New York Times",
        img: NYT,
        authors: "",
        url: "https://www.nytimes.com/2022/03/23/health/covid-africa-deaths.html",
    },
    {
        date: "2021-06-25",
        titleKey1: 'IndustryMediaTitles',
        titleKey2: ['StillVulnerable'],
        publicationName: "Le Journal de Quebec",
        img: journalQuebec,
        authors: "",
        url: "https://www.journaldequebec.com/2021/06/25/la-population-mondiale-toujours-vulnerable-a-la-covid-19",
    },
    {
        date: "2021-05-25",
        titleKey1: 'IndustryMediaTitles',
        titleKey2: ['NYTIndia'],
        publicationName: "The New York Times",
        authors: "",
        url: "https://www.nytimes.com/interactive/2021/05/25/world/asia/india-covid-death-estimates.html",
        img: NYT
    },
    {
        date: "2021-05-13",
        titleKey1: 'IndustryMediaTitles',
        titleKey2: ['EconomistDeathToll'],
        publicationName: "The Economist",
        authors: "",
        url: "https://www.economist.com/graphic-detail/2021/05/13/how-we-estimated-the-true-death-toll-of-the-pandemic",
        img: theEconomist
    },
    {
        date: "2021-01-23",
        titleKey1: 'IndustryMediaTitles',
        titleKey2: ['JouleAnnounce'],
        publicationName: "Cision",
        authors: "",
        url: "https://www.newswire.ca/news-releases/joule-announces-2020-innovation-grant-recipients-867798355.html",
        img: cision
    },
    {
        date: "2021-01-20",
        titleKey1: 'IndustryMediaTitles',
        titleKey2: ['WhenEnd'],
        publicationName: "McKinsey & Company",
        authors: "",
        url: "https://www.mckinsey.com/industries/healthcare-systems-and-services/our-insights/when-will-the-covid-19-pandemic-end",
        img: mckinsey
    },
    {
        date: "2021-01-15",
        titleKey1: 'IndustryMediaTitles',
        titleKey2: ['JouleInnovation'],
        publicationName: "AMC Joule",
        authors: "",
        url: "https://joulecma.ca/innovate/grants/serotracker ",
        img: joule
    },
    {
        date: "2021-01-14",
        titleKey1: 'IndustryMediaTitles',
        titleKey2: ['JouleRecipients'],
        publicationName: "Markets Insider",
        authors: "",
        url: "https://markets.businessinsider.com/amp/news/joule-announces-2020-innovation-grant-recipients-1029968953",
        img: joule
    },
    {
        date: "2021-01-01",
        titleKey1: 'IndustryMediaTitles',
        titleKey2: ['McKinseyHealthcare'],
        publicationName: "McKinsey & Company",
        authors: "",
        url: "https://www.mckinsey.com/~/media/McKinsey/Industries/Healthcare%20Systems%20and%20Services/Our%20Insights/McKinsey%20on%20Healthcare%202020%20Year%20in%20Review/McKinsey-on-Healthcare-2020-Year-in-Review.pdf",
        img: mckinsey
    },
    {
        date: "2020-11-24",
        titleKey1: 'IndustryMediaTitles',
        titleKey2: ['InfectionRate'],
        publicationName: "taz",
        authors: "",
        url: "https://taz.de/Studie-zu-globaler-Corona-Infektionsrate/!5730030/",
        img: taz
    },
    {
        date: "2020-11-23",
        titleKey1: 'IndustryMediaTitles',
        titleKey2: ['AlumniAndStudents'],
        publicationName: "University of Calgary",
        authors: "",
        url: "https://cumming.ucalgary.ca/news/serotracker",
        img: UCalgary
    },
    {
        date: "2020-11-10",
        titleKey1: 'IndustryMediaTitles',
        titleKey2: ['Webinar'],
        publicationName: "HIMSS",
        authors: "",
        url: "http://www.himsschapter.org/event/serotracker-covid-19-journey-himss-canadian-prairies-chapter-webinar",
        img: HIMSS
    },
    {
        date: "2020-08-17",
        titleKey1: 'IndustryMediaTitles',
        titleKey2: ['HomeTests'],
        publicationName: "Forbes",
        authors: "",
        url: "https://www.forbes.com/sites/williamhaseltine/2020/08/17/cheap-daily-home-tests-are-the-first-step-to-containing-the-pandemic/?sh=677d47d14ad4",
        img: forbes
    },
    {
        date: "2020-08-03",
        titleKey1: 'IndustryMediaTitles',
        titleKey2: ['Lecturership'],
        publicationName: "Computational Health Informatics",
        authors: "",
        url: "https://eng.ox.ac.uk/chi/news/adjunct-lecturership-for-rahul/",
        img: chi
    },
    {
        date: "2020-07-22",
        titleKey1: 'IndustryMediaTitles',
        titleKey2: ['HowMany'],
        publicationName: "NewScientist",
        authors: "",
        url: "https://www.newscientist.com/article/mg24632873-000-how-many-of-us-are-likely-to-have-caught-the-coronavirus-so-far/",
        img: newScientist
    },
    {
        date: "2020-07-07",
        titleKey1: 'IndustryMediaTitles',
        titleKey2: ['CovidRadar'],
        publicationName: "M1 Marica News",
        authors: "",
        url: "https://m1newstv.com/subnotificacao-no-brasil-e-na-rocinha-e-a-media-mundial/",
        img: marcia
    },
    {
        date: "2020-06-11",
        titleKey1: 'IndustryMediaTitles',
        titleKey2: ['VeteranDoctor'],
        publicationName: "MaRS",
        authors: "",
        url: "https://www.marsdd.com/magazine/what-if-there-is-no-covid-19-vaccine/",
        img: mars
    },
    {
        date: "2020-06-02",
        titleKey1: 'IndustryMediaTitles',
        titleKey2: ['NewlyLaunched'],
        publicationName: "McGill Publications",
        authors: "",
        url: "https://publications.mcgill.ca/medenews/2020/06/16/newly-launched-serotracker-will-monitor-global-antibody-testing-efforts/",
        img: mcgill
    },
    {
        date: "2020-06-02",
        titleKey1: 'IndustryMediaTitles',
        titleKey2: ['StudentsBuild'],
        publicationName: "University of Waterloo",
        authors: "",
        url: "https://uwaterloo.ca/stories/engineering-students/students-build-online-dashboard-track-covid-19-antibody",
        img: waterloo
    },
    {
        date: "2020-05-28",
        titleKey1: 'IndustryMediaTitles',
        titleKey2: ['GlobalLaunch'],
        publicationName: "Covid-19 Immunity Task Force",
        authors: "",
        url: "https://www.covid19immunitytaskforce.ca/global-launch-of-serotracker-a-covid-19-antibody-testing-hub-in-partnership-with-canadas-covid-19-immunity-task-force/",
        img: CITF
    },
    {
        date: "2020-05-24",
        titleKey1: 'IndustryMediaTitles',
        titleKey2: ['KnowledgeHub'],
        publicationName: "University of Oxford",
        authors: "",
        url: "https://www.research.ox.ac.uk/Article/2020-05-28-knowledge-hub-developed-to-track-sars-cov-antibody-studies",
        img: oxford
    },
    {
        date: "2020-05-23",
        titleKey1: 'IndustryMediaTitles',
        titleKey2: ['UnderstandingVirus'],
        publicationName: "Bloomberg",
        authors: "",
        url: "https://www.bloomberg.com/news/articles/2020-05-06/understanding-the-virus-and-its-unanswered-questions-quicktake",
        img: bloomberg
    },
    {
        date: "2022-01-12",
        titleKey1: 'IndustryMediaTitles',
        titleKey2: ['EconomistDeathToll2'],
        publicationName: "The Economist",
        authors: "",
        url: "https://www.economist.com/graphic-detail/coronavirus-excess-deaths-estimates",
        img: theEconomist
    },
    {
        date: "2021-06-29",
        titleKey1: 'IndustryMediaTitles',
        titleKey2: ['InventoryEvidenceSynthesis'],
        publicationName: "COVID-END",
        authors: "",
        url: "https://www.mcmasterforum.org/networks/covid-end/resources-to-support-decision-makers/Inventory-of-best-evidence-syntheses/public-health-measures",
        img: covidend
    }
]


// Note: for biblio digests, date = date published
export const listOfBiblioDigests: BiblioDigestProps[] = [
    {
        url: "https://drive.google.com/file/d/1E9i39QPOD4hSbdFf-UYJxzkv6oEJslvm/view",
        sourcesAdded: 54,
        serosurveysTotal: 72,
        serosurveysAFRO: 2,
        serosurveysEMRO: 11,
        serosurveysEURO: 41,
        serosurveysPAHO: 14,
        serosurveysSEARO: 0,
        serosurveysWPRO: 4,
        serosurveysNonMember: 0,
        publishDate: "2022-08-26",
        screeningStartDate: "2022-07-23",
        screeningEndDate: "2022-08-19"
    },
    {
        url: "https://drive.google.com/file/d/1o0ydACOJ990IzKqc_yl6ApTgjYcMy0yp/view",
        sourcesAdded: 64,
        serosurveysTotal: 104,
        serosurveysAFRO: 17,
        serosurveysEMRO: 1,
        serosurveysEURO: 49,
        serosurveysPAHO: 18,
        serosurveysSEARO: 5,
        serosurveysWPRO: 14,
        serosurveysNonMember: 0,
        publishDate: "2022-07-01",
        screeningStartDate: "2022-06-25",
        screeningEndDate: "2022-07-22"
    },
    {
        url: "https://drive.google.com/file/d/1wr08YZRXcqKFx6W6mChpT2SAOU-bCMyD/view",
        sourcesAdded: 80,
        serosurveysTotal: 127,
        serosurveysAFRO: 13,
        serosurveysEMRO: 9,
        serosurveysEURO: 34,
        serosurveysPAHO: 52,
        serosurveysSEARO: 9,
        serosurveysWPRO: 10,
        serosurveysNonMember: 0,
        publishDate: "2022-07-01",
        screeningStartDate: "2022-05-28",
        screeningEndDate: "2022-06-24"
    },
    {
        url: "https://drive.google.com/file/d/1rpTWCbMcvx3x-bgkXKicyeBcVKjuUQ_X/view?usp=sharing",
        sourcesAdded: 93,
        serosurveysTotal: 135,
        serosurveysAFRO: 19,
        serosurveysEMRO: 10,
        serosurveysEURO: 62,
        serosurveysPAHO: 26,
        serosurveysSEARO: 7,
        serosurveysWPRO: 11,
        serosurveysNonMember: 0,
        publishDate: "2022-06-06",
        screeningStartDate: "2022-04-30",
        screeningEndDate: "2022-05-27"
    },
    {
        url: "https://drive.google.com/file/d/1tAX6bm5FvWAGliXD9U7hiOaHi613KYn1/view?usp=sharing",
        sourcesAdded: 74,
        serosurveysTotal: 111,
        serosurveysAFRO: 2,
        serosurveysEMRO: 8,
        serosurveysEURO: 41,
        serosurveysPAHO: 40,
        serosurveysSEARO: 16,
        serosurveysWPRO: 4,
        serosurveysNonMember: 0,
        publishDate: "2022-05-06",
        screeningStartDate: "2022-04-02",
        screeningEndDate: "2022-04-29"
    },
    {
        url: "https://drive.google.com/file/d/1_1YXlK8DrUsJz533Lu8do11g5TuF-ATS/view?usp=sharing",
        sourcesAdded: 106,
        serosurveysTotal: 172,
        serosurveysAFRO: 22,
        serosurveysEMRO: 3,
        serosurveysEURO: 61,
        serosurveysPAHO: 63,
        serosurveysSEARO: 13,
        serosurveysWPRO: 10,
        serosurveysNonMember: 0,
        publishDate: "2022-04-07",
        screeningStartDate: "2022-03-05",
        screeningEndDate: "2022-04-01"
    },
    {
        url: "https://drive.google.com/file/d/1h7RpDI_EWi2qu2KTjErME03jlhY1hS5Y/view?usp=sharing",
        sourcesAdded: 128,
        serosurveysTotal: 310,
        serosurveysAFRO: 29,
        serosurveysEMRO: 4,
        serosurveysEURO: 185,
        serosurveysPAHO: 58,
        serosurveysSEARO: 21,
        serosurveysWPRO: 13,
        serosurveysNonMember: 0,
        publishDate: "2022-03-10",
        screeningStartDate: "2022-02-05",
        screeningEndDate: "2022-03-04"
    },
    {
        url: "https://drive.google.com/file/d/1PME1WFA-ItYAzzuPfGNSvLvJyKXQAezl/view?usp=sharing",
        sourcesAdded: 98,
        serosurveysTotal: 160,
        serosurveysAFRO: 20,
        serosurveysEMRO: 3,
        serosurveysEURO: 66,
        serosurveysPAHO: 36,
        serosurveysSEARO: 14,
        serosurveysWPRO: 20,
        serosurveysNonMember: 1,
        publishDate: "2022-02-11",
        screeningStartDate: "2022-01-08",
        screeningEndDate: "2022-02-04"
    },
    {
        url: "https://drive.google.com/file/d/1J51-liWMXACBdMgl2Yqc_litXSIukkBQ/view?usp=sharing",
        sourcesAdded: 65,
        serosurveysTotal: 102,
        serosurveysAFRO: 6,
        serosurveysEMRO: 2,
        serosurveysEURO: 49,
        serosurveysPAHO: 24,
        serosurveysSEARO: 15,
        serosurveysWPRO: 6,
        serosurveysNonMember: 0,
        publishDate: "2022-01-14",
        screeningStartDate: "2021-12-11",
        screeningEndDate: "2022-01-07"
    },
    {
        url: "https://drive.google.com/file/d/1ibebgdbG5C-k0whOJfjeEuECrybmHlQ2/view?usp=sharing",
        sourcesAdded: 85,
        serosurveysTotal: 176,
        serosurveysAFRO: 37,
        serosurveysEMRO: 5,
        serosurveysEURO: 67,
        serosurveysPAHO: 40,
        serosurveysSEARO: 11,
        serosurveysWPRO: 15,
        serosurveysNonMember: 1,
        publishDate: "2021-12-17",
        screeningStartDate: "2021-11-20",
        screeningEndDate: "2021-12-10"
    },
    {
        url: "https://drive.google.com/file/d/1v1Tzyatwzg-1v7f0H6qO1JGfL9Hk3_jN/view?usp=sharing",
        sourcesAdded: 133,
        serosurveysTotal: 269,
        serosurveysAFRO: 14,
        serosurveysEMRO: 10,
        serosurveysEURO: 153,
        serosurveysPAHO: 55,
        serosurveysSEARO: 24,
        serosurveysWPRO: 13,
        serosurveysNonMember: 0,
        publishDate: "2021-11-26",
        screeningStartDate: "2021-10-23",
        screeningEndDate: "2021-11-09"
    },
    {
        url: "https://drive.google.com/file/d/1Fy-fQS0fVzMPW75ZpWQRLZoU1EVYdeaF/view?usp=sharing",
        sourcesAdded: 171,
        serosurveysTotal: 263,
        serosurveysAFRO: 18,
        serosurveysEMRO: 24,
        serosurveysEURO: 134,
        serosurveysPAHO: 66,
        serosurveysSEARO: 11,
        serosurveysWPRO: 10,
        serosurveysNonMember: 0,
        publishDate: "2021-10-29",
        screeningStartDate: "2021-09-25",
        screeningEndDate: "2021-10-22"
    },
    {
        url: "https://drive.google.com/file/d/12u72w5ZpgNV1JykEasxVD1QYWi3F9mV4/view?usp=sharing",
        sourcesAdded: 117,
        serosurveysTotal: 289,
        serosurveysAFRO: 6,
        serosurveysEMRO: 8,
        serosurveysEURO: 136,
        serosurveysPAHO: 117,
        serosurveysSEARO: 18,
        serosurveysWPRO: 4,
        serosurveysNonMember: 0,
        publishDate: "2021-10-01",
        screeningStartDate: "2021-08-28",
        screeningEndDate: "2021-09-24"
    },
    {
        url: "https://drive.google.com/file/d/16Bi6Si2Ph0wwCSkDR15l-gNYzB91aOei/view?usp=sharing",
        serosurveysTotal: 147,
        serosurveysAFRO: 2,
        serosurveysEMRO: 11,
        serosurveysEURO: 53,
        serosurveysPAHO: 63,
        serosurveysSEARO: 14,
        serosurveysWPRO: 4,
        serosurveysNonMember: 0,
        publishDate: "2021-09-03",
        screeningStartDate: "2021-07-31",
        screeningEndDate: "2021-08-27"
    },
    {
        url: "https://drive.google.com/file/d/1c7OWeVdGwL2Hix-RIHs8y-EZHdKGv8kV/view?usp=sharing",
        serosurveysTotal: 271,
        serosurveysAFRO: 98,
        serosurveysEMRO: 7,
        serosurveysEURO: 94,
        serosurveysPAHO: 46,
        serosurveysSEARO: 12,
        serosurveysWPRO: 14,
        serosurveysNonMember: 0,
        publishDate: "2021-08-06",
        screeningStartDate: "2021-07-03",
        screeningEndDate: "2021-07-30"
    },
    {           
        url: "https://drive.google.com/file/d/1u6mix47HTUwSLraj4eMcD1rvGj7N7Z4g/view?usp=sharing",
        serosurveysTotal: 214,
        serosurveysAFRO: 51,
        serosurveysEMRO: 7,
        serosurveysEURO: 71,
        serosurveysPAHO: 44,
        serosurveysSEARO: 21,
        serosurveysWPRO: 20,
        serosurveysNonMember: 0,
        publishDate: "2021-07-09",
        screeningStartDate: "2021-06-05",
        screeningEndDate: "2021-07-02"
    },
    {          
        url: "https://drive.google.com/file/d/1qxAa3xnqEQzFwsph75wI4_zBj84iJ2FZ/view?usp=sharing",
        serosurveysTotal: 162,
        serosurveysAFRO: 17,
        serosurveysEMRO: 3,
        serosurveysEURO: 72,
        serosurveysPAHO: 51,
        serosurveysSEARO: 11,
        serosurveysWPRO: 8,
        serosurveysNonMember: 0,
        publishDate: "2021-06-10",
        screeningStartDate: "2021-04-25",
        screeningEndDate: "2021-06-04"
    },
]

export const listOfPrivateSectorReports: PublicationProps[] = [
    {
        titleKey1: 'IndustryReportTitles',
        titleKey2: ["OctoberReport"],
        collection: "A Pillai, N Duarte, M Rocco.",
        authors: "N Duarte, R Arora.",
        date: "2020",
        url: "https://drive.google.com/file/d/1aCgxzxv9J5Zvh4EVyI5REmSVgWLQ_Ip3/view?usp=sharing"
    },
    {
        titleKey1: 'IndustryReportTitles',
        titleKey2: ['SeptemberReport'],
        collection: "A Pillai, N Duarte, M Rocco.",
        authors: "N Duarte, R Arora.",
        date: "2020",
        url: "https://drive.google.com/file/d/1CjMcs7UZzu4_E_QFJVYZdv0QhyfoNMAe/view?usp=sharing"
    },
    {
        titleKey1: 'IndustryReportTitles',
        titleKey2: ['AugustReport'],
        collection: "A Pillai, N Duarte, M Rocco.",
        authors: "N Duarte, J Chen, R Arora.",
        date: "2020",
        url: "https://drive.google.com/file/d/1m7BlfUKCYs32_D1jnFUEQHPr3Qjg5Eyt/view?usp=sharing"
    },
    {
        titleKey1: 'IndustryReportTitles',
        titleKey2: ['JulyReport'],
        collection: "A Pillai, N Duarte, M Rocco.",
        authors: "Jamie Chen, N Duarte, R Arora.",
        date: "2020",
        url: "https://drive.google.com/file/d/1Rx3i_Sy01suu-ZZYV7LRpo2KEclbXCNN/view?usp=sharing"
    },
    {
        titleKey1: 'IndustryReportTitles',
        titleKey2: ['JuneReport'],
        collection: "A Pillai, N Duarte, M Rocco.",
        authors: "J Chen, N Duarte, R Arora.",
        date: "2020",
        url: "https://drive.google.com/file/d/1HO--VWYdyEqd5Dc3xcZBwERXWDBjCfxN/view"
    },
    {
        titleKey1: 'IndustryReportTitles',
        titleKey2: ['MayReport'],
        collection: "by S Rocco, N Duarte, M Rocco, J Van Wyk.",
        authors: "N Duarte, A Pillai.",
        date: "2020",
        url: "https://drive.google.com/file/d/16pCR-zh1UiWjQFhTDxW_2adSGuq0pCgz/view?usp=sharing"
    },
]