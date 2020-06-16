import { testRecords, edgeCaseRecords } from './testData'
import { getAggregateData, aggregateRecords } from '../metaAnalysis'
import { AggregationFactor, AggregatedRecord, CustomMatcherResult } from '../types';

function inZeroHundred (x: number) {
    if ((x >= 0) && (x <= 100)) {return true}
    else {return false}
}

function checkAggregatedRecord(record: AggregatedRecord, expectedN: number){
    if (inZeroHundred(record.seroprevalence) 
    && inZeroHundred(record.seroprevalence - record.error[0]) 
    && inZeroHundred(record.seroprevalence + record.error[1])
    && record.n == expectedN) {return true}
    else {return false}
}

test('test country aggregation', () => {
    const aggregatedData: AggregatedRecord[] = getAggregateData(testRecords, AggregationFactor.country)
    expect(aggregatedData.length).toBe(2)
    const expectedResult = [ 
        { 
            name: 'Canada',
            n: 3700 
        },
        { 
            name: 'France',
            n: 2750 
        } 
    ];

    for (let i = 0; i < expectedResult.length; i++) {
        const data = aggregatedData.find(element => element.name === expectedResult[i].name)
        expect(checkAggregatedRecord(data!, expectedResult[i].n)).toBe(true)
    }
});

test('test population aggregation', () => {
    const aggregatedData = getAggregateData(testRecords, AggregationFactor.population_group)
    expect(aggregatedData.length).toBe(4)
    const expectedResult = [ 
        { 
            name: 'General',
            n: 3250 
        },
        { 
            name: 'Adults',
            n: 1700 
        },
        { 
            name: 'Children',
            n: 1500 
        },
        { 
            name: 'Seniors',
            n: 1000 
        } 
    ]

    for (let i = 0; i < expectedResult.length; i++) {
        const data = aggregatedData.find(element => element.name === expectedResult[i].name)
        expect(checkAggregatedRecord(data!, expectedResult[i].n)).toBe(true)
    }
});

test('test overall aggregation', () => {
    const aggregatedData = aggregateRecords(testRecords);
    const expectedResult = { 
        n: 6450 
    }

    expect(checkAggregatedRecord(aggregatedData!, expectedResult.n)).toBe(true)
});

test('test aggregation of edge case records', () => {
    // Use double_arcsin_RSM, thus records with seroprevalence = 0 should be included
    // Records with denominator = 0 should never be included
    let aggregatedData = getAggregateData(edgeCaseRecords, AggregationFactor.country);
    const expectedResult = [
        {
            name: 'Canada',
            n: 4000
        },
        {
            name: 'France',
            n: 2000
        }
    ];
    for (let i = 0; i < expectedResult.length; i++) {
        const data = aggregatedData.find(element => element.name === expectedResult[i].name);
        expect(checkAggregatedRecord(data!, expectedResult[i].n)).toBe(true);
    }

    // Use inverse_variance, thus records with seroprevalence = 0 should not be included
    aggregatedData = getAggregateData(edgeCaseRecords, AggregationFactor.country, "inverse_variance");
    const expected = {
        name: 'Canada',
        n: 2000
    };
    expect(aggregatedData.length === 1);
    const data = aggregatedData.find(element => element.name === expected.name);
    expect(checkAggregatedRecord(data!, expected.n)).toBe(true);
});
