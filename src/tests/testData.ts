import { AirtableRecord, Filters } from "../types"

export const testRecords: AirtableRecord[] = [
    {
        article_name: 'article1',
        source_type: 'source1',
        study_status: 'status1',
        test_type: 'test1',
        country: 'Canada',
        populations: ['General'],
        denominator: 2000,
        seroprevalence: 0.15
    },
    {
        article_name: 'article2',
        source_type: 'source2',
        study_status: 'status1',
        test_type: 'test1',
        country: 'Canada',
        populations: ['Adults'],
        denominator: 1000,
        seroprevalence: 0.2
    },
    {
        article_name: 'article3',
        source_type: 'source1',
        study_status: 'status2',
        test_type: 'test1',
        country: 'Canada',
        populations: ['Children'],
        denominator: 200,
        seroprevalence: 0.12
    },
    {
        article_name: 'article4',
        source_type: 'source1',
        study_status: 'status1',
        test_type: 'test2',
        country: 'Canada',
        populations: ['Children', 'Seniors'],
        denominator: 500,
        seroprevalence: 0.15
    },
    {
        article_name: 'article1',
        source_type: 'source1',
        study_status: 'status1',
        test_type: 'test1',
        country: 'France',
        populations: ['General'],
        denominator: 1250,
        seroprevalence: 0.23
    },
    {
        article_name: 'article2',
        source_type: 'source2',
        study_status: 'status1',
        test_type: 'test1',
        country: 'France',
        populations: ['Adults'],
        denominator: 700,
        seroprevalence: 0.25
    },
    {
        article_name: 'article3',
        source_type: 'source1',
        study_status: 'status2',
        test_type: 'test1',
        country: 'France',
        populations: ['Children'],
        denominator: 300,
        seroprevalence: 0.32
    },
    {
        article_name: 'article4',
        source_type: 'source1',
        study_status: 'status1',
        test_type: 'test2',
        country: 'France',
        populations: ['Children', 'Seniors'],
        denominator: 500,
        seroprevalence: 0.2
    }
];

export function getEmptyFilters(): Filters{
    return {
        source_type: new Set(),
        study_status: new Set(),
        test_type: new Set(),
        country: new Set(),
        populations: new Set()
    }
}