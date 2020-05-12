export type AirtableRecord = {
    article_name: string,
    authors?: string | null,
    institution?: string | null,
    approving_regulator?: string | null,
    source_type: string | null,
    study_status: string | null,
    test_type: string | null,
    isotopes_reported?: string[] | null
    country: string | null,
    populations: string[] | null,
    numerator?: number | null,
    denominator: number | null,
    seroprevalence: number | null,
    url?: string | null,
};

// Each filter will be a javascript set
// TODO: find typing to represent sets
export type Filters = {
    source_type: any,
    study_status: any,
    test_type: any,
    country: any,
    populations: any
};

export type FilterType =  'country' | 'populations' | 'study_status' | 'test_type' | 'source_type'

export type State = {
    healthcheck: string,
    airtable_records: AirtableRecord[],
    filtered_records: AirtableRecord[],
    filters: Filters,
    filter_options: Filters,
    updated_at: string
};

export enum AggregationFactor {
    country = 'country',
    population = 'populations'
}
