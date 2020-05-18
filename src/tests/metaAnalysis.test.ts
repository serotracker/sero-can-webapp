import { testRecords } from './testData'
import { getAggregateData, aggregateRecords } from '../metaAnalysis'
import { AggregationFactor } from '../types';

test('test country aggregation', () => {
    const aggregatedData = getAggregateData(testRecords, AggregationFactor.country)
    expect(aggregatedData.length).toBe(2)
    const expectedResult = [ 
        { 
            seroprevalence: 0.1618918918918919 * 100,
            error: 0.011869099745236094 * 100,
            name: 'Canada',
            n: 3700 
        },
        { 
            seroprevalence: 0.23945454545454545 * 100,
            error: 0.01595011632434165 * 100,
            name: 'France',
            n: 2750 
        } 
    ];

    const canadaData = aggregatedData.find(element => element.name === 'Canada')
    expect(canadaData!.seroprevalence).toBe(expectedResult[0].seroprevalence)
    expect(canadaData!.error).toBe(expectedResult[0].error)
    expect(canadaData!.n).toBe(expectedResult[0].n)

    const franceData = aggregatedData.find(element => element.name === 'France')
    expect(franceData!.seroprevalence).toBe(expectedResult[1].seroprevalence)
    expect(franceData!.error).toBe(expectedResult[1].error)
    expect(franceData!.n).toBe(expectedResult[1].n)
});

test('test population aggregation', () => {
    const aggregatedData = getAggregateData(testRecords, AggregationFactor.population_group)
    expect(aggregatedData.length).toBe(4)
    const expectedResult = [ 
        { 
            seroprevalence: 0.18076923076923077 * 100,
            error: 0.01323060712712034 * 100,
            name: 'General',
            n: 3250 
        },
        { 
            seroprevalence: 0.22058823529411764 * 100,
            error: 0.0197108912706527 * 100,
            name: 'Adults',
            n: 1700 
        },
        { 
            seroprevalence: 0.19666666666666664 * 100,
            error: 0.020115170320855773 * 100,
            name: 'Children',
            n: 1500 
        },
        { 
            seroprevalence: 0.175 * 100,
            error: 0.023550605087767913 * 100,
            name: 'Seniors',
            n: 1000 
        } 
    ]

    const generalData = aggregatedData.find(element => element.name === 'General')
    expect(generalData!.seroprevalence).toBe(expectedResult[0].seroprevalence)
    expect(generalData!.error).toBe(expectedResult[0].error)
    expect(generalData!.n).toBe(expectedResult[0].n)

    const adultsData = aggregatedData.find(element => element.name === 'Adults')
    expect(adultsData!.seroprevalence).toBe(expectedResult[1].seroprevalence)
    expect(adultsData!.error).toBe(expectedResult[1].error)
    expect(adultsData!.n).toBe(expectedResult[1].n)

    const childrenData = aggregatedData.find(element => element.name === 'Children')
    expect(childrenData!.seroprevalence).toBe(expectedResult[2].seroprevalence)
    expect(childrenData!.error).toBe(expectedResult[2].error)
    expect(childrenData!.n).toBe(expectedResult[2].n)

    const seniorsData = aggregatedData.find(element => element.name === 'Seniors')
    expect(seniorsData!.seroprevalence).toBe(expectedResult[3].seroprevalence)
    expect(seniorsData!.error).toBe(expectedResult[3].error)
    expect(seniorsData!.n).toBe(expectedResult[3].n)
});

test('test overall aggregation', () => {
    const aggregatedData = aggregateRecords(testRecords);
    const expectedResult = { 
        seroprevalence: 19.496124031007753,
        error: 0.9668492148150594,
        n: 6450 
    }

    expect(aggregatedData!.seroprevalence).toBe(expectedResult.seroprevalence)
    expect(aggregatedData!.error).toBe(expectedResult.error)
    expect(aggregatedData!.n).toBe(expectedResult.n)
});
