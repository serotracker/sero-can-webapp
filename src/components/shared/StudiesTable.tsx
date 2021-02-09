import _ from "lodash";
import React, { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { Dropdown, DropdownProps, Pagination, Table } from "semantic-ui-react";
import { mobileDeviceWidth } from "../../constants";
import { AirtableRecord } from "../../types";
import Translate from "../../utils/translate/translateService";
import { getGeography, getPossibleNullDateString } from "../../utils/utils";
import StudyDetailsModal from "../charts/StudyDetailsModal";
import ReferenceSearch from '../charts/ReferencesSearch';
import { sendAnalyticsEvent } from '../../utils/analyticsUtils';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";


interface StudiesTableProps {
    showAllStudies: boolean,
    dataRecords: AirtableRecord[],
    smallView?: boolean
}

export default function StudiesTable(props: StudiesTableProps) {
    const [activePage, setActivePage] = useState(1);
    const [boundaryRange] = useState(0);
    const [siblingRange] = useState(5);
    const [totalPages, setTotalPages] = useState(10);
    const [pageLength, setPageLength] = useState(5);
    const [column, setColumn] = useState('denominator');
    const [direction, setDirection] = useState('descending');
    const initialState: AirtableRecord[] = [];
    const [data, setData] = useState(initialState);
    const [searchResults, setSearchResults] = useState<AirtableRecord[] | undefined>(undefined);
    const isMobileDevice = useMediaQuery({ maxWidth: mobileDeviceWidth });
    const [letDownload, setLetDownload] = useState(false);
    const [hoverKey, setHoverKey] = useState(-1)

    const getLink = () => {
        if (letDownload) {
            return "https://airtable.com/shraXWPJ9Yu7ybowM/tbljN2mhRVfSlZv2d?backgroundColor=blue&viewControls=on"
        }
        else {
            return "https://docs.google.com/forms/d/e/1FAIpQLSdGd_wlq8YSyVPs2AOi1VfvxuLzxA8Ye5I3HkQwW_9yrumsCg/viewform?usp=sf_link"
        }
    }

    useEffect(() => {
        const doneSurvey = localStorage.getItem("DownloadApproved");
        if (doneSurvey) {
            setLetDownload(true);
        }
    }, [])

    useEffect(() => {
        let newData = searchResults || props.dataRecords || [];

        if (direction === 'descending') {
            newData = _.orderBy(newData,
                [(o: any) => {
                    return o[column] || '';
                }], ['desc']);
        }
        else {
            newData = _.orderBy(newData, [column], ['asc']);
        }

        // Note: need to use slice instead of splice here to make sure we are not 
        // mutating the original array
        const startingPos = (activePage - 1) * pageLength;
        const slicedData = newData.slice(startingPos, startingPos + pageLength - 1);
        setData(slicedData);

        if (isMobileDevice) {
            setPageLength(Math.ceil(newData.length));
        }
        else {
            setTotalPages(Math.ceil(newData.length / pageLength));
        }
    }, [activePage, column, direction, isMobileDevice, pageLength, props.dataRecords, searchResults])

    const getPopulation = (sex: string | null, age: string | null, population_group: string | null) => {
        // TODO: Check if we still need to accommodate for these edge cases.
        if (!population_group) {
            return "Not Reported";
        }
        const displaySex = sex && sex !== "All" && sex !== "Unspecified";
        const displayAge = age && age !== "Multiple groups" && age !== "Unspecified";
        return `${displaySex ? `${sex}, ` : ""}${displayAge ? `${age}, ` : ""}${population_group}`;
    }

    const pageLengthOptions = [
        { text: 5, value: 5 }, { text: 10, value: 10 }, { text: 25, value: 25 }, { text: 50, value: 50 }, { text: 100, value: 100 }
    ]

    const handleSort = (clickedColumn: string) => () => {
        if (column !== clickedColumn) {
            setActivePage(1);
            setColumn(clickedColumn);
            setDirection('ascending');
            return
        }
        else {
            setDirection(direction === 'ascending' ? 'descending' : 'ascending');
        }
    }

    const handlePaginationChange = (e: any, event: any) => {
        const { activePage } = event;
        setActivePage(activePage)
    }

    const handlePageLengthChange = (e: any, event: DropdownProps) => {
        setPageLength(event.value as number);
        setActivePage(1);
    }

    const handleSearchChange = (results: any) => {
        setSearchResults(results as AirtableRecord[])
        setActivePage(1);
    }

    const buildHeaderCell = (sortColumn: string, displayName: string, className: string) => {
        return (
            <Table.HeaderCell
                className={className}
                sorted={column === sortColumn ? direction as any : null}
                onClick={handleSort(sortColumn)}
            >
                {displayName}
            </Table.HeaderCell>)
    }

    return (
        <div className="col-12">
            <div >
                <div className="row">
                    <div className="col">
                        <div className="py-3 w-100 section-title align-middle text-uppercase">
                            {Translate('References')}
                        </div>
                    </div>
                    <div className="col-auto">
                        <ReferenceSearch source={props.dataRecords} onSearchResultChange={handleSearchChange} />
                    </div>
                </div>
            </div>
            <Table celled sortable fixed striped className="table mb-3 mt-0">
                <Table.Header className="flex col-12 p-0">
                    <Table.Row className="flex col-12 p-0">
                        {buildHeaderCell('title', Translate('Name'), props.smallView ? 'flex col-12 p-1' : 'col-sm-12 col-lg-3 p-1')}
                        {buildHeaderCell('country', Translate('Geography'), props.smallView ? 'flex col-6 p-1' : 'col-sm-12 col-lg-2 p-1')}
                        {buildHeaderCell('populations', Translate('Populations'), props.smallView ? 'flex col-6 p-1' : 'col-sm-12 col-lg-2 p-1')}
                        {buildHeaderCell('denominator', Translate('N'), props.smallView ? 'flex col-6 p-1' : 'col-sm-12 col-lg-1 p-1')}
                        {buildHeaderCell('seroprevalence', Translate('Prevalence'), props.smallView ? 'flex col-6 p-1' : 'col-sm-12 col-lg-1 p-1')}
                        {buildHeaderCell('risk_of_bias', Translate('RiskOfBias'), props.smallView ? 'flex col-6 p-1' : 'col-sm-12 col-lg-1 p-1')}
                        {buildHeaderCell('sampling_end_date', Translate('SamplingEndDate'), props.smallView ? 'flex col-6 p-1' : 'col-sm-12 col-lg-2 p-1')}
                    </Table.Row>
                </Table.Header>
                <Table.Body className="col-12 p-0">
                    {_.map(data,
                        (record, index) => {
                            const {
                                source_name, source_type, url,
                                country, state, city,
                                denominator,
                                sex, age, population_group,
                                seroprevalence,
                                sampling_end_date,
                                overall_risk_of_bias: risk_of_bias,
                            } = record;
                            return (
                                <Table.Row className={`flex col-12 p-0 ${hoverKey === index ? "highlight" : ""}`} key={Math.random()} onMouseEnter={() => { setHoverKey(index) }} onMouseLeave={() => {setHoverKey(-1)}}>
                                    <Table.Cell className={props.smallView ? "flex col-12 p-1" : "col-sm-12 col-lg-3 p-1"}>
                                        <a href={url ? url : '#'} target="_blank" rel="noopener noreferrer">{source_name}</a>
                                        <i className="px-1">({source_type})</i>
                                    </Table.Cell>
                                    <Table.Cell className={`flex p-1 ${props.smallView ? "col-6" : "col-sm-12 col-lg-2"}`}>{getGeography(city, state, country)}</Table.Cell>
                                    <Table.Cell className={`flex p-1 ${props.smallView ? "col-6" : "col-sm-12 col-lg-2"}`}>{getPopulation(sex, age, population_group)}</Table.Cell>
                                    <Table.Cell className={`flex p-1 ${props.smallView ? "col-6" : "col-sm-12 col-lg-1"}`}>{denominator ? denominator : "Not Reported"}</Table.Cell>
                                    <Table.Cell className={`flex p-1 ${props.smallView ? "col-6" : "col-sm-12 col-lg-1"}`}>{seroprevalence ? `${(seroprevalence * 100).toFixed(2)}%` : "Not Reported"}</Table.Cell>
                                    <Table.Cell className={`flex p-1 ${props.smallView ? "col-6" : "col-sm-12 col-lg-1"}`}>{risk_of_bias ? risk_of_bias : "Not Reported"}</Table.Cell>
                                    <Table.Cell className={`flex p-1 ${props.smallView ? "col-6" : "col-sm-12 col-lg-2"}`}>{getPossibleNullDateString(sampling_end_date)}</Table.Cell>
                                    <div className={hoverKey === index ? "hover" : "no-hover"}><StudyDetailsModal record={record} /></div>
                                </Table.Row>
                            )
                        })}
                </Table.Body>
                {
                    !isMobileDevice && !props.showAllStudies ?
                        <Table.Footer className="flex space-between">
                            <tr className="flex space-between">
                                <Pagination
                                    activePage={activePage}
                                    boundaryRange={boundaryRange}
                                    onPageChange={handlePaginationChange}
                                    size='mini'
                                    siblingRange={siblingRange}
                                    totalPages={totalPages}
                                    ellipsisItem={null}
                                />
                                <>
                                    <div className="p-2 flex" >
                                        <Dropdown inline
                                            options={pageLengthOptions}
                                            defaultValue={pageLengthOptions[0].value}
                                            onChange={handlePageLengthChange} />
                                        <div className="px-2">
                                            {Translate('StudiesPerPage')}
                                        </div>
                                    </div>
                                </>
                            </tr>
                        </Table.Footer> :
                        null
                }
            </Table>
            <div className="d-flex justify-content-end">
                <a target="_blank" rel="noopener noreferrer"
                    onClick={async () => {
                        sendAnalyticsEvent({ category: 'Data Link Click', action: 'click', label: 'DownloadCsv' })
                        localStorage.setItem('DownloadApproved', "true");
                        await new Promise(resolve => { setTimeout(resolve, 60 * 3 * 1000) });
                        setLetDownload(true);
                    }}
                    href={getLink()}>
                    <FontAwesomeIcon
                        icon={faDownload}
                        className={'icon'}
                        color={'#455a64'}
                        size={"1x"} />
                    <span>{Translate('DownloadCsv')}</span>
                </a>
            </div>
        </div>
    )
}

