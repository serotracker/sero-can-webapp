import _ from 'lodash';
import React, { useContext, useEffect, useState } from "react";
import { useMediaQuery } from 'react-responsive';
import { DropdownProps, Table } from "semantic-ui-react";
import { mobileDeviceWidth } from '../../constants';
import { AppContext } from "../../context";
import { AirtableRecord } from '../../types';
import Translate from '../../utils/translate/translateService';
import StudiesTable from '../shared/StudiesTable';
import './Charts.css';

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
      newData = _.orderBy(state.filteredRecords, [(o: any) => { return o[column] || '' }], ['desc']);
    }
    else {
      newData =  _.orderBy(state.filteredRecords, [column], ['asc']);
    }

    const splicedData = newData.splice((activePage - 1) * pageLength, pageLength);
    setData(splicedData);

    if (isMobileDevice) {
      setPageLength(Math.ceil(state.filteredRecords.length))
    }
    else {
      setTotalPages(Math.ceil(state.filteredRecords.length / pageLength));
    }
  }, [activePage, column, direction, isMobileDevice, pageLength, state.filteredRecords])

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
    <div className="container col-11 mt-3 top references">
      <div className="col-12 px-0 py-3 section-title">
        {Translate('References').toUpperCase()}
      </div>
       <StudiesTable dataRecords={state.filteredRecords} showAllStudies={false}></StudiesTable>
    </div>
  );
}
