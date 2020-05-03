export type AirtableRecord = {
    name: string,
    source_type?: string | null,
    study_status?: string | null,
    test_type: string | null,
    countries: string[] | null,
    populations: string[] | null,
    numerator: number | null,
    denominator: number | null,
    seroprevalence: number | null,
    url: string | null,
};

export type Filters = {
    source_type?: string | null,
    study_status?: string | null,
    test_type?: string | null,
    countries?: any,
    populations?: any
};

export type State = {
    healthcheck: string,
    airtable_records: AirtableRecord[],
    filtered_records: AirtableRecord[],
    filters: Filters
};