interface AirtableRecord {
    name: string,
    source_type?: string,
    study_status?: string,
    test_type?: string,
    countries?: string[],
    populations?: string[],
    numerator?: number,
    denominator?: number,
    seroprevalence?: number,
    url?: string,
}

interface Filters {
    source_type?: string | null,
    study_status?: string | null,
    test_type?: string | null,
    countries?: any,
    populations?: any
}

interface State {
    healthcheck: string,
    airtable_records: AirtableRecord[],
    filtered_records: AirtableRecord[],
    filters: Filters
}