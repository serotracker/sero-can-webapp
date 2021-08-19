export const mobileDeviceOrTabletWidth = 1200;
export const mobileDeviceWidth = 600;
export const isMaintenanceMode = false;
export const mapZIndex = {
    CountriesTileLayer: 50,
    DisputedAreasAndBorders: 70,
    Labels: 800
}

export const ANALYZE_URLS = {
    "en": "https://public.tableau.com/views/SeroTrackerAnalyse/GlobalAnalyse?:language=en&:display_count=y&publish=yes&:origin=viz_share_link"
}
export const CANADA_URLS = {
    "en": "https://public.tableau.com/views/CanadaianDetail/Canadiandetail?:language=en-US&publish=yes&:display_count=n&:origin=viz_share_link",
    "fr": "https://public.tableau.com/views/Canada-FR/CanadianchartsFR?:language=en-US&publish=yes&:display_count=n&:origin=viz_share_link"
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
        Map: "Map"
    },
    [PAGES.Analyze]: {
        ByCountry: "ByCountry", 
        ByPopulation: "ByPopulation", 
        AdditionalGraphs: "AdditionalGraphs"
    }, 
    [PAGES.Data]: {
        DownloadData: "DownloadData",
        FAQ: "FAQ",
        SubmitSource: "SubmitSource",
        ChangeLog: "ChangeLog",
        DataDictionar: "DataDictionary",
        References: "References"
    },
    [PAGES.Publications]: {
        WeeklyUpdates: "WeeklyUpdates",
        ResearchArticles: "ResearchArticles",
        Reports: "Reports",
        MediaMentions: "MediaMentions"
    },
    [PAGES.About]: {
        Team: "Team",
        Contact: "Contact"
    }
}