export const mobileDeviceOrTabletWidth = 1200;
export const mobileDeviceWidth = 600;
export const isMaintenanceMode = false;
export const mapZIndex = {
    CountriesTileLayer: 50,
    DisputedAreasAndBorders: 70,
    Labels: 800
}

export const ANALYZE_URLS = {
    "en": "https://public.tableau.com/views/SeroTrackerAnalyzeEN/GlobalAnalyze?:language=en-US&:display_count=n&:origin=viz_share_link",
    "fr": "https://public.tableau.com/views/SeroTrackerAnalyseFR/GlobalAnalyse?:language=en-US&publish=yes&:display_count=n&:origin=viz_share_link"
}
export const CANADA_URLS = {
    "en": "https://public.tableau.com/views/CanadaEN/Canadiancharts?:language=en-US&publish=yes&:display_count=n&:origin=viz_share_link",
    "fr": "https://public.tableau.com/views/CanadaFR/Canadiancharts?:language=en-US&:display_count=n&:origin=viz_share_link"
}


export const PAGES = {
    Explore: "Explore",
    Analyze: "Analyze",
    Data: "Data",
    Publications: "Publications",
    About: "About"
}

export const PAGE_HASHES = {
    [PAGES.Explore]: {
        Map: "Map",
    },
    [PAGES.Analyze]: {
        ByCountry: "ByCountry",
        ByPopulation: "ByPopulation",
        AdditionalGraphs: "AdditionalGraphs"
    },
    [PAGES.Data]: {
        DataDictionary: "DataDictionary",
        ChangeLog: "ChangeLog",
        SubmitSource: "SubmitSource",
        DownloadCsv: "DownloadCsv",
        AccessGithub: "AccessGithub",
        FAQ: "FAQ",
        References: "References"

    },
    [PAGES.Publications]: {
        ResearchArticles: "ResearchArticles",
        GeneralSerotrackerCommunications: "GeneralSerotrackerCommunications",
        BiblioDigests: "BiblioDigests",
        MonthlyReports: "MonthlyReports",
        MediaMentions: "MediaMentions"
    },
    [PAGES.About]: {
        ContactUs: "ContactUs",
        Team: "Team"
    }
}
