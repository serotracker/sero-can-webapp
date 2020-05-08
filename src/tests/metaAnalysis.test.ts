import { testRecords } from './testData'
import { getAggregateData, aggregateRecords } from '../metaAnalysis'

test('test country aggregation', () => {
    const aggregatedData = getAggregateData(testRecords, "country")
    expect(aggregatedData.length).toBe(2)
    const expectedResult = [ 
        { 
            seroprevalence: 0.1592131674026495 * 100,
            error: 0.06218947499376402 * 100,
            name: 'Canada',
            n: 3700 
        },
        { 
            seroprevalence: 0.23686475244389382 * 100,
            error: 0.07475981822699498 * 100,
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
    const aggregatedData = getAggregateData(testRecords, "populations")
    expect(aggregatedData.length).toBe(4)
    const expectedResult = [ 
        { 
            seroprevalence: 0.17482597478459813 * 100,
            error: 0.02809234571907444 * 100,
            name: 'General',
            n: 3250 
        },
        { 
            seroprevalence: 0.21869782971619364 * 100,
            error: 0.040542027576331206 * 100,
            name: 'Adults',
            n: 1700 
        },
        { 
            seroprevalence: 0.1823481781376518 * 100,
            error: 0.0838076687024125 * 100,
            name: 'Children',
            n: 1500 
        },
        { 
            seroprevalence: 0.17217391304347826 * 100,
            error: 0.04699914892846466 * 100,
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

    const childrenData = aggregatedData.find(element => element.name == 'Children')
    expect(childrenData!.seroprevalence).toBe(expectedResult[2].seroprevalence)
    expect(childrenData!.error).toBe(expectedResult[2].error)
    expect(childrenData!.n).toBe(expectedResult[2].n)

    const seniorsData = aggregatedData.find(element => element.name == 'Seniors')
    expect(seniorsData!.seroprevalence).toBe(expectedResult[3].seroprevalence)
    expect(seniorsData!.error).toBe(expectedResult[3].error)
    expect(seniorsData!.n).toBe(expectedResult[3].n)
});

test('test overall aggregation', () => {
    const aggregatedData = aggregateRecords(testRecords);
    const expectedResult = { 
        seroprevalence: 18.680383470611503,
        error: 9.724485190144172,
        n: 6450 
    }

    expect(aggregatedData!.seroprevalence).toBe(expectedResult.seroprevalence)
    expect(aggregatedData!.error).toBe(expectedResult.error)
    expect(aggregatedData!.n).toBe(expectedResult.n)
});
