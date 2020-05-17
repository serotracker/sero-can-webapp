import _ from 'lodash';
import React, { useContext, useState, useEffect } from "react";
import { Table, Pagination, Dropdown, DropdownProps } from "semantic-ui-react";
import { AppContext } from "../../context";
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
  const [data, setData] = useState(state.filtered_records);

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

  useEffect(() => {
    let newData = _.orderBy(state.filtered_records, [column], ['asc']);

    if (direction === 'descending') {
      newData = _.orderBy(state.filtered_records, [(o: any) => { return o[column] || '' }], ['desc']);
    }

    const splicedData = newData.splice((activePage - 1) * pageLength, pageLength);
    setData(splicedData);
    setTotalPages(Math.ceil(state.filtered_records.length / pageLength));
  }, [activePage, column, direction, pageLength, state.filtered_records])

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
    <div className="container col-11 m-4 center-item flex">
      <div className="col-12 px-0 py-3 section-title">
        REFERENCES
      </div>
      <Table celled sortable fixed striped className="table mb-3 mt-0">
        <Table.Header className="flex col-12 p-0">
          <Table.Row className="flex col-12 p-0">
            {buildHeaderCell('title', 'Name', 'col-5 p-1')}
            {buildHeaderCell('country', 'Country', 'col-2 p-1')}
            {buildHeaderCell('populations', 'Populations', 'col-2 p-1')}
            {buildHeaderCell('denominator', 'N', 'col-1 p-1')}
            {buildHeaderCell('seroprevalence', 'Prevalence (%)', 'col-2 p-1')}
          </Table.Row>
        </Table.Header>
        <Table.Body className="col-12 p-0">
          {_.map(data, ({ article_name, country, denominator, populations, seroprevalence, url }) => (
            <Table.Row className="flex col-12 p-0" key={Math.random()}>
              <Table.Cell className="flex col-5 p-1"><a href={url ? url : '#'} target="_blank" rel="noopener noreferrer">{article_name}</a></Table.Cell>
              <Table.Cell className="flex col-2 p-1">{country ? country : "Not Reported"}</Table.Cell>
              <Table.Cell className="flex col-2 p-1">{populations ? populations : "Not Reported"}</Table.Cell>
              <Table.Cell className="flex col-1 p-1">{denominator ? denominator : "Not Reported"}</Table.Cell>
              <Table.Cell className="flex col-2 p-1">{seroprevalence ? `${(seroprevalence * 100).toFixed(2)}` : "Not Reported"}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
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
              studies per page
              </div>

          </div>
        </Table.Footer>
      </Table>
    </div>
  );
}
