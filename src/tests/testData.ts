import { AirtableRecord, Filters } from "../types"

export const testRecords: AirtableRecord[] = [
    {
        source_name: 'article1',
        source_type: 'source1',
        study_status: 'status1',
        test_type: ['test1'],
        country: 'Canada',
        population_group: ['General'],
        sex: 'All',
        age: ['Youth (15-24)'],
        denominator: 2000,
        seroprevalence: 0.15
    },
    {
        source_name: 'article2',
        source_type: 'source2',
        study_status: 'status1',
        test_type: ['test1'],
        country: 'Canada',
        population_group: ['Adults'],
        sex: 'All',
        age: ['Youth (15-24)'],
        denominator: 1000,
        seroprevalence: 0.2
    },
    {
        source_name: 'article3',
        source_type: 'source1',
        study_status: 'status2',
        test_type: ['test1'],
        country: 'Canada',
        population_group: ['Children'],
        sex: 'All',
        age: ['Youth (15-24)'],
        denominator: 200,
        seroprevalence: 0.12
    },
    {
        source_name: 'article4',
        source_type: 'source1',
        study_status: 'status1',
        test_type: ['test2'],
        country: 'Canada',
        population_group: ['Children', 'Seniors'],
        sex: 'All',
        age: ['Youth (15-24)'],
        denominator: 500,
        seroprevalence: 0.15
    },
    {
        source_name: 'article1',
        source_type: 'source1',
        study_status: 'status1',
        test_type: ['test1'],
        country: 'France',
        population_group: ['General'],
        sex: 'All',
        age: ['Youth (15-24)'],
        denominator: 1250,
        seroprevalence: 0.23
    },
    {
        source_name: 'article2',
        source_type: 'source2',
        study_status: 'status1',
        test_type: ['test1'],
        country: 'France',
        population_group: ['Adults'],
        sex: 'All',
        age: ['Youth (15-24)'],
        denominator: 700,
        seroprevalence: 0.25
    },
    {
        source_name: 'article3',
        source_type: 'source1',
        study_status: 'status2',
        test_type: ['test1'],
        country: 'France',
        population_group: ['Children'],
        sex: 'All',
        age: ['Youth (15-24)'],
        denominator: 300,
        seroprevalence: 0.32
    },
    {
        source_name: 'article4',
        source_type: 'source1',
        study_status: 'status1',
        test_type: ['test2'],
        country: 'France',
        population_group: ['Children', 'Seniors'],
        sex: 'Male',
        age: ['Adults (25-49)'],
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
        population_group: new Set(),
        sex: new Set(),
        age: new Set()
    }
}
