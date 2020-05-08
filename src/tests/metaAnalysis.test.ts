import { testRecords } from './testData'
import { getAggregateData } from '../metaAnalysis'

test('test country aggregation', () => {
    const aggregatedData = getAggregateData(testRecords, "country")
    expect(aggregatedData.length).toBe(2)
    const expectedResult = [ 
        { 
            seroprevalence: 0.1592131674026495 * 100,
            error: 0.06218947499376402 * 100,
            name: 'Canada' 
        },
        { 
            seroprevalence: 0.23686475244389382 * 100,
            error: 0.07475981822699498 * 100,
            name: 'France' 
        } 
    ];

    const canadaData = aggregatedData.find(element => element.name === 'Canada')
    expect(canadaData!.seroprevalence).toBe(expectedResult[0].seroprevalence)
    expect(canadaData!.error).toBe(expectedResult[0].error)

    const franceData = aggregatedData.find(element => element.name === 'France')
    expect(franceData!.seroprevalence).toBe(expectedResult[1].seroprevalence)
    expect(franceData!.error).toBe(expectedResult[1].error)
});

test('test population aggregation', () => {
    const aggregatedData = getAggregateData(testRecords, "populations")
    expect(aggregatedData.length).toBe(4)
    const expectedResult = [ 
        { 
            seroprevalence: 0.17482597478459813 * 100,
            error: 0.02809234571907444 * 100,
            name: 'General' 
        },
        { 
            seroprevalence: 0.21869782971619364 * 100,
            error: 0.040542027576331206 * 100,
            name: 'Adults' 
        },
        { 
            seroprevalence: 0.1823481781376518 * 100,
            error: 0.0838076687024125 * 100,
            name: 'Children' 
        },
        { 
            seroprevalence: 0.17217391304347826 * 100,
            error: 0.04699914892846466 * 100,
            name: 'Seniors' 
        } 
    ]

    const generalData = aggregatedData.find(element => element.name === 'General')
    expect(generalData!.seroprevalence).toBe(expectedResult[0].seroprevalence)
    expect(generalData!.error).toBe(expectedResult[0].error)

    const adultsData = aggregatedData.find(element => element.name === 'Adults')
    expect(adultsData!.seroprevalence).toBe(expectedResult[1].seroprevalence)
    expect(adultsData!.error).toBe(expectedResult[1].error)

    const childrenData = aggregatedData.find(element => element.name == 'Children')
    expect(childrenData!.seroprevalence).toBe(expectedResult[2].seroprevalence)
    expect(childrenData!.error).toBe(expectedResult[2].error)

    const seniorsData = aggregatedData.find(element => element.name == 'Seniors')
    expect(seniorsData!.seroprevalence).toBe(expectedResult[3].seroprevalence)
    expect(seniorsData!.error).toBe(expectedResult[3].error)
});
