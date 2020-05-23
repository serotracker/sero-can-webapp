
export type AirtableRecord = {
    source_name: string | null,
    lead_org?: string | null,
    first_author?: string | null,
    source_type: string | null,
    study_status: string | null,
    test_type: string[] | null,
    isotypes_reported: string[] | null,
    manufacturer?: string | null,
    approving_regulator?: string | null,
    sensitivity?: number | null,
    specificity?: number | null,
    country: string | null,
    state?: string[] | null,
    city?: string[] | null,
    population_group: string[] | null,
    sex: string | null,
    age: string[] | null,
    denominator: number | null,
    seroprevalence: number | null,
    publish_date?: string | null,
    publisher?: string | null,
    risk_of_bias: string | null,
    study_type?: string | null,
    sample_size?: string | null,
    sampling_method?: string | null,
    sampling_start_date?: string | null,
    sampling_end_date?: string | null,
    summary?: string | null,
    url?: string | null,
};

export type AggregatedRecord = {
    error: number[];
    n: number;
    name: string;
    num_studies: number;
    seroprevalence: number;
}

// Each filter will be a javascript set
// TODO: find typing to represent sets
export type Filters = {
    source_type: any,
    study_status: any,
    test_type: any,
    country: any,
    population_group: any,
    sex: any,
    age: any,
    risk_of_bias: any,
    isotypes_reported: any
};

export type FilterType =  'country' | 'population_group' | 'sex' | 'age' | 'study_status' | 'test_type' | 'source_type' | 'risk_of_bias' | 'isotypes_reported';

export type State = {
    healthcheck: string,
    airtable_records: AirtableRecord[],
    filtered_records: AirtableRecord[],
    filters: Filters,
    filter_options: Filters,
    updated_at: string,
    data_page_state: DataPageState
};

export enum AggregationFactor {
    country = 'country',
    population_group = 'population_group'
}

export type DataPageState = {
    mapOpen: boolean
}

export type CustomMatcherResult = {
    pass: boolean
    message: string 
}
