import _ from 'lodash';
import React, { useContext, useEffect, useState } from "react";
import { Dropdown, DropdownProps, Pagination, Table, Search } from "semantic-ui-react";
import { AppContext } from "../../context";
import './Charts.css';
import StudyDetailsModal from './StudyDetailsModal';
import { mobileDeviceWidth } from '../../constants';
import { useMediaQuery } from 'react-responsive';
import { AirtableRecord } from '../../types';
import Translate from '../../utils/translate/translateService';
import { sendAnalyticsEvent } from "../../utils/analyticsUtils";
import ReferenceSearch from '../charts/ReferencesSearch';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";

export default function ReferencesTable() {
  const [state] = useContext(AppContext);
  const [activePage, setActivePage] = useState(1);
  const [boundaryRange] = useState(1);
  const [siblingRange] = useState(1);
  const [totalPages, setTotalPages] = useState(10);
  const [pageLength, setPageLength] = useState(5);
  const [column, setColumn] = useState('denominator');
  const [direction, setDirection] = useState('descending');
  const initialDataState: AirtableRecord[] = [];
  const [data, setData] = useState(initialDataState);

  const handlePaginationChange = (e: any, event: any) => {
    const { activePage } = event;
    setActivePage(activePage)
  }

  const handlePageLengthChange = (e: any, event: DropdownProps) => {
    setPageLength(event.value as number);
    setActivePage(1);
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
  
  const isMobileDevice = useMediaQuery({ maxWidth: mobileDeviceWidth })

  useEffect(() => {
    let newData = [];

    if (direction === 'descending') {
      newData = _.orderBy(state.filtered_records, [(o: any) => { return o[column] || '' }], ['desc']);
    }
    else {
      newData =  _.orderBy(state.filtered_records, [column], ['asc']);
    }

    const splicedData = newData.splice((activePage - 1) * pageLength, pageLength);
    setData(splicedData);

    if (isMobileDevice) {
      setPageLength(Math.ceil(state.filtered_records.length))
    }
    else {
      setTotalPages(Math.ceil(state.filtered_records.length / pageLength));
    }
  }, [activePage, column, direction, isMobileDevice, pageLength, state.filtered_records])

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

  const getPopulation = (sex: string | null, age: string[] | null, population_group: string[] | null) => {
    if (!population_group) {
      return "Not Reported";
    }
    const displaySex = sex && sex !== "All" && sex !== "Unspecified";
    const displayAge = age && age[0] !== "All" && age[0] !== "Unspecified";
    return `${displaySex ? `${sex}, ` : ""}${displayAge ? `${(age as string[]).join(", ")}, ` : ""}${population_group.join(", ")}`;
  }

  const getGeography = (city: string[] | null | undefined, state: string[] | null | undefined, country: string | null) => {
    if (!country) {
      return "Not Reported";
    }
    return `${city ? `${city.join(", ")}, ` : ""}${state ? `${state.join(", ")}, ` : ""}${country}`;
  }


  return (
    <div className="container col-11 mx-0 my-1 top references">
      {/*<ReferenceSearch source={state.airtable_records}/>*/}
      <div className="col-12 px-0 py-1 section-title">
        {Translate('References').toUpperCase()}
      </div>
      <Table celled sortable fixed striped className="table my-0">
        <Table.Header className="flex col-12 p-0">
          <Table.Row className="flex col-12 p-0">
            {buildHeaderCell('title', Translate('Name'), 'col-sm-12 col-lg-3 p-1')}
            {buildHeaderCell('country', Translate('Geography'), 'col-sm-12 col-lg-2 p-1')}
            {buildHeaderCell('populations', Translate('Populations'), 'col-sm-12 col-lg-2 p-1')}
            {buildHeaderCell('denominator', Translate('N'), 'col-sm-12 col-lg-1 p-1')}
            {buildHeaderCell('seroprevalence', Translate('Prevalence'), 'col-sm-12 col-lg-1 p-1')}
            {buildHeaderCell('risk_of_bias', Translate('RiskOfBias'), 'col-sm-12 col-lg-2 p-1')}
            {buildHeaderCell('', Translate('Details'), 'col-sm-12 col-lg-1 p-1')}
          </Table.Row>
        </Table.Header>
        <Table.Body className="col-12 p-0">
          {_.map(data,
            (record) => {
              const {
                source_name, source_type, url,
                country, state, city,
                denominator,
                sex, age, population_group,
                seroprevalence,
                risk_of_bias,
              } = record
              return (
                <Table.Row className="flex col-12 p-0" key={Math.random()}>
                  <Table.Cell className=" col-sm-12 col-lg-3 p-1">
                    <a href={url ? url : '#'} target="_blank" rel="noopener noreferrer">{source_name}</a>
                    <i className="px-1">({source_type})</i>
                  </Table.Cell>
                  <Table.Cell className="flex col-sm-12 col-lg-2 p-1">{getGeography(city, state, country)}</Table.Cell>
                  <Table.Cell className="flex col-sm-12 col-lg-2 p-1">{getPopulation(sex, age, population_group)}</Table.Cell>
                  <Table.Cell className="flex col-sm-12 col-lg-1 p-1">{denominator ? denominator : "Not Reported"}</Table.Cell>
                  <Table.Cell className="flex col-sm-12 col-lg-1 p-1">{seroprevalence ? `${(seroprevalence * 100).toFixed(2)}%` : "Not Reported"}</Table.Cell>
                  <Table.Cell className="flex col-sm-12 col-lg-2 p-1">{risk_of_bias ? risk_of_bias : "Not Reported"}</Table.Cell>
                  <Table.Cell className="flex col-sm-12 col-lg-1 p-0 center-item"><StudyDetailsModal record={record} /></Table.Cell>
                </Table.Row>
              )
            })}
        </Table.Body>
        {
          !isMobileDevice ?
            <Table.Footer className="flex space-between">
              <Pagination
                activePage={activePage}
                boundaryRange={boundaryRange}
                onPageChange={handlePaginationChange}
                size='mini'
                siblingRange={siblingRange}
                totalPages={totalPages}
              />
              <div className="p-2 flex">
                <Dropdown inline
                  options={pageLengthOptions}
                  defaultValue={pageLengthOptions[0].value}
                  onChange={handlePageLengthChange} />
                <div className="px-2">
                  {Translate('StudiesPerPage')}
              </div>
              </div>
            </Table.Footer> :
            null
        }
      </Table>
      <div className="d-flex justify-content-end">
        <a target="_blank" onClick={() => sendAnalyticsEvent({category: 'Data Link Click', action: 'click', label: 'DownloadCsv'})} 
        href="https://airtable.com/shraXWPJ9Yu7ybowM/tbljN2mhRVfSlZv2d?backgroundColor=blue&viewControls=on">
          <FontAwesomeIcon
          icon={faDownload}
          className={'icon'}
          color={'#455a64'}
          size={"1x"} />
          <span>{Translate('DownloadCsv')}</span>
        </a>
      </div>
    </div>
  );
}
